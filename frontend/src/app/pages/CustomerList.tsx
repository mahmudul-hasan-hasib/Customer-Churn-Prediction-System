import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Filter,
  Eye,
  Edit,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";

import {
  getCustomers,
  predictCustomer,
  type CustomerListItem,
} from "../../services/customerService";

export function CustomerList() {
  const [customers, setCustomers] = useState<CustomerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [predictingId, setPredictingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    contract: "",
    risk: "",
  });

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCustomers({
        search: searchQuery || undefined,
        risk: filters.risk || undefined,
        contract: filters.contract || undefined,
      });

      setCustomers(data);
    } catch (err: any) {
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleApplyFilters = async () => {
    await loadCustomers();
  };

  const handleResetFilters = async () => {
    setSearchQuery("");
    setFilters({
      contract: "",
      risk: "",
    });

    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      setError("Failed to reset filters.");
    } finally {
      setLoading(false);
    }
  };

  const handlePredictCustomer = async (id: number) => {
    try {
      setPredictingId(id);
      setError("");

      const updatedCustomer = await predictCustomer(id);

      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === id
            ? {
                ...customer,
                churn_prediction: updatedCustomer.churn_prediction,
                churn_probability: updatedCustomer.churn_probability,
                risk_level: updatedCustomer.risk_level,
                updated_at: updatedCustomer.updated_at,
              }
            : customer
        )
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Prediction failed. Check if pipeline file exists."
      );
    } finally {
      setPredictingId(null);
    }
  };

  const customerCountText = useMemo(() => {
    if (customers.length === 0) return "No customers found";
    return `Showing 1-${customers.length} of ${customers.length} customers`;
  }, [customers]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">
          Manage and monitor your customer base
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <Button variant="secondary" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <Button variant="primary" onClick={handleApplyFilters}>
              Search
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <Select
                label="Contract Type"
                options={[
                  { value: "", label: "All" },
                  { value: "Monthly", label: "Monthly" },
                  { value: "Quarterly", label: "Quarterly" },
                  { value: "Annual", label: "Annual" },
                ]}
                value={filters.contract}
                onChange={(e) =>
                  setFilters({ ...filters, contract: e.target.value })
                }
              />

              <Select
                label="Churn Risk Level"
                options={[
                  { value: "", label: "All" },
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
                value={filters.risk}
                onChange={(e) =>
                  setFilters({ ...filters, risk: e.target.value })
                }
              />

              <div className="flex items-end">
                <Button variant="secondary" onClick={handleResetFilters}>
                  Reset
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-gray-600">Loading customers...</div>
          ) : customers.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">No customers found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Tenure</TableHead>
                  <TableHead>Monthly Charges</TableHead>
                  <TableHead>Contract Type</TableHead>
                  <TableHead>Churn Risk</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {customers.map((customer) => {
                  const probabilityPercent = Math.round(
                    (customer.churn_probability || 0) * 100
                  );

                  return (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{customer.name}</span>
                          <span className="text-xs text-gray-500">
                            #{customer.customer_code}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>{customer.tenure} months</TableCell>

                      <TableCell>${customer.monthly_charges}</TableCell>

                      <TableCell>{customer.contract_length}</TableCell>

                      <TableCell>
                        <Badge variant={customer.risk_level}>
                          {customer.risk_level.charAt(0).toUpperCase() +
                            customer.risk_level.slice(1)}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className={`h-2 rounded-full ${
                                customer.risk_level === "high"
                                  ? "bg-red-500"
                                  : customer.risk_level === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${probabilityPercent}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-10">
                            {probabilityPercent}%
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link to={`/customers/${customer.id}`}>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </Link>

                          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handlePredictCustomer(customer.id)}
                            disabled={predictingId === customer.id}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
                          >
                            <TrendingUp className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination UI placeholder */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{customerCountText}</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button variant="secondary" size="sm" disabled>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
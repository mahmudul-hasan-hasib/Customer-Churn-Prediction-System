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

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    contract: "",
    risk: "",
  });

  const loadCustomers = async (targetPage = page) => {
    try {
      setLoading(true);
      setError("");

      const data = await getCustomers({
        search: searchQuery || undefined,
        risk: filters.risk || undefined,
        contract: filters.contract || undefined,
        page: targetPage,
        page_size: pageSize,
      });

      setCustomers(data.results);
      setTotalCount(data.count);
      setHasNext(!!data.next);
      setHasPrevious(!!data.previous);
      setPage(targetPage);
    } catch (err: any) {
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers(1);
  }, []);

  const handleApplyFilters = async () => {
    await loadCustomers(1);
  };

  const handleResetFilters = async () => {
    setSearchQuery("");
    setFilters({
      contract: "",
      risk: "",
    });

    await loadCustomers(1);
  };

  const handlePreviousPage = async () => {
    if (hasPrevious) {
      await loadCustomers(page - 1);
    }
  };

  const handleNextPage = async () => {
    if (hasNext) {
      await loadCustomers(page + 1);
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
    const startItem = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalCount);

    return totalCount === 0
      ? "No customers found"
      : `Showing ${startItem}-${endItem} of ${totalCount} customers`;
  }, [totalCount, page, pageSize]);

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
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
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

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-gray-600">Loading...</div>
          ) : customers.length === 0 ? (
            <div className="p-6 text-sm text-gray-600">No customers found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Tenure</TableHead>
                  <TableHead>Monthly Charges</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead>Risk</TableHead>
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
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.tenure}</TableCell>
                      <TableCell>${customer.monthly_charges}</TableCell>
                      <TableCell>{customer.contract_length}</TableCell>
                      <TableCell>
                        <Badge variant={customer.risk_level}>
                          {customer.risk_level}
                        </Badge>
                      </TableCell>
                      <TableCell>{probabilityPercent}%</TableCell>
                      <TableCell>
                        <button onClick={() => handlePredictCustomer(customer.id)}>
                          Predict
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{customerCountText}</p>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePreviousPage}
            disabled={!hasPrevious || loading}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="px-3 py-2 text-sm text-gray-600">
            Page {page}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleNextPage}
            disabled={!hasNext || loading}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
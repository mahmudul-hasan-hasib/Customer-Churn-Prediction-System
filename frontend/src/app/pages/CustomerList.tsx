import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, Eye, Edit, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';

const customers = [
  { id: 1, name: 'Sarah Johnson', tenure: 24, charges: 89.99, contract: 'Two Year', risk: 'low', probability: 12 },
  { id: 2, name: 'Michael Chen', tenure: 6, charges: 125.50, contract: 'Month-to-Month', risk: 'high', probability: 78 },
  { id: 3, name: 'Emma Davis', tenure: 36, charges: 65.00, contract: 'Two Year', risk: 'low', probability: 8 },
  { id: 4, name: 'James Wilson', tenure: 3, charges: 145.75, contract: 'Month-to-Month', risk: 'high', probability: 85 },
  { id: 5, name: 'Olivia Brown', tenure: 18, charges: 95.25, contract: 'One Year', risk: 'medium', probability: 45 },
  { id: 6, name: 'William Taylor', tenure: 12, charges: 110.00, contract: 'One Year', risk: 'medium', probability: 38 },
  { id: 7, name: 'Sophia Martinez', tenure: 48, charges: 75.50, contract: 'Two Year', risk: 'low', probability: 5 },
  { id: 8, name: 'Liam Anderson', tenure: 2, charges: 155.00, contract: 'Month-to-Month', risk: 'high', probability: 92 },
  { id: 9, name: 'Ava Thomas', tenure: 30, charges: 82.75, contract: 'Two Year', risk: 'low', probability: 15 },
  { id: 10, name: 'Noah Jackson', tenure: 9, charges: 118.50, contract: 'One Year', risk: 'medium', probability: 52 },
];

export function CustomerList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    tenure: '',
    contract: '',
    risk: '',
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage and monitor your customer base</p>
      </div>

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

            {/* Filter Toggle */}
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <Select
                label="Tenure (months)"
                options={[
                  { value: '', label: 'All' },
                  { value: '0-6', label: '0-6 months' },
                  { value: '6-12', label: '6-12 months' },
                  { value: '12-24', label: '12-24 months' },
                  { value: '24+', label: '24+ months' },
                ]}
                value={filters.tenure}
                onChange={(e) => setFilters({ ...filters, tenure: e.target.value })}
              />

              <Select
                label="Contract Type"
                options={[
                  { value: '', label: 'All' },
                  { value: 'Month-to-Month', label: 'Month-to-Month' },
                  { value: 'One Year', label: 'One Year' },
                  { value: 'Two Year', label: 'Two Year' },
                ]}
                value={filters.contract}
                onChange={(e) => setFilters({ ...filters, contract: e.target.value })}
              />

              <Select
                label="Churn Risk Level"
                options={[
                  { value: '', label: 'All' },
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                ]}
                value={filters.risk}
                onChange={(e) => setFilters({ ...filters, risk: e.target.value })}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardContent className="p-0">
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
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.tenure} months</TableCell>
                  <TableCell>${customer.charges}</TableCell>
                  <TableCell>{customer.contract}</TableCell>
                  <TableCell>
                    <Badge variant={customer.risk as 'low' | 'medium' | 'high'}>
                      {customer.risk.charAt(0).toUpperCase() + customer.risk.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className={`h-2 rounded-full ${
                            customer.risk === 'high' ? 'bg-red-500' :
                            customer.risk === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${customer.probability}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-10">{customer.probability}%</span>
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
                      <Link to={`/prediction`}>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-colors">
                          <TrendingUp className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">1-10</span> of <span className="font-medium">12,543</span> customers
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button variant="secondary" size="sm">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

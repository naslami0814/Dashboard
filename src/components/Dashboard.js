import React from 'react';
import KpiCard from './KpiCard';
import ChartComponent from './ChartComponent';
import {
  MdAttachMoney,
  MdTrendingUp,
  MdTrendingDown,
  MdCategory, // Not directly used in KPI cards, but useful if needed later
} from 'react-icons/md';

// Hypothetical Financial Data
const financialData = {
  totalRevenue: 750000,
  netProfit: 180000,
  grossMargin: 0.24, // 24%
  operatingExpenses: 570000,
  revenueBreakdown: {
    labels: ['Product Sales', 'Service Fees', 'Subscriptions', 'Consulting'],
    data: [350000, 200000, 150000, 50000],
    backgroundColor: [
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(255, 99, 132, 0.8)',
    ],
    borderColor: [
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 99, 132, 1)',
    ],
  },
  monthlyPerformance: {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    revenue: [
      60000, 65000, 70000, 68000, 72000, 75000, 78000, 80000, 77000, 81000,
      83000, 85000,
    ],
    expenses: [
      40000, 42000, 45000, 44000, 46000, 48000, 50000, 52000, 49000, 51000,
      53000, 55000,
    ],
  },
  expenseCategories: {
    labels: [
      'Salaries',
      'Rent',
      'Marketing',
      'Utilities',
      'Supplies',
      'Software',
    ],
    data: [250000, 80000, 70000, 25000, 15000, 30000],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ],
  },
};

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <h1>Business Financial Overview</h1>

      <div className="kpi-cards">
        <KpiCard
          title="Total Revenue"
          value={`$${financialData.totalRevenue.toLocaleString()}`}
          icon={<MdAttachMoney />}
          color="#007bff" // Blue
        />
        <KpiCard
          title="Net Profit"
          value={`$${financialData.netProfit.toLocaleString()}`}
          icon={<MdTrendingUp />}
          color="#28a745" // Green
        />
        <KpiCard
          title="Gross Margin"
          value={`${(financialData.grossMargin * 100).toFixed(2)}%`}
          icon={<MdTrendingUp />}
          color="#ffc107" // Yellow/Orange
        />
        <KpiCard
          title="Operating Expenses"
          value={`$${financialData.operatingExpenses.toLocaleString()}`}
          icon={<MdTrendingDown />}
          color="#dc3545" // Red
        />
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h2>Monthly Performance</h2>
          <ChartComponent
            type="line"
            data={{
              labels: financialData.monthlyPerformance.labels,
              datasets: [
                {
                  label: 'Revenue ($)',
                  data: financialData.monthlyPerformance.revenue,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  tension: 0.3, // Smoother line
                  fill: true,
                },
                {
                  label: 'Expenses ($)',
                  data: financialData.monthlyPerformance.expenses,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  tension: 0.3,
                  fill: true,
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>

        <div className="chart-card">
          <h2>Revenue Breakdown</h2>
          <ChartComponent
            type="doughnut"
            data={{
              labels: financialData.revenueBreakdown.labels,
              datasets: [
                {
                  data: financialData.revenueBreakdown.data,
                  backgroundColor:
                    financialData.revenueBreakdown.backgroundColor,
                  borderColor: financialData.revenueBreakdown.borderColor,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed !== null) {
                        label += new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(context.parsed);
                      }
                      return label;
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className="chart-card">
          <h2>Expense Categories</h2>
          <ChartComponent
            type="bar"
            data={{
              labels: financialData.expenseCategories.labels,
              datasets: [
                {
                  label: 'Amount ($)',
                  data: financialData.expenseCategories.data,
                  backgroundColor:
                    financialData.expenseCategories.backgroundColor,
                  borderColor: financialData.expenseCategories.borderColor,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

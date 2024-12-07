import React, { useEffect, useState } from 'react';

const PayrollPage = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayrolls = () => {
      // Hardcoded demo data
      const demoPayrolls = [
        {
          id: 1,
          employee: { username: 'john_doe' },
          pay_period_start: '2024-11-01',
          pay_period_end: '2024-11-30',
          basic_salary: '5000.00',
          bonus: '500.00',
          allowances: '300.00',
          tax_deductions: '200.00',
          insurance_deductions: '50.00',
          other_deductions: '100.00',
          total_salary: '5450.00',
          status: 'paid',
          payment_method: 'bank_transfer',
          date_processed: '2024-12-01',
        },
        {
          id: 2,
          employee: { username: 'jane_doe' },
          pay_period_start: '2024-11-01',
          pay_period_end: '2024-11-30',
          basic_salary: '4800.00',
          bonus: '400.00',
          allowances: '250.00',
          tax_deductions: '180.00',
          insurance_deductions: '40.00',
          other_deductions: '80.00',
          total_salary: '5200.00',
          status: 'pending',
          payment_method: 'check',
          date_processed: null,
        },
        {
          id: 3,
          employee: { username: 'mark_smith' },
          pay_period_start: '2024-11-01',
          pay_period_end: '2024-11-30',
          basic_salary: '6000.00',
          bonus: '600.00',
          allowances: '350.00',
          tax_deductions: '250.00',
          insurance_deductions: '70.00',
          other_deductions: '150.00',
          total_salary: '5580.00',
          status: 'paid',
          payment_method: 'cash',
          date_processed: '2024-12-02',
        },
      ];

      setPayrolls(demoPayrolls);
      setLoading(false);
    };

    fetchPayrolls();
  }, []);

  if (loading) return <div>Loading payroll data...</div>;

  // Calculate the total paid and remaining amounts
  const totalPaid = payrolls
    .filter((payroll) => payroll.status === 'paid')
    .reduce((total, payroll) => total + parseFloat(payroll.total_salary), 0);

  const totalRemaining = payrolls
    .filter((payroll) => payroll.status === 'pending')
    .reduce((total, payroll) => total + parseFloat(payroll.total_salary), 0);

  // Calculate Payroll Summary (total salary, bonuses, deductions)
  const payrollSummary = payrolls.reduce(
    (acc, payroll) => {
      acc.totalSalary += parseFloat(payroll.total_salary);
      acc.totalBonus += parseFloat(payroll.bonus);
      acc.totalDeductions += parseFloat(payroll.tax_deductions) + parseFloat(payroll.insurance_deductions) + parseFloat(payroll.other_deductions);
      return acc;
    },
    { totalSalary: 0, totalBonus: 0, totalDeductions: 0 }
  );

  // Calculate Employee Status (paid vs pending)
  const employeeStatus = payrolls.reduce(
    (acc, payroll) => {
      if (payroll.status === 'paid') acc.paid += 1;
      if (payroll.status === 'pending') acc.pending += 1;
      return acc;
    },
    { paid: 0, pending: 0 }
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Employee Payrolls</h1>
      <div className="flex flex-wrap justify-center gap-8 p-6">
  {/* Total Paid and Remaining Widget */}
  <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-200">
    <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Payroll Overview</h2>
    <div className="flex justify-around">
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500">Total Paid</p>
        <p className="text-3xl font-bold text-green-600">${totalPaid.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500">Total Remaining</p>
        <p className="text-3xl font-bold text-red-600">${totalRemaining.toFixed(2)}</p>
      </div>
    </div>
  </div>

  {/* Payroll Summary Widget */}
  <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-200">
    <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Payroll Summary</h2>
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">Total Salary Paid</p>
        <p className="text-lg font-bold text-blue-600">${payrollSummary.totalSalary.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">Total Bonus Paid</p>
        <p className="text-lg font-bold text-yellow-600">${payrollSummary.totalBonus.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">Total Deductions</p>
        <p className="text-lg font-bold text-red-500">${payrollSummary.totalDeductions.toFixed(2)}</p>
      </div>
    </div>
  </div>

  {/* Employee Status Widget */}
  <div className="bg-white p-6 rounded-lg shadow-lg w-80 border border-gray-200">
    <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Employee Status</h2>
    <div className="flex justify-around">
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500">Employees Paid</p>
        <p className="text-3xl font-bold text-green-600">{employeeStatus.paid}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-500">Employees Pending</p>
        <p className="text-3xl font-bold text-red-600">{employeeStatus.pending}</p>
      </div>
    </div>
  </div>
</div>

      

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Employee</th>
              <th className="px-4 py-2 text-left">Pay Period</th>
              <th className="px-4 py-2 text-left">Basic Salary</th>
              <th className="px-4 py-2 text-left">Bonus</th>
              <th className="px-4 py-2 text-left">Allowances</th>
              <th className="px-4 py-2 text-left">Total Salary</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Payment Method</th>
              <th className="px-4 py-2 text-left">Date Processed</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">No payroll data available</td>
              </tr>
            ) : (
              payrolls.map((payroll) => (
                <tr key={payroll.id} className="border-t">
                  <td className="px-4 py-2">{payroll.employee.username}</td>
                  <td className="px-4 py-2">
                    {new Date(payroll.pay_period_start).toLocaleDateString()} to {new Date(payroll.pay_period_end).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">Rs.{payroll.basic_salary}</td>
                  <td className="px-4 py-2">Rs.{payroll.bonus}</td>
                  <td className="px-4 py-2">Rs.{payroll.allowances}</td>
                  <td className="px-4 py-2">Rs.{payroll.total_salary}</td>
                  <td className="px-4 py-2">{payroll.status}</td>
                  <td className="px-4 py-2">{payroll.payment_method}</td>
                  <td className="px-4 py-2">{payroll.date_processed || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollPage;

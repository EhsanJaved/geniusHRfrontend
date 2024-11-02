// src/PersonalPayroll.js

import React from 'react';

const payrollData = [
  {
    id: 1,
    month: 'October 2024',
    grossSalary: 5000,
    bonuses: 500,
    deductions: 200,
    received: 5300,
    transactionId: 'TX12345',
  },
  {
    id: 2,
    month: 'September 2024',
    grossSalary: 5000,
    bonuses: 400,
    deductions: 150,
    received: 5250,
    transactionId: 'TX12346',
  },
  {
    id: 3,
    month: 'August 2024',
    grossSalary: 5000,
    bonuses: 300,
    deductions: 100,
    received: 5200,
    transactionId: 'TX12347',
  },
];

const PersonalPayroll = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Payroll Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left">Transaction ID</th>
              <th className="py-2 px-4 border-b text-left">Month</th>
              <th className="py-2 px-4 border-b text-right">Gross Salary</th>
              <th className="py-2 px-4 border-b text-right">Bonuses</th>
              <th className="py-2 px-4 border-b text-right">Deductions</th>
              <th className="py-2 px-4 border-b text-right">Amount Received</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                <td className="py-2 px-4 border-b">{payment.month}</td>
                <td className="py-2 px-4 border-b text-right font-semibold">PKR. {payment.grossSalary.toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-right font-semibold text-green-600">+PKR. {payment.bonuses.toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-right font-semibold text-red-800">-PKR. {payment.deductions.toLocaleString()}</td>
                <td className="py-2 px-4 border-b text-right font-semibold">PKR. {payment.received.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalPayroll;

import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Package, Sparkles } from 'lucide-react';
import { customers as initialCustomers, orders } from '../data/mockData';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customersList, setCustomersList] = useState(initialCustomers);
  
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredCustomers = customersList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setCustomersList(customersList.filter(c => c.id !== id));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAiAnalysis('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        Analyze the following customer and order data.
        1. Summarize who has ordered the most amount (total spent).
        2. Provide customer segmentation based on their purchasing behavior and categories.
        
        Customers: ${JSON.stringify(customersList)}
        Orders: ${JSON.stringify(orders)}
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      setAiAnalysis(response.text || 'No analysis generated.');
    } catch (error) {
      console.error('Error generating AI analysis:', error);
      setAiAnalysis('Failed to generate analysis. Please check your API key or try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
          </button>
        </div>
      </div>

      {aiAnalysis && (
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Customer Analysis
          </h3>
          <div className="prose prose-purple max-w-none text-purple-800 text-sm">
            <Markdown>{aiAnalysis}</Markdown>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {filteredCustomers.map((customer) => {
          const customerOrders = orders.filter(o => o.customerId === customer.id);
          
          return (
            <div key={customer.id} className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{customer.name}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{customer.email} | {customer.phone}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                    customer.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {customer.status}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-gray-900">Total Spent: ${customer.totalSpent.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                  Order History
                </h4>
                {customerOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {customerOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {order.category || 'Uncategorized'}
                              </span>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No orders found for this customer.</p>
                )}
              </div>
            </div>
          );
        })}
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">No customers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}


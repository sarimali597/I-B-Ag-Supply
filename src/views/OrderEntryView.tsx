import { useState } from 'react';
import { Search, Plus, Trash2, CheckCircle2 } from 'lucide-react';

// Dummy Data
const CUSTOMERS = [
  { id: 'CUST-1042', name: 'AgriCorp Midwest', balance: 45200.50, tier: 'Tier 3 Distributor Pricing - Net 45' },
  { id: 'CUST-8911', name: 'Great Plains Distributors', balance: 120500.00, tier: 'Tier 1 Wholesale - Net 60' },
  { id: 'CUST-3320', name: 'Valley Cooperative', balance: 0.00, tier: 'Standard - Net 30' },
];

const INVENTORY = [
  { sku: 'GLY-250-T', name: 'Glyphosate 41%', unitOptions: [{ label: '250 Gal Tote', price: 3200 }, { label: 'Truckload (14 Totes)', price: 42500 }] },
  { sku: 'SEED-CRN-XJ9', name: 'Hybrid Seed Corn XJ9', unitOptions: [{ label: 'Full Pallet (50 bags)', price: 12500 }, { label: 'Half Pallet (25 bags)', price: 6500 }] },
  { sku: 'FERT-UREA-46', name: 'Urea 46-0-0 Dry Fertilizer', unitOptions: [{ label: '1 Ton Super Sack', price: 650 }, { label: 'Bulk Truck (24 Tons)', price: 14400 }] },
];

export default function OrderEntryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer] = useState(CUSTOMERS[0]);
  const [orderLines, setOrderLines] = useState([
    { id: 1, item: INVENTORY[0], selectedUnit: INVENTORY[0].unitOptions[0], quantity: 2 },
  ]);

  const addLine = () => {
    setOrderLines([...orderLines, { id: Date.now(), item: INVENTORY[1], selectedUnit: INVENTORY[1].unitOptions[0], quantity: 1 }]);
  };

  const removeLine = (id: number) => {
    setOrderLines(orderLines.filter(line => line.id !== id));
  };

  const updateLineQty = (id: number, qty: number) => {
    setOrderLines(orderLines.map(line => line.id === id ? { ...line, quantity: qty } : line));
  };

  const updateLineItem = (id: number, sku: string) => {
    const newItem = INVENTORY.find(i => i.sku === sku);
    if (newItem) {
      setOrderLines(orderLines.map(line => line.id === id ? { ...line, item: newItem, selectedUnit: newItem.unitOptions[0] } : line));
    }
  };

  const updateLineUnit = (id: number, unitLabel: string) => {
    setOrderLines(orderLines.map(line => {
      if (line.id === id) {
        const newUnit = line.item.unitOptions.find(u => u.label === unitLabel);
        return newUnit ? { ...line, selectedUnit: newUnit } : line;
      }
      return line;
    }));
  };

  const orderTotal = orderLines.reduce((sum, line) => sum + (line.selectedUnit.price * line.quantity), 0);

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Customer Selection & Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        <div className="flex-1 w-full max-w-md">
          <label className="block text-sm font-medium text-slate-700 mb-1">Select Corporate Customer</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search Name / Account ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-200 w-full lg:w-auto flex flex-col sm:flex-row gap-6 justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-slate-800">{selectedCustomer.name}</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{selectedCustomer.id}</span>
            </div>
            <p className="text-sm text-slate-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              {selectedCustomer.tier}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-500 mb-0.5">Current Balance</p>
            <p className={`text-xl font-bold ${selectedCustomer.balance > 100000 ? 'text-red-600' : 'text-slate-800'}`}>
              ${selectedCustomer.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Order Entry Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-semibold text-slate-800">Order Lines</h3>
          <button 
            onClick={addLine}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-0">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">SKU / Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 w-48">Unit Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 w-32">Qty</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right w-40">Unit Price</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right w-40">Line Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orderLines.map((line) => (
                <tr key={line.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <select 
                      className="w-full bg-transparent border border-slate-300 rounded p-2 text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                      value={line.item.sku}
                      onChange={(e) => updateLineItem(line.id, e.target.value)}
                    >
                      {INVENTORY.map(item => (
                        <option key={item.sku} value={item.sku}>{item.sku} - {item.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className="w-full bg-transparent border border-slate-300 rounded p-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                      value={line.selectedUnit.label}
                      onChange={(e) => updateLineUnit(line.id, e.target.value)}
                    >
                      {line.item.unitOptions.map(opt => (
                        <option key={opt.label} value={opt.label}>{opt.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      min="1" 
                      className="w-full border border-slate-300 rounded p-2 text-sm text-center outline-none focus:ring-2 focus:ring-blue-500"
                      value={line.quantity}
                      onChange={(e) => updateLineQty(line.id, parseInt(e.target.value) || 1)}
                    />
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-slate-600">
                    ${line.selectedUnit.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-slate-800">
                    ${(line.selectedUnit.price * line.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => removeLine(line.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Remove line"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {orderLines.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 text-sm">
                    No items added to the order yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals & Submit */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-end items-center gap-8 shadow-inner">
          <div className="text-right">
            <p className="text-sm text-slate-500 font-medium mb-1">Total Order Value</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">
              ${orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-95 text-lg">
            Submit Wholesale Order
          </button>
        </div>
      </div>
    </div>
  );
}

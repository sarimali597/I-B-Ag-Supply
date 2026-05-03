import { useState } from 'react';
import { Map, AlertTriangle, Layers, Filter } from 'lucide-react';

const WAREHOUSES = ['All Locations', 'Omaha Hub', 'Des Moines Depot', 'Sacramento Warehouse'];

const INVENTORY_DATA = [
  { sku: 'GLY-250-T', name: 'Glyphosate 41% (250 Gal Tote)', total: 145, locations: { 'Omaha Hub': 80, 'Des Moines Depot': 45, 'Sacramento Warehouse': 20 }, alert: false },
  { sku: 'GLY-BULK', name: 'Glyphosate 41% (Bulk Tanker Vol)', total: 42000, locations: { 'Omaha Hub': 25000, 'Des Moines Depot': 17000, 'Sacramento Warehouse': 0 }, alert: false },
  { sku: 'SEED-CRN-XJ9', name: 'Hybrid Seed Corn XJ9 (Pallets)', total: 12, locations: { 'Omaha Hub': 10, 'Des Moines Depot': 2, 'Sacramento Warehouse': 0 }, alert: true },
  { sku: 'FERT-UREA-46', name: 'Urea 46-0-0 Dry (Tons)', total: 850, locations: { 'Omaha Hub': 400, 'Des Moines Depot': 250, 'Sacramento Warehouse': 200 }, alert: false },
  { sku: 'CHEM-24D-JUG', name: '2,4-D Amine (2.5 Gal Jugs)', total: 45, locations: { 'Omaha Hub': 0, 'Des Moines Depot': 5, 'Sacramento Warehouse': 40 }, alert: true },
];

export default function InventoryView() {
  const [selectedLoc, setSelectedLoc] = useState('All Locations');

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Network Inventory</h3>
            <p className="text-xs text-slate-500">Real-time stock across all hubs</p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select 
              value={selectedLoc}
              onChange={(e) => setSelectedLoc(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {WAREHOUSES.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Total Network Qty</th>
                {selectedLoc === 'All Locations' && (
                  <>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Omaha Hub</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Des Moines</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Sacramento</th>
                  </>
                )}
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INVENTORY_DATA.map((item) => {
                const displayTotal = selectedLoc === 'All Locations' 
                  ? item.total 
                  : item.locations[selectedLoc as keyof typeof item.locations];

                // If filtering by location and it has 0, maybe still show it to indicate out of stock
                return (
                  <tr key={item.sku} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-600">{item.sku}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-slate-400" />
                        {item.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-lg font-bold ${displayTotal === 0 ? 'text-slate-300' : 'text-slate-900'}`}>
                        {displayTotal.toLocaleString()}
                      </span>
                    </td>
                    
                    {selectedLoc === 'All Locations' && (
                      <>
                        <td className="px-6 py-4 text-right text-slate-600 font-medium">{item.locations['Omaha Hub'].toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-slate-600 font-medium">{item.locations['Des Moines Depot'].toLocaleString()}</td>
                        <td className="px-6 py-4 text-right text-slate-600 font-medium">{item.locations['Sacramento Warehouse'].toLocaleString()}</td>
                      </>
                    )}

                    <td className="px-6 py-4 text-center">
                      {item.alert || displayTotal < 20 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                          Healthy
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

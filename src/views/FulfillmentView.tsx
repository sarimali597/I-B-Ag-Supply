import { useState } from 'react';
import { Truck, CheckSquare, Clock, MapPin, X } from 'lucide-react';

const QUEUE = [
  { id: 'ORD-99021', customer: 'AgriCorp Midwest', items: '2x Bulk Truck (Urea 46)', status: 'Awaiting Truck', time: '08:15 AM' },
  { id: 'ORD-99022', customer: 'Valley Cooperative', items: '14x 250 Gal Tote (Glyphosate)', status: 'Ready for Picking', time: '09:30 AM' },
  { id: 'ORD-99023', customer: 'Great Plains Distributors', items: '3x Full Pallet (Seed Corn XJ9)', status: 'Awaiting Inventory', time: '10:45 AM' },
];

export default function FulfillmentView() {
  const [orders, setOrders] = useState(QUEUE);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Awaiting Inventory': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Ready for Picking': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Awaiting Truck': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Shipped': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const openAssignModal = (order: any) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const assignDispatch = (carrier: string) => {
    // Optionally we can log the assigned carrier, or we just keep it simple.
    console.log(`Assigned to ${carrier}`);
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: 'Shipped' } : o));
    setModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending Orders', val: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
          { label: 'Ready to Load', val: '5', icon: CheckSquare, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Trucks at Dock', val: '3', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-100' },
          { label: 'Dispatched Today', val: '28', icon: Truck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Queue */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="font-semibold text-slate-800">Active Load-Out Queue</h3>
          <div className="flex gap-2">
            <select className="bg-white border border-slate-300 rounded-md px-3 py-1.5 text-sm text-slate-700 outline-none">
              <option>All Statuses</option>
              <option>Ready for Picking</option>
              <option>Awaiting Truck</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white sticky top-0 z-10 shadow-sm border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Bulk Items</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-700">{order.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{order.items}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.time}</td>
                  <td className="px-6 py-4 text-right">
                    {order.status !== 'Shipped' ? (
                      <button 
                        onClick={() => openAssignModal(order)}
                        className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 shadow-sm transition-all active:scale-95"
                      >
                        Assign Dispatch
                      </button>
                    ) : (
                      <span className="text-sm font-bold text-slate-400">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">Assign Dispatch</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500 mb-1">Order ID</p>
                <p className="font-semibold text-slate-800">{selectedOrder?.id}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Batch/Lot (Quality Control)</label>
                <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Auto-Select Oldest (FIFO)</option>
                  <option>Batch #LOT-A492</option>
                  <option>Batch #LOT-B110</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Assign Carrier</label>
                <div className="space-y-2">
                  {['CH Robinson Logistics', 'Internal Fleet - Truck 4', 'Customer Pickup'].map(carrier => (
                    <button 
                      key={carrier}
                      onClick={() => assignDispatch(carrier)}
                      className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <span className="font-medium text-slate-800">{carrier}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

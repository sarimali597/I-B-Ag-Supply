import { useState } from 'react';
import { Truck, PackageSearch, ShoppingCart, Settings, LogOut } from 'lucide-react';
import OrderEntryView from './views/OrderEntryView';
import FulfillmentView from './views/FulfillmentView';
import InventoryView from './views/InventoryView';

export default function App() {
  const [activeTab, setActiveTab] = useState('order-entry');

  const renderContent = () => {
    switch (activeTab) {
      case 'order-entry':
        return <OrderEntryView />;
      case 'fulfillment':
        return <FulfillmentView />;
      case 'inventory':
        return <InventoryView />;
      default:
        return <OrderEntryView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              I&B
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white leading-tight">I&B Ag Supply</h1>
              <p className="text-xs text-slate-400 font-medium">Logistics Portal v2.4</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Operations</p>
          
          <button
            onClick={() => setActiveTab('order-entry')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
              activeTab === 'order-entry' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium text-sm">Order Entry Portal</span>
          </button>

          <button
            onClick={() => setActiveTab('fulfillment')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
              activeTab === 'fulfillment' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span className="font-medium text-sm">Fulfillment & Load-Out</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
              activeTab === 'inventory' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <PackageSearch className="w-5 h-5" />
            <span className="font-medium text-sm">Nationwide Inventory</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm shrink-0 z-10">
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight">
            {activeTab === 'order-entry' && 'B2B Wholesale Order Entry'}
            {activeTab === 'fulfillment' && 'Warehouse Fulfillment Dashboard'}
            {activeTab === 'inventory' && 'Nationwide Inventory Hub'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">Jane Doe</p>
              <p className="text-xs text-slate-500">Sr. Account Manager</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold">
              JD
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-3 px-8 text-right bg-white border-t border-slate-200 shrink-0">
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            Engineered by <span className="font-bold text-slate-500">Store Flow</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

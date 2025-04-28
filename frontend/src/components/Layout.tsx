import React from "react";
import { Stethoscope, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-medical">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-md bg-medical flex items-center justify-center text-white">
                <Stethoscope size={24} />
              </div>
              <div>
                <h1 className="text-xl font-medium tracking-tight text-gray-900">LungWise</h1>
                <p className="text-xs text-gray-500">Early Diagnosis Assistant</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bs. Nguyễn Thị Hạnh</span>
            <div className="w-9 h-9 rounded-full bg-medical text-white flex items-center justify-center font-medium">
              NTH
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content - now takes full width */}
        <main className="flex-1 overflow-y-auto bg-gradient-medical">
          <div className="container mx-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, current, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-150 ${
        current 
          ? "bg-medical-light text-medical-dark" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
};

export default Layout;

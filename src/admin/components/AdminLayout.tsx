import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, LogOut, Settings, Video, Menu, X } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Slide-over on mobile (`lg:static lg:translate-x-0`) */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-primary text-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-5 sm:p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold font-poppins flex items-center gap-2">
            <Settings className="w-6 h-6 text-gold" />
            Admin Panel
          </h2>
          <button 
            onClick={closeMobileMenu} 
            className="lg:hidden p-1 text-white/80 hover:text-white rounded-lg focus:outline-none"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <NavLink
            to="/admin/dashboard"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                isActive ? 'bg-gold text-primary font-semibold shadow-md' : 'hover:bg-white/10'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>
          
          <NavLink
            to="/admin/gallery"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                isActive ? 'bg-gold text-primary font-semibold shadow-md' : 'hover:bg-white/10'
              }`
            }
          >
            <ImageIcon className="w-5 h-5" />
            Images
          </NavLink>

          <NavLink
            to="/admin/videos"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                isActive ? 'bg-gold text-primary font-semibold shadow-md' : 'hover:bg-white/10'
              }`
            }
          >
            <Video className="w-5 h-5" />
            Videos
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 hover:text-red-300 transition-all duration-300 text-sm sm:text-base font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center sticky top-0 z-20 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-base sm:text-xl font-semibold text-gray-800 truncate max-w-[200px] sm:max-w-none">
              Mangal Dosh Admin
            </h1>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              A
            </div>
            <span className="hidden sm:inline-block text-sm font-medium text-gray-600">Admin User</span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

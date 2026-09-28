import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';

export const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('adminToken');
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsValidating(false);
      setIsAuthenticated(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      } catch (e) {
        setIsAuthenticated(true);
      } finally {
        setIsValidating(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-medium text-sm">
        Checking session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

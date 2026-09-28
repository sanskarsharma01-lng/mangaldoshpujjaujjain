import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Image as ImageIcon, Video } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

export const AdminDashboard: React.FC = () => {
  const [statsData, setStatsData] = useState({ images: 0, videos: 0, visits: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStatsData(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Images', value: statsData.images, icon: ImageIcon, color: 'bg-blue-500' },
    { title: 'Total Videos', value: statsData.videos, icon: Video, color: 'bg-green-500' },
    { title: 'Total Visits', value: statsData.visits, icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <LayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${stat.color}`}>
              <stat.icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 sm:mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Welcome to Admin Panel</h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          From here you can manage media content and view system performance metrics. Use the sidebar menu to manage photo gallery and video items.
          Uploaded images are automatically converted to optimized <strong>WebP</strong> format, and videos to <strong>MP4</strong> format.
        </p>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Video, Trash2, UploadCloud } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

interface GalleryVideo {
  id: number;
  filename: string;
  filepath: string;
  title_en?: string;
  title_hi?: string;
  description_en?: string;
  description_hi?: string;
  created_at: string;
}

export const AdminVideos: React.FC = () => {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos`);
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error('Failed to fetch videos');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    formData.append('media', file);
    formData.append('type', 'video');
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (res.ok) {
        setFile(null);
        setMessage('Video uploaded and converted to MP4 format successfully!');
        fetchVideos();
      } else {
        const data = await res.json();
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
          alert('Session expired. Please login again.');
          window.location.href = '/admin/login';
          return;
        }
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setUploading(false);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchVideos();
      } else {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
          alert('Session expired. Please login again.');
          window.location.href = '/admin/login';
          return;
        }
        alert('Failed to delete video');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center gap-3">
        <Video className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Video Management</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Uploaded videos are automatically converted and stored in standard <strong>.mp4</strong> format.</p>
        </div>
      </div>

      {message && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-xs sm:text-sm font-medium">
          {message}
        </div>
      )}

      <form onSubmit={handleUpload} className="space-y-4 sm:space-y-6">
        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Upload New Video</h2>
          {error && <div className="text-red-500 text-xs sm:text-sm mb-4">{error}</div>}
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Select Video (MOV, AVI, MKV, MP4, etc.)
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-xs sm:text-sm text-gray-500
                file:mr-3 file:py-2 file:px-3 sm:file:px-4
                file:rounded-xl file:border-0
                file:text-xs sm:file:text-sm file:font-semibold
                file:bg-primary/10 file:text-primary
                hover:file:bg-primary/20 transition-all cursor-pointer border border-gray-200 rounded-xl p-1.5 sm:p-2"
              required
            />
          </div>

          <div className="flex justify-end pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={!file || uploading}
              className="w-full sm:w-auto bg-primary text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-xs sm:text-sm hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <UploadCloud className="w-4 h-4" />
              {uploading ? 'Transcoding & Uploading...' : 'Upload Video as MP4'}
            </button>
          </div>
        </div>
      </form>

      {/* Video Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-6">
        {videos.map((vid) => (
          <div key={vid.id} className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white flex flex-col">
            <div className="aspect-video relative bg-black">
              <video 
                src={`${API_BASE_URL}${vid.filepath}`} 
                className="w-full h-full object-cover" 
                controls 
              />
              <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <button
                  onClick={() => handleDelete(vid.id)}
                  className="bg-red-500/90 hover:bg-red-600 text-white p-1.5 sm:p-2.5 rounded-full transition-colors shadow-md"
                  title="Delete Video"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
              <div className="absolute bottom-1.5 left-1.5 bg-green-600/80 text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                MP4
              </div>
            </div>
            {vid.title_en && (
              <div className="p-2 sm:p-3 bg-white border-t border-gray-100">
                <p className="text-[11px] sm:text-sm font-medium text-gray-800 truncate">{vid.title_en}</p>
              </div>
            )}
          </div>
        ))}
        
        {videos.length === 0 && (
          <div className="col-span-full py-10 sm:py-12 text-center text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            No videos uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};

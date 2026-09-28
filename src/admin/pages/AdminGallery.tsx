import React, { useState, useEffect } from 'react';
import { Trash2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';

interface GalleryImage {
  id: number;
  filename: string;
  filepath: string;
  title_en?: string;
  title_hi?: string;
  description_en?: string;
  description_hi?: string;
  category?: string;
  created_at: string;
}

const CATEGORIES = ['Temple', 'Puja', 'Havan', 'Pandit Ji', 'Ujjain', 'Devotees', 'Prasad'];

export const AdminGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [category, setCategory] = useState(CATEGORIES[0]);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery?type=image`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error('Failed to fetch images');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;
    
    setUploading(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    
    files.forEach(f => {
      formData.append('media', f);
    });
    formData.append('type', 'image');
    formData.append('category', category);

    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (res.ok) {
        setFiles([]);
        setMessage(`${files.length} image(s) uploaded and converted to WebP successfully!`);
        fetchImages();
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
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchImages();
      } else {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
          alert('Session expired. Please login again.');
          window.location.href = '/admin/login';
          return;
        }
        alert('Failed to delete image');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center gap-3">
        <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Gallery Management</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Uploaded images are automatically converted and saved as optimized <strong>.webp</strong> format.</p>
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
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Upload New Images</h2>
          {error && <div className="text-red-500 text-xs sm:text-sm mb-4">{error}</div>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Select Images (Any format supported)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                  }
                }}
                className="block w-full text-xs sm:text-sm text-gray-500
                  file:mr-3 file:py-2 file:px-3 sm:file:px-4
                  file:rounded-xl file:border-0
                  file:text-xs sm:file:text-sm file:font-semibold
                  file:bg-primary/10 file:text-primary
                  hover:file:bg-primary/20 transition-all cursor-pointer border border-gray-200 rounded-xl p-1.5 sm:p-2"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 sm:p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={files.length === 0 || uploading}
              className="w-full sm:w-auto bg-primary text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-xs sm:text-sm hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <UploadCloud className="w-4 h-4" />
              {uploading ? 'Converting & Uploading...' : `Upload ${files.length > 0 ? `${files.length} ` : ''}Image(s) as WebP`}
            </button>
          </div>
        </div>
      </form>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
        {images.map((img) => (
          <div key={img.id} className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white flex flex-col">
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              <img 
                src={`${API_BASE_URL}${img.filepath}`} 
                alt={img.title_en || img.filename} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="bg-red-500 text-white p-2.5 sm:p-3 rounded-full hover:bg-red-600 transition-colors transform hover:scale-110 shadow-md"
                  title="Delete Image"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              {img.category && (
                <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded font-medium">
                  {img.category}
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-blue-600/80 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                WEBP
              </div>
            </div>
            {(img.title_en || img.title_hi) && (
              <div className="p-2 sm:p-3 bg-white border-t border-gray-100">
                {img.title_en && <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">EN: {img.title_en}</p>}
                {img.title_hi && <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">HI: {img.title_hi}</p>}
              </div>
            )}
          </div>
        ))}
        
        {images.length === 0 && (
          <div className="col-span-full py-10 sm:py-12 text-center text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            No images uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};

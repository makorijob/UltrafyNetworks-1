"use client";

import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Star,
  Briefcase,
  Wifi,
  Settings,
  Shield,
  Lock,
  Loader2,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Search,
  ChevronDown,
  RefreshCw,
  LogOut,
  Menu,
  X,
  Upload,
  Save,
  AlertCircle,
  ArrowLeft,
  Users,
  TrendingUp,
  Camera,
  Sun,
  Zap,
  Truck,
  ArrowUpCircle,
  Check,
} from 'lucide-react';

// ============ TYPES ============
interface Review {
  id: number;
  name: string;
  area: string;
  quote: string;
  rating: number;
  status: string;
  created_at: string;
}

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  icon: string;
  desc: string;
  status: string;
  posted_date: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  category: string;
  features: string[];
  status: string;
  created_at: string;
}

// ============ SERVICE MODAL ============
function ServiceModal({ 
  isOpen, 
  onClose, 
  onSave, 
  service, 
  isEditing 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: any) => void; 
  service?: Service | null; 
  isEditing: boolean;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Connectivity',
    features: [''],
    image: '',
    color: 'bg-blue-500',
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        category: service.category || 'Connectivity',
        features: service.features || [''],
        image: service.image || '',
        color: service.color || 'bg-blue-500',
      });
      setImagePreview(service.image || '');
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Connectivity',
        features: [''],
        image: '',
        color: 'bg-blue-500',
      });
      setImagePreview('');
    }
  }, [service]);

  if (!isOpen) return null;

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const serviceData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
      };
      await onSave(serviceData);
      onClose();
    } catch (error) {
      alert('Failed to save service. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <h2 className="text-xl font-bold text-blue-950">
              {isEditing ? 'Edit Service' : 'Add New Service'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service Image</label>
            <div 
              className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-emerald-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              {imagePreview ? (
                <div className="relative h-48 w-full">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <p className="text-white text-sm font-medium">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="py-8">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">Click to upload an image</p>
                  <p className="text-slate-400 text-xs mt-1">PNG, JPG, or WebP</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. CCTV Installation"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white"
                required
              >
                <option value="Connectivity">Connectivity</option>
                <option value="Security">Security</option>
                <option value="Energy">Energy</option>
                <option value="Electrical">Electrical</option>
                <option value="Support">Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
              <div className="flex gap-2 flex-wrap mt-1">
                {['bg-amber-500', 'bg-yellow-500', 'bg-slate-700', 'bg-red-600', 'bg-orange-600', 'bg-blue-700', 'bg-cyan-600', 'bg-indigo-600', 'bg-emerald-500'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-full ${color} ${formData.color === color ? 'ring-2 ring-offset-2 ring-blue-600' : ''} transition-all hover:scale-110`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe the service in detail..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all resize-none"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-slate-700">Features</label>
              <button type="button" onClick={addFeature} className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                />
                {formData.features.length > 1 && (
                  <button type="button" onClick={() => removeFeature(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-medium">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
              {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> {isEditing ? 'Update' : 'Add'} Service</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============ JOB MODAL ============
function JobModal({ isOpen, onClose, onSave, job, isEditing }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void; job?: Job | null; isEditing: boolean }) {
  const [formData, setFormData] = useState({
    title: '',
    department: 'Network Operations',
    location: 'Thika',
    type: 'Full-time',
    icon: 'Wrench',
    desc: '',
    status: 'open',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        department: job.department || 'Network Operations',
        location: job.location || 'Thika',
        type: job.type || 'Full-time',
        icon: job.icon || 'Wrench',
        desc: job.desc || '',
        status: job.status || 'open',
      });
    } else {
      setFormData({
        title: '',
        department: 'Network Operations',
        location: 'Thika',
        type: 'Full-time',
        icon: 'Wrench',
        desc: '',
        status: 'open',
      });
    }
  }, [job]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      alert('Failed to save job. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </button>
            <h2 className="text-xl font-bold text-blue-950">{isEditing ? 'Edit Job' : 'Add New Job'}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Job Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Field Technician"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Network Operations"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Thika"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white"
            >
              <option value="Wrench">Wrench</option>
              <option value="Headset">Headset</option>
              <option value="TrendingUp">TrendingUp</option>
              <option value="Users">Users</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              rows={4}
              placeholder="Describe the role and responsibilities..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-medium">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> {isEditing ? 'Update' : 'Add'} Job</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============ MAIN DASHBOARD ============
export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    totalJobs: 0,
    openJobs: 0,
    totalReviews: 0,
    pendingReviews: 0,
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Check authentication
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthorized(true);
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch all data from unified API
      const response = await fetch('/api/admin/all-data');
      const result = await response.json();

      if (result.success) {
        setServices(result.data.services || []);
        setJobs(result.data.careers || []);
        setReviews(result.data.reviews || []);
        setStats(result.totals);
      } else {
        // Fallback: fetch individually
        await fetchDataIndividually();
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Fallback: fetch individually
      await fetchDataIndividually();
    } finally {
      setLoading(false);
    }
  };

  const fetchDataIndividually = async () => {
    try {
      const [servicesRes, jobsRes, reviewsRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/careers/backup'),
        fetch('/api/admin/reviews'),
      ]);

      const servicesData = await servicesRes.json();
      const jobsData = await jobsRes.json();
      const reviewsData = await reviewsRes.json();

      if (servicesData.success) setServices(servicesData.data);
      if (jobsData.success) setJobs(jobsData.data);
      if (reviewsData.success) setReviews(reviewsData.data);

      // Update stats
      setStats({
        totalServices: servicesData.data?.length || 0,
        activeServices: servicesData.data?.filter((s: any) => s.status === 'active').length || 0,
        totalJobs: jobsData.data?.length || 0,
        openJobs: jobsData.data?.filter((j: any) => j.status === 'open').length || 0,
        totalReviews: reviewsData.data?.length || 0,
        pendingReviews: reviewsData.data?.filter((r: any) => r.status === 'pending').length || 0,
      });
    } catch (error) {
      console.error('Error fetching data individually:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = 'admin123';
    if (password === adminPassword) {
      setIsAuthorized(true);
      sessionStorage.setItem('adminAuth', 'true');
      fetchAllData();
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthorized(false);
    setPassword('');
  };

  // Service CRUD
  const handleAddService = async (data: any) => {
    const response = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      await fetchAllData();
      alert('Service added successfully!');
    }
  };

  const handleUpdateService = async (data: any) => {
    const response = await fetch(`/api/services?id=${editingService?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      await fetchAllData();
      alert('Service updated successfully!');
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    const response = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    if (response.ok) {
      await fetchAllData();
      alert('Service deleted successfully!');
    }
  };

  // Job CRUD
  const handleAddJob = async (data: any) => {
    const response = await fetch('/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      await fetchAllData();
      alert('Job added successfully!');
    }
  };

  const handleUpdateJob = async (data: any) => {
    const response = await fetch('/api/careers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingJob?.id, ...data }),
    });
    if (response.ok) {
      await fetchAllData();
      alert('Job updated successfully!');
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    const response = await fetch(`/api/careers?id=${id}`, { method: 'DELETE' });
    if (response.ok) {
      await fetchAllData();
      alert('Job deleted successfully!');
    }
  };

  // Review CRUD
  const handleUpdateReviewStatus = async (id: number, status: string) => {
    const response = await fetch('/api/admin/reviews', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) {
      await fetchAllData();
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    const response = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
    if (response.ok) {
      await fetchAllData();
      alert('Review deleted successfully!');
    }
  };

  // ============ LOGIN SCREEN ============
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-blue-950">Admin Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20"
            >
              Access Dashboard
            </button>

            <p className="text-xs text-slate-400 text-center mt-4">Protected area. Authorized personnel only.</p>
          </form>
        </div>
      </div>
    );
  }

  // ============ FILTERED DATA ============
  const filteredReviews = reviews.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.quote.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ============ SIDEBAR NAVIGATION ============
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'services', label: 'Services', icon: Settings, badge: stats.totalServices },
    { id: 'jobs', label: 'Careers', icon: Briefcase, badge: stats.openJobs },
    { id: 'reviews', label: 'Reviews', icon: Star, badge: stats.pendingReviews },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* ===== MOBILE MENU BUTTON ===== */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 bg-white rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex min-h-screen">
        {/* ===== SIDEBAR ===== */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100 shadow-xl transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                UFN
              </div>
              <div>
                <h1 className="font-bold text-blue-950">UltrafyFiberNet</h1>
                <p className="text-xs text-slate-500">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="font-medium flex-1 text-left">{item.label}</span>
                {item.badge !== null && item.badge > 0 && (
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    activeTab === item.id 
                      ? 'bg-emerald-200 text-emerald-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
              >
                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-600" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-white/80 backdrop-blur-sm">
            <p className="text-xs text-slate-400 text-center">
              © {new Date().getFullYear()} UltrafyFiberNet
            </p>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* ===== HEADER ===== */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 flex items-center gap-2">
                {activeTab === 'overview' && <LayoutDashboard className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'services' && <Settings className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'jobs' && <Briefcase className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'reviews' && <Star className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'services' && 'Services Management'}
                {activeTab === 'jobs' && 'Career Management'}
                {activeTab === 'reviews' && 'Review Management'}
              </h1>
              <p className="text-slate-500 text-sm">
                {activeTab === 'overview' && 'Manage all aspects of your business'}
                {activeTab === 'services' && 'Add, edit, and manage service offerings'}
                {activeTab === 'jobs' && 'Create and manage job openings'}
                {activeTab === 'reviews' && 'Approve and manage customer reviews'}
              </p>
            </div>
            <button
              onClick={fetchAllData}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {[
                  { label: 'Total Services', value: stats.totalServices, icon: Settings, color: 'text-blue-600' },
                  { label: 'Active Services', value: stats.activeServices, icon: CheckCircle2, color: 'text-emerald-600' },
                  { label: 'Total Jobs', value: stats.totalJobs, icon: Briefcase, color: 'text-purple-600' },
                  { label: 'Open Jobs', value: stats.openJobs, icon: Users, color: 'text-emerald-600' },
                  { label: 'Total Reviews', value: stats.totalReviews, icon: Star, color: 'text-amber-600' },
                  { label: 'Pending Reviews', value: stats.pendingReviews, icon: Clock, color: 'text-orange-600' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                    </div>
                    <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Add New Service', desc: 'Create a new service', icon: Plus, color: 'bg-blue-500', action: () => { setActiveTab('services'); setEditingService(null); setShowServiceModal(true); } },
                  { title: 'Add New Job', desc: 'Create a job opening', icon: Briefcase, color: 'bg-emerald-500', action: () => { setActiveTab('jobs'); setEditingJob(null); setShowJobModal(true); } },
                  { title: 'Review Pending', desc: `${stats.pendingReviews} reviews to approve`, icon: Star, color: 'bg-amber-500', action: () => setActiveTab('reviews') },
                  { title: 'View All Services', desc: 'Manage existing services', icon: Settings, color: 'bg-purple-500', action: () => setActiveTab('services') },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-all duration-300 text-left group hover:-translate-y-0.5"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-950">{item.title}</h3>
                    <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== SERVICES TAB ===== */}
          {activeTab === 'services' && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-80 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => { setEditingService(null); setShowServiceModal(true); }}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>

              {filteredServices.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <Settings className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">{searchTerm ? 'No services match your search' : 'No services added yet'}</p>
                  {!searchTerm && (
                    <button
                      onClick={() => { setEditingService(null); setShowServiceModal(true); }}
                      className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      + Add your first service
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="relative h-40 bg-slate-200">
                        <img
                          src={service.image || '/images/services/placeholder.jpg'}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/images/services/placeholder.jpg'; }}
                        />
                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${service.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'} ring-2 ring-white`} />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-blue-950">{service.title}</h3>
                            <p className="text-xs text-slate-500">{service.category}</p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${service.color}`} />
                        </div>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{service.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {service.features?.slice(0, 2).map((feature, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{feature}</span>
                          ))}
                          {service.features?.length > 2 && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">+{service.features.length - 2}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-slate-100">
                          <button
                            onClick={() => { setEditingService(service); setShowServiceModal(true); }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== JOBS TAB ===== */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-80 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => { setEditingJob(null); setShowJobModal(true); }}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" />
                  Add Job
                </button>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">{searchTerm ? 'No jobs match your search' : 'No job openings'}</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Title</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Department</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Location</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Type</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Status</th>
                          <th className="text-right px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredJobs.map((job) => (
                          <tr key={job.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-slate-800 text-sm">{job.title}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden sm:table-cell">{job.department}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden md:table-cell">{job.location}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden lg:table-cell">{job.type}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'open' ? 'bg-emerald-100 text-emerald-700' : job.status === 'draft' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                {job.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => { setEditingJob(job); setShowJobModal(true); }}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== REVIEWS TAB ===== */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="relative w-full sm:w-44">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white text-sm appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {filteredReviews.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">{searchTerm ? 'No reviews match your search' : 'No reviews found'}</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Name</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Review</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Rating</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden xs:table-cell">Status</th>
                          <th className="text-right px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReviews.map((review) => (
                          <tr key={review.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3">
                              <p className="font-medium text-slate-800 text-sm">{review.name}</p>
                              <p className="text-xs text-slate-400">{review.area}</p>
                            </td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden sm:table-cell max-w-xs truncate">{review.quote}</td>
                            <td className="px-4 py-3">
                              <div className="flex text-yellow-400">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 hidden xs:table-cell">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${review.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : review.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                {review.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                {review.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateReviewStatus(review.id, 'approved')}
                                      className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                      title="Approve"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleUpdateReviewStatus(review.id, 'rejected')}
                                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Reject"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ===== MODALS ===== */}
      <ServiceModal
        isOpen={showServiceModal}
        onClose={() => { setShowServiceModal(false); setEditingService(null); }}
        onSave={editingService ? handleUpdateService : handleAddService}
        service={editingService}
        isEditing={!!editingService}
      />

      <JobModal
        isOpen={showJobModal}
        onClose={() => { setShowJobModal(false); setEditingJob(null); }}
        onSave={editingJob ? handleUpdateJob : handleAddJob}
        job={editingJob}
        isEditing={!!editingJob}
      />
    </div>
  );
}

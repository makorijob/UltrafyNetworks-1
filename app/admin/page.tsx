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
  Eye,
  EyeOff,
  Database,
  DollarSign,
  Percent,
  Calendar,
  Building,
  Mail,
  Image,
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

interface Investment {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  min_investment: string;
  expected_return: string;
  duration: string;
  image: string;
  features: string[];
  status: string;
  featured: boolean;
  created_at: string;
}

interface Message {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta_text: string;
  cta_link: string;
  badge: string;
  display_order: number;
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
    status: 'active',
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
        status: service.status || 'active',
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
        status: 'active',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-100 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-blue-950">
                {isEditing ? 'Edit Service' : 'Add New Service'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing ? 'Update service details' : 'Create a new service offering'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Service Image
            </label>
            <div 
              className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-200 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              {imagePreview ? (
                <div className="relative h-48 w-full rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">Click to upload an image</p>
                  <p className="text-slate-400 text-sm mt-1">PNG, JPG, or WebP (Max 5MB)</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Service Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. CCTV Installation"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 appearance-none"
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 appearance-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe the service in detail..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-slate-700">
                Features
              </label>
              <button 
                type="button" 
                onClick={addFeature} 
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" /> Add Feature
              </button>
            </div>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
                {formData.features.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeFeature(index)} 
                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-semibold"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={uploading} 
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              {uploading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-5 h-5" /> {isEditing ? 'Update Service' : 'Add Service'}</>
              )}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-100 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 group">
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-blue-950">
                {isEditing ? 'Edit Job' : 'Add New Job'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing ? 'Update job details' : 'Create a new job opening'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Field Technician"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Network Operations"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Thika"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 appearance-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 appearance-none"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Icon</label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 appearance-none"
            >
              <option value="Wrench">Wrench</option>
              <option value="Headset">Headset</option>
              <option value="TrendingUp">TrendingUp</option>
              <option value="Users">Users</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              rows={4}
              placeholder="Describe the role and responsibilities..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-semibold">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25">
              {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : <><Save className="w-5 h-5" /> {isEditing ? 'Update Job' : 'Add Job'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============ INVESTMENT MODAL ============
function InvestmentModal({ isOpen, onClose, onSave, investment, isEditing }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void; investment?: Investment | null; isEditing: boolean }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Infrastructure',
    icon: 'TrendingUp',
    min_investment: '50,000',
    expected_return: '15%',
    duration: '12 months',
    image: '',
    features: [''],
    featured: false,
    status: 'active',
  });
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (investment) {
      setFormData({
        title: investment.title || '',
        description: investment.description || '',
        category: investment.category || 'Infrastructure',
        icon: investment.icon || 'TrendingUp',
        min_investment: investment.min_investment || '50,000',
        expected_return: investment.expected_return || '15%',
        duration: investment.duration || '12 months',
        image: investment.image || '',
        features: investment.features || [''],
        featured: investment.featured || false,
        status: investment.status || 'active',
      });
      setImagePreview(investment.image || '');
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Infrastructure',
        icon: 'TrendingUp',
        min_investment: '50,000',
        expected_return: '15%',
        duration: '12 months',
        image: '',
        features: [''],
        featured: false,
        status: 'active',
      });
      setImagePreview('');
    }
  }, [investment]);

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
    setSaving(true);
    try {
      const investData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
      };
      await onSave(investData);
      onClose();
    } catch (error) {
      alert('Failed to save investment opportunity. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-100 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 group">
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-blue-950">
                {isEditing ? 'Edit Investment' : 'Add New Investment'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing ? 'Update investment details' : 'Create a new investment opportunity'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Image</label>
            <div 
              className="relative border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-emerald-500 hover:bg-emerald-50/50 transition-all duration-200 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              {imagePreview ? (
                <div className="relative h-48 w-full rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">Click to upload an image</p>
                  <p className="text-slate-400 text-sm mt-1">PNG, JPG, or WebP</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Fibre Network Expansion"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 appearance-none"
                required
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="Energy">Energy</option>
                <option value="Security">Security</option>
                <option value="Connectivity">Connectivity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 appearance-none"
              >
                <option value="TrendingUp">TrendingUp</option>
                <option value="Sun">Sun</option>
                <option value="Shield">Shield</option>
                <option value="Wifi">Wifi</option>
                <option value="Building">Building</option>
                <option value="Users">Users</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Min Investment *</label>
              <input
                type="text"
                value={formData.min_investment}
                onChange={(e) => setFormData({ ...formData, min_investment: e.target.value })}
                placeholder="e.g. 50,000"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Expected Return *</label>
              <input
                type="text"
                value={formData.expected_return}
                onChange={(e) => setFormData({ ...formData, expected_return: e.target.value })}
                placeholder="e.g. 15%"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Duration *</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 12 months"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe the investment opportunity..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-slate-700">Features</label>
              <button type="button" onClick={addFeature} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all">
                <Plus className="w-4 h-4" /> Add Feature
              </button>
            </div>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
                {formData.features.length > 1 && (
                  <button type="button" onClick={() => removeFeature(index)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
              />
              Featured Investment
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-semibold">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25">
              {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : <><Save className="w-5 h-5" /> {isEditing ? 'Update' : 'Add'} Investment</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============ SLIDE MODAL ============
function SlideModal({ isOpen, onClose, onSave, slide, isEditing }: { isOpen: boolean; onClose: () => void; onSave: (data: any) => void; slide?: Slide | null; isEditing: boolean }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    cta_text: 'Learn More',
    cta_link: '#',
    badge: 'Featured',
    display_order: 0,
    status: 'active',
  });
  const [imageData, setImageData] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        description: slide.description || '',
        cta_text: slide.cta_text || 'Learn More',
        cta_link: slide.cta_link || '#',
        badge: slide.badge || 'Featured',
        display_order: slide.display_order || 0,
        status: slide.status || 'active',
      });
      setImagePreview(slide.image || '');
      setImageData(slide.image || '');
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        cta_text: 'Learn More',
        cta_link: '#',
        badge: 'Featured',
        display_order: 0,
        status: 'active',
      });
      setImagePreview('');
      setImageData('');
    }
    setError('');
  }, [slide]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      setImageData(base64String);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      const dataToSend = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        description: formData.description.trim(),
        cta_text: formData.cta_text.trim(),
        cta_link: formData.cta_link.trim(),
        badge: formData.badge.trim(),
        display_order: Number(formData.display_order),
        status: formData.status,
        image: imageData || '/images/slides/default.jpg',
      };
      
      if (!imageData && !isEditing) {
        setError('Please select an image');
        setSaving(false);
        return;
      }
      
      await onSave(dataToSend);
      onClose();
    } catch (err) {
      setError('Failed to save slide. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-100 px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200 group">
              <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-blue-950">
                {isEditing ? 'Edit Slide' : 'Add New Slide'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEditing ? 'Update slide details' : 'Create a new hero slide'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Slide Image <span className="text-red-500">*</span>
            </label>
            <div 
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 cursor-pointer ${
                error && !imagePreview ? 'border-red-500 bg-red-50/50' : 'border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Slide preview"
                    className="h-48 w-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                    <p className="text-white text-sm font-medium">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="py-8">
                  <Upload className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">Click to upload an image</p>
                  <p className="text-slate-400 text-sm mt-1">PNG, JPG, or WebP (Max 5MB)</p>
                </div>
              )}
            </div>
            {error && !imagePreview && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. UltrafyNetworks"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Subtitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Tuko Thika"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Describe the slide content..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">CTA Text</label>
              <input
                type="text"
                value={formData.cta_text}
                onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                placeholder="e.g. Get Connected Now"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">CTA Link</label>
              <input
                type="text"
                value={formData.cta_link}
                onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                placeholder="e.g. #contact"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Badge</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Now live in Thika"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                placeholder="0"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 appearance-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-semibold">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25">
              {saving ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-5 h-5" /> {isEditing ? 'Update' : 'Add'} Slide</>
              )}
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
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Password reset states
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');

  // Data states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    totalJobs: 0,
    openJobs: 0,
    totalReviews: 0,
    pendingReviews: 0,
    totalInvestments: 0,
    activeInvestments: 0,
    unreadMessages: 0,
    totalSlides: 0,
    activeSlides: 0,
  });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [showSlideModal, setShowSlideModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);

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
      // Fetch services
      const servicesRes = await fetch('/api/services');
      const servicesData = await servicesRes.json();
      if (servicesData.success) {
        setServices(servicesData.data);
        setStats(prev => ({
          ...prev,
          totalServices: servicesData.data.length,
          activeServices: servicesData.data.filter((s: any) => s.status === 'active').length,
        }));
      }

      // Fetch careers
      const careersRes = await fetch('/api/careers?status=all');
      const careersData = await careersRes.json();
      if (careersData.success) {
        setJobs(careersData.data);
        setStats(prev => ({
          ...prev,
          totalJobs: careersData.data.length,
          openJobs: careersData.data.filter((j: any) => j.status === 'open').length,
        }));
      }

      // Fetch reviews
      const reviewsRes = await fetch('/api/admin/reviews');
      const reviewsData = await reviewsRes.json();
      if (reviewsData.success) {
        setReviews(reviewsData.data);
        setStats(prev => ({
          ...prev,
          totalReviews: reviewsData.data.length,
          pendingReviews: reviewsData.data.filter((r: any) => r.status === 'pending').length,
        }));
      }

      // Fetch investments
      try {
        const investRes = await fetch('/api/invest?status=all');
        const investData = await investRes.json();
        console.log('Invest API response:', investData);
        
        if (investData.success && investData.data) {
          setInvestments(investData.data);
          setStats(prev => ({
            ...prev,
            totalInvestments: investData.data.length,
            activeInvestments: investData.data.filter((i: any) => i.status === 'active').length,
          }));
        } else {
          console.error('Invest API returned error:', investData.error);
          setInvestments([]);
        }
      } catch (error) {
        console.error('Failed to fetch investments:', error);
        setInvestments([]);
      }

      // Fetch messages
      const messagesRes = await fetch('/api/contact');
      const messagesData = await messagesRes.json();
      if (messagesData.success) {
        setMessages(messagesData.data);
        setStats(prev => ({
          ...prev,
          unreadMessages: messagesData.data.filter((m: any) => m.status === 'unread').length,
        }));
      }

      // Fetch slides
      const slidesRes = await fetch('/api/slider?status=all');
      const slidesData = await slidesRes.json();
      if (slidesData.success) {
        setSlides(slidesData.data);
        setStats(prev => ({
          ...prev,
          totalSlides: slidesData.data.length,
          activeSlides: slidesData.data.filter((s: any) => s.status === 'active').length,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage('');
    setResetError('');
    
    try {
      const response = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResetMessage('Password reset instructions sent to your email!');
        setResetEmail('');
        setTimeout(() => {
          setShowReset(false);
          setResetMessage('');
        }, 5000);
      } else {
        setResetError(data.error || 'Failed to send reset email');
      }
    } catch (error) {
      setResetError('Network error. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthorized(false);
    setPassword('');
  };

  // ============ SERVICE CRUD ============
  const handleAddService = async (data: any) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Service added successfully!');
        return true;
      } else {
        alert(result.error || 'Failed to add service');
        return false;
      }
    } catch (error) {
      console.error('Add service error:', error);
      alert('Error adding service');
      return false;
    }
  };

  const handleUpdateService = async (data: any) => {
    try {
      const response = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingService?.id, ...data }),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Service updated successfully!');
        return true;
      } else {
        alert(result.error || 'Failed to update service');
        return false;
      }
    } catch (error) {
      console.error('Update service error:', error);
      alert('Error updating service');
      return false;
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const response = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Service deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Delete service error:', error);
      alert('Error deleting service');
    }
  };

  // ============ JOB CRUD ============
  const handleAddJob = async (data: any) => {
    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Job added successfully!');
        return true;
      } else {
        alert(result.error || 'Failed to add job');
        return false;
      }
    } catch (error) {
      console.error('Add job error:', error);
      alert('Error adding job');
      return false;
    }
  };

  const handleUpdateJob = async (data: any) => {
    try {
      const response = await fetch('/api/careers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingJob?.id, ...data }),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Job updated successfully!');
        return true;
      } else {
        alert(result.error || 'Failed to update job');
        return false;
      }
    } catch (error) {
      console.error('Update job error:', error);
      alert('Error updating job');
      return false;
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      const response = await fetch(`/api/careers?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Job deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Delete job error:', error);
      alert('Error deleting job');
    }
  };

  // ============ REVIEW CRUD ============
  const handleUpdateReviewStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || `Review ${status} successfully!`);
      } else {
        alert(result.error || 'Failed to update review status');
      }
    } catch (error) {
      console.error('Update review error:', error);
      alert('Error updating review status');
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const response = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Review deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Delete review error:', error);
      alert('Error deleting review');
    }
  };

  // ============ INVESTMENT CRUD ============
  const handleAddInvestment = async (data: any) => {
    try {
      const response = await fetch('/api/invest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        await fetchAllData();
        alert(result.message || 'Investment added successfully!');
        return true;
      } else {
        alert(result.error || 'Failed to add investment');
        return false;
      }
    } catch (error) {
      console.error('Add investment error:', error);
      alert('Error adding investment: ' + (error as Error).message);
      return false;
    }
  };

  const handleUpdateInvestment = async (data: any) => {
    try {
      const response = await fetch('/api/invest', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingInvestment?.id, ...data }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        await fetchAllData();
        alert(result.message || 'Investment updated successfully!');
        return true;
      } else {
        alert(result.error || 'Failed to update investment');
        return false;
      }
    } catch (error) {
      console.error('Update investment error:', error);
      alert('Error updating investment: ' + (error as Error).message);
      return false;
    }
  };

  const handleDeleteInvestment = async (id: number) => {
    if (!confirm('Are you sure you want to delete this investment opportunity?')) return;
    try {
      const response = await fetch(`/api/invest?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok && result.success) {
        await fetchAllData();
        alert(result.message || 'Investment deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete investment');
      }
    } catch (error) {
      console.error('Delete investment error:', error);
      alert('Error deleting investment: ' + (error as Error).message);
    }
  };

  // ============ MESSAGE CRUD ============
  const updateMessageStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || `Message marked as ${status}`);
      } else {
        alert(result.error || 'Failed to update message status');
      }
    } catch (error) {
      console.error('Update message error:', error);
      alert('Error updating message status');
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Message deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete message');
      }
    } catch (error) {
      console.error('Delete message error:', error);
      alert('Error deleting message');
    }
  };

  // ============ SLIDE CRUD ============
  const handleAddSlide = async (data: any) => {
    try {
      const response = await fetch('/api/slider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Slide added successfully!');
        return true;
      } else {
        alert(result.error || 'Failed to add slide');
        return false;
      }
    } catch (error) {
      console.error('Add slide error:', error);
      alert('Error adding slide');
      return false;
    }
  };

  const handleUpdateSlide = async (data: any) => {
    try {
      const response = await fetch('/api/slider', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingSlide?.id, ...data }),
      });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Slide updated successfully!');
        return true;
      } else {
        alert(result.error || 'Failed to update slide');
        return false;
      }
    } catch (error) {
      console.error('Update slide error:', error);
      alert('Error updating slide');
      return false;
    }
  };

  const handleDeleteSlide = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    try {
      const response = await fetch(`/api/slider?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.ok) {
        await fetchAllData();
        alert(result.message || 'Slide deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete slide');
      }
    } catch (error) {
      console.error('Delete slide error:', error);
      alert('Error deleting slide');
    }
  };

  // ============ LOGIN SCREEN ============
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Shield className="w-10 h-10 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-blue-950">Admin Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">
              {showReset ? 'Reset your password' : 'Enter password to access admin panel'}
            </p>
          </div>

          {!showReset ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-500 pr-12"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
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

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowReset(true);
                    setResetError('');
                    setResetMessage('');
                  }}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <p className="text-xs text-slate-400 text-center mt-4">Protected area. Authorized personnel only.</p>
            </form>
          ) : (
            <form onSubmit={handlePasswordReset} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-500"
                  required
                />
                <p className="text-xs text-slate-400 mt-1">
                  We'll send you instructions to reset your password.
                </p>
              </div>

              {resetError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {resetError}
                </div>
              )}

              {resetMessage && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-700 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {resetMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20"
              >
                Send Reset Link
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowReset(false);
                    setResetError('');
                    setResetMessage('');
                  }}
                  className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors"
                >
                  Back to login
                </button>
              </div>
            </form>
          )}
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

  const filteredInvestments = investments.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = messages.filter(m => 
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSlides = slides.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'services', label: 'Services', icon: Settings, badge: stats.totalServices },
    { id: 'jobs', label: 'Careers', icon: Briefcase, badge: stats.openJobs },
    { id: 'reviews', label: 'Reviews', icon: Star, badge: stats.pendingReviews },
    { id: 'invest', label: 'Invest', icon: TrendingUp, badge: stats.activeInvestments },
    { id: 'messages', label: 'Messages', icon: Mail, badge: stats.unreadMessages },
    { id: 'slides', label: 'Slides', icon: Image, badge: stats.activeSlides },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-white rounded-xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex min-h-screen">
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-100 shadow-2xl transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                UFN
              </div>
              <div>
                <h1 className="font-bold text-blue-950">UltrafyNetworks</h1>
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
              {new Date().getFullYear()} UltrafyNetworks
            </p>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 flex items-center gap-2">
                {activeTab === 'overview' && <LayoutDashboard className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'services' && <Settings className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'jobs' && <Briefcase className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'reviews' && <Star className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'invest' && <TrendingUp className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'messages' && <Mail className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'slides' && <Image className="w-7 h-7 text-emerald-500" />}
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'services' && 'Services Management'}
                {activeTab === 'jobs' && 'Career Management'}
                {activeTab === 'reviews' && 'Review Management'}
                {activeTab === 'invest' && 'Investment Management'}
                {activeTab === 'messages' && 'Messages'}
                {activeTab === 'slides' && 'Slider Management'}
              </h1>
              <p className="text-slate-500 text-sm">
                {activeTab === 'overview' && 'Manage all aspects of your business'}
                {activeTab === 'services' && 'Add, edit, and manage service offerings'}
                {activeTab === 'jobs' && 'Create and manage job openings'}
                {activeTab === 'reviews' && 'Approve and manage customer reviews'}
                {activeTab === 'invest' && 'Manage investment opportunities'}
                {activeTab === 'messages' && 'View and manage contact messages'}
                {activeTab === 'slides' && 'Manage hero slider slides'}
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

          {/* Overview Tab */}
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
                  { title: 'Add Investment', desc: 'Create investment opportunity', icon: TrendingUp, color: 'bg-amber-500', action: () => { setActiveTab('invest'); setEditingInvestment(null); setShowInvestmentModal(true); } },
                  { title: 'Add Slide', desc: 'Create hero slider slide', icon: Image, color: 'bg-purple-500', action: () => { setActiveTab('slides'); setEditingSlide(null); setShowSlideModal(true); } },
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

          {/* Services Tab */}
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
                      className="w-full sm:w-80 pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => { setEditingService(null); setShowServiceModal(true); }}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 w-full sm:w-auto justify-center"
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
                      Add your first service
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

          {/* Jobs Tab */}
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
                      className="w-full sm:w-80 pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => { setEditingJob(null); setShowJobModal(true); }}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" />
                  Add Job
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                  <span className="ml-3 text-slate-600">Loading jobs...</span>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">{searchTerm ? 'No jobs match your search' : 'No job openings'}</p>
                  {!searchTerm && (
                    <button
                      onClick={() => { setEditingJob(null); setShowJobModal(true); }}
                      className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Add your first job
                    </button>
                  )}
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
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                job.status === 'open' ? 'bg-emerald-100 text-emerald-700' : 
                                job.status === 'draft' ? 'bg-amber-100 text-amber-700' : 
                                'bg-red-100 text-red-700'
                              }`}>
                                {job.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => { setEditingJob(job); setShowJobModal(true); }}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteJob(job.id)}
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
                  <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                    Showing {filteredJobs.length} of {jobs.length} jobs
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
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
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="relative w-full sm:w-44">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm appearance-none"
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

          {/* Invest Tab */}
          {activeTab === 'invest' && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search investments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-80 pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => { setEditingInvestment(null); setShowInvestmentModal(true); }}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" />
                  Add Investment
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                  <span className="ml-3 text-slate-600">Loading investments...</span>
                </div>
              ) : filteredInvestments.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">{searchTerm ? 'No investments match your search' : 'No investment opportunities'}</p>
                  {!searchTerm && (
                    <button
                      onClick={() => { setEditingInvestment(null); setShowInvestmentModal(true); }}
                      className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Add your first investment
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Title</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Category</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Min Investment</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Return</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Featured</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Status</th>
                          <th className="text-right px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvestments.map((investment) => (
                          <tr key={investment.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-slate-800 text-sm">{investment.title}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden sm:table-cell">{investment.category}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden md:table-cell">KSh {investment.min_investment}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden lg:table-cell">{investment.expected_return}</td>
                            <td className="px-4 py-3">
                              {investment.featured ? (
                                <span className="text-amber-500">★</span>
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                investment.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 
                                investment.status === 'completed' ? 'bg-blue-100 text-blue-700' : 
                                'bg-red-100 text-red-700'
                              }`}>
                                {investment.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => { setEditingInvestment(investment); setShowInvestmentModal(true); }}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteInvestment(investment.id)}
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
                  <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                    Showing {filteredInvestments.length} of {investments.length} investments
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="relative w-full sm:w-44">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm appearance-none"
                  >
                    <option value="all">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                  <span className="ml-3 text-slate-600">Loading messages...</span>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">{searchTerm ? 'No messages match your search' : 'No messages found'}</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">From</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">Subject</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Message</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Status</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
                          <th className="text-right px-4 py-3 text-slate-600 font-semibold text-xs uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMessages.map((msg) => (
                          <tr key={msg.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${msg.status === 'unread' ? 'bg-blue-50/50' : ''}`}>
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-slate-800 text-sm">{msg.fullName}</p>
                                <p className="text-xs text-slate-400">{msg.phone}</p>
                                {msg.email && <p className="text-xs text-slate-400">{msg.email}</p>}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden sm:table-cell">
                              <span className={`${msg.status === 'unread' ? 'font-semibold' : ''}`}>
                                {msg.subject}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden md:table-cell max-w-xs truncate">
                              {msg.message}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                msg.status === 'unread' ? 'bg-blue-100 text-blue-700' : 
                                msg.status === 'read' ? 'bg-green-100 text-green-700' : 
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {msg.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500 text-sm hidden lg:table-cell">
                              {new Date(msg.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                {msg.status === 'unread' && (
                                  <button
                                    onClick={() => updateMessageStatus(msg.id, 'read')}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Mark as read"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    alert(`Message from ${msg.fullName}:\n\n${msg.message}\n\nPhone: ${msg.phone}\nEmail: ${msg.email || 'N/A'}`);
                                    if (msg.status === 'unread') {
                                      updateMessageStatus(msg.id, 'read');
                                    }
                                  }}
                                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="View message"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteMessage(msg.id)}
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
                  <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                    Showing {filteredMessages.length} of {messages.length} messages
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Slides Tab */}
          {activeTab === 'slides' && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex-1 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search slides..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-80 pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <button
                  onClick={() => { setEditingSlide(null); setShowSlideModal(true); }}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" />
                  Add Slide
                </button>
              </div>

              {filteredSlides.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <Image className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">{searchTerm ? 'No slides match your search' : 'No slides added yet'}</p>
                  {!searchTerm && (
                    <button
                      onClick={() => { setEditingSlide(null); setShowSlideModal(true); }}
                      className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Add your first slide
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSlides.map((slide) => (
                    <div key={slide.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="relative h-48 bg-slate-200">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/1a56db/ffffff?text=UltrafyNetworks'; }}
                        />
                        <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${slide.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'} ring-2 ring-white`} />
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                          Order: {slide.display_order || 0}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-blue-950">{slide.title}</h3>
                            <p className="text-xs text-slate-500">{slide.subtitle}</p>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            {slide.badge}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{slide.description}</p>
                        <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-slate-100">
                          <button
                            onClick={() => { setEditingSlide(slide); setShowSlideModal(true); }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSlide(slide.id)}
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
        </main>
      </div>

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

      <InvestmentModal
        isOpen={showInvestmentModal}
        onClose={() => { setShowInvestmentModal(false); setEditingInvestment(null); }}
        onSave={editingInvestment ? handleUpdateInvestment : handleAddInvestment}
        investment={editingInvestment}
        isEditing={!!editingInvestment}
      />

      <SlideModal
        isOpen={showSlideModal}
        onClose={() => { setShowSlideModal(false); setEditingSlide(null); }}
        onSave={editingSlide ? handleUpdateSlide : handleAddSlide}
        slide={editingSlide}
        isEditing={!!editingSlide}
      />
    </div>
  );
}

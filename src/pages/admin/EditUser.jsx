import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../../services/auth.ts';
import { useToast } from '../../context/ToastContext.jsx';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showApiResponse, showError, showSuccess } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "STUDENT",
    avatar: "",
  });

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await AuthService.getUserById(id);
      if (response.success) {
        const userData = response.data;
        setUser(userData);
        setForm({
          name: userData.name || "",
          email: userData.email || "",
          role: userData.role || "STUDENT",
          avatar: userData.avatar || "",
        });
      } else {
        showError('Failed to fetch user data');
      }
    } catch (error) {
      showError(error.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = {
        name: form.name,
        email: form.email,
        role: form.role,
        avatar: form.avatar,
      };

      const response = await AuthService.updateUser(id, userData);
      
      if (response.success) {
        showSuccess('User updated successfully!');
        navigate('/admin/users');
      } else {
        showError(response.message || 'Failed to update user');
      }
    } catch (error) {
      showError(error.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.deleteUser(id);
      
      if (response.success) {
        showSuccess('User deleted successfully!');
        navigate('/admin/users');
      } else {
        showError(response.message || 'Failed to delete user');
      }
    } catch (error) {
      showError(error.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
            <select 
              name="role" 
              value={form.role} 
              onChange={handleChange} 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
            <input 
              type="url" 
              name="avatar" 
              value={form.avatar} 
              onChange={handleChange} 
              placeholder="Enter avatar URL (e.g., https://example.com/avatar.jpg)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.avatar && (
              <div className="mt-2">
                <img 
                  src={form.avatar} 
                  alt="Avatar preview" 
                  className="w-16 h-16 object-cover rounded-full border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const errorDiv = e.target.nextSibling;
                    if (errorDiv) {
                      errorDiv.style.display = 'block';
                    }
                  }}
                />
                <div className="hidden text-sm text-red-500 mt-1">Invalid image URL</div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Updating...' : 'Update User'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/admin/users')}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Deleting...' : 'Delete User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.ts';
import { useToast } from '../../context/ToastContext.jsx';

const AddCourse = () => {
  const navigate = useNavigate();
  const { showApiResponse, showError } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    level: 'BEGINNER',
    status: 'ACTIVE'
  });
  const [structures, setStructures] = useState([]);
  const [activeTab, setActiveTab] = useState('course');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addStructure = () => {
    const newStructure = {
      id: Date.now(),
      title: '',
      description: '',
      type: 'VIDEO',
      lectures: '',
      duration: '',
      videoUrl: '',
      pdfUrl: ''
    };
    setStructures([...structures, newStructure]);
  };

  const updateStructure = (index, field, value) => {
    const updatedStructures = [...structures];
    updatedStructures[index] = {
      ...updatedStructures[index],
      [field]: value
    };
    setStructures(updatedStructures);
  };

  const removeStructure = (index) => {
    setStructures(structures.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const courseData = {
        title: form.title,
        description: form.description,
        price: form.price,
        category: form.category,
        level: form.level,
        status: form.status,
        // Add structures if any
        ...(structures.length > 0 && { structures: structures })
      };

      const response = await AuthService.createCourse(courseData);
      showApiResponse(response, 'Course created successfully!');
      
      if (response.success) {
        navigate('/admin/courses');
      }
    } catch (error) {
      showError(error.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Course</h1>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('course')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'course'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Course Details
            </button>
            <button
              onClick={() => setActiveTab('structures')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'structures'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Course Structures ({structures.length})
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Details Tab */}
          {activeTab === 'course' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  required 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={form.price} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input 
                    type="text" 
                    name="category" 
                    value={form.category} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
                  <select 
                    name="level" 
                    value={form.level} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select 
                  name="status" 
                  value={form.status} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>
            </div>
          )}

          {/* Course Structures Tab */}
          {activeTab === 'structures' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Course Structures</h3>
                <button
                  type="button"
                  onClick={addStructure}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Structure
                </button>
              </div>

              {structures.map((structure, index) => (
                <div key={structure.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Structure {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeStructure(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input 
                        type="text" 
                        value={structure.title} 
                        onChange={(e) => updateStructure(index, 'title', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select 
                        value={structure.type} 
                        onChange={(e) => updateStructure(index, 'type', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="VIDEO">Video</option>
                        <option value="PDF">PDF</option>
                        <option value="QUIZ">Quiz</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lectures</label>
                      <input 
                        type="text" 
                        value={structure.lectures} 
                        onChange={(e) => updateStructure(index, 'lectures', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input 
                        type="text" 
                        value={structure.duration} 
                        onChange={(e) => updateStructure(index, 'duration', e.target.value)} 
                        placeholder="e.g., 30 minutes"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                      <input 
                        type="url" 
                        value={structure.videoUrl} 
                        onChange={(e) => updateStructure(index, 'videoUrl', e.target.value)} 
                        placeholder="YouTube or Vimeo URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">PDF URL</label>
                      <input 
                        type="url" 
                        value={structure.pdfUrl} 
                        onChange={(e) => updateStructure(index, 'pdfUrl', e.target.value)} 
                        placeholder="PDF file URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea 
                        value={structure.description} 
                        onChange={(e) => updateStructure(index, 'description', e.target.value)} 
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {structures.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No structures added yet. Click "Add Structure" to get started.</p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/admin/courses')}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

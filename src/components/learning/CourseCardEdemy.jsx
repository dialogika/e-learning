import React from 'react';
import { Link } from 'react-router-dom';

const CourseCardEdemy = ({ 
  id, 
  image, 
  title, 
  instructor, 
  description, 
  price, 
  category, 
  level, 
  duration 
}) => (
  <Link to={`/courses/${id}`} className="block transform hover:scale-105 transition h-full">
    <div className="bg-white rounded-xl shadow-md w-full max-w-xs min-h-[380px] flex flex-col h-full overflow-hidden border hover:shadow-lg transition mx-auto">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[48px]">{title}</h3>
        <div className="text-sm text-gray-500 mb-2">{instructor}</div>
        
        {/* Course Meta Info */}
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
          {category && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{category}</span>}
          {level && <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{level}</span>}
          {duration && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">{duration}</span>}
        </div>
        
        {/* Description Section */}
        <div className="flex-1">
          <div className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[60px]">
            {description || "No description available"}
          </div>
        </div>
        
        {/* Course Info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{price ? `$${price}` : 'Free'}</span>
            <span className="text-blue-600 font-medium">→</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default CourseCardEdemy; 
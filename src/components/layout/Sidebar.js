import React from 'react';

const Sidebar = ({ onNavigate }) => {
  const categories = [
    { name: 'Textbooks' },
    { name: 'Notes' },
    { name: 'Lab Equipment' },
    { name: 'Gadgets' },
    { name: 'Stationery' }
  ];

  const handleCategoryClick = (categoryName) => {
    onNavigate('Marketplace', { category: categoryName });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
      <h2 className="text-slate-500 dark:text-slate-400 uppercase text-xs font-medium mb-3">SOLUTIONS</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.name}>
            <button 
              onClick={() => handleCategoryClick(category.name)}
              className="w-full text-left py-1 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

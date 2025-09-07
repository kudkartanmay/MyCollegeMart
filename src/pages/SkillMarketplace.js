import React from 'react';
import PlaceholderPage from '../components/common/PlaceholderPage';
import StarRating from '../components/UI/StarRating';

const SkillMarketplace = ({ onNavigate }) => {
  // Mock data for skills
  const skills = [
    { id: 1, title: 'C++ Tutoring for DSA', author: 'Priya V.', branch: 'CSE', price: '₹500/hr', rating: 4.9 },
    { id: 2, title: 'AutoCAD Project Help', author: 'Ravi M.', branch: 'Mechanical', price: '₹1500/project', rating: 4.8 },
    { id: 3, title: 'Surveying Lab Assistance', author: 'Suresh K.', branch: 'Civil', price: '₹800/lab', rating: 5.0 },
  ];

  return (
    <PlaceholderPage title="🛠️ Skill Marketplace">
      <div className="mb-6">Find skilled peers to help with tutoring, projects, and lab work.</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map(skill => (
          <div key={skill.id} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg shadow border hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{skill.title}</h3>
            <p className="text-sm text-slate-500">by {skill.author} ({skill.branch})</p>
            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-indigo-600">{skill.price}</p>
              <StarRating rating={skill.rating} />
            </div>
            <button className="w-full mt-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg">Contact</button>
          </div>
        ))}
      </div>
    </PlaceholderPage>
  );
};

export default SkillMarketplace;

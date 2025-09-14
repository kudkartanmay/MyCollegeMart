import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon } from '../components/UI/Icons';

const ServiceCard = ({ service, onSelect }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
    className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-700"
    onClick={() => onSelect(service)}
  >
    <div className="p-5">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{service.title}</h3>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/50 dark:text-fuchsia-300">{service.type}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{service.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-extrabold text-slate-800 dark:text-white">₹{service.price}</span>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <AcademicCapIcon className="w-4 h-4" />
          <span>{service.branch} - Sem {service.semester}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Filters = ({ onFilterChange, currentFilters }) => {
  const serviceTypes = ['All', 'Assignment', 'Practical', 'Tutoring', 'Project'];
  const semesters = ['All', 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <aside className="w-full md:w-64 lg:w-72 p-4 space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow md:sticky top-20 h-fit">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Filters</h3>
      <div>
        <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Service Type</h4>
        <select onChange={(e) => onFilterChange('type', e.target.value)} value={currentFilters.type} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800">
          {serviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Branch</h4>
        <select onChange={(e) => onFilterChange('branch', e.target.value)} value={currentFilters.branch} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800">
          {engineeringBranches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Semester</h4>
        <select onChange={(e) => onFilterChange('semester', e.target.value)} value={currentFilters.semester} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800">
          {semesters.map(s => <option key={s} value={s}>{s === 'All' ? 'All Semesters' : `Semester ${s}`}</option>)}
        </select>
      </div>
    </aside>
  );
};

const SkillMarketplace = () => {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('idle');
  const [filters, setFilters] = useState({
    type: 'All',
    branch: 'All Branches',
    semester: 'All',
  });
  useEffect(() => {
    setStatus('loading');
    mockFirebase.firestore.getServices()
      .then(data => {
        setServices(data);
        setStatus('succeeded');
      })
      .catch(() => setStatus('failed'));
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const typeMatch = filters.type === 'All' || service.type === filters.type;
      const branchMatch = filters.branch === 'All Branches' || service.branch === filters.branch;
      const semesterMatch = filters.semester === 'All' || service.semester.toString() === filters.semester.toString();
      return typeMatch && branchMatch && semesterMatch;
    });
  }, [services, filters]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Filters onFilterChange={handleFilterChange} currentFilters={filters} />
      <main className="flex-1">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Skills & Services Marketplace</h1>
        {status === 'loading' && <p>Loading services...</p>}
        {status === 'succeeded' && (
          filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} onSelect={() => { /* Navigate to service detail */ }} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold">No Services Found</h2>
              <p className="mt-2 text-slate-500">Try adjusting your filters or check back later!</p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default SkillMarketplace;

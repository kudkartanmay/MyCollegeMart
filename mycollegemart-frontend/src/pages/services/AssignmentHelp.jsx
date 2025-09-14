import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { UploadIcon, TrashIcon, PdfIcon, FileTextIcon } from '../../components/UI/Icons';

const engineeringBranches = [
  'All Branches',
  'Computer Engineering',
  'Civil Engineering',
  'Electronics and Telecommunication Engineering',
  'Information Technology',
  'Instrumentation Engineering',
  'Mechanical Engineering',
  'Artificial Intelligence and Data Science',
  'Computer Science and Engineering (Data Science)',
  'Electronics and Telecommunication Engineering (VLSI)'
];

const PreviewModal = ({ file, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div className="relative bg-white dark:bg-slate-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 rounded-full p-2"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
      <div className="p-4 border-b dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{file.file.name}</h3>
      </div>
      <div className="p-4">
        {file.file.type.startsWith('image/') ? (
          <img src={file.previewUrl} alt={file.file.name} className="max-w-full max-h-[70vh] object-contain mx-auto" />
        ) : file.file.type === 'application/pdf' ? (
          <iframe 
            src={file.previewUrl} 
            className="w-full h-[70vh] border-0"
            title={file.file.name}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <FileTextIcon className="w-16 h-16 mb-4" />
            <p>Preview not available for this file type</p>
            <p className="text-sm mt-2">File type: {file.file.type || 'Unknown'}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const AssignmentHelp = () => {
  const { dispatch } = useGlobalState();
  const [serviceType, setServiceType] = useState('Assignment');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [branch, setBranch] = useState(engineeringBranches[0]);
  const [semester, setSemester] = useState('1');
  const [files, setFiles] = useState([]);
  const [deadline, setDeadline] = useState('Standard');
  const [previewFile, setPreviewFile] = useState(null);

  const deadlineOptions = {
    Standard: { label: 'Standard (7 days)', price: 149 },  // Regular price
    Express: { label: 'Express (3 days)', price: 249 },   // Regular price
    Urgent: { label: 'Urgent (24 hours)', price: 399 }    // Regular price
  };

  // Add Prime member price display
  const primeDeadlineOptions = {
    Standard: { label: 'Standard (7 days)', price: 99 },  // Prime price
    Express: { label: 'Express (3 days)', price: 149 },   // Prime price
    Urgent: { label: 'Urgent (24 hours)', price: 249 }    // Prime price
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        previewUrl: URL.createObjectURL(file)
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    URL.revokeObjectURL(files[index].previewUrl);
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.previewUrl));
    };
  }, [files]);

  const resetForm = () => {
    setServiceType('Assignment');
    setSubject('');
    setTopic('');
    setDescription('');
    setBranch(engineeringBranches[0]);
    setSemester('1');
    setFiles([]);
    setDeadline('Standard');
    // Clean up file preview URLs
    files.forEach(file => URL.revokeObjectURL(file.previewUrl));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { message: 'Please upload at least one file.', type: 'error' }
      });
      return;
    }
    // In a real app, you would handle form submission, file uploads, and payment processing here.
    dispatch({
      type: actionTypes.ADD_NOTIFICATION,
      payload: { message: 'Your request has been submitted! We will contact you shortly.', type: 'success' }
    });

    // Reset form after successful submission
    resetForm();
  };

  const INPUT_STYLE = "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-8 space-y-8 bg-white dark:bg-slate-800/50 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700"
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Assignment & Practical Help</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Get expert guidance on your assignments and practicals from experienced tutors.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type */}
          <fieldset>
            <legend className="text-lg font-semibold mb-2">1. Select Service Type</legend>
            <div className="flex gap-4">
              {['Assignment', 'Practical Report'].map(type => (
                <label key={type} className={`flex-1 p-4 border rounded-lg cursor-pointer text-center ${serviceType === type ? 'bg-fuchsia-100 dark:bg-fuchsia-900/50 border-fuchsia-500' : 'bg-slate-50 dark:bg-slate-800'}`}>
                  <input type="radio" name="serviceType" value={type} checked={serviceType === type} onChange={e => setServiceType(e.target.value)} className="sr-only" />
                  <span className="font-semibold">{type}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Assignment Details */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-2">2. Provide Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Subject/Course Name*</label>
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} required className={`mt-1 ${INPUT_STYLE}`} />
              </div>
              <div>
                <label className="text-sm font-medium">Assignment/Practical Topic*</label>
                <input type="text" value={topic} onChange={e => setTopic(e.target.value)} required className={`mt-1 ${INPUT_STYLE}`} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description*</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} required rows="4" className={`mt-1 ${INPUT_STYLE}`} placeholder="Describe your requirements, specific questions, and any guidelines."></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Branch*</label>
                <select value={branch} onChange={e => setBranch(e.target.value)} required className={`mt-1 ${INPUT_STYLE}`}>
                  {engineeringBranches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Semester*</label>
                <select value={semester} onChange={e => setSemester(e.target.value)} required className={`mt-1 ${INPUT_STYLE}`}>
                  {Array.from({ length: 8 }, (_, i) => i + 1).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </fieldset>

          {/* File Upload */}
          <fieldset>
            <legend className="text-lg font-semibold mb-2">3. Upload Files*</legend>
            <label htmlFor="file-upload" className="cursor-pointer w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-slate-500 hover:border-fuchsia-500 hover:text-fuchsia-500 transition">
              <UploadIcon />
              <span className="mt-2 text-sm">Click to upload question papers, notes, or references</span>
              <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} multiple required />
            </label>
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <div 
                    key={index} 
                    className="relative group bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600 cursor-pointer"
                    onClick={() => setPreviewFile(file)}
                  >
                    {file.file.type.startsWith('image/') ? (
                      <img src={file.previewUrl} alt={file.file.name} className="w-full h-24 object-cover" />
                    ) : (
                      <div className="w-full h-24 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                        {file.file.type === 'application/pdf' ? <PdfIcon /> : <FileTextIcon />}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-white text-xs truncate">
                      {file.file.name}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove file"
                    >
                      <TrashIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </fieldset>

          {/* Deadline & Pricing */}
          <fieldset>
            <legend className="text-lg font-semibold mb-2">4. Select Deadline</legend>
            <div className="space-y-2">
              {Object.entries(deadlineOptions).map(([key, { label, price }]) => (
                <label key={key} className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer ${deadline === key ? 'bg-fuchsia-100 dark:bg-fuchsia-900/50 border-fuchsia-500' : 'bg-slate-50 dark:bg-slate-800'}`}>
                  <input type="radio" name="deadline" value={key} checked={deadline === key} onChange={e => setDeadline(e.target.value)} className="sr-only" />
                  <div className="flex flex-col">
                    <span className="font-semibold">{label}</span>
                    <span className="text-xs text-fuchsia-600 dark:text-fuchsia-400">Prime price: ₹{primeDeadlineOptions[key].price}</span>
                  </div>
                  <span className="font-bold text-lg">₹{price}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Prime members get special discounted rates on all services.</p>
          </fieldset>

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition">
            Submit Request (Total: ₹{deadlineOptions[deadline].price})
          </button>
        </form>
      </motion.div>

      {/* Preview Modal */}
      {previewFile && (
        <PreviewModal 
          file={previewFile} 
          onClose={() => setPreviewFile(null)} 
        />
      )}
    </div>
  );
};

export default AssignmentHelp;

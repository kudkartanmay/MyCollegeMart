import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { TrashIcon, SparklesIcon, UploadIcon, CloseIcon } from '../../components/UI/Icons';

const Sell = ({ onNavigate }) => {
  const { dispatch } = useGlobalState();
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Textbooks');
  const [branch, setBranch] = useState('All Branches');
  const [semester, setSemester] = useState('All');
  const [description, setDescription] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]); // New state for video previews
  const [videoUrl, setVideoUrl] = useState('');
  const [highlights, setHighlights] = useState(['', '', '']);
  // const [specs, setSpecs] = useState([{ key: '', value: '' }]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoError, setVideoError] = useState(''); // Track video upload errors
  const videoInputRef = useRef(null); // Reference to video input element

  // Engineering branches
  const branches = [
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
  
  const semesters = ['All', '1', '2', '3', '4', '5', '6', '7', '8'];
  const categories = [
    'Textbooks',
    'Notes',
    'Lab Equipment',
    'Electronics',
    'Calculators',
    'Drawing Supplies',
    'Study Guides',
    'Programming Tools',
    'Project Materials',
    'Workshop Equipment',
    'Technical Devices',
    'Reference Books',
    'Stationery'
  ];

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImagePreviews(prev => prev.concat(filesArray));
      // In a real app, you'd handle the file objects themselves for upload
    }
  };
  
  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // New function to handle video uploads
  const handleVideoChange = async (e) => {
    setVideoError('');
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newVideos = Array.from(e.target.files);
    if (videoPreviews.length + newVideos.length > 5) {
      setVideoError('Maximum 5 videos allowed');
      return;
    }
    
    for (const file of newVideos) {
      // Check file size (rough estimate: 1MB per 10 seconds for medium quality)
      const MAX_SIZE_MB = 10; // Allowing 10MB which should cover ~1min of video
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setVideoError(`Video "${file.name}" exceeds maximum size of ${MAX_SIZE_MB}MB`);
        return;
      }
      
      // Create preview with additional metadata
      const videoObj = {
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file: file // Store the actual file
      };
      
      setVideoPreviews(prev => [...prev, videoObj]);
    }
    
    // Reset the input to allow selecting the same file again
    if (videoInputRef.current) videoInputRef.current.value = '';
  };
  
  // Remove video function
  const removeVideo = (index) => {
    setVideoPreviews(prev => {
      const newPreviews = [...prev];
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(newPreviews[index].url);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };
  
  const handleHighlightChange = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  // Define all available specification options
  const allSpecOptions = [
    { id: "condition", key: "Condition", value: "Used - Like New" },
    { id: "brand", key: "Brand", value: "e.g., Casio, HP, Staedtler" },
    { id: "edition", key: "Edition", value: "e.g., 4th Edition, 2023" },
    { id: "author", key: "Author", value: "e.g., P.K. Nag, H.C. Verma" },
    { id: "publication", key: "Publication", value: "e.g., Pearson, McGraw Hill" },
    { id: "age", key: "Age", value: "e.g., 6 months old" },
    { id: "purchase_date", key: "Purchase Date", value: "e.g., Jan 2023" },
    { id: "warranty", key: "Warranty", value: "e.g., 3 months remaining" },
    { id: "features", key: "Features", value: "e.g., Annotated, Solved examples" },
    { id: "subject", key: "Subject", value: "e.g., Data Structures, Thermodynamics" }
  ];

  // Initialize specs and track available options
  const [specs, setSpecs] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([...allSpecOptions]);
  const [showMaxSpecsWarning, setShowMaxSpecsWarning] = useState(false);

  // Track when warning should be shown or hidden
  useEffect(() => {
    if (availableOptions.length === 0) {
      setShowMaxSpecsWarning(true);
    } else {
      setShowMaxSpecsWarning(false);
    }
  }, [availableOptions]);

  const addSpecField = () => {
    if (availableOptions.length === 0) {
      setShowMaxSpecsWarning(true);
      return;
    }

    // Add the first available option
    const optionToAdd = availableOptions[0];
    
    // Remove the selected option from available options
    setAvailableOptions(prev => prev.filter(option => option.id !== optionToAdd.id));
    
    // Add new spec with the selected option
    setSpecs(prev => [
      ...prev, 
      { 
        id: optionToAdd.id,
        key: '',
        value: '',
        placeholder: optionToAdd
      }
    ]);
  };
  
  const removeSpecField = (index) => {
    // Get the spec to remove
    const removedSpec = specs[index];
    
    // Add the option back to available options if it has an id
    if (removedSpec && removedSpec.id) {
      const originalOption = allSpecOptions.find(option => option.id === removedSpec.id);
      if (originalOption) {
        setAvailableOptions(prev => [...prev, originalOption]);
      }
    }
    
    // Remove the spec
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleGenerateDescription = async () => {
    if (!itemName) {
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { message: `Please enter an item name first.`, type: 'error' }
      });
      return;
    }
    setIsGenerating(true);
    // ... [API call logic remains the same] ...
    setTimeout(() => { // Mocking the API call
      setDescription(`This ${itemName} is a must-have for any student in the ${category} course. It's in great condition and will surely help you succeed!`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.ADD_NOTIFICATION,
      payload: { message: `Item listed for sale successfully!`, type: 'success' }
    });
    onNavigate('Marketplace');
  };

  const INPUT_STYLE = "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition";

  return (
    <div className="min-h-[60vh] py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto p-8 space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
          Create Your Listing
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <fieldset className="space-y-4 p-4 border rounded-lg">
            <legend className="text-lg font-semibold px-2">Basic Info</legend>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Item Name*</label>
              <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} required className={`mt-1 ${INPUT_STYLE}`}/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price (₹)*</label>
                <input type="number" required className={`mt-1 ${INPUT_STYLE}`}/>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category*</label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  required 
                  className={`mt-1 ${INPUT_STYLE}`}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Added Branch and Semester dropdowns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Branch*</label>
                <select 
                  value={branch} 
                  onChange={e => setBranch(e.target.value)} 
                  required 
                  className={`mt-1 ${INPUT_STYLE}`}
                >
                  {branches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Semester*</label>
                <select 
                  value={semester} 
                  onChange={e => setSemester(e.target.value)} 
                  required 
                  className={`mt-1 ${INPUT_STYLE}`}
                >
                  {semesters.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          {/* Description */}
          <fieldset className="p-4 border rounded-lg">
            <legend className="text-lg font-semibold px-2">Description</legend>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Item Description*</label>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-50 flex items-center"
                title="Automatically generate a description based on item details"
              >
                {isGenerating ? 'Generating...' : <> <SparklesIcon className="w-5 h-5 mr-1"/> Generate with AI </>}
              </button>
            </div>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              rows="3" 
              required 
              className={`w-full ${INPUT_STYLE}`}
              placeholder={`Describe your item, including condition, usage history, and any special features.${branch !== 'All Branches' ? ` Ideal for ${branch} students.` : ''}`}
            ></textarea>
          </fieldset>

          {/* Image & Video Upload */}
          <fieldset className="space-y-4 p-4 border rounded-lg">
            <legend className="text-lg font-semibold px-2">Media</legend>
            
            {/* Images section */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Images*</label>
              <div className="mt-2 flex items-center flex-wrap gap-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img src={src} alt="Preview" className="w-full h-full object-cover rounded-lg"/>
                    <button 
                      type="button" 
                      onClick={() => removeImage(index)} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      title="Remove image"
                    >
                      <CloseIcon className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
                <label htmlFor="file-upload" title="Upload images" className="cursor-pointer w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500">
                  <UploadIcon />
                  <span className="text-xs">Add Image</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} multiple />
                </label>
              </div>
            </div>
            
            {/* New Video Upload section */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Videos (Optional, max 5)</label>
                <span className="text-xs text-slate-500 dark:text-slate-400">{videoPreviews.length}/5 videos</span>
              </div>
              
              {videoError && (
                <p className="text-sm text-red-500 mt-1">{videoError}</p>
              )}
              
              <div className="mt-2 flex items-center flex-wrap gap-4">
                {videoPreviews.map((video, index) => (
                  <div key={index} className="relative w-32 h-24 bg-black rounded-lg overflow-hidden">
                    <video 
                      src={video.url} 
                      className="w-full h-full object-cover" 
                      controls
                    ></video>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-0.5 text-[10px] text-white truncate">
                      {video.name}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => removeVideo(index)} 
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      title="Remove video"
                    >
                      <CloseIcon className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
                
                {videoPreviews.length < 5 && (
                  <label htmlFor="video-upload" title="Upload videos" className="cursor-pointer w-32 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500">
                    <UploadIcon />
                    <span className="text-xs">Add Video</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Max 1 min each</span>
                    <input 
                      id="video-upload" 
                      name="video-upload" 
                      type="file" 
                      className="sr-only" 
                      accept="video/*" 
                      onChange={handleVideoChange} 
                      multiple 
                      ref={videoInputRef}
                    />
                  </label>
                )}
              </div>
            </div>
            
            {/* Video URL section */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Video URL (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g., https://youtube.com/watch?v=..." 
                value={videoUrl} 
                onChange={e => setVideoUrl(e.target.value)} 
                className={`mt-1 ${INPUT_STYLE}`}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">You can provide a YouTube or other video URL in addition to or instead of uploading videos</p>
            </div>
          </fieldset>
          
          {/* Details */}
          <fieldset className="space-y-4 p-4 border rounded-lg">
            <legend className="text-lg font-semibold px-2">Additional Details</legend>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Key Highlights (Optional)</label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Add up to 3 key features.</p>
              {highlights.map((h, i) => (
                <input key={i} type="text" value={h} onChange={e => handleHighlightChange(i, e.target.value)} placeholder={`Highlight ${i+1}`} className={`mt-1 ${INPUT_STYLE} mb-2`}/>
              ))}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Specifications (Optional)</label>
              <div className="space-y-2 max-w-2xl">
                {specs.map((spec, i) => (
                  <div key={i} className="flex gap-2 mt-1 bg-slate-100 dark:bg-slate-700/40 rounded px-2 py-1 items-center">
                    <input 
                      type="text" 
                      value={spec.key} 
                      onChange={e => handleSpecChange(i, 'key', e.target.value)} 
                      placeholder={spec.placeholder.key} 
                      className={`w-1/3 ${INPUT_STYLE}`}
                    />
                    <input 
                      type="text" 
                      value={spec.value} 
                      onChange={e => handleSpecChange(i, 'value', e.target.value)} 
                      placeholder={spec.placeholder.value} 
                      className={`w-2/3 ${INPUT_STYLE}`}
                    />
                    <button 
                      type="button" 
                      onClick={() => removeSpecField(i)} 
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                      title="Remove specification"
                    >
                      <TrashIcon/>
                    </button>
                  </div>
                ))}
              </div>

              {showMaxSpecsWarning ? (
                <div className="mt-2 text-amber-600 dark:text-amber-400 text-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Maximum number of specification types reached
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={addSpecField} 
                  className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                  title="Add a new specification field"
                >
                  <span className="mr-1">+</span> Add another spec
                </button>
              )}
            </div>
          </fieldset>
          
          <button type="submit" className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold rounded-lg transition shadow-md">
            List My Item
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Sell;

import { useState } from 'react';
import { motion } from 'framer-motion';

const COLOR_PATTERNS = [
	"from-blue-400 via-indigo-500 to-purple-600",
	"from-green-400 via-teal-500 to-blue-500",
	"from-pink-400 via-red-500 to-yellow-500",
	"from-purple-400 via-pink-500 to-red-500",
	"from-cyan-400 via-sky-500 to-blue-700",
	"from-orange-400 via-yellow-500 to-pink-500",
	"from-lime-400 via-green-500 to-emerald-600",
	"from-fuchsia-400 via-rose-500 to-orange-500",
	"from-amber-400 via-yellow-500 to-lime-500",
	"from-teal-400 via-cyan-500 to-blue-500",
	"from-rose-400 via-pink-500 to-fuchsia-600",
	"from-violet-400 via-indigo-500 to-blue-500"
];

// Utility to shuffle array
function shuffleArray(array) {
	const arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

const SkillMarketplace = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [skills, setSkills] = useState([
		{ id: 1, title: 'C++ Tutoring for DSA', author: 'Priya V.', branch: 'Computer Engineering', price: '₹500/hr', rating: 4, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2 }, // 2 days ago
		{ id: 2, title: 'AutoCAD Project', author: 'Ravi M.', branch: 'Civil Engineering', price: '₹1500/project', rating: 4, createdAt: Date.now() - 1000 * 60 * 60 * 5 }, // 5 hours ago
		{ id: 3, title: 'Surveying Lab Help', author: 'Suresh K.', branch: 'Information Technology', price: '₹800/lab', rating: 5, createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7 }, // 7 days ago
	]);
	const [editSkill, setEditSkill] = useState(null); // Track skill being edited
	const [colorOrder, setColorOrder] = useState(shuffleArray(COLOR_PATTERNS));

	// Engineering branches
	const branches = [
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

	// Improved animation variants with better timing
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05, // Reduced from 0.1 for smoother flow
				duration: 0.15,        // Shorter duration
				when: "beforeChildren"  // Ensures container becomes visible before children
			}
		}
	};
	
	const itemVariants = {
		hidden: { opacity: 0, y: 10 }, // Reduced y distance
		show: { 
			opacity: 1, 
			y: 0, 
			transition: { duration: 0.2 } // Faster transition
		}
	};

	const handleAddSkill = (newSkill) => {
		if (editSkill) {
			// Edit mode: update the skill
			setSkills(skills =>
				skills.map(s =>
					s.id === editSkill.id ? { ...s, ...newSkill } : s
				)
			);
			setEditSkill(null);
		} else {
			// Add mode: add new skill
			const skillWithId = {
				...newSkill,
				id: skills.length + 1,
				rating: 0,
				createdAt: Date.now() // mark new listing
			};
			setSkills(prev => [...prev, skillWithId]);
			// Shuffle color pattern order for new listing
			setColorOrder(shuffleArray(COLOR_PATTERNS));
		}
		setIsModalOpen(false);
	};

	const handleEditClick = (skill) => {
		setEditSkill(skill);
		setIsModalOpen(true);
	};

	// NEW: update rating for a skill
	const handleRate = (skillId, newRating) => {
		setSkills(prev =>
			prev.map(s => (s.id === skillId ? { ...s, rating: newRating } : s))
		);
	};

	return (
		<div className="min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }} // Faster initial fade-in
				className="max-w-6xl mx-auto"
			>
				<div className="text-center">
					{/* Title with glowing effect */}
					<motion.div
						className="flex items-center justify-center mb-6 space-x-3"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }} 
					>
						<motion.span
							className="text-4xl"
							animate={{ rotate: [0, -10, 0, 10, 0] }}
							transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
						>
							🛠️
						</motion.span>
						<motion.h1 
							className="text-4xl font-extrabold text-slate-900 dark:text-white"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							Skill Marketplace
						</motion.h1>
					</motion.div>
					
					<motion.p 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						className="mt-2 text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
					>
						Find skilled peers to help with tutoring, projects, and lab work.
						Or share your own expertise to help others while earning.
					</motion.p>
				</div>

				<div className="flex justify-between items-center mt-10 mb-6">
					<motion.h2 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-2xl font-bold text-slate-800 dark:text-white"
					>
						Available Skills
					</motion.h2>
					
					{/* Button with fixed glowing effect */}
					<div className="relative inline-block">
						<motion.button
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setIsModalOpen(true)}
							className="group relative px-6 py-3 text-white font-medium rounded-full overflow-hidden z-10"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 z-0"></div>
							<div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transition-opacity duration-300 ease-out z-0"></div>
							<motion.div 
								className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent z-0"
								style={{ opacity: 0.2 }}
								animate={{
									x: ["calc(-100%)", "calc(100%)"]
								}}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									repeatType: "loop"
								}}
							/>
							<span className="relative flex items-center z-10">
								<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
								Share Your Expertise
							</span>
						</motion.button>
					</div>
				</div>
				
				<motion.div 
					variants={containerVariants}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{skills.map((skill, index) => (
						<SkillCard 
							key={skill.id} 
							skill={skill} 
							variants={itemVariants} 
							colorIndex={index % colorOrder.length}
							colorPattern={colorOrder[index % colorOrder.length]}
							onEdit={() => handleEditClick(skill)}
							onRate={(rating) => handleRate(skill.id, rating)} // NEW: pass handler
						/>
					))}
				</motion.div>
			</motion.div>

			{/* Add Skill Modal */}
			{isModalOpen && (
				<AddSkillModal 
					onClose={() => { setIsModalOpen(false); setEditSkill(null); }}
					onAddSkill={handleAddSkill}
					branches={branches}
					initialData={editSkill}
				/>
			)}
		</div>
	);
};

const AddSkillModal = ({ onClose, onAddSkill, branches, initialData }) => {
	const [formData, setFormData] = useState({
		title: initialData?.title || '',
		author: initialData?.author || '',
		branch: initialData?.branch || '',
		price: initialData?.price ? initialData.price.replace(/[^0-9]/g, '') : '',
		priceUnit: initialData?.price ? initialData.price.replace(/^[^/]+/, '') : '/hr',
		email: initialData?.contact || '',
		phone: initialData?.phone || ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onAddSkill({
			title: formData.title,
			author: formData.author,
			branch: formData.branch,
			price: `₹${formData.price}${formData.priceUnit}`,
			contact: formData.email, // Always store email in contact for mailto
			phone: formData.phone    // Store phone separately
		});
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
			<motion.div 
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ type: "spring", stiffness: 300, damping: 25 }}
				className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-2xl w-full p-8 relative overflow-hidden"
			>
				{/* Animated gradient header */}
				<motion.div
					className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
					animate={{
						backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						repeatType: "loop"
					}}
				/>
				
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-slate-900 dark:text-white">Share Your Expertise</h2>
					<button 
						onClick={onClose}
						className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skill Title</label>
						<input 
							type="text" 
							name="title" 
							value={formData.title}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
							placeholder="e.g., Python Programming Help"
						/>
					</div>
					
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
							<input 
								type="text" 
								name="author" 
								value={formData.author}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
							<select 
								name="branch" 
								value={formData.branch}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="">Select</option>
								{branches.map(branch => (
									<option key={branch} value={branch}>{branch}</option>
								))}
							</select>
						</div>
					</div>
					
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price (₹)</label>
							<input 
								type="number" 
								name="price" 
								value={formData.price}
								onChange={handleChange}
								required
								min="1"
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Per</label>
							<select 
								name="priceUnit" 
								value={formData.priceUnit}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="/hr">Per Hour</option>
								<option value="/project">Per Project</option>
								<option value="/session">Per Session</option>
								<option value="/lab">Per Lab</option>
							</select>
						</div>
					</div>
					{/* Email and Phone inputs */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
								Contact Email <span className="text-red-500">*</span>
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
								placeholder="e.g., johndoe@email.com"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
								Contact Number (optional)
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								pattern="^(\+?\d{1,4}[\s-]?)?\d{10}$"
								className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"
								placeholder="e.g., +91XXXXXXXXXX"
							/>
						</div>
					</div>
					<div className="pt-4">
						<div className="flex space-x-3">
							<motion.button
								type="button"
								onClick={onClose}
								whileTap={{ scale: 0.95 }}
								className="flex-1 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
							>
								Cancel
							</motion.button>
							
							{/* Submit button with internal glow effect */}
							<motion.button
								type="submit"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg relative overflow-hidden"
							>
								<span className="relative z-10">Submit</span>
								<motion.span 
									className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent"
									style={{ opacity: 0.2 }}
									animate={{
										x: ["calc(-100%)", "calc(100%)"]
									}}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										repeatType: "loop"
									}}
								/>
							</motion.button>
						</div>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

const EDIT_COLOR_PATTERNS = [
	"from-yellow-400 via-orange-500 to-pink-500",
	"from-amber-400 via-lime-500 to-green-500",
	"from-fuchsia-400 via-rose-500 to-orange-500",
	"from-rose-400 via-pink-500 to-fuchsia-600",
	"from-violet-400 via-indigo-500 to-blue-500",
	"from-cyan-400 via-sky-500 to-blue-700",
	"from-emerald-400 via-green-500 to-lime-500",
	"from-red-400 via-orange-500 to-yellow-500",
	"from-blue-400 via-cyan-500 to-teal-500",
	"from-indigo-400 via-purple-500 to-pink-500"
];

const SkillCard = ({ skill, variants, colorPattern, onEdit, onRate }) => {
	// Different glow color combinations for buttons
	
	// Display contact details if provided
	const isEmail = skill.contact && skill.contact.includes('@');
	const isPhone = skill.phone && skill.phone.length > 0;

	const handleContact = () => {
		let mailto = "mailto:";
		let subject = `Interested in your skill: ${skill.title}`;
		let body = `Hi ${skill.author},%0D%0A%0D%0A`;
		body += `I found your skill offering "${skill.title}" (${skill.branch}) listed on MyCollegeMart.%0D%0A`;
		if (isPhone) {
			body += `I see your contact number is ${skill.phone}.%0D%0A`;
		}
		body += `I am interested in learning more about this offering, including availability, pricing, and how to proceed further.%0D%0A%0D%0A`;
		body += `Please reply to this email or contact me at your convenience.%0D%0A%0D%0AThanks!`;

		if (isEmail) {
			mailto += encodeURIComponent(skill.contact);
		}
		mailto += `?subject=${encodeURIComponent(subject)}&body=${body}`;
		window.location.href = mailto;
	};

	// Pick a different color for edit button (offset by 3 for variety)
	const editColorPattern =
		EDIT_COLOR_PATTERNS[
			(colorPattern
				? COLOR_PATTERNS.indexOf(colorPattern)
				: 0 + 3) % EDIT_COLOR_PATTERNS.length
		];

	// New: determine if card is "new" (within 24 hours) and compute human-friendly age
	const isNew = skill.createdAt && (Date.now() - skill.createdAt) < 1000 * 60 * 60 * 24;
	const ageHours = skill.createdAt ? Math.floor((Date.now() - skill.createdAt) / (1000 * 60 * 60)) : null;
	const ageLabel = skill.createdAt
		? ageHours < 1 ? 'Just now' : (ageHours < 24 ? `${ageHours}h ago` : `${Math.floor(ageHours/24)}d ago`)
		: '';

	return (
		<motion.div 
			variants={variants}
			// Subtle lift, minimal scale to avoid layout shift
			whileHover={{ y: -4, scale: 1.005 }}
			whileTap={{ scale: 0.997 }}
			transition={{ type: 'tween', duration: 0.15, ease: 'easeOut' }}
			className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-lg relative flex flex-col h-full will-change-transform transform-gpu"
		>
			{/* price badge and (new) badge at top-right */}
			<div className="absolute top-2 right-2 z-20 flex items-center gap-2">
				{isNew && (
					<motion.span
						initial={{ scale: 0.9, opacity: 0.9 }}
						animate={{ scale: [0.98, 1.06, 1], opacity: 1 }}
						transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror' }}
						className="text-xs font-semibold px-2 py-1 rounded-full bg-rose-500 text-white shadow-sm"
						title="New listing"
					>
						New
					</motion.span>
				)}
				<div className="bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-full whitespace-nowrap">
					<span className="font-bold text-indigo-700 dark:text-indigo-300">{skill.price}</span>
				</div>
			</div>

			<div className="relative flex-grow">
				{/* Title with fixed width and proper wrapping */}
				<h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1 overflow-hidden text-ellipsis pr-32">
					{skill.title}
				</h3>
				
				<div className="flex flex-wrap items-center text-sm text-slate-500 dark:text-slate-400">
					<span className="mr-2">by {skill.author}</span>
					<span className="inline-block w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full"></span>
					<span className="ml-2 text-indigo-600 dark:text-indigo-400 font-medium overflow-hidden text-ellipsis">
						{skill.branch}
					</span>
				</div>
				{/* Contact details */}
				{(skill.contact || skill.phone) && (
					<div className="mt-2 text-sm text-slate-700 dark:text-slate-300 break-all">
						{isEmail && (
							<div>
								<span className="font-semibold">Email:</span> {skill.contact}
							</div>
						)}
						{isPhone && (
							<div>
								<span className="font-semibold">Phone:</span> {skill.phone}
							</div>
						)}
					</div>
				)}
				{/* small age label under branch */}
				{ageLabel && (
					<div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
						Added • {ageLabel}
					</div>
				)}
			</div>
			<div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60">
				{/* Reverted to justify-between for better alignment as per image */}
				<div className="flex items-center justify-between w-full">
					{/* left: stars */}
					<div className="flex items-center gap-0.5" role="radiogroup" aria-label={`Rating for ${skill.title}`}>
						{[1,2,3,4,5].map(i => (
							<button
								key={i}
								type="button"
								onClick={() => onRate && onRate(i)}
								className="p-0.5"
								aria-label={`${i} star`}
								title={`${i} star`}
							>
								<svg
									className={`w-4 h-4 ${i <= skill.rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
									fill={i <= skill.rating ? 'currentColor' : 'none'}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
								</svg>
							</button>
						))}
					</div>

					{/* right: buttons grouped together */}
					<div className="flex items-center gap-2">
						{/* Contact button */}
						<motion.button 
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleContact}
							className={`h-9 px-4 bg-gradient-to-r ${colorPattern} text-white font-medium rounded-lg relative overflow-hidden flex items-center gap-2`}
						>
							<span className="relative z-10 flex items-center" aria-hidden>
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v12a1 1 0 001 1z" />
								</svg>
							</span>
							<span className="relative z-10">Contact</span>
							<motion.span 
								className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent"
								style={{ opacity: 0.06 }}
								animate={{ x: ['-90%', '90%'] }}
								transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
							/>
						</motion.button>

						{/* Edit button */}
						<motion.button
							onClick={onEdit}
							whileHover={{ scale: 1.03 }}
							whileTap={{ scale: 0.95 }}
							className={`h-9 px-4 bg-gradient-to-r ${editColorPattern} text-white font-medium rounded-lg relative overflow-hidden flex items-center gap-2`}
							aria-label={`Edit ${skill.title}`}
						>
							<span className="relative z-10 flex items-center" aria-hidden>
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536M4 20h4l10-10-4-4L4 16v4z" />
								</svg>
							</span>
							<span className="relative z-10">Edit</span>
						</motion.button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default SkillMarketplace;
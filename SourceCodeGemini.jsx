const { useState, useEffect, createContext, useContext, useMemo, useReducer, useRef } = React;
const { createPortal } = ReactDOM;

// --- MOCK ASSETS & CONFIG ---
const mockFirebase = {
  auth: {
    onAuthStateChanged: (callback) => {
      setTimeout(() => callback({ uid: '123', email: 'student@college.edu', displayName: 'Alex Doe' }), 2000);
      return () => {};
    },
    signInWithEmailAndPassword: (email, password) => Promise.resolve({ user: { uid: '123', email, displayName: 'Alex Doe' } }),
    createUserWithEmailAndPassword: (email, password) => Promise.resolve({ user: { uid: '123', email, displayName: 'Alex Doe' } }),
    signOut: () => Promise.resolve(),
  },
  firestore: {
    getProducts: () => Promise.resolve([
        { 
            id: 1, 
            name: 'Intro to Psychology Textbook', 
            price: 4499.00, 
            category: 'Textbooks', 
            imageUrl: 'https://placehold.co/600x800/a2d2ff/ffffff?text=Psych+101',
            gallery: ['https://placehold.co/600x800/a2d2ff/ffffff?text=Psych+101', 'https://placehold.co/600x800/a2d2ff/ffffff?text=Cover', 'https://placehold.co/600x800/a2d2ff/ffffff?text=Index'],
            rating: 4.5, reviewCount: 18, isPrime: true,
            description: "A comprehensive introductory textbook for Psychology 101. This 5th edition covers all major concepts from social psychology to neuroscience. Perfect for any student starting their psychology journey. The book is in excellent condition with minimal highlighting.",
            highlights: ["Latest Edition", "Covers Core Concepts", "Great Condition"],
            specs: { "Condition": "Used - Like New", "Author": "Dr. Jane Doe", "Publisher": "College Press", "Year": "2022" },
            reviews: [{ author: 'Sarah J.', rating: 5, comment: "This book was a lifesaver! Super easy to understand.", image: 'https://placehold.co/200x150/e0e0e0/000000?text=Review+Image' }, { author: 'Mike R.', rating: 4, comment: "Good condition, but had a few highlighted pages." }],
            frequentlyBoughtTogether: [2, 3], branch: 'CSE', semester: 3, isRentable: true, isExchangeable: true,
            sellerInfo: { name: 'Rohan S.', rating: 4.8 },
            communityQA: [{ id: 1, question: "Is this book useful for the KTU syllabus?", author: "Priya", answers: [{ text: "Yes, it covers almost 90% of the topics perfectly!", author: "Rohan S." }] }]
        },
        { 
            id: 2, name: 'Calculus I Lecture Notes', price: 799.00, category: 'Notes', imageUrl: 'https://placehold.co/600x800/bde0fe/ffffff?text=Calc+Notes',
            gallery: ['https://placehold.co/600x800/bde0fe/ffffff?text=Calc+Notes'], rating: 5, reviewCount: 12, isPrime: true,
            description: "Complete, handwritten lecture notes for a Calculus I course. Covers everything from limits to integrals with detailed examples and professor's tips. Guaranteed to help you ace the final!",
            highlights: ["Covers Full Semester", "Detailed Examples", "From an A+ Student"],
            specs: { "Condition": "Digital PDF", "Course": "MATH 101", "Professor": "Dr. Alan Grant" },
            reviews: [{ author: 'Chris P.', rating: 5, comment: "These notes saved my grade. Highly recommend!" }],
            variants: { 'Professor': ['Dr. Grant', 'Dr. Elen'], 'Year': ['2024', '2023'] },
            branch: 'Mechanical', semester: 1, isVerified: true, sellerInfo: { name: 'Aisha K.', rating: 5.0 }, communityQA: []
        },
        { 
            id: 3, name: 'Organic Chemistry Model Kit', price: 2250.00, category: 'Lab Equipment', imageUrl: 'https://placehold.co/600x800/ffafcc/ffffff?text=Chem+Kit',
            gallery: ['https://placehold.co/600x800/ffafcc/ffffff?text=Chem+Kit', 'https://placehold.co/600x800/ffafcc/ffffff?text=Video+Thumbnail'],
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', rating: 4, reviewCount: 25,
            description: "A complete molecular model kit for organic chemistry. Essential for visualizing complex 3D structures and mechanisms. All pieces are included and in great condition.",
            highlights: ["All Pieces Included", "Essential for Orgo", "Durable Plastic"],
            specs: { "Condition": "Used - Excellent", "Brand": "MoleculAR" },
            reviews: [{ author: 'Emily K.', rating: 4, comment: "Wish I had bought this sooner. Makes studying so much easier." }],
            branch: 'Civil', semester: 2, isRentable: true, sellerInfo: { name: 'Vikram P.', rating: 4.5 }, communityQA: []
        },
        { id: 4, name: 'Dorm Room Mini Fridge', price: 8999.00, category: 'Gadgets', imageUrl: 'https://placehold.co/600x800/ffc8dd/ffffff?text=Mini+Fridge', gallery: ['https://placehold.co/600x800/ffc8dd/ffffff?text=Mini+Fridge'], rating: 4.5, reviewCount: 8, description: "Compact and quiet mini-fridge, perfect for a dorm room. Keeps drinks and snacks perfectly chilled. Used for one semester, works like new.", highlights: ["Compact Size", "Quiet Operation", "Clean and Working"], specs: { "Condition": "Used - Like New", "Capacity": "1.6 Cubic Feet" }, branch: 'Any', semester: 'Any', isRentable: true, sellerInfo: { name: 'Megha L.', rating: 4.9 }, communityQA: [] },
        { id: 5, name: 'Advanced Economics Textbook', price: 6500.00, category: 'Textbooks', imageUrl: 'https://placehold.co/600x800/cdb4db/ffffff?text=Econ+301', gallery: ['https://placehold.co/600x800/cdb4db/ffffff?text=Econ+301'], rating: 4, reviewCount: 5, description: "Required textbook for ECON 301. Minimal wear and tear.", highlights: ["Required Reading", "No Markings"], specs: { "Condition": "Used - Good", "Author": "Dr. John Maynard" }, branch: 'CSE', semester: 5, isExchangeable: true, sellerInfo: { name: 'David C.', rating: 4.2 }, communityQA: [] },
        { id: 6, name: 'Biology Lab Coat', price: 1200.00, category: 'Lab Equipment', imageUrl: 'https://placehold.co/600x800/b1a7d1/ffffff?text=Lab+Coat', gallery: ['https://placehold.co/600x800/b1a7d1/ffffff?text=Lab+Coat'], rating: 5, reviewCount: 30, description: "Standard issue lab coat for biology and chemistry labs. Size Medium. No stains.", highlights: ["Clean", "Size Medium", "Required for Labs"], specs: { "Condition": "Used - Excellent", "Size": "M" }, isPrime: true, branch: 'Civil', semester: 1, sellerInfo: { name: 'Campus Store', rating: 5.0 }, communityQA: [] },
        { id: 7, name: 'Parker Jotter Pen Set', price: 999.00, category: 'Stationery', imageUrl: 'https://placehold.co/600x800/9a8ac9/ffffff?text=Pen+Set', gallery: ['https://placehold.co/600x800/9a8ac9/ffffff?text=Pen+Set'], rating: 4.5, reviewCount: 9, description: "A classic Parker Jotter pen and pencil set. Perfect for taking notes or as a gift.", highlights: ["Premium Quality", "Refillable"], specs: { "Condition": "New", "Brand": "Parker" }, branch: 'Any', semester: 'Any', sellerInfo: { name: 'Campus Store', rating: 5.0 }, communityQA: [] },
        { id: 8, name: 'Graphing Calculator TI-84', price: 9500.00, category: 'Gadgets', imageUrl: 'https://placehold.co/600x800/8c7aa8/ffffff?text=TI-84', gallery: ['https://placehold.co/600x800/8c7aa8/ffffff?text=TI-84'], rating: 5, reviewCount: 42, description: "The classic TI-84 graphing calculator. Required for most math and science courses. Works perfectly, includes cover.", highlights: ["Required for STEM", "Perfect Working Order", "Includes Cover"], specs: { "Condition": "Used - Excellent", "Model": "TI-84 Plus" }, branch: 'Mechanical', semester: 'Any', isRentable: true, sellerInfo: { name: 'Ankit G.', rating: 5.0 }, communityQA: [] },
    ]),
  },
};

const motion = window.motion || {
    div: ({ layout, ...props }) => <div {...props} />,
    button: ({ layout, ...props }) => <button {...props} />,
    li: ({ layout, ...props }) => <li {...props} />,
    ul: ({ layout, ...props }) => <ul {...props} />,
    h1: ({ layout, ...props }) => <h1 {...props} />,
    h2: ({ layout, ...props }) => <h2 {...props} />,
    p: ({ layout, ...props }) => <p {...props} />,
    section: ({ layout, ...props }) => <section {...props} />,
};

// --- STYLING CONSTANTS ---
const INPUT_STYLE = "w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition";

// --- ICONS (as SVGs to avoid external dependencies like MUI Icons) ---
const ShoppingCartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const RemoveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M12 14a4 4 0 100-8 4 4 0 000 8z" /></svg>;
const PiggyBankIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M10 6.345l.955.955a1 1 0 001.414 0l.955-.955M12 21.655V18m0 0h-.09a3.001 3.001 0 01-2.91-2.91v-1.09a3.001 3.001 0 012.91-2.91h.09m0 0h.09a3.001 3.001 0 012.91 2.91v1.09a3.001 3.001 0 01-2.91 2.91h-.09m0 0v3.655z" /></svg>;
const LeafIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const CheckCircleIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const QuestionMarkCircleIcon = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-2 inline-block"} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const NewspaperIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h6m-6 4h6m-6 4h6m-6 4h6" /></svg>;
const ShieldCheckIcon = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-2 inline-block"} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const DocumentTextIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const SparklesIcon = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 mr-2"} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4l2 2 2-2m5-7l2-2 2 2m-2 4l2 2 2-2" /></svg>;
const StarIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LocationMarkerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const HeartIcon = ({ filled }) => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.318a4.5 4.5 0 010-6.364z" /></svg>;
const MicrophoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 10v2M12 18.5a4.5 4.5 0 01-4.5-4.5v-6a4.5 4.5 0 019 0v6a4.5 4.5 0 01-4.5 4.5z" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const ClipboardListIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const RefreshIcon = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M20 4h-5v5M4 20h5v-5" /></svg>;
const CompareIcon = ({className}) => <RefreshIcon className={className} />;

// --- TRANSLATION HOOK ---
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.marketplace': 'Marketplace',
        'nav.skills': 'Skills',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'login': 'Login',
        'signup': 'Sign Up',
        'search_placeholder': 'Search for books, notes, gadgets...',
    },
    hi: {
        'nav.home': 'होम',
        'nav.marketplace': 'बाज़ार',
        'nav.skills': 'कौशल',
        'nav.about': 'हमारे बारे में',
        'nav.contact': 'संपर्क करें',
        'login': 'लॉग इन करें',
        'signup': 'साइन अप करें',
        'search_placeholder': 'किताबें, नोट्स, गैजेट्स खोजें...',
    },
};

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const t = (key) => translations[language][key] || key;
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

const useTranslation = () => useContext(LanguageContext);

// --- CONTEXT/ThemeContext.jsx ---
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// --- SIMULATED REDUX STORE ---
// This uses React's useReducer to mimic Redux Toolkit's behavior for this single-file setup.

// Initial State
const initialState = {
  products: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  cart: {
    items: {}, // { productId: { ...product, quantity: X } }
  },
  wishlist: [], // array of product IDs
  user: null,
  notifications: [],
  studentWallet: 1500.00, // Mock student wallet balance
};

// Actions
const actionTypes = {
  // Products
  FETCH_PRODUCTS_START: 'products/fetch/start',
  FETCH_PRODUCTS_SUCCESS: 'products/fetch/success',
  FETCH_PRODUCTS_FAIL: 'products/fetch/fail',
  // Cart
  ADD_TO_CART: 'cart/add',
  REMOVE_FROM_CART: 'cart/remove',
  DECREASE_QUANTITY: 'cart/decrease',
  CLEAR_CART: 'cart/clear',
  // Wishlist
  TOGGLE_WISHLIST: 'wishlist/toggle',
  // Auth
  SET_USER: 'user/set',
  // Notifications
  ADD_NOTIFICATION: 'notifications/add',
  REMOVE_NOTIFICATION: 'notifications/remove',
  // Wallet
  USE_WALLET_FUNDS: 'wallet/use',
};

// Reducer
function rootReducer(state, action) {
  switch (action.type) {
    // Product cases
    case actionTypes.FETCH_PRODUCTS_START:
      return { ...state, products: { ...state.products, status: 'loading' } };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: { ...state.products, status: 'succeeded', items: action.payload } };
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return { ...state, products: { ...state.products, status: 'failed', error: action.payload } };
    
    // Cart cases
    case actionTypes.ADD_TO_CART: {
      const product = action.payload;
      const existingItem = state.cart.items[product.id];
      const newItems = { ...state.cart.items };
      if (existingItem) {
        newItems[product.id] = { ...existingItem, quantity: existingItem.quantity + 1 };
      } else {
        newItems[product.id] = { ...product, quantity: 1 };
      }
      return { ...state, cart: { items: newItems } };
    }
    case actionTypes.DECREASE_QUANTITY: {
        const productId = action.payload;
        const newItems = { ...state.cart.items };
        if (newItems[productId] && newItems[productId].quantity > 1) {
            newItems[productId].quantity -= 1;
        } else {
            delete newItems[productId];
        }
        return { ...state, cart: { items: newItems } };
    }
    case actionTypes.REMOVE_FROM_CART: {
        const productId = action.payload;
        const newItems = { ...state.cart.items };
        delete newItems[productId];
        return { ...state, cart: { items: newItems } };
    }
    case actionTypes.CLEAR_CART: {
        return { ...state, cart: { items: {} } };
    }

    // Wishlist cases
    case actionTypes.TOGGLE_WISHLIST: {
        const productId = action.payload;
        const isInWishlist = state.wishlist.includes(productId);
        if (isInWishlist) {
            return { ...state, wishlist: state.wishlist.filter(id => id !== productId) };
        } else {
            return { ...state, wishlist: [...state.wishlist, productId] };
        }
    }

    // Auth cases
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    // Notification cases
    case actionTypes.ADD_NOTIFICATION:
        return {...state, notifications: [...state.notifications, {id: Date.now(), ...action.payload}]};
    case actionTypes.REMOVE_NOTIFICATION:
        return {...state, notifications: state.notifications.filter(n => n.id !== action.payload)};

    // Wallet cases
    case actionTypes.USE_WALLET_FUNDS:
        const amountToUse = action.payload;
        const newBalance = state.studentWallet - amountToUse;
        return { ...state, studentWallet: newBalance >= 0 ? newBalance : 0 };

    default:
      return state;
  }
}

// Global state context (replaces Redux Provider)
const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    
    // Memoize context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <GlobalStateContext.Provider value={contextValue}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hooks for accessing state and dispatch (replaces useSelector and useDispatch)
const useGlobalState = () => useContext(GlobalStateContext);


// --- COMPONENTS ---

// components/TopperVerifiedBadge.jsx
const TopperVerifiedBadge = () => (
    <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center animate-pulse">
        <ShieldCheckIcon className="w-4 h-4 mr-1"/>
        TOPPER VERIFIED
    </div>
);


// components/StarRating.jsx
const StarRating = ({ rating, reviewCount }) => {
    return (
        <div className="flex items-center">
            <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <StarIcon
                            key={index}
                            className={`h-5 w-5 ${ratingValue <= rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                        />
                    );
                })}
            </div>
            {reviewCount && <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">({reviewCount} reviews)</span>}
        </div>
    );
};

// components/NotificationHost.jsx
const Notification = ({ message, type, onDismiss }) => {
    const bgColor = type === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900';
    const textColor = type === 'success' ? 'text-green-700 dark:text-green-200' : 'text-red-700 dark:text-red-200';
    const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
         <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`p-4 mb-4 rounded-lg shadow-lg border-l-4 ${borderColor} ${bgColor} ${textColor} flex justify-between items-center`}
        >
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                <CloseIcon />
            </button>
        </motion.div>
    )
}

const NotificationHost = () => {
    const { state, dispatch } = useGlobalState();
    const { notifications } = state;
    
    const handleDismiss = (id) => {
        dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id });
    };

    return createPortal(
        <div className="fixed top-5 right-5 z-[9999] w-80">
            {notifications.map(n => (
                <Notification key={n.id} {...n} onDismiss={() => handleDismiss(n.id)} />
            ))}
        </div>,
        document.body
    );
}
// components/Filters.jsx
const Filters = ({ categories, selectedCategory, onSelectCategory, onSortChange, onBranchChange, onSemesterChange }) => {
    const branches = ['CSE', 'Mechanical', 'Civil', 'Any'];
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 'Any'];

  return (
    <aside className="w-full md:w-64 lg:w-72 p-4 space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Filters</h3>
      
      <div>
        <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Sort By</h4>
        <select onChange={(e) => onSortChange(e.target.value)} className={INPUT_STYLE}>
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Average Rating</option>
        </select>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Branch</h4>
        <select onChange={(e) => onBranchChange(e.target.value)} className={INPUT_STYLE}>
            <option value="All">All Branches</option>
            {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

       <div>
        <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Semester</h4>
        <select onChange={(e) => onSemesterChange(e.target.value)} className={INPUT_STYLE}>
            <option value="All">All Semesters</option>
            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Category</h4>
        <ul className="space-y-2">
          {['All', ...categories].map((category) => (
            <li key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};


// components/ProductCard.jsx
const ProductCard = ({ product, onProductSelect }) => {
    const { state, dispatch } = useGlobalState();
    const isInWishlist = state.wishlist.includes(product.id);

    const handleActionClick = (action, e) => {
        e.stopPropagation();
        switch(action) {
            case 'cart':
                dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
                dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: `"${product.name}" added to cart!`, type: 'success' } });
                break;
            case 'wishlist':
                dispatch({ type: actionTypes.TOGGLE_WISHLIST, payload: product.id });
                dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: isInWishlist ? `Removed from wishlist.` : `Added to wishlist!`, type: 'success' } });
                break;
            // Add cases for compare, rent, etc.
        }
    };
  
    return (
        <motion.div
            onClick={() => onProductSelect(product)}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden group border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
                {product.isVerified && <TopperVerifiedBadge />}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <h4 className="font-bold">{product.sellerInfo.name}</h4>
                    <StarRating rating={product.sellerInfo.rating} />
                    <div className="mt-2 text-xs">
                        <span className="bg-indigo-500/80 px-2 py-1 rounded-full mr-1">{product.branch}</span>
                        <span className="bg-sky-500/80 px-2 py-1 rounded-full">Sem {product.semester}</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white truncate">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">₹{product.price.toFixed(2)}</p>
                    <StarRating rating={product.rating} />
                </div>
            </div>
            <div className="px-4 pb-4 flex justify-between items-center text-sm text-slate-600 dark:text-slate-400">
                <button onClick={(e) => handleActionClick('cart', e)} className="flex-1 text-center py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Add to Cart</button>
                <div className="flex ml-2">
                    <button onClick={(e) => handleActionClick('wishlist', e)} className={`p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 ${isInWishlist ? 'text-red-500 bg-red-100 dark:bg-red-900/30' : ''}`}><HeartIcon filled={isInWishlist}/></button>
                    {product.isRentable && <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><RefreshIcon className="w-6 h-6"/></button>}
                </div>
            </div>
        </motion.div>
    );
};

// components/CartDrawer.jsx
const CartDrawer = ({ isOpen, onClose, onNavigate }) => {
    const { state, dispatch } = useGlobalState();
    const cartItems = Object.values(state.cart.items);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const drawerVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
    };

    if (!isOpen) return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
        >
            <motion.div
                variants={drawerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl flex flex-col"
            >
                <div className="flex justify-between items-center p-4 border-b dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Your Cart</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                        <CloseIcon />
                    </button>
                </div>

                {cartItems.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-slate-500 dark:text-slate-400">
                         <ShoppingCartIcon className="w-20 h-20 mb-4 text-slate-400" />
                        <h3 className="text-2xl font-semibold">Your cart is feeling lonely</h3>
                        <p className="mt-2">Add some items to get started!</p>
                    </div>
                ) : (
                    <div className="flex-grow overflow-y-auto p-4">
                        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                            {cartItems.map(item => (
                                <motion.li 
                                    layout
                                    key={item.id} 
                                    className="flex items-center space-x-4 py-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover"/>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-slate-800 dark:text-white">{item.name}</h4>
                                        <p className="text-slate-600 dark:text-slate-400">₹{item.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => dispatch({type: actionTypes.DECREASE_QUANTITY, payload: item.id})} className="p-1 border rounded-md dark:border-slate-600"><RemoveIcon /></button>
                                            <span className="px-4 font-semibold">{item.quantity}</span>
                                            <button onClick={() => dispatch({type: actionTypes.ADD_TO_CART, payload: item})} className="p-1 border rounded-md dark:border-slate-600"><AddIcon /></button>
                                        </div>
                                    </div>
                                    <button onClick={() => dispatch({type: actionTypes.REMOVE_FROM_CART, payload: item.id})} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"><TrashIcon /></button>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {cartItems.length > 0 && (
                    <div className="p-6 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold">
                            <span className="text-slate-800 dark:text-white">Subtotal</span>
                            <span className="text-indigo-600 dark:text-indigo-400">₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => {
                                onNavigate('Checkout');
                                onClose();
                            }}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                        >
                            Proceed to Checkout <ArrowRightIcon/>
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>,
        document.body
    );
};

// components/Navbar.jsx
const Navbar = ({ onCartClick, onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { t, language, setLanguage } = useTranslation();
    const { state } = useGlobalState();
    const cartItemCount = Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isListening, setIsListening] = useState(false);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length > 0) { // Changed to > 0
            setSuggestions(
                state.products.items.filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
            );
        } else {
            setSuggestions([]);
        }
    };
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onNavigate('Marketplace', { searchQuery: searchTerm });
        setSuggestions([]);
        setSearchTerm('');
    };
    
    const handleVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Sorry, your browser doesn't support voice search.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchTerm(transcript);
            handleSearchChange({target: {value: transcript}});
        };
        recognition.start();
    };

    const navLinks = [
        { name: t('nav.home'), page: 'Home' },
        { name: t('nav.marketplace'), page: 'Marketplace' },
        { name: t('nav.skills'), page: 'SkillMarketplace' },
        { name: t('nav.about'), page: 'About' },
        { name: t('nav.contact'), page: 'Contact' }
    ];

    return (
        <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg sticky top-0 z-30 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <a href="#" onClick={() => onNavigate('Home')} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">MyCollegeMart</a>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map(link => (
                                    <a key={link.name} href="#" onClick={() => onNavigate(link.page)} className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium">{link.name}</a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-lg mx-4">
                         <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                              type="text"
                              placeholder={t('search_placeholder')}
                              value={searchTerm}
                              onChange={handleSearchChange}
                              className="w-full pl-10 pr-10 py-2 border border-slate-300 dark:border-slate-600 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="text-slate-400" />
                            </div>
                             <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button type="button" onClick={handleVoiceSearch} className={`p-1 rounded-full ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400'}`}>
                                    <MicrophoneIcon />
                                </button>
                            </div>
                            {suggestions.length > 0 && (
                                <ul className="absolute mt-1 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg z-10 overflow-hidden">
                                {suggestions.slice(0, 5).map(product => (
                                    <li key={product.id} onClick={() => { onNavigate('ProductDetail', product); setSuggestions([]); setSearchTerm(''); }}
                                        className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex items-center space-x-2">
                                        <img src={product.imageUrl} className="w-8 h-8 rounded-sm"/>
                                        <span>{product.name}</span>
                                    </li>
                                ))}
                                </ul>
                            )}
                        </form>
                    </div>


                    {/* Right side icons */}
                    <div className="flex items-center">
                         <div className="relative">
                            <button onClick={() => onNavigate('Account')} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                                <UserCircleIcon />
                            </button>
                        </div>
                        <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>
                        <div className="relative ml-1">
                            <button onClick={() => onNavigate('Wishlist')} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                                <HeartIcon filled={state.wishlist.length > 0} />
                            </button>
                        </div>
                        <div className="relative ml-1">
                            <button onClick={onCartClick} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                                <ShoppingCartIcon />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                        <div className="hidden md:flex items-center ml-4 space-x-2">
                             <button onClick={() => onNavigate('Login')} className="bg-transparent text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-md text-sm font-medium border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">{t('login')}</button>
                             <button onClick={() => onNavigate('Signup')} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">{t('signup')}</button>
                        </div>
                         <div className="md:hidden ml-2">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                                {isMobileMenuOpen ? <CloseIcon/> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Menu is unchanged */}
             {isMobileMenuOpen && (
                 <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map(link => (
                            <a key={link.name} href="#" onClick={() => { onNavigate(link.page); setIsMobileMenuOpen(false); }} className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium">{link.name}</a>
                        ))}
                         <div className="pt-4 pb-2 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex flex-col space-y-2 px-2">
                                <button onClick={() => { onNavigate('Login'); setIsMobileMenuOpen(false); }} className="w-full text-left bg-transparent text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-md text-base font-medium border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">{t('login')}</button>
                                <button onClick={() => { onNavigate('Signup'); setIsMobileMenuOpen(false); }} className="w-full text-left bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">{t('signup')}</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};


// components/Footer.jsx
const Footer = ({ onNavigate, onNavigateWithCategory }) => (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t dark:border-slate-700">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Solutions</h3>
                    <ul className="mt-4 space-y-4">
                        <li><button onClick={() => onNavigateWithCategory('Textbooks')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Textbooks</button></li>
                        <li><button onClick={() => onNavigateWithCategory('Notes')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Notes</button></li>
                        <li><button onClick={() => onNavigateWithCategory('Lab Equipment')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Lab Equipment</button></li>
                        <li><button onClick={() => onNavigateWithCategory('Gadgets')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Gadgets</button></li>
                        <li><button onClick={() => onNavigateWithCategory('Stationery')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center">Stationery</button></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Support</h3>
                    <ul className="mt-4 space-y-4">
                        <li><button onClick={() => onNavigate('Pricing')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Pricing</button></li>
                        <li><button onClick={() => onNavigate('FAQ')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">FAQ</button></li>
                         <li><button onClick={() => onNavigate('Contact')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Contact Us</button></li>
                         <li><button onClick={() => onNavigate('OrderTracking')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Track Order</button></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company</h3>
                    <ul className="mt-4 space-y-4">
                        <li><button onClick={() => onNavigate('About')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">About</button></li>
                        <li><button onClick={() => onNavigate('Careers')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Careers</button></li>
                        <li><button onClick={() => onNavigate('StudyCorner')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Study Corner</button></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">For Sellers</h3>
                    <ul className="mt-4 space-y-4">
                        <li><button onClick={() => onNavigate('Sell')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Sell Item</button></li>
                        <li><button onClick={() => onNavigate('SellerDashboard')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Dashboard</button></li>
                        <li><button onClick={() => onNavigate('BookExchange')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Book Exchange</button></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Legal</h3>
                    <ul className="mt-4 space-y-4">
                        <li><button onClick={() => onNavigate('Privacy')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Privacy</button></li>
                        <li><button onClick={() => onNavigate('Terms')} className="text-base text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Terms</button></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8 flex items-center justify-between">
                <p className="text-base text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} MyCollegeMart. All rights reserved.</p>
                {/* Social icons would go here */}
            </div>
        </div>
    </footer>
);

// components/AIChatbot.jsx
const AIChatbot = ({ isChatOpen, setIsChatOpen, onNavigate }) => {
    const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi! How can I help you today? Ask me about products, orders, or policies.' }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const newMessages = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', text: "I'm a demo bot! For order tracking, please visit the 'Track Order' page." }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <>
            <div className="fixed bottom-5 right-5 z-40">
                <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-indigo-600 p-4 rounded-full shadow-lg hover:bg-indigo-700">
                    {isChatOpen ? <CloseIcon className="h-8 w-8 text-white"/> : <ChatIcon />}
                </button>
            </div>
            {isChatOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-20 right-5 z-40 w-96 h-[32rem] bg-white dark:bg-slate-800 rounded-lg shadow-2xl flex flex-col"
                >
                    <header className="p-4 bg-indigo-600 text-white font-bold rounded-t-lg">
                        MyCollegeMart Assistant
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <p className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{msg.text}</p>
                            </div>
                        ))}
                         {isLoading && <div className="flex justify-start"><p className="p-3 rounded-lg bg-slate-200 dark:bg-slate-700">...</p></div>}
                        <div ref={chatEndRef}/>
                    </div>
                    <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Ask a question..." className="flex-1 px-3 py-2 rounded-lg border dark:bg-slate-700"/>
                        <button type="submit" className="p-3 bg-indigo-600 text-white rounded-lg"><SendIcon /></button>
                    </form>
                </motion.div>
            )}
        </>
    );
};

// components/FlashDealBanner.jsx
const FlashDealBanner = ({ deadline, onNavigate, dealProduct }) => {
    const calculateTimeLeft = () => {
        const difference = +deadline - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <section className="bg-red-500 text-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">⚡️ Flash Deal!</h2>
                <p>Get the Organic Chemistry Model Kit for just ₹1800!</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex gap-2 text-center">
                    <div className="p-2 bg-white/20 rounded-md">
                        <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-xs block">HRS</span>
                    </div>
                    <div className="p-2 bg-white/20 rounded-md">
                         <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-xs block">MIN</span>
                    </div>
                     <div className="p-2 bg-white/20 rounded-md">
                         <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-xs block">SEC</span>
                    </div>
                </div>
                <button 
                    onClick={() => dealProduct && onNavigate('ProductDetail', dealProduct)} 
                    className="bg-white text-red-500 font-bold py-3 px-6 rounded-lg hover:bg-slate-100"
                    disabled={!dealProduct}
                >
                    Shop Now
                </button>
            </div>
        </section>
    );
};


// --- PAGES ---

// pages/Home.jsx
const Home = ({ onNavigate }) => {
    const { state } = useGlobalState();
    const featuredProducts = state.products.items.slice(0, 4);
    const deadline = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours from now
    const dealProduct = state.products.items.find(p => p.id === 3);

    return (
        <div className="space-y-16 lg:space-y-24">
            {/* Hero Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20 px-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"
            >
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white"
                >
                    The Engineering Student Marketplace
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300"
                >
                    Buy & sell textbooks, notes, lab gear, and gadgets with fellow students.
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-8 flex justify-center gap-4"
                >
                    <button onClick={() => onNavigate('Marketplace')} className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105">Shop Now</button>
                    <button onClick={() => onNavigate('Sell')} className="px-8 py-3 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 font-semibold rounded-full shadow-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-transform transform hover:scale-105">Sell Items</button>
                </motion.div>
            </motion.section>
            
            {/* Flash Deal */}
            <FlashDealBanner deadline={deadline} onNavigate={onNavigate} dealProduct={dealProduct} />

            {/* Featured Products */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Featured Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} onProductSelect={(p) => onNavigate('ProductDetail', p)} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}

// pages/Marketplace.jsx
const Marketplace = ({ onNavigate, initialCategory, initialSearch }) => {
  const { state, dispatch } = useGlobalState();
  const { items: products, status } = state.products;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [searchTerm, setSearchTerm] = useState(initialSearch || ''); 
  const [sortMethod, setSortMethod] = useState('relevance');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');

  useEffect(() => {
    if (status === 'idle') {
      dispatch({ type: actionTypes.FETCH_PRODUCTS_START });
      mockFirebase.firestore.getProducts()
        .then(data => {
          dispatch({ type: actionTypes.FETCH_PRODUCTS_SUCCESS, payload: data });
        })
        .catch(error => {
          dispatch({ type: actionTypes.FETCH_PRODUCTS_FAIL, payload: error.toString() });
        });
    }
  }, [status, dispatch]);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory);
    if (searchTerm) result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedBranch !== 'All') result = result.filter(p => p.branch === selectedBranch || p.branch === 'Any');
    if (selectedSemester !== 'All') result = result.filter(p => p.semester == selectedSemester || p.semester === 'Any');

    switch(sortMethod) {
        case 'price_asc': result.sort((a, b) => a.price - b.price); break;
        case 'price_desc': result.sort((a, b) => b.price - a.price); break;
        case 'rating': result.sort((a, b) => b.rating - a.rating); break;
        default: break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm, sortMethod, selectedBranch, selectedSemester]);

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);

  const handleProductSelect = (product) => {
      onNavigate('ProductDetail', product);
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Filters 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onSortChange={setSortMethod}
        onBranchChange={setSelectedBranch}
        onSemesterChange={setSelectedSemester}
      />
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">{searchTerm ? `Results for "${searchTerm}"` : selectedCategory}</h1>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && (
            filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onProductSelect={handleProductSelect}/>
                    ))}
                </div>
            ) : (
                <NoResultsFound onNavigate={onNavigate} />
            )
        )}
        {status === 'failed' && <p>Error loading products.</p>}
      </main>
    </div>
  );
};

// pages/PlaceholderPage.jsx (Used by many smaller pages)
const PlaceholderPage = ({ title, children }) => (
    <div className="min-h-[60vh] py-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg"
        >
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">{title}</h1>
            <div className="prose dark:prose-invert max-w-none">
                {children}
            </div>
        </motion.div>
    </div>
);

// pages/About.jsx
const About = ({ onNavigate }) => (
    <div className="min-h-[60vh] space-y-20 py-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
        >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
                Built by students, <span className="text-indigo-600 dark:text-indigo-400">for students.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
                We understand the financial pressures of college life. Our mission is to create a trusted, easy-to-use marketplace where you can buy and sell college essentials directly with your peers, saving money and making a little extra cash on the side.
            </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                    <div className="flex justify-center items-center h-20 w-20 mx-auto bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-indigo-600 dark:text-indigo-400">
                        <UsersIcon />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">For Students, By Students</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">A community-driven platform that ensures you're always dealing with fellow students.</p>
                </div>
                <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                     <div className="flex justify-center items-center h-20 w-20 mx-auto bg-green-100 dark:bg-green-900/40 rounded-full text-green-600 dark:text-green-400">
                        <PiggyBankIcon />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">Smart Savings</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">Find affordable textbooks, notes, and essentials without breaking the bank.</p>
                </div>
                <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                     <div className="flex justify-center items-center h-20 w-20 mx-auto bg-sky-100 dark:bg-sky-900/40 rounded-full text-sky-600 dark:text-sky-400">
                        <LeafIcon />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">Campus Sustainability</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">Give your college items a second life and contribute to a greener campus.</p>
                </div>
            </div>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center max-w-3xl mx-auto bg-indigo-600 dark:bg-indigo-800 p-10 rounded-lg text-white"
        >
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="mt-4 text-indigo-200">
                Ready to find deals or make some cash? Become a part of the MyCollegeMart community today.
            </p>
             <div className="mt-8 flex justify-center gap-4">
                <button onClick={() => onNavigate('Marketplace')} className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-slate-100 transition-transform transform hover:scale-105">Explore Marketplace</button>
                <button onClick={() => onNavigate('Sell')} className="px-8 py-3 bg-transparent text-white font-semibold rounded-full shadow-lg border-2 border-white hover:bg-white/10 transition-transform transform hover:scale-105">Start Selling</button>
            </div>
        </motion.div>
    </div>
);

// pages/Contact.jsx
const Contact = () => {
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'sent'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        await new Promise(res => setTimeout(res, 1500));
        setStatus('sent');
    };

    return (
    <div className="min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
        >
            <div className="text-center">
                 <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Get In Touch</h1>
                 <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                    We're here to help. Send us a message and we'll get back to you as soon as possible.
                </p>
            </div>
           
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                 <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                    {status === 'sent' ? (
                         <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10 flex flex-col items-center justify-center h-full"
                        >
                            <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
                            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h2>
                            <p className="mt-2 text-slate-600 dark:text-slate-300">Thanks for reaching out. We'll get back to you soon.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
                                <input type="text" id="name" required className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                <input type="email" id="email" required className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                <textarea id="message" rows="4" required className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center disabled:bg-indigo-400"
                                >
                                    {status === 'sending' ? (
                                        <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="space-y-6 text-slate-600 dark:text-slate-300">
                    <div className="flex items-start space-x-4">
                        <MailIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1"/>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Email Us</h3>
                            <p>For general inquiries or support, drop us an email.</p>
                            <a href="mailto:support@mycollegemart.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">support@mycollegemart.com</a>
                        </div>
                    </div>
                     <div className="flex items-start space-x-4">
                        <PhoneIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1"/>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Call Us</h3>
                            <p>Our support line is open on weekdays from 9am to 5pm.</p>
                            <a href="tel:+1234567890" className="text-indigo-600 dark:text-indigo-400 hover:underline">+1 (234) 567-890</a>
                        </div>
                    </div>
                     <div className="flex items-start space-x-4">
                        <LocationMarkerIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mt-1"/>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Our Campus Office</h3>
                            <p>Student Union Building, Room 204</p>
                            <p>123 University Drive, College Town, USA</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </div>
    );
};

// pages/Sell.jsx
const Sell = ({ onNavigate }) => {
    const { dispatch } = useGlobalState();
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('Textbooks');
    const [description, setDescription] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');
    const [highlights, setHighlights] = useState(['', '', '']);
    const [specs, setSpecs] = useState([{ key: '', value: '' }]);
    const [isGenerating, setIsGenerating] = useState(false);

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
    
    const handleHighlightChange = (index, value) => {
        const newHighlights = [...highlights];
        newHighlights[index] = value;
        setHighlights(newHighlights);
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };

    const addSpecField = () => {
        setSpecs(prev => [...prev, { key: '', value: '' }]);
    };
    
    const removeSpecField = (index) => {
        setSpecs(prev => prev.filter((_, i) => i !== index));
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
                                <select value={category} onChange={e => setCategory(e.target.value)} required className={`mt-1 ${INPUT_STYLE}`}>
                                    <option>Textbooks</option>
                                    <option>Notes</option>
                                    <option>Lab Equipment</option>
                                    <option>Gadgets</option>
                                    <option>Stationery</option>
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
                            >
                               {isGenerating ? 'Generating...' : <> <SparklesIcon /> Generate with AI </>}
                            </button>
                        </div>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} rows="3" required className={`w-full ${INPUT_STYLE}`}></textarea>
                    </fieldset>

                    {/* Image & Video Upload */}
                    <fieldset className="space-y-4 p-4 border rounded-lg">
                        <legend className="text-lg font-semibold px-2">Media</legend>
                         <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Images*</label>
                            <div className="mt-2 flex items-center flex-wrap gap-4">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative w-24 h-24">
                                        <img src={src} alt="Preview" className="w-full h-full object-cover rounded-lg"/>
                                        <button onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><CloseIcon className="w-4 h-4"/></button>
                                    </div>
                                ))}
                                 <label htmlFor="file-upload" className="cursor-pointer w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500">
                                    <UploadIcon />
                                    <span className="text-xs">Add Image</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} multiple />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Video URL (Optional)</label>
                            <input type="text" placeholder="e.g., https://youtube.com/watch?v=..." value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className={`mt-1 ${INPUT_STYLE}`}/>
                        </div>
                    </fieldset>
                    
                    {/* Details */}
                    <fieldset className="space-y-4 p-4 border rounded-lg">
                        <legend className="text-lg font-semibold px-2">Additional Details</legend>
                        <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Key Highlights (Optional)</label>
                             <p className="text-xs text-slate-500 mb-1">Add up to 3 key features.</p>
                            {highlights.map((h, i) => (
                                <input key={i} type="text" value={h} onChange={e => handleHighlightChange(i, e.target.value)} placeholder={`Highlight ${i+1}`} className={`mt-1 ${INPUT_STYLE}`}/>
                            ))}
                        </div>
                         <div>
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Specifications (Optional)</label>
                            {specs.map((s, i) => (
                                <div key={i} className="flex gap-2 mt-1">
                                    <input type="text" value={s.key} onChange={e => handleSpecChange(i, 'key', e.target.value)} placeholder="e.g., Condition" className={`w-1/3 ${INPUT_STYLE}`}/>
                                    <input type="text" value={s.value} onChange={e => handleSpecChange(i, 'value', e.target.value)} placeholder="e.g., Used - Like New" className={`w-2/3 ${INPUT_STYLE}`}/>
                                    <button type="button" onClick={() => removeSpecField(i)} className="p-2 text-red-500"><TrashIcon/></button>
                                </div>
                            ))}
                            <button type="button" onClick={addSpecField} className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                                + Add another spec
                            </button>
                        </div>
                    </fieldset>
                    
                    <button type="submit" className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg">
                        List My Item
                    </button>
                </form>
            </motion.div>
        </div>
    )
};

// pages/Checkout.jsx
const Checkout = ({ onNavigate }) => {
    const { state, dispatch } = useGlobalState();
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, success, failed
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [deliveryOption, setDeliveryOption] = useState('Hostel');
    const [useWallet, setUseWallet] = useState(false);

    const cartItems = Object.values(state.cart.items);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const walletBalance = state.studentWallet;
    const amountFromWallet = useWallet ? Math.min(cartTotal, walletBalance) : 0;
    const finalAmount = cartTotal - amountFromWallet;

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (document.getElementById('razorpay-checkout-js')) {
                return resolve(true);
            }
            const script = document.createElement('script');
            script.id = 'razorpay-checkout-js';
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };
    
    const handlePayment = async () => {
        if (finalAmount <= 0) { // If wallet covers everything
            dispatch({ type: actionTypes.USE_WALLET_FUNDS, payload: amountFromWallet });
            setPaymentStatus('success');
            dispatch({ type: actionTypes.CLEAR_CART });
            dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: "Payment successful using wallet!", type: 'success' } });
            return;
        }

        const res = await loadRazorpayScript();
        if (!res) {
            dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: "Razorpay SDK failed to load. Are you online?", type: 'error' } });
            return;
        }

        const options = {
            key: "rzp_test_YOUR_KEY_ID", 
            amount: (finalAmount * 100).toString(),
            currency: "INR",
            name: "MyCollegeMart",
            description: "Transaction for College Essentials",
            image: "https://placehold.co/100x100/6366f1/ffffff?text=MCM",
            handler: function (response) {
                setPaymentDetails(response);
                setPaymentStatus('success');
                dispatch({ type: actionTypes.USE_WALLET_FUNDS, payload: amountFromWallet });
                dispatch({ type: actionTypes.CLEAR_CART });
                dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: "Payment successful!", type: 'success' } });
            },
            prefill: { name: "Test Student", email: "student@test.com", contact: "9999999999" },
            theme: { color: "#6366f1" }
        };
        
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function (response) {
            setPaymentStatus('failed');
            dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: `Payment failed: ${response.error.description}`, type: 'error' } });
        });
        paymentObject.open();
    };

    if (paymentStatus === 'success') { return ( <PaymentSuccess onNavigate={onNavigate} paymentDetails={paymentDetails} /> ) }

    if (cartItems.length === 0 && paymentStatus === 'idle') { return ( <EmptyCheckout onNavigate={onNavigate} /> ) }

    return (
        <div className="min-h-[60vh] py-12 px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white text-center">Checkout</h1>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Delivery Options */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Campus Delivery Options</h2>
                            <div className="space-y-3">
                                {['Hostel Gate', 'Library Pickup Point', 'Canteen'].map(opt => (
                                    <label key={opt} className="flex items-center p-3 border rounded-lg has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500">
                                        <input type="radio" name="delivery" value={opt} checked={deliveryOption === opt} onChange={e => setDeliveryOption(e.target.value)} className="h-4 w-4 text-indigo-600"/>
                                        <span className="ml-3 font-medium">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Order Summary */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold">Order Summary</h2>
                            <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
                                 {cartItems.map(item => (
                                    <li key={item.id} className="py-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                     {/* Payment Details */}
                     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-fit">
                        <h2 className="text-2xl font-bold">Payment</h2>
                        
                        <div className="mt-4 space-y-2 border-b pb-4 mb-4">
                             <div className="flex justify-between items-center"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
                             {useWallet && <div className="flex justify-between items-center text-green-600"><span>Wallet Discount</span><span>-₹{amountFromWallet.toFixed(2)}</span></div>}
                        </div>

                         <div className="flex justify-between items-center text-xl font-bold">
                            <span>To Pay</span>
                            <span>₹{finalAmount.toFixed(2)}</span>
                        </div>
                        
                         <label className="mt-4 flex items-center p-3 border rounded-lg has-[:checked]:bg-green-50 has-[:checked]:border-green-500">
                             <input type="checkbox" checked={useWallet} onChange={e => setUseWallet(e.target.checked)} className="h-4 w-4 text-green-600"/>
                             <span className="ml-3 font-medium">Use Student Wallet (Balance: ₹{walletBalance.toFixed(2)})</span>
                         </label>
                        
                        <button onClick={handlePayment} className="mt-6 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center">
                            {finalAmount <= 0 ? "Place Order" : `Pay ₹${finalAmount.toFixed(2)}`} <ShieldCheckIcon className="w-5 h-5 ml-2"/>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
};
const PaymentSuccess = ({ onNavigate, paymentDetails }) => (
    <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <CheckCircleIcon className="w-20 h-20 mx-auto text-green-500" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">Payment Successful!</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Thank you for your purchase.</p>
            {paymentDetails?.razorpay_payment_id && (<p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Payment ID: {paymentDetails.razorpay_payment_id}</p>)}
            <button onClick={() => onNavigate('Marketplace')} className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700">Continue Shopping</button>
        </motion.div>
    </div>
);
const EmptyCheckout = ({ onNavigate }) => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
         <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your Cart is Empty</h1>
         <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Add items to your cart before checkout.</p>
         <button onClick={() => onNavigate('Marketplace')} className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700">Go to Marketplace</button>
     </div>
);

// pages/ProductDetailPage.jsx
const ProductDetailPage = ({ product, onNavigate }) => {
    const { state, dispatch } = useGlobalState();
    const [mainImage, setMainImage] = useState(product.imageUrl);

    if(!product) return <p>Product not found</p>;

    const handleAddToCart = () => {
        dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
        dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: `${product.name} added to cart!`, type: 'success' } });
    };
    
    const frequentlyBought = product.frequentlyBoughtTogether?.map(id => state.products.items.find(p => p.id === id)).filter(Boolean);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button onClick={() => onNavigate('Marketplace')} className="mb-6 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                &larr; Back to Marketplace
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Left Column: Image Gallery */}
                <div className="lg:col-span-1">
                    <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden shadow-lg">
                        <img src={mainImage} alt={product.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                        {product.gallery?.map((img, idx) => (
                             <button key={idx} onClick={() => setMainImage(img)} className={`rounded-lg overflow-hidden border-2 ${mainImage === img ? 'border-indigo-500' : 'border-transparent'}`}>
                                <img src={img} alt={`thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Center Column: Product Info */}
                <div className="lg:col-span-2">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="md:col-span-2">
                            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{product.category}</p>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">{product.name}</h1>
                            <div className="mt-3">
                                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                            </div>
                            <div className="mt-6 border-t pt-6">
                                <h2 className="text-xl font-bold mb-2">Description</h2>
                                <p className="text-slate-600 dark:text-slate-300">{product.description}</p>
                            </div>
                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">Key Highlights:</h3>
                                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                                    {product.highlights?.map(h => <li key={h}>{h}</li>)}
                                </ul>
                            </div>
                       </div>
                       
                        {/* Right Inner Column: Pricing & Actions */}
                        <div className="md:col-span-1">
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border">
                                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{product.price.toFixed(2)}</p>
                                <p className="mt-2 text-green-600 dark:text-green-400 font-semibold">In Stock</p>
                                <p className="text-sm text-slate-500">Ready for campus pickup.</p>
                                <div className="mt-6 space-y-3">
                                    <button onClick={handleAddToCart} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Add to Cart</button>
                                     {product.isRentable && <button className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700">Rent Item</button>}
                                     {product.isExchangeable && <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600">Propose Exchange</button>}
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>

            {frequentlyBought?.length > 0 && (
                <div className="mt-12 border-t pt-8">
                    <h2 className="text-2xl font-bold mb-4">Frequently Bought Together</h2>
                    <div className="flex items-center gap-4">
                        <ProductCard product={product} onProductSelect={() => {}} />
                        <span className="text-2xl font-bold">+</span>
                         {frequentlyBought.map(item => (
                            <ProductCard key={item.id} product={item} onProductSelect={() => onNavigate('ProductDetail', item)} />
                         ))}
                    </div>
                </div>
            )}
            
            <CommunityQA questions={product.communityQA} />

            {/* Bottom Section: Specs and Reviews */}
            <div className="mt-12 border-t pt-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                            <ul className="divide-y dark:divide-slate-700">
                                {product.specs && Object.entries(product.specs).map(([key, value]) => (
                                    <li key={key} className="py-2 flex justify-between">
                                        <span className="font-semibold text-slate-600 dark:text-slate-400">{key}</span>
                                        <span className="text-right">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold mb-4">Customer Reviews ({product.reviewCount})</h2>
                        <div className="space-y-4">
                            {product.reviews?.map((review, idx) => (
                                <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold">{review.author}</h4>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="mt-2 text-slate-600 dark:text-slate-300">{review.comment}</p>
                                    {review.image && <img src={review.image} className="mt-2 rounded-lg" alt="review"/>}
                                </div>
                            ))}
                        </div>
                     </div>
                 </div>
            </div>
        </motion.div>
    );
};

const Pricing = () => (
    <PlaceholderPage title="Pricing">
        <h2>Simple and Transparent</h2>
        <p>Selling on MyCollegeMart is free. We believe in keeping money in students' pockets. We may introduce a small, fair transaction fee in the future to maintain the platform, but we promise to always be transparent about it.</p>
        <p>Buying is, of course, just the price of the item listed. No hidden fees, no surprises.</p>
    </PlaceholderPage>
);

const FAQ = () => (
    <PlaceholderPage title="Frequently Asked Questions">
        <h3>How do I sell an item?</h3>
        <p>Click the "Sell Items" button, fill out the form with your item's details, and list it. It's that easy!</p>
        <h3>Is it safe?</h3>
        <p>We recommend meeting in public, well-lit places on campus to exchange goods. Always inspect items before paying.</p>
        <h3>How is payment handled?</h3>
        <p>Currently, payments are handled in person between the buyer and seller (e.g., cash, Venmo, etc.). We plan to integrate online payments in the future.</p>
    </PlaceholderPage>
);

const Careers = () => (
    <PlaceholderPage title="Careers">
        <h2>Join Our Team!</h2>
        <p>We're a small, passionate team of students trying to make college life more affordable. While we don't have any open positions right now, we're always looking for talented individuals. If you're passionate about our mission, feel free to contact us!</p>
    </PlaceholderPage>
);

const StudyCorner = () => {
    const { dispatch } = useGlobalState();
    const [chatHistory, setChatHistory] = useState([{
        role: 'bot',
        text: "Hey! I'm your AI Study Planner. To get started, tell me your subject, exam date, and how many hours a week you can study. For example: 'Calculus I, Dec 15th, 10 hours'."
    }]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const newUserMessage = { role: 'user', text: userInput };
        const newChatHistory = [...chatHistory, newUserMessage];
        setChatHistory(newChatHistory);
        setUserInput('');
        setIsLoading(true);

        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const systemPrompt = "You are an expert academic advisor bot. Your goal is to create a study plan. First, check if the user has provided a subject, a date, and study hours. If any are missing, ask for the missing information. If you have all three, ask 1-2 clarifying questions about their study style (e.g., 'Do you prefer to study in long sessions or short bursts?') or specific topics they struggle with. Once they answer, generate a simple, actionable, week-by-week study plan. Format responses as simple HTML paragraphs and lists for readability.";

        const geminiPayload = {
            contents: newChatHistory.map(msg => ({
                role: msg.role === 'bot' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            })),
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geminiPayload)
            });
            if (!response.ok) throw new Error("API request failed");
            const result = await response.json();
            const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (botResponse) {
                setChatHistory(prev => [...prev, { role: 'bot', text: botResponse }]);
            } else {
                throw new Error("No response from AI.");
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            setChatHistory(prev => [...prev, { role: 'bot', text: "Sorry, I had trouble connecting. Could you try asking again?" }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <PlaceholderPage title="🎓 AI Study Corner">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-lg mb-6">Chat with our AI planner to create a custom study schedule to help you ace your tests.</p>
                <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg h-[60vh] flex flex-col">
                   <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                       {chatHistory.map((msg, index) => (
                           <div key={index} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                               <div className={`max-w-md p-3 rounded-lg ${msg.role === 'bot' ? 'bg-white dark:bg-slate-800' : 'bg-indigo-500 text-white'}`}>
                                   <div className="prose dark:prose-invert prose-p:my-1" dangerouslySetInnerHTML={{ __html: msg.text }} />
                               </div>
                           </div>
                       ))}
                       {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-md p-3 rounded-lg bg-white dark:bg-slate-800">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                </div>
                            </div>
                       )}
                       <div ref={chatEndRef} />
                   </div>
                   <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                        <input 
                            type="text" 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type your message..." 
                            className="flex-grow px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg disabled:bg-indigo-400">
                            Send
                        </button>
                   </form>
                </div>
            </motion.div>
        </PlaceholderPage>
    );
};

const Privacy = () => (
    <PlaceholderPage title="Privacy Policy">
        <p>Your privacy is important to us. We only collect the information necessary to run the service, like your email for authentication. We do not sell your data to third parties. This policy will be updated as we add more features.</p>
    </PlaceholderPage>
);

const Terms = () => (
    <PlaceholderPage title="Terms of Service">
        <p>By using MyCollegeMart, you agree to be a responsible member of the community. Be honest in your listings, be respectful in your communications, and prioritize safety when meeting for exchanges. MyCollegeMart is a platform to connect students and is not responsible for the transactions themselves.</p>
    </PlaceholderPage>
);

// Auth pages (Login.jsx, Signup.jsx)
const AuthForm = ({ isLogin, onNavigate }) => {
    const { dispatch } = useGlobalState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const authFn = isLogin 
                ? mockFirebase.auth.signInWithEmailAndPassword
                : mockFirebase.auth.createUserWithEmailAndPassword;
            
            await authFn(email, password);
            dispatch({
                type: actionTypes.ADD_NOTIFICATION,
                payload: { message: `Successfully ${isLogin ? 'logged in' : 'signed up'}!`, type: 'success' }
            });
            onNavigate('Home');
        } catch (err) {
            setError(err.message || "An error occurred.");
            dispatch({
                type: actionTypes.ADD_NOTIFICATION,
                payload: { message: err.message || "An error occurred.", type: 'error' }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
            >
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
                    {isLogin ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <div>
                        <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg disabled:bg-indigo-300">
                            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                        </button>
                    </div>
                </form>
                 <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <a href="#" onClick={() => onNavigate(isLogin ? 'Signup' : 'Login')} className="font-medium text-indigo-600 hover:underline">
                         {isLogin ? 'Sign up' : 'Login'}
                    </a>
                </p>
            </motion.div>
        </div>
    );
};

const Login = ({ onNavigate }) => <AuthForm isLogin={true} onNavigate={onNavigate} />;
const Signup = ({ onNavigate }) => <AuthForm isLogin={false} onNavigate={onNavigate} />;

// pages/Wishlist.jsx
const Wishlist = ({ onNavigate }) => {
    const { state } = useGlobalState();
    const wishlistedProducts = state.products.items.filter(p => state.wishlist.includes(p.id));

    return (
        <div className="min-h-[60vh] py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-8">💖 Your Wishlist</h1>
                {wishlistedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlistedProducts.map(product => (
                            <ProductCard key={product.id} product={product} onProductSelect={(p) => onNavigate('ProductDetail', p)} />
                        ))}
                    </div>
                ) : (
                     <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-lg shadow">
                         <div className="text-6xl mb-4">💔</div>
                        <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>
                        <p className="mt-2 text-slate-500">Click the heart on products to save them for later.</p>
                         <button onClick={() => onNavigate('Marketplace')} className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700">
                            Find Items to Love
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

// pages/SellerDashboard.jsx
const SellerDashboard = () => {
    return (
        <PlaceholderPage title="📈 Seller Dashboard">
            <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
                        <p className="text-sm text-slate-500">Total Sales</p>
                        <p className="text-3xl font-bold">₹12,500</p>
                    </div>
                    <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
                        <p className="text-sm text-slate-500">Active Listings</p>
                        <p className="text-3xl font-bold">8</p>
                    </div>
                    <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-center">
                        <p className="text-sm text-slate-500">Seller Rating</p>
                        <p className="text-3xl font-bold">4.9/5</p>
                    </div>
                </div>
                <h3 className="text-2xl font-bold mt-8 mb-4">Manage Your Listings</h3>
                {/* Mock listing management table */}
            </>
        </PlaceholderPage>
    );
};

// pages/PrimeMembership.jsx
const PrimeMembership = () => {
    return (
        <PlaceholderPage title="MyCollegeMart PRIME ✨">
            <h2>Unlock Exclusive Benefits</h2>
            <p>Join Prime for just ₹499/year and get access to:</p>
            <ul>
                <li><strong>Free Campus Delivery:</strong> Get your items delivered to your hostel for free.</li>
                <li><strong>Early Access:</strong> Get a 24-hour head start on newly listed textbooks.</li>
                <li><strong>Exclusive Deals:</strong> Special discounts on stationery and gadgets.</li>
            </ul>
             <button className="mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700">Join Prime Now</button>
        </PlaceholderPage>
    );
};
// pages/OrderTracking.jsx
const OrderTracking = () => {
    return (
        <PlaceholderPage title="🚚 Track Your Order">
            <p>Order #MCM123456</p>
            <div className="mt-6">
                {/* Mock timeline */}
                <ol className="relative border-l border-gray-200 dark:border-gray-700">                  
                    <li className="mb-10 ml-4">
                        <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 7th, 2025</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delivered</h3>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Your order has been delivered to your campus address.</p>
                    </li>
                     <li className="mb-10 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 6th, 2025</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Placed</h3>
                    </li>
                </ol>
            </div>
        </PlaceholderPage>
    );
};
// pages/BookExchange.jsx
const BookExchange = () => {
    return (
        <PlaceholderPage title="🔄 Book Exchange Community">
             <p>Looking to trade instead of buy? Post your request here!</p>
             <div className="mt-6 space-y-4">
                 <div className="p-4 border rounded-lg">
                    <p><strong>Have:</strong> Intro to Psychology | <strong>Want:</strong> Advanced Economics</p>
                    <p className="text-sm text-slate-500">Posted by Alex Doe</p>
                 </div>
             </div>
        </PlaceholderPage>
    );
};

// pages/NoResultsFound.jsx
const NoResultsFound = ({ onNavigate }) => {
    return (
        <div className="text-center py-20 flex flex-col items-center">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                <div className="text-7xl mb-4">🤷‍♀️</div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">No Results Found</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">We couldn't find any items matching your search. Don't worry, new items are added daily!</p>
                 <button onClick={() => onNavigate('Marketplace')} className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700">
                    Explore All Items
                </button>
            </motion.div>
        </div>
    );
};

// --- NEWLY ADDED/FIXED COMPONENTS ---

// components/CommunityQA.jsx
const CommunityQA = ({ questions }) => {
    const [newQuestion, setNewQuestion] = useState("");

    const handleAsk = (e) => {
        e.preventDefault();
        // In a real app, this would submit the question to a backend.
        console.log("New Question:", newQuestion);
        setNewQuestion("");
    };

    return (
        <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Community Q&A</h2>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
                <form onSubmit={handleAsk} className="flex gap-2 mb-6">
                    <input 
                        type="text" 
                        value={newQuestion}
                        onChange={e => setNewQuestion(e.target.value)}
                        placeholder="Ask a question about this item..." 
                        className={INPUT_STYLE}
                    />
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg">Ask</button>
                </form>
                <div className="space-y-4">
                    {questions.length > 0 ? questions.map(q => (
                        <div key={q.id}>
                            <p className="font-semibold"><QuestionMarkCircleIcon className="inline w-5 h-5 mr-1" /> {q.question} <span className="text-sm font-normal text-slate-500">- {q.author}</span></p>
                            {q.answers.map((a, i) => (
                                <p key={i} className="ml-6 pl-2 border-l-2 text-slate-600 dark:text-slate-300"><strong>A:</strong> {a.text} <span className="text-sm font-normal text-slate-500">- {a.author}</span></p>
                            ))}
                        </div>
                    )) : <p className="text-slate-500">Be the first to ask a question!</p>}
                </div>
            </div>
        </div>
    );
};

// pages/SkillMarketplace.jsx
const SkillMarketplace = ({ onNavigate }) => {
    // Mock data for skills
    const skills = [
        { id: 1, title: 'C++ Tutoring for DSA', author: 'Priya V.', branch: 'CSE', price: '₹500/hr', rating: 4.9 },
        { id: 2, title: 'AutoCAD Project Help', author: 'Ravi M.', branch: 'Mechanical', price: '₹1500/project', rating: 4.8 },
        { id: 3, title: 'Surveying Lab Assistance', author: 'Suresh K.', branch: 'Civil', price: '₹800/lab', rating: 5.0 },
    ];

    return (
        <PlaceholderPage title="🛠️ Skill Marketplace">
            <p className="mb-6">Find skilled peers to help with tutoring, projects, and lab work.</p>
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

// pages/AccountPage.jsx
const AccountPage = ({ onNavigate }) => {
    const { state } = useGlobalState();
    const user = { displayName: 'Alex Doe', email: 'student@college.edu' }; // mock user

    const menuItems = [
        { name: 'My Listings', icon: <ClipboardListIcon />, page: 'SellerDashboard' },
        { name: 'Track Orders', icon: <LocationMarkerIcon />, page: 'OrderTracking' },
        { name: 'Settings', icon: <CogIcon />, page: '' },
        { name: 'Logout', icon: <LogoutIcon />, page: 'Home' },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <img src="https://placehold.co/100x100/6366f1/ffffff?text=AD" alt="Profile" className="w-24 h-24 rounded-full border-4 border-indigo-500" />
                <div>
                    <h1 className="text-3xl font-bold">{user.displayName}</h1>
                    <p className="text-slate-500">{user.email}</p>
                </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                    {menuItems.map(item => (
                        <button key={item.name} onClick={() => onNavigate(item.page)} className="w-full flex items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                            {item.icon}
                            <span className="ml-3 font-semibold">{item.name}</span>
                        </button>
                    ))}
                </div>
                <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center"><WalletIcon className="mr-2"/> Student Wallet</h2>
                    <p className="text-4xl font-bold text-green-500">₹{state.studentWallet.toFixed(2)}</p>
                    <p className="text-slate-500 mt-2">Use your wallet balance for discounts at checkout!</p>
                </div>
            </div>
        </div>
    );
};


// --- APP CONTENT WRAPPER ---
// This component contains the main app logic and can safely access global state
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [pageData, setPageData] = useState(null); // Used for passing data between pages, e.g., to PDP
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { state } = useGlobalState(); // This is now safe to call
  
  // A simple router implementation using state
  const handleNavigate = (page, data = null) => {
      setPageData(data);
      setCurrentPage(page);
      window.scrollTo(0, 0);
  };
  
  const handleNavigateWithCategory = (category) => {
      setPageData({ initialCategory: category });
      setCurrentPage('Marketplace');
      window.scrollTo(0, 0);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home onNavigate={handleNavigate} />;
      case 'Marketplace':
        return <Marketplace onNavigate={handleNavigate} initialCategory={pageData?.initialCategory} initialSearch={pageData?.searchQuery}/>;
      case 'ProductDetail':
        const product = state.products.items.find(p => p.id === pageData?.id) || pageData;
        return <ProductDetailPage product={product} onNavigate={handleNavigate} />;
      case 'Wishlist':
        return <Wishlist onNavigate={handleNavigate} />;
      case 'SellerDashboard':
        return <SellerDashboard onNavigate={handleNavigate} />;
      case 'PrimeMembership':
        return <PrimeMembership onNavigate={handleNavigate} />;
      case 'OrderTracking':
        return <OrderTracking onNavigate={handleNavigate} />;
      case 'BookExchange':
        return <BookExchange onNavigate={handleNavigate} />;
      case 'Login':
        return <Login onNavigate={handleNavigate} />;
      case 'Signup':
        return <Signup onNavigate={handleNavigate} />;
      case 'About':
        return <About onNavigate={handleNavigate} />;
      case 'Contact':
        return <Contact />;
      case 'Sell':
        return <Sell onNavigate={handleNavigate} />;
      case 'Checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'Pricing':
        return <Pricing />;
      case 'FAQ':
        return <FAQ />;
      case 'Careers':
        return <Careers />;
      case 'StudyCorner':
        return <StudyCorner />;
      case 'Privacy':
        return <Privacy />;
      case 'Terms':
        return <Terms />;
      // NEW PAGES
      case 'SkillMarketplace':
        return <SkillMarketplace onNavigate={handleNavigate} />;
      case 'Account':
        return <AccountPage onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300">
        <NotificationHost />
        <Navbar onCartClick={() => setIsCartOpen(true)} onNavigate={handleNavigate} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
             {renderPage()}
        </main>
        
        <Footer onNavigate={handleNavigate} onNavigateWithCategory={handleNavigateWithCategory} />

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onNavigate={handleNavigate} />
        <AIChatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} onNavigate={handleNavigate}/>
    </div>
  );
};


// --- MAIN APP COMPONENT ---
// This component now only sets up providers
function App() {
  return (
    <LanguageProvider>
        <ThemeProvider>
            <GlobalStateProvider>
                <AppContent />
            </GlobalStateProvider>
        </ThemeProvider>
    </LanguageProvider>
  );
}

// Ensure ReactDOM is available before rendering
if (typeof ReactDOM !== 'undefined') {
    const container = document.getElementById('root');
    let root = container._reactRootContainer; // Check if a root has already been created
    if (!root) { 
        root = ReactDOM.createRoot(container);
    }
    root.render(<App />);
}
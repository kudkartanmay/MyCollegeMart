import { useState, useEffect, useMemo } from 'react';
import { useGlobalState, actionTypes } from '../context/GlobalStateContext';
import ProductCard from '../components/product/ProductCard';
import { mockFirebase } from '../utils/mockFirebase';

const Filters = ({ categories, selectedCategory, onSelectCategory, onSortChange, onBranchChange, onSemesterChange, isPrimeMember }) => {
    // Updated engineering branches
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
    
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 'All'];

    return (
        <aside className="w-full md:w-64 lg:w-72 p-4 space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Filters</h3>
            
            <div>
                <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Sort By</h4>
                <select 
                    onChange={(e) => onSortChange(e.target.value)} 
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                >
                    <option value="relevance">Relevance</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Average Rating</option>
                    <option value="newest">Newest First</option>
                </select>
            </div>

            <div>
                <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Branch</h4>
                <select 
                    onChange={(e) => onBranchChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                >
                    {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            <div>
                <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Semester</h4>
                <select 
                    onChange={(e) => onSemesterChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                >
                    <option value="All">All Semesters</option>
                    {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            <div>
                <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Category</h4>
                <ul className="space-y-2">
                    {['All', ...categories].map((category) => {
                        // Check if this is the Prime Exclusive category
                        const isPrimeCategory = category === 'Prime Exclusive';
                        
                        // If Prime category and user is not prime member, show it with special styling
                        return (
                            <li key={category}>
                                <button
                                    onClick={() => onSelectCategory(category)}
                                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-indigo-600 text-white font-semibold'
                                            : isPrimeCategory && !isPrimeMember
                                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    } ${isPrimeCategory ? 'flex items-center justify-between' : ''}`}
                                    disabled={isPrimeCategory && !isPrimeMember}
                                >
                                    {category}
                                    {isPrimeCategory && (
                                        <span className={`px-1.5 py-0.5 text-xs rounded ${isPrimeMember ? 'bg-amber-500 text-amber-900' : 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200'}`}>
                                            ✨ PRIME
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};

const NoResultsFound = ({ onNavigate }) => {
    return (
        <div className="text-center py-20 flex flex-col items-center">
            <div className="text-7xl mb-4">🤷‍♀️</div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">No Results Found</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">We couldn't find any items matching your search. Don't worry, new items are added daily!</p>
            <button onClick={() => onNavigate('Marketplace')} className="mt-6 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700">
                Explore All Items
            </button>
        </div>
    );
};

const Marketplace = ({ onNavigate, initialCategory, initialSearch }) => {
    const { state, dispatch } = useGlobalState();
    const { items: products, status } = state.products;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
    const [searchTerm, setSearchTerm] = useState(initialSearch || '');
    const [sortMethod, setSortMethod] = useState('relevance');
    const [selectedBranch, setSelectedBranch] = useState('All Branches');
    const [selectedSemester, setSelectedSemester] = useState('All');
    const isPrimeMember = state.user?.isPrimeMember;

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
        // Filter by Prime access if needed
        if (selectedCategory === 'Prime Exclusive') {
            if (isPrimeMember) {
                result = result.filter(p => p.isPrimeExclusive);
            } else {
                result = []; // No products shown if not Prime member
            }
        } 
        // Otherwise, filter normally but exclude Prime exclusive items for non-Prime users
        else {
            if (selectedCategory !== 'All') {
                result = result.filter(p => p.category === selectedCategory);
            }
            // Non-Prime users can't see Prime exclusive items in other categories
            if (!isPrimeMember) {
                result = result.filter(p => !p.isPrimeExclusive);
            }
        }
        // Apply other filters
        if (searchTerm) result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (selectedBranch !== 'All Branches') result = result.filter(p => p.branch === selectedBranch || p.branch === 'Any');
        if (selectedSemester !== 'All') result = result.filter(p => p.semester === selectedSemester || p.semester === 'Any');
        // Apply sorting
        switch(sortMethod) {
            case 'price_asc': result.sort((a, b) => a.price - b.price); break;
            case 'price_desc': result.sort((a, b) => b.price - a.price); break;
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            case 'newest': result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); break;
            default: break;
        }
        setFilteredProducts(result);
    }, [products, selectedCategory, searchTerm, sortMethod, selectedBranch, selectedSemester, isPrimeMember]);
    // Extended categories list with Prime Exclusive added
    const categories = useMemo(() => [
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
        'Stationery',
        'Prime Exclusive' // New category exclusive to Prime members
    ], []);
    const handleProductSelect = (product) => {
        onNavigate('ProductDetail', product);
    }
    // Banner to prompt users to join Prime if they try to access Prime Exclusive
    const showPrimeBanner = selectedCategory === 'Prime Exclusive' && !isPrimeMember;
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <Filters 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSortChange={setSortMethod}
                onBranchChange={setSelectedBranch}
                onSemesterChange={setSelectedSemester}
                isPrimeMember={isPrimeMember}
            />
            <main className="flex-1">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        {searchTerm ? `Results for "${searchTerm}"` : selectedCategory !== 'All' ? selectedCategory : 'All Products'}
                        {selectedCategory === 'Prime Exclusive' && isPrimeMember && (
                            <span className="ml-3 text-sm bg-amber-500 text-slate-900 px-2 py-1 rounded-full">✨ PRIME EXCLUSIVE</span>
                        )}
                    </h1>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="w-full sm:w-64 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                    />
                </div>
                {/* Prime membership banner */}
                {showPrimeBanner && (
                    <div className="mb-8 bg-gradient-to-r from-amber-500 to-amber-700 text-white p-6 rounded-lg shadow-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-xl font-bold flex items-center">
                                    <span className="mr-2">✨</span> Prime Exclusive Products
                                </h2>
                                <p className="mt-1 text-amber-100">
                                    Join MyCollegeMart Prime to access exclusive products and special offers!
                                </p>
                            </div>
                            <button
                                onClick={() => onNavigate('PrimeMembership')}
                                className="px-4 py-2 bg-white text-amber-600 font-bold rounded hover:bg-amber-50 transition"
                            >
                                Join Prime - ₹299/year
                            </button>
                        </div>
                    </div>
                )}
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' && (
                    filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} onProductSelect={handleProductSelect}/>
                            ))}
                        </div>
                    ) : !showPrimeBanner ? (
                        <NoResultsFound onNavigate={onNavigate} />
                    ) : null
                )}
                {status === 'failed' && <p>Error loading products.</p>}
            </main>
        </div>
    );
};

export default Marketplace;

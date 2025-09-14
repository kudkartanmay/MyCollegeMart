import { useState, useEffect, useMemo } from 'react';
import { useGlobalState, actionTypes } from '../context/GlobalStateContext';
import ProductCard from '../components/product/ProductCard';
import { AcademicCapIcon } from '../components/UI/Icons'; // added

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
        <aside className="w-full md:w-64 lg:w-72 p-4 space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow md:sticky top-20 h-fit">
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
                <select
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                >
                    <option value="All">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category === 'Prime Exclusive' ? 'Prime Exclusive ✨' : category}
                        </option>
                    ))}
                </select>
                {/* Optional helper note when Prime Exclusive selected but user isn't Prime */}
                {selectedCategory === 'Prime Exclusive' && !isPrimeMember && (
                    <p className="mt-2 text-xs text-amber-500 dark:text-amber-300">
                        Join Prime to access this category.
                    </p>
                )}
            </div>
        </aside>
    );
};

const NoResultsFound = ({ onExploreAll }) => {
    return (
        <div className="text-center py-20 flex flex-col items-center">
            <div className="text-7xl mb-4">🤷‍♀️</div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">No Results Found</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">We couldn't find any items matching your search. Don't worry, new items are added daily!</p>
            <button onClick={onExploreAll} className="mt-6 px-6 py-2 bg-amber-400 text-slate-900 font-semibold rounded-full shadow-lg hover:bg-amber-500">
                Explore All Items
            </button>
        </div>
    );
};

const Marketplace = ({ onNavigate, initialCategory, initialSearch }) => {
    const { state, dispatch } = useGlobalState();
    const { items: products, status } = state.products;
    // Removed unused filteredProducts state
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
    const [searchTerm, setSearchTerm] = useState(initialSearch || '');
    const [sortMethod, setSortMethod] = useState('relevance');
    const [selectedBranch, setSelectedBranch] = useState('All Branches');
    const [selectedSemester, setSelectedSemester] = useState('All');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const isPrimeMember = state.user?.isPrimeMember;

    useEffect(() => {
        if (status === 'idle') {
            dispatch({ type: actionTypes.FETCH_PRODUCTS_START });
            // Use the products API from context/global state if available
            state.products.api.getAll()
                .then(response => {
                    dispatch({ type: actionTypes.FETCH_PRODUCTS_SUCCESS, payload: response.data });
                })
                .catch(error => {
                    dispatch({ type: actionTypes.FETCH_PRODUCTS_FAIL, payload: error.toString() });
                });
        }
    }, [status, dispatch, state.products.api]);
    // Removed unused useEffect for filteredProducts
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
    // Build the product list (apply your existing filters/search before slicing)
    const allItems = useMemo(() => {
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
        switch (sortMethod) {
            case 'price_asc':
                result = result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                break;
            case 'price_desc':
                result = result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                break;
            case 'rating':
                result = result.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));
                break;
            case 'newest':
                result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            // 'relevance' or default: no additional sorting
            default:
                break;
        }
        return result;
    }, [products, selectedCategory, searchTerm, selectedBranch, selectedSemester, isPrimeMember, sortMethod]);

    const totalPages = Math.max(1, Math.ceil(allItems.length / pageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const start = (currentPage - 1) * pageSize;
    const pagedItems = allItems.slice(start, start + pageSize);

    const goToPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

    // Reset to page 1 on filter/search/sort changes
    useEffect(() => {
        setPage(1);
    }, [selectedCategory, searchTerm, selectedBranch, selectedSemester, sortMethod]);

    // Handler to reset all filters/search for "Explore All Items"
    const handleExploreAll = () => {
        setSelectedCategory('All');
        setSearchTerm('');
        setSelectedBranch('All Branches');
        setSelectedSemester('All');
        setSortMethod('relevance');
        setPage(1);
    };

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
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                            {allItems.length === 0 ? '0' : `${start + 1}-${Math.min(start + pageSize, allItems.length)}`} of {allItems.length}
                        </span>
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
                            title="Items per page"
                        >
                            <option value={12}>12 / page</option>
                            <option value={24}>24 / page</option>
                            <option value={36}>36 / page</option>
                        </select>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search products..."
                            className="w-40 sm:w-64 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-amber-500"
                        />
                    </div>
                </div>
                {/* Prime membership banner */}
                {showPrimeBanner && (
                    <div className="mb-8 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-xl font-bold flex items-center">
                                    <span className="mr-2">✨</span> Flash Deal!
                                </h2>
                                <p className="mt-1 text-white/95">
                                    Get the Organic Chemistry Model Kit for just ₹1800!
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Timer boxes */}
                                <div className="flex gap-2">
                                    <div className="bg-indigo-800 rounded px-3 py-2 text-center">
                                        <div className="text-lg font-bold text-white">24</div>
                                        <div className="text-xs text-indigo-200 font-semibold">HRS</div>
                                    </div>
                                    <div className="bg-indigo-800 rounded px-3 py-2 text-center">
                                        <div className="text-lg font-bold text-white">00</div>
                                        <div className="text-xs text-indigo-200 font-semibold">MIN</div>
                                    </div>
                                    <div className="bg-indigo-800 rounded px-3 py-2 text-center">
                                        <div className="text-lg font-bold text-white">00</div>
                                        <div className="text-xs text-indigo-200 font-semibold">SEC</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onNavigate('ProductDetail', { id: 'flash-deal-product' })}
                                    className="ml-4 px-5 py-2 bg-white text-indigo-900 font-bold rounded hover:bg-indigo-100 transition"
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' && (
                    pagedItems.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                            {pagedItems.map((product) => (
                                <div key={product.id}>
                                  <ProductCard
                                    product={product}
                                    onProductSelect={handleProductSelect}
                                    compact
                                  />
                                  {/* Card footer extension to accommodate sem tag */}
                                  <div className="-mt-1 bg-white dark:bg-slate-800 rounded-b-lg px-3 py-1.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 text-[11px]">
                                      <AcademicCapIcon className="w-3.5 h-3.5" />
                                      {(() => {
                                        const sem = product.semester;
                                        if (sem === 'All' || sem === 'Any') return 'All Semesters';
                                        const n = Number(sem);
                                        return Number.isNaN(n) ? `${sem}` : `Sem ${n}`;
                                      })()}
                                    </span>
                                    <span className="text-[11px] text-slate-400 dark:text-slate-500"></span>
                                  </div>
                                </div>
                            ))}
                        </div>
                    ) : !showPrimeBanner ? (
                        <NoResultsFound onExploreAll={handleExploreAll} />
                    ) : null
                )}
                {status === 'failed' && <p>Error loading products.</p>}
                {/* Pagination controls */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 text-sm rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
                    >
                        Prev
                    </button>
                    {/* Show a small window of pages */}
                    {Array.from({ length: totalPages }).slice(
                        Math.max(0, currentPage - 3),
                        Math.min(totalPages, currentPage + 2)
                    ).map((_, idx) => {
                        const pageNum = Math.max(1, currentPage - 3) + idx;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`px-3 py-1.5 text-sm rounded border ${
                                    pageNum === currentPage
                                      ? 'bg-amber-400 text-slate-900 border-amber-400'
                                      : 'border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 text-sm rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Marketplace;

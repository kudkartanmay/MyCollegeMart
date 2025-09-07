import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/LanguageContext';
import { useGlobalState } from '../../context/GlobalStateContext';
import {
  SearchIcon,
  ShoppingCartIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  HeartIcon,
  MicrophoneIcon
} from '../UI/Icons';

const Navbar = ({ onCartClick, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { state } = useGlobalState();
  const cartItemCount = Object.values(state.cart.items).reduce((sum, item) => sum + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      setSuggestions(
        state.products.items.filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onNavigate('Marketplace', { searchQuery: searchTerm });
      setSuggestions([]);
      setSearchTerm('');
    }
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
        <div className="flex items-center h-16">
          {/* Hamburger menu button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
              aria-label="Main menu"
            >
              <MenuIcon />
            </button>

            {/* Dropdown menu */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-50"
              >
                <div className="py-1" role="menu">
                  {navLinks.map(link => (
                    <button
                      key={link.name}
                      type="button"
                      onClick={() => { onNavigate(link.page); setIsMenuOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-none bg-transparent"
                      role="menuitem"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Brand logo with both icon and text */}
          <div className="flex-shrink-0 ml-4">
            <button
              type="button"
              onClick={() => onNavigate('Home')}
              className="bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none flex items-center"
              style={{ background: 'none' }}
              aria-label="Go to Home"
            >
              <span className="inline-flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 dark:border-indigo-400 mr-3"
                    style={{ width: 48, height: 48, overflow: 'hidden' }}>
                <img
                  src="/MyCollegeMart-Icon.jpg"
                  alt="MyCollegeMart Icon"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                MyCollegeMart
              </span>
            </button>
          </div>

          {/* Expanded search bar */}
          <div className="flex-1 mx-4 md:mx-6 lg:mx-8">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                  >
                    <MicrophoneIcon />
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="ml-2 px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors duration-200"
                disabled={!searchTerm.trim()}
              >
                Search
              </button>
              {suggestions.length > 0 && (
                <ul className="absolute mt-1 top-full left-0 w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg z-10 overflow-hidden">
                  {suggestions.slice(0, 5).map(product => (
                    <li
                      key={product.id}
                      onClick={() => { onNavigate('ProductDetail', product); setSuggestions([]); setSearchTerm(''); }}
                      className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex items-center space-x-3"
                    >
                      <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-sm object-cover" />
                      <span className="font-medium">{product.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <button onClick={() => onNavigate('Account')} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              <UserCircleIcon />
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button onClick={() => onNavigate('Wishlist')} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              <HeartIcon filled={state.wishlist.length > 0} />
            </button>
            <div className="relative">
              <button onClick={onCartClick} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                <ShoppingCartIcon />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
            <div className="hidden md:flex items-center ml-2">
              <button onClick={() => onNavigate('Login')} className="bg-transparent text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-md text-sm font-medium border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                {t('login')}
              </button>
              <button onClick={() => onNavigate('Signup')} className="ml-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                {t('signup')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

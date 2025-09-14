import { useState, useEffect } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import ShoppingCart from './shopping/ShoppingCart';
import Home from '../pages/Home';
import Marketplace from '../pages/Marketplace';
import ProductDetail from '../pages/ProductDetail';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import About from '../pages/Info/About';
import Contact from '../pages/Info/Contact';
import Wishlist from '../pages/User/Wishlist';
import Account from '../pages/User/Account';
import Sell from '../pages/User/Sell';
import Checkout from '../pages/Checkout';
import SellerDashboard from '../pages/User/SellerDashboard';
import PrimeMembership from '../pages/Info/PrimeMembership';
import OrderTracking from '../pages/Info/OrderTracking';
import BookExchange from '../pages/Info/BookExchange';
import FAQ from '../pages/Info/FAQ';
import Pricing from '../pages/Info/Pricing';
import Careers from '../pages/Info/Careers';
import StudyCorner from '../pages/Info/StudyCorner';
import Privacy from '../pages/Info/Privacy';
import Terms from '../pages/Info/Terms';
import SkillMarketplace from '../pages/SkillMarketplace';
import AIChatbot from './common/AIChatbot';
import AssignmentHelp from '../pages/services/AssignmentHelp';

const AppContent = () => {
  // Persist page + params + selected product
  const [currentPage, setCurrentPage] = useState(() => localStorage.getItem('mcm.currentPage') || 'Home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mcm.selectedProduct') || 'null'); } catch { return null; }
  });
  const [params, setParams] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mcm.pageParams') || '{}'); } catch { return {}; }
  });
  // const [pageData, setPageData] = useState(null);
  // const { state } = useGlobalState();

  const setHistory = (updater) => {
    try {
      const prev = JSON.parse(localStorage.getItem('mcm.pageHistory') || '[]');
      const newHistory = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem('mcm.pageHistory', JSON.stringify(newHistory));
    } catch {
      // ignore
    }
  };

  // Enhanced navigation to track history
  const handleNavigate = (page, pageParams = {}) => {
    setHistory(prev => {
      const newHistory = [...prev, { page: currentPage, params }];
      localStorage.setItem('mcm.pageHistory', JSON.stringify(newHistory));
      return newHistory;
    });
    setCurrentPage(page);
    setParams(pageParams);
    localStorage.setItem('mcm.currentPage', page);
    localStorage.setItem('mcm.pageParams', JSON.stringify(pageParams || {}));

    if (page === 'ProductDetail') {
      setSelectedProduct(pageParams || null);
      localStorage.setItem('mcm.selectedProduct', JSON.stringify(pageParams || null));
    } else {
      localStorage.removeItem('mcm.selectedProduct');
    }

    window.scrollTo(0, 0);
  };

  // Escape key handler for navigation
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setHistory(prev => {
          if (prev.length > 0) {
            const last = prev[prev.length - 1];
            setCurrentPage(last.page);
            setParams(last.params);
            localStorage.setItem('mcm.currentPage', last.page);
            localStorage.setItem('mcm.pageParams', JSON.stringify(last.params || {}));
            // Remove last from history
            const newHistory = prev.slice(0, -1);
            localStorage.setItem('mcm.pageHistory', JSON.stringify(newHistory));
            if (last.page === 'ProductDetail') {
              setSelectedProduct(last.params || null);
              localStorage.setItem('mcm.selectedProduct', JSON.stringify(last.params || null));
            } else {
              localStorage.removeItem('mcm.selectedProduct');
            }
            window.scrollTo(0, 0);
            return newHistory;
          }
          return prev;
        });
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home onNavigate={handleNavigate} />;
      case 'Marketplace':
        return <Marketplace onNavigate={handleNavigate} initialSearch={params.searchQuery} />;
      case 'ProductDetail':
        return <ProductDetail product={selectedProduct} onNavigate={handleNavigate} />;
      case 'Login':
        return <Login onNavigate={handleNavigate} />;
      case 'Signup':
        return <Signup onNavigate={handleNavigate} />;
      case 'About':
        return <About onNavigate={handleNavigate} />;
      case 'Contact':
        return <Contact onNavigate={handleNavigate} />;
      case 'Wishlist':
        return <Wishlist onNavigate={handleNavigate} />;
      case 'Account':
        return <Account onNavigate={handleNavigate} />;
      case 'Sell':
        return <Sell onNavigate={handleNavigate} />;
      case 'Checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'SellerDashboard':
        return <SellerDashboard onNavigate={handleNavigate} />;
      case 'PrimeMembership':
        return <PrimeMembership onNavigate={handleNavigate} />;
      case 'OrderTracking':
        return <OrderTracking onNavigate={handleNavigate} />;
      case 'BookExchange':
        return <BookExchange onNavigate={handleNavigate} />;
      case 'FAQ':
        return <FAQ onNavigate={handleNavigate} />;
      case 'Pricing':
        return <Pricing onNavigate={handleNavigate} />;
      case 'Careers':
        return <Careers onNavigate={handleNavigate} />;
      case 'StudyCorner':
        return <StudyCorner onNavigate={handleNavigate} />;
      case 'Privacy':
        return <Privacy onNavigate={handleNavigate} />;
      case 'Terms':
        return <Terms onNavigate={handleNavigate} />;
      case 'SkillMarketplace':
        return <SkillMarketplace onNavigate={handleNavigate} />;
      case 'AssignmentHelp':
        return <AssignmentHelp onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      <Navbar onCartClick={() => setIsCartOpen(true)} onNavigate={handleNavigate} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} />
      <AIChatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} onNavigate={handleNavigate} />
    </div>
  );
};

export default AppContent;

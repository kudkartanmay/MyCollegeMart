import React, { useState } from 'react';
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

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [params, setParams] = useState({});

  const handleNavigate = (page, pageParams = {}) => {
    setCurrentPage(page);
    if (page === 'ProductDetail' && pageParams) {
      setSelectedProduct(pageParams);
    }
    setParams(pageParams);
    window.scrollTo(0, 0);
  };

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

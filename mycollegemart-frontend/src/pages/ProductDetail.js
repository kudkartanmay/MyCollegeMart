import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../context/GlobalStateContext';
import StarRating from '../components/UI/StarRating';
import CommunityQA from '../components/product/CommunityQA';
import { products } from '../utils/api';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ product: initialProduct, onNavigate }) => {
  const params = useParams();
  const productId = params && params.productId ? params.productId : initialProduct?.id;
  const { state, dispatch } = useGlobalState();
  const [product, setProduct] = useState(initialProduct || null);
  const [mainImage, setMainImage] = useState('');
  const [isAdding, setIsAdding] = useState(false); // Add loading state
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product && productId) {
      setLoading(true);
      products.getById(productId)
        .then(res => {
          setProduct(res.data);
          setError(null);
        })
        .catch(() => setError('Product not found'))
        .finally(() => setLoading(false));
    }
  }, [productId, product]);

  useEffect(() => {
    if (product) {
      setMainImage(product.imageUrl);
    }
  }, [product]);

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>Product not found</div>;

  const handleAddToCart = async () => {
      // Enforce Prime Membership limit = 1
      if (product?.id === 'prime-membership' && state.cart?.items?.['prime-membership']) {
          dispatch({ 
            type: actionTypes.ADD_NOTIFICATION, 
            payload: { message: 'Prime Membership can only be added once.', type: 'error' } 
          });
          return;
      }
      if (isAdding) return;
      setIsAdding(true);
      try {
          const result = await products.addToCart(state.user.id, product);
          if (result.success) {
              dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
              dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: `${product.name} added to cart!`, type: 'success' } });
          } else {
              dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: 'Failed to add to cart.', type: 'error' } });
          }
      } catch (error) {
          dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: { message: 'An error occurred.', type: 'error' } });
      } finally {
          setIsAdding(false);
      }
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
                              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{product.price?.toFixed(2)}</p>
                              <p className="mt-2 text-green-600 dark:text-green-400 font-semibold">In Stock</p>
                              <p className="text-sm text-slate-500">Ready for campus pickup.</p>
                              <div className="mt-6 space-y-3">
                                  <button 
                                      onClick={handleAddToCart} 
                                      disabled={isAdding}
                                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center"
                                  >
                                      {isAdding ? (
                                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                      ) : (
                                          'Add to Cart'
                                      )}
                                  </button>
                                   {product.isRentable && <button className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700">Rent Item</button>}
                                   {product.isExchangeable && <button className="w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600">Propose Exchange</button>}
                              </div>
                          </div>
                      </div>
                 </div>
              </div>
          </div>

          {/* Bottom Sections */}
          {frequentlyBought?.length > 0 && (
              <div className="mt-12 border-t pt-8">
                  <h2 className="text-2xl font-bold mb-4">Frequently Bought Together</h2>
                  <div className="flex items-center gap-4">
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200">
                          <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover mx-auto" />
                          <p className="mt-2 text-center font-medium">{product.name}</p>
                      </div>
                      <span className="text-2xl font-bold">+</span>
                       {frequentlyBought.map(item => (
                          <div 
                              key={item.id} 
                              onClick={() => onNavigate('ProductDetail', item)} 
                              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 cursor-pointer hover:border-indigo-500"
                          >
                              <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover mx-auto" />
                              <p className="mt-2 text-center font-medium">{item.name}</p>
                          </div>
                       ))}
                  </div>
              </div>
          )}
          
          <CommunityQA questions={product.communityQA || []} />

          {/* Specs and Reviews */}
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
                      <h2 className="text-2xl font-bold mb-4">Customer Reviews ({product.reviewCount || 0})</h2>
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

export default ProductDetail;

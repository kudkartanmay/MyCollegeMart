import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { HeartIcon, ShoppingCartIcon } from '../UI/Icons';
import { products } from '../../utils/api';

const ProductCard = ({ product, onProductSelect, compact = false }) => {
    const { state, dispatch } = useGlobalState();
    const [isAdding, setIsAdding] = useState(false);
    const isWishlisted = state.wishlist.includes(product.id);

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        dispatch({ 
            type: actionTypes.TOGGLE_WISHLIST,
            payload: product.id 
        });
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (isAdding) return;

        setIsAdding(true);
        try {
            await products.addToCart(product.id, 1);
            dispatch({ type: actionTypes.ADD_TO_CART, payload: product });
            dispatch({ 
                type: actionTypes.ADD_NOTIFICATION, 
                payload: { message: 'Added to cart!', type: 'success' } 
            });
        } catch (error) {
            dispatch({ 
                type: actionTypes.ADD_NOTIFICATION, 
                payload: { message: 'Failed to add item to cart.', type: 'error' } 
            });
        } finally {
            setIsAdding(false);
        }
    };

    const isPrimeExclusive = product.isPrimeExclusive;
    const userIsPrime = state.user.isPrimeMember;
    const canPurchase = !isPrimeExclusive || userIsPrime;

    return (
        <motion.div
            whileHover={{ y: -3 }}
            className={`bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow ${compact ? 'hover:shadow-md' : 'hover:shadow-lg'} transition-all relative cursor-pointer`}
            onClick={() => onProductSelect(product)}
        >
            {isPrimeExclusive && (
                <div className="absolute top-2 right-2 z-10 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded">
                    PRIME
                </div>
            )}
            <div className={`relative w-full ${compact ? 'h-36 md:h-40' : 'h-56'} overflow-hidden`}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={handleWishlistToggle}
                    className={`absolute top-2 left-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition ${compact ? 'p-1' : 'p-1.5'}`}
                    aria-label="Toggle Wishlist"
                >
                    <HeartIcon filled={isWishlisted} />
                </button>
                {canPurchase && (
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="absolute bottom-2 right-2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 transition"
                        aria-label="Add to Cart"
                    >
                        {isAdding ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <ShoppingCartIcon className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
            <div className={compact ? 'p-3' : 'p-4'}>
                <h3
                    className={`${compact ? 'text-sm' : 'text-base'} font-medium text-slate-900 dark:text-white truncate`}
                    title={product.name}
                >
                    {product.name}
                </h3>
                <div className="flex justify-between items-center mt-1">
                    <p className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-indigo-600 dark:text-indigo-400`}>
                        ₹{Number(product.price).toFixed(2)}
                    </p>
                    {product.rating && (
                        <div className={`flex items-center bg-green-100 dark:bg-green-900/30 ${compact ? 'px-1 py-0' : 'px-1.5 py-0.5'} rounded`}>
                            <span className={`${compact ? 'text-[11px]' : 'text-sm'} ml-0.5 text-slate-700 dark:text-slate-300`}>
                                ★ {product.rating}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

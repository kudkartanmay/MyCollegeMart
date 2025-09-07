import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalState, actionTypes } from '../../context/GlobalStateContext';
import { HeartIcon } from '../UI/Icons';

const ProductCard = ({ product, onProductSelect }) => {
    const { state, dispatch } = useGlobalState();
    const isWishlisted = state.wishlist.includes(product.id);
    
    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        dispatch({ 
            type: isWishlisted ? actionTypes.REMOVE_FROM_WISHLIST : actionTypes.ADD_TO_WISHLIST, 
            payload: product.id 
        });
    };

    const isPrimeExclusive = product.isPrimeExclusive;
    const userIsPrime = state.user.isPrimeMember;
    const canPurchase = !isPrimeExclusive || userIsPrime;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative cursor-pointer ${!canPurchase ? 'opacity-70' : ''}`}
            onClick={() => canPurchase && onProductSelect(product)}
        >
            {isPrimeExclusive && (
                <div className="absolute top-2 right-2 z-10 bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded">
                    PRIME EXCLUSIVE
                </div>
            )}
            <div className="relative aspect-square">
                <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                <button
                    onClick={handleWishlistToggle}
                    className="absolute top-2 left-2 p-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition"
                >
                    <HeartIcon filled={isWishlisted} />
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-medium text-slate-900 dark:text-white">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">₹{product.price.toFixed(2)}</p>
                    {product.rating && (
                        <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                            <span className="text-amber-500">★</span>
                            <span className="text-sm ml-1 text-slate-700 dark:text-slate-300">{product.rating}</span>
                        </div>
                    )}
                </div>
                {!canPurchase && (
                    <div className="mt-2 text-xs text-center bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 p-1 rounded">
                        Join Prime to unlock this product
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProductCard;

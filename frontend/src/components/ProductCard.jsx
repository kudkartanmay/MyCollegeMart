import React from 'react';

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
                <p className="text-gray-600 mt-1">{product.category}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">₹{product.price}</p>
                <button className="w-full mt-4 bg-accent text-white font-bold py-2 rounded-lg hover:bg-orange-500 transition-colors">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
import React from 'react';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';

const dummyProducts = [
    // (dummy product data remains here)
    { id: 1, name: 'Used Engineering Graphics Textbook', price: 450, category: 'Books', imageUrl: 'https://placehold.co/600x400/0A2540/FFF?text=Textbook' },
    { id: 2, name: 'Drafter & Mini-Drafter', price: 200, category: 'Essentials', imageUrl: 'https://placehold.co/600x400/0A2540/FFF?text=Drafter' },
    { id: 3, name: 'Complete Practical Kit - Sem 1', price: 800, category: 'Kits', imageUrl: 'https://placehold.co/600x400/0A2540/FFF?text=Kit' },
    { id: 4, name: 'Second-hand Scientific Calculator', price: 600, category: 'Electronics', imageUrl: 'https://placehold.co/600x400/0A2540/FFF?text=Calculator' },
];

function ProductListPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-primary mb-6">For Sale</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {dummyProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductListPage;
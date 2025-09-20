import React from 'react';

function Hero() {
    return (
        <div className="bg-primary text-white">
            <div className="container mx-auto px-4 py-24 flex flex-col md:flex-row items-center">
                {/* Left Side: Text and Buttons */}
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                        Campus deals. <br /> Fast delivery. <br /> Student-first.
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-lg">
                        MyCollegeMart brings textbooks, kits, and study essentials together in one marketplace — tailored for engineering students.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <button className="bg-accent hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            Shop Now
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            Sell Items
                        </button>
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-primary font-bold py-3 px-6 rounded-lg transition-colors">
                            Join Prime — ₹299/yr
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
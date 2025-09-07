import React from 'react';

// Fallback in case framer-motion isn't available
export const motion = {
  div: ({ layout, initial, animate, exit, className, transition, ...props }) => <div className={className} {...props} />,
  button: ({ layout, initial, animate, exit, className, transition, ...props }) => <button className={className} {...props} />,
  li: ({ layout, initial, animate, exit, className, transition, ...props }) => <li className={className} {...props} />,
  ul: ({ layout, initial, animate, exit, className, transition, ...props }) => <ul className={className} {...props} />,
  h1: ({ layout, initial, animate, exit, className, transition, ...props }) => <h1 className={className} {...props} />,
  h2: ({ layout, initial, animate, exit, className, transition, ...props }) => <h2 className={className} {...props} />,
  p: ({ layout, initial, animate, exit, className, transition, ...props }) => <p className={className} {...props} />,
  section: ({ layout, initial, animate, exit, className, transition, ...props }) => <section className={className} {...props} />,
};

try {
  // Try to import real framer-motion if available
  const framerMotion = require('framer-motion');
  if (framerMotion && framerMotion.motion) {
    Object.assign(motion, framerMotion.motion);
  }
} catch (error) {
  console.log('Framer Motion not available, using fallbacks');
}

export default motion;

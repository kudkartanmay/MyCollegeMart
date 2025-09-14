// Fallback in case framer-motion isn't available
export const motion = {
  div: ({ layout, initial, animate, exit, className, transition, children, ...props }) => <div className={className} {...props}>{children}</div>,
  button: ({ layout, initial, animate, exit, className, transition, children, ...props }) => <button className={className} {...props}>{children}</button>,
  li: ({ layout, initial, animate, exit, className, transition, children, ...props }) => <li className={className} {...props}>{children}</li>,
  ul: ({ layout, initial, animate, exit, className, transition, children, ...props }) => <ul className={className} {...props}>{children}</ul>,
  h1: ({ layout, initial, animate, exit, className, transition, children, ...props }) => <h1 className={className} {...props}>{children}</h1>,
  h2: ({ layout, initial, animate, exit, className, transition, children, ...props }) => <h2 className={className} {...props}>{children}</h2>,
  p: ({ layout, initial, animate, exit, className, transition, children, ...props }) => <p className={className} {...props}>{children}</p>,
  section: ({ layout, initial, animate, exit, className, transition, children, ...props }) => <section className={className} {...props}>{children}</section>,
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

// Mock Firebase implementation for development
export const mockFirebase = {
  auth: {
    onAuthStateChanged: (callback) => {
      setTimeout(() => callback({ uid: '123', email: 'student@college.edu', displayName: 'Alex Doe' }), 2000);
      return () => {};
    },
    signInWithEmailAndPassword: (email, password) => 
      Promise.resolve({ user: { uid: '123', email, displayName: 'Alex Doe' } }),
    createUserWithEmailAndPassword: (email, password) => 
      Promise.resolve({ user: { uid: '123', email, displayName: 'Alex Doe' } }),
    signOut: () => Promise.resolve(),
  },
  firestore: {
    getProducts: () => Promise.resolve([
      { 
        id: 1, 
        name: 'Intro to Psychology Textbook', 
        price: 4499.00, 
        category: 'Textbooks', 
        imageUrl: 'https://placehold.co/600x800/a2d2ff/ffffff?text=Psych+101',
        gallery: ['https://placehold.co/600x800/a2d2ff/ffffff?text=Psych+101', 'https://placehold.co/600x800/a2d2ff/ffffff?text=Cover', 'https://placehold.co/600x800/a2d2ff/ffffff?text=Index'],
        rating: 4.5, reviewCount: 18, isPrime: true,
        description: "A comprehensive introductory textbook for Psychology 101. This 5th edition covers all major concepts from social psychology to neuroscience. Perfect for any student starting their psychology journey. The book is in excellent condition with minimal highlighting.",
        highlights: ["Latest Edition", "Covers Core Concepts", "Great Condition"],
        specs: { "Condition": "Used - Like New", "Author": "Dr. Jane Doe", "Publisher": "College Press", "Year": "2022" },
        reviews: [{ author: 'Sarah J.', rating: 5, comment: "This book was a lifesaver! Super easy to understand.", image: 'https://placehold.co/200x150/e0e0e0/000000?text=Review+Image' }, { author: 'Mike R.', rating: 4, comment: "Good condition, but had a few highlighted pages." }],
        frequentlyBoughtTogether: [2, 3], branch: 'CSE', semester: 3, isRentable: true, isExchangeable: true,
        sellerInfo: { name: 'Rohan S.', rating: 4.8 },
        communityQA: [{ id: 1, question: "Is this book useful for the KTU syllabus?", author: "Priya", answers: [{ text: "Yes, it covers almost 90% of the topics perfectly!", author: "Rohan S." }] }]
      },
      // ... Add more mock products here
    ]),
  },
};

// Define the branches consistently across the application
export const engineeringBranches = [
    'All Branches',
    'Computer Engineering',
    'Civil Engineering',
    'Electronics and Telecommunication Engineering',
    'Information Technology',
    'Instrumentation Engineering',
    'Mechanical Engineering',
    'Artificial Intelligence and Data Science',
    'Computer Science and Engineering (Data Science)',
    'Electronics and Telecommunication Engineering (VLSI)'
];

// Sample products for each branch
const branchSpecificProducts = {
  "Computer Engineering": [
    {
      id: "ce-1",
      name: "Computer Networks by Tanenbaum",
      category: "Textbooks",
      price: 350,
      branch: "Computer Engineering",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=Networks",
      rating: 4.7
    },
    {
      id: "ce-2",
      name: "Digital Logic Design Kit",
      category: "Lab Equipment",
      price: 1200,
      branch: "Computer Engineering",
      semester: 3,
      imageUrl: "https://placehold.co/300x300/f59e0b/ffffff?text=Logic+Kit",
      rating: 4.3
    },
    {
      id: "ce-3",
      name: "OS Handwritten Notes",
      category: "Notes",
      price: 150,
      branch: "Computer Engineering",
      semester: 4,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=OS+Notes",
      rating: 4.9
    },
    {
      id: "ce-4",
      name: "Arduino Starter Kit",
      category: "Project Materials",
      price: 950,
      branch: "Computer Engineering",
      semester: 6,
      imageUrl: "https://placehold.co/300x300/3b82f6/ffffff?text=Arduino",
      rating: 4.6
    }
  ],
  "Civil Engineering": [
    {
      id: "civ-1",
      name: "Surveying Equipment Set",
      category: "Lab Equipment",
      price: 3500,
      branch: "Civil Engineering",
      semester: 3,
      imageUrl: "https://placehold.co/300x300/ec4899/ffffff?text=Survey+Set",
      rating: 4.4
    },
    {
      id: "civ-2",
      name: "Structural Analysis by Hibbeler",
      category: "Textbooks",
      price: 420,
      branch: "Civil Engineering",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=Structures",
      rating: 4.5
    },
    {
      id: "civ-3",
      name: "AutoCAD Civil 3D Guide",
      category: "Study Guides",
      price: 280,
      branch: "Civil Engineering",
      semester: 4,
      imageUrl: "https://placehold.co/300x400/8b5cf6/ffffff?text=AutoCAD",
      rating: 4.2
    },
    {
      id: "civ-4",
      name: "Soil Mechanics Lab Manual",
      category: "Notes",
      price: 180,
      branch: "Civil Engineering",
      semester: 6,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=Soil+Mechanics",
      rating: 4.7
    }
  ],
  "Electronics and Telecommunication Engineering": [
    {
      id: "etc-1",
      name: "Digital Signal Processing by Oppenheim",
      category: "Textbooks",
      price: 390,
      branch: "Electronics and Telecommunication Engineering",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=DSP",
      rating: 4.6
    },
    {
      id: "etc-2",
      name: "Oscilloscope - Tektronix TBS1000",
      category: "Lab Equipment",
      price: 12000,
      branch: "Electronics and Telecommunication Engineering",
      semester: "All",
      imageUrl: "https://placehold.co/300x300/f59e0b/ffffff?text=Oscilloscope",
      rating: 4.9
    },
    {
      id: "etc-3",
      name: "Antenna Design Kit",
      category: "Project Materials",
      price: 850,
      branch: "Electronics and Telecommunication Engineering",
      semester: 7,
      imageUrl: "https://placehold.co/300x300/3b82f6/ffffff?text=Antenna+Kit",
      rating: 4.3
    },
    {
      id: "etc-4",
      name: "Communication Systems Notes",
      category: "Notes",
      price: 220,
      branch: "Electronics and Telecommunication Engineering",
      semester: 6,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=Comm+Notes",
      rating: 4.7
    }
  ],
  "Information Technology": [
    {
      id: "it-1",
      name: "Database Management Systems by Korth",
      category: "Textbooks",
      price: 380,
      branch: "Information Technology",
      semester: 4,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=DBMS",
      rating: 4.5
    },
    {
      id: "it-2",
      name: "Web Development Framework Notes",
      category: "Notes",
      price: 200,
      branch: "Information Technology",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=Web+Dev",
      rating: 4.8
    },
    {
      id: "it-3",
      name: "Network Security Tools Kit",
      category: "Lab Equipment",
      price: 1500,
      branch: "Information Technology",
      semester: 7,
      imageUrl: "https://placehold.co/300x300/f59e0b/ffffff?text=Security+Kit",
      rating: 4.4
    },
    {
      id: "it-4",
      name: "Cloud Computing Services Guide",
      category: "Study Guides",
      price: 250,
      branch: "Information Technology",
      semester: 6,
      imageUrl: "https://placehold.co/300x400/8b5cf6/ffffff?text=Cloud+Computing",
      rating: 4.2
    }
  ],
  "Instrumentation Engineering": [
    {
      id: "inst-1",
      name: "Process Control Systems by Coughanowr",
      category: "Textbooks",
      price: 410,
      branch: "Instrumentation Engineering",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=Process+Control",
      rating: 4.3
    },
    {
      id: "inst-2",
      name: "Transducer Design Kit",
      category: "Lab Equipment",
      price: 2800,
      branch: "Instrumentation Engineering",
      semester: 4,
      imageUrl: "https://placehold.co/300x300/f59e0b/ffffff?text=Transducer",
      rating: 4.7
    },
    {
      id: "inst-3",
      name: "Measurement System Notes",
      category: "Notes",
      price: 180,
      branch: "Instrumentation Engineering",
      semester: 3,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=Measurement",
      rating: 4.6
    },
    {
      id: "inst-4",
      name: "LabVIEW Project Materials",
      category: "Project Materials",
      price: 950,
      branch: "Instrumentation Engineering",
      semester: 6,
      imageUrl: "https://placehold.co/300x300/3b82f6/ffffff?text=LabVIEW",
      rating: 4.5
    }
  ],
  "Mechanical Engineering": [
    {
      id: "mech-1",
      name: "Thermodynamics by P.K. Nag",
      category: "Textbooks",
      price: 375,
      branch: "Mechanical Engineering",
      semester: 3,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=Thermodynamics",
      rating: 4.8
    },
    {
      id: "mech-2",
      name: "Machine Design Drawing Tools",
      category: "Drawing Supplies",
      price: 750,
      branch: "Mechanical Engineering",
      semester: 4,
      imageUrl: "https://placehold.co/300x300/ec4899/ffffff?text=Design+Tools",
      rating: 4.4
    },
    {
      id: "mech-3",
      name: "Fluid Mechanics Lab Manual",
      category: "Notes",
      price: 220,
      branch: "Mechanical Engineering",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=Fluid+Mechanics",
      rating: 4.5
    },
    {
      id: "mech-4",
      name: "CAD/CAM Software Guide",
      category: "Study Guides",
      price: 300,
      branch: "Mechanical Engineering",
      semester: 6,
      imageUrl: "https://placehold.co/300x400/8b5cf6/ffffff?text=CAD+CAM",
      rating: 4.3
    },
    {
      id: "mech-5",
      name: "Heat Transfer Project Kit",
      category: "Project Materials",
      price: 1200,
      branch: "Mechanical Engineering",
      semester: 7,
      imageUrl: "https://placehold.co/300x300/3b82f6/ffffff?text=Heat+Transfer",
      rating: 4.6
    }
  ],
  "Artificial Intelligence and Data Science": [
    {
      id: "ai-1",
      name: "Deep Learning by Ian Goodfellow",
      category: "Textbooks",
      price: 420,
      branch: "Artificial Intelligence and Data Science",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=Deep+Learning",
      rating: 4.9
    },
    {
      id: "ai-2",
      name: "Python Data Science Libraries",
      category: "Programming Tools",
      price: 0,
      branch: "Artificial Intelligence and Data Science",
      semester: 3,
      imageUrl: "https://placehold.co/300x300/3b82f6/ffffff?text=Python+Libraries",
      rating: 4.7
    },
    {
      id: "ai-3",
      name: "Machine Learning Algorithm Notes",
      category: "Notes",
      price: 250,
      branch: "Artificial Intelligence and Data Science",
      semester: 4,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=ML+Notes",
      rating: 4.8
    },
    {
      id: "ai-4",
      name: "Computer Vision Project Kit",
      category: "Project Materials",
      price: 1800,
      branch: "Artificial Intelligence and Data Science",
      semester: 6,
      imageUrl: "https://placehold.co/300x300/f59e0b/ffffff?text=CV+Kit",
      rating: 4.5
    },
    {
      id: "ai-5",
      name: "Neural Networks Study Guide",
      category: "Study Guides",
      price: 280,
      branch: "Artificial Intelligence and Data Science",
      semester: 7,
      imageUrl: "https://placehold.co/300x400/8b5cf6/ffffff?text=Neural+Networks",
      rating: 4.6
    }
  ],
  "Computer Science and Engineering (Data Science)": [
    {
      id: "cs-ds-1",
      name: "Data Mining Techniques by Han",
      category: "Textbooks",
      price: 395,
      branch: "Computer Science and Engineering (Data Science)",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=Data+Mining",
      rating: 4.7
    },
    {
      id: "cs-ds-2",
      name: "Statistical Computing Notes",
      category: "Notes",
      price: 230,
      branch: "Computer Science and Engineering (Data Science)",
      semester: 4,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=Statistics",
      rating: 4.5
    },
    {
      id: "cs-ds-3",
      name: "Kaggle Competition Guide",
      category: "Study Guides",
      price: 180,
      branch: "Computer Science and Engineering (Data Science)",
      semester: 6,
      imageUrl: "https://placehold.co/300x400/8b5cf6/ffffff?text=Kaggle",
      rating: 4.8
    },
    {
      id: "cs-ds-4",
      name: "Big Data Tools Setup",
      category: "Programming Tools",
      price: 320,
      branch: "Computer Science and Engineering (Data Science)",
      semester: 7,
      imageUrl: "https://placehold.co/300x300/3b82f6/ffffff?text=Big+Data",
      rating: 4.4
    }
  ],
  "Electronics and Telecommunication Engineering (VLSI)": [
    {
      id: "etc-vlsi-1",
      name: "VLSI Design by Weste and Harris",
      category: "Textbooks",
      price: 430,
      branch: "Electronics and Telecommunication Engineering (VLSI)",
      semester: 5,
      imageUrl: "https://placehold.co/300x400/6366f1/ffffff?text=VLSI+Design",
      rating: 4.8
    },
    {
      id: "etc-vlsi-2",
      name: "FPGA Development Kit",
      category: "Lab Equipment",
      price: 4500,
      branch: "Electronics and Telecommunication Engineering (VLSI)",
      semester: 6,
      imageUrl: "https://placehold.co/300x300/f59e0b/ffffff?text=FPGA+Kit",
      rating: 4.7
    },
    {
      id: "etc-vlsi-3",
      name: "Verilog HDL Notes",
      category: "Notes",
      price: 240,
      branch: "Electronics and Telecommunication Engineering (VLSI)",
      semester: 4,
      imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=Verilog",
      rating: 4.6
    },
    {
      id: "etc-vlsi-4",
      name: "Chip Design Project Materials",
      category: "Project Materials",
      price: 1250,
      branch: "Electronics and Telecommunication Engineering (VLSI)",
      semester: 7,
      imageUrl: "https://placehold.co/300x300/3b82f6/ffffff?text=Chip+Design",
      rating: 4.5
    }
  ]
};

// General mock products array
const mockProducts = [
  { 
    id: 1, 
    name: 'Intro to Psychology Textbook', 
    price: 4499.00, 
    category: 'Textbooks', 
    imageUrl: 'https://placehold.co/600x800/a2d2ff/ffffff?text=Psych+101',
    gallery: ['https://placehold.co/600x800/a2d2ff/ffffff?text=Psych+101', 'https://placehold.co/600x800/a2d2ff/ffffff?text=Cover', 'https://placehold.co/600x800/a2d2ff/ffffff?text=Index'],
    rating: 4.5, reviewCount: 18, isPrime: true,
    description: "A comprehensive introductory textbook for Psychology 101. This 5th edition covers all major concepts from social psychology to neuroscience. Perfect for any student starting their psychology journey. The book is in excellent condition with minimal highlighting.",
    highlights: ["Latest Edition", "Covers Core Concepts", "Great Condition"],
    specs: { "Condition": "Used - Like New", "Author": "Dr. Jane Doe", "Publisher": "College Press", "Year": "2022" },
    reviews: [{ author: 'Sarah J.', rating: 5, comment: "This book was a lifesaver! Super easy to understand.", image: 'https://placehold.co/200x150/e0e0e0/000000?text=Review+Image' }, { author: 'Mike R.', rating: 4, comment: "Good condition, but had a few highlighted pages." }],
    frequentlyBoughtTogether: [2, 3], branch: 'CSE', semester: 3, isRentable: true, isExchangeable: true,
    sellerInfo: { name: 'Rohan S.', rating: 4.8 },
    communityQA: [{ id: 1, question: "Is this book useful for the KTU syllabus?", author: "Priya", answers: [{ text: "Yes, it covers almost 90% of the topics perfectly!", author: "Rohan S." }] }]
  },
  // ... Add more mock products here if needed
];

// Add these items to the mockProducts array or create additional products
const additionalProducts = [
  {
    id: "we-labcoat",
    name: "Workshop Labcoat (Blue)",
    category: "Workshop Equipment",
    price: 450,
    branch: "Mechanical Engineering", // Most relevant branch, but could be used in multiple
    semester: "All",
    description: "High-quality cotton labcoat for workshop safety. Machine washable and durable.",
    imageUrl: "https://placehold.co/300x400/3b82f6/ffffff?text=Labcoat",
    rating: 4.6,
    highlights: ["Flame resistant", "Multiple pockets", "College emblem"],
    reviewCount: 38
  },
  {
    id: "calc-fx991es",
    name: "Casio FX-991ES-Plus Scientific Calculator",
    category: "Calculators",
    price: 800,
    branch: "All Branches",
    semester: "All",
    description: "Advanced scientific calculator with natural display. Essential for engineering students.",
    imageUrl: "https://placehold.co/300x400/f59e0b/ffffff?text=FX-991ES-Plus",
    rating: 4.9,
    highlights: ["240+ functions", "Natural display", "Equation solver"],
    reviewCount: 125
  },
  {
    id: "calc-fx991cw",
    name: "Casio FX-991CW Scientific Calculator",
    category: "Calculators",
    price: 1000,
    branch: "All Branches",
    semester: "All",
    description: "Premium scientific calculator with ClassWiz features. High-resolution LCD display and advanced functions.",
    imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=FX-991CW",
    rating: 4.8,
    highlights: ["Spreadsheet function", "4x4 matrix calculations", "High-resolution display"],
    reviewCount: 87
  }
];

// Engineering drawing equipment for stationery category
const engineeringDrawingItems = [
  {
    id: "draw-roller-scale",
    name: "Engineering Rotary Scale Ruler",
    category: "Stationery",
    price: 280,
    branch: "All Branches",
    semester: "All",
    description: "Professional quality rotary scale ruler with multiple scale ratios. Easy to use roller mechanism for quick measurements.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Roller+Scale",
    rating: 4.7,
    highlights: ["Multiple scales: 1:1, 1:2, 1:5, 1:10, 1:20, 1:50, 1:100", "Precision engineered", "Durable construction"],
    reviewCount: 42
  },
  {
    id: "draw-board",
    name: "A3 Drawing Board with Parallel Bar",
    category: "Stationery",
    price: 1200,
    branch: "All Branches",
    semester: "All",
    description: "Professional engineering drawing board with smooth surface and precision parallel motion bar. Perfect for technical drawings and drafting work.",
    imageUrl: "https://placehold.co/300x400/06b6d4/ffffff?text=Drawing+Board",
    rating: 4.6,
    highlights: ["A3 Size (420 × 297 mm)", "Smooth drawing surface", "Adjustable angle"],
    reviewCount: 29
  },
  {
    id: "draw-mini-drafter",
    name: "Mini Drafter for Drawing Board",
    category: "Stationery",
    price: 850,
    branch: "Civil Engineering",
    semester: "2",
    description: "Precision mini drafter that attaches to drawing boards. Allows for accurate parallel and angular lines without a T-square.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Mini+Drafter",
    rating: 4.8,
    highlights: ["Precision angle adjustment", "Smooth operation", "Durable construction"],
    reviewCount: 18
  },
  {
    id: "draw-compass-set",
    name: "Professional Compass Set with Extension Bar",
    category: "Stationery",
    price: 550,
    branch: "All Branches",
    semester: "1",
    description: "High-quality 9-piece engineering compass set for precise technical drawings. Includes compass, dividers, extensions and lead refills.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Compass+Set",
    rating: 4.9,
    highlights: ["9-piece set", "Hardened steel tips", "Precision joints"],
    reviewCount: 65
  },
  {
    id: "draw-set-squares",
    name: "Set Square Combo (30°-60° and 45°)",
    category: "Stationery",
    price: 140,
    branch: "All Branches",
    semester: "1",
    description: "Transparent set squares with beveled edges for accurate technical drawing. Includes both 30°-60° and 45° set squares.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Set+Squares",
    rating: 4.5,
    highlights: ["Clear acrylic material", "Beveled edges", "Accurate angles"],
    reviewCount: 92
  },
  {
    id: "draw-french-curves",
    name: "French Curve Set (Set of 3)",
    category: "Stationery",
    price: 190,
    branch: "Civil Engineering",
    semester: "2",
    description: "Set of 3 transparent French curves for drawing smooth non-circular curves in engineering and architectural drawings.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=French+Curves",
    rating: 4.3,
    highlights: ["3 different curve templates", "Clear acrylic", "Ink compatible edges"],
    reviewCount: 24
  },
  {
    id: "draw-pencils",
    name: "Technical Drawing Pencil Set (12 Grades)",
    category: "Stationery",
    price: 320,
    branch: "All Branches",
    semester: "All",
    description: "Complete set of technical drawing pencils ranging from 6H to 6B. Perfect for engineering drawings with varying line weights.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Drawing+Pencils",
    rating: 4.7,
    highlights: ["12 pencil grades", "Pre-sharpened", "Wooden casing"],
    reviewCount: 78
  },
  {
    id: "draw-templates",
    name: "Engineering Drawing Templates Set",
    category: "Stationery",
    price: 260,
    branch: "Mechanical Engineering",
    semester: "3",
    description: "Set of 5 templates including circles, ellipses, squares, triangles and general symbols for engineering drawings.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Templates",
    rating: 4.5,
    highlights: ["5 template sheets", "Durable plastic", "Common engineering symbols"],
    reviewCount: 31
  },
  {
    id: "draw-protractor",
    name: "360° Circular Protractor",
    category: "Stationery",
    price: 120,
    branch: "All Branches",
    semester: "1",
    description: "Full circle transparent protractor for measuring and drawing angles. Features clear markings for precise angle measurement.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Protractor",
    rating: 4.6,
    highlights: ["Full 360° scale", "Clear markings", "Center finding edges"],
    reviewCount: 47
  },
  {
    id: "draw-papers",
    name: "A2 Drawing Sheets (100 GSM, 20 sheets)",
    category: "Stationery",
    price: 220,
    branch: "All Branches",
    semester: "All",
    description: "High-quality drawing paper for engineering drawings. Smooth surface ideal for pencil and ink drawings.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Drawing+Sheets",
    rating: 4.8,
    highlights: ["100 GSM thickness", "20 sheets per pack", "Acid-free paper"],
    reviewCount: 53
  },
  {
    id: "draw-eraser-shield",
    name: "Stainless Steel Eraser Shield",
    category: "Stationery",
    price: 80,
    branch: "All Branches",
    semester: "1",
    description: "Precision eraser shield with multiple openings for detailed erasing in tight spaces. Essential for technical drawing.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Eraser+Shield",
    rating: 4.4,
    highlights: ["Stainless steel construction", "Multiple shapes", "Thin edges"],
    reviewCount: 19
  },
  {
    id: "draw-t-square",
    name: "Transparent T-Square (24 inch)",
    category: "Stationery",
    price: 240,
    branch: "All Branches",
    semester: "1",
    description: "Professional grade transparent T-square for technical drawing. Features a clear blade with precise measurements.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=T-Square",
    rating: 4.6,
    highlights: ["24 inch length", "Transparent acrylic", "Beveled drawing edge"],
    reviewCount: 37
  }
];

// Add Prime exclusive flag to some products
const primeExclusiveProducts = [
  {
    id: "prime-ex-1",
    name: "Graphing Calculator - Advanced Model",
    category: "Calculators",
    price: 2500,
    branch: "All Branches",
    semester: "All",
    description: "Professional graphing calculator with 3D visualization capabilities and programmable functions.",
    imageUrl: "https://placehold.co/300x400/f59e0b/ffffff?text=Advanced+Calculator",
    rating: 5.0,
    reviewCount: 18,
    isPrimeExclusive: true
  },
  {
    id: "prime-ex-2",
    name: "Complete Engineering Drawing Toolkit",
    category: "Stationery",
    price: 3800,
    branch: "All Branches",
    semester: "1",
    description: "Professional-grade complete engineering drawing kit with premium instruments and carrying case.",
    imageUrl: "https://placehold.co/300x300/06b6d4/ffffff?text=Premium+Kit",
    rating: 4.9,
    reviewCount: 23,
    isPrimeExclusive: true
  },
  {
    id: "prime-ex-3",
    name: "Last 10 Years Question Bank - All Subjects",
    category: "Notes",
    price: 1200,
    branch: "All Branches",
    semester: "All",
    description: "Comprehensive collection of previous 10 years' exam questions with solutions for all engineering subjects.",
    imageUrl: "https://placehold.co/300x400/10b981/ffffff?text=Question+Bank",
    rating: 4.8,
    reviewCount: 45,
    isPrimeExclusive: true
  }
];

// Add more Prime exclusive products in a dedicated category
const primeExclusiveSpecialProducts = [
  {
    id: "prime-premium-1",
    name: "Engineering Complete Reference Set",
    category: "Prime Exclusive",
    price: 5800,
    branch: "All Branches",
    semester: "All",
    description: "Comprehensive reference collection covering all major engineering subjects. Premium bound editions with supplementary online access.",
    imageUrl: "https://placehold.co/300x400/fcd34d/ffffff?text=Premium+Set",
    rating: 5.0,
    reviewCount: 42,
    isPrimeExclusive: true
  },
  {
    id: "prime-premium-2",
    name: "Professional Engineering Software Bundle",
    category: "Prime Exclusive",
    price: 3500,
    branch: "All Branches",
    semester: "All",
    description: "Student-licensed bundle of essential engineering software including CAD, simulation tools, and data analysis packages.",
    imageUrl: "https://placehold.co/300x300/fcd34d/ffffff?text=Software+Bundle",
    rating: 4.9,
    reviewCount: 38,
    isPrimeExclusive: true
  },
  {
    id: "prime-premium-3",
    name: "Final Year Project Kit - Advanced",
    category: "Prime Exclusive",
    price: 7800,
    branch: "All Branches",
    semester: "7",
    description: "Premium kit for final year engineering projects with advanced components, sensors, and development boards.",
    imageUrl: "https://placehold.co/300x300/fcd34d/ffffff?text=Project+Kit",
    rating: 4.8,
    reviewCount: 24,
    isPrimeExclusive: true
  },
  {
    id: "prime-premium-4",
    name: "Previous 15 Years Solved Question Papers",
    category: "Prime Exclusive",
    price: 2200,
    branch: "All Branches",
    semester: "All",
    description: "Comprehensive collection of previous 15 years university exam questions with detailed solutions and exam strategies.",
    imageUrl: "https://placehold.co/300x400/fcd34d/ffffff?text=Question+Papers",
    rating: 5.0,
    reviewCount: 57,
    isPrimeExclusive: true
  },
  {
    id: "prime-premium-5",
    name: "Engineering Study Planner - Premium Edition",
    category: "Prime Exclusive",
    price: 950,
    branch: "All Branches",
    semester: "All",
    description: "Advanced study planner with custom templates for engineering students, includes digital planning app access.",
    imageUrl: "https://placehold.co/300x400/fcd34d/ffffff?text=Study+Planner",
    rating: 4.7,
    reviewCount: 31,
    isPrimeExclusive: true
  },
  {
    id: "prime-premium-6",
    name: "Drawing Board Pro with Digital Angle System",
    category: "Prime Exclusive",
    price: 3800,
    branch: "All Branches",
    semester: "All",
    description: "Professional-grade drawing board with integrated digital angle measurement and parallel motion system.",
    imageUrl: "https://placehold.co/300x300/fcd34d/ffffff?text=Pro+Drawing+Board",
    rating: 4.9,
    reviewCount: 18,
    isPrimeExclusive: true
  }
];

// Create the Prime membership product
const primeMembershipProduct = {
  id: "prime-membership",
  name: "MyCollegeMart Prime Membership",
  price: 299,
  description: "Annual subscription for exclusive benefits and features.",
  imageUrl: "https://placehold.co/300x300/f59e0b/ffffff?text=Prime",
  category: "Membership",
  isPrime: true
};

// Update the getProducts function to include all products
mockFirebase.firestore.getProducts = async () => {
  // Combine all products including the new additions
  const allProducts = [
    ...mockProducts,
    ...additionalProducts,
    ...engineeringDrawingItems,
    ...Object.values(branchSpecificProducts).flat(),
    ...primeExclusiveProducts,
    ...primeExclusiveSpecialProducts,
    primeMembershipProduct
  ];
  
  return allProducts;
};

// Update any other places in the mock data that reference branches
mockFirebase.firestore.getProductsByBranch = async (branch) => {
  if (branch === 'All Branches') {
    return mockFirebase.firestore.getProducts();
  }
  return (await mockFirebase.firestore.getProducts()).filter(product => 
    product.branch === branch || product.branch === 'Any'
  );
};

import { ServiceItem, EducationalModule } from '@/types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'aeration',
    name: 'Aeration & Overseeding',
    tag: 'Spring & Fall',
    description: 'Relieves soil compaction and introduces drought-tolerant grass varieties.',
    image: '/images/service_fertilizing.jpg',
    iconName: 'Droplets',
    priceStartingAt: 79,
    season: 'spring',
    details: {
      overview: 'Core aeration pulls 2–3 inch soil plugs across your lawn to break up dense Central Alberta clay soil, allowing water, oxygen, and root nutrients to penetrate deep.',
      whatIsIncluded: [
        'Commercial hollow-tine core aeration with 20–40 holes per sq. ft.',
        'High-germination certified Kentucky Bluegrass & Fescue overseed blend',
        'Starter root fertilizer booster application',
        'Flagging around underground sprinkler heads and utility markers',
      ],
      idealTiming: 'Best executed in May or September when ground temperatures support rapid root germination.',
      faq: [
        {
          q: 'Do I need to rake up the aerator soil cores?',
          a: 'No! The soil plugs break down naturally within 1–2 weeks, returning vital microorganisms and nutrients back into your turf.',
        },
        {
          q: 'Should I water before you arrive?',
          a: 'Yes, watering your lawn 24 hours prior allows the aerator tines to pull deeper, more effective cores.',
        },
      ],
    },
  },
  {
    id: 'power-raking',
    name: 'Power Raking',
    tag: 'Spring Service',
    description: 'Clears out thatch buildup so your lawn can breathe and grow thicker.',
    image: '/images/service_power_raking.jpg',
    iconName: 'Sparkles',
    priceStartingAt: 89,
    season: 'spring',
    details: {
      overview: 'Power raking removes dead grass, moss, and suffocating thatch accumulated under Alberta snowpack, creating room for thick, lush new spring shoots.',
      whatIsIncluded: [
        'Mechanical flail dethatching machine pass across entire turf area',
        'Hand raking and detailed bagging of all collected thatch debris',
        'First high-lift rotary mowing cut and crisp border trim',
        'Leaf blower cleanup of all driveways, patios, and sidewalks',
      ],
      idealTiming: 'Early to mid-spring once snow melts and the soil surface dries enough to avoid tearing root crowns.',
      faq: [
        {
          q: 'Will power raking damage my lawn?',
          a: 'Not when done professionally! We calibrate our flail blades to lift dead thatch without cutting into healthy root crowns.',
        },
      ],
    },
  },
  {
    id: 'fertilizing',
    name: 'Fertilizing',
    tag: 'Seasonal',
    description: 'Seasonal treatments timed to Central Alberta\'s growing conditions.',
    image: '/images/service_fertilizing.jpg',
    iconName: 'Sprout',
    priceStartingAt: 65,
    season: 'year-round',
    details: {
      overview: 'Customized granular slow-release micro-nutrient programs formulated specifically for Central Alberta\'s short growing season and alkaline soils.',
      whatIsIncluded: [
        'Slow-release poly-coated nitrogen and potassium balanced feed',
        'Targeted broadleaf weed control application for dandelions & clover',
        'Iron enhancement for deep emerald color without rapid surge growth',
        'Granular blower cleanup off all hard surfaces to prevent staining',
      ],
      idealTiming: '4-stage schedule: Early Spring wakeup, Early Summer vigor, Late Summer booster, and Fall Winterizer.',
      faq: [
        {
          q: 'Are your fertilizers safe for pets and children?',
          a: 'Yes! We use pet-conscious granular nutrients. We recommend letting the yard dry for 1–2 hours after any liquid weed-control spray.',
        },
      ],
    },
  },
  {
    id: 'landscaping',
    name: 'Landscaping',
    tag: 'Custom Projects',
    description: 'From flower beds to full yard transformations, built to last.',
    image: '/images/service_landscaping.jpg',
    iconName: 'Trees',
    priceStartingAt: 299,
    season: 'summer',
    details: {
      overview: 'Expert hardscaping and softscaping tailored to Central Alberta climates: stone patios, heavy-duty commercial edging, decorative mulch, and hardy prairie perennials.',
      whatIsIncluded: [
        '3D landscape consultation and yard scale plan',
        'Professional grade weed barrier fabric and premium cedar/bark mulch',
        'Concrete paver pathways, stone retaining walls, and rock gardens',
        'Shrub pruning, hedge sculpting, and perennial flower bed installations',
      ],
      idealTiming: 'Late May through October. Booking early spring guarantees prime summer build slots.',
      faq: [
        {
          q: 'Do you provide on-site estimates?',
          a: 'Yes! We visit your property in Red Deer or Sylvan Lake, take laser measurements, and deliver a transparent fixed-price proposal.',
        },
      ],
    },
  },
  {
    id: 'snow-removal',
    name: 'Snow Removal',
    tag: 'Winter / Commercial Avail',
    description: 'Reliable, on-time clearing for driveways, walkways, and commercial parking.',
    image: '/images/service_snow_removal.jpg',
    iconName: 'Snowflake',
    priceStartingAt: 149,
    season: 'winter',
    details: {
      overview: 'Contract and on-demand snow removal with guaranteed 24-hour clearing triggers after snow events. Serving driveways, walkways, and commercial lots.',
      whatIsIncluded: [
        'Guaranteed clearance within 12–24 hours of snow accumulation ending',
        'Sidewalk edge-to-edge clearing and driveway perimeter clearing',
        'Pet-friendly ice melt application on high-traffic steps and walks',
        'Automated dispatch alerts and completion photo verification',
      ],
      idealTiming: 'November through April unlimited monthly contract passes or per-push plans.',
      faq: [
        {
          q: 'What snowfall depth triggers a clearing visit?',
          a: 'Our standard residential trigger is 2.5 cm (1 inch) of fresh snow accumulation.',
        },
      ],
    },
  },
  {
    id: 'weekly-mowing',
    name: 'Weekly Mowing & Trimming',
    tag: 'Summer Recurring',
    description: 'Weekly precision mowing, edge trimming, and cleanup for vibrant lawns.',
    image: '/images/about_lawn_mower.jpg',
    iconName: 'Scissors',
    priceStartingAt: 45,
    season: 'summer',
    details: {
      overview: 'Consistent weekly lawn mowing by experienced technicians using razor-sharp commercial mulching blades for razor-clean stripes.',
      whatIsIncluded: [
        'Even cut calibrated to 2.5–3.25 inches for optimal grass health',
        'String line trimming around all fence lines, trees, and obstacles',
        'Power-edging along concrete walkways and curbs',
        'High-velocity air blow down of clippings from all hard surfaces',
      ],
      idealTiming: 'May to October, with weekly or bi-weekly automated schedules.',
      faq: [
        {
          q: 'Do I have to be home during mowing?',
          a: 'No! As long as gates are unlocked and pets are inside, our crew handles the full visit and sends an instant completion email.',
        },
      ],
    },
  },
];

export const EDUCATIONAL_CURRICULUM: EducationalModule[] = [
  {
    id: 'mod-1-foundations',
    level: 'Beginner',
    title: '1. Foundations: JSX, Component Tree & Props Architecture',
    description: 'Understand how React transforms declarative JSX into dynamic DOM elements, and how data cascades downward through typed Props.',
    concepts: [
      'JSX syntax: JavaScript XML and compilation to React.createElement',
      'The unidirectional data flow principle (parent to child props)',
      'TypeScript interface design for component props contracts',
      'Composition vs inheritance: building reusable UI atomic blocks',
    ],
    appliedInComponent: 'Navbar.tsx, Partners.tsx & Hero.tsx',
    codeSnippet: `// 1. Defining the Contract with TypeScript
interface HeroBadgeProps {
  rating: number;
  reviewsCount: string;
  source: 'Google' | 'Facebook';
}

// 2. Functional Component with Destructuring
export function HeroBadge({ rating, reviewsCount }: HeroBadgeProps) {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
      <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
      <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
      <span className="text-xs text-white/80">({reviewsCount} reviews)</span>
    </div>
  );
}`,
    deepDiveExplanation: 'In our LawnBuster application, the top navigation and hero section illustrate clean separation of concerns. Notice how the hero does not fetch its own reviews; instead, data flows via props or typed constants. This makes the UI completely testable and resilient to network states.',
    quiz: {
      question: 'Why does React enforce unidirectional (one-way) data flow through props?',
      options: [
        'To speed up CSS styling calculations in the browser',
        'To make state changes predictable and trace where data originates',
        'Because JavaScript functions cannot accept arguments',
        'To force developers to use Redux for everything',
      ],
      correctIndex: 1,
      explanation: 'Unidirectional data flow ensures that state mutations have a single source of truth, making it easy to reason about data updates and debug UI states.',
    },
  },
  {
    id: 'mod-2-state-events',
    level: 'Beginner',
    title: '2. Interactivity: useState, Controlled Forms & Synthetic Events',
    description: 'Master local component memory using useState, handling synthetic click and change events, and creating controlled form inputs.',
    concepts: [
      'Local state mechanics: why standard variables fail to trigger re-renders',
      'Immutability: updating arrays and objects without direct mutations',
      'Controlled vs uncontrolled inputs in the Quote Calculator',
      'Derived state: calculating estimates on the fly without extra state',
    ],
    appliedInComponent: 'QuoteModal.tsx & InstantEstimator.tsx',
    codeSnippet: `// ❌ JUNIOR MISTAKE: Mutating state directly
// state.services.push('mowing'); setServices(state.services);

// ✅ SENIOR PATTERN: Pure immutable update with functional state
const toggleService = (serviceId: string) => {
  setSelectedServices((prev) =>
    prev.includes(serviceId)
      ? prev.filter((id) => id !== serviceId) // remove
      : [...prev, serviceId]                   // add
  );
};

// DERIVED STATE: No redundant useState needed for total!
const estimatedTotal = useMemo(() => {
  return selectedServices.reduce((sum, id) => sum + RATES[id], BASE_FEE);
}, [selectedServices]);`,
    deepDiveExplanation: 'In the LawnBuster Quote Modal, the instant price calculation uses "Derived State". Beginners often create a state variable `const [total, setTotal] = useState(0)` and update it in multiple `useEffect` hooks. A senior engineer calculates the total synchronously during render (or via `useMemo`), preventing synchronization bugs and unnecessary re-render cycles.',
    quiz: {
      question: 'What is "Derived State" in React?',
      options: [
        'State stored inside the browser localStorage',
        'A value calculated directly from existing props or state during render, without its own useState',
        'State that can only be accessed by child components',
        'A deprecated feature replaced by React hooks',
      ],
      correctIndex: 1,
      explanation: 'Derived state is computed directly from existing state or props during render. Storing it in another state variable leads to redundant re-renders and synchronization bugs.',
    },
  },
  {
    id: 'mod-3-lifecycle-effects',
    level: 'Intermediate',
    title: '3. Lifecycle & Side Effects: useEffect, Timers & DOM Cleanup',
    description: 'Understand how React synchronizes components with external systems like timers, browser APIs, and scroll observers.',
    concepts: [
      'The React Render Cycle: Commit vs Paint phases',
      'The Dependency Array contract: primitives, objects, and function references',
      'Cleanup functions: preventing memory leaks in intervals and event listeners',
      'Avoiding infinite effect loops and excessive synchronization',
    ],
    appliedInComponent: 'ProcessSection.tsx (Schedule Tracker) & Carousel.tsx',
    codeSnippet: `useEffect(() => {
  // 1. Setup subscription or interval
  const intervalId = setInterval(() => {
    setGpsProgress((prev) => (prev >= 100 ? 0 : prev + 2));
  }, 120);

  // 2. CRITICAL: Cleanup function runs when unmounting or before re-running!
  return () => {
    clearInterval(intervalId);
  };
}, []); // Empty dependency array means: run once on mount`,
    deepDiveExplanation: 'Step 02 in our Process section showcases a live GPS Service Tracker. The simulation runs an interval that advances technician coordinates. Without the returned cleanup function `clearInterval(intervalId)`, unmounting the card or navigating away would cause a severe memory leak and ghost state updates on unmounted components.',
    quiz: {
      question: 'When does the cleanup function returned inside a useEffect execute?',
      options: [
        'Only when the computer runs out of RAM',
        'Before the component unmounts, and before the effect re-runs when dependencies change',
        'Immediately before the JSX renders to the screen',
        'Every time the parent component receives new CSS styles',
      ],
      correctIndex: 1,
      explanation: 'React runs the cleanup function to tear down old subscriptions/timers before applying the new effect or when the component unmounts from the DOM.',
    },
  },
  {
    id: 'mod-4-custom-hooks',
    level: 'Intermediate',
    title: '4. Reusability: Custom Hooks & Separation of Logic',
    description: 'Extract business logic, animations, and state machines out of UI components into clean, testable Custom Hooks.',
    concepts: [
      'The "use" naming convention and rules of hooks',
      'Encapsulating complex multi-step wizards and calculators',
      'Returning stable tuple vs object APIs for developer ergonomics',
      'Decoupling headless business logic from presentation markup',
    ],
    appliedInComponent: 'hooks/useQuoteEstimator.ts & hooks/useScheduleTracker.ts',
    codeSnippet: `// Custom Hook: Headless logic decoupled from UI styling
export function useQuoteEstimator(initialLot = 'standard') {
  const [lotSize, setLotSize] = useState(initialLot);
  const [services, setServices] = useState<string[]>(['mowing']);

  const basePrice = LOT_MULTIPLIERS[lotSize] || 50;
  const subtotal = services.reduce((acc, s) => acc + (SERVICE_PRICING[s] || 0), basePrice);
  const tax = subtotal * 0.05; // 5% Alberta GST
  const total = subtotal + tax;

  return { lotSize, setLotSize, services, setServices, subtotal, tax, total };
}`,
    deepDiveExplanation: 'Notice how the hook contains zero HTML or Tailwind classes. It only manages numbers, math, and state. Any component — the Hero Quick Estimate pill, the Full Quote Modal, or a mobile bottom sheet — can consume this exact hook without duplicating pricing formulas.',
    quiz: {
      question: 'What is the primary benefit of custom hooks in React?',
      options: [
        'They automatically compile TypeScript into WebAssembly',
        'They allow you to extract and reuse stateful logic across multiple components without altering their UI hierarchy',
        'They replace the need for CSS Tailwind classes',
        'They force all child components to re-render in parallel',
      ],
      correctIndex: 1,
      explanation: 'Custom hooks allow you to package stateful logic (state, effects, calculations) into reusable, testable functions that multiple components can consume.',
    },
  },
  {
    id: 'mod-5-advanced-perf',
    level: 'Advanced',
    title: '5. Performance: useMemo, useCallback & React 19 Compiler Era',
    description: 'Learn when to memoize expensive computations, stabilize function references, and understand how modern React optimizes rendering.',
    concepts: [
      'Referential equality in JavaScript (`{} !== {}` and `() => {} !== () => {}`)',
      'When useMemo is justified vs when it adds needless overhead',
      'Stabilizing callbacks passed to memoized children with useCallback',
      'Framer Motion GPU compositing vs layout thrashing',
    ],
    appliedInComponent: 'ServicesSection.tsx & QuoteModal.tsx',
    codeSnippet: `// Memoizing expensive service filtering
const seasonalServices = useMemo(() => {
  return SERVICES_DATA.filter((service) => {
    return activeSeason === 'all' || service.season === activeSeason;
  });
}, [activeSeason]); // Only recalculates when activeSeason changes!

// Stabilizing callback reference
const handleSelect = useCallback((serviceId: string) => {
  trackAnalytics('service_clicked', serviceId);
  setActiveServiceId(serviceId);
}, []);`,
    deepDiveExplanation: 'In our LawnBuster Services carousel, when users filter or scroll, we ensure that individual service cards do not re-calculate complex data transforms on every parent scroll event. We also leverage GPU transforms (`transform: translateX`) via `motion/react` rather than animating `left` or `margin`.',
    quiz: {
      question: 'Why would passing an inline arrow function `<Button onClick={() => doSomething()} />` potentially cause child re-renders?',
      options: [
        'Because JavaScript throws a syntax error on inline functions',
        'Because a brand new function reference in memory is created on every render, failing shallow equality checks',
        'Because inline functions take 10 seconds to compile',
        'Because React does not allow anonymous functions',
      ],
      correctIndex: 1,
      explanation: 'In JavaScript, functions are objects. An inline function creates a new memory reference on every parent render. If the child is wrapped in React.memo, it sees a "different" prop and re-renders.',
    },
  },
  {
    id: 'mod-6-architecture',
    level: 'Architect',
    title: '6. Production Architecture: Next.js 15 App Router & Server/Client Boundary',
    description: 'Design enterprise-scale web applications with clean boundaries between Server Components and interactive Client Components.',
    concepts: [
      'Server Components by default: zero JavaScript bundle size for static layouts',
      'The "use client" directive boundary: pushing interactivity to leaf nodes',
      'Security boundary: keeping API keys and sensitive logic server-side',
      'Accessible UI engineering (WCAG AA, focus-visible, semantic HTML)',
    ],
    appliedInComponent: 'app/layout.tsx & app/page.tsx',
    codeSnippet: `// 📁 Architecture Tree Pattern
// app/page.tsx (Server Component - fetches static metadata & SEO)
//   └── components/LawnBusterApp.tsx ('use client' - root client coordinator)
//         ├── components/Navbar.tsx
//         ├── components/Hero.tsx
//         ├── components/ServicesSection.tsx
//         ├── components/ProcessSection.tsx
//         └── components/ReactEducatorPanel.tsx (Floating Dev Learning Companion)`,
    deepDiveExplanation: 'By keeping layout and SEO metadata server-rendered in Next.js 15, search engines and social platforms receive instant HTML with zero hydration lag. Interactive elements like the Free Quote modal, service slider, and React Masterclass inspector are encapsulated client islands.',
    quiz: {
      question: 'In Next.js App Router, where should you place the \'use client\' directive?',
      options: [
        'At the bottom of every single file in the project',
        'Only at the top of component files that require React hooks, browser events, or client-only APIs',
        'In the package.json scripts section',
        'Inside your .env.example file',
      ],
      correctIndex: 1,
      explanation: '\'use client\' designates the boundary where server-side rendering hands off to client-side hydration. It should only be placed on components that need browser interactivity or React hooks.',
    },
  },
];

import { CurriculumPhase } from '@/types/curriculum';

export const PROGRESSIVE_CURRICULUM: CurriculumPhase[] = [
  {
    id: 'phase-1-beginner',
    phaseNumber: 1,
    title: 'Phase 1: Beginner (Foundations)',
    badge: 'Foundations',
    description: 'Master the mental model of React: from raw JavaScript XML (JSX) and functional component architecture, to reactive state, synthetic events, and dynamic lists.',
    targetAudience: 'Engineers starting React or transitioning from vanilla HTML/JS/jQuery',
    modules: [
      {
        id: 'p1-m1-jsx',
        title: '1. JSX Syntax, Expressions & Rules',
        slug: 'jsx-syntax-expressions',
        estimatedMinutes: 20,
        theory: {
          summary: 'JSX is a syntax extension for JavaScript that looks like HTML. It gets compiled into standard React.createElement calls by Babel/SWC. Understanding its grammatical rules is the first fundamental step in becoming a proficient React engineer.',
          corePrinciples: [
            {
              headline: 'Rule 1: Return a Single Root Element',
              body: 'A component must return a single JSX element tree. If you need adjacent elements, wrap them in a React Fragment (<>...</>) without injecting unnecessary wrapper <div> elements into the DOM tree.',
              pitfall: 'Returning <h1>Title</h1><p>Body</p> directly without a Fragment causes a syntax error because JavaScript functions cannot return two values simultaneously.',
            },
            {
              headline: 'Rule 2: Close All Tags Explicitly',
              body: 'In HTML, tags like <img> or <input> can be self-closing without a slash. In JSX, all tags must be strictly closed (e.g., <img src="..." /> or <input />).',
              pitfall: 'Omitting the self-closing slash leads to an unclosed JSX tag compilation error.',
            },
            {
              headline: 'Rule 3: JavaScript Expressions Inside Curly Braces { }',
              body: 'Any valid JavaScript expression (variables, function calls, arithmetic, ternary operators, template strings) can be embedded inside JSX using single curly braces { expression }.',
              pitfall: 'Statements (like for loops or if statements) cannot be embedded directly in { }; only expressions that evaluate to a value are valid.',
            },
            {
              headline: 'Rule 4: camelCase Attribute Naming',
              body: 'Because JSX compiles to JavaScript objects, reserved JavaScript keywords cannot be used as attribute names. Use className instead of class, and htmlFor instead of for.',
              pitfall: 'Using class="card" triggers a React console warning: "Did you mean className?".',
            },
          ],
          codeExamples: [
            {
              title: 'Embedding Expressions in JSX',
              code: `const serviceName = "Power Raking";
const price = 89;
const isSpring = true;

// Valid JSX with expressions, templates & ternary operators
export function ServiceBadge() {
  return (
    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
      <h3 className="font-bold text-emerald-950">{serviceName.toUpperCase()}</h3>
      <p className="text-sm text-neutral-600">Starting at \${price} CAD</p>
      <span className={isSpring ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
        {isSpring ? "Available Now for Spring Cleanup" : "Waitlist for Summer"}
      </span>
    </div>
  );
}`,
              explanation: 'Curly braces {} turn on JavaScript execution inside the markup. Notice how strings are manipulated (.toUpperCase()), numbers are formatted, and conditional ternary values are injected.',
            },
            {
              title: 'Fragment: Preventing DOM Pollution',
              code: `// ❌ Bad: Redundant div wrapper pollutes flex/grid layouts
function BadGroup() {
  return (
    <div>
      <dt>Service:</dt>
      <dd>Core Aeration</dd>
    </div>
  );
}

// ✅ Good: Fragment renders directly into parent without extra node
function GoodGroup() {
  return (
    <>
      <dt className="font-semibold text-neutral-700">Service:</dt>
      <dd className="text-neutral-900">Core Aeration</dd>
    </>
  );
}`,
              explanation: '<>...</> is syntactic sugar for <React.Fragment>. It groups elements without adding redundant nodes to the browser DOM.',
            },
          ],
        },
        playground: {
          id: 'pg-jsx',
          title: 'JSX Interactive Sandbox',
          description: 'Experiment with embedding expressions, formatting numbers, applying dynamic class names, and toggling fragments.',
          type: 'jsx-expressions',
          initialState: {
            clientName: 'Sarah Jenkins',
            location: 'Sylvan Lake',
            service: 'Power Raking',
            baseFee: 89,
            hasSpringDiscount: true,
            discountPercent: 15,
          },
        },
        challenge: {
          id: 'ch-jsx-bugs',
          title: 'Challenge: Fix the 4 JSX Syntax Bugs',
          instructions: 'This component was written by an engineer transitioning from HTML. It contains 4 critical JSX syntax bugs: (1) a class attribute instead of className, (2) an unclosed image tag, (3) an invalid statement inside curly braces, and (4) multiple sibling root tags without a Fragment. Fix them so the test passes!',
          starterCode: `// ⚠️ Fix the 4 JSX bugs below:
export function BrokenLawnCard() {
  return (
    <div class="card p-4 bg-white rounded-xl shadow">
      <h3 className="font-bold">LawnBuster Spring Tuneup</h3>
      <img src="/images/service_power_raking.jpg" alt="Raking">
      <p className="text-xs text-neutral-600">
        Status: {if (true) { "Ready" }}
      </p>
    </div>
    <div className="footer text-xs text-neutral-400">
      Central Alberta Licensed & Insured
    </div>
  );
}`,
          solutionCode: `export function BrokenLawnCard() {
  return (
    <>
      <div className="card p-4 bg-white rounded-xl shadow">
        <h3 className="font-bold">LawnBuster Spring Tuneup</h3>
        <img src="/images/service_power_raking.jpg" alt="Raking" />
        <p className="text-xs text-neutral-600">
          Status: {true ? "Ready" : "Pending"}
        </p>
      </div>
      <div className="footer text-xs text-neutral-400">
        Central Alberta Licensed & Insured
      </div>
    </>
  );
}`,
          hints: [
            'Use <> and </> to wrap the two top-level <div> tags into a single root Fragment.',
            'Change class="card..." to className="card...".',
            'Make sure the <img> tag is self-closing: <img ... />.',
            'Replace the if statement inside curly braces with a ternary expression: {true ? "Ready" : "Pending"}.',
          ],
          explanation: 'In JSX, attributes must use camelCase (className), void elements must self-close (<img />), multiple roots require a Fragment (<>...</>), and expressions inside {} cannot be JavaScript control statements like if/else.',
          testCases: [
            {
              description: 'Must wrap adjacent elements in a React Fragment (<>...</>)',
              validate: (code) => ({
                passed: /<>\s*<div[\s\S]*<\/div>\s*<\/>/.test(code) || /<React\.Fragment>[\s\S]*<\/React\.Fragment>/.test(code),
                message: 'Code must return a single root element (wrap with <> and </>)',
              }),
            },
            {
              description: 'Must replace "class=" with "className="',
              validate: (code) => ({
                passed: !/\bclass=/i.test(code) && /className=/i.test(code),
                message: 'Replace class="..." with className="..."',
              }),
            },
            {
              description: 'Must self-close the <img> tag',
              validate: (code) => ({
                passed: /<img[^>]*\/>/.test(code),
                message: 'Self-close the <img> tag with a trailing slash: <img ... />',
              }),
            },
            {
              description: 'Must use a valid ternary or value instead of an "if" statement inside {}',
              validate: (code) => ({
                passed: !/\{\s*if\s*\(/.test(code),
                message: 'Do not use "if" inside curly braces; use a ternary condition or string variable',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'Hero.tsx',
          filePath: '/components/Hero.tsx',
          description: 'Notice how the Hero component uses JSX expressions to render the review stars, rating scores, and dynamic subtitle typography.',
        },
      },
      {
        id: 'p1-m2-components-props',
        title: '2. Components: Functional Units & Props Architecture',
        slug: 'components-props-architecture',
        estimatedMinutes: 25,
        theory: {
          summary: 'Components are the atomic building blocks of React interfaces. They accept an arbitrary input object called "Props" and return JSX describing what should appear on the screen. Props are read-only (immutable) and flow strictly unidirectionally from parent to child.',
          corePrinciples: [
            {
              headline: 'Principle 1: Pure Functions with Respect to Props',
              body: 'A React component must never mutate its props directly. If you modify props.title = "New", you break React\'s change-detection model and introduce subtle synchronization bugs.',
              pitfall: 'Attempting to reassign or mutate props inside a child component.',
            },
            {
              headline: 'Principle 2: TypeScript Props Contracts',
              body: 'Always declare an explicit TypeScript interface or type for every component\'s props. This provides autocomplete, self-documenting code, and compile-time type safety.',
              pitfall: 'Using any for props eliminates the compiler\'s ability to catch missing or misspelled props.',
            },
            {
              headline: 'Principle 3: Destructuring & Default Values',
              body: 'Destructure props directly in the function parameter list: ({ title, size = "md", children }: ButtonProps). This makes default fallbacks declarative and avoids verbose props.title repetition.',
              pitfall: 'Forgetting default values for optional props can lead to rendering undefined in the UI.',
            },
            {
              headline: 'Principle 4: The children Prop and Slot Pattern',
              body: 'The special children prop enables generic layout containment. It allows a card, modal, or layout component to accept arbitrary JSX nested inside its opening and closing tags.',
              pitfall: 'Creating multiple rigid custom props (content1, content2) instead of using the flexible children composition pattern.',
            },
          ],
          codeExamples: [
            {
              title: 'Typed Component with Destructured Props & Defaults',
              code: `import React from 'react';

// 1. Explicit TypeScript Props Contract
interface ServiceCardProps {
  title: string;
  price: number;
  badge?: string; // Optional prop
  variant?: 'primary' | 'secondary';
  onSelect: (title: string) => void;
  children: React.ReactNode; // Composition slot
}

// 2. Destructuring with Default Fallbacks
export function ServiceCard({
  title,
  price,
  badge = 'Standard',
  variant = 'primary',
  onSelect,
  children,
}: ServiceCardProps) {
  const isPrimary = variant === 'primary';

  return (
    <div className={\`p-5 rounded-2xl border \${isPrimary ? 'bg-white border-emerald-600 shadow-md' : 'bg-neutral-50 border-neutral-200'}\`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-neutral-900">{title}</h4>
        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
          {badge}
        </span>
      </div>

      <div className="text-sm text-neutral-600 mb-4">{children}</div>

      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
        <span className="text-sm font-black text-neutral-900">\${price} CAD</span>
        <button
          onClick={() => onSelect(title)}
          className="px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}`,
              explanation: 'This ServiceCard demonstrates typed contracts, default values (badge="Standard", variant="primary"), callback props (onSelect), and containment via children.',
            },
          ],
        },
        playground: {
          id: 'pg-props',
          title: 'Props Architecture Explorer',
          description: 'Dynamically toggle props (title, price, variant, badge, showIcon) to observe how data changes the component output and inspect the generated JSX code in real-time.',
          type: 'props-explorer',
          initialState: {
            title: 'Hollow-Tine Core Aeration',
            price: 79,
            badge: 'Spring & Fall',
            variant: 'primary',
            isAvailable: true,
            tagline: 'Relieves dense Alberta soil compaction and promotes root growth.',
          },
        },
        challenge: {
          id: 'ch-props-card',
          title: 'Challenge: Build a Typed Property Stat Card',
          instructions: 'Build a reusable TypeScript functional component named "PropertyStatCard" that receives: title (string), value (string or number), subtitle (optional string, defaults to "Central Alberta Avg"), and isPositive (boolean). It should render the title, value, and subtitle inside a styled card.',
          starterCode: `import React from 'react';

// Step 1: Define the TypeScript Interface
interface PropertyStatCardProps {
  // TODO: Add typed props here
}

// Step 2: Implement the component with destructuring and default subtitle
export function PropertyStatCard(props: PropertyStatCardProps) {
  return (
    <div>
      {/* TODO: Render title, value, and subtitle */}
    </div>
  );
}`,
          solutionCode: `import React from 'react';

interface PropertyStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  isPositive?: boolean;
}

export function PropertyStatCard({
  title,
  value,
  subtitle = "Central Alberta Avg",
  isPositive = true,
}: PropertyStatCardProps) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
      <div className="text-xs font-medium text-neutral-500 uppercase">{title}</div>
      <div className="text-2xl font-black text-neutral-900 my-1">{value}</div>
      <div className={\`text-xs \${isPositive ? 'text-emerald-600' : 'text-neutral-500'}\`}>
        {subtitle}
      </div>
    </div>
  );
}`,
          hints: [
            'Create an interface with: title: string; value: string | number; subtitle?: string; isPositive?: boolean;',
            'Destructure in the function signature: ({ title, value, subtitle = "Central Alberta Avg", isPositive = true }: PropertyStatCardProps)',
            'Render title, value, and subtitle inside the returned JSX markup.',
          ],
          explanation: 'Typing props guarantees that consuming developers provide the correct data shape at compile time. Default arguments provide graceful degradation when optional props are omitted.',
          testCases: [
            {
              description: 'Declares PropertyStatCardProps interface with title and value',
              validate: (code) => ({
                passed: /interface\s+PropertyStatCardProps/.test(code) && /title:\s*string/.test(code) && /value:/.test(code),
                message: 'Define interface PropertyStatCardProps with title: string and value: string | number',
              }),
            },
            {
              description: 'Destructures props and assigns default subtitle value',
              validate: (code) => ({
                passed: /subtitle\s*=\s*["'][^"']+["']/.test(code),
                message: 'Assign a default fallback value to subtitle (e.g., subtitle = "Central Alberta Avg")',
              }),
            },
            {
              description: 'Renders the title and value in the JSX return',
              validate: (code) => ({
                passed: /\{title\}/.test(code) && /\{value\}/.test(code),
                message: 'Render {title} and {value} inside your component JSX',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'ServicesSection.tsx',
          filePath: '/components/ServicesSection.tsx',
          description: 'Each card in the services carousel receives typed ServiceItem props and renders custom badges and pricing via component props.',
        },
      },
      {
        id: 'p1-m3-usestate',
        title: '3. State Management: The useState Hook & Immutability',
        slug: 'basic-state-management-usestate',
        estimatedMinutes: 30,
        theory: {
          summary: 'State is a component\'s private memory. Unlike local variables that get reset on every render, state persists between renders and triggers React to re-render the component whenever it changes.',
          corePrinciples: [
            {
              headline: 'Principle 1: State Triggers Re-Renders',
              body: 'Regular variables do not trigger UI updates. When you call setCounter(counter + 1), React schedules a re-render, calls your component function again, and reconciles the DOM.',
              pitfall: 'Using let count = 0 and doing count++ inside an onClick handler does not cause React to update the DOM.',
            },
            {
              headline: 'Principle 2: State is Immutable',
              body: 'Never mutate state directly! If you have an array or object in state, you must never write state.push(item) or state.name = "new". Always create a new copy using the spread operator (...), filter, or map.',
              pitfall: 'Mutating an existing object in place means the object reference (memory address) does not change, causing React to skip the re-render completely.',
            },
            {
              headline: 'Principle 3: The Functional Updater Form (prev => prev + 1)',
              body: 'When your next state depends on the previous state, always pass an updater function: setCount(prev => prev + 1). This protects against stale closures during asynchronous state batching.',
              pitfall: 'Calling setCount(count + 1) three times synchronously only increments count by 1 because all three calls read the same snapshot of count from that render.',
            },
            {
              headline: 'Principle 4: Derived State (Do Not Over-State)',
              body: 'If a value can be computed directly from existing state or props, do not store it in a separate useState! Calculate it synchronously during render.',
              pitfall: 'Creating const [subtotal, setSubtotal] = useState() and const [tax, setTax] = useState() when tax is simply subtotal * 0.05.',
            },
          ],
          codeExamples: [
            {
              title: 'Immutable Array State Updates with useState',
              code: `import React, { useState } from 'react';

export function SelectedServicesList() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Weekly Mowing',
  ]);

  // Adding an item IMMUTABLY using array spread
  const addService = (service: string) => {
    setSelectedServices(prev => [...prev, service]);
  };

  // Removing an item IMMUTABLY using .filter()
  const removeService = (service: string) => {
    setSelectedServices(prev => prev.filter(item => item !== service));
  };

  return (
    <div className="p-4 bg-white rounded-xl border">
      <h4 className="font-bold mb-2">Booked Services ({selectedServices.length})</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedServices.map(svc => (
          <span key={svc} className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full flex items-center gap-1">
            {svc}
            <button onClick={() => removeService(svc)} className="hover:text-red-600 font-bold">×</button>
          </span>
        ))}
      </div>
      <button
        onClick={() => addService('Spring Power Raking')}
        className="text-xs px-3 py-1.5 bg-emerald-700 text-white rounded-lg"
      >
        + Add Power Raking
      </button>
    </div>
  );
}`,
              explanation: 'Notice that setSelectedServices never uses .push() or .splice(). It uses [...prev, newItem] to append and .filter() to remove, creating fresh array references.',
            },
          ],
        },
        playground: {
          id: 'pg-state',
          title: 'Interactive State & Immutability Sandbox',
          description: 'Experience how React state updates work. Test batching, compare direct mutations vs immutable updates, and observe why updater functions prevent stale closures.',
          type: 'state-sandbox',
          initialState: {
            count: 1,
            servicesCart: ['Weekly Mowing', 'Spring Power Raking'],
            customer: { name: 'David Miller', city: 'Red Deer', isVIP: true },
          },
        },
        challenge: {
          id: 'ch-immutable-cart',
          title: 'Challenge: Implement an Immutable Service Cart',
          instructions: 'Write a component called "ServiceCartManager" with a list of services in state. Implement two functions: "addService(name: string)" and "removeService(name: string)" using functional state updates (prev => ...) and immutable array methods without mutating state.',
          starterCode: `import React, { useState } from 'react';

export function ServiceCartManager() {
  const [cart, setCart] = useState<string[]>(['Mowing']);

  // TODO: Implement addService using prev => [...prev, name]
  const addService = (name: string) => {
    // Write code here
  };

  // TODO: Implement removeService using prev => prev.filter(...)
  const removeService = (name: string) => {
    // Write code here
  };

  return (
    <div>
      <p>Cart count: {cart.length}</p>
      {/* buttons and items */}
    </div>
  );
}`,
          solutionCode: `import React, { useState } from 'react';

export function ServiceCartManager() {
  const [cart, setCart] = useState<string[]>(['Mowing']);

  const addService = (name: string) => {
    setCart((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  const removeService = (name: string) => {
    setCart((prev) => prev.filter((item) => item !== name));
  };

  return (
    <div className="p-4 bg-white rounded-xl border">
      <p>Cart count: {cart.length}</p>
      <ul>
        {cart.map((item) => (
          <li key={item}>
            {item}
            <button onClick={() => removeService(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addService('Aeration')}>Add Aeration</button>
    </div>
  );
}`,
          hints: [
            'Use setCart(prev => [...prev, name]) to add without mutating.',
            'Use setCart(prev => prev.filter(item => item !== name)) to remove by value.',
            'Never use cart.push() or cart.splice().',
          ],
          explanation: 'Immutable updates guarantee referential changes so that React can verify whether a re-render is necessary via shallow comparison (Object.is).',
          testCases: [
            {
              description: 'Initializes state with useState<string[]>',
              validate: (code) => ({
                passed: /useState<[^>]*>/.test(code) || /useState\(\s*\[/.test(code),
                message: 'Initialize cart state with useState<string[]>(...)',
              }),
            },
            {
              description: 'addService uses functional updater with array spread',
              validate: (code) => ({
                passed: /\[\s*\.\.\.prev/.test(code) || /concat\(/.test(code),
                message: 'Implement addService using array spread: [...prev, name]',
              }),
            },
            {
              description: 'removeService uses .filter to return a new array',
              validate: (code) => ({
                passed: /\.filter\(/.test(code),
                message: 'Implement removeService using prev.filter(item => item !== name)',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'QuoteModal.tsx',
          filePath: '/components/QuoteModal.tsx',
          description: 'The quote calculator manages selected services, lot sizes, and contact details using immutable state transformations.',
        },
      },
      {
        id: 'p1-m4-events',
        title: '4. Event Handling: Synthetic Events & Controlled Forms',
        slug: 'event-handling-controlled-forms',
        estimatedMinutes: 25,
        theory: {
          summary: 'In React, user interactions are handled through SyntheticEvents — cross-browser wrappers around the browser\'s native events that ensure consistent behavior across Safari, Chrome, Edge, and Firefox.',
          corePrinciples: [
            {
              headline: 'Principle 1: Pass Functions, Do Not Call Them',
              body: 'Pass a reference to the function: onClick={handleClick}. If you write onClick={handleClick()}, the function executes immediately during render, often causing infinite re-render loops!',
              pitfall: 'Writing onClick={alert("Clicked!")} executes alert on initial page load before the user clicks anything.',
            },
            {
              headline: 'Principle 2: Passing Parameters with Inline Arrow Functions',
              body: 'To pass an argument to an event handler, wrap the call in an arrow function: onClick={() => handleSelect(service.id)}.',
              pitfall: 'Do not write onClick={handleSelect(service.id)} without the wrapping arrow function.',
            },
            {
              headline: 'Principle 3: Form Submissions & e.preventDefault()',
              body: 'HTML form submissions cause the browser to trigger a full page reload and send a GET/POST request. In single-page applications, you must call e.preventDefault() to handle the submit via JavaScript.',
              pitfall: 'Forgetting e.preventDefault() reloads the webpage and wipes out all client-side React state.',
            },
            {
              headline: 'Principle 4: Controlled Inputs Pattern',
              body: 'In controlled inputs, the React state is the single source of truth: <input value={name} onChange={e => setName(e.target.value)} />. The DOM input value is bound to state, and typing fires an event that updates state.',
              pitfall: 'Providing value without an onChange handler results in a read-only input that cannot be typed into.',
            },
          ],
          codeExamples: [
            {
              title: 'Controlled Form with SyntheticEvent Handling',
              code: `import React, { useState } from 'react';

export function ContactCallbackForm() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 1. Prevent default browser page refresh!
    e.preventDefault();

    if (!phone.trim()) {
      alert('Please enter your Alberta phone number');
      return;
    }

    // 2. Submit data via client-side logic
    setStatus('submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl border space-y-3">
      <label className="block text-xs font-bold text-neutral-700">
        Enter Phone for Rapid Callback:
      </label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} // SyntheticEvent
        placeholder="e.g. 780-782-9393"
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />
      <button
        type="submit"
        className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg"
      >
        {status === 'submitted' ? '✓ Callback Requested' : 'Call Me Back'}
      </button>
    </form>
  );
}`,
              explanation: 'Notice e.preventDefault() prevents browser reload, and the input\'s value and onChange properties establish two-way synchronization with React state.',
            },
          ],
        },
        playground: {
          id: 'pg-events',
          title: 'Event Handling & Form Laboratory',
          description: 'Inspect live SyntheticEvent objects, test controlled input binding, and observe the difference when e.preventDefault() is toggled on vs off.',
          type: 'events-lab',
          initialState: {
            inputValue: 'Sylvan Lake, AB',
            selectValue: 'Power Raking',
            isSubmitting: false,
            eventsLog: [],
            preventDefaultEnabled: true,
          },
        },
        challenge: {
          id: 'ch-controlled-search',
          title: 'Challenge: Build a Controlled Search Filter',
          instructions: 'Build a component "ServiceSearchInput" with a controlled text input. It must store the query in state via "onChange", prevent form reload via "onSubmit", and show a clear button that resets the query to "" when clicked.',
          starterCode: `import React, { useState } from 'react';

export function ServiceSearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  // TODO: Handle form submission with e.preventDefault()
  const handleSubmit = (e: React.FormEvent) => {
    // Write code here
  };

  // TODO: Handle clearing search
  const handleClear = () => {
    // Write code here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search lawn services..."
        // TODO: Bind value and onChange
      />
      <button type="button" onClick={handleClear}>Clear</button>
      <button type="submit">Search</button>
    </form>
  );
}`,
          solutionCode: `import React, { useState } from 'react';

export function ServiceSearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search lawn services..."
        className="px-3 py-1.5 border rounded-lg"
      />
      {query && (
        <button type="button" onClick={handleClear} className="text-xs text-neutral-500">
          Clear
        </button>
      )}
      <button type="submit" className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-lg">
        Search
      </button>
    </form>
  );
}`,
          hints: [
            'Bind value={query} and onChange={(e) => setQuery(e.target.value)} on the input.',
            'Inside handleSubmit, call e.preventDefault() and onSearch(query).',
            'Inside handleClear, setQuery("") and onSearch("").',
          ],
          explanation: 'Controlled inputs keep form state centralized in React component memory, allowing instant validation, character formatting, and reactive UI updates.',
          testCases: [
            {
              description: 'Binds input value and onChange to state',
              validate: (code) => ({
                passed: /value=\{query\}/.test(code) && /onChange=\{[^}]*\}/.test(code),
                message: 'Bind the input with value={query} and onChange={(e) => setQuery(e.target.value)}',
              }),
            },
            {
              description: 'Calls e.preventDefault() in form onSubmit handler',
              validate: (code) => ({
                passed: /e\.preventDefault\(\)/.test(code),
                message: 'Call e.preventDefault() inside the form submission handler',
              }),
            },
            {
              description: 'Clears input state when clear handler runs',
              validate: (code) => ({
                passed: /setQuery\(["']["']\)/.test(code),
                message: 'Clear input query state using setQuery("") in handleClear',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'Navbar.tsx',
          filePath: '/components/Navbar.tsx',
          description: 'Dropdown hover/click handlers and the Free Quote button use synthetic event callbacks to coordinate modals and navigation.',
        },
      },
      {
        id: 'p1-m5-lists-conditionals',
        title: '5. Dynamic UI: Conditional Rendering & List Keys',
        slug: 'conditional-rendering-lists-keys',
        estimatedMinutes: 30,
        theory: {
          summary: 'Real applications dynamically render elements based on user state and iterate over collections of data. React leverages standard JavaScript expressions for conditions (&&, ? :, if/else) and array mapping (.map()).',
          corePrinciples: [
            {
              headline: 'Principle 1: Conditional Rendering Patterns',
              body: 'Use ternary (condition ? <A/> : <B/>) when choosing between two branches. Use logical AND (condition && <A/>) when rendering conditionally without an else branch. Use early returns (if (!data) return <Skeleton/>) to guard empty states.',
              pitfall: 'Watch out for {count && <List/>}: if count is 0, JavaScript evaluates 0 as falsy and prints the number "0" directly onto your webpage! Use {count > 0 && <List/>} or {Boolean(count) && <List/>}.',
            },
            {
              headline: 'Principle 2: Rendering Lists with .map()',
              body: 'In React, transform arrays of data into arrays of JSX using the native JavaScript array .map() method.',
              pitfall: 'Do not use .forEach() because it returns undefined instead of an array of JSX elements.',
            },
            {
              headline: 'Principle 3: The Mandatory "key" Prop',
              body: 'Every item in an iterated list must have a unique, stable "key" prop (e.g. key={service.id}). React uses this key to track element identity between renders during DOM reconciliation.',
              pitfall: 'Using array index as key (key={index}) causes bugs when sorting, filtering, or deleting items, because the index points to the position rather than the item itself.',
            },
            {
              headline: 'Principle 4: Stable Keys vs Generated Keys',
              body: 'Never generate keys on the fly during render, like key={Math.random()} or key={Date.now()}. This forces React to destroy and recreate the entire DOM subtree on every single render!',
              pitfall: 'Random keys trigger full DOM element remounts, wiping out form input focus and scroll positions.',
            },
          ],
          codeExamples: [
            {
              title: 'List Rendering with Stable Keys and Safe Conditionals',
              code: `import React from 'react';

interface ServiceItem {
  id: string; // Stable unique ID
  name: string;
  season: 'spring' | 'summer' | 'winter';
  isPopular: boolean;
}

export function SeasonalServicesCatalog({
  services,
  selectedSeason,
}: {
  services: ServiceItem[];
  selectedSeason: string;
}) {
  // 1. Filter data based on condition
  const filtered = services.filter(
    (s) => selectedSeason === 'all' || s.season === selectedSeason
  );

  // 2. Early return guard pattern
  if (filtered.length === 0) {
    return (
      <div className="p-6 text-center text-neutral-500 bg-neutral-50 rounded-xl">
        No services scheduled for this season.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {filtered.map((service) => (
        <div
          key={service.id} // ✅ Stable unique key from database/ID
          className="p-4 bg-white rounded-xl border border-neutral-200 flex items-center justify-between"
        >
          <div>
            <h4 className="font-bold text-neutral-900">{service.name}</h4>
            <span className="text-xs text-neutral-500 uppercase">{service.season}</span>
          </div>

          {/* Safe logical condition */}
          {service.isPopular && (
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              ★ POPULAR
            </span>
          )}
        </div>
      ))}
    </div>
  );
}`,
              explanation: 'Notice the early return guard for empty states, the safe logical condition for popular badges, and the stable unique key={service.id}.',
            },
          ],
        },
        playground: {
          id: 'pg-lists',
          title: 'Lists & Conditional Rendering Laboratory',
          description: 'Filter services by season, toggle between ternary vs logical AND, and witness live how using array index vs stable keys affects component reordering.',
          type: 'lists-conditionals',
          initialState: {
            selectedSeason: 'all',
            showOnlyPopular: false,
            keyStrategy: 'stable-id', // 'stable-id' vs 'array-index'
            items: [
              { id: 'srv-1', name: 'Power Raking & Dethatch', season: 'spring', isPopular: true, priority: 1 },
              { id: 'srv-2', name: 'Hollow-Tine Core Aeration', season: 'spring', isPopular: true, priority: 2 },
              { id: 'srv-3', name: 'Granular Lawn Fertilizer', season: 'summer', isPopular: false, priority: 3 },
              { id: 'srv-4', name: 'Weekly Mowing & Trimming', season: 'summer', isPopular: true, priority: 4 },
              { id: 'srv-5', name: 'Commercial Snow Clearing', season: 'winter', isPopular: true, priority: 5 },
            ],
          },
        },
        challenge: {
          id: 'ch-filter-list',
          title: 'Challenge: Render Filtered Services with Stable Keys',
          instructions: 'Implement "ServiceListRenderer" which receives a list of services. It should render only services where "isActive" is true using array .map(). Each rendered element must have a unique key using service.id, and show an "Alberta Certified" badge if certified is true.',
          starterCode: `import React from 'react';

interface Service {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  certified: boolean;
}

export function ServiceListRenderer({ services }: { services: Service[] }) {
  // TODO: Filter active services and render with unique keys
  return (
    <div>
      {/* Map active services here */}
    </div>
  );
}`,
          solutionCode: `import React from 'react';

interface Service {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  certified: boolean;
}

export function ServiceListRenderer({ services }: { services: Service[] }) {
  const activeServices = services.filter((s) => s.isActive);

  if (activeServices.length === 0) {
    return <p>No active services available.</p>;
  }

  return (
    <ul className="space-y-2">
      {activeServices.map((service) => (
        <li key={service.id} className="p-3 bg-white rounded-lg border flex justify-between">
          <span>{service.name} - \${service.price}</span>
          {service.certified && (
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              Alberta Certified
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}`,
          hints: [
            'Filter by s.isActive before or inside the map.',
            'Use key={service.id} on the outer returned element inside .map().',
            'Use conditional rendering {service.certified && <span>...</span>} for the badge.',
          ],
          explanation: 'Using stable IDs as keys allows React\'s virtual DOM reconciliation algorithm to identify which items were added, removed, or moved without re-creating unaffected DOM nodes.',
          testCases: [
            {
              description: 'Filters active services using .filter(s => s.isActive)',
              validate: (code) => ({
                passed: /\.filter\(/.test(code) && /isActive/.test(code),
                message: 'Filter active services using .filter(service => service.isActive)',
              }),
            },
            {
              description: 'Maps services and provides key={service.id}',
              validate: (code) => ({
                passed: /\.map\(/.test(code) && /key=\{[^}]*\.id\}/.test(code),
                message: 'Map over services and provide a key prop with service.id: key={service.id}',
              }),
            },
            {
              description: 'Conditionally renders the certified badge',
              validate: (code) => ({
                passed: /certified\s*&&/.test(code) || /certified\s*\?/.test(code),
                message: 'Conditionally render the badge using {service.certified && ...}',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'ServicesSection.tsx',
          filePath: '/components/ServicesSection.tsx',
          description: 'The horizontal carousel iterates over SERVICES_DATA using .map() with unique IDs as keys.',
        },
      },
    ],
  },
  {
    id: 'phase-2-intermediate',
    phaseNumber: 2,
    title: 'Phase 2: Intermediate (Hooks & Component Lifecycle)',
    badge: 'Intermediate',
    description: 'Master side effects, external DOM synchronization, custom hooks, and state abstraction.',
    targetAudience: 'Developers comfortable with JSX and state who want to master hooks and data lifecycle',
    modules: [
      {
        id: 'p2-m1-useeffect',
        title: '1. useEffect: Synchronization, Dependency Arrays & Timers',
        slug: 'useeffect-synchronization-lifecycle',
        estimatedMinutes: 30,
        theory: {
          summary: 'useEffect allows components to synchronize with external systems, browser APIs, intervals, and data stores. Mastering its cleanup lifecycle prevents memory leaks.',
          corePrinciples: [
            {
              headline: 'The Render Cycle: Commit vs Paint',
              body: 'Effects run after the browser paints, ensuring user interface rendering is never blocked by side effects.',
            },
            {
              headline: 'The Cleanup Function Contract',
              body: 'Return a cleanup function from your effect to tear down timers, event listeners, and WebSocket subscriptions.',
            },
          ],
          codeExamples: [],
        },
        playground: {
          id: 'pg-p2-effects',
          title: 'Effect & Cleanup Simulator',
          description: 'Observe real-time timer ticks, pause and resume, and simulate component unmount to watch cleanup functions run.',
          type: 'state-sandbox',
          initialState: { isRunning: true, elapsedSeconds: 0 },
        },
        challenge: {
          id: 'ch-p2-timer',
          title: 'Challenge: Build an Auto-Incrementing Visit Tracker',
          instructions: 'Build a component using useEffect with an interval that increments seconds every 1000ms and cleans up on unmount.',
          starterCode: `import React, { useState, useEffect } from 'react';\n\nexport function VisitTracker() {\n  // TODO: Add interval and cleanup\n  return <div>Timer</div>;\n}`,
          solutionCode: `import React, { useState, useEffect } from 'react';\n\nexport function VisitTracker() {\n  const [seconds, setSeconds] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setSeconds(s => s + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <div>Elapsed: {seconds}s</div>;\n}`,
          hints: ['Use setInterval and return () => clearInterval(id).'],
          explanation: 'Always clean up intervals to avoid memory leaks.',
          testCases: [
            {
              description: 'Sets up setInterval inside useEffect',
              validate: (code) => ({
                passed: /setInterval\(/.test(code) && /useEffect\(/.test(code),
                message: 'Use setInterval inside useEffect',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'useScheduleTracker.ts',
          filePath: '/hooks/useScheduleTracker.ts',
          description: 'Simulates live GPS technician dispatch with intervals and cleanup.',
        },
      },
      {
        id: 'p2-m2-custom-hooks',
        title: '2. Custom Hooks: Headless Logic Extraction',
        slug: 'custom-hooks-logic-extraction',
        estimatedMinutes: 25,
        theory: {
          summary: 'Custom hooks let you package state, effects, and math into reusable functions with zero UI coupling.',
          corePrinciples: [
            {
              headline: 'The "use" Prefix Convention',
              body: 'Custom hooks must start with "use" so React lint rules can enforce the rules of hooks.',
            },
          ],
          codeExamples: [],
        },
        playground: {
          id: 'pg-p2-hooks',
          title: 'Custom Hook Tester',
          description: 'Test headless hooks with various parameter inputs.',
          type: 'props-explorer',
          initialState: { lotMultiplier: 1.2 },
        },
        challenge: {
          id: 'ch-p2-hook',
          title: 'Challenge: Write a useToggle Hook',
          instructions: 'Create a reusable custom hook called useToggle(initialValue = false) that returns [value, toggle].',
          starterCode: `import { useState } from 'react';\n\nexport function useToggle(initial = false) {\n  // TODO: Implement toggle logic\n}`,
          solutionCode: `import { useState } from 'react';\n\nexport function useToggle(initial = false) {\n  const [value, setValue] = useState(initial);\n  const toggle = () => setValue(v => !v);\n  return [value, toggle] as const;\n}`,
          hints: ['Return [value, toggle] where toggle flips the boolean.'],
          explanation: 'Custom hooks provide clean abstraction boundaries.',
          testCases: [
            {
              description: 'Returns tuple with value and toggle function',
              validate: (code) => ({
                passed: /useState/.test(code) && /setValue\(/.test(code),
                message: 'Manage boolean state and return toggle handler',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'useQuoteEstimator.ts',
          filePath: '/hooks/useQuoteEstimator.ts',
          description: 'Powers pricing calculations across the hero, services, and quote modals.',
        },
      },
    ],
  },
  {
    id: 'phase-3-advanced',
    phaseNumber: 3,
    title: 'Phase 3: Advanced (Performance & Patterns)',
    badge: 'Advanced',
    description: 'Learn referential stability, memoization with useMemo/useCallback, compound component design, and performance auditing.',
    targetAudience: 'Senior engineers optimizing applications and building scalable design systems',
    modules: [
      {
        id: 'p3-m1-memo-perf',
        title: '1. Performance: useMemo, useCallback & Referential Stability',
        slug: 'performance-usememo-usecallback',
        estimatedMinutes: 30,
        theory: {
          summary: 'Understand when to memoize expensive calculations and stabilize callback references.',
          corePrinciples: [
            {
              headline: 'Referential Equality',
              body: 'In JavaScript, {} !== {} and () => {} !== () => {}. Every render generates new function references unless wrapped in useCallback.',
            },
          ],
          codeExamples: [],
        },
        playground: {
          id: 'pg-p3-perf',
          title: 'Render Counter & Memo Benchmark',
          description: 'See live render counts increase with un-memoized vs memoized callbacks.',
          type: 'state-sandbox',
          initialState: { calculationsRun: 0 },
        },
        challenge: {
          id: 'ch-p3-memo',
          title: 'Challenge: Optimize an Expensive Service Filter',
          instructions: 'Wrap an expensive calculation with useMemo to prevent re-execution on unrelated state changes.',
          starterCode: `import React, { useMemo } from 'react';\n\nexport function ServiceFilter({ items, search }: any) {\n  // TODO: Wrap with useMemo\n  const filtered = items.filter((i: any) => i.name.includes(search));\n  return <div>{filtered.length}</div>;\n}`,
          solutionCode: `import React, { useMemo } from 'react';\n\nexport function ServiceFilter({ items, search }: any) {\n  const filtered = useMemo(() => {\n    return items.filter((i: any) => i.name.includes(search));\n  }, [items, search]);\n  return <div>{filtered.length}</div>;\n}`,
          hints: ['useMemo(() => items.filter(...), [items, search])'],
          explanation: 'useMemo caches computation results between renders.',
          testCases: [
            {
              description: 'Uses useMemo with dependency array',
              validate: (code) => ({
                passed: /useMemo\(/.test(code) && /\[items,\s*search\]/.test(code),
                message: 'Wrap calculation in useMemo with [items, search] dependencies',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'ServicesSection.tsx',
          filePath: '/components/ServicesSection.tsx',
          description: 'Uses useMemo to cache filtered seasonal services without unnecessary re-renders.',
        },
      },
    ],
  },
  {
    id: 'phase-4-architect',
    phaseNumber: 4,
    title: 'Phase 4: Production Architect (Next.js 15 & System Design)',
    badge: 'Architect',
    description: 'Master the Next.js 15 App Router, Server vs Client component boundaries, SEO metadata, and enterprise architecture.',
    targetAudience: 'Lead engineers and system architects designing full-stack web applications',
    modules: [
      {
        id: 'p4-m1-rsc-boundaries',
        title: '1. Server/Client Boundaries & Next.js 15 App Router',
        slug: 'server-client-boundaries-app-router',
        estimatedMinutes: 35,
        theory: {
          summary: 'In Next.js 15, components are Server Components by default. Interactivity is pushed to client leaves using the "use client" directive.',
          corePrinciples: [
            {
              headline: 'Zero-Bundle Server Components',
              body: 'Server Components execute only on the server, sending pre-rendered HTML to the client with zero JavaScript bundle overhead.',
            },
            {
              headline: 'Leaf Node Interactivity Rule',
              body: 'Place "use client" as far down the component tree as possible so maximum layout remains static.',
            },
          ],
          codeExamples: [],
        },
        playground: {
          id: 'pg-p4-architect',
          title: 'Server vs Client Tree Visualizer',
          description: 'Inspect which components hydrate on the client and which render statically on the server.',
          type: 'props-explorer',
          initialState: { serverComponentCount: 3, clientComponentCount: 5 },
        },
        challenge: {
          id: 'ch-p4-boundary',
          title: 'Challenge: Refactor to Server Component with Client Leaf',
          instructions: 'Separate static server data fetching from an interactive client button.',
          starterCode: `// Convert this to a server component that imports a client button\nexport default function Page() {\n  return <div>Interactive Page</div>;\n}`,
          solutionCode: `// Server component by default\nimport { InteractiveButton } from './InteractiveButton';\n\nexport default function Page() {\n  return (\n    <main>\n      <h1>Static Server Header</h1>\n      <InteractiveButton />\n    </main>\n  );\n}`,
          hints: ['Keep page.tsx as a Server Component and import client components.'],
          explanation: 'Pushing interactivity to leaf nodes minimizes client JavaScript payload.',
          testCases: [
            {
              description: 'Exports server component page',
              validate: (code) => ({
                passed: /export\s+default\s+function/.test(code),
                message: 'Export default function Page',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'app/page.tsx',
          filePath: '/app/page.tsx',
          description: 'Demonstrates Server Component page coordinating with client leaf components.',
        },
      },
    ],
  },
];

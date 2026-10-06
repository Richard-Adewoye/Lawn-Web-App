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
    title: 'Phase 2: Intermediate (Hooks & Ecosystem)',
    badge: 'Intermediate',
    description: 'Master side effects, imperative DOM references, state lift-up patterns, the Context API, custom hooks, and controlled vs uncontrolled forms.',
    targetAudience: 'Engineers who understand JSX and basic useState and want to master React\'s hook lifecycle and component architecture',
    modules: [
      {
        id: 'p2-m1-useeffect',
        title: '1. Side Effects & Lifecycle with useEffect',
        slug: 'side-effects-lifecycle-useeffect',
        estimatedMinutes: 30,
        theory: {
          summary: 'In React, components should be pure functions that compute UI from props and state. Side effects — fetching data, subscribing to browser events, starting timers, or updating document titles — belong in useEffect, which executes after React commits and paints the DOM.',
          corePrinciples: [
            {
              headline: 'Principle 1: Commit Phase vs Browser Paint',
              body: 'React renders in two steps: Render (calculates JSX diffs) and Commit (updates real DOM). Effects run asynchronously AFTER the browser has painted the screen, ensuring animations and interactions stay smooth.',
              pitfall: 'Placing side-effects (like fetch() or localStorage writes) directly in the component body runs them during render, leading to duplicate network requests and performance thrashing.',
            },
            {
              headline: 'Principle 2: The Dependency Array Contract',
              body: 'The second argument [depA, depB] tells React when to re-run the effect. Omit it -> runs on every render. Empty [] -> runs once on mount. With deps -> runs when any dependency changes (using Object.is comparison).',
              pitfall: 'Omitting reactive variables from the dependency array results in stale closures that read outdated state from previous renders.',
            },
            {
              headline: 'Principle 3: The Critical Cleanup Function Contract',
              body: 'Return a cleanup function from your effect: return () => { clearInterval(id); }. React executes this cleanup before re-running the effect with new dependencies, and when the component unmounts.',
              pitfall: 'Neglecting cleanup on intervals or window event listeners causes severe memory leaks and state updates on unmounted components.',
            },
            {
              headline: 'Principle 4: Avoid Infinite Effect Loops',
              body: 'Never update state inside an effect without specifying dependencies, or set state that triggers the same effect infinitely: useEffect(() => setCount(c => c + 1)).',
              pitfall: 'Calling setState unconditionally inside an effect with no dependency array creates an immediate infinite render loop.',
            },
          ],
          codeExamples: [
            {
              title: 'Live Interval with Guaranteed Cleanup',
              code: `import React, { useState, useEffect } from 'react';

export function DispatchCountdown({ initialSeconds = 60 }: { initialSeconds?: number }) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // 1. Guard clause: Do not run effect if inactive
    if (!isActive) return;

    // 2. Setup external interval timer
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 3. MANDATORY CLEANUP: Runs on unmount or before re-running!
    return () => {
      clearInterval(timerId);
    };
  }, [isActive]); // Only re-synchronizes when isActive changes

  return (
    <div className="p-4 bg-emerald-950 text-white rounded-xl">
      <span className="text-xs font-bold text-emerald-400">Next Crew Dispatch:</span>
      <div className="text-2xl font-mono font-black">{timeLeft}s</div>
      <button
        onClick={() => setIsActive(!isActive)}
        className="mt-2 text-xs px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20"
      >
        {isActive ? 'Pause Timer' : 'Resume Timer'}
      </button>
    </div>
  );
}`,
              explanation: 'Notice how the effect returns a cleanup callback clearInterval(timerId). If the user navigates away or pauses the timer, the previous interval is destroyed immediately.',
            },
          ],
        },
        playground: {
          id: 'pg-p2-effects',
          title: 'useEffect Lifecycle & Cleanup Laboratory',
          description: 'Experience how effect subscriptions, dependency changes, and cleanup callbacks work in real-time. Toggle intervals, observe execution logs, and simulate component unmount.',
          type: 'effects-lab',
          initialState: {
            isRunning: true,
            elapsedSeconds: 0,
            pollRateMs: 1000,
            cleanupCount: 0,
            effectRunCount: 1,
            unmounted: false,
          },
        },
        challenge: {
          id: 'ch-p2-autodismiss',
          title: 'Challenge: Auto-Dismissing Notification with useEffect & Cleanup',
          instructions: 'Build an "AutoDismissAlert" component that accepts "message: string" and "durationMs = 3000". Use useEffect to set a timer that hides the alert after durationMs. Return a cleanup function that clears the timeout if the component unmounts early!',
          starterCode: `import React, { useState, useEffect } from 'react';

export function AutoDismissAlert({ message, durationMs = 3000 }: { message: string; durationMs?: number }) {
  const [isVisible, setIsVisible] = useState(true);

  // TODO: Use useEffect to hide after durationMs and return cleanup
  useEffect(() => {
    // Write code here
  }, []);

  if (!isVisible) return null;

  return (
    <div className="p-3 bg-emerald-100 text-emerald-900 rounded-lg">
      {message}
    </div>
  );
}`,
          solutionCode: `import React, { useState, useEffect } from 'react';

export function AutoDismissAlert({ message, durationMs = 3000 }: { message: string; durationMs?: number }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, durationMs);

    return () => {
      clearTimeout(timer);
    };
  }, [message, durationMs]);

  if (!isVisible) return null;

  return (
    <div className="p-3 bg-emerald-100 text-emerald-900 rounded-lg">
      {message}
    </div>
  );
}`,
          hints: [
            'Use const timer = setTimeout(() => setIsVisible(false), durationMs);',
            'Return a cleanup function: return () => clearTimeout(timer);',
            'Include [message, durationMs] in the dependency array.',
          ],
          explanation: 'Returning clearTimeout(timer) guarantees that if the user closes the modal or changes messages before the timer elapses, the pending timer is cancelled without throwing errors.',
          testCases: [
            {
              description: 'Declares useEffect with setTimeout',
              validate: (code) => ({
                passed: /useEffect\s*\(/.test(code) && /setTimeout\s*\(/.test(code),
                message: 'Use setTimeout inside useEffect to schedule dismissal',
              }),
            },
            {
              description: 'Returns cleanup function calling clearTimeout',
              validate: (code) => ({
                passed: /return\s*\(\)\s*=>\s*\{\s*clearTimeout\(/.test(code) || /return\s*\(\)\s*=>\s*clearTimeout\(/.test(code),
                message: 'Return a cleanup function that calls clearTimeout(timer)',
              }),
            },
            {
              description: 'Includes durationMs in the dependency array',
              validate: (code) => ({
                passed: /\[[^\]]*durationMs[^\]]*\]/.test(code),
                message: 'Include durationMs in the useEffect dependency array',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'useScheduleTracker.ts',
          filePath: '/hooks/useScheduleTracker.ts',
          description: 'Simulates live GPS technician dispatch route progress with an interval timer and cleanup.',
        },
      },
      {
        id: 'p2-m2-useref',
        title: '2. DOM References & Mutable Values with useRef',
        slug: 'dom-references-mutable-useref',
        estimatedMinutes: 25,
        theory: {
          summary: 'useRef returns a mutable ref object whose .current property persists across the entire component lifetime. Crucially: mutating ref.current does NOT trigger a re-render. It serves two distinct engineering roles: direct imperative DOM access, and storing mutable values across renders.',
          corePrinciples: [
            {
              headline: 'Role 1: Imperative DOM Manipulation',
              body: 'Attach a ref to any JSX element via <input ref={inputRef} />. Once mounted, inputRef.current references the actual browser HTMLInputElement. Use this for focus, text selection, measuring bounding rects, or controlling audio/video elements.',
              pitfall: 'Trying to access inputRef.current during the render phase: ref is only assigned after the DOM is committed.',
            },
            {
              headline: 'Role 2: Mutable Values Without Re-Renders',
              body: 'If you want to track how many times a component rendered, or store a previous value, or hold an interval timer ID without triggering extra renders, use useRef instead of useState.',
              pitfall: 'Storing values that determine what appears on the screen in a ref: because refs do not re-render, the UI will not update!',
            },
            {
              headline: 'Principle 3: useRef vs useState vs Regular Variables',
              body: 'Regular variables (let x = 0) reset on every render. useState variables trigger re-renders on every change. useRef variables persist between renders without triggering re-renders.',
              pitfall: 'Using useState for interval timer IDs causes an unnecessary extra render just to save the ID.',
            },
          ],
          codeExamples: [
            {
              title: 'Auto-Focusing Search Input & Tracking Render Count',
              code: `import React, { useRef, useEffect, useState } from 'react';

export function QuoteSearchWithFocus() {
  const [query, setQuery] = useState('');

  // 1. DOM Ref for imperative focus
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 2. Mutable value ref that does NOT trigger re-renders
  const renderCountRef = useRef(0);
  renderCountRef.current += 1; // Safely track render cycles

  const handleFocusClick = () => {
    // Imperative DOM access
    searchInputRef.current?.focus();
  };

  return (
    <div className="p-4 bg-white rounded-xl border space-y-3">
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>Component Render Cycles:</span>
        <span className="font-mono font-bold text-emerald-600">{renderCountRef.current}</span>
      </div>

      <div className="flex gap-2">
        <input
          ref={searchInputRef} // Bound to DOM node
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Alberta services..."
          className="px-3 py-1.5 border rounded-lg text-sm flex-1"
        />
        <button
          onClick={handleFocusClick}
          className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-bold"
        >
          Focus Input
        </button>
      </div>
    </div>
  );
}`,
              explanation: 'searchInputRef.current?.focus() imperatively commands the browser to focus the input, while renderCountRef.current counts renders without causing an infinite render cascade.',
            },
          ],
        },
        playground: {
          id: 'pg-p2-refs',
          title: 'useRef DOM & Render Memory Laboratory',
          description: 'Inspect imperative DOM methods (.focus(), .select(), .scrollIntoView()) and observe how useRef updates mutable variables without causing re-renders.',
          type: 'refs-dom-lab',
          initialState: {
            inputValue: '42 Lakeshore Dr, Sylvan Lake',
            previousValue: '',
            renderCount: 1,
            isFocused: false,
          },
        },
        challenge: {
          id: 'ch-p2-useref',
          title: 'Challenge: Persistent Render Counter & Auto-Focus with useRef',
          instructions: 'Build a component "AutoFocusInputWithCount" that uses a ref to auto-focus an input when the component mounts, and uses a second ref to track how many times the user typed without using a second state variable.',
          starterCode: `import React, { useRef, useEffect, useState } from 'react';

export function AutoFocusInputWithCount() {
  const [text, setText] = useState('');
  // TODO: Create inputRef and renderCountRef
  
  // TODO: Auto-focus input on mount with useEffect

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <p>Render count: {/* TODO: render count */}</p>
    </div>
  );
}`,
          solutionCode: `import React, { useRef, useEffect, useState } from 'react';

export function AutoFocusInputWithCount() {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Render count: {renderCountRef.current}</p>
    </div>
  );
}`,
          hints: [
            'Create const inputRef = useRef<HTMLInputElement>(null); and const renderCountRef = useRef(0);',
            'Increment renderCountRef.current += 1 on render.',
            'Inside useEffect(() => { inputRef.current?.focus(); }, []), focus the input.',
          ],
          explanation: 'useRef allows persistent mutable references without causing re-renders, and provides an escape hatch to access native browser DOM nodes directly.',
          testCases: [
            {
              description: 'Initializes inputRef using useRef',
              validate: (code) => ({
                passed: /const\s+inputRef\s*=\s*useRef/.test(code) && /ref=\{inputRef\}/.test(code),
                message: 'Create inputRef with useRef and attach it via ref={inputRef}',
              }),
            },
            {
              description: 'Initializes and increments renderCountRef',
              validate: (code) => ({
                passed: /renderCountRef\.current\s*\+=/.test(code) || /renderCountRef\.current\s*=/.test(code),
                message: 'Increment renderCountRef.current on render',
              }),
            },
            {
              description: 'Calls inputRef.current?.focus() inside useEffect',
              validate: (code) => ({
                passed: /inputRef\.current\?\.focus\(\)/.test(code) || /inputRef\.current\.focus\(\)/.test(code),
                message: 'Call inputRef.current?.focus() inside useEffect on mount',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'ServicesSection.tsx',
          filePath: '/components/ServicesSection.tsx',
          description: 'Uses useRef to imperatively scroll the horizontal services carousel left and right via scrollBy.',
        },
      },
      {
        id: 'p2-m3-state-lifting',
        title: '3. State Lift-Up & Prop Drilling Solutions',
        slug: 'state-lift-up-prop-drilling',
        estimatedMinutes: 25,
        theory: {
          summary: 'In React, state should live in the closest common ancestor of the components that need it. "Lifting state up" moves state from child components to their shared parent so siblings stay synchronized. When hierarchies grow deep, passing props through intermediate nodes is called "prop drilling".',
          corePrinciples: [
            {
              headline: 'Principle 1: Single Source of Truth',
              body: 'Never duplicate state across two sibling components. If both a property size selector and a price estimate card need lotSize, hoist lotSize up to their parent coordinator component.',
              pitfall: 'Keeping duplicate lotSize in two child components causes synchronization drift where one displays standard and the other calculates acreage.',
            },
            {
              headline: 'Principle 2: Inverse Data Flow via Callbacks',
              body: 'Data flows down via props; events flow up via callbacks. The parent passes the current value (value={lotSize}) and a callback to update it (onChange={setLotSize}).',
              pitfall: 'Attempting to directly modify a parent\'s variable from a child without passing an update callback.',
            },
            {
              headline: 'Principle 3: Identifying Prop Drilling',
              body: 'When component A passes props through B and C solely so leaf component D can read them, this is prop drilling. Minor prop drilling (1-2 levels) is healthy; deep drilling (4+ levels) calls for component composition or the Context API.',
              pitfall: 'Immediately reaching for complex state libraries when simple component composition or lifting state up solves the problem.',
            },
          ],
          codeExamples: [
            {
              title: 'Lifting State to Synchronize Sibling Components',
              code: `import React, { useState } from 'react';

// Sibling 1: Size Selector
function LotSelector({ selected, onSelect }: { selected: string; onSelect: (val: string) => void }) {
  return (
    <div className="flex gap-2">
      {['standard', 'large', 'acreage'].map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={\`px-3 py-1 text-xs rounded-lg font-bold capitalize \${selected === size ? 'bg-emerald-700 text-white' : 'bg-neutral-100 text-neutral-700'}\`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

// Sibling 2: Price Summary
function PriceSummary({ selectedSize }: { selectedSize: string }) {
  const RATES: Record<string, number> = { standard: 45, large: 65, acreage: 120 };
  return (
    <div className="p-3 bg-neutral-50 rounded-xl text-xs flex justify-between">
      <span>Estimated Rate for {selectedSize}:</span>
      <span className="font-bold text-emerald-700">\${RATES[selectedSize]} CAD</span>
    </div>
  );
}

// Parent Coordinator: Holds the Single Source of Truth!
export function YardQuoterCoordinator() {
  const [lotSize, setLotSize] = useState('standard'); // Lifted State!

  return (
    <div className="p-4 bg-white rounded-xl border space-y-3">
      <LotSelector selected={lotSize} onSelect={setLotSize} />
      <PriceSummary selectedSize={lotSize} />
    </div>
  );
}`,
              explanation: 'By holding lotSize in YardQuoterCoordinator, both LotSelector and PriceSummary stay perfectly synchronized without either holding duplicate memory.',
            },
          ],
        },
        playground: {
          id: 'pg-p2-lifting',
          title: 'State Lifting & Component Tree Visualizer',
          description: 'Visualize a 3-level component tree. Change state in the child to watch the update travel up to the parent coordinator and broadcast down to sibling leaf nodes.',
          type: 'state-lifting-lab',
          initialState: {
            activeLot: 'standard',
            activePackage: 'weekly-mowing',
            liftedToParent: true,
            simulatedDrillDepth: 2,
          },
        },
        challenge: {
          id: 'ch-p2-lifting',
          title: 'Challenge: Lift State Up Between Sibling Forms',
          instructions: 'Refactor two sibling components ("FrequencyPicker" and "EstimateBadge") inside "LawnEstimator". Lift the selected frequency state to the parent so selecting a frequency in the picker updates the rate shown in the badge!',
          starterCode: `import React, { useState } from 'react';

// Sibling A
function FrequencyPicker({ frequency, onChange }: any) {
  return (
    <select value={frequency} onChange={(e) => onChange(e.target.value)}>
      <option value="weekly">Weekly (Save 10%)</option>
      <option value="bi-weekly">Bi-Weekly</option>
    </select>
  );
}

// Sibling B
function EstimateBadge({ frequency }: any) {
  return <div>Frequency: {frequency}</div>;
}

// Parent Coordinator
export function LawnEstimator() {
  // TODO: Lift frequency state here and pass down to both siblings
  return (
    <div>
      <FrequencyPicker />
      <EstimateBadge />
    </div>
  );
}`,
          solutionCode: `import React, { useState } from 'react';

function FrequencyPicker({ frequency, onChange }: { frequency: string; onChange: (f: string) => void }) {
  return (
    <select value={frequency} onChange={(e) => onChange(e.target.value)}>
      <option value="weekly">Weekly (Save 10%)</option>
      <option value="bi-weekly">Bi-Weekly</option>
    </select>
  );
}

function EstimateBadge({ frequency }: { frequency: string }) {
  return <div>Frequency: {frequency}</div>;
}

export function LawnEstimator() {
  const [frequency, setFrequency] = useState('weekly');

  return (
    <div>
      <FrequencyPicker frequency={frequency} onChange={setFrequency} />
      <EstimateBadge frequency={frequency} />
    </div>
  );
}`,
          hints: [
            'Add const [frequency, setFrequency] = useState("weekly") inside LawnEstimator.',
            'Pass frequency={frequency} and onChange={setFrequency} to FrequencyPicker.',
            'Pass frequency={frequency} to EstimateBadge.',
          ],
          explanation: 'Lifting state up establishes a single source of truth in the parent, making child components pure presentation receivers.',
          testCases: [
            {
              description: 'Declares state in parent LawnEstimator component',
              validate: (code) => ({
                passed: /const\s+\[frequency,\s*setFrequency\]\s*=\s*useState/.test(code),
                message: 'Declare const [frequency, setFrequency] = useState("weekly") in LawnEstimator',
              }),
            },
            {
              description: 'Passes frequency and onChange props to FrequencyPicker',
              validate: (code) => ({
                passed: /<FrequencyPicker[^>]*frequency=\{frequency\}[^>]*onChange=\{setFrequency\}/.test(code) || /<FrequencyPicker[^>]*onChange=\{setFrequency\}[^>]*frequency=\{frequency\}/.test(code),
                message: 'Pass frequency={frequency} and onChange={setFrequency} to FrequencyPicker',
              }),
            },
            {
              description: 'Passes frequency prop to EstimateBadge',
              validate: (code) => ({
                passed: /<EstimateBadge[^>]*frequency=\{frequency\}/.test(code),
                message: 'Pass frequency={frequency} to EstimateBadge',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'LawnBusterApp.tsx',
          filePath: '/components/LawnBusterApp.tsx',
          description: 'LawnBusterApp acts as the root coordinator, holding modal open/close states and passing action handlers down to Hero, Navbar, and Footer.',
        },
      },
      {
        id: 'p2-m4-context-api',
        title: '4. Global State with Context API (createContext, useContext)',
        slug: 'global-state-context-api',
        estimatedMinutes: 30,
        theory: {
          summary: 'The Context API allows you to broadcast values (current user, regional Alberta service branch, theme, cart) to the entire component tree below without manually passing props through every intermediate level.',
          corePrinciples: [
            {
              headline: 'The 3-Step Context Workflow',
              body: '1. Create Context: const BranchContext = createContext<Branch>(defaultVal). 2. Provide Context: <BranchContext.Provider value={currentBranch}>{children}</BranchContext.Provider>. 3. Consume Context: const branch = useContext(BranchContext).',
              pitfall: 'Calling useContext outside of a matching Provider returns the default fallback value, which can hide missing provider setup.',
            },
            {
              headline: 'Custom Consumer Hook Pattern',
              body: 'Always wrap useContext in a custom hook: export function useBranch() { const ctx = useContext(BranchContext); if (!ctx) throw new Error("useBranch must be inside BranchProvider"); return ctx; }.',
              pitfall: 'Consuming raw context directly in components leads to repetitive null checks across your codebase.',
            },
            {
              headline: 'Context Re-Rendering Performance Caveat',
              body: 'When a context value changes, EVERY component that calls useContext with that context will re-render, even if it only uses an unrelated property on the value object.',
              pitfall: 'Putting high-frequency changing state (like keystrokes or mouse coordinates) into a single giant global context re-renders the whole app on every frame.',
            },
          ],
          codeExamples: [
            {
              title: 'Typed Regional Branch Context with Provider & Custom Hook',
              code: `import React, { createContext, useContext, useState } from 'react';

interface BranchContextType {
  activeBranch: string;
  setBranch: (city: string) => void;
  phone: string;
}

// 1. Create Context
const BranchContext = createContext<BranchContextType | undefined>(undefined);

// 2. Provider Component
export function BranchProvider({ children }: { children: React.ReactNode }) {
  const [activeBranch, setActiveBranch] = useState('Sylvan Lake');

  const phone = activeBranch === 'Red Deer' ? '+1 (403) 346-0000' : '+1 (780) 782-9393';

  return (
    <BranchContext.Provider value={{ activeBranch, setBranch: setActiveBranch, phone }}>
      {children}
    </BranchContext.Provider>
  );
}

// 3. Custom Consumer Hook with Guard
export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
}`,
              explanation: 'Notice how useBranch() encapsulates the null check and provides clean TypeScript inference across any nested child without prop drilling.',
            },
          ],
        },
        playground: {
          id: 'pg-p2-context',
          title: 'Context API Ambient State Laboratory',
          description: 'Switch regional Central Alberta branches (Sylvan Lake vs Red Deer) in the root provider and witness consumer leaf components update instantly without intermediate props.',
          type: 'context-lab',
          initialState: {
            activeBranch: 'Sylvan Lake',
            taxRate: '5% AB GST',
            isDispatched: true,
          },
        },
        challenge: {
          id: 'ch-p2-context',
          title: 'Challenge: Build a Typed Regional Branch Context',
          instructions: 'Create a typed "BranchContext" with activeBranch (string) and setBranch((b: string) => void). Export a "BranchProvider" component and a custom hook "useBranch" that throws an error if used outside the provider.',
          starterCode: `import React, { createContext, useContext, useState } from 'react';

// TODO: Define interface BranchContextType

// TODO: Create BranchContext

// TODO: Implement BranchProvider

// TODO: Implement custom hook useBranch
`,
          solutionCode: `import React, { createContext, useContext, useState } from 'react';

interface BranchContextType {
  activeBranch: string;
  setBranch: (branch: string) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: React.ReactNode }) {
  const [activeBranch, setActiveBranch] = useState('Sylvan Lake');
  return (
    <BranchContext.Provider value={{ activeBranch, setBranch: setActiveBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error('useBranch must be within BranchProvider');
  return ctx;
}`,
          hints: [
            'Use createContext<BranchContextType | undefined>(undefined);',
            'In BranchProvider, render <BranchContext.Provider value={{ activeBranch, setBranch: setActiveBranch }}>{children}</BranchContext.Provider>',
            'In useBranch, check if (!ctx) throw new Error(...) and return ctx.',
          ],
          explanation: 'The Context API eliminates prop drilling for truly global concerns like themes, authenticated users, and ambient application settings.',
          testCases: [
            {
              description: 'Creates BranchContext with createContext',
              validate: (code) => ({
                passed: /createContext<[^>]*>/.test(code) || /createContext\(/.test(code),
                message: 'Initialize context using createContext',
              }),
            },
            {
              description: 'Provides context value inside BranchProvider',
              validate: (code) => ({
                passed: /BranchContext\.Provider\s+value=/.test(code),
                message: 'Render <BranchContext.Provider value={...}>{children}</BranchContext.Provider>',
              }),
            },
            {
              description: 'Exports useBranch custom hook with safety check',
              validate: (code) => ({
                passed: /export\s+function\s+useBranch/.test(code) && /useContext\(BranchContext\)/.test(code),
                message: 'Export function useBranch that calls useContext(BranchContext)',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'Navbar.tsx',
          filePath: '/components/Navbar.tsx',
          description: 'Location dropdown selections simulate regional Alberta branch context switching across the application.',
        },
      },
      {
        id: 'p2-m5-custom-hooks',
        title: '5. Custom Hooks: Headless Logic Extraction',
        slug: 'custom-hooks-headless-logic',
        estimatedMinutes: 25,
        theory: {
          summary: 'Custom hooks are JavaScript functions whose names begin with "use" and that may call other React hooks. They are the primary mechanism for sharing stateful logic (such as calculations, localStorage synchronization, or media queries) between components without sharing state instances.',
          corePrinciples: [
            {
              headline: 'Principle 1: State Logic Reusability',
              body: 'Custom hooks reuse stateful logic, NOT state itself. Each component that calls a custom hook gets its own isolated, independent instance of state and effects.',
              pitfall: 'Thinking that calling useQuoteEstimator() in two components shares the exact same state between them: they get completely independent memory.',
            },
            {
              headline: 'Principle 2: Naming Convention and Lint Enforcement',
              body: 'Always prefix custom hooks with "use" (e.g. useQuoteEstimator). This signals to React\'s linter to enforce the Rules of Hooks (never call conditionally, only call at top level).',
              pitfall: 'Naming a hook getQuoteData(): the linter cannot verify hook rules, leading to bugs if called inside if statements.',
            },
            {
              headline: 'Principle 3: Clean API Design (Tuple vs Object)',
              body: 'Return a tuple [value, setValue] as const for primitives (like useState), or an object { data, isLoading, mutate } for complex multi-property APIs (like useQuery).',
              pitfall: 'Returning a tuple with 6 items: consumers have to remember the exact positional ordering.',
            },
          ],
          codeExamples: [
            {
              title: 'Reusable useLocalStorage Hook with JSON Parsing',
              code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Lazy state initializer: only reads storage on mount
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.warn(\`Error reading localStorage key "\${key}":\`, err);
      return initialValue;
    }
  });

  // 2. Setter that synchronizes state and localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (err) {
      console.warn(\`Error setting localStorage key "\${key}":\`, err);
    }
  };

  return [storedValue, setValue] as const;
}`,
              explanation: 'This hook provides type-safe persistent storage across browser refreshes, decoupling storage mechanics from any specific UI button or form.',
            },
          ],
        },
        playground: {
          id: 'pg-p2-custom-hooks',
          title: 'Custom Hooks Test Laboratory',
          description: 'Test live custom hooks in action: useLocalStorage for persistent yard notes, and useDebounce for throttling search inputs.',
          type: 'custom-hooks-lab',
          initialState: {
            storageKey: 'lawnbuster_notes',
            noteText: 'Please double-edge along the south garden border.',
            searchTerm: '',
            debouncedSearch: '',
          },
        },
        challenge: {
          id: 'ch-p2-custom-hooks',
          title: 'Challenge: Build a useToggle Custom Hook',
          instructions: 'Write a TypeScript custom hook called "useToggle(initialValue = false)" that returns a tuple [value, toggle] where toggle flips the boolean state. Also allow passing an explicit boolean to toggle(true/false).',
          starterCode: `import { useState } from 'react';

export function useToggle(initialValue: boolean = false) {
  // TODO: Implement toggle hook returning [value, toggle] as const
}
`,
          solutionCode: `import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((force?: boolean) => {
    setValue((prev) => (typeof force === 'boolean' ? force : !prev));
  }, []);

  return [value, toggle] as const;
}`,
          hints: [
            'Use const [value, setValue] = useState(initialValue);',
            'Define const toggle = (force?: boolean) => setValue(prev => typeof force === "boolean" ? force : !prev);',
            'Return [value, toggle] as const;',
          ],
          explanation: 'useToggle is the classic custom hook example, demonstrating functional updates and tuple returns.',
          testCases: [
            {
              description: 'Initializes boolean state with useState',
              validate: (code) => ({
                passed: /useState\(\s*initialValue\s*\)/.test(code) || /useState<boolean>/.test(code),
                message: 'Use useState to manage the boolean value',
              }),
            },
            {
              description: 'Returns tuple with value and toggle function',
              validate: (code) => ({
                passed: /return\s*\[\s*value,\s*toggle\s*\]/.test(code),
                message: 'Return a tuple: [value, toggle] as const',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'useQuoteEstimator.ts',
          filePath: '/hooks/useQuoteEstimator.ts',
          description: 'Encapsulates complex Alberta lot multiplier math, seasonal discounts, and 5% GST calculation into a clean reusable hook.',
        },
      },
      {
        id: 'p2-m6-controlled-uncontrolled',
        title: '6. Controlled vs. Uncontrolled Inputs & Form Architecture',
        slug: 'controlled-vs-uncontrolled-inputs',
        estimatedMinutes: 25,
        theory: {
          summary: 'In React forms, inputs can be either Controlled (React component state dictates the input value via value & onChange) or Uncontrolled (the browser DOM maintains the internal input value, accessed imperatively via useRef or native FormData).',
          corePrinciples: [
            {
              headline: 'Controlled Inputs: React as Source of Truth',
              body: 'With <input value={name} onChange={e => setName(e.target.value)} />, React intercepts every keystroke. Use this for instant field validation, dynamic character limits, conditional formatting, and disabling submit buttons when invalid.',
              pitfall: 'Passing value without onChange locks the input, preventing the user from typing anything.',
            },
            {
              headline: 'Uncontrolled Inputs: DOM as Source of Truth',
              body: 'With <input defaultValue="Sylvan Lake" ref={inputRef} /> or standard <form onSubmit={e => new FormData(e.currentTarget)}>, the DOM handles keystrokes without triggering component re-renders. Use this for massive forms, file uploads, and maximum performance.',
              pitfall: 'Using value instead of defaultValue on an uncontrolled input throws a React warning.',
            },
            {
              headline: 'Performance Tradeoff: Re-renders per Keystroke',
              body: 'A controlled form with 30 inputs re-renders the parent component on every single keystroke. An uncontrolled form re-renders ZERO times during typing, reading all values in one shot on submit via new FormData(form).',
              pitfall: 'Assuming uncontrolled forms are obsolete: uncontrolled forms with FormData are often faster and simpler for large data entry screens.',
            },
          ],
          codeExamples: [
            {
              title: 'Controlled Form vs Native Uncontrolled FormData',
              code: `import React, { useState } from 'react';

// 1. Controlled: Re-renders on every keystroke, instant validation
export function ControlledForm() {
  const [postalCode, setPostalCode] = useState('');
  const isValid = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(postalCode);

  return (
    <div className="p-4 bg-white rounded-xl border">
      <h4 className="font-bold text-xs">Controlled (Instant Validation)</h4>
      <input
        type="text"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value.toUpperCase())} // Immediate formatting
        placeholder="e.g. T4S 1Z5"
        className="px-3 py-1.5 border rounded text-xs mt-1"
      />
      <span className={\`text-[11px] block mt-1 \${isValid ? 'text-emerald-600' : 'text-neutral-400'}\`}>
        {isValid ? '✓ Valid Alberta Postal Code' : 'Enter standard postal code'}
      </span>
    </div>
  );
}

// 2. Uncontrolled: 0 re-renders during typing, reads all fields on submit
export function UncontrolledForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const clientName = data.get('clientName');
    const notes = data.get('notes');
    console.log('Submitted via FormData:', { clientName, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-xl border space-y-2">
      <h4 className="font-bold text-xs">Uncontrolled (Zero Typing Re-renders)</h4>
      <input name="clientName" defaultValue="Dave" className="px-3 py-1.5 border rounded text-xs block w-full" />
      <textarea name="notes" defaultValue="Gate unlocked." className="px-3 py-1.5 border rounded text-xs block w-full" />
      <button type="submit" className="px-3 py-1 bg-neutral-900 text-white rounded text-xs">Submit</button>
    </form>
  );
}`,
              explanation: 'Controlled inputs enable instant character formatting (toUpperCase()) and validation, while uncontrolled FormData handles large data payloads without typing re-renders.',
            },
          ],
        },
        playground: {
          id: 'pg-p2-forms',
          title: 'Controlled vs Uncontrolled Keystroke Laboratory',
          description: 'Type into side-by-side forms and inspect the live Render Counter. Watch the controlled input re-render on every letter while the uncontrolled input registers 0 typing re-renders!',
          type: 'controlled-uncontrolled-lab',
          initialState: {
            controlledVal: 'Sylvan Lake',
            controlledRenderCount: 0,
            uncontrolledRenderCount: 0,
            submittedData: null,
          },
        },
        challenge: {
          id: 'ch-p2-uncontrolled',
          title: 'Challenge: Build an Uncontrolled Form with native FormData',
          instructions: 'Build an "UncontrolledFeedbackForm" with an uncontrolled name input and rating select. On submit, prevent page refresh, extract values using new FormData(e.currentTarget), and call "onSubmitData({ name, rating })".',
          starterCode: `import React from 'react';

export function UncontrolledFeedbackForm({ onSubmitData }: { onSubmitData: (data: any) => void }) {
  // TODO: Implement handleSubmit reading from new FormData(e.currentTarget)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Write code here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" defaultValue="" placeholder="Client Name" />
      <select name="rating" defaultValue="5">
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
      </select>
      <button type="submit">Submit Feedback</button>
    </form>
  );
}`,
          solutionCode: `import React from 'react';

export function UncontrolledFeedbackForm({ onSubmitData }: { onSubmitData: (data: any) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '');
    const rating = Number(formData.get('rating') || 5);
    onSubmitData({ name, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input name="name" defaultValue="" placeholder="Client Name" className="border p-1" />
      <select name="rating" defaultValue="5" className="border p-1">
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
      </select>
      <button type="submit" className="bg-emerald-600 text-white px-2 py-1">Submit Feedback</button>
    </form>
  );
}`,
          hints: [
            'Call e.preventDefault(); first.',
            'Extract data using const formData = new FormData(e.currentTarget);',
            'Get values with formData.get("name") and formData.get("rating").',
          ],
          explanation: 'Using FormData with uncontrolled inputs provides clean native form handling without storing redundant strings in React component state.',
          testCases: [
            {
              description: 'Prevents default event submission',
              validate: (code) => ({
                passed: /e\.preventDefault\(\)/.test(code),
                message: 'Call e.preventDefault() in handleSubmit',
              }),
            },
            {
              description: 'Extracts values using new FormData',
              validate: (code) => ({
                passed: /new\s+FormData\(/.test(code),
                message: 'Extract form values using new FormData(e.currentTarget)',
              }),
            },
            {
              description: 'Calls onSubmitData with extracted properties',
              validate: (code) => ({
                passed: /onSubmitData\(/.test(code),
                message: 'Call onSubmitData with { name, rating }',
              }),
            },
          ],
        },
        appliedInApp: {
          componentName: 'QuoteModal.tsx',
          filePath: '/components/QuoteModal.tsx',
          description: 'The instant quote calculator uses controlled inputs for instant price updates as options change.',
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

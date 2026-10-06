'use client';

import React, { useState, useMemo } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Code2,
  ListFilter,
  Plus,
  Trash2,
  Zap,
  Wifi,
  Ban,
  RefreshCw,
  FileText,
  Check,
  X,
  ShieldCheck,
} from 'lucide-react';
import { PlaygroundConfig } from '@/types/curriculum';

interface InteractivePlaygroundProps {
  config: PlaygroundConfig;
}

export function InteractivePlayground({ config }: InteractivePlaygroundProps) {
  // Playground 1: JSX Expressions state
  const [jsxState, setJsxState] = useState(config.initialState);

  // Playground 2: Props Explorer state
  const [propsState, setPropsState] = useState(config.initialState);

  // Playground 3: State Sandbox
  const [counter, setCounter] = useState(1);
  const [servicesList, setServicesList] = useState<string[]>([
    'Weekly Mowing',
    'Spring Power Raking',
  ]);
  const [batchLog, setBatchLog] = useState<string[]>([]);

  // Playground 4: Events Lab state
  const [eventInput, setEventInput] = useState('Central Alberta');
  const [selectedServiceEvent, setSelectedServiceEvent] = useState('Power Raking');
  const [preventDefaultEnabled, setPreventDefaultEnabled] = useState(true);
  const [eventLogs, setEventLogs] = useState<
    { id: number; type: string; target: string; time: string; note: string }[]
  >([]);

  // Playground 5: Lists & Conditionals state
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [keyStrategy, setKeyStrategy] = useState<'stable-id' | 'array-index'>('stable-id');
  const [servicesData, setServicesData] = useState([
    { id: 'srv-1', name: 'Power Raking & Dethatch', season: 'spring', isPopular: true, priority: 1, note: 'Spring prime' },
    { id: 'srv-2', name: 'Hollow-Tine Core Aeration', season: 'spring', isPopular: true, priority: 2, note: 'Relieves compaction' },
    { id: 'srv-3', name: 'Granular Lawn Fertilizer', season: 'summer', isPopular: false, priority: 3, note: 'Micro-nutrients' },
    { id: 'srv-4', name: 'Weekly Mowing & Trimming', season: 'summer', isPopular: true, priority: 4, note: 'Crisp stripes' },
    { id: 'srv-5', name: 'Commercial Snow Clearing', season: 'winter', isPopular: true, priority: 5, note: 'Zero snowpack' },
  ]);

  // Log helper for events
  const logEvent = (type: string, target: string, note: string) => {
    const entry = {
      id: Date.now(),
      type,
      target,
      time: new Date().toLocaleTimeString(),
      note,
    };
    setEventLogs((prev) => [entry, ...prev.slice(0, 5)]);
  };

  // Phase 4 Lab 1: Data Fetching & AbortController state
  const [fetchLocation, setFetchLocation] = useState('Sylvan Lake');
  const [fetchLatency, setFetchLatency] = useState(800);
  const [simulateFetchError, setSimulateFetchError] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState<string | null>(null);
  const [fetchedLawnData, setFetchedLawnData] = useState<{
    location: string;
    temperature: string;
    crewsActive: number;
    nextAvailableSlot: string;
    soilReadiness: string;
  } | null>({
    location: 'Sylvan Lake',
    temperature: '18°C Sunny',
    crewsActive: 4,
    nextAvailableSlot: 'Tomorrow 9:00 AM',
    soilReadiness: 'Optimal (Thawed & Firm)',
  });
  const [abortControllerLogs, setAbortControllerLogs] = useState<string[]>([
    'Initialized AbortController signal listener on mount',
  ]);
  const activeAbortRef = React.useRef<{ abort: () => void; id: number } | null>(null);
  const fetchCounterRef = React.useRef(1);

  const triggerSimulatedFetch = (targetLoc: string, delayMs = fetchLatency, forceError = simulateFetchError) => {
    setFetchLocation(targetLoc);
    setIsFetchingData(true);
    setFetchErrorMsg(null);

    const thisReqId = fetchCounterRef.current++;

    if (activeAbortRef.current) {
      activeAbortRef.current.abort();
      setAbortControllerLogs((prev) => [
        `🚫 [AbortController] Aborted pending Request #${activeAbortRef.current?.id} because Request #${thisReqId} (${targetLoc}) took priority!`,
        ...prev.slice(0, 4),
      ]);
    }

    let isAborted = false;
    const abortFn = () => {
      isAborted = true;
    };
    activeAbortRef.current = { abort: abortFn, id: thisReqId };

    setAbortControllerLogs((prev) => [
      `📡 [HTTP GET] Dispatched Request #${thisReqId} -> /api/availability?loc=${targetLoc} (Latency: ${delayMs}ms)`,
      ...prev.slice(0, 4),
    ]);

    setTimeout(() => {
      if (isAborted) {
        return;
      }
      setIsFetchingData(false);
      activeAbortRef.current = null;

      if (forceError) {
        setFetchErrorMsg(`500 Server Error: Central Alberta weather radar timeout for ${targetLoc}`);
        setAbortControllerLogs((prev) => [
          `❌ [HTTP 500] Request #${thisReqId} failed with server error! Caught in try/catch block.`,
          ...prev.slice(0, 4),
        ]);
      } else {
        setFetchedLawnData({
          location: targetLoc,
          temperature: targetLoc === 'Red Deer' ? '20°C Mild Breeze' : targetLoc === 'Lacombe' ? '17°C Overcast' : '19°C Clear Skies',
          crewsActive: targetLoc === 'Red Deer' ? 6 : targetLoc === 'Lacombe' ? 2 : 4,
          nextAvailableSlot: targetLoc === 'Red Deer' ? 'Today 2:30 PM' : 'Tomorrow 10:00 AM',
          soilReadiness: 'Prime for Aeration & Mowing',
        });
        setAbortControllerLogs((prev) => [
          `✅ [HTTP 200] Request #${thisReqId} delivered fresh state for ${targetLoc} in ${delayMs}ms!`,
          ...prev.slice(0, 4),
        ]);
      }
    }, delayMs);
  };

  // Phase 4 Lab 2: Form Handling & Validation state
  const [formVals, setFormVals] = useState({
    fullName: '',
    phone: '',
    lotSqFt: 2500,
    serviceType: 'power-raking',
  });
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const formValidationErrors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (!formVals.fullName.trim()) {
      errs.fullName = 'Full client name is required';
    } else if (formVals.fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters';
    }

    const phoneRegex = /^[0-9\-\(\)\s]{10,14}$/;
    if (!formVals.phone.trim()) {
      errs.phone = 'Alberta contact phone is required';
    } else if (!phoneRegex.test(formVals.phone)) {
      errs.phone = 'Invalid phone format (e.g. 403-555-0192)';
    }

    if (formVals.lotSqFt < 500) {
      errs.lotSqFt = 'Minimum lot size must be at least 500 sq ft';
    }
    return errs;
  }, [formVals]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched({ fullName: true, phone: true, lotSqFt: true, serviceType: true });
    if (Object.keys(formValidationErrors).length === 0) {
      setFormSubmitted(true);
    }
  };

  // Phase 4 Lab 3: RTL Testing Suite state
  const [rtlTestRunning, setRtlTestRunning] = useState(false);
  const [rtlBookCount, setRtlBookCount] = useState(0);
  const [rtlServiceBooked, setRtlServiceBooked] = useState(false);
  const [rtlIsSubmitting, setRtlIsSubmitting] = useState(false);
  const [rtlTestResults, setRtlTestResults] = useState<
    { id: string; name: string; query: string; status: 'passed' | 'failed' | 'idle'; ms: number }[]
  >([
    { id: 't1', name: 'renders accessible service button by role', query: 'screen.getByRole("button", { name: /power raking/i })', status: 'idle', ms: 4 },
    { id: 't2', name: 'verifies price is displayed in CAD currency', query: 'screen.getByText(/\\$89 CAD/i)', status: 'idle', ms: 2 },
    { id: 't3', name: 'triggers onBook callback with service ID on click', query: 'fireEvent.click(screen.getByRole("button"))', status: 'idle', ms: 8 },
    { id: 't4', name: 'renders loading state and disables button during submit', query: 'expect(button).toBeDisabled()', status: 'idle', ms: 5 },
  ]);

  const runRtlTestSuite = () => {
    setRtlTestRunning(true);
    setTimeout(() => {
      setRtlTestResults((prev) => prev.map((t) => ({ ...t, status: 'passed' })));
      setRtlTestRunning(false);
    }, 600);
  };

  // State batching experiment
  const runDirectIncrementBatch = () => {
    // 3 calls without updater function
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
    setBatchLog((prev) => [
      `Synchronous setCounter(counter + 1) called 3x -> Only incremented by +1 because all 3 calls read the same stale snapshot (${counter})!`,
      ...prev.slice(0, 3),
    ]);
  };

  const runFunctionalUpdaterBatch = () => {
    // 3 calls with updater function (prev => prev + 1)
    setCounter((prev) => prev + 1);
    setCounter((prev) => prev + 1);
    setCounter((prev) => prev + 1);
    setBatchLog((prev) => [
      `Functional setCounter(prev => prev + 1) called 3x -> Incremented by +3 correctly because each updater receives the queued previous state!`,
      ...prev.slice(0, 3),
    ]);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg">
      {/* Playground Header */}
      <div className="px-5 py-3.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            {config.title}
          </h4>
        </div>
        <span className="text-[10px] font-mono bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full">
          Live Interactive Sandbox
        </span>
      </div>

      <div className="p-5 space-y-6">
        <p className="text-xs text-neutral-400">{config.description}</p>

        {/* 1. JSX Expressions Sandbox */}
        {config.type === 'jsx-expressions' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Controls */}
            <div className="lg:col-span-5 bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Expression Inputs (JavaScript Variables)
              </span>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">clientName</label>
                <input
                  type="text"
                  value={jsxState.clientName}
                  onChange={(e) => setJsxState({ ...jsxState, clientName: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">location</label>
                  <input
                    type="text"
                    value={jsxState.location}
                    onChange={(e) => setJsxState({ ...jsxState, location: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">baseFee ($CAD)</label>
                  <input
                    type="number"
                    value={jsxState.baseFee}
                    onChange={(e) => setJsxState({ ...jsxState, baseFee: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-neutral-300">hasSpringDiscount</span>
                <input
                  type="checkbox"
                  checked={jsxState.hasSpringDiscount}
                  onChange={(e) => setJsxState({ ...jsxState, hasSpringDiscount: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Right Live Render & Code output */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white text-neutral-900 p-5 rounded-2xl shadow-sm border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {jsxState.hasSpringDiscount ? 'Spring Special Applied' : 'Standard Rate'}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    📍 {jsxState.location.toUpperCase()}, AB
                  </span>
                </div>

                <h3 className="text-lg font-black text-neutral-900">
                  Lawn Proposal for {jsxState.clientName || 'Valued Client'}
                </h3>

                <div className="my-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-neutral-700 block">
                      {jsxState.service}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Calculated Expression: ${jsxState.baseFee} {jsxState.hasSpringDiscount ? `- 15% discount` : ''}
                    </span>
                  </div>
                  <span className="text-xl font-black text-emerald-700">
                    ${jsxState.hasSpringDiscount ? Math.round(jsxState.baseFee * 0.85) : jsxState.baseFee} CAD
                  </span>
                </div>
              </div>

              {/* Code generation preview */}
              <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                <div className="text-neutral-500 text-[10px] mb-1 font-sans font-bold">
                  JSX Expression Code Being Evaluated:
                </div>
                <code>
                  {`<h3 className="font-bold">Lawn Proposal for {clientName}</h3>\n<span className="price">\${hasSpringDiscount ? Math.round(baseFee * 0.85) : baseFee} CAD</span>`}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* 2. Props Explorer Sandbox */}
        {config.type === 'props-explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Props Sliders & Controls */}
            <div className="lg:col-span-5 bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Component Props Editor
              </span>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">title (string)</label>
                <input
                  type="text"
                  value={propsState.title}
                  onChange={(e) => setPropsState({ ...propsState, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">price (number)</label>
                  <input
                    type="number"
                    value={propsState.price}
                    onChange={(e) => setPropsState({ ...propsState, price: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">variant (union)</label>
                  <select
                    value={propsState.variant}
                    onChange={(e) => setPropsState({ ...propsState, variant: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                  >
                    <option value="primary">primary</option>
                    <option value="secondary">secondary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">badge (string)</label>
                <input
                  type="text"
                  value={propsState.badge}
                  onChange={(e) => setPropsState({ ...propsState, badge: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            {/* Rendered Component & JSX Call */}
            <div className="lg:col-span-7 space-y-4">
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  propsState.variant === 'primary'
                    ? 'bg-white text-neutral-900 border-emerald-600 shadow-md'
                    : 'bg-neutral-800 text-white border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-base">{propsState.title}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                    {propsState.badge}
                  </span>
                </div>
                <p className="text-xs opacity-80 my-2">{propsState.tagline}</p>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-200/40">
                  <span className="text-base font-black">${propsState.price} CAD</span>
                  <button className="px-3.5 py-1 rounded-full bg-[#bef264] text-[#0f2319] text-xs font-bold">
                    Interactive Button
                  </button>
                </div>
              </div>

              {/* Generated Code Preview */}
              <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 font-mono text-[11px] text-emerald-400">
                <div className="text-neutral-500 text-[10px] mb-1 font-sans font-bold">
                  Generated JSX Props Call:
                </div>
                <code>
                  {`<ServiceCard\n  title="${propsState.title}"\n  price={${propsState.price}}\n  badge="${propsState.badge}"\n  variant="${propsState.variant}"\n/>`}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* 3. State Sandbox */}
        {config.type === 'state-sandbox' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Batching & Updater functions experiment */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Counter State:</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">{counter}</span>
                </div>

                <p className="text-[11px] text-neutral-400">
                  Test the difference between direct updates vs functional updaters during asynchronous batching:
                </p>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={runDirectIncrementBatch}
                    className="w-full text-left p-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-200 cursor-pointer"
                  >
                    <span className="font-bold text-amber-400 block">
                      1. Call setCount(count + 1) three times
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Result: Increments only by 1 (reads stale closure)
                    </span>
                  </button>

                  <button
                    onClick={runFunctionalUpdaterBatch}
                    className="w-full text-left p-2.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-950 border border-emerald-600 text-xs text-emerald-200 cursor-pointer"
                  >
                    <span className="font-bold text-emerald-400 block">
                      2. Call setCount(prev =&gt; prev + 1) three times
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Result: Increments by 3 correctly (queued updater)
                    </span>
                  </button>
                </div>
              </div>

              {/* Immutable array state */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Immutable Services Array:</span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {servicesList.length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[40px]">
                  {servicesList.map((svc) => (
                    <span
                      key={svc}
                      className="px-2.5 py-1 bg-emerald-900/60 text-emerald-300 text-xs rounded-full border border-emerald-700 flex items-center gap-1.5"
                    >
                      <span>{svc}</span>
                      <button
                        onClick={() => setServicesList((prev) => prev.filter((s) => s !== svc))}
                        className="hover:text-red-400 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      const newItems = ['Core Aeration', 'Fall Fertilizer', 'Hedge Trimming', 'Mulch Delivery'];
                      const random = newItems[Math.floor(Math.random() * newItems.length)];
                      if (!servicesList.includes(random)) {
                        setServicesList((prev) => [...prev, random]); // Immutable spread
                      }
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    + Add New Service (Spread [...prev, item])
                  </button>
                  <button
                    onClick={() => setServicesList(['Weekly Mowing'])}
                    className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Batch Log Output */}
            {batchLog.length > 0 && (
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-[11px] font-mono space-y-1">
                <span className="text-neutral-500 font-sans font-bold block text-[10px]">
                  Batch Execution Log:
                </span>
                {batchLog.map((log, i) => (
                  <div key={i} className="text-neutral-300">
                    • {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. Events Lab */}
        {config.type === 'events-lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Interactive Form */}
            <div className="lg:col-span-6 bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Synthetic Event Controls
              </span>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">
                  Controlled onChange: {eventInput.length} chars
                </label>
                <input
                  type="text"
                  value={eventInput}
                  onChange={(e) => {
                    setEventInput(e.target.value);
                    logEvent('onChange', 'HTMLInputElement', `Value updated to: "${e.target.value}"`);
                  }}
                  className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Select Service</label>
                <select
                  value={selectedServiceEvent}
                  onChange={(e) => {
                    setSelectedServiceEvent(e.target.value);
                    logEvent('onChange', 'HTMLSelectElement', `Selected option: "${e.target.value}"`);
                  }}
                  className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                >
                  <option value="Power Raking">Power Raking</option>
                  <option value="Fertilizing">Fertilizing</option>
                  <option value="Snow Removal">Snow Removal</option>
                </select>
              </div>

              {/* Prevent default toggle */}
              <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300 font-bold">e.preventDefault() in onSubmit:</span>
                  <input
                    type="checkbox"
                    checked={preventDefaultEnabled}
                    onChange={(e) => setPreventDefaultEnabled(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-neutral-400">
                  {preventDefaultEnabled
                    ? '✓ Form stays in SPA mode without reloading the page.'
                    : '⚠️ Unchecked: standard HTML form submission would refresh the page!'}
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  if (preventDefaultEnabled) {
                    e.preventDefault();
                    logEvent('onSubmit', 'HTMLFormElement', 'e.preventDefault() called! State preserved.');
                  } else {
                    logEvent('onSubmit', 'HTMLFormElement', 'WARNING: Browser default would reload!');
                  }
                }}
              >
                <button
                  type="submit"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Test Form Submit Handler
                </button>
              </form>
            </div>

            {/* Live Synthetic Event Stream */}
            <div className="lg:col-span-6 bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2 font-mono text-[11px]">
              <span className="text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-wider block">
                Live SyntheticEvent Logger
              </span>

              {eventLogs.length === 0 ? (
                <div className="p-6 text-center text-neutral-600 font-sans text-xs">
                  Type in the input or submit the form to see SyntheticEvents log in real time.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {eventLogs.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 space-y-0.5"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-bold">event: {entry.type}</span>
                        <span className="text-neutral-500">{entry.time}</span>
                      </div>
                      <div className="text-neutral-400 text-[10px]">target: {entry.target}</div>
                      <div className="text-white text-[11px] font-sans">{entry.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Lists & Conditionals */}
        {config.type === 'lists-conditionals' && (
          <div className="space-y-4">
            {/* Filter controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-neutral-400 font-bold mr-1">Filter Season:</span>
                {['all', 'spring', 'summer', 'winter'].map((season) => (
                  <button
                    key={season}
                    onClick={() => setSeasonFilter(season)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition-colors cursor-pointer ${
                      seasonFilter === season
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-300">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyPopular}
                    onChange={(e) => setOnlyPopular(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <span>Popular Only</span>
                </label>

                <div className="flex items-center gap-1 text-[11px] bg-neutral-900 px-2 py-1 rounded border border-neutral-800">
                  <span className="text-neutral-500">Key:</span>
                  <button
                    onClick={() => setKeyStrategy('stable-id')}
                    className={`px-1.5 py-0.5 rounded ${keyStrategy === 'stable-id' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-neutral-400'}`}
                  >
                    key=&#123;item.id&#125;
                  </button>
                  <button
                    onClick={() => setKeyStrategy('array-index')}
                    className={`px-1.5 py-0.5 rounded ${keyStrategy === 'array-index' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-neutral-400'}`}
                  >
                    key=&#123;index&#125;
                  </button>
                </div>
              </div>
            </div>

            {/* List Output */}
            <div className="space-y-2">
              {servicesData
                .filter((s) => seasonFilter === 'all' || s.season === seasonFilter)
                .filter((s) => !onlyPopular || s.isPopular)
                .map((item, index) => {
                  const keyUsed = keyStrategy === 'stable-id' ? item.id : index;
                  return (
                    <div
                      key={keyUsed}
                      className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center font-mono text-[10px] text-neutral-400">
                          {index + 1}
                        </span>
                        <div>
                          <span className="font-bold text-white block">{item.name}</span>
                          <span className="text-[10px] text-neutral-500 uppercase">{item.season} · {item.note}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.isPopular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            ★ POPULAR
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-neutral-500">
                          {keyStrategy === 'stable-id' ? `key="${item.id}"` : `key={${index}}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 6. Phase 2: Effects Lab */}
        {config.type === 'effects-lab' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Active Effect Simulator:</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    Running in Browser
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 block">Simulated Dispatch Timer</span>
                    <span className="text-xl font-mono font-black text-emerald-400">
                      Elapsed: {counter}s
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCounter((c) => c + 1)}
                      className="px-2.5 py-1 bg-emerald-700 text-white rounded text-xs font-bold cursor-pointer"
                    >
                      + Tick
                    </button>
                    <button
                      onClick={() => setCounter(0)}
                      className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-xs cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-300">
                  <span className="font-bold text-neutral-400 block text-[10px] uppercase tracking-wider">
                    Experiment Controls:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        logEvent(
                          'cleanup',
                          'useEffect',
                          'Cleanup callback executed! Destroyed previous interval before unmount.'
                        )
                      }
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-xs cursor-pointer"
                    >
                      Simulate Component Unmount
                    </button>
                    <button
                      onClick={() =>
                        logEvent(
                          'mount',
                          'useEffect',
                          'Effect executed on mount: interval initialized with 1000ms delay.'
                        )
                      }
                      className="px-3 py-1.5 bg-emerald-950 border border-emerald-700 rounded-lg text-xs text-emerald-300 cursor-pointer"
                    >
                      Simulate Re-mount
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time effect lifecycle log */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2 font-mono text-[11px]">
                <span className="text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-wider block">
                  useEffect Execution & Cleanup Log:
                </span>
                <div className="space-y-1.5">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-emerald-400">
                    [Render Phase]: DOM painted.
                  </div>
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-white">
                    [Effect Phase]: intervalId = setInterval(..., 1000) active.
                  </div>
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-amber-400">
                    [Cleanup Phase]: return () =&gt; clearInterval(intervalId) registered.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. Phase 2: Refs & DOM Lab */}
        {config.type === 'refs-dom-lab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-white block">
                  Imperative DOM Manipulation via inputRef.current
                </span>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Direct HTMLInputElement:
                  </label>
                  <input
                    id="lab-dom-input"
                    type="text"
                    defaultValue="42 Lakeshore Dr, Sylvan Lake, AB"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white focus:outline-emerald-500 font-mono"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      const el = document.getElementById('lab-dom-input') as HTMLInputElement;
                      el?.focus();
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    inputRef.current.focus()
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('lab-dom-input') as HTMLInputElement;
                      el?.select();
                    }}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    inputRef.current.select()
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('lab-dom-input') as HTMLInputElement;
                      if (el) el.value = '';
                    }}
                    className="px-3 py-1.5 bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 rounded-lg text-xs cursor-pointer"
                  >
                    Clear DOM Directly
                  </button>
                </div>
              </div>

              {/* Mutable value ref without re-renders */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Mutable Ref vs useState Comparison
                  </span>
                  <span className="font-mono text-emerald-400 text-xs font-bold">
                    useRef.current
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Component Render Count:</span>
                    <span className="font-mono font-bold text-amber-400">1 (Unchanged by ref mutations!)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Stored Interval ID in ref:</span>
                    <span className="font-mono text-neutral-300">#4021</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed pt-1">
                    When you mutate <code>ref.current = value</code>, React does NOT trigger a re-render. It is perfect for timer IDs and render profiling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. Phase 2: State Lifting Lab */}
        {config.type === 'state-lifting-lab' && (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Parent Coordinator: &lt;YardQuoterCoordinator /&gt;
                </span>
                <span className="text-neutral-400 font-mono">
                  Lifted State: lotSize = &quot;{propsState.variant}&quot;
                </span>
              </div>

              {/* Visual Component Tree with arrows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Child A (Selector) */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-400">Sibling A: &lt;LotSelector /&gt;</span>
                    <span className="text-neutral-500">Sends Event Up ↑</span>
                  </div>
                  <div className="flex gap-1.5">
                    {['standard', 'large', 'acreage'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setPropsState({ ...propsState, variant: size })}
                        className={`px-3 py-1.5 rounded-lg text-xs capitalize font-bold transition-colors cursor-pointer ${
                          propsState.variant === size
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Child B (Summary) */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-400">Sibling B: &lt;LiveEstimateBadge /&gt;</span>
                    <span className="text-neutral-500">Receives Prop Down ↓</span>
                  </div>
                  <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-neutral-400 capitalize">{propsState.variant} Lot Rate:</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      ${propsState.variant === 'standard' ? 45 : propsState.variant === 'large' ? 65 : 120} CAD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 9. Phase 2: Context API Lab */}
        {config.type === 'context-lab' && (
          <div className="space-y-4">
            {/* Provider Root Controller */}
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  &lt;BranchContext.Provider value=&#123;activeBranch&#125;&gt;
                </span>
                <span className="text-xs text-neutral-400">No prop drilling!</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-neutral-400">Switch Alberta Branch:</span>
                {['Sylvan Lake', 'Red Deer', 'Lacombe', 'Blackfalds'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setEventInput(city)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      eventInput === city
                        ? 'bg-[#bef264] text-[#0f2319] shadow-sm'
                        : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                    }`}
                  >
                    📍 {city}
                  </button>
                ))}
              </div>

              {/* 3 Consumers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                  <span className="text-[10px] text-neutral-500 font-bold block mb-1">
                    Consumer 1: Header Badge
                  </span>
                  <div className="text-white font-bold">{eventInput} Main HQ</div>
                  <span className="text-neutral-400 text-[11px] block mt-0.5">
                    {eventInput === 'Red Deer' ? '+1 (403) 346-0000' : '+1 (780) 782-9393'}
                  </span>
                </div>

                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                  <span className="text-[10px] text-neutral-500 font-bold block mb-1">
                    Consumer 2: Local Quoter
                  </span>
                  <div className="text-emerald-400 font-bold">{eventInput} Resident Rate</div>
                  <span className="text-neutral-400 text-[11px] block mt-0.5">5% Alberta GST</span>
                </div>

                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
                  <span className="text-[10px] text-neutral-500 font-bold block mb-1">
                    Consumer 3: Winter Dispatch
                  </span>
                  <div className="text-amber-400 font-bold">Guaranteed 24h Trigger</div>
                  <span className="text-neutral-400 text-[11px] block mt-0.5">Within {eventInput} limits</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 10. Phase 2: Custom Hooks Lab */}
        {config.type === 'custom-hooks-lab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* useLocalStorage Simulator */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">useLocalStorage(&apos;lawn_notes&apos;)</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    Persistent Storage
                  </span>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Yard Special Instructions (Auto-saved):
                  </label>
                  <textarea
                    value={eventInput}
                    onChange={(e) => setEventInput(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="p-2.5 rounded bg-neutral-900 text-[11px] font-mono text-neutral-400">
                  localStorage[&apos;lawn_notes&apos;] = &quot;{eventInput}&quot;
                </div>
              </div>

              {/* useDebounce Simulator */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">useDebounce(search, 300ms)</span>
                  <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-mono">
                    Rate Limiter
                  </span>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Type fast in Search Input:
                  </label>
                  <input
                    type="text"
                    value={selectedServiceEvent}
                    onChange={(e) => setSelectedServiceEvent(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="p-2.5 rounded bg-neutral-900 text-xs space-y-1">
                  <div className="flex justify-between text-neutral-400">
                    <span>Raw Input Keystroke:</span>
                    <span className="font-mono text-white">&quot;{selectedServiceEvent}&quot;</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Debounced API Trigger:</span>
                    <span className="font-mono text-emerald-400">&quot;{selectedServiceEvent}&quot;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 11. Phase 2: Controlled vs Uncontrolled Lab */}
        {config.type === 'controlled-uncontrolled-lab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Controlled Form */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Controlled Form</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                    value + onChange
                  </span>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Postal Code (Instant formatting):</label>
                  <input
                    type="text"
                    value={eventInput}
                    onChange={(e) => {
                      setEventInput(e.target.value.toUpperCase());
                      setCounter((c) => c + 1); // Track render
                    }}
                    placeholder="e.g. T4S 1Z5"
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white uppercase font-mono"
                  />
                </div>

                <div className="p-2.5 bg-neutral-900 rounded-lg text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>Keystroke Render Count:</span>
                  <span className="font-mono font-bold text-emerald-400">{counter} renders</span>
                </div>
              </div>

              {/* Uncontrolled Form */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Uncontrolled Form</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                    defaultValue + FormData
                  </span>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Client Address (Zero typing re-renders):</label>
                  <input
                    defaultValue="102 50th Street, Sylvan Lake, AB"
                    className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs text-white font-mono"
                  />
                </div>

                <div className="p-2.5 bg-neutral-900 rounded-lg text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>Keystroke Render Count:</span>
                  <span className="font-mono font-bold text-amber-400">0 (DOM stores value)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12. Phase 3: Memo Benchmark Lab */}
        {config.type === 'memo-benchmark-lab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-white block">
                  Parent State & Memoization Toggles
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCounter((c) => c + 1);
                      if (!propsState.isAvailable) {
                        setPropsState((p: any) => ({ ...p, price: (p.price || 0) + 1 }));
                      }
                    }}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Rerender Parent (Tick #{counter})
                  </button>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-neutral-900 rounded-lg border border-neutral-800">
                    <span className="text-neutral-300 font-semibold">Enable React.memo on Child:</span>
                    <input
                      type="checkbox"
                      checked={propsState.isAvailable}
                      onChange={(e) => setPropsState({ ...propsState, isAvailable: e.target.checked })}
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <p className="text-[11px] text-neutral-400">
                    {propsState.isAvailable
                      ? '✓ React.memo active: Child compares props and SKIPS re-renders when parent ticks.'
                      : '⚠️ React.memo OFF: Child re-renders on EVERY parent tick even though props are identical!'}
                  </p>
                </div>
              </div>

              {/* Child Render Metrics */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Child Row Component Metrics</span>
                  <span className="font-mono text-emerald-400 text-xs font-bold">
                    &lt;MemoizedServiceRow /&gt;
                  </span>
                </div>

                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Child Render Count:</span>
                    <span className="font-mono font-black text-amber-400">
                      {propsState.isAvailable ? '1 (Skipped redundant renders)' : `${counter} (Re-rendered every tick!)`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Referential Comparison:</span>
                    <span className="font-mono text-emerald-300">
                      {propsState.isAvailable ? 'prevProps === nextProps (true)' : 'No shallow comparison'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 13. Phase 3: Code Splitting & Suspense Lab */}
        {config.type === 'lazy-suspense-lab' && (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Dynamic import() &amp; &lt;Suspense fallback=...&gt;
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Simulate lazy loading a heavy 340KB 3D Yard Estimator chunk on demand.
                  </span>
                </div>
                <button
                  onClick={() => {
                    setPreventDefaultEnabled(false);
                    setTimeout(() => setPreventDefaultEnabled(true), 900);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Load Lazy Component Chunk
                </button>
              </div>

              {/* Simulation Canvas */}
              <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 min-h-[140px] flex items-center justify-center">
                {!preventDefaultEnabled ? (
                  /* Suspense Skeleton Fallback */
                  <div className="w-full max-w-md space-y-2.5 animate-pulse">
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>&lt;Suspense fallback&gt;: Downloading lazy chunk over network...</span>
                    </div>
                    <div className="h-4 bg-neutral-800 rounded w-2/3" />
                    <div className="h-12 bg-neutral-800 rounded w-full" />
                  </div>
                ) : (
                  /* Loaded Chunk View */
                  <div className="w-full text-center space-y-2 text-xs">
                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 inline-flex items-center justify-center font-bold">
                      ✓
                    </span>
                    <h5 className="font-bold text-white">3D Alberta Yard Visualizer Loaded!</h5>
                    <p className="text-neutral-400 text-[11px]">
                      Chunk (342 KB) resolved and hydrated via React.lazy without blocking initial page paint.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 14. Phase 3: useReducer State Machine Lab */}
        {config.type === 'reducer-imperative-lab' && (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">
                  useReducer State Machine (Step {counter} of 3)
                </span>
                <span className="font-mono text-emerald-400 font-bold uppercase">
                  Status: {counter === 3 ? 'Confirmed' : 'Draft'}
                </span>
              </div>

              {/* State Machine Step Viewer */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { step: 1, title: '1. Lot Sizing' },
                  { step: 2, title: '2. Services' },
                  { step: 3, title: '3. Booking' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className={`p-2.5 rounded-lg border text-center text-xs font-bold transition-all ${
                      counter === s.step
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    }`}
                  >
                    {s.title}
                  </div>
                ))}
              </div>

              {/* Action Dispatch Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setCounter((c) => Math.max(1, c - 1))}
                  disabled={counter === 1}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-neutral-300 rounded-lg text-xs font-bold cursor-pointer"
                >
                  dispatch(&#123; type: &apos;PREV_STEP&apos; &#125;)
                </button>
                <button
                  onClick={() => setCounter((c) => Math.min(3, c + 1))}
                  disabled={counter === 3}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  dispatch(&#123; type: &apos;NEXT_STEP&apos; &#125;)
                </button>
                <button
                  onClick={() => setCounter(1)}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs cursor-pointer ml-auto"
                >
                  dispatch(&#123; type: &apos;RESET&apos; &#125;)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 15. Phase 3: Error Boundary Lab */}
        {config.type === 'error-boundary-lab' && (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">
                  &lt;LawnBusterErrorBoundary&gt; Fault Isolation
                </span>
                <span className="text-[11px] text-neutral-400">
                  componentDidCatch &amp; getDerivedStateFromError
                </span>
              </div>

              <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                {preventDefaultEnabled ? (
                  <div className="p-4 bg-red-950/40 border border-red-700/60 rounded-xl text-xs space-y-2 text-red-200">
                    <div className="flex items-center gap-2 font-bold text-red-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Boundary Caught Render Crash: TypeError in WeatherWidget</span>
                    </div>
                    <p className="text-[11px] text-neutral-300">
                      The crash was isolated to this single card. The rest of the app remained 100% interactive!
                    </p>
                    <button
                      onClick={() => setPreventDefaultEnabled(false)}
                      className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs font-bold cursor-pointer"
                    >
                      Retry &amp; Reset Boundary
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300">
                      Weather Radar Widget: Sunny 21°C · Sylvan Lake
                    </span>
                    <button
                      onClick={() => setPreventDefaultEnabled(true)}
                      className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-red-400 rounded text-xs font-bold cursor-pointer"
                    >
                      Trigger Simulated Crash
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 16. Phase 3: Compound Components Lab */}
        {config.type === 'compound-components-lab' && (
          <div className="space-y-4">
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">
                  Compound Component: &lt;Accordion&gt; &amp; &lt;Accordion.Item&gt;
                </span>
                <span className="text-neutral-400 text-[11px]">
                  Implicit State Shared via Private Context
                </span>
              </div>

              {/* Interactive Compound Items */}
              <div className="space-y-2">
                {[
                  {
                    id: 'aeration',
                    title: 'Why is core aeration essential in Central Alberta?',
                    content: 'Core aeration pulls 2.5-inch plugs to relieve compacted clay soil, allowing water, oxygen, and root nutrients to penetrate deep.',
                  },
                  {
                    id: 'raking',
                    title: 'When is the best week for spring power raking?',
                    content: 'Early May once snowpack is completely melted and the turf surface has dried enough to prevent tearing root crowns.',
                  },
                ].map((item) => {
                  const isOpen = seasonFilter === item.id;
                  return (
                    <div
                      key={item.id}
                      className="rounded-xl border border-neutral-800 overflow-hidden bg-neutral-900"
                    >
                      <button
                        onClick={() => setSeasonFilter(isOpen ? '' : item.id)}
                        className="w-full p-3 text-left font-bold text-xs flex items-center justify-between text-white hover:bg-neutral-800/60 cursor-pointer"
                      >
                        <span>&lt;Accordion.Trigger&gt;: {item.title}</span>
                        <span className="text-emerald-400 font-mono">{isOpen ? '▲' : '▼'}</span>
                      </button>
                      {isOpen && (
                        <div className="p-3 bg-neutral-950/80 text-xs text-neutral-300 border-t border-neutral-800">
                          {item.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 17. Phase 4: Data Fetching & AbortController Lab */}
        {config.type === 'data-fetching-lab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Controls Column */}
              <div className="lg:col-span-5 bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Network Request Dispatcher
                </span>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Select Location (Triggers Fetch):
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Sylvan Lake', 'Red Deer', 'Lacombe'].map((loc) => (
                      <button
                        key={loc}
                        onClick={() => triggerSimulatedFetch(loc)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          fetchLocation === loc
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rapid Query Burst Button to demo AbortController */}
                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> Race Condition Simulator
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Click to dispatch 3 rapid sequential queries. Watch AbortController instantly cancel queries #1 and #2 so query #3 wins!
                  </p>
                  <button
                    onClick={() => {
                      triggerSimulatedFetch('Sylvan Lake', 1200);
                      setTimeout(() => triggerSimulatedFetch('Red Deer', 900), 150);
                      setTimeout(() => triggerSimulatedFetch('Lacombe', 400), 300);
                    }}
                    className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    🚀 Trigger Rapid Query Burst (3x)
                  </button>
                </div>

                {/* Toggles */}
                <div className="space-y-2 pt-1 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300">Simulate 500 Network Error</span>
                    <input
                      type="checkbox"
                      checked={simulateFetchError}
                      onChange={(e) => setSimulateFetchError(e.target.checked)}
                      className="w-4 h-4 accent-red-500 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                      <span>Simulated Latency</span>
                      <span className="font-mono text-emerald-400">{fetchLatency}ms</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="2000"
                      step="100"
                      value={fetchLatency}
                      onChange={(e) => setFetchLatency(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Live UI State & Cancellation Log Column */}
              <div className="lg:col-span-7 space-y-3">
                {/* Visual Component Under Test */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      Lawn Crew Live Radar: {fetchLocation}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isFetchingData
                        ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                        : fetchErrorMsg
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {isFetchingData ? 'STATUS: FETCHING...' : fetchErrorMsg ? 'STATUS: ERROR' : 'STATUS: SYNCED'}
                    </span>
                  </div>

                  {/* Tri-state UI renderer */}
                  {isFetchingData ? (
                    <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 animate-pulse space-y-2.5">
                      <div className="h-4 bg-neutral-800 rounded w-1/3" />
                      <div className="h-3 bg-neutral-800 rounded w-2/3" />
                      <div className="h-8 bg-neutral-800 rounded w-full" />
                    </div>
                  ) : fetchErrorMsg ? (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-700/60 text-xs text-red-200 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-red-400">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Failed to fetch location schedule</span>
                      </div>
                      <p className="text-[11px] text-neutral-300">{fetchErrorMsg}</p>
                      <button
                        onClick={() => triggerSimulatedFetch(fetchLocation, fetchLatency, false)}
                        className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-xs font-bold cursor-pointer"
                      >
                        Retry Request
                      </button>
                    </div>
                  ) : fetchedLawnData ? (
                    <div className="p-4 rounded-xl bg-neutral-900 border border-emerald-900/40 text-xs space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-800">
                          <span className="text-neutral-500 block text-[10px]">Conditions</span>
                          <span className="font-bold text-white">{fetchedLawnData.temperature}</span>
                        </div>
                        <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-800">
                          <span className="text-neutral-500 block text-[10px]">Active Crews</span>
                          <span className="font-bold text-emerald-400">{fetchedLawnData.crewsActive} Dispatched</span>
                        </div>
                        <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-800">
                          <span className="text-neutral-500 block text-[10px]">Earliest Booking</span>
                          <span className="font-bold text-white">{fetchedLawnData.nextAvailableSlot}</span>
                        </div>
                        <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-800">
                          <span className="text-neutral-500 block text-[10px]">Soil Status</span>
                          <span className="font-bold text-amber-300">{fetchedLawnData.soilReadiness}</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* AbortController Real-Time Activity Log */}
                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-neutral-400 text-[10px] font-sans font-bold">
                    <span>AbortController Telemetry Log</span>
                    <span className="text-emerald-400">Web API signal</span>
                  </div>
                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {abortControllerLogs.map((log, i) => (
                      <div
                        key={i}
                        className={`p-1.5 rounded text-[10px] ${
                          log.includes('🚫')
                            ? 'bg-amber-950/40 text-amber-300 border border-amber-800/50'
                            : log.includes('❌')
                            ? 'bg-red-950/40 text-red-300'
                            : log.includes('✅')
                            ? 'bg-emerald-950/40 text-emerald-300'
                            : 'bg-neutral-900 text-neutral-400'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 18. Phase 4: Form Validation Lab */}
        {config.type === 'form-validation-lab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Form Input Column */}
              <div className="lg:col-span-6 bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    Quote Submission Form
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    Touched &amp; Blur Validation
                  </span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3">
                  {/* Full Name Field */}
                  <div>
                    <label className="text-[11px] text-neutral-300 font-semibold block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Liam MacDonald"
                      value={formVals.fullName}
                      onChange={(e) => setFormVals({ ...formVals, fullName: e.target.value })}
                      onBlur={() => setFormTouched((prev) => ({ ...prev, fullName: true }))}
                      className={`w-full px-3 py-1.5 rounded-lg text-xs bg-neutral-900 text-white border transition-colors ${
                        formTouched.fullName && formValidationErrors.fullName
                          ? 'border-red-500 bg-red-950/20'
                          : formTouched.fullName && !formValidationErrors.fullName
                          ? 'border-emerald-500'
                          : 'border-neutral-800'
                      }`}
                    />
                    {formTouched.fullName && formValidationErrors.fullName && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <X className="w-3 h-3" /> {formValidationErrors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="text-[11px] text-neutral-300 font-semibold block mb-1">
                      Alberta Phone Number *
                    </label>
                    <input
                      type="text"
                      placeholder="403-555-0192"
                      value={formVals.phone}
                      onChange={(e) => setFormVals({ ...formVals, phone: e.target.value })}
                      onBlur={() => setFormTouched((prev) => ({ ...prev, phone: true }))}
                      className={`w-full px-3 py-1.5 rounded-lg text-xs bg-neutral-900 text-white border transition-colors ${
                        formTouched.phone && formValidationErrors.phone
                          ? 'border-red-500 bg-red-950/20'
                          : formTouched.phone && !formValidationErrors.phone
                          ? 'border-emerald-500'
                          : 'border-neutral-800'
                      }`}
                    />
                    {formTouched.phone && formValidationErrors.phone && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <X className="w-3 h-3" /> {formValidationErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Lot Size Field */}
                  <div>
                    <div className="flex justify-between text-[11px] text-neutral-300 mb-1">
                      <span className="font-semibold">Lot Size (sq ft)</span>
                      <span className="font-mono text-emerald-400">{formVals.lotSqFt.toLocaleString()} sq ft</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="8000"
                      step="100"
                      value={formVals.lotSqFt}
                      onChange={(e) => setFormVals({ ...formVals, lotSqFt: Number(e.target.value) })}
                      onBlur={() => setFormTouched((prev) => ({ ...prev, lotSqFt: true }))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    {formTouched.lotSqFt && formValidationErrors.lotSqFt && (
                      <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1">
                        <X className="w-3 h-3" /> {formValidationErrors.lotSqFt}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-md mt-2"
                  >
                    Submit Booking Request
                  </button>
                </form>

                {formSubmitted && (
                  <div className="p-3 bg-emerald-950/50 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Booking passed schema validation and was successfully submitted!</span>
                  </div>
                )}
              </div>

              {/* State Inspector Column */}
              <div className="lg:col-span-6 bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3 font-mono text-[11px]">
                <div className="flex items-center justify-between text-neutral-400 text-[10px] font-sans font-bold">
                  <span>Form State Inspector (Values, Touched &amp; Errors)</span>
                  <span className="text-amber-400">Pure Validation Pattern</span>
                </div>

                <div className="space-y-2 text-[10px]">
                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800">
                    <span className="text-neutral-500 block mb-1 font-bold text-[9px] uppercase">
                      values:
                    </span>
                    <pre className="text-emerald-400 overflow-x-auto">
                      {JSON.stringify(formVals, null, 2)}
                    </pre>
                  </div>

                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800">
                    <span className="text-neutral-500 block mb-1 font-bold text-[9px] uppercase">
                      touched:
                    </span>
                    <pre className="text-amber-300 overflow-x-auto">
                      {JSON.stringify(formTouched, null, 2)}
                    </pre>
                  </div>

                  <div className="p-2.5 bg-neutral-900 rounded-lg border border-neutral-800">
                    <span className="text-neutral-500 block mb-1 font-bold text-[9px] uppercase">
                      errors:
                    </span>
                    <pre className="text-red-300 overflow-x-auto">
                      {JSON.stringify(formValidationErrors, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 19. Phase 4: React Testing Library Lab */}
        {config.type === 'testing-rtl-lab' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Component Under Test Column */}
              <div className="lg:col-span-5 bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Component Under Test: &lt;ServiceQuoteCard /&gt;
                </span>

                <div className="p-4 bg-white text-neutral-900 rounded-xl shadow-sm border border-neutral-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Central Alberta Special
                    </span>
                    <span className="text-xs text-neutral-500">In Stock</span>
                  </div>

                  <div>
                    <h4 className="font-black text-sm text-neutral-900">Spring Power Raking</h4>
                    <p className="text-xs text-neutral-600">Removes lawn thatch and dead turf needles.</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <span className="text-sm font-black text-neutral-900">$89 CAD</span>
                    <button
                      onClick={() => {
                        setRtlIsSubmitting(true);
                        setTimeout(() => {
                          setRtlIsSubmitting(false);
                          setRtlServiceBooked(true);
                          setRtlBookCount((c) => c + 1);
                        }, 500);
                      }}
                      disabled={rtlIsSubmitting}
                      className="px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      {rtlIsSubmitting ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : rtlServiceBooked ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Booked! ({rtlBookCount})</span>
                        </>
                      ) : (
                        <span>Book Power Raking</span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-[11px] space-y-1">
                  <span className="font-bold text-white block">Accessibility Roles Exposed:</span>
                  <div className="text-neutral-400 font-mono text-[10px] space-y-0.5">
                    <div>role=&quot;button&quot; (name: &quot;Book Power Raking&quot;)</div>
                    <div>role=&quot;heading&quot; (level: 4, &quot;Spring Power Raking&quot;)</div>
                  </div>
                </div>
              </div>

              {/* Automated RTL Test Runner Suite */}
              <div className="lg:col-span-7 bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Jest + React Testing Library Virtual Suite
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Behavioral Assertion Runner
                    </span>
                  </div>

                  <button
                    onClick={runRtlTestSuite}
                    disabled={rtlTestRunning}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 shadow"
                  >
                    <Play className="w-3 h-3" />
                    <span>{rtlTestRunning ? 'Running Tests...' : 'Run Test Suite'}</span>
                  </button>
                </div>

                {/* Test Results List */}
                <div className="space-y-2">
                  {rtlTestResults.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {t.status === 'passed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-neutral-700" />
                          )}
                          <span className="font-bold text-neutral-200">{t.name}</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-500">{t.ms}ms</span>
                      </div>
                      <div className="pl-6 font-mono text-[10px] text-emerald-400/90 overflow-x-auto">
                        <code>{t.query}</code>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RTL Philosophy Tip */}
                <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800/80 text-[11px] text-neutral-300 space-y-1">
                  <strong className="text-amber-400 block text-xs">Query Priority Rule:</strong>
                  <p className="text-[10px] leading-relaxed text-neutral-400">
                    Always prefer <code className="text-white">getByRole</code> with accessible name over <code className="text-white">getByTestId</code>. This guarantees your code works for all users including screen-reader devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

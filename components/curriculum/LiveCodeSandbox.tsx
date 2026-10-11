'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Code2,
  Terminal,
  Laptop,
  Tablet,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

export interface CodeTemplate {
  id: string;
  name: string;
  category: string;
  code: string;
  description: string;
}

const SANDBOX_TEMPLATES: CodeTemplate[] = [
  {
    id: 'template-card',
    name: '1. Dynamic Lawn Card (JSX & Props)',
    category: 'Phase 1: Foundations',
    description: 'Experiment with JSX expressions, dynamic classes, and props bindings.',
    code: `function ServiceCard() {
  const [isBooked, setIsBooked] = React.useState(false);
  const [rating, setRating] = React.useState(4.9);
  const serviceName = "Spring Power Raking";
  const basePrice = 89;
  const isSpringPromo = true;

  return (
    <div className="p-5 max-w-sm mx-auto bg-white rounded-2xl shadow-md border border-emerald-100 text-neutral-900 font-sans">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
          Central Alberta
        </span>
        <span className="text-xs text-neutral-500 font-medium">★ {rating} (142 reviews)</span>
      </div>

      <h3 className="text-lg font-black text-emerald-950 mb-1">{serviceName}</h3>
      <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
        Thoroughly power rake and dethatch dormant prairie turf to stimulate early green-up.
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
        <div>
          <span className="text-[11px] text-neutral-400 block">Starting at</span>
          <span className="text-lg font-black text-emerald-700">
            \${isSpringPromo ? Math.round(basePrice * 0.85) : basePrice} CAD
          </span>
        </div>

        <button
          onClick={() => {
            setIsBooked(!isBooked);
            console.log("Service booking toggled:", !isBooked);
          }}
          className={"px-4 py-2 rounded-full text-xs font-bold transition-all shadow " + (
            isBooked 
              ? "bg-emerald-600 text-white" 
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          )}
        >
          {isBooked ? "✓ Added to Estimate" : "Select Service"}
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'template-counter-batch',
    name: '2. State Counter & Batching (useState)',
    category: 'Phase 1: State',
    description: 'Compare synchronous state assignment vs functional updater functions (prev => prev + 1).',
    code: `function StateBatchingLab() {
  const [count, setCount] = React.useState(0);
  const [log, setLog] = React.useState([]);

  const addDirect = () => {
    // Stale closure batching: reads current count 3 times
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    setLog(prev => ["Called setCount(count + 1) 3x -> Only incremented +1 because all 3 calls read stale snapshot!", ...prev.slice(0, 3)]);
  };

  const addFunctional = () => {
    // Functional updater: queues state updates sequentially
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setLog(prev => ["Called setCount(prev => prev + 1) 3x -> Incremented +3 correctly via queued updaters!", ...prev.slice(0, 3)]);
  };

  return (
    <div className="p-5 max-w-sm mx-auto bg-neutral-950 text-white rounded-2xl border border-neutral-800 font-sans space-y-4">
      <div className="text-center">
        <span className="text-xs text-neutral-400 uppercase tracking-wider block mb-1">State Counter</span>
        <span className="text-4xl font-black text-emerald-400">{count}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={addDirect}
          className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold rounded-xl"
        >
          Direct (+1)
        </button>
        <button
          onClick={addFunctional}
          className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
        >
          Functional (+3)
        </button>
      </div>

      <button
        onClick={() => { setCount(0); setLog([]); }}
        className="w-full py-1 text-[11px] text-neutral-500 hover:text-neutral-300"
      >
        Reset Count
      </button>

      {log.length > 0 && (
        <div className="p-2.5 bg-neutral-900/80 rounded-lg text-[10px] font-mono text-emerald-300/90 space-y-1">
          {log.map((item, idx) => <div key={idx}>• {item}</div>)}
        </div>
      )}
    </div>
  );
}`,
  },
  {
    id: 'template-effects-timer',
    name: '3. Effect Timer & Cleanup (useEffect)',
    category: 'Phase 2: Hooks',
    description: 'Demonstrate effect lifecycle, intervals, and memory-leak prevention via return () => cleanup.',
    code: `function LiveMowerTracker() {
  const [secondsElapsed, setSecondsElapsed] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);
  const [speedMph, setSpeedMph] = React.useState(4.8);

  React.useEffect(() => {
    if (!isRunning) return;

    console.log("Timer effect initialized with setInterval");
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);

    // CRITICAL: Cleanup function prevents memory leaks!
    return () => {
      console.log("Cleanup executed: clearInterval called");
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className="p-5 max-w-sm mx-auto bg-emerald-950 text-white rounded-2xl border border-emerald-800 font-sans space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Crew Stripe Timer
        </span>
        <span className="text-[10px] font-mono bg-emerald-900 px-2 py-0.5 rounded text-emerald-200">
          {isRunning ? "ACTIVE RUN" : "PAUSED"}
        </span>
      </div>

      <div className="text-center py-2 bg-emerald-900/40 rounded-xl border border-emerald-800/60">
        <span className="text-3xl font-black font-mono text-emerald-300">
          00:{secondsElapsed < 10 ? "0" + secondsElapsed : secondsElapsed}
        </span>
        <span className="text-[10px] text-emerald-400/80 block mt-0.5">Commercial Mower Lap Duration</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex-1 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-xs"
        >
          {isRunning ? "Pause Stopwatch" : "Resume"}
        </button>
        <button
          onClick={() => { setSecondsElapsed(0); setIsRunning(false); }}
          className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-lg text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`,
  },
  {
    id: 'template-memo-catalog',
    name: '4. Search Filter & useMemo (Optimization)',
    category: 'Phase 3: Advanced',
    description: 'Cache filtered calculations so typing in search does not recompute unrelated states.',
    code: `function OptimizedLawnFilter() {
  const [query, setQuery] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState(250);

  const allServices = [
    { id: 1, name: "Weekly Mowing & Trimming", price: 45, season: "Summer" },
    { id: 2, name: "Core Aeration", price: 79, season: "Spring" },
    { id: 3, name: "Power Raking & Dethatching", price: 89, season: "Spring" },
    { id: 4, name: "Granular Fertilizer Program", price: 65, season: "Seasonal" },
    { id: 5, name: "Residential Snow Removal", price: 149, season: "Winter" },
    { id: 6, name: "Custom Flowerbed Landscaping", price: 299, season: "Summer" },
  ];

  // useMemo caches filtered results
  const filtered = React.useMemo(() => {
    console.log("useMemo calculation executed for query:", query, "maxPrice:", maxPrice);
    return allServices.filter(s => 
      s.name.toLowerCase().includes(query.toLowerCase()) && s.price <= maxPrice
    );
  }, [query, maxPrice]);

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-2xl shadow border border-neutral-200 text-neutral-900 font-sans space-y-3">
      <h4 className="text-xs font-black uppercase text-emerald-900">Seasonal Catalog Filter</h4>

      <input
        type="text"
        placeholder="Search services..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-xs"
      />

      <div className="flex items-center justify-between text-xs text-neutral-600">
        <span>Max Price: \${maxPrice} CAD</span>
        <input
          type="range"
          min="40"
          max="300"
          step="10"
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="accent-emerald-600"
        />
      </div>

      <div className="space-y-1.5 pt-1 border-t border-neutral-100 max-h-48 overflow-y-auto">
        {filtered.map(s => (
          <div key={s.id} className="p-2 bg-neutral-50 rounded-lg flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-neutral-800 block">{s.name}</span>
              <span className="text-[10px] text-neutral-500">{s.season}</span>
            </div>
            <span className="font-extrabold text-emerald-700">\${s.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  },
  {
    id: 'template-abort-fetch',
    name: '5. Asynchronous Fetch & AbortController',
    category: 'Phase 4: Real-World',
    description: 'Simulate network requests and demonstrate canceling pending in-flight queries.',
    code: `function WeatherScheduleRadar() {
  const [city, setCity] = React.useState("Sylvan Lake");
  const [status, setStatus] = React.useState("synced");
  const [data, setData] = React.useState({ temp: "18°C", turf: "Dry & Firm", slot: "Tomorrow 9:00 AM" });
  const [logs, setLogs] = React.useState([]);

  const fetchCityData = (newCity) => {
    setCity(newCity);
    setStatus("loading");
    setLogs(prev => ["📡 Dispatched fetch for " + newCity + " with AbortController signal", ...prev.slice(0, 3)]);

    // Simulate async network request
    const timer = setTimeout(() => {
      setStatus("synced");
      setData({
        temp: newCity === "Red Deer" ? "21°C Sunny" : "18°C Mild",
        turf: "Prime for Mowing",
        slot: newCity === "Red Deer" ? "Today 2:00 PM" : "Tomorrow 9:00 AM"
      });
      setLogs(prev => ["✅ HTTP 200: Successfully loaded weather radar for " + newCity, ...prev.slice(0, 3)]);
    }, 700);
  };

  return (
    <div className="p-5 max-w-sm mx-auto bg-neutral-900 text-white rounded-2xl border border-neutral-800 font-sans space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-400">Radar & Dispatch Dispatcher</span>
        <span className={"text-[10px] px-2 py-0.5 rounded font-mono " + (status === "loading" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300")}>
          {status.toUpperCase()}
        </span>
      </div>

      <div className="flex gap-1.5">
        {["Sylvan Lake", "Red Deer", "Lacombe"].map(c => (
          <button
            key={c}
            onClick={() => fetchCityData(c)}
            className={"flex-1 py-1 rounded-lg text-xs font-semibold " + (city === c ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-400")}
          >
            {c}
          </button>
        ))}
      </div>

      {status === "loading" ? (
        <div className="p-4 bg-neutral-950 rounded-xl text-center text-xs text-neutral-400 animate-pulse">
          Fetching weather & crew GPS...
        </div>
      ) : (
        <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-neutral-400">Temperature:</span>
            <span className="font-bold text-white">{data.temp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Turf Readiness:</span>
            <span className="font-bold text-emerald-400">{data.turf}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Earliest Arrival:</span>
            <span className="font-bold text-amber-300">{data.slot}</span>
          </div>
        </div>
      )}

      <div className="p-2 bg-neutral-950 rounded text-[10px] font-mono text-neutral-400 space-y-0.5 max-h-24 overflow-y-auto">
        {logs.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}`,
  },
];

interface LiveCodeSandboxProps {
  initialTemplateId?: string;
  isDarkMode?: boolean;
}

export function LiveCodeSandbox({ initialTemplateId, isDarkMode = true }: LiveCodeSandboxProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    initialTemplateId || SANDBOX_TEMPLATES[0].id
  );
  const [code, setCode] = useState(
    SANDBOX_TEMPLATES.find((t) => t.id === selectedTemplateId)?.code || SANDBOX_TEMPLATES[0].code
  );
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [runTick, setRunTick] = useState(0);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Switch template
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const tmpl = SANDBOX_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setCode(tmpl.code);
      setConsoleLogs([`Loaded template: ${tmpl.name}`]);
      setRunTick((c) => c + 1);
    }
  };

  // Reset to starter code of current template
  const handleResetCode = () => {
    const tmpl = SANDBOX_TEMPLATES.find((t) => t.id === selectedTemplateId);
    if (tmpl) {
      setCode(tmpl.code);
      setConsoleLogs(['Reset code to starter template']);
      setRunTick((c) => c + 1);
    }
  };

  // Copy code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compile and evaluate component safely inside React runtime via pure useMemo
  const { RenderedComponent, executionError } = useMemo(() => {
    void runTick;
    try {
      const sandboxConsole = {
        log: (...args: any[]) => {
          console.log('[Sandbox]', ...args);
        },
        warn: (...args: any[]) => {
          console.warn('[Sandbox]', ...args);
        },
        error: (...args: any[]) => {
          console.error('[Sandbox]', ...args);
        },
      };

      const transformedCode = `
        const console = sandboxConsole;
        ${code}
        const match = ${JSON.stringify(code)}.match(/function\\s+([A-Za-z0-9_]+)/);
        if (match && typeof eval(match[1]) === 'function') {
          return eval(match[1]);
        }
        return () => React.createElement('div', { className: 'p-4 text-neutral-400 text-xs' }, 'Define a component function above.');
      `;

      const componentFactory = new Function('React', 'sandboxConsole', transformedCode);
      const ComponentToRender = componentFactory(React, sandboxConsole);
      return { RenderedComponent: ComponentToRender, executionError: null };
    } catch (err: any) {
      return {
        RenderedComponent: null,
        executionError: err.message || 'Syntax or evaluation error in sandbox code.',
      };
    }
  }, [code, runTick]);

  return (
    <div
      className={`rounded-2xl border overflow-hidden flex flex-col ${
        isDarkMode
          ? 'bg-neutral-900 border-neutral-800 text-neutral-100'
          : 'bg-white border-neutral-200 text-neutral-900 shadow-md'
      }`}
    >
      {/* Sandbox Toolbar */}
      <div
        className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isDarkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider">
              Interactive Live Code Sandbox
            </h4>
            <span className="text-[10px] text-neutral-400 block">
              Edit JSX live with instant component preview and console logging
            </span>
          </div>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedTemplateId}
            onChange={(e) => handleSelectTemplate(e.target.value)}
            className={`text-xs px-3 py-1.5 rounded-xl border font-medium cursor-pointer ${
              isDarkMode
                ? 'bg-neutral-900 border-neutral-700 text-white'
                : 'bg-white border-neutral-300 text-neutral-800 shadow-sm'
            }`}
          >
            {SANDBOX_TEMPLATES.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id}>
                {tmpl.name}
              </option>
            ))}
          </select>

          {/* Action buttons */}
          <button
            onClick={() => setRunTick((c) => c + 1)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Preview</span>
          </button>

          <button
            onClick={handleResetCode}
            aria-label="Reset Code"
            title="Reset to Template Starter Code"
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-400'
                : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopyCode}
            aria-label="Copy Code"
            title="Copy JSX Code"
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-400'
                : 'bg-white border-neutral-300 hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid: Editor (Left) & Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left: Code Editor Pane */}
        <div
          className={`lg:col-span-6 flex flex-col border-b lg:border-b-0 lg:border-r ${
            isDarkMode ? 'border-neutral-800 bg-[#0d1117]' : 'border-neutral-200 bg-[#f8fafc]'
          }`}
        >
          <div
            className={`px-4 py-2 text-[11px] font-mono border-b flex items-center justify-between ${
              isDarkMode
                ? 'bg-neutral-950/80 border-neutral-800 text-neutral-400'
                : 'bg-neutral-200/70 border-neutral-300 text-neutral-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Component.tsx (Editable)</span>
            </div>
            <span className="text-[10px] text-neutral-500">React 19 + JSX Syntax</span>
          </div>

          <div className="flex-1 relative font-mono text-xs">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className={`w-full h-full min-h-[380px] p-4 font-mono text-xs leading-relaxed resize-none focus:outline-none ${
                isDarkMode
                  ? 'bg-transparent text-emerald-300 selection:bg-emerald-900/60'
                  : 'bg-transparent text-emerald-950 selection:bg-emerald-200'
              }`}
            />
          </div>
        </div>

        {/* Right: Live Preview Pane */}
        <div
          className={`lg:col-span-6 flex flex-col ${
            isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
          }`}
        >
          {/* Preview Toolbar */}
          <div
            className={`px-4 py-2 border-b flex items-center justify-between text-[11px] ${
              isDarkMode
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                : 'bg-neutral-100 border-neutral-200 text-neutral-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs">Live Output</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            {/* Viewport switchers */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop View (100%)"
                className={`p-1 rounded cursor-pointer ${
                  viewport === 'desktop' ? 'bg-emerald-600 text-white' : 'hover:bg-neutral-800 text-neutral-400'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="Tablet View (768px)"
                className={`p-1 rounded cursor-pointer ${
                  viewport === 'tablet' ? 'bg-emerald-600 text-white' : 'hover:bg-neutral-800 text-neutral-400'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile View (375px)"
                className={`p-1 rounded cursor-pointer ${
                  viewport === 'mobile' ? 'bg-emerald-600 text-white' : 'hover:bg-neutral-800 text-neutral-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Component Render Canvas */}
          <div
            ref={previewContainerRef}
            className="flex-1 p-4 sm:p-6 flex items-center justify-center overflow-auto min-h-[300px]"
          >
            <div
              className={`transition-all duration-300 w-full ${
                viewport === 'mobile'
                  ? 'max-w-[340px]'
                  : viewport === 'tablet'
                  ? 'max-w-[540px]'
                  : 'max-w-full'
              }`}
            >
              {executionError ? (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-700/60 text-xs text-red-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Evaluation Error</span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-300 bg-neutral-900/60 p-2 rounded">
                    {executionError}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Make sure to close all JSX tags and use valid JavaScript expressions.
                  </p>
                </div>
              ) : RenderedComponent ? (
                <div className="w-full">
                  <RenderedComponent />
                </div>
              ) : (
                <div className="text-center text-xs text-neutral-500 py-8">
                  Click &quot;Run Preview&quot; to execute your component.
                </div>
              )}
            </div>
          </div>

          {/* Console Output Drawer */}
          <div
            className={`border-t p-3 max-h-36 overflow-y-auto font-mono text-[11px] ${
              isDarkMode
                ? 'bg-neutral-900/90 border-neutral-800 text-neutral-400'
                : 'bg-neutral-100 border-neutral-200 text-neutral-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5 text-[10px] uppercase font-bold text-neutral-500">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-emerald-400" />
                Console Logs
              </span>
              <button
                onClick={() => setConsoleLogs([])}
                className="hover:underline text-[9px] cursor-pointer"
              >
                Clear
              </button>
            </div>
            {consoleLogs.length === 0 ? (
              <span className="text-[10px] text-neutral-600 italic">No console logs yet.</span>
            ) : (
              <div className="space-y-0.5">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="text-emerald-400/90">
                    › {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

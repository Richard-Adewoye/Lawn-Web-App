'use client';

import React, { useState } from 'react';
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
      </div>
    </div>
  );
}

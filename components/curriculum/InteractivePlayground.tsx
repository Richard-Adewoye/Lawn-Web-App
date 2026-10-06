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
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Truck, 
  Shield, 
  Clock, 
  Globe, 
  Search, 
  Menu, 
  X,
  ArrowRight,
  BarChart3,
  Users,
  FileSpreadsheet,
  Layout,
  ClipboardList,
  Package,
  Calculator,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EODReport from './components/EODReport';

const COLORS = {
  darkest: '#000000',
  dark: '#0a0a0a',
  mediumDark: '#926600',
  medium: '#D99201',
  light: '#39FF14',
  lightest: '#FDE68A',
};

export default function App() {
  const [view, setView] = useState<'website' | 'report'>('website');
  const [subView, setSubView] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const resetToHome = () => {
    setSubView(null);
    setView('website');
    window.scrollTo(0, 0);
  };

  if (view === 'report') {
    return (
      <>
        <div className="fixed bottom-6 right-6 z-[100]">
          <button 
            onClick={resetToHome}
            className="bg-brand-darkest text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-bold"
          >
            <Layout size={20} />
            Back to Website
          </button>
        </div>
        <EODReport />
      </>
    );
  }

  const navItems = [
    {
      label: 'LOGISTICS SERVICES',
      items: [
        { title: 'Over-the-road', sub: ['Full Truckload (FTL)', 'Less-than-Truckload (LTL)'] },
        { title: 'Specialized Services', sub: ['Drop Trailer', 'Heavy Haul', 'Intermodal', 'Warehousing'] },
        { title: 'Global', sub: ['Ocean', 'Drayage', 'Customs', 'Air'] }
      ]
    },
    {
      label: 'CARRIERS',
      items: [
        { title: 'Carrier Network', sub: ['Get Set Up', 'Carrier FAQs', 'Load Board Access'] }
      ]
    },
    {
      label: 'JOBS',
      items: [
        { title: 'Careers', sub: ['Open Positions', 'Employee Benefits'] }
      ]
    },
    {
      label: 'TECHNOLOGY',
      items: [
        { title: 'Swift Track', sub: ['Carrier Dashboard', 'Data Integration', 'Visibility Tools'] }
      ]
    },
    {
      label: 'ABOUT US',
      items: [
        { title: 'Our Company', sub: ['About CargoBridge', 'Community Impact', 'Press Releases', 'Life at CargoBridge'] }
      ]
    }
  ];

  const renderDemoPortal = (title: string) => {
    switch (title) {
      case 'Get Set Up':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-brand-darkest"><UserPlus className="text-brand-medium" /> Carrier Onboarding</h3>
            <p className="text-slate-600">Complete the form below to join our elite carrier network.</p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Company Name</label>
                <input type="text" placeholder="e.g. Fast Logistics Inc" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">MC Number</label>
                <input type="text" placeholder="MC#" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">DOT Number</label>
                <input type="text" placeholder="DOT#" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Contact Email</label>
                <input type="email" placeholder="dispatch@company.com" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none" />
              </div>
              <button className="md:col-span-2 bg-brand-medium text-white py-4 rounded-lg font-bold hover:bg-brand-dark transition-colors shadow-lg">Submit Application</button>
            </form>
          </div>
        );
      case 'Load Board Access':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold flex items-center gap-2 text-brand-darkest"><ClipboardList className="text-brand-medium" /> Live Load Board</h3>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full animate-pulse">LIVE UPDATES</span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-dark text-white">
                    <th className="p-4 text-xs uppercase tracking-widest">Origin</th>
                    <th className="p-4 text-xs uppercase tracking-widest">Destination</th>
                    <th className="p-4 text-xs uppercase tracking-widest">Equipment</th>
                    <th className="p-4 text-xs uppercase tracking-widest">Rate</th>
                    <th className="p-4 text-xs uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { o: 'Chicago, IL', d: 'Dallas, TX', e: 'Dry Van', r: '$2,400' },
                    { o: 'Atlanta, GA', d: 'Miami, FL', e: 'Reefer', r: '$1,850' },
                    { o: 'Los Angeles, CA', d: 'Phoenix, AZ', e: 'Flatbed', r: '$1,200' },
                    { o: 'Seattle, WA', d: 'Denver, CO', e: 'Dry Van', r: '$2,100' },
                  ].map((load, i) => (
                    <tr key={i} className="border-b hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium">{load.o}</td>
                      <td className="p-4 font-medium">{load.d}</td>
                      <td className="p-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">{load.e}</span></td>
                      <td className="p-4 font-bold text-brand-medium">{load.r}</td>
                      <td className="p-4"><button className="text-xs bg-brand-dark text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-medium transition-colors">Book Now</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Get a Quote':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-brand-darkest"><Calculator className="text-brand-medium" /> Instant Quote Request</h3>
            <p className="text-slate-600">Provide shipment details to receive a competitive market rate.</p>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Pickup Zip</label>
                <input type="text" placeholder="Origin Zip" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Delivery Zip</label>
                <input type="text" placeholder="Destination Zip" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Equipment Type</label>
                <select className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none">
                  <option>Dry Van</option>
                  <option>Reefer</option>
                  <option>Flatbed</option>
                  <option>Step Deck</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">Weight (lbs)</label>
                <input type="text" placeholder="e.g. 42000" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none" />
              </div>
              <button className="md:col-span-2 bg-brand-medium text-white py-4 rounded-lg font-bold hover:bg-brand-dark transition-colors shadow-lg">Calculate Rate</button>
            </form>
          </div>
        );
      case 'Track Shipment':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-brand-darkest"><Package className="text-brand-medium" /> Shipment Tracking</h3>
            <p className="text-slate-600">Enter your PRO or Load number for real-time visibility.</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter Tracking Number" className="flex-grow p-4 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-brand-medium outline-none" />
              <button className="bg-brand-dark text-white px-8 py-4 rounded-lg font-bold hover:bg-brand-medium transition-colors">Track</button>
            </div>
            <div className="p-8 border border-slate-200 bg-slate-50 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-medium"></div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Current Status</p>
                  <p className="text-2xl font-bold text-brand-darkest">In Transit</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">ETA</p>
                  <p className="text-lg font-bold text-brand-medium">Today, 4:00 PM</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-3 h-3 rounded-full bg-brand-medium"></div>
                  <p className="text-sm font-medium">Scanned at Chicago Hub - 2 hours ago</p>
                </div>
                <div className="flex gap-4 items-center opacity-50">
                  <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                  <p className="text-sm">Departed Detroit Facility - 6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <p className="text-xl text-brand-darkest/70 leading-relaxed mb-8">
              Welcome to the <strong>{title}</strong> portal. We are currently updating this section with the latest tools and information to better serve your logistics needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-brand-lightest/30 rounded-2xl border border-brand-light/10">
                <h4 className="font-bold text-brand-darkest mb-2">Service Overview</h4>
                <p className="text-sm text-brand-darkest/60">Detailed documentation and operational procedures for {title} are being finalized by our logistics team.</p>
              </div>
              <div className="p-6 bg-brand-lightest/30 rounded-2xl border border-brand-light/10">
                <h4 className="font-bold text-brand-darkest mb-2">Contact Support</h4>
                <p className="text-sm text-brand-darkest/60">Need immediate assistance with {title}? Contact our 24/7 dispatch team at (407) 777-7558.</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-brand-darkest text-brand-lightest py-2 px-4 md:px-8 flex flex-wrap justify-between items-center text-xs font-medium border-b border-white/10">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-brand-lightest" />
            US 24/7/365
          </span>
          <a href="tel:4077777558" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={14} className="text-brand-lightest" />
            (407) 777-7558
          </a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setView('report')}
            className="text-brand-light hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider font-bold border border-brand-light/30 px-2 py-1 rounded"
          >
            <FileSpreadsheet size={14} />
            BD Report
          </button>
          <span className="opacity-30">|</span>
          <button onClick={() => { setSubView('Get a Quote'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
            Get a Quote
          </button>
          <span className="opacity-30">|</span>
          <button onClick={() => { setSubView('Track Shipment'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
            Track Shipment
          </button>
          <span className="opacity-30">|</span>
          <button className="hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
            Register
          </button>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-brand-darkest/80 backdrop-blur-md border-b border-white/5 shadow-xl">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetToHome}>
            <div className="w-10 h-10 bg-black border border-brand-light/30 rounded-lg flex items-center justify-center text-brand-light shadow-lg shadow-brand-light/20">
              <Truck size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-white uppercase tracking-tight">HAUL OPERATOR LLC</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-medium uppercase">Logistics Solutions</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 h-full">
            {navItems.map((nav) => (
              <div 
                key={nav.label} 
                className="group relative h-full flex items-center cursor-pointer"
                onMouseEnter={() => setActiveDropdown(nav.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="text-xs font-bold text-white/80 group-hover:text-brand-lightest transition-colors flex items-center gap-1">
                  {nav.label}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === nav.label ? 'rotate-180' : ''}`} />
                </span>
                
                {/* Dropdown Mega Menu Style */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-brand-dark text-white p-8 grid grid-cols-3 gap-8 shadow-2xl transition-all duration-300 border border-white/10 origin-top ${activeDropdown === nav.label ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                  {nav.items.map((section) => (
                    <div key={section.title}>
                      <h4 className="text-brand-lightest font-bold text-sm mb-4 border-b border-white/10 pb-2 uppercase tracking-wider">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.sub.map((item) => (
                          <li key={item}>
                            <button 
                              onClick={() => {
                                setSubView(item);
                                setActiveDropdown(null);
                                window.scrollTo(0, 0);
                              }}
                              className="text-xs text-white/60 hover:text-brand-lightest transition-colors block py-1 text-left w-full"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-3 mt-4 pt-4 border-t border-white/10">
                    <button onClick={() => { setSubView('Get a Quote'); setActiveDropdown(null); window.scrollTo(0, 0); }} className="bg-brand-medium hover:bg-brand-medium-dark text-white text-xs font-bold py-2 px-4 rounded transition-colors uppercase tracking-widest">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-brand-darkest text-white lg:hidden pt-20"
          >
            <div className="p-6 space-y-6">
              {navItems.map((nav) => (
                <div key={nav.label}>
                  <h3 className="text-brand-lightest font-bold text-lg mb-2">{nav.label}</h3>
                  <div className="pl-4 space-y-2 border-l border-white/10">
                    {nav.items.map(section => (
                      <div key={section.title} className="mb-4">
                        <p className="text-sm font-semibold text-white/40 mb-1">{section.title}</p>
                        {section.sub.map(item => (
                          <button 
                            key={item} 
                            onClick={() => { setSubView(item); setIsMenuOpen(false); window.scrollTo(0, 0); }} 
                            className="block py-1 text-sm text-left w-full text-white/70 hover:text-white"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {subView ? (
          <section className="py-24 bg-brand-darkest min-h-[600px]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <button 
                onClick={() => setSubView(null)}
                className="text-brand-lightest font-bold flex items-center gap-2 mb-8 hover:text-brand-medium transition-colors"
              >
                <ArrowRight className="rotate-180" size={18} />
                Back to Home
              </button>
              <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight">{subView}</h2>
              <div className="bg-brand-dark p-12 rounded-3xl shadow-2xl border border-white/5">
                {renderDemoPortal(subView)}
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Hero Section */}
            <section className="relative h-[700px] flex items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
                  alt="Warehouse Logistics" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-darkest via-brand-darkest/70 to-transparent"></div>
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl"
                >
                  <div className="inline-block px-4 py-1.5 bg-brand-medium/20 border border-brand-medium/30 rounded-full text-brand-lightest text-xs font-bold tracking-widest uppercase mb-6">
                    Global Logistics Excellence
                  </div>
                  <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-6 uppercase tracking-tighter">
                    MOVING FREIGHT <motion.span 
                      initial={{ color: '#ffffff' }}
                      animate={{ color: COLORS.medium }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >WITHOUT LIMITS</motion.span>
                  </h1>
                  <p className="text-xl text-white/60 mb-8 font-light leading-relaxed max-w-xl">
                    HAUL OPERATOR LLC delivers precision-engineered logistics solutions. From regional haul to the open road, we move with excellence.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => { setSubView('Get a Quote'); window.scrollTo(0, 0); }} className="bg-brand-medium hover:bg-brand-medium-dark text-black px-10 py-5 rounded-xl font-bold text-lg transition-all flex items-center gap-2 group shadow-2xl shadow-brand-medium/20">
                      GET A QUOTE
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={() => { setSubView('Track Shipment'); window.scrollTo(0, 0); }} className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-xl font-bold text-lg transition-all">
                      TRACK SHIPMENT
                    </button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Quick Stats / Features */}
            <section className="bg-brand-dark text-white py-20 border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                  {[
                    { val: '10k+', label: 'Shipments Weekly' },
                    { val: '24/7', label: 'Support Available' },
                    { val: '99%', label: 'On-Time Delivery' },
                    { val: '50+', label: 'States Covered' }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <div className="text-5xl font-bold text-brand-light">{stat.val}</div>
                      <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Warehouse Section */}
            <section className="py-24 bg-brand-darkest relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-xs font-bold text-brand-medium tracking-[0.4em] uppercase mb-4">Infrastructure</h2>
                  <h3 className="text-5xl font-bold text-white mb-8 uppercase tracking-tight">Strategic Warehousing & Storage</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Our network of state-of-the-art warehouse facilities provides the backbone for your supply chain. With advanced inventory management and climate-controlled options, your cargo is always secure.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {['24/7 Security Monitoring', 'Real-time Inventory Tracking', 'Cross-docking Capabilities', 'Climate Controlled Storage'].map((item, i) => (
                      <motion.li 
                        key={item} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-white/80"
                      >
                        <div className="w-5 h-5 rounded-full bg-brand-light/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-brand-light"></div>
                        </div>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <button onClick={() => setSubView('Warehousing')} className="text-brand-lightest font-bold flex items-center gap-2 hover:text-white transition-colors group">
                    EXPLORE FACILITIES <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-medium/20 blur-3xl rounded-full"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Modern Warehouse" 
                    className="relative rounded-3xl shadow-2xl border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-brand-dark">
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-20">
                  <h2 className="text-xs font-bold text-brand-medium tracking-[0.4em] uppercase mb-4">Our Expertise</h2>
                  <h3 className="text-5xl font-bold text-white uppercase tracking-tight">Comprehensive Logistics</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: <Truck className="w-8 h-8" />,
                      title: "Over-the-Road",
                      desc: "Full truckload and LTL services with a massive network of vetted carriers.",
                      img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                      icon: <Globe className="w-8 h-8" />,
                      title: "Global Logistics",
                      desc: "Ocean, air, and drayage services to move your freight across borders seamlessly.",
                      img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=600"
                    },
                    {
                      icon: <Shield className="w-8 h-8" />,
                      title: "Specialized Freight",
                      desc: "Heavy haul, intermodal, and temperature-controlled solutions for unique cargo.",
                      img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600"
                    }
                  ].map((service, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                      className="rounded-3xl bg-brand-darkest border border-white/5 overflow-hidden transition-all group"
                    >
                      <div className="h-48 overflow-hidden">
                        <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-8">
                        <div className="w-14 h-14 bg-brand-dark text-brand-light rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:bg-brand-light group-hover:text-black transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                          {service.icon}
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{service.title}</h4>
                        <p className="text-white/50 leading-relaxed mb-6">
                          {service.desc}
                        </p>
                        <button onClick={() => setSubView(service.title)} className="text-xs font-bold text-brand-medium uppercase tracking-widest hover:text-brand-lightest transition-colors">Learn More</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 bg-brand-darkest relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <img 
                  src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=2000" 
                  alt="Logistics Background" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="bg-brand-dark/80 backdrop-blur-xl p-16 rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                  <div className="max-w-xl">
                    <h3 className="text-5xl font-bold text-white mb-6 uppercase tracking-tight">Ready to optimize your supply chain?</h3>
                    <p className="text-white/60 text-xl leading-relaxed">
                      Get a customized quote in minutes or speak with one of our logistics experts today.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
                    <button onClick={() => { setSubView('Get a Quote'); window.scrollTo(0, 0); }} className="bg-brand-medium hover:bg-brand-medium-dark text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-2xl shadow-brand-medium/30">
                      REQUEST A QUOTE
                    </button>
                    <button onClick={() => { setSubView('Our Company'); window.scrollTo(0, 0); }} className="bg-white/10 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/20">
                      CONTACT US
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-brand-darkest text-brand-lightest pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-black border border-brand-light/30 rounded flex items-center justify-center text-brand-light">
                  <Truck size={18} />
                </div>
                <span className="font-bold text-lg leading-none uppercase">HAUL OPERATOR LLC</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Leading the way in professional freight transport and logistics solutions. Reliable, efficient, and always on time.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Phone size={16} className="text-brand-medium" />
                  (407) 777-7558
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Mail size={16} className="text-brand-medium" />
                  info@hauloperator.com
                </div>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin size={16} className="text-brand-medium mt-1 shrink-0" />
                  <span>SAINT CLOUD, FL</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><button onClick={() => { setSubView('Over-the-road'); window.scrollTo(0, 0); }} className="hover:text-brand-lightest transition-colors">Over-the-Road</button></li>
                <li><button onClick={() => { setSubView('Less-than-Truckload (LTL)'); window.scrollTo(0, 0); }} className="hover:text-brand-lightest transition-colors">LTL Shipping</button></li>
                <li><button onClick={() => { setSubView('Heavy Haul'); window.scrollTo(0, 0); }} className="hover:text-brand-lightest transition-colors">Heavy Haul</button></li>
                <li><button onClick={() => { setSubView('Global'); window.scrollTo(0, 0); }} className="hover:text-brand-lightest transition-colors">Global Logistics</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><button onClick={() => { setSubView('Our Company'); window.scrollTo(0, 0); }} className="hover:text-brand-lightest transition-colors">About Us</button></li>
                <li><button onClick={() => { setSubView('Careers'); window.scrollTo(0, 0); }} className="hover:text-brand-lightest transition-colors">Careers</button></li>
                <li><button onClick={() => { setSubView('Our Company'); window.scrollTo(0, 0); }} className="hover:text-brand-lightest transition-colors">Contact</button></li>
                <li><button onClick={() => { setSubView('Our Company'); window.scrollTo(0, 0); }} className="hover:text-brand-lightest transition-colors">Privacy Policy</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company Details</h4>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm font-bold text-brand-lightest mb-1 uppercase">HAUL OPERATOR LLC</p>
                <p className="text-xs text-white/40">Saint Cloud, FL</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <p>© 2026 HAUL OPERATOR LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
              <a href="#" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  RefreshCcw, 
  CheckCircle2, 
  Save, 
  Trash2, 
  Copy, 
  Download,
  LayoutDashboard,
  FileText,
  Send
} from 'lucide-react';
import { motion } from 'motion/react';

interface ReportData {
  date: string;
  leadsAssigned: number;
  calls: number;
  emails: number;
  texts: number;
  followUps: number;
  closings: number;
  notes: string;
  challenges: string;
}

const INITIAL_STATE: ReportData = {
  date: new Date().toISOString().split('T')[0],
  leadsAssigned: 0,
  calls: 0,
  emails: 0,
  texts: 0,
  followUps: 0,
  closings: 0,
  notes: '',
  challenges: '',
};

export default function EODReport() {
  const [data, setData] = useState<ReportData>(() => {
    const saved = localStorage.getItem('eod_report_draft');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('eod_report_draft', JSON.stringify(data));
  }, [data]);

  const handleChange = (field: keyof ReportData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset today\'s report?')) {
      setData({ ...INITIAL_STATE, date: new Date().toISOString().split('T')[0] });
    }
  };

  const copyToClipboard = () => {
    const reportText = `
📊 *EOD DAILY REPORT - BUSINESS DEVELOPMENT*
📅 Date: ${data.date}
🏢 Tech House BD Outreach

📈 *METRICS*
- Leads Assigned: ${data.leadsAssigned}
- Calls Made: ${data.calls}
- Emails Sent: ${data.emails}
- Texts Sent: ${data.texts}
- Follow-ups: ${data.followUps}
- Closings: ${data.closings}

📝 *NOTES*
${data.notes || 'N/A'}

⚠️ *CHALLENGES*
${data.challenges || 'N/A'}

*Total Outreach Activity:* ${data.calls + data.emails + data.texts + data.followUps}
    `.trim();

    navigator.clipboard.writeText(reportText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const totalOutreach = data.calls + data.emails + data.texts + data.followUps;
  const conversionRate = data.leadsAssigned > 0 ? ((data.closings / data.leadsAssigned) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-[#1E293B]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] flex items-center gap-3">
              <LayoutDashboard className="text-brand-medium" />
              BD Daily Performance Report
            </h1>
            <p className="text-slate-500 mt-1">Tech House Business Development Outreach Tracker</p>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              value={data.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-medium/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Metrics Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <ClipboardCheck size={20} className="text-brand-medium" />
                Outreach Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MetricInput 
                  label="Leads Assigned" 
                  icon={<FileText size={18} />}
                  value={data.leadsAssigned}
                  onChange={(val) => handleChange('leadsAssigned', val)}
                  color="bg-slate-100"
                />
                <MetricInput 
                  label="Calls Made" 
                  icon={<PhoneCall size={18} />}
                  value={data.calls}
                  onChange={(val) => handleChange('calls', val)}
                  color="bg-blue-50 text-blue-600"
                />
                <MetricInput 
                  label="Emails Sent" 
                  icon={<Mail size={18} />}
                  value={data.emails}
                  onChange={(val) => handleChange('emails', val)}
                  color="bg-purple-50 text-purple-600"
                />
                <MetricInput 
                  label="Texts Sent" 
                  icon={<MessageSquare size={18} />}
                  value={data.texts}
                  onChange={(val) => handleChange('texts', val)}
                  color="bg-emerald-50 text-emerald-600"
                />
                <MetricInput 
                  label="Follow-ups" 
                  icon={<RefreshCcw size={18} />}
                  value={data.followUps}
                  onChange={(val) => handleChange('followUps', val)}
                  color="bg-amber-50 text-amber-600"
                />
                <MetricInput 
                  label="Closings" 
                  icon={<CheckCircle2 size={18} />}
                  value={data.closings}
                  onChange={(val) => handleChange('closings', val)}
                  color="bg-rose-50 text-rose-600"
                />
              </div>
            </div>

            {/* Qualitative Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold mb-6">Qualitative Summary</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Daily Notes & Progress</label>
                  <textarea 
                    value={data.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Summary of conversations, lead quality, etc..."
                    className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-medium/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Challenges & Blockers</label>
                  <textarea 
                    value={data.challenges}
                    onChange={(e) => handleChange('challenges', e.target.value)}
                    placeholder="Any issues encountered during outreach..."
                    className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-medium/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Summary */}
          <div className="space-y-6">
            <div className="bg-brand-darkest text-white rounded-2xl p-6 shadow-xl sticky top-28">
              <h2 className="text-xl font-bold mb-6">Daily Summary</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider">Total Activity</p>
                    <p className="text-3xl font-bold">{totalOutreach}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-xs uppercase tracking-wider">Conversion</p>
                    <p className="text-xl font-bold text-brand-light">{conversionRate}%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <SummaryRow label="Outreach Volume" value={totalOutreach > 50 ? 'High' : totalOutreach > 20 ? 'Moderate' : 'Low'} />
                  <SummaryRow label="Closing Efficiency" value={data.closings > 0 ? 'Active' : 'Pending'} />
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={copyToClipboard}
                    className="w-full bg-brand-medium hover:bg-brand-medium/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    {isCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    {isCopied ? 'Copied to Clipboard' : 'Copy for Report'}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => window.print()}
                      className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      <Download size={16} />
                      PDF
                    </button>
                    <button 
                      onClick={resetForm}
                      className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      <Trash2 size={16} />
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-light/10 border border-brand-light/20 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-brand-medium uppercase tracking-widest mb-3">Pro Tip</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consistency is key in Business Development. Aim for a balanced outreach across all channels to maximize your conversion potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricInput({ label, icon, value, onChange, color }: { 
  label: string; 
  icon: React.ReactNode; 
  value: number; 
  onChange: (val: number) => void;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-600 flex items-center gap-2">
        <span className={`p-1.5 rounded-md ${color}`}>{icon}</span>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 transition-all font-bold text-lg"
        >
          -
        </button>
        <input 
          type="number" 
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="flex-grow h-10 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-brand-medium/20"
        />
        <button 
          onClick={() => onChange(value + 1)}
          className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 transition-all font-bold text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-white/40">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

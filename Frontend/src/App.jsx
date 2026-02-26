import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, CartesianGrid, Legend 
} from 'recharts';
import { 
  LayoutDashboard, Upload, Megaphone, 
  GraduationCap, ShieldAlert, Loader2, Trash2 
} from 'lucide-react';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");

  const loadData = useCallback(async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/stats/');
      setData(res.data);
    } catch (err) {
      console.error("Connection Error: Check if Backend is running.");
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setLoading(true);
    setProgress(10);
    setUploadStatus("Processing File...");
  
    const fd = new FormData();
    fd.append('file', file);
  
    const interval = setInterval(() => {
      setProgress(prev => (prev < 95 ? prev + 2 : 95));
    }, 200);
  
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/import/', fd);
      if (res.status === 200) {
        clearInterval(interval);
        setProgress(100);
        setUploadStatus("Syncing Database...");
        setTimeout(() => { window.location.reload(); }, 800);
      }
    } catch (err) {
      clearInterval(interval);
      setLoading(false);
      alert("Import Failed. Check Excel headers.");
    }
  };

  const handleClear = async () => {
    if (!window.confirm("Wipe all data?")) return;
    await axios.post('http://127.0.0.1:8000/api/clear/');
    window.location.reload();
  };

  if (!data) return (
    <div style={fullCenter}>
      <Loader2 className="animate-spin" size={60} color="#6366f1" />
      <h2 style={{marginTop: '25px', letterSpacing: '4px', fontWeight: '900'}}>DASHBOARD INITIALIZING</h2>
    </div>
  );

  return (
    <div style={viewWrapper}>
      {loading && (
        <div style={glassOverlay}>
          <div style={statusBox}>
            <div style={statusHeader}>
              <span>{uploadStatus}</span>
              <span style={{color: '#6366f1'}}>{progress}%</span>
            </div>
            <div style={giantTrack}>
              <div style={{...giantFill, width: `${progress}%`}}></div>
            </div>
          </div>
        </div>
      )}

      <aside style={sidebarStyle}>
        <div style={brandZone}>DNA ANALYTICS</div>
        <nav style={{flex: 1, padding: '0 25px'}}>
          <div style={navTab}><LayoutDashboard size={24}/> DASHBOARD</div>
        </nav>
        <div style={sideActionZone}>
          <button onClick={handleClear} style={wipeBtn}><Trash2 size={18}/> WIPE SYSTEM</button>
          <label style={primeUpload}>
            <Upload size={24}/> IMPORT EXCEL
            <input type="file" hidden onChange={handleUpload} accept=".xlsx, .xls" />
          </label>
        </div>
      </aside>

      <main style={mainViewport}>
        <header style={topNav}>
          <div>
            <h1 style={mainTitle}>Dashboard</h1>
            <p style={subTitle}>Survey Mapping • Real-Time Data Visualization</p>
          </div>
          <div style={liveBadge}><div style={ping}></div> DB IS CONNECTED</div>
        </header>

        <div style={scrollContent}>
          <section style={viewSection}>
            <div style={sectionLabel}>Demographics</div>
            <div style={doubleGrid}>
              <Metric title="Age Distribution" data={data.demographics.age} type="pie" />
              <Metric title="Gender Balance" data={data.demographics.gender} type="pie" />
              <Metric title="Geographic Density" data={data.demographics.location} type="bar" color="#10b981" />
              <Metric title="Employment Segment" data={data.demographics.employment} type="bar" color="#8b5cf6" />
            </div>
          </section>

          <section style={{...viewSection, border: 'none'}}>
            <div style={sectionLabel}>Behavioral Metrics</div>
            <div style={doubleGrid}>
              <Metric title="Channel Attribution" icon={<Megaphone/>} data={data.awareness} type="bar" color="#6366f1" />
              <Metric title="Professional Interests" icon={<GraduationCap/>} data={data.training} type="bar" color="#f59e0b" />
              <Metric title="Structural Barriers" icon={<ShieldAlert/>} data={data.barriers} type="bar" color="#ef4444" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Metric({ title, icon, data, type, color }) {
  const isPie = type === 'pie';
  return (
    <div style={hugeCard}>
      <div style={cardLabel}>{icon} {title}</div>
     
      <div style={{ flex: 1, width: '100%', minHeight: 0, position: 'relative' }}>
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            {isPie ? (
              <PieChart>
                <Pie 
                  data={data} 
                  dataKey="total" 
                  nameKey="label" 
                  innerRadius="50%" 
                  outerRadius="80%" 
                  paddingAngle={5}
                  cx="50%" 
                  cy="45%" 
                >
                  {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#fff" strokeWidth={2} />)}
                </Pie>
                <Tooltip cornerRadius={10} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{paddingTop: '15px', fontSize: '12px'}} />
              </PieChart>
            ) : (
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}} />
                <Bar dataKey="total" fill={color} radius={[10, 10, 0, 0]} barSize={45} />
              </BarChart>
            )}
          </ResponsiveContainer>
        ) : <div style={emptyState}>Awaiting Data...</div>}
      </div>
    </div>
  );
}

// STYLING
const viewWrapper = { display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#fff' };
const sidebarStyle = { width: '320px', backgroundColor: '#0f172a', color: '#fff', display: 'flex', flexDirection: 'column' };
const brandZone = { padding: '50px 40px', fontSize: '24px', fontWeight: '950', color: '#6366f1', letterSpacing: '4px' };
const navTab = { padding: '20px 40px', background: 'rgba(99, 102, 241, 0.1)', borderLeft: '5px solid #6366f1', color: '#fff', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: '800' };
const sideActionZone = { padding: '40px 30px', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: 'auto' };
const primeUpload = { background: '#6366f1', color: '#fff', padding: '18px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', fontWeight: '800' };
const wipeBtn = { background: 'transparent', border: '1px solid #334155', color: '#64748b', padding: '14px', borderRadius: '14px', cursor: 'pointer', fontWeight: '700' };
const mainViewport = { flex: 1, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fcfcfd' };
const topNav = { padding: '40px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' };
const mainTitle = { fontSize: '42px', fontWeight: '950', margin: 0, letterSpacing: '-2px' };
const subTitle = { fontSize: '18px', color: '#94a3b8', margin: '5px 0 0 0' };
const liveBadge = { display: 'flex', alignItems: 'center', gap: '10px', background: '#f0fdf4', color: '#16a34a', padding: '10px 20px', borderRadius: '50px', fontWeight: '800', fontSize: '12px' };
const ping = { width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' };
const scrollContent = { flex: 1, overflowY: 'auto', padding: '0 5% 60px 5%' };
const viewSection = { padding: '60px 0', borderBottom: '1px solid #f1f5f9' };
const sectionLabel = { fontSize: '14px', fontWeight: '900', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '40px' };
const doubleGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' };
const hugeCard = { background: '#fff', padding: '35px', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', height: '480px', display: 'flex', flexDirection: 'column', overflow: 'hidden' };
const cardLabel = { fontSize: '20px', fontWeight: '900', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' };
const emptyState = { height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', border: '2px dashed #f1f5f9', borderRadius: '20px' };
const glassOverlay = { position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' };
const statusBox = { width: '500px', textAlign: 'center' };
const statusHeader = { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: '900', fontSize: '20px' };
const giantTrack = { height: '12px', background: '#f1f5f9', borderRadius: '20px', overflow: 'hidden' };
const giantFill = { height: '100%', background: '#6366f1', transition: 'width 0.2s linear' };
const fullCenter = { height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' };
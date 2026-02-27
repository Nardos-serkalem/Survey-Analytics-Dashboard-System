import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';

const Dashboard = () => {
    const navigate = useNavigate();
    const [responses, setResponses] = useState([]);
    const [lookups, setLookups] = useState({});
    const [loading, setLoading] = useState(true);
    const [systemHealth, setSystemHealth] = useState('CHECKING...');
    const [stats, setStats] = useState({ growth: 0, completion: 0 });
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const LOOKUP_CONFIG = {
        'sub_city': 'sub-cities',
        'education_level': 'education-levels',
        'employment_status': 'employment-statuses',
        'collection_area': 'collection-areas',
        'preferred_time_slot': 'time-slots',
        'preferred_frequency': 'frequencies',
        'awareness_channels': 'awareness-channels',
        'important_factors': 'important-factors',
        'internet_access_modes': 'internet-access-modes',
        'social_platforms': 'social-platforms',
        'barriers': 'barriers',
        'training_topics': 'training-topics',
        'motivations': 'motivations',
        'delivery_types': 'delivery-types'
    };

    const TARGET_GOAL = 500;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const healthRes = await fetch('http://localhost:8000/api/health/');
                if (healthRes.ok) {
                    const healthData = await healthRes.json();
                    setSystemHealth(healthData.status);
                } else {
                    setSystemHealth('DEGRADED');
                }

                const respRes = await fetch('http://localhost:8000/api/responses/?survey=yne-training-survey');
                const respData = await respRes.json();

                respData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setResponses(respData);

                const now = new Date();
                const thisMonth = now.getMonth();
                const thisYear = now.getFullYear();

                const currentMonthCount = respData.filter(r => {
                    const d = new Date(r.timestamp);
                    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
                }).length;

                const prevMonthCount = respData.filter(r => {
                    const d = new Date(r.timestamp);
                    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
                    const yearOfLastMonth = thisMonth === 0 ? thisYear - 1 : thisYear;
                    return d.getMonth() === lastMonth && d.getFullYear() === yearOfLastMonth;
                }).length;

                let growth = 0;
                if (prevMonthCount > 0) {
                    growth = Math.round(((currentMonthCount - prevMonthCount) / prevMonthCount) * 100);
                } else if (currentMonthCount > 0) {
                    growth = 100;
                }

                const completion = Math.min(100, Math.round((respData.length / TARGET_GOAL) * 100));

                setStats({ growth, completion });

                const lookupEntries = Object.entries(LOOKUP_CONFIG);
                const lookupResults = await Promise.all(
                    lookupEntries.map(([, endpoint]) =>
                        fetch(`http://localhost:8000/api/${endpoint}/`).then(r => r.ok ? r.json() : [])
                    )
                );

                const lookupData = {};
                lookupEntries.forEach(([key], i) => {
                    lookupData[key] = lookupResults[i].reduce((acc, item) => {
                        acc[item.id] = item.name || item.label;
                        return acc;
                    }, {});
                });
                setLookups(lookupData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
                setSystemHealth('OFFLINE');
            }
        };
        fetchData();
    }, []);

    const getFrequencyData = (key, isMulti = false) => {
        const counts = responses.reduce((acc, curr) => {
            const val = curr[key];
            if (isMulti && Array.isArray(val)) {
                val.forEach(v => {
                    const label = lookups[key]?.[v] || (LOOKUP_CONFIG[key] ? null : v);
                    if (label) acc[label] = (acc[label] || 0) + 1;
                });
            } else if (val) {
                const label = lookups[key]?.[val] || (LOOKUP_CONFIG[key] ? null : val);
                if (label) acc[label] = (acc[label] || 0) + 1;
            }
            return acc;
        }, {});

        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    };

    if (loading) {
        return (
            <div className="vh-center">
                <div className="loader-container">
                    <div className="loader-bars">
                        <div className="loader-bar"></div>
                        <div className="loader-bar"></div>
                        <div className="loader-bar"></div>
                        <div className="loader-bar"></div>
                        <div className="loader-bar"></div>
                    </div>
                    <div className="loader-text">Initialising Dashboard</div>
                </div>
            </div>
        );
    }

    const COLORS = ['#000000', '#444444', '#888888', '#bbbbbb', '#eeeeee'];

    const GENDER_COLORS = {
        'Male': '#000000',
        'Female': '#888888',
        'Other': '#bbbbbb'
    };

    const NavItem = ({ label, active = false, icon }) => (
        <a href="/admin/dashboard" className={`nav-item ${active ? 'active' : ''}`}>
            <span style={{ fontSize: '1.2rem' }}>{icon}</span>
            {label}
        </a>
    );

    const shortenLabel = (label) => {
        if (!label) return '';
        const mapping = {
            'Secondary Education (Grades 9-12)': 'Secondary (9-12)',
            'Primary Education (Grades 1-8)': 'Primary (1-8)',
            'Tertiary Education (Master\'s, Doctoral Level)': 'Tertiary (Post-Grad)',
            'Vocational/Technical Education': 'Vocational/Tech',
            'Entrepreneurship and business management': 'Business Mgmt',
            'Information and communication Technology (ICT)': 'ICT/Tech',
            'Personal development and soft skills': 'Soft Skills',
            'Digital literacy and basic computer skills': 'Digital Literacy'
        };
        return mapping[label] || (label.length > 20 ? label.substring(0, 18) + '...' : label);
    };

    const CustomTick = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    fontSize={9}
                    transform="rotate(-35)"
                >
                    {shortenLabel(payload.value)}
                </text>
            </g>
        );
    };

    const CustomLabel = (props) => {
        const { x, y, width, value } = props;
        return (
            <text x={x + width / 2} y={y - 10} fill="#000" textAnchor="middle" fontSize={10} fontWeight="600">
                {value}
            </text>
        );
    };

    return (
        <div className="dashboard-container">
            <aside className={`sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
                <button
                    className="sidebar-toggle"
                    onClick={() => setSidebarCollapsed(c => !c)}
                    title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {sidebarCollapsed ? '▶' : '◀'}
                </button>

                {!sidebarCollapsed && <div className="sidebar-logo">YNE.</div>}

                <div className="nav-section">
                    {!sidebarCollapsed && <p className="nav-section-title">CORE</p>}
                    <NavItem label={<span className="nav-label">Dashboard</span>} active icon="⬚" />
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <button className="nav-item" style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer' }}
                        onClick={() => { localStorage.removeItem('admin_auth'); navigate('/'); }}>
                        <span>➜</span> {!sidebarCollapsed && <span className="nav-label">Logout</span>}
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="dashboard-header animate-slide-up">
                    <h1 style={{ fontSize: '1.5rem', textTransform: 'none' }}>Dashboard</h1>
                </header>

                <div className="bento-grid animate-slide-up">
                    {/* Key Metrics */}
                    <div className="card col-4">
                        <p className="label" style={{ fontSize: '0.7rem' }}>Total Responses</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '2rem', margin: '0' }}>{responses.length}</h2>
                            <div className={`stat-pill ${stats.growth >= 0 ? 'stat-trend-up' : 'stat-trend-down'}`}>
                                {stats.growth >= 0 ? '↑' : '↓'} {Math.abs(stats.growth)}%
                            </div>
                        </div>
                        <p className="text-dim" style={{ fontSize: '0.65rem', marginTop: '5px' }}>vs Last Month</p>
                    </div>

                    <div className="card col-4">
                        <p className="label" style={{ fontSize: '0.7rem' }}>Completion Rate</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ fontSize: '2rem', margin: '0' }}>{stats.completion}%</h2>
                            <div style={{ width: '40px', height: '40px' }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={[{ value: stats.completion }, { value: 100 - stats.completion }]} innerRadius={12} outerRadius={18} dataKey="value">
                                            <Cell fill="#000" /><Cell fill="#eee" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <p className="text-dim" style={{ fontSize: '0.65rem', marginTop: '5px' }}>Target: {TARGET_GOAL} Responses</p>
                    </div>

                    <div className="card col-4">
                        <p className="label" style={{ fontSize: '0.7rem' }}>System Health</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.8rem' }}>
                            <div className={systemHealth === 'OPERATIONAL' ? 'pulse-dot' : ''}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: systemHealth === 'OPERATIONAL' ? '#000' : '#ff4d4d',
                                    boxShadow: '0 0 5px rgba(0,0,0,0.05)'
                                }}
                            />
                            <h2 style={{ fontSize: '1rem', margin: '0', letterSpacing: '1px' }}>{systemHealth}</h2>
                        </div>
                        <p className="text-dim" style={{ fontSize: '0.65rem', marginTop: '10px' }}>Live Database Ping</p>
                    </div>

                    {/* Recent Activity Table */}
                    <div className="card col-12">
                        <h3 className="card-title">Recent Survey Activity</h3>
                        <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                        <th style={{ padding: '0.8rem', color: '#999', fontWeight: '500' }}>Timestamp</th>
                                        <th style={{ padding: '0.8rem', color: '#999', fontWeight: '500' }}>City</th>
                                        <th style={{ padding: '0.8rem', color: '#999', fontWeight: '500' }}>Employment</th>
                                        <th style={{ padding: '0.8rem', color: '#999', fontWeight: '500' }}>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {responses.slice(0, 5).map((r, i) => (
                                        <tr key={i} style={{ borderBottom: i === 4 ? 'none' : '1px solid #f9f9f9' }}>
                                            <td style={{ padding: '0.8rem' }}>{new Date(r.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
                                            <td style={{ padding: '0.8rem' }}>{lookups.sub_city?.[r.sub_city] || '---'}</td>
                                            <td style={{ padding: '0.8rem' }}>{lookups.employment_status?.[r.employment_status] || '---'}</td>
                                            <td style={{ padding: '0.8rem' }}>
                                                <span style={{ background: '#eee', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem' }}>
                                                    {r.likelihood_join_score}/5
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Full Width Visuals */}
                    <div className="card col-8">
                        <h3 className="card-title">Training Topic Interests</h3>
                        <div style={{ height: '400px', marginTop: '20px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getFrequencyData('training_topics', true)} margin={{ top: 20, right: 30, left: 20, bottom: 65 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} height={65} tick={<CustomTick />} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={10} />
                                    <Tooltip cursor={{ fill: '#f8f8f8' }} contentStyle={{ border: '1px solid #000', borderRadius: '4px' }} />
                                    <Bar dataKey="value" fill="#000" radius={[4, 4, 0, 0]} barSize={24} label={<CustomLabel />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card col-4">
                        <h3 className="card-title">Gender Balance</h3>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={getFrequencyData('gender')}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {getFrequencyData('gender').map((e, i) => (
                                            <Cell key={i} fill={GENDER_COLORS[e.name] || COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Detailed Breakdowns */}
                    <div className="card col-4">
                        <h3 className="card-title">Education Levels</h3>
                        <div style={{ height: '350px', marginTop: '20px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getFrequencyData('education_level')} margin={{ top: 20, bottom: 65 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} height={65} tick={<CustomTick />} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={10} />
                                    <Tooltip cursor={{ fill: '#f8f8f8' }} contentStyle={{ border: '1px solid #000', borderRadius: '4px' }} />
                                    <Bar dataKey="value" fill="#252525ff" radius={[4, 4, 0, 0]} barSize={32} label={<CustomLabel />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card col-4">
                        <h3 className="card-title">Participation Barriers</h3>
                        <div style={{ height: '350px', marginTop: '20px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getFrequencyData('barriers', true).slice(0, 5)} margin={{ top: 20, bottom: 65 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} height={65} tick={<CustomTick />} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={10} />
                                    <Tooltip cursor={{ fill: '#f8f8f8' }} contentStyle={{ border: '1px solid #000', borderRadius: '4px' }} />
                                    <Bar dataKey="value" fill="#575656ff" radius={[4, 4, 0, 0]} barSize={32} label={<CustomLabel />} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card col-4">
                        <h3 className="card-title">Reach Channels</h3>
                        <div style={{ height: '250px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={getFrequencyData('awareness_channels', true).slice(0, 5)}
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {getFrequencyData('awareness_channels', true).slice(0, 5).map((e, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={60}
                                        iconType="circle"
                                        formatter={(value) => <span style={{ color: '#000', fontSize: '0.65rem' }}>{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card col-12">
                        <h3 className="card-title">Regional Distribution</h3>
                        <div style={{ height: '350px', marginTop: '20px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={getFrequencyData('sub_city')} margin={{ top: 20, right: 30, left: 0, bottom: 65 }}>
                                    <defs>
                                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#000" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#000" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} height={65} tick={<CustomTick />} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={10} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="value" stroke="#000" fillOpacity={1} fill="url(#colorVal)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username && password) {
            localStorage.setItem('admin_auth', 'true');
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="vh-center container animate-slide-up">
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-8">Admin Portal</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="label">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-8">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        Log In
                    </button>
                </form>
                <div className="text-center mt-8">
                    <button
                        className="btn-secondary"
                        style={{ border: 'none', background: 'none', color: 'var(--text-muted)' }}
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;

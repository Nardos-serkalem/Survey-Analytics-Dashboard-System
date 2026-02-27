import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="vh-center container animate-slide-up">
            <header className="text-center mb-8">
                <h1 className="mb-2" style={{ fontSize: '4rem', letterSpacing: '0.2em' }}>Survey.</h1>
                <p className="text-muted" style={{ fontSize: '1.2rem', fontWeight: '300' }}>
                    Minimal. Data-Driven. Professional.
                </p>
            </header>

            <main className="text-center">
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/survey')}
                    >
                        Take Survey
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => navigate('/login')}
                    >
                        Admin Login
                    </button>
                </div>
            </main>

            <footer style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center' }}>
                <p className="text-dim" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                    &copy; {new Date().getFullYear()} SURVEY ANALYTICS CORP
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;

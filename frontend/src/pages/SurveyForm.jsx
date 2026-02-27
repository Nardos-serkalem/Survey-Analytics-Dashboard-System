import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';

const SurveyForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isExcluded, setIsExcluded] = useState(false);
    const [dynamicOptions, setDynamicOptions] = useState({});
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const currentQuestion = questionsData[currentStep];

    const endpoints_mapping = {
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
        'delivery_types': 'delivery-types',
        'desired_topics_text': 'training-topics'
    };

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const results = {};
                for (const [id, endpoint] of Object.entries(endpoints_mapping)) {
                    console.log(`Fetching ${endpoint}...`);
                    const response = await fetch(`http://localhost:8000/api/${endpoint}/`);
                    if (!response.ok) continue;
                    const data = await response.json();
                    results[id] = data.map(item => ({
                        label: item.name || item.label,
                        id: item.id
                    }));
                }
                setDynamicOptions(results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching options:", error);
                setLoading(false);
            }
        };

        fetchOptions();
    }, []);

    const handleInputChange = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const isQuestionVisible = (question, data = formData) => {
        if (!question.showIf) return true;
        const { questionId, value } = question.showIf;
        return data[questionId] === value;
    };

    const handleNext = () => {
        if (currentQuestion.id === 'consent' && formData[currentQuestion.id] === 'No') {
            setIsExcluded(true);
            return;
        }

        let nextStep = currentStep + 1;
        while (nextStep < questionsData.length && !isQuestionVisible(questionsData[nextStep])) {
            setFormData(prev => { const d = { ...prev }; delete d[questionsData[nextStep].id]; return d; });
            nextStep++;
        }

        if (nextStep < questionsData.length) {
            setCurrentStep(nextStep);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        let prevStep = currentStep - 1;
        while (prevStep >= 0 && !isQuestionVisible(questionsData[prevStep])) {
            prevStep--;
        }
        if (prevStep >= 0) setCurrentStep(prevStep);
    };

    const handleSubmit = async () => {
        setError(null);
        try {
            const payload = {
                ...formData,
                survey: 3,
                timestamp: new Date().toISOString(),
                consent: formData.consent === "Yes, I consent to participate." ? "Yes" : (formData.consent || "Yes"),
                age: Math.max(1, parseInt(formData.age) || 0),
                gender: formData.gender || "Not specified",
                likelihood_join_score: parseInt(formData.likelihood_join_score) || 5,
                certification_importance_score: parseInt(formData.certification_importance_score) || 5,
                questionnaire_rating: parseInt(formData.questionnaire_rating) || 5,
                has_telegram: formData.has_telegram === 'Yes',
                heard_of_yne: formData.heard_of_yne === 'Yes',
            };


            Object.keys(endpoints_mapping).forEach(key => {
                if (formData[key]) {
                    const options = dynamicOptions[key] || [];
                    if (Array.isArray(formData[key])) {
                        payload[key] = formData[key]
                            .map(label => options.find(o => o.label === label)?.id)
                            .filter(id => id !== undefined);
                    } else {
                        const matched = options.find(o => o.label === formData[key]);
                        payload[key] = matched ? matched.id : null;
                    }
                }
            });

            const response = await fetch('http://localhost:8000/api/responses/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                const errData = await response.json();
                console.error("Server error:", errData);
                setError(Object.values(errData).flat().join(", ") || "Submission failed.");
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setError("Could not reach the server. Please check your connection.");
        }
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
                    <div className="loader-text">Initializing Survey</div>
                </div>
            </div>
        );
    }

    if (isExcluded) {
        return (
            <div className="vh-center container animate-slide-up text-center">
                <h1 className="mb-4">Thank You.</h1>
                <p className="text-secondary mb-8">Consent is required to participate in this survey. Since you have chosen not to participate, we have ended the session. Have a great day!</p>
                <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    if (isSubmitted) {

        return (
            <div className="vh-center container animate-slide-up text-center">
                <h1 className="mb-4">Success!</h1>
                <p className="text-secondary mb-8">Your response has been recorded in the database successfully.</p>
                <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    return (
        <div className="vh-center container animate-slide-up">
            <div className="card" style={{ width: '100%', maxWidth: '640px', padding: 'var(--spacing-lg)' }}>
                <div className="mb-8" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-dim" style={{ fontSize: '0.8rem' }}>• STEP {currentStep + 1} OF {questionsData.length}</span>
                    <div style={{ background: '#eee', height: '2px', flex: 1, margin: '0 1rem', position: 'relative' }}>
                        <div style={{
                            background: '#000',
                            height: '2px',
                            width: `${((currentStep + 1) / questionsData.length) * 100}%`,
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

                <h2 className="mb-8" style={{ fontSize: '1.5rem', textTransform: 'none', letterSpacing: 'normal' }}>
                    {currentQuestion.label}
                </h2>

                <div className="form-group mb-8">
                    {currentQuestion.type === 'select' && (
                        <select
                            value={formData[currentQuestion.id] || ''}
                            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                        >
                            <option value="" disabled>Select an option</option>
                            {(dynamicOptions[currentQuestion.id] || []).map(opt => (
                                <option key={opt.id} value={opt.label}>{opt.label}</option>
                            ))}
                            {(!dynamicOptions[currentQuestion.id] && currentQuestion.options) && currentQuestion.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    )}

                    {currentQuestion.type === 'multi-select' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
                            {(dynamicOptions[currentQuestion.id] || []).map(opt => {
                                const isSelected = (formData[currentQuestion.id] || []).includes(opt.label);
                                return (
                                    <label key={opt.id} className="card" style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: isSelected ? '#000' : '#fff',
                                        color: isSelected ? '#fff' : '#000',
                                        fontSize: '0.9rem'
                                    }}>
                                        <input
                                            type="checkbox"
                                            style={{ width: 'auto', display: 'none' }}
                                            checked={isSelected}
                                            onChange={() => {
                                                const current = formData[currentQuestion.id] || [];
                                                const next = isSelected
                                                    ? current.filter(item => item !== opt.label)
                                                    : [...current, opt.label];
                                                handleInputChange(currentQuestion.id, next);
                                            }}
                                        />
                                        {opt.label}
                                    </label>
                                );
                            })}
                            {(!dynamicOptions[currentQuestion.id] && currentQuestion.options) && currentQuestion.options.map(opt => {
                                const isSelected = (formData[currentQuestion.id] || []).includes(opt);
                                return (
                                    <label key={opt} className="card" style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: isSelected ? '#000' : '#fff',
                                        color: isSelected ? '#fff' : '#000',
                                        fontSize: '0.9rem'
                                    }}>
                                        <input
                                            type="checkbox"
                                            style={{ width: 'auto', display: 'none' }}
                                            checked={isSelected}
                                            onChange={() => {
                                                const current = formData[currentQuestion.id] || [];
                                                const next = isSelected
                                                    ? current.filter(item => item !== opt)
                                                    : [...current, opt];
                                                handleInputChange(currentQuestion.id, next);
                                            }}
                                        />
                                        {opt}
                                    </label>
                                );
                            })}
                        </div>
                    )}

                    {currentQuestion.type === 'number' && (
                        <input
                            type="number"
                            min={currentQuestion.min || 0}
                            value={formData[currentQuestion.id] || ''}
                            placeholder="Enter value"
                            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                        />
                    )}

                    {currentQuestion.type === 'range' && (
                        <div>
                            <input
                                type="range"
                                min={currentQuestion.min}
                                max={currentQuestion.max}
                                value={formData[currentQuestion.id] === undefined ? currentQuestion.min : formData[currentQuestion.id]}
                                onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                            />
                            <div className="text-center mt-2 font-bold">{formData[currentQuestion.id] === undefined ? currentQuestion.min : formData[currentQuestion.id]}</div>
                        </div>
                    )}

                    {currentQuestion.type === 'text' && (
                        <input
                            type="text"
                            value={formData[currentQuestion.id] || ''}
                            placeholder="Type your answer here..."
                            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                        />
                    )}

                    {currentQuestion.type === 'textarea' && (
                        <textarea
                            rows="4"
                            value={formData[currentQuestion.id] || ''}
                            placeholder="Share your feedback here..."
                            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                        />
                    )}


                </div>

                {error && (
                    <div className="mb-8 p-4 bg-error-light text-error rounded" style={{ border: '1px solid var(--error)', backgroundColor: '#fff5f5', color: '#ff0000', fontSize: '0.85rem' }}>
                        <p><strong>Submission Error:</strong> {error}</p>
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem' }}>
                    {currentStep > 0 && (
                        <button className="btn-secondary" style={{ flex: 1 }} onClick={handleBack}>Back</button>
                    )}
                    <button
                        className="btn-primary"
                        style={{ flex: 2 }}
                        onClick={handleNext}
                        disabled={
                            currentQuestion.required &&
                            formData[currentQuestion.id] === undefined &&
                            currentQuestion.type !== 'range'
                        }
                    >

                        {currentStep === questionsData.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SurveyForm;

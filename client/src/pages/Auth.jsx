import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, AlertCircle } from 'lucide-react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData.name, formData.email, formData.password);
            }
            navigate('/account');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-white">
            <div className="max-w-md w-full bg-brandWarmIvory p-8 border border-neutral-300 shadow-sm space-y-6">

                {/* Header Tabs */}
                <div className="flex border-b border-neutral-300">
                    <button
                        onClick={() => { setIsLogin(true); setError(''); }}
                        className={`w-1/2 py-3.5 text-sm font-bold uppercase tracking-wider transition-all ${isLogin ? 'border-b-2 border-brandBlack text-brandBlack' : 'text-neutral-400 hover:text-black'
                            }`}
                    >
                        Client Login
                    </button>
                    <button
                        onClick={() => { setIsLogin(false); setError(''); }}
                        className={`w-1/2 py-3.5 text-sm font-bold uppercase tracking-wider transition-all ${!isLogin ? 'border-b-2 border-brandBlack text-brandBlack' : 'text-neutral-400 hover:text-black'
                            }`}
                    >
                        Register Identity
                    </button>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-black uppercase tracking-tight font-serif text-brandBlack">
                        {isLogin ? 'Welcome Back' : 'Create Your Atelier Identity'}
                    </h2>
                    <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">
                        {isLogin ? 'Access your orders and fast-track checkout' : 'Gain drop privileges and saved preferences'}
                    </p>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-brandRed/30 text-brandRed flex items-center gap-2 text-sm uppercase tracking-wider">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    {!isLogin && (
                        <div>
                            <label className="text-sm font-bold uppercase tracking-wider block mb-1">Full Name</label>
                            <div className="relative">
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Julian Hayes"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-neutral-300 p-3.5 pl-10 text-sm focus:outline-none focus:border-brandBlack"
                                />
                                <User size={16} className="absolute left-3.5 top-4 text-neutral-400" />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-bold uppercase tracking-wider block mb-1">Email Address</label>
                        <div className="relative">
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="client@atelier.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white border border-neutral-300 p-3.5 pl-10 text-sm focus:outline-none focus:border-brandBlack"
                            />
                            <Mail size={16} className="absolute left-3.5 top-4 text-neutral-400" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold uppercase tracking-wider block mb-1">Password</label>
                        <div className="relative">
                            <input
                                required
                                type="password"
                                name="password"
                                placeholder="••••••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-white border border-neutral-300 p-3.5 pl-10 text-sm focus:outline-none focus:border-brandBlack"
                            />
                            <Lock size={16} className="absolute left-3.5 top-4 text-neutral-400" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-brandBlack text-white text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack transition-all shadow-md disabled:bg-neutral-400 mt-2"
                    >
                        {loading ? 'Authenticating...' : isLogin ? 'Access Account' : 'Confirm Registration'}
                    </button>
                </form>

            </div>
        </div>
    );
}
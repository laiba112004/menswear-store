import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { Package, User, LogOut, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Account() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await API.get('/auth/profile');
                setProfileData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return <div className="py-32 text-center uppercase tracking-wider text-sm font-semibold">Loading client portfolio...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            {/* Top Welcome Bar */}
            <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                <div>
                    <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-brandGold font-bold">Client Membership</span>
                    <h1 className="text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
                        Account Dashboard
                    </h1>
                    <p className="text-sm text-neutral-600 font-medium mt-1">Logged in as {user?.email}</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 border border-neutral-300 text-sm font-bold uppercase tracking-wider text-brandBlack hover:border-black flex items-center gap-2 self-start sm:self-auto"
                >
                    <LogOut size={16} /> Terminate Session
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left: Client Profile Overview */}
                <div className="bg-brandWarmIvory p-6 border border-neutral-200 space-y-6 h-fit">
                    <div className="flex items-center gap-3 border-b border-neutral-300/60 pb-4">
                        <div className="w-12 h-12 bg-brandBlack text-white rounded-full flex items-center justify-center font-serif text-lg font-bold uppercase">
                            {user?.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                            <h3 className="text-base font-bold uppercase text-brandBlack">{user?.name}</h3>
                            <span className="text-sm text-neutral-500">Verified Atelier Client</span>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-neutral-700">
                        <h4 className="font-bold uppercase tracking-wider text-brandBlack text-sm">Membership Privileges</h4>
                        <div className="flex items-center gap-2 text-sm"><ShieldCheck size={16} className="text-brandBlack" /> Encrypted express checkout enabled</div>
                        <div className="flex items-center gap-2 text-sm"><Package size={16} className="text-brandBlack" /> Automated drop order tracking</div>
                    </div>

                    <div className="pt-2">
                        <Link
                            to="/shop"
                            className="w-full py-3 bg-brandBlack text-white text-center block text-sm font-bold uppercase tracking-wider hover:bg-brandSoftBlack"
                        >
                            Browse New Drops
                        </Link>
                    </div>
                </div>

                {/* Right: Order History (FR-A01) */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-base font-bold uppercase tracking-wider text-brandBlack">
                        Order Archive & Dispatches ({profileData?.orders?.length || 0})
                    </h2>

                    {!profileData?.orders || profileData.orders.length === 0 ? (
                        <div className="p-12 text-center bg-neutral-50 border border-neutral-200 space-y-3">
                            <Package size={28} className="mx-auto text-brandGrey" />
                            <p className="text-sm uppercase tracking-wider text-neutral-600 font-semibold">
                                No purchases recorded under this account identity yet.
                            </p>
                            <Link to="/shop" className="inline-block text-sm uppercase tracking-wider text-brandRed underline font-bold mt-2">
                                Discover First Capsule Drop
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {profileData.orders.map((ord) => (
                                <div key={ord._id} className="border border-neutral-200 p-5 bg-white space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-3 gap-2">
                                        <div>
                                            <span className="text-sm uppercase tracking-wider text-neutral-500 font-bold">Reference Identifier</span>
                                            <p className="text-base font-mono font-bold text-brandBlack">{ord.paymentResult?.id || ord._id}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-base font-mono font-bold text-brandBlack">${ord.totalPrice}</span>
                                            <span className="bg-brandBlack text-white text-sm font-bold uppercase tracking-wider px-3 py-1">
                                                {ord.orderStatus}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="divide-y divide-neutral-100 text-sm">
                                        {ord.orderItems?.map((it, idx) => (
                                             <div key={idx} className="py-2.5 flex justify-between items-center">
                                                <span className="text-neutral-700 font-medium">{it.title} ({it.size} / {it.color}) × {it.qty}</span>
                                                <span className="font-mono text-neutral-600 font-bold">${it.price * it.qty}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Link
                                            to="/track-order"
                                            className="text-sm uppercase tracking-wider font-bold text-brandRed hover:underline flex items-center gap-1.5"
                                        >
                                            Track Dispatch Real-Time <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
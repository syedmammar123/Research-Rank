import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ResearchRatingComponent from '../../components/ResearchRating/index';

const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleHomeClick = () => {
        window.location.reload();
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const email = user.email;
                const q = query(collection(db, 'users'), where('email', '==', email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    setUserData(userData);
                } else {
                    navigate('/app/register');
                }
            } else {
                navigate('/app/login');
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [navigate]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-600 text-lg font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Home Button */}
                        <button
                            onClick={handleHomeClick}
                            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Research Rank</span>
                        </button>

                        {/* Welcome Message */}
                        <div className="hidden md:flex items-center space-x-2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-gray-600">Welcome,</span>
                            <span className="font-semibold text-indigo-600">{userData?.firstName}</span>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            {/* Mobile Welcome */}
                            <div className="md:hidden">
                                <span className="text-sm text-gray-600">Hi, </span>
                                <span className="text-sm font-semibold text-indigo-600">{userData?.firstName}</span>
                            </div>
                            
                            {/* User Info Dropdown */}
                            <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900">
                                        {userData?.firstName} {userData?.lastName}
                                    </div>
                                    <div className="text-xs text-gray-500">{userData?.specialty}</div>
                                </div>
                                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                        {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
                                    </span>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {userData && <ResearchRatingComponent userData={userData} />}
            </main>
        </div>
    );
};

export default Home;
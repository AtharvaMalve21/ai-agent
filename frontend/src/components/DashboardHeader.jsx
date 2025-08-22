import React, { useContext, useState } from 'react';
import { LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

const DashboardHeader = () => {
    const { user, logout, isLoading } = useContext(AuthContext);
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogoutClick = async () => {
        setLoggingOut(true);
        await logout(); 
        setLoggingOut(false);
    };

    const getDisplayName = () => {
        if (user) {
            return user.name || user.email || 'User';
        }
        return 'Admin';
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Agent Management System</h1>
                <div className="flex items-center space-x-4">
                    {user && (
                        <div className="flex flex-col items-end">
                            <span className="text-gray-700 font-medium">
                                Welcome, {getDisplayName()}
                            </span>
                            {user.email && user.name && (
                                <span className="text-xs text-gray-500">{user.email}</span>
                            )}
                        </div>
                    )}
                    <button
                        onClick={handleLogoutClick}
                        disabled={loggingOut || isLoading}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title={loggingOut ? 'Logging out...' : 'Logout'}
                    >
                        <LogOut size={20} />
                        <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
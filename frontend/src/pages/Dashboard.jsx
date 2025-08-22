import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import DashboardHeader from '../components/DashboardHeader.jsx';
import Sidebar from '../components/Sidebar.jsx';

const Dashboard = () => {
    const { user, logout, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <DashboardHeader user={user} onLogout={logout} />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
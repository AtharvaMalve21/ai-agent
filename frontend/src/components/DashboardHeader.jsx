import React from "react";
import { LogOut } from 'lucide-react';



const DashboardHeader = ({ user, onLogout }) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Agent Management System</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Welcome, Admin</span>
                    <button
                        onClick={onLogout}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader
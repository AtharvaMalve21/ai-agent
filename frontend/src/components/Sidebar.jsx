import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { Upload, Users, List } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const tabs = [
        { id: 'agents', label: 'Manage Agents', icon: Users, path: '/agents' },
        { id: 'upload', label: 'Upload Lists', icon: Upload, path: '/upload' },
        { id: 'lists', label: 'View Lists', icon: List, path: '/lists' },
    ];

    return (
        <aside className="bg-gray-50 w-64 min-h-screen border-r border-gray-200 p-4 flex-shrink-0">
            <nav className="mt-8">
                <ul className="space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = location.pathname === tab.path;

                        return (
                            <li key={tab.id}>
                                <Link
                                    to={tab.path}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                                >
                                    <Icon size={20} />
                                    <span>{tab.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
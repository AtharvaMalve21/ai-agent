import React from "react";
import { Upload, Users, List } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'agents', label: 'Manage Agents', icon: Users },
        { id: 'upload', label: 'Upload Lists', icon: Upload },
        { id: 'lists', label: 'View Lists', icon: List },
    ];

    return (
        <aside className="bg-gray-50 w-64 min-h-screen border-r border-gray-200">
            <nav className="p-4">
                <ul className="space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{tab.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar
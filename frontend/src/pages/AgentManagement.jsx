import React, { useState, useEffect, useContext } from 'react';
import { api } from "../services/api.js";
import { Plus, User, Phone } from 'lucide-react';
import AddAgentForm from './AddAgentForm.jsx';

const AgentManagement = () => {
    const [agents, setAgents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

   
    const fetchAgents = async () => {
        setIsLoading(true);
        try {
            const data = await api.getAgents();
            setAgents(data);
        } catch (err) {
            console.error('Error fetching agents:', err);
            
        } finally {
            setIsLoading(false);
        }
    };

   
    useEffect(() => {
        fetchAgents();
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[50vh]">
                <div className="text-gray-500">Loading agents...</div>
            </div>
        );
    }
    
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Agent Management</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus size={20} />
                    <span>Add Agent</span>
                </button>
            </div>
            
           
            {showForm && (
                <AddAgentForm 
                    onSuccess={() => {
                        setShowForm(false);
                        fetchAgents(); // Refresh the list after a successful add
                    }}
                    onClose={() => setShowForm(false)}
                />
            )}
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {agents.length > 0 ? (
                            agents.map((agent) => (
                                <tr key={agent._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                                                <div className="text-sm text-gray-500">{agent.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                            {agent.mobile}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(agent.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-8 text-gray-500">No agents found. Create your first agent!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgentManagement;
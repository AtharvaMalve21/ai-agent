import React, { useState } from 'react';
import { X } from 'lucide-react';
import { api } from "../services/api.js";
import toast from 'react-hot-toast';

const AddAgentForm = ({ onSuccess, onClose }) => {
    const [newAgent, setNewAgent] = useState({ name: '', email: '', mobile: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.createAgent(newAgent);
            toast.success('Agent created successfully!');
            onSuccess();
        } catch (err) {
            console.error('Error creating agent:', err);
            // The API interceptor will handle the error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Add New Agent</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input fields for name, email, mobile, and password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" name="name" required value={newAgent.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" disabled={loading} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" required value={newAgent.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" disabled={loading} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <input type="tel" name="mobile" required value={newAgent.mobile} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" disabled={loading} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" name="password" required value={newAgent.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" disabled={loading} />
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Creating...' : 'Create Agent'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAgentForm;
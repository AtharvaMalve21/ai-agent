import React, { useState, useEffect } from "react";
import { api } from "../../services/api.js";
import { List, User, Phone } from 'lucide-react';

const ListsView = ({ token }) => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        try {
            const data = await api.getLists(token);
            setLists(data);
        } catch (err) {
            setError('Failed to fetch lists');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Distributed Lists</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <div className="grid gap-6">
                {lists.map((list) => (
                    <div key={list._id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{list.agentName}</h3>
                                    <p className="text-sm text-gray-500">{list.agentEmail}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-blue-600">{list.contacts.length}</p>
                                <p className="text-sm text-gray-500">Contacts</p>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="grid gap-3">
                                {list.contacts.slice(0, 3).map((contact, index) => (
                                    <div key={index} className="flex items-center space-x-3 text-sm">
                                        <User className="h-4 w-4 text-gray-400" />
                                        <span className="font-medium">{contact.firstName}</span>
                                        <Phone className="h-4 w-4 text-gray-400 ml-auto" />
                                        <span className="text-gray-600">{contact.phone}</span>
                                    </div>
                                ))}
                                {list.contacts.length > 3 && (
                                    <p className="text-sm text-gray-500 text-center pt-2">
                                        ... and {list.contacts.length - 3} more contacts
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {lists.length === 0 && (
                <div className="text-center py-12">
                    <List className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg">No lists distributed yet.</p>
                    <p className="text-gray-400 text-sm">Upload a CSV file to get started.</p>
                </div>
            )}
        </div>
    );
};


export default ListsView
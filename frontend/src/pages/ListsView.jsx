import React, { useState, useEffect } from "react";
import { api } from "../services/api.js";
import { List, User, Phone, RefreshCw } from 'lucide-react';

const ListsView = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchLists();
    }, []);

    const fetchLists = async () => {
        // Use the refreshing state to show a different UI for re-fetches
        if (!refreshing) {
            setLoading(true);
        }

        try {
            const data = await api.getLists();
            setLists(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching lists:', err);
            // The API interceptor will handle displaying a toast notification.
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchLists();
    };

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center min-h-64">
                <div className="flex flex-col items-center space-y-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-gray-500 text-sm">Loading lists...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Distributed Lists</h2>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
            </div>

            <div className="grid gap-6">
                {lists.length > 0 ? (
                    lists.map((list) => (
                        <div key={list._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
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
                                    <p className="text-2xl font-bold text-blue-600">{list.contacts?.length || 0}</p>
                                    <p className="text-sm text-gray-500">Contacts</p>
                                </div>
                            </div>
                            {list.contacts && list.contacts.length > 0 ? (
                                <div className="border-t pt-4">
                                    <div className="grid gap-3">
                                        {list.contacts.slice(0, 3).map((contact, index) => (
                                            <div key={index} className="flex items-center space-x-3 text-sm">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium">{contact.firstName || 'N/A'}</span>
                                                <div className="flex items-center space-x-1 ml-auto">
                                                    <Phone className="h-4 w-4 text-gray-400" />
                                                    <span className="text-gray-600">{contact.phone || 'N/A'}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {list.contacts.length > 3 && (
                                            <div className="text-sm text-gray-500 text-center pt-2 border-t">
                                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                                    ... and {list.contacts.length - 3} more contacts
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="border-t pt-4 text-center text-gray-500 text-sm">
                                    No contacts assigned yet
                                </div>
                            )}
                            {list.createdAt && (
                                <div className="mt-4 pt-4 border-t text-xs text-gray-400">
                                    Distributed on: {new Date(list.createdAt).toLocaleString()}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 col-span-full">
                        <List className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No lists distributed yet</p>
                        <p className="text-gray-400 text-sm mt-2">Upload a CSV file to get started with contact distribution.</p>
                        <button
                            onClick={handleRefresh}
                            className="mt-4 text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                            Check for updates
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListsView;
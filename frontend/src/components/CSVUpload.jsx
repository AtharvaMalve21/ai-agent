import React,{useState} from "react";
import { api } from "../../services/api.js";
import { Upload, Check } from 'lucide-react';


const CSVUpload = ({ token }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type === 'text/csv' || droppedFile.name.endsWith('.csv')) {
                setFile(droppedFile);
            } else {
                setError('Please select a CSV file');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        setUploading(true);
        setError('');
        setSuccess('');

        try {
            const result = await api.uploadCSV(file, token);
            setSuccess('CSV uploaded and distributed successfully!');
            setFile(null);
        } catch (err) {
            setError('Failed to upload CSV. Please check the file format.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload CSV Lists</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    {success}
                </div>
            )}

            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSubmit}>
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                            ? 'border-blue-400 bg-blue-50'
                            : file
                                ? 'border-green-400 bg-green-50'
                                : 'border-gray-300'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <Upload className={`mx-auto h-12 w-12 mb-4 ${file ? 'text-green-500' : 'text-gray-400'
                            }`} />

                        {file ? (
                            <div>
                                <p className="text-lg font-medium text-green-700 mb-2">File Selected:</p>
                                <p className="text-sm text-gray-600">{file.name}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Size: {(file.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-medium text-gray-900 mb-2">
                                    Drop your CSV file here, or click to select
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Supports CSV files with FirstName, Phone, Notes columns
                                </p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                            id="csv-upload"
                        />
                        <label
                            htmlFor="csv-upload"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                            Choose File
                        </label>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={!file || uploading}
                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {uploading ? 'Uploading and Distributing...' : 'Upload and Distribute'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">CSV Format Requirements:</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">Your CSV file should contain the following columns:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• <strong>FirstName</strong> - Text field for contact name</li>
                            <li>• <strong>Phone</strong> - Number field for contact phone</li>
                            <li>• <strong>Notes</strong> - Text field for additional notes</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-2">
                            The system will automatically distribute the contacts equally among all available agents.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CSVUpload
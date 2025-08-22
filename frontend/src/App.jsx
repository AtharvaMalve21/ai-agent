import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "react-hot-toast";
import LoginForm from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Dashboard from './pages/Dashboard.jsx'; 
import AgentManagement from './pages/AgentManagement.jsx';
import CSVUpload from './pages/CSVUpload.jsx';
import ListsView from './pages/ListsView.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


const App = () => {
    return (
        <AuthProvider>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                        <Route index element={<AgentManagement />} />
                        <Route path="agents" element={<AgentManagement />} />
                        <Route path="upload" element={<CSVUpload />} />
                        <Route path="lists" element={<ListsView />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Toaster
                    position="top-right"
                />
        </AuthProvider>
    );
};

export default App;
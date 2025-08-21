import React,{useState} from "react";
import AgentManagement from "./AgentManagement.jsx";
import CSVUpload from "./CSVUpload.jsx";
import ListsView from "./ListView.jsx";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar.jsx";


const Dashboard = ({ token, onLogout }) => {
    const [activeTab, setActiveTab] = useState('agents');

    const renderContent = () => {
        switch (activeTab) {
            case 'agents':
                return <AgentManagement token={token} />;
            case 'upload':
                return <CSVUpload token={token} />;
            case 'lists':
                return <ListsView token={token} />;
            default:
                return <AgentManagement token={token} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <DashboardHeader onLogout={onLogout} />
            <div className="flex">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="flex-1">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};
export default Dashboard
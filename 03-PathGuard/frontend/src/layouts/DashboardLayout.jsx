import React from 'react'
import Sidebar from '../components/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Projects from '../pages/Project/Projects'
import EmptyState from '../components/EmptyState'
import { FolderKanban } from 'lucide-react'
import ProjectDetail from '../pages/Project/ProjectDetail'
import Notes from '../pages/Notes/Notes'
import NotesDetail from '../pages/Notes/NotesDetail'
import Profile from '../pages/Profile/Profile'

const DashboardLayout = () => {

    // Root Redirector based on localStorage caching
    const RootRedirect = () => {
        const savedSection = localStorage.getItem('pathguard_last_section') || '/projects';
        const savedItem = localStorage.getItem('pathguard_last_item');
        const targetPath = savedItem ? savedItem : savedSection;
        return <Navigate to={targetPath} replace />;
    };

    return (
        <div className="app-container">
            {/* Navigation Sidebar */}
            <Sidebar />

            {/* Main Workspace content */}
            <main className='main-content'>
                <Routes>

                    <Route index element={<RootRedirect />} />

                    <Route path="projects" element={<Projects />} >
                        <Route index element={
                            <EmptyState
                                title="No Project Selected"
                                description="Select a project from the list to view its details and tasks."
                                icon={FolderKanban}
                            />
                        } />
                        <Route path=":projectId" element={<ProjectDetail />} />
                    </Route>

                    <Route path="notes" element={<Notes />} >
                        <Route index element={
                            <EmptyState
                                title="No Notes Selected"
                                description="Select a notes from the list to view its details and tasks."
                                icon={FolderKanban}
                            />
                        } />
                        <Route path=":notesId" element={<NotesDetail />} />
                    </Route>

                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/" replace />} />

                </Routes>
            </main>
        </div>
    )
}

export default DashboardLayout
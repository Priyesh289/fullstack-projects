import { createContext, useContext, useState } from "react";
import API_URL from "../services/api";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);

    const [projectCreateId, setProjectCreateId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();

    const changeTaskStatus = async (taskId,projectId) => {
        try {
            const response = await axios.patch(`${API_URL}/task/${taskId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            if (data.success) {
                
                await fetchAllProjects();
                const updatedData = await fetchProjectById(projectId);
                return updatedData
            }

        } catch (error) {
            console.log(error)
        }
    }

    const updateProject = async (projectId, status, title, description) => {
        try {
            const response = await axios.patch(`${API_URL}/projects/${projectId}`, { status, title, description }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            await fetchProjectById(projectId)
            return (data.data)
        } catch (error) {
            console.log(error);

        }
    }

    const deleteProject = async (projectId) => {
        try {

            if (!projectId) {
                navigate('/projects');
                return
            }
            const response = await axios.delete(`${API_URL}/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            if (data.success) {
                toast.success(data.message);
                await fetchAllProjects()
                return true
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProjectById = async (projectId) => {
        try {
            const response = await axios.get(`${API_URL}/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            if (data.success) {
                return data.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAllProjects = async () => {
        try {
            const response = await axios.get(`${API_URL}/projects/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            if (data.success) {
                setProjects(data.data);
                setLoading(false);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const addTaskToProject = async (projectId, text) => {
        try {
            const response = await axios.post(`${API_URL}/projects/${projectId}/tasks`, { text }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data;
            if (data.success) {
                toast.success(data.message);
                return true
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong")

        }
    }


    const projectCreate = async (title, description) => {
        try {
            const response = await axios.post(`${API_URL}/projects/create-project`, { title, description }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            if (data.success) {
                await fetchAllProjects();

                toast.success(data.message);
                return data.project


            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllProjects()
    }, [])

    const value = {
        projects, changeTaskStatus,
        projectCreate, addTaskToProject, fetchAllProjects,
        fetchProjectById, deleteProject, updateProject
    };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    )
}

export const useProject = (() =>
    useContext(ProjectContext)
)

export default ProjectProvider;
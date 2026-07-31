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
    const [copyProjectId, setCopyProjectId] = useState(null)
    const [projectCreateId, setProjectCreateId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();

    //Delete Task
    const deleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`${API_URL}/task/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            if (data.success) {
                await fetchAllProjects();
                return true
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Toggle task Status
    const changeTaskStatus = async (taskId) => {
        try {
            const response = await axios.patch(`${API_URL}/task/${taskId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            if (data.success) {

                await fetchAllProjects();
                return data.task
            }

        } catch (error) {
            console.log(error)
        }
    }

    //Update Project
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

    //Delete Project
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

    //fetch Particular One Project
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


    //fetch All Project
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

    //Add task into Project
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

    //Create Project
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
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    useEffect(() => {
        fetchAllProjects()
    }, [token])

    const value = {
        projects, changeTaskStatus, deleteTask,
        projectCreate, addTaskToProject, fetchAllProjects,
        fetchProjectById, deleteProject, updateProject,
        copyProjectId, setCopyProjectId
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
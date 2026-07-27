import { createContext, useContext, useState } from "react";
import API_URL from "../services/api";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState("");
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${API_URL}/projects/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            if (data.success) {
                setProjects(data.data);
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const addTaskToProject = async (text) => {
        try {
            const response = await axios.post(`${API_URL}/projects/${projectId}/tasks`, { text }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data;
            if (data.success) {
                toast.success(data.message);
                return
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
                toast.success(data.message);
                setProjectId(data.project._id);
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    const value = { projectId, projects, projectCreate, addTaskToProject };

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
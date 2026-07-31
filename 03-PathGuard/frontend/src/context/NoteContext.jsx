import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import API_URL from "../services/api";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";


const NoteContext = createContext();


export const NoteProvider = ({ children }) => {

    const { token } = useAuth();
    const [notes, setNotes] = useState([]);
    const [copyNoteId, setCopyNoteId] = useState(null);


    const fetchSingleNote = async (notesId) => {

        try {
            const response = await axios.get(`${API_URL}/notes/${notesId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data;
            if (data.success) {
                return (data.data);

            }
        } catch (error) {
            console.log(error)
        }
    }

    //fetch All Notes
    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${API_URL}/notes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data;
            if (data.success) {
                setNotes(data.data);

            }

        } catch (error) {
            console.log(error)
        }
    }

    //Delete Task
    const deleteNotes = async (noteId) => {
        try {
            const response = await axios.delete(`${API_URL}/notes/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data;
            if (data.success) {
                return true
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    // Edit Notes
    const editNotes = async (noteId, color, category, title, description) => {
        try {
            const response = await axios.patch(`${API_URL}/notes/${noteId}`, { title, description, color, category }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data;
            if (data.success) {
                await fetchNotes()
                return data.notes
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    //Create Notes
    const createNotes = async () => {
        try {
            const response = await axios.post(`${API_URL}/notes/create-notes`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = response.data;
            if (data.success) {
                await fetchNotes()
                return data.note
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [token])
    const value = {
        createNotes, fetchNotes,
        editNotes, fetchSingleNote,
        deleteNotes, notes, setNotes, copyNoteId,
        setCopyNoteId
    }
    return (
        <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = (() => {
    return useContext(NoteContext)
})


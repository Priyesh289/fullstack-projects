import { Tag, Trash2, Info, Calendar, ShieldCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../../context/NoteContext';

const COLOR_PALETTE = [
    { value: '#0f172a', label: 'Obsidian Slate' },
    { value: '#051b14', label: 'Viper Green' },
    { value: '#1a0505', label: 'Crimson Breach' },
    { value: '#1b0c24', label: 'Purple Nebula' },
    { value: '#09152b', label: 'Deep Abyss' }
];

const CATEGORIES = [
    'General',
    'Security',
    'Infrastructure',
    'Credentials',
    'Personal',
    'Logs'
];


const NotesDetail = () => {

    const [note, setNote] = useState(null);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);


    const {
        createNotes, fetchNotes, editNotes,
        fetchSingleNote, deleteNotes,
        copyNoteId, setCopyNoteId
    } = useNotes()


    //noteId from route
    const { noteId } = useParams();

    const navigate = useNavigate()


    const handleSaveColor = async (color) => {
        const updatedColor = await editNotes(noteId, color, undefined, undefined, undefined);
        if (updatedColor) {
            updatedNote(updatedColor);
        }
    }

    const handleSaveCategory = async (category) => {
        const updatedCategory = await editNotes(noteId, undefined, category, undefined, undefined);
        if (updatedCategory) {
            updatedNote(updatedCategory);
        }
    }

    const handleSaveTitle = async (title) => {
        const updatedTitle = await editNotes(noteId, undefined, undefined, title, undefined);
        if (updatedTitle) {
            updatedNote(updatedTitle);
        }
    }

    const handleSaveBody = async (description) => {
        const updatedDescryption = await editNotes(noteId, undefined, undefined, undefined, description);
        if (updatedDescryption) {
            updatedNote(updatedDescryption);
        }
    }
    const handleDeleteNote = async () => {
        let hasDeleted = await deleteNotes(noteId);
        if (hasDeleted) {
            navigate('/notes')
        }
    }

    const getWordCount = () => {
        return body.trim().split(/\s+/).filter(Boolean).length;
    }

    const getCharCount = () => {
        return body.length;
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    const updatedNote = async (note) => {

        const fetchNote = await fetchSingleNote(noteId);

        if (fetchNote) {

            setNote(fetchNote);
            setTitle(fetchNote.title)
            setBody(fetchNote.description);
            setCategory(fetchNote.category);
        }

    }

    useEffect(() => {
        if (!noteId) return;

        if (noteId) {
            setCopyNoteId(noteId)
        }

        updatedNote()
    }, [noteId]);

    if (!note) {
        return (
            <div className="vault-empty-state">
                <ShieldCheck size={48} style={{ opacity: 0.3 }} />
                <h3>Note File Sealed</h3>
                <p>Access criteria not met or the file has been purged from the logs.</p>
            </div>
        );
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: note.color || '#020617',
                transition: 'background-color 0.5s ease-in-out',
                backgroundImage: 'radial-gradient(ellipse at top right, rgba(255,255,255,0.02), transparent)'
            }}
        >
            {/* Detail Header */}
            <div className="vault-detail-header" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="note-color-picker">
                        {COLOR_PALETTE.map((color) => (
                            <button
                                key={color.value}
                                onClick={() => handleSaveColor(color.value)}
                                className={`color-option ${note.color === color.value ? 'selected' : ''}`}
                                style={{ backgroundColor: color.value }}
                                title={color.label}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Category Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                        <Tag size={14} color="var(--text-muted)" />
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                handleSaveCategory(e.target.value);
                            }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '0.85rem',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat} style={{ background: '#0b1329', color: '#fff' }}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleDeleteNote} className="btn btn-danger btn-icon" title="Shred Note">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Note Edit Area */}
            <div className="vault-detail-content" style={{ padding: '40px 32px' }}>
                <input
                    type="text"
                    className="editable-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => handleSaveTitle(title)}
                    placeholder="Unnamed Note"
                    style={{ fontSize: '2.2rem' }}
                />

                {/* Note Metadata */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', paddingLeft: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} />
                        <span>Created: {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Info size={14} />
                        <span>{getWordCount()} words / {getCharCount()} characters</span>
                    </div>
                </div>

                <textarea
                    className="note-body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    onBlur={() => handleSaveBody(body)}
                    placeholder="Type decrypted note records here..."
                    style={{
                        fontFamily: category === 'Logs' ? 'var(--font-mono)' : 'var(--font-sans)',
                        fontSize: category === 'Logs' ? '0.95rem' : '1.05rem',
                        lineHeight: 1.6
                    }}
                />
            </div>
        </div>
    );
}

export default NotesDetail
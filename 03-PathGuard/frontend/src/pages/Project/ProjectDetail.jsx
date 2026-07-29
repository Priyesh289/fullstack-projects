import { Calendar, Plus, ShieldCheck, Trash2Icon, TrashIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useProject } from '../../context/ProjectContext';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const [status, setStatus] = useState('active');
  const [hasCreated, setHasCreated] = useState(false);
  // Form input local states (to allow fluent editing before blur-saving)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //pending=> change initial state of project from "" to null
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(true);

  // New task input state
  const [newTaskText, setNewTaskText] = useState('');

  const {
    projectCreate, addTaskToProject, deleteProject,
    updateProject, fetchProjectById, setProjectId,
    projectDataById, fetchAllProjects, changeTaskStatus
  } = useProject()

  const [taskList, setTaskList] = useState([])

  const { projectId } = useParams();
  const navigate = useNavigate()

  //Delete Project
  const handleDeleteProject = async () => {
    const project = await deleteProject(projectId);
    if (project) {
      navigate('/projects')
    }

  }


  const handleStatusChange = async (projectStatus) => {
    const project = await updateProject(projectId, projectStatus, undefined, undefined);
    if (project) {
      setStatus(project.status);
    }
    await fetchAllProjects()
  }


  const handleDeleteTask = (taskId) => {
    setTaskList(prevTasks =>
      prevTasks.filter((task) => task.id !== taskId)
    )
  }

  const formattedDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown date';


  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTaskText.trim()) return;
    let taskAdded = await addTaskToProject(projectId, newTaskText);
    if (taskAdded) {
      await fetchAllProjects();
      let recentProject = await fetchProjectById(projectId);
      setTaskList(recentProject.tasks)
    }
    setNewTaskText('')

    /*
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    }
    setTaskList([...taskList, newTask]);
    setNewTaskText('')
    */
  }

  const handleToggleTask = async (taskId, projectId) => {
    console.log('I am clicking', taskId);

    let project = await changeTaskStatus(taskId);
    setTaskList(project.tasks)

  }

  const createProject = async () => {

    const project = await projectCreate(title, description);
    if (project) {
      navigate(`/projects/${project._id}`);
    }

  }


  const handleSaveField = (title) => {
    //
  }

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) {
        setHasCreated(false)
        setTitle("");
        setDescription("");
        return
      }

      const project = await fetchProjectById(projectId);
      setHasCreated(true)
      setTitle(project.title);
      setDescription(project.description);
      setTaskList(project.tasks);
      setStatus(project.status)
    }
    loadProject()
  }, [projectId])
  console.log(taskList)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div className="vault-detail-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="#06b6d4" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Create New Project
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Status Badges Select */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
            <button
              onClick={() => handleStatusChange('active')}
              className="btn btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                background: status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                borderColor: status === 'active' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                color: status === 'active' ? '#34d399' : 'var(--text-secondary)'
              }}
            >
              Active
            </button>
            <button
              onClick={() => handleStatusChange('hold')}
              className="btn btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                background: status === 'hold' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                borderColor: status === 'hold' ? 'rgba(245, 158, 11, 0.3)' : 'transparent',
                color: status === 'hold' ? '#fbbf24' : 'var(--text-secondary)'
              }}
            >
              Hold
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className="btn btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                background: status === 'completed' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                borderColor: status === 'completed' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                color: status === 'completed' ? '#818cf8' : 'var(--text-secondary)'
              }}
            >
              Done
            </button>
          </div>

          <button onClick={handleDeleteProject} className="btn btn-danger btn-icon" title="Erase Project">
            <Trash2Icon size={18} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="vault-detail-content">
        {/* Title */}
        <input
          type="text"
          className="editable-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          //onBlur={() => handleSaveField('title', title)}
          placeholder="Project Name"
        />

        {/* Date Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '8px' }}>
          <Calendar size={14} />
          <span>Created: {formattedDate}</span>
        </div>

        {/* Description */}
        <textarea
          className="editable-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          //onBlur={() => handleSaveField('description', description)}
          placeholder="Description"
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>

          {!hasCreated ? (
            <button type="submit" className="btn btn-secondary" style={{ flexShrink: 0 }}
              onClick={createProject} disabled={!!projectId}
            >
              <Plus size={18} />
              <span>Create</span>
            </button>
          ) : ""}
        </div>

        <hr style={{ border: 'none', borderBottom: '1px solid var(--border-glass)' }} />

        {/* Checklist Section */}
        <div className="task-section">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', paddingLeft: '8px' }}>
            Vault Task Matrix ({taskList.filter(t => t.completed).length}/{taskList.length})
          </h3>

          {/* Add Task Input Form */}
          <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="form-input"
              style={{ flex: 1 }}
              placeholder="Write new task item..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary" style={{ flexShrink: 0 }}>
              <Plus size={18} />
              <span>Add</span>
            </button>
          </form>

          {/* Task Checklist Items */}
          <div className="task-list">
            {taskList.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '16px', textAlign: 'center', fontStyle: 'italic' }}>
                No tasks Added yet.
              </p>
            ) : (
              taskList.map((task) => (
                <div
                  key={task._id}
                  className={`task-row ${task.completed ? 'completed' : ''}`}
                >
                  <div
                    className="task-checkbox-wrapper"
                    onClick={() => handleToggleTask(task._id)}
                  >
                    <div className="task-checkbox">
                      {task.completed && <div style={{ width: '8px', height: '8px', borderRadius: '1px', backgroundColor: '#fff' }}></div>}
                    </div>
                    <span className="task-text">{task.text}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn btn-secondary btn-icon"
                    style={{ padding: '6px', border: 'none', background: 'transparent' }}
                  >
                    <Trash2Icon size={14} color="#fca5a5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>

  )
}

export default ProjectDetail
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Button from '../../components/button';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import Footer from '../../components/footer';
import Table from '../../components/Table';
import './admin.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  // Placeholder tasks, you can replace this with actual API data
  const fetchTasks = () => {
    setTasks([
      { id: 1, name: 'Task 1', description: 'Description of Task 1', deadline: '2024-01-10', status: 'Pending' },
      { id: 2, name: 'Task 2', description: 'Description of Task 2', deadline: '2024-02-10', status: 'Completed' },
    ]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      description: taskDescription,
      deadline: taskDeadline,
      status: taskStatus,
    };
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const handleEditTask = (task) => {
    // Implement edit functionality here
    console.log(`Edit task ${task.id}`);
  };

  const handleDeleteTask = (task) => {
    // Implement delete functionality here
    setTasks(tasks.filter(t => t.id !== task.id));
    console.log(`Delete task ${task.id}`);
  };

  return (
    <div>
      <Navbar role="admin" />
      <div className="admin-container">
        <h1>Manage Tasks</h1>
        <Button onClick={handleCreateTask} className="create-task-button">Create New Task</Button>

        <Table
          headers={['Task Name', 'Description', 'Deadline', 'Status']}
          data={tasks}
          actions={(task) => (
            <>
              <Button onClick={() => handleEditTask(task)} className="edit-btn">Edit</Button>
              <Button onClick={() => handleDeleteTask(task)} className="delete-btn">Delete</Button>
            </>
          )}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Create New Task">
        <div>
          <InputField
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <InputField
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <InputField
            type="date"
            placeholder="Deadline"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />
          <InputField
            placeholder="Status"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          />
          <Button onClick={handleSubmitTask} className="submit-btn">Submit</Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default TaskList;

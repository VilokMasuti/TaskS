/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Layout, Typography, Row, Col, notification } from 'antd'
import TaskList from './components/TaskList'
import { Task, TaskFormData } from './types'
import { getTasks, addTask, updateTask, deleteTask } from './api/api'
import TaskForm from './components/TaskForm'

const { Header, Content } = Layout // Destructuring Layout component for header and content
const { Title } = Typography // Destructuring Typography for title styling

const App: React.FC = () => {
  // Defining the main App component
  // Defining state variables using React's useState hook
  const [tasks, setTasks] = useState<Task[]>([]) // Holds the list of tasks
  const [editingTask, setEditingTask] = useState<Task | null>(null) // Holds the task currently being edited
  const [total, setTotal] = useState(0) // Holds the total number of tasks (for pagination)
  const [currentPage, setCurrentPage] = useState(1) // Tracks the current page for pagination

  // useEffect hook to fetch tasks when the component mounts or the page number changes
  useEffect(() => {
    fetchTasks() // Call the fetchTasks function when currentPage changes
  }, [currentPage])

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    const { tasks: fetchedTasks, total } = await getTasks(currentPage) // Fetch tasks and total count based on the current page
    setTasks(fetchedTasks) // Update the state with fetched tasks
    setTotal(total) // Update the total number of tasks for pagination
  }

  // Function to handle adding a new task
  const handleAddTask = async (taskData: TaskFormData) => {
    try {
      const newTask = await addTask(taskData) // Call API to add task
      setTasks([newTask, ...tasks]) // Prepend the new task to the list of tasks
      notification.success({ message: 'Task added successfully' }) // Show success notification
    } catch (error) {
      notification.error({ message: 'Failed to add task' }) // Show error notification if something goes wrong
    }
  }

  // Function to handle updating an existing task
  const handleUpdateTask = async (taskData: TaskFormData) => {
    if (editingTask) {
      // Check if there is a task being edited
      try {
        const updatedTask = await updateTask(editingTask.id, taskData) // Call API to update task by ID
        setTasks(
          tasks.map((task) =>
            task.id === editingTask.id ? { ...task, ...updatedTask } : task
          )
        ) // Update the task in the task list
        setEditingTask(null) // Clear the editing task state
        notification.success({ message: 'Task updated successfully' }) // Show success notification
      } catch (error) {
        notification.error({ message: 'Failed to update task' }) // Show error notification if something goes wrong
      }
    }
  }

  // Function to handle deleting a task
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id) // Call API to delete task by ID
      setTasks(tasks.filter((task) => task.id !== id)) // Remove the deleted task from the state
      notification.success({ message: 'Task deleted successfully' }) // Show success notification
    } catch (error) {
      notification.error({ message: 'Failed to delete task' }) // Show error notification if something goes wrong
    }
  }

  // Function to handle setting a task for editing
  const handleEditTask = (task: Task) => {
    setEditingTask(task) // Set the task to be edited
  }

  // Function to handle page changes in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page) // Update the current page state
  }

  // JSX structure of the component
  return (
    <Layout className="min-h-screen">
      {' '}
      {/* Layout container with minimum height */}
      <Header className="bg-white">
        {' '}
        {/* Header section */}
        <Title level={2} className="text-center py-4">
          {' '}
          {/* Centered title */}
          Task Management App
        </Title>
      </Header>
      <Content className="p-8">
        {' '}
        {/* Content section */}
        <Row gutter={[16, 16]} justify="space-between">
          {' '}
          {/* Row with gutters between columns */}
          {/* Task Form (Add or Edit task) */}
          <Col xs={24} md={12}>
            {' '}
            {/* Responsive column */}
            <Title level={4}>
              {editingTask ? 'Edit Task' : 'Add New Task'}{' '}
              {/* Display different title based on if a task is being edited */}
            </Title>
            <TaskForm
              key={editingTask ? editingTask.id : 'new'} // Key prop to force component re-render on editing task
              onSubmit={editingTask ? handleUpdateTask : handleAddTask} // Submit handler depending on edit or add mode
              initialData={editingTask || undefined} // Pass the task data for editing, if available
            />
          </Col>
          {/* Task List (Display tasks) */}
          <Col xs={24} md={12}>
            {' '}
            {/* Responsive column */}
            <Title level={4}>Task List</Title> {/* Task list title */}
            <TaskList
              tasks={tasks} // Pass the tasks to be displayed
              onEdit={handleEditTask} // Pass the edit handler for each task
              onDelete={handleDeleteTask} // Pass the delete handler for each task
              total={total} // Pass the total number of tasks for pagination
              current={currentPage} // Pass the current page number
              onPageChange={handlePageChange} // Pass the page change handler
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default App

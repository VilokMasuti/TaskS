/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Task, TaskFormData } from '../types'

const API_URL = 'https://jsonplaceholder.typicode.com' // Defining the base URL for the API

export const getTasks = async (
  page: number = 1, // Default to page 1 if no page number is passed
  limit: number = 5 // Default to 5 tasks per page if no limit is passed
): Promise<{ tasks: Task[]; total: number }> => {
  // Make a GET request to fetch tasks with pagination parameters (page, limit)
  const response = await axios.get(
    `${API_URL}/todos?_page=${page}&_limit=${limit}` // Request URL with pagination
  )

  // Map the response data to our task structure and add some random data for fields like priority and due date
  const tasks = response.data.map((task: any) => ({
    id: task.id, // Map the 'id' field from the API response to the task object
    title: task.title, // Map the 'title' field from the API response to the task object
    priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)], // Assign a random priority (Low, Medium, or High)
    dueDate: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000) // Generate a random due date in the next 10 days
      .toISOString() // Convert the date to ISO string format
      .split('T')[0], // Only keep the date portion (remove the time part)
    status: task.completed, // Map the 'completed' status from the API response to 'status'
  }))

  // Return the tasks array and total count of tasks (using the x-total-count header from the response)
  return { tasks, total: parseInt(response.headers['x-total-count']) }
}

// Function to add a new task to the API
export const addTask = async (task: TaskFormData): Promise<Task> => {
  // Send a POST request to the API to add a new task
  const response = await axios.post(`${API_URL}/todos`, task)
  return response.data // Return the newly created task object
}

// Function to update an existing task
export const updateTask = async (
  id: number, // Task ID to update
  task: Partial<TaskFormData> // Partial task data to update (not necessarily all fields)
): Promise<Task> => {
  // Send a PATCH request to the API to update the task with the provided id
  const response = await axios.patch(`${API_URL}/todos/${id}`, task)
  return response.data // Return the updated task object
}

// Function to delete a task by its ID
export const deleteTask = async (id: number): Promise<void> => {
  // Send a DELETE request to the API to remove the task with the given id
  await axios.delete(`${API_URL}/todos/${id}`)
}

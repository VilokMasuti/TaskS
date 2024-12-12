import React from 'react'
import { Task } from '../types'

// Define the interface for the props passed to the TaskItem component
interface TaskItemProps {
  task: Task // Task object to be displayed in the table row
  onEdit: (task: Task) => void // Function to handle editing the task
  onDelete: (id: number) => void // Function to handle deleting the task
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    // Render a table row with the task details
    <tr>
      {/* Display task title */}
      <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>

      {/* Display task priority with conditional styling */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            task.priority === 'High'
              ? 'bg-red-100 text-red-800' // High priority style
              : task.priority === 'Medium'
              ? 'bg-yellow-100 text-yellow-800' // Medium priority style
              : 'bg-green-100 text-green-800' // Low priority style
          }`}
        >
          {task.priority} // Display the priority value
        </span>
      </td>

      {/* Display task due date */}
      <td className="px-6 py-4 whitespace-nowrap">{task.dueDate}</td>

      {/* Display task status with conditional styling */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            task.status
              ? 'bg-green-100 text-green-800' // Completed status style
              : 'bg-red-100 text-red-800' // Not completed status style
          }`}
        >
          {task.status ? 'Completed' : 'Not Completed'} // Display task status
        </span>
      </td>

      {/* Display action buttons (Edit and Delete) */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {/* Edit button */}
        <button
          onClick={() => onEdit(task)} // Trigger onEdit function with the task
          className="text-indigo-600 hover:text-indigo-900 mr-2" // Styling for Edit button
        >
          Edit
        </button>

        {/* Delete button */}
        <button
          onClick={() => onDelete(task.id)} // Trigger onDelete function with task ID
          className="text-red-600 hover:text-red-900" // Styling for Delete button
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default TaskItem // Export the TaskItem component for use in other parts of the application

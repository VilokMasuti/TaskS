/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Table, Space, Button } from 'antd'
import { Task } from '../types'

// Define the interface for the props passed to the TaskList component
interface TaskListProps {
  tasks: Task[] // Array of tasks to display in the table
  onEdit: (task: Task) => void // Function to handle editing a task
  onDelete: (id: number) => void // Function to handle deleting a task
  total: number // Total number of tasks (used for pagination)
  current: number // Current page number (used for pagination)
  onPageChange: (page: number) => void // Function to handle page changes
}

const TaskList: React.FC<TaskListProps> = ({
  tasks, // List of tasks to be displayed
  onEdit, // Function to edit a task
  onDelete, // Function to delete a task
  total, // Total number of tasks (for pagination)
  current, // Current page number (for pagination)
  onPageChange, // Function to handle page changes
}) => {
  // Define the columns for the Ant Design Table component
  const columns = [
    {
      title: 'Title', // Column title for the task title
      dataIndex: 'title', // Key to access task title from the data
      key: 'title', // Unique key for this column
      width: 150, // Set a fixed width for the title column
    },
    {
      title: 'Priority', // Column title for task priority
      dataIndex: 'priority', // Key to access task priority from the data
      key: 'priority', // Unique key for this column
      render: (priority: string) => (
        // Conditionally render the priority with different styles based on the value
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            priority === 'High'
              ? 'bg-red-100 text-red-800' // Style for high priority
              : priority === 'Medium'
              ? 'bg-yellow-100 text-yellow-800' // Style for medium priority
              : 'bg-green-100 text-green-800' // Style for low priority
          }`}
        >
          {priority} // Display the priority value
        </span>
      ),
      width: 120, // Set width for the priority column
    },
    {
      title: 'Due Date', // Column title for the task due date
      dataIndex: 'dueDate', // Key to access the task due date from the data
      key: 'dueDate', // Unique key for this column
      width: 150, // Set width for the due date column
    },
    {
      title: 'Status', // Column title for task status
      dataIndex: 'status', // Key to access the task status from the data
      key: 'status', // Unique key for this column
      render: (status: boolean) => (
        // Conditionally render the task status with different styles based on completion status
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {status ? 'Completed' : 'Not Completed'} // Display "Completed" or
          "Not Completed" text
        </span>
      ),
      width: 150, // Set width for the status column
    },
    {
      title: 'Actions', // Column title for the actions column
      key: 'actions', // Unique key for the actions column
      render: (_: any, record: Task) => (
        // Render the actions for each task, such as Edit and Delete buttons
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            {' '}
            // Edit button that triggers the edit function Edit
          </Button>
          <Button type="link" danger onClick={() => onDelete(record.id)}>
            {' '}
            // Delete button that triggers the delete function Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    // Render the Ant Design Table component with the provided columns and data
    <Table
      columns={columns} // Columns to display in the table
      dataSource={tasks} // Data source (tasks) to populate the table
      rowKey="id" // Use the task id as the unique key for each row
      pagination={{
        total, // Total number of tasks for pagination
        current, // Current page number (for pagination)
        pageSize: 5, // Display 5 tasks per page
        onChange: onPageChange, // Function to handle page changes
      }}
      scroll={{ x: 800 }} // Enable horizontal scrolling if the table exceeds the screen width
    />
  )
}

export default TaskList

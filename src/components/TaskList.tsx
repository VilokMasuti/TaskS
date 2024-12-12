/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Table, Space, Button } from 'antd'
import { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  total: number
  current: number
  onPageChange: (page: number) => void
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  total,
  current,
  onPageChange,
}) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 150, // Set a fixed width for title
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            priority === 'High'
              ? 'bg-red-100 text-red-800'
              : priority === 'Medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {priority}
        </span>
      ),
      width: 120, // Set width for priority column
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 150, // Set width for due date column
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {status ? 'Completed' : 'Not Completed'}
        </span>
      ),
      width: 150, // Set width for status column
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Task) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      pagination={{
        total,
        current,
        pageSize: 5,
        onChange: onPageChange,
      }}
      scroll={{ x: 800 }} // Make the table horizontally scrollable on small screens
    />
  )
}

export default TaskList

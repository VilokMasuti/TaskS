import React from 'react'
import { Form, Input, Select, DatePicker, Switch, Button } from 'antd'
import { TaskFormData } from '../types'
import moment from 'moment'

const { Option } = Select

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void
  initialData?: TaskFormData
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
  const [form] = Form.useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    const task: TaskFormData = {
      title: values.title,
      priority: values.priority,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
      status: values.status,
    }
    onSubmit(task)
    form.resetFields()
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={
        initialData
          ? {
              ...initialData,
              dueDate: moment(initialData.dueDate),
            }
          : undefined
      }
    >
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: 'Please input the task title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: 'Please select the priority!' }]}
      >
        <Select>
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: 'Please select the due date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="status" label="Status" valuePropName="checked">
        <Switch checkedChildren="Completed" unCheckedChildren="Not Completed" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialData ? 'Update Task' : 'Add Task'}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TaskForm

// src/admin/components/AddUserForm.tsx
import React from 'react';
import { Form, Input, Button, message } from 'antd';

interface AddUserFormProps {
  onCancel: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // Simulating a request to the backend API to add a new user
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('User added successfully');
        onCancel(); // Close the modal after successful addition
      } else {
        message.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      message.error('Error adding user');
    }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '33vh' }}>
      <Form form={form} onFinish={handleSubmit} style={{ width: '300px', transform: 'scale(1.2)' }}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
          <Input />
        </Form.Item>
        {/* Add more form fields as needed */}
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
          <Button onClick={onCancel} style={{ marginLeft: '8px' }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
 

export default AddUserForm;

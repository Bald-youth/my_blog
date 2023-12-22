// src/admin/components/UserManagement.tsx
import React from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import AddUserForm from './AddUserForm'; // 导入 AddUserForm 组件
import UserProfile from './UserProfile'

const UserManagement: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add User
      </Button>
      <Table dataSource={[/* 使用实际数据填充 */]} columns={[/* 使用实际列填充 */]} />
      <Modal
        title="Add User"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddUserForm onCancel={handleCancel} />
      </Modal>

      {/* 渲染 UserProfile 组件 */}
      <UserProfile />
    </div>
  );
};

export default UserManagement;


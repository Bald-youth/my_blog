// src\admin\components\BlogList.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from './types';  // 导入 Post 类型

interface BlogListProps {
  posts: Post[];
  onDelete: (postId: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onDelete }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <p>Date: {new Date(post.date).toLocaleDateString()}</p>
          <Link to={`/edit/${post._id}`}>Edit</Link>
          <button type="button" onClick={() => onDelete(post._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import BlogList from './BlogList';
import CreateBlog from './CreateBlogPage';
import EditBlog from './EditBlog';


interface Post {
  _id: string;
  title: string;
  content: string;
  date: string;
}

const BlogManagement: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [...prev, newPost]);
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((post) => (post._id === updatedPost._id ? { ...post, ...updatedPost } : post))
    );
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Blog Management Component</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate('/admin/blog/create')}>Create New Post</button>
        <button onClick={() => navigate('/admin/blog/edit/:id')}>Edit Post</button>
        <button onClick={() => navigate('/admin/blog')}>View Posts</button>
      </div>

      {/* 使用 Route 来匹配子路由 */}
      <Routes>
        <Route
          path="blog/*"
          element={<BlogList posts={posts} onDelete={handleDeletePost} />}
        />
        <Route path="create" element={<CreateBlog onPostCreated={handlePostCreated} />} />
        <Route path="edit/:id" element={<EditBlog onPostUpdated={handlePostUpdated} />} />

        {/* 默认重定向到 "blog"，或根据需要重定向到其他路径 */}
        <Route
          path="/"
          element={<Navigate to="/admin/blog" replace />}
        />
      </Routes>
    </div>
  );
};

export default BlogManagement;

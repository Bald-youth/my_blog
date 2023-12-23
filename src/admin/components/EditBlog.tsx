// src\admin\components\EditBlog.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Post } from './types';  // 导入 Post 类型

interface EditBlogProps {
  onPostUpdated: (updatedPost: Post) => void;
}

const EditBlog: React.FC<EditBlogProps> = ({ onPostUpdated }) => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:5000/api/posts/${id}`, values);
        // Redirect to blog management page after editing
        window.location.href = '/admin';
      } catch (error) {
        console.error('Error editing post:', error);
      }
    },
  });

  useEffect(() => {
    // 获取博客文章详情
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
        formik.setValues(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPost();
  }, [id, formik]);

  return (
    <div>
      <h2>Edit Blog Post</h2>
      {post ? (
        <form onSubmit={formik.handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} />
            {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
          </label>
          <label>
            Content:
            <textarea name="content" value={formik.values.content} onChange={formik.handleChange} />
            {formik.touched.content && formik.errors.content && <div>{formik.errors.content}</div>}
          </label>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBlog;

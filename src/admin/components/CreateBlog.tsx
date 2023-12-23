import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Post } from './types';  // 导入 Post 类型

interface CreateBlogProps {
  onPostCreated: (newPost: Post) => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ onPostCreated }) => {
  const [isMounted, setIsMounted] = React.useState(true);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

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
        const response = await axios.post('http://localhost:5000/api/posts', values);
        
        if (isMounted) {
          onPostCreated(response.data);
          formik.resetForm();
          setSubmitSuccess(true); // 设置提交成功状态
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    },
  });

  React.useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div>
      {submitSuccess && <div>Post created successfully!</div>}

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

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreateBlog;

// src/admin/components/CreateBlogPage.tsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import '../styles/CreateBlogPage.css';

interface CreateBlogPageProps {
  onPostCreated: (newPost: any) => void;
}

const CreateBlogPage: React.FC<CreateBlogPageProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  const handleCreatePost = () => {
    const newPost = {
      title,
      content: markdownContent,
    };
    onPostCreated(newPost);
  };

  return (
    <div className="create-blog-container">
      <div className="create-blog-form">
        <input
          type="text"
          placeholder="输入博客标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />

        <Editor
          value={markdownContent}
          onChange={({ text }) => setMarkdownContent(text)}
          style={{ height: '400px' }}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        />

        {/* <div className="markdown-preview">
          <h3>Markdown预览</h3>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div> */}

        <button onClick={handleCreatePost} className="create-post-button">
          创建博客
        </button>
      </div>
    </div>
  );
};

export default CreateBlogPage;

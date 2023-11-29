// src/components/BlogList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList: React.FC = () => {
  interface BlogPost {
    id: number;
    title: string;
    summary: string;
    // Add other properties as needed
  }

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // 当后端API就绪时，将在这里添加数据获取逻辑
    // 暂时保留空的 useEffect
  }, []);

  return (
     <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <h3>
              {/* Add Link to the details page */}
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;

// components/BlogList.tsx
import React, { useEffect, useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  // 其他博客文章相关的字段
}

const BlogList: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog-posts');
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data);
        } else {
          console.error('Failed to fetch blog posts');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;

// src/pages/BlogDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface BlogDetailProps {
  // Add any props you might need
}

const BlogDetail: React.FC<BlogDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<any>({}); // Adjust the type accordingly

  useEffect(() => {
    // Fetch blog post details by ID from the backend
    // Replace the following placeholder with actual API call
    fetch(`/api/blog-posts/${id}`)
      .then((response) => response.json())
      .then((data) => setBlogPost(data))
      .catch((error) => console.error('Error fetching blog post:', error));
  }, [id]);

  return (
    <div>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.summary}</p>
      {/* Add other details like author, date, and full content */}
    </div>
  );
};

export default BlogDetail;

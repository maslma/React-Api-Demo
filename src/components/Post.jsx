import React, { useState, useEffect } from "react";
import { getPost, deletePost, updatePost } from "../services/PostService";
import PostForm from "./PostForm";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  
  useEffect(() => {
    getPost()
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    deletePost(id)
      .then((result) => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const startEditing = (post) => {
    setEditingPost(post);
  };

  return (
    <div>
      <h1>Posts</h1>
      <PostForm
        posts={posts}
        setPosts={setPosts}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      ></PostForm>
      <ul>
        {posts.map((posts) => (
          <li key={posts.id}>
            <h2>{posts.title}</h2>
            <p>{posts.body}</p>
            <button onClick={() => startEditing(posts)}>Edit</button>
            <button onClick={() => handleDelete(posts.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Post } from './Post.jsx';


export const PublicView = (props) => {

  let [posts,setPosts] = useState([]);
  let [selectedPost, setSelectedPost] = useState(0);

  //const textInput = useRef(null);
    
  useEffect(
    () => {
      getPosts();
      //textInput.current.focus();
    },[]
  );

  // Fetches our GET /posts route from the Flask server
  async function getPosts() {
    const response = await fetch('http://localhost/api/v1/posts?status=published');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    setPosts(body);
    return body;
  };

  return (
    <div>
      {posts.map((post) => (
                <li key={post.id}>
                  <Post 
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    tags={post.tags}
                    status={post.status}
                  />    
                </li>
              ))}
    </div>
  )

}

  
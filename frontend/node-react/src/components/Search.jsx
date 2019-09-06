import React, { useState, useEffect } from 'react';
import { Post } from './Post.jsx';
import styles from './PublicView.module.css'

export const Search = (props) => {

  let [posts,setPosts] = useState([]);
  let [selectedPost, setSelectedPost] = useState(0);

  //const textInput = useRef(null);
    
  useEffect(
    () => {
      getPostsByTag(props.location.search);
    },[]
  );

  // Fetches our GET /posts route from the Flask server
  // We could use filtering of all posts with JS, but I wanted to implement using arguments in the URI
  async function getPostsByTag(tag) {
    const response = await fetch(`http://localhost/api/v1/posts${tag}`);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    setPosts(body);
    return body;
  };

  return (
    <div className={styles.main}>
      <ul className={styles.ul}>
          {posts.map((post) => (
            <li key={post.id}>
              <Post 
                id={post.id}
                title={post.title}
                body={post.body}
                tags={post.tags}
                status={post.status}
                imgUrl={post.img_url}
              />    
            </li>
        ))}
      </ul>
      
    </div>
  )
}

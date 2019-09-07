//COPYRIGHT 2019 RICHARD HUNTER
//GNU PUBLIC LICENSE 3.0

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavBar } from '../src/components/NavBar.jsx';
import { NewPostForm } from '../src/components/NewPostForm.jsx';
import { PostSummary } from '../src/components/PostSummary.jsx';
import { PublicView } from '../src/components/PublicView.jsx';
import { Search } from '../src/components/Search.jsx';
import { Footer } from '../src/components/Footer.jsx';
import styles from './Blog.module.css'

export const Blog = props => {
  let [create, setCreate] = useState(false);
  let [posts,setPosts] = useState([]);
  let [newPost,setNewPost] =  useState({
    title  : '',
    body   : '',
    tags   : '',
    status : 'draft'
  });
  let [imgUrl, setImgUrl] = useState("");
  let [selectedPost, setSelectedPost] = useState(0);

 
    
  useEffect(
    () => {
      getPosts();

      //textInput.current.focus();
    },[]
  );

  const handleChange = (event) => {
    event.persist();
    setNewPost(newPost => ({ ...newPost, [event.target.name] : event.target.value }));
  };

  const changeImgUrl = (url) => {
    setImgUrl(url);
  }

  const selectPost = (event, postId) => {
    event.preventDefault();
    setSelectedPost(postId);
    let index = posts.findIndex(post => post.id === postId);
    let postCopy = Object.assign({}, posts[index]);
    postCopy.tags = postCopy.tags.toString().replace(/,/g, " ");
    setNewPost(postCopy);
    setImgUrl(posts[index].img_url)
    setCreate(create === false ? true : true);
  }

  // Fetches our GET /posts route from the Flask server
  async function getPosts() {
    const response = await fetch('http://localhost/api/v1/posts');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    setPosts(body);
    return body;
  };
  
  // Formats the payload for POST/PUT request
  const formatPayload = (post, url) => {
    let tag_array = [];
    if (post.tags) {
      let tag_string = post.tags;
      let tags = tag_string.split(/,|\s/g);
      for (const tag of tags){
        if ( tag != '' ) {
          tag_array.push({ 'title':tag });
        };
      };    
    };

    return JSON.stringify({
      'title'   : post.title,
      'body'    : post.body,
      'status'  : post.status,
      'tags'    : tag_array,
      'img_url' : url
    });
  };  
    
  // POST a blog post to server
  async function createPost(post, url) {
      let payload = formatPayload( post, url );
      const response = await fetch('http://localhost/api/v1/posts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: payload
      });
      const body = await response.json();
      if ( response.status !==201 ) {
        throw Error(body.message);
      }
      setNewPost({
        title : '',
        body  : '',
        tags  : '',
        status : 'draft'
      });
      setImgUrl('');
      setCreate(false);
      getPosts();  
  };

  // UPDATE a post
  async function updatePost(id, post, url) {
        let payload = formatPayload( post, url );
          const response = await fetch(`http://localhost/api/v1/posts/${id}`, {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json; charset=utf-8",
              },
              body: payload
          });
          const body = await response;
          if (response.status !==200) {
              throw Error(body.message);
          }
          setNewPost({
            title : '',
            body  : '',
            tags  : '',
            status : 'draft'
          });
          setImgUrl('');
          setCreate(false);
          getPosts();      
  }

    //DELETE a post
    async function deletePost( id ) {
        const response = await fetch( `http://localhost/api/v1/posts/${id}`, {
            method: 'DELETE'
        });
        const body = await response;
        if ( response.status !== 200 ) {
            throw Error( body.message );
        }
        getPosts();
        //textInput.current.focus();
    }
    
    // util function getTags() removes duplicate tags from the tag set
    const getTags = (posts) => {
      let tag_set = new Set();
      for ( const post of posts ) {
        for ( const tag of post.tags ) {
          tag_set.add( tag );
        }

      };
      return Array.from( tag_set );
    }

    // pull up the new post form, clearing it if it is for new post
    const toggleNewPostForm = () => {
        if (create === false){
          setNewPost({
            title  : '',
            body   : '',
            tags   : '',
            status : 'draft'
          });
          setSelectedPost(0);
          setImgUrl("");
        }
        setCreate(create === false ? true : false);
    }

    const linkStyle = {
      textDecoration: 'none'
    }
    return(
      <Router>
        <NavBar toggleNewPostForm={toggleNewPostForm} />
        <div className={styles.main}>
          <div className={styles.blog}>
            {
              create === true &&
              <NewPostForm 
                  createPost={createPost}
                  updatePost={updatePost}
                  deletePost={deletePost}
                  handleChange={handleChange}
                  selectedPost={selectedPost}
                  post={newPost}
                  imgUrl={imgUrl}
                  toggle={toggleNewPostForm}
                  changeImgUrl={changeImgUrl}
              />
            }    
            <Route exact path="/" render={ () => (
              <ul className={styles.ul}>
                {posts.map((post) => (
                  <li className={styles.li} key={post.id}>
                    <PostSummary
                      getPosts={getPosts} 
                      post={post}
                      id={post.id}
                      title={post.title}
                      body={post.body}
                      tags={post.tags}
                      status={post.status}
                      imgUrl={post.img_url}
                      deletePost={deletePost}
                      selectPost={selectPost}
                    />    
                  </li>
                ))}
              </ul>
            )}/>
            <Route path="/preview" component={PublicView} />
            <Route path="/search" component={Search} />
            <Footer />
          </div>
        </div>
      </Router>
  );
};




 {/* <div className={styles.sidebar}>
          <div className={styles.sidebar_a}>
          <p>recent posts</p>
          {posts.map((post) => (
            <li className={styles.titles_li} key={post.id}>
              <p>{post.title}</p>
            </li>
          ))}  
          </div>
          <div className={styles.sidebar_b}><p>Tags</p>
            {getTags(posts).map((tag) => 
              <li className={styles.tags_li}>
                <p>{tag}</p>
              </li>
            )}
          </div>
        </div> */}
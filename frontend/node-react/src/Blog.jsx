//COPYRIGHT 2019 RICHARD HUNTER
//GNU PUBLIC LICENSE 3.0

import React, { useState, useEffect, useRef } from 'react';
import { NewPostForm } from '../src/components/NewPostForm.jsx';
import { Post } from '../src/components/Post.jsx';
import styles from './Blog.module.css'

export const Blog = props => {

    let [posts,setPosts] = useState([]);
    let [newPost,setNewPost] =  useState({
        title  : '',
        body   : '',
        tags   : '',
        status : 'draft'
    });
    //let [selected,setSelected] = useState(0);
    //const textInput = useRef(null);
    
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

    /*const selectPost = (event, id) => {
        event.preventDefault();
        let index = post.findIndex(post => post.id === id);
        setSelected(id);
        setNewPost(post[index].title);
    }*/

    // Fetches our GET /posts route from the Flask server
    async function getPosts() {
        const response = await fetch('http://localhost/api/v1/posts');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
            throw Error(body.message)
        }
        setPosts(body);
        return body;
    };

    const formatPayload = (post) => {
        let tag_array = [];
        let tag_string = post.tags;
        let tags = tag_string.split(" ");
        
        for (const tag of tags){
            tag_array.push({'title':tag})
        };
        
        return JSON.stringify({
            'title'  : post.title,
            'body'   : post.body,
            'status' : post.status,
            'tags'   : tag_array
        });
    };  
    
    // POST a blog post to server
    async function createPost(post) {
        if (post.title.length > 0) {
            let payload = formatPayload(post);
            //let payload = JSON.stringify(post);
            const response = await fetch('http://localhost/api/v1/posts', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: payload
            });
            const body = await response.json();
            if (response.status !==201) {
                throw Error(body.message);
            }
            setNewPost({
                title : '',
                body  : '',
                tags  : ''
            });
            getPosts();
            //textInput.current.focus();
            
        }else {
            //textInput.current.focus();
            return;
        }
    };
    /*
    // UPDATE a post
    async function updatePost(id, title) {
        if (title.length > 0) {
            let payload = JSON.stringify({'title':title});
            const response = await fetch(`http://localhost/api/v1/todos/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: payload
            });
            const body = await response;
            if (response.status !==204) {
                throw Error(body.message);
            }
            getTodos();       
            setSelected(0);
            setNewTodo("");
            textInput.current.focus();        
        }else {
            return;
        }
    }*/

    //DELETE a post
    async function deletePost(id) {
        const response = await fetch(`http://localhost/api/v1/posts/${id}`, {
            method: 'DELETE'
        });
        const body = await response;
        if (response.status !== 200) {
            throw Error(body.message);
        }
        getPosts();
        //textInput.current.focus();
    }
    
    const getTags = (posts) => {
        let tag_set = new Set();
        for (const post of posts){
            for (const tag of post.tags) {
                tag_set.add(tag);
            }

        };
        return Array.from(tag_set);
    }
    
    return(
        <div>
            <div>
                <ul className={styles.nav}>
                    <li className={styles.nav_li}>blog by 2003</li>
                    <li className={styles.nav_li}>new post</li>
                    <li className={styles.nav_li}>search</li>                                    
                </ul>
            </div>
            <div className={styles.main}>
                <div className={styles.blog}>
                    <NewPostForm 
                        createPost={createPost}
                        handleChange={handleChange}
                        post={newPost}
                    />
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Post 
                                id={post.id}
                                title={post.title}
                                body={post.body}
                                tags={post.tags}
                                status={post.status}
                                deletePost={deletePost}
                            />    
                        </li>
                    ))}
                </div>
                <div className={styles.sidebar}>
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
                </div>
            </div>
            
        </div>        
    );
};

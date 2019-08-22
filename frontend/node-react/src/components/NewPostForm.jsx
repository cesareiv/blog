import React from 'react';
import styles from './NewPostForm.module.css';

export const NewPostForm = props => {
    return( 
        <div>
            <span className="blog_form">
                <form onSubmit = {(e) => {
                    e.preventDefault();
                    props.createPost(props.post); 
                }}>
                    <div>
                        <label htmlFor="title">Post title:</label>
                        <input
                            className={styles.blog_input}
                            name="title"
                            title="title"
                            value={props.post.title}
                            onChange={props.handleChange}
                        />
                    </div>    
                    <div>    
                        <textarea
                            className="blog_form_body"
                            name="body"
                            title="body"
                            value={props.post.body}
                            onChange={props.handleChange}    
                        ></textarea>
                    </div>    
                    <div>    
                        <label htmlFor="tags">tags:</label>    
                        <input
                            className="blog_input"
                            name="tags"
                            value={props.post.tags}
                            onChange={props.handleChange}
                        />
                        <select
                            className="blog_form_status" 
                            name="status"
                            value={props.post.status}
                            onChange={props.handleChange}
                        >
                            <option value="draft">draft</option>
                            <option value="published">published</option>
                            <option value="private">private</option>
                        </select>    
                    </div>    
                    <button className="button" type="submit">Save post</button>
                </form>    
            </span>
        </div>
    )
}
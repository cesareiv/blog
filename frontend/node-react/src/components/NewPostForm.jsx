import React from 'react';
import styles from './NewPostForm.module.css';

export const NewPostForm = props => {
    return( 
        <div>
            <span className={styles.post_form}>
                <form onSubmit = {(e) => {
                    e.preventDefault();
                    props.createPost(props.post); 
                }}>
				<span className={styles.title}>
                    <label className={styles.label} htmlFor="title">Post title:</label>
                    <input
                        className={styles.input}
                        name="title"
                        title="title"
                        value={props.post.title}
                        onChange={props.handleChange}
                    />
				</span>			
                        <textarea
                            className={styles.textarea}
                            name="body"
                            title="body"
                            value={props.post.body}
                            onChange={props.handleChange}
                        ></textarea>    
                        <label className={styles.label} htmlFor="tags">tags: </label> 
                        <input
                            className={styles.tags}
                            name="tags"
                            value={props.post.tags}
                            onChange={props.handleChange}
                        />
                        <select
                            className={styles.select} 
                            name="status"
                            value={props.post.status}
                            onChange={props.handleChange}
                        >
                            <option value="draft">draft</option>
                            <option value="published">published</option>
                            <option value="private">private</option>
                        </select>       
                    <button className={styles.button} type="submit">Save post</button>
                </form>    
            </span>
        </div>
    )
}
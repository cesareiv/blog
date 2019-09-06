import React from 'react';
import { ImgUploader } from './ImgUploader.jsx';
import styles from './NewPostForm.module.css';

export const NewPostForm = props => {
  return(
    <div className={styles.modal_overlay}>
      <div className={styles.post_form}>
      <form onSubmit = {(e) => {
        e.preventDefault();
        if (props.selectedPost == 0) {
          props.createPost(props.post, props.imgUrl);
        } else {
          props.updatePost(props.selectedPost, props.post, props.imgUrl)
        };  
      }}>
        <div className={styles.header}>
          <label className={styles.title_label} htmlFor="title">Title</label>
            <input
                className={styles.title_input}
                name="title"
                value={props.post.title}
                onChange={props.handleChange}
            />
        </div>
        <div className={styles.main_content}>
          <textarea
            className={styles.textarea}
            name="body"
            title="body"
            value={props.post.body}
            onChange={props.handleChange}
            placeholder="write some stuff here..."
          />
          <ImgUploader 
           name="images"
            value={props.imgUrl}
            changeImgUrl={props.changeImgUrl}
            selectedPost={props.selectedPost}
           />
        </div>
        <div className={styles.footer}>
          <label className={styles.tags_label} htmlFor="tags">tags</label>
          <input
            className={styles.tags_input}
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
          <button className={styles.button} onClick={props.toggle}>Cancel</button>
          {props.selectedPost !=0 && 
            <button className={styles.delete} onClick={() => {
              props.deletePost(props.post.id);
              props.toggle();
              }
              }>Delete
            </button>
          }
        </div>
      </form>
    </div>
  </div> 
  )
}

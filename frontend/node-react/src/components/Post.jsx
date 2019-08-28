import React from 'react';
import styles from './Post.module.css';

export const Post = props => {
  return(
    <div>
      <span className={styles.post}>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.post_body}>{props.body}</p>
        <p className={styles.tags}>tags: {props.tags.join(", ")}</p>
        <p className={styles.status}>{props.status}</p>
        <button className="delete" onClick={() => props.deletePost(props.id)}>Delete post</button>
      </span>
    </div>
  )
}

import React from 'react';
import styles from './Post.module.css';

export const Post = props => {
    return( 
        <div>
		<span className={styles.post}>
            <h1 className={styles.h1}>{props.title}</h1>
            <p>{props.body}</p>
            <p>{props.status}</p>
            <p>tags: {props.tags.join(", ")}</p>
            <span className="todo_check">   
                <button className="circle cross" onClick={() => props.deletePost(props.id)}></button>
            </span>
		</span>
        </div>
    )
}
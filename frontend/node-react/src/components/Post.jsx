import React from 'react';

export const Post = props => {
    return( 
        <div className="blog_form">
            <div>
                <h1>{props.title}</h1>
            </div>
            <div>
                <p>{props.body}</p>
            </div>
            
            <p>{props.status}</p>
            <p>tags: {props.tags.join(", ")}</p>
            <span className="todo_check">   
                <button className="circle cross" onClick={() => props.deletePost(props.id)}></button>
            </span>
        </div>
    )
}
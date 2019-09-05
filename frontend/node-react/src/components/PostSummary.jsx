import React, { useState } from 'react';
import styles from './PostSummary.module.css';

const linkStyle = {
  textDecoration: 'none'
}

export const PostSummary = props => {

  let [status, setStatus] = useState(props.status);
  let [editToggle, setEditToggle] = useState(false);

  const handleStatusUpdate = val => {
    
    console.log("new status!");
    return;
  }

  const toggleEdit = (event) => {
    setEditToggle(editToggle === false ? true : false);
    props.selectPost(event, props.post.id);
  }

  const tagButton = (tag) => {
    return (
      <a onClick={props.getPosts(tag)} />
    );
  }

  return(
    <div className={styles.post}>
        {props.imgUrl !== "" &&
        <div className={styles.thumbnail}>
          <img className={styles.img} src={props.imgUrl} />
        </div>
        }
        <div className={styles.content}>
          <h1 className={styles.title}>{props.title}</h1>
          <p className={styles.post_body}>{props.body}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.tags}>
            <ul className={styles.ul}>
              {props.tags.map((tag) => (
                <a style={linkStyle} href={`http://localhost/api/v1/posts?tags=${tag}`}>
               
                  <li className={styles.tag_li}>
                    {tag}
                  </li>
                </a>
              ))}
            </ul>
          </div>
          <div className={styles.status}>
            
            <span className={styles.status_text}>
              {/* {editToggle === true &&
                <form onSubmit={handleStatusUpdate}>
                <select
                  onChange={handleStatusUpdate(status)} 
                  value={status}
                  name="status"  
                  
                >
                  <option value="edit">edit</option>
                  <option value="delete">delete</option>
                </select>
              </form>
              } */}
              
              <a onClick={toggleEdit}>
              {status}
              </a>
            
            </span>
          </div>
        </div>
      </div>
  )
}

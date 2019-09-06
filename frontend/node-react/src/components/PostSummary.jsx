import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PostSummary.module.css';

const linkStyle = {
  textDecoration: 'none'
}

export const PostSummary = props => {
  
  let [editToggle, setEditToggle] = useState(false);

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

                  <Link style={linkStyle} to={{
                    pathname:"/search",
                    search:`?tags=${tag}`
                  }}>
                    <li className={styles.tag_li}>
                      {tag}
                    </li>
                  </Link>

              ))}
            </ul>
          </div>
          <div className={styles.status} onClick={toggleEdit} >
            <span className={styles.status_text} aria-required="true" aria-label="click to edit post">              
              {props.status}
            </span>
          </div>
        </div>
      </div>
  )
}

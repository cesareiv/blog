import React from 'react';
import styles from './PostSummary.module.css';

const linkStyle = {
  textDecoration: 'none'
}

export const PostSummary = props => {
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
                <a style={linkStyle} href={`http://localhost/posts/?tags=${tag}`}>
                  <li className={styles.tag_li}>
                    {tag}
                  </li>
                </a>
              ))}
            </ul>
          </div>
          <div className={styles.status}>
            <span className={styles.status_text}>
              {props.status}
            </span>
          </div>
        </div>
    </div>
  )
}

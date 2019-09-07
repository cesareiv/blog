import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Post.module.css';

const linkStyle = {
  textDecoration: 'none'
}

export const Post = props => {
  return(
    <div className={styles.post}>
        <h1 className={styles.title}>{props.title}</h1>
        <img className={styles.img} src={props.imgUrl} />
        <p className={styles.post_body}>{props.body}</p>
        <div className={styles.tags}>
            <ul className={styles.tag_ul}>
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
        <p className={styles.status}>{props.status}</p>
    </div>
  )
}

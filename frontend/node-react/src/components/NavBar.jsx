import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Blog.module.css';

export const NavBar = (props) => {
  const linkStyle = {
    textDecoration: 'none'
  }
  return (
    <div className={styles.nav}>
      <ul className={styles.nav_ul}>
        <li className={styles.nav_li_title}>
          <Link to="/" style={linkStyle}>blog by 2003</Link>
          </li>
        <li className={styles.nav_li} onClick={props.toggleNewPostForm}>
          new post
        </li>
        <li className={styles.nav_li}>
          <Link to="/preview" style={linkStyle}>preview</Link>
        </li>
      </ul>
    </div>        
  )
}


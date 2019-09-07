import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Blog.module.css';

export const NavBar = (props) => {

  return (
    <div className={styles.nav}>
      <ul className={styles.nav_ul}>
        <li className={styles.nav_li_title} key='1'>
          <Link to="/" className={styles.navlink}>blog by 2003</Link>
          </li>
        <li className={styles.nav_li} onClick={props.toggleNewPostForm} key='2'>
          new post
        </li>
        <li className={styles.nav_li} key='3'>
          <Link to="/" className={styles.navlink}>Dashboard</Link>
        </li>
        <li className={styles.nav_li} key='4'>
          <Link to="/preview" className={styles.navlink}>Preview Blog</Link>
        </li>
      </ul>
    </div>        
  )
}


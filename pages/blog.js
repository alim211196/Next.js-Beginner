import Link from 'next/link';
import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
const Blog = (props) => {
  const [data, setData] = useState(props.allBlogs);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {data.map((item, index) => {
          return (
            <div className={styles.blogItem} key={index}>
              <Link href={`/blogpost/${item.slug}`}>
                {" "}
                <h3 className={styles.blogItemh3}>{item.title}</h3>
              </Link>
              <p>{item.content.substr(0, 300)}...</p>
              <p>{item.author}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
};
export async function getServerSideProps(context) {
  let data = await fetch("http://localhost:3000/api/blogs");
  let allBlogs = await data.json();

  return {
    props: { allBlogs }, // will be passed to the page component as props
  };
}
export default Blog
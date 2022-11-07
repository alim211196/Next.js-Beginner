import Link from "next/link";
import * as fs from "fs";
import React, { useEffect, useState } from "react";
import styles from "../styles/Blog.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);

  const [count, setCount] = useState(3);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 3}`);
    setCount(count + 3);
    let data = await d.json();
    setBlogs(data);
  };
  return (
    <>
    <div className={styles.container}>
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs.map((item, index) => {
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
        </InfiniteScroll>
      </main>
    </div>
    </>
  );
};
export async function getServerSideProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < 3; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile("blogdata/" + item, "utf-8");
    allBlogs.push(JSON.parse(myfile));
  }

  return {
    props: { allBlogs, allCount }, // will be passed to the page component as props
  };
}
export default Blog;

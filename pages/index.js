import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import * as fs from "fs";
export default function Home(props) {
  const [blogs, setBlogs] = useState(props.allBlogs);

  const [count, setCount] = useState(3);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 3}`);
    setCount(count + 3);
    let data = await d.json();
    setBlogs(data);
  };

  const HandleChange = (path) => {
    if (typeof window !== "undefined") {
      window.location = `/blogpost/${path}`;
    }
  };
  return (
    <>
      <Image
        className={styles.myImg}
        src="/LogoImg.jpg"
        alt="Logo"
        width={800}
        height={800}
      />
      <div className={styles.container}>
        <main className={styles.main}>
          {/* <style jsx>{`
          h2 {
            font-size: 38px;
          }
          h3 {
            font-size: 28px;
          }
        `}</style> */}
          <Head>
            <title> {"<NextJS Beginner/>"}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Script src="https://example.com/script.js" />

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
            <div className={styles.blogs}>
              <h3 className={styles.blogItemh3}>Latest blogs</h3>
              {blogs.map((item, index) => {
                return (
                  <div className="blogItem" key={index}>
                    <h3>{item.title}?</h3>
                    <p>{item.content.substr(0, 300)}...</p>
                    <button className={styles.btn} onClick={()=>HandleChange(item.slug)}>
                  Read More
                    </button>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </main>
      </div>
    </>
  );
}
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

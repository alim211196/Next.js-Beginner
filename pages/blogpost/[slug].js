import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/BlogPost.module.css";
const Slug = (props) => {
  const [data, setData] = useState(props.myBlogs);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <button className={styles.btn}>
            <Link href={"/blog"}>Back</Link>
          </button>
        </div>
        <h2>{data && data.title}</h2>
        <hr />
        <div>{data && data.content}</div>
      </main>
    </div>
  );
};
export async function getServerSideProps(context) {
  const { slug } = context.query;
  let data = await fetch(`http://localhost:3000/api/getblogs?slug=${slug}`);
  let myBlogs = await data.json();

  return {
    props: { myBlogs }, // will be passed to the page component as props
  };
}
export default Slug;

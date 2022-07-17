import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { Post } from "../types/Post.type";

const Home = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:8000/api/posts");
      console.log(data);
      setPosts(data);
    })();
  }, []);

  return (
    <>
      <Layout>
        <ul className="grid grid-cols-2 mx-2">
          {posts?.map((post) => (
            <li key={post._id} className="m-2">
              <Link
                to={`/update?id=${post._id}`}
                className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.month}月
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  電気代：{post.electricity}円
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  ガス代：{post.gas}円
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  水道代：{post.water}円
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  インターネット代：{post.internet}円
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center mt-4">
          <Link
            to="/create"
            className={`hover:opacity-50 text-white focus:outline-none focus:shadow-outline bg-blue-500 font-bold py-2 px-4 rounded`}
          >
            投稿する
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Home;

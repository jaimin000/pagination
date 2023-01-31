import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";
import { Pagination } from "antd";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setPosts(response.data);
      setTotal(response.data.length);
    };
    loadPosts();
  }, []);

  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage);

  return (
    <div className="body">
      {/* <Pagination defaultCurrent={1} total={50} /> */}
      {currentPosts.map((post) => {
        return <h3 key={post.id}>{post.body}</h3>;
      })}
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={postPerPage}
        total={total}
        current={page}
      />
    </div>
  );
};
export default App;

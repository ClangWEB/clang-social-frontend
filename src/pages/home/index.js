import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";

import { useEffect, useReducer } from "react";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: ""
      };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: ""
      };
    case "POSTS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}


export default function Home({ setPostVisible }) {
// export default function Home({ loading, posts, error, setPostVisible }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, posts, error }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: ""
  });
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST"
      });
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllPosts`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data
      });
    }
    catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message
      });
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setPostVisible={setPostVisible} />
        <div className="posts">
          {
            posts.map((post) => (
              <Post key={post?._id} post={post} />
            ))
          }
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}

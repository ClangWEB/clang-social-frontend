import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";

import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

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

// export default function Home({ loading, posts, error, setPostVisible }) {
export default function Home({ setPostVisible }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, posts, error }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: ""
  });
  useEffect(() => {
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
    getAllPosts();
  }, [user]);

  const query1175px = useMediaQuery({
    query: "(max-height: 1175px)"
  });
  const query768px = useMediaQuery({
    query: "(max-height: 768px)"
  });
  const max = query768px ? 40 : query1175px ? 120 : 130;

  const middle = useRef(null);
  const [height, setHeight] = useState();
  const handleHeightLoad = (e) => {
    setHeight(middle.current.clientHeight + max);
  }

  return (
    <div className="home" style={{ height: `${height}px` }} onLoad={handleHeightLoad}>
      <Header />
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setPostVisible={setPostVisible} />
        <div className="posts">
          {
            posts.map((post) => (
              <Post key={post?._id} post={post} user={user}/>
            ))
          }
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}

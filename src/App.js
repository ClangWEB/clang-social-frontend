import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggenInRoutes from "./routes/NotLoggenInRoutes";
import Activate from "./pages/home/activate";
import Reset from "./pages/reset";
import CreatePostPopup from "./components/createPostPopup";
import { useSelector } from "react-redux";
import { useReducer, useState } from "react";
// import { useEffect, useReducer, useState } from "react";
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

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const [postVisible, setPostVisible] = useState(false);
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
      const { data } = await axios.get(`${process.env.REACT_APP_LOGIN_URL}/getAllPosts`, {
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
  // useEffect(() => {
  //   getAllPosts();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const GetAllPostsLoad = async () => {
      await getAllPosts();
  }

  return (
    <div onLoad={GetAllPostsLoad}>
      {postVisible && <CreatePostPopup user={user} setPostVisible={setPostVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home loading={loading} posts={posts} error={error} setPostVisible={setPostVisible} />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggenInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;



// function App() {

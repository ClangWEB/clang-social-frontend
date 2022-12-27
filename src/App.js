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
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postsReducer } from "./functions/reducers";

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  const [postVisible, setPostVisible] = useState(false);
  const [{ loading, posts, error }, dispatch] = useReducer(postsReducer, {
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
  }, [user?.token, user]);

  return (
    <div>
      {postVisible && <CreatePostPopup user={user} setPostVisible={setPostVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home loading={loading} posts={posts} error={error} setPostVisible={setPostVisible} />} exact />
          <Route path="/profile" element={<Profile setPostVisible={setPostVisible}/>} exact />
          <Route path="/profile/:username" element={<Profile setPostVisible={setPostVisible}/>} exact />
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

// const getMyAllPosts = async () => { // eslint-disable-line react-hooks/exhaustive-deps
//   try {
//     dispatch({
//       type: "POSTS_REQUEST"
//     });
//     const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllPosts`, {
//       headers: {
//         Authorization: `Bearer ${user?.token}`
//       }
//     });
//     dispatch({
//       type: "POSTS_SUCCESS",
//       payload: data
//     });
//   }
//   catch (error) {
//     dispatch({
//       type: "POSTS_ERROR",
//       payload: error.response.data.message
//     });
//   }
// };
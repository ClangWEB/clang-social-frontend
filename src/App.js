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
import Friends from "./pages/friends";
import Room from "./pages/room";
import RoomInput from "./components/createPost/RoomInput";
import FullScreen from "./components/post/FullScreen";
import Privacy from "./pages/data/Privacy";
import Terms from "./pages/data/Terms";
import Cookies from "./pages/data/Cookies";
import RoomEnter from "./pages/room/RoomEnter";
import Error from "./pages/error";

function App() {
  const { user, darkTheme } = useSelector((state) => ({ ...state }));
  if (!user) {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/`);
    axios.get(`${process.env.REACT_APP_LOGIN_URL}/`);
  }
  useEffect(() => {
    document.body.style.backgroundColor = `${darkTheme ? "#18191a" : "#f0f2f5"}`
  }, [darkTheme]);
  const [postVisible, setPostVisible] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);

  const [{ loading, posts, error }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: ""
  });

  const getAllPosts = async () => {
    // if (user) {
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
    // }
  };
  useEffect(() => {
    if (user) getAllPosts(); // eslint-disable-next-line 
  }, [user, user?.token]);
  const [showPreview, setShowPreview] = useState(false);
  const [type, setType] = useState("");

  const [fullscreen, setFullscreen] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [postImages, setPostImages] = useState([]);
  const [coverType, setCoverType] = useState(false);

  return (
    <div className={darkTheme ? "dark" : ""}>
      {postVisible &&
        <CreatePostPopup type={type} showPreview={showPreview} setShowPreview={setShowPreview} user={user} setPostVisible={setPostVisible} posts={posts} dispatch={dispatch} />
      }
      {roomOpen && <RoomInput setRoomOpen={setRoomOpen} />}
      {fullscreen &&
        <FullScreen setFullscreen={setFullscreen} postImages={postImages} slideNumber={slideNumber} setSlideNumber={setSlideNumber} coverType={coverType} setCoverType={setCoverType}
        />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={
            <Home
              setType={setType}
              setShowPreview={setShowPreview}
              loading={loading}
              posts={posts}
              error={error}
              setPostVisible={setPostVisible}
              setRoomOpen={setRoomOpen}
              setFullscreen={setFullscreen}
              setSlideNumber={setSlideNumber}
              setPostImages={setPostImages}
              setCoverType={setCoverType}
            />
          }
            exact
          />
          <Route path="/profile" element={<Profile setFullscreen={setFullscreen} setSlideNumber={setSlideNumber} setPostImages={setPostImages} />} exact />
          <Route path="/profile/:username" element={<Profile setFullscreen={setFullscreen} setSlideNumber={setSlideNumber} setPostImages={setPostImages} />} exact />
          <Route path="/friends" element={<Friends setPostVisible={setPostVisible} />} exact />
          <Route path="/friends/:type" element={<Friends setPostVisible={setPostVisible} />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
          <Route path="/room" element={<RoomEnter setRoomOpen={setRoomOpen} />} exact />
          <Route path="/room/:roomID" element={<Room />} exact />
        </Route>
        <Route element={<NotLoggenInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/*" element={<Error />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/privacy" element={<Privacy />} exact />
        <Route path="/terms" element={<Terms />} exact />
        <Route path="/cookies" element={<Cookies />} exact />
      </Routes>
    </div>
  );
}

export default App;

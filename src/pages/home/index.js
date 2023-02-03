import { useSelector } from "react-redux";
import Header from "../../components/header";
// import LeftHome from "../../components/home/left";
// import RightHome from "../../components/home/right";
// import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";
import { HashLoader } from "react-spinners";

export default function Home({ loading, posts, error, setPostVisible, setRoomOpen, setShowPreview, setType, setFullscreen, setSlideNumber, setPostImages, setCoverType }) {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="home">
      {/* <div className="home" style={{ height: `${height}px` }}> */}
      <Header page="home" />
      {/* <LeftHome user={user} /> */}
      <div className="home_middle">
        {/* <Stories /> */}
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost setType={setType} user={user} setPostVisible={setPostVisible} setRoomOpen={setRoomOpen} setShowPreview={setShowPreview} />
        {loading
          ? <div className="skeleton_loader">
            <HashLoader
              color="#F51997"
            />
          </div>
          : <div className="posts">
            {
              posts?.map((post, i) => (
                <Post key={i} post={post} user={user} setSlideNumber={setSlideNumber} setFullscreen={setFullscreen} setPostImages={setPostImages} setCoverType={setCoverType} />
              ))
            }
          </div>
        }
      </div>
      {/* <RightHome user={user} /> */}
    </div>
  );
}

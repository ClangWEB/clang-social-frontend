import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";


export default function Home({ loading, posts, error, setPostVisible }) {
  const { user } = useSelector((state) => ({ ...state }));

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

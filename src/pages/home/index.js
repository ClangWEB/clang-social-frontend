import { useSelector } from "react-redux";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";
import CreatePost from "../../components/createPost";
import SendVerification from "../../components/home/sendVerification";
import Post from "../../components/post";
// import { useRef, useState } from "react";
// import { useMediaQuery } from "react-responsive";

export default function Home({ loading, posts, error, setPostVisible }) {
  const { user } = useSelector((state) => ({ ...state })); // eslint-disable-next-line

  // const query1175px = useMediaQuery({
  //   query: "(max-height: 1175px)"
  // });
  // const query768px = useMediaQuery({
  //   query: "(max-height: 768px)"
  // });
  // const max = query768px ? 60 : query1175px ? 160 : 180;
  // const middle = useRef(null);
  // const [height, setHeight] = useState();
  // const handleHeightLoad = (e) => {
  //   setHeight(middle.current.clientHeight + max);
  // }

  return (
    // <div className="home" style={{ height: `${height}px` }} onLoad={handleHeightLoad}>
    <div className="home">
      <Header page="home"/>
      <LeftHome user={user} />
      {/* <div className="home_middle" ref={middle}> */}
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setPostVisible={setPostVisible} />
        <div className="posts">
          {
            posts?.map((post) => (
              <Post key={post?._id} post={post} user={user}/>
            ))
          }
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}

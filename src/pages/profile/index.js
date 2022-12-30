import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { profileReducer } from "../../functions/reducers";
import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
// import ProfileMenu from "./ProfileMenu";
// import PeopleDiscovery from "./PeopleDiscovery";
import CreatePost from "../../components/createPost";
import GridPosts from "./GridPosts";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from "../../components/intro";
import { useMediaQuery } from "react-responsive";

export default function Profile({ setPostVisible }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username; // eslint-disable-next-line
  const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: ""
  });
  const [othername, setOthername] = useState();
  const path = `${userName}/*`;
  const sort = "desc";
  const max = 30;

  useEffect(() => {
    const getProfile = async () => {
      try {
        dispatch({
          type: "PROFILE_REQUEST"
        });
        const { data } = await axios.get(`${process.env.REACT_APP_LOGIN_URL}/getProfile/${userName}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
        if (data.ok === false) {
          navigate("/profile");
        }
        else {
          try {
            const images = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/listImages`,
              {
                path, sort, max
              },
              {
                headers: {
                  Authorization: `Bearer ${user.token}`
                }
              }
            );
            setPhotos(images.data);
          }
          catch (error) { }
          dispatch({
            type: "PROFILE_SUCCESS",
            payload: data
          });
        }
      }
      catch (error) {
        dispatch({
          type: "PROFILE_ERROR",
          payload: error.response.data.message
        });
      }
    };
    getProfile();
  }, [navigate, path, user.token, userName]);

  var visitor = userName === user.username ? false : true;
  const profileTop = useRef(null);
  const [height, setHeight] = useState();
  const leftSide = useRef(null);
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();

  useEffect(() => {
    setOthername(profile?.details?.othername);
  }, [profile]);


  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };
  useEffect(() => {
    // setHeight(profileTop.current.clientHeight + 300);
    setHeight(profileTop.current.clientHeight);  
    // setHeight(profileTop.current.clientHeight);  
    setLeftHeight(leftSide.current.clientHeight);
    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    }
  }, [loading, scrollHeight, height, leftHeight]);
  const check = useMediaQuery({
    query: "(min-width: 901px)"
  });
  
  return (
    <div className="profile">
      <Header page="profile" visitor={visitor} />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          <Cover cover={profile?.cover} visitor={visitor} photos={photos.resources} />
          <ProfilePictureInfos profile={profile} visitor={visitor} othername={othername} photos={photos.resources} />
          {/* <ProfileMenu /> */}
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            {/* <PeopleDiscovery /> */}
            <div
              className={
                `profile_grid ${check && scrollHeight >= height && leftHeight > 800
                  ? "scrollFixed showLess"
                  : check && scrollHeight >= height && leftHeight < 800 && "scrollFixed showMore"
                }`
              }
            >
              <div className="profile_left" ref={leftSide}>
                <Intro detailss={profile.details} visitor={visitor} setOthername={setOthername} />
                <Photos photos={photos} />
                <Friends friends={profile.friends} />
                {/* <div className="relative_cs_copright">
                  <div>
                    <Link to="/">Privacy&nbsp; </Link>
                    <Link to="/">Terms&nbsp; </Link>
                    <Link to="/">Cookies&nbsp; </Link>
                    <Link to="/">More&nbsp; </Link>
                  </div>
                  <Link to="/">Casuals4Fun © 2022</Link>
                </div> */}
              </div>
              <div className="profile_right">
                {!visitor && <CreatePost profile user={user} setPostVisible={setPostVisible} />}
                <GridPosts profile={profile} />
                <div className="posts">
                  {profile.posts && profile.posts.length ?
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile={profile} />
                    )) : (<div className="no_posts">No Posts yet...</div>)
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

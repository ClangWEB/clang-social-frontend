import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { profileReducer } from "../../functions/reducers";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PeopleDiscovery from "./PeopleDiscovery";
import CreatePost from "../../components/createPost";
import GridPosts from "./GridPosts";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";

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
  const path = `${userName}/*`;
  const sort = "desc";
  const max = 30;
  useEffect(() => {
    const getProfile = async () => {
      try {
        dispatch({
          type: "PROFILE_REQUEST"
        });
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`, {
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

  return (
    <div className="profile">
      <Header page="profile" visitor={visitor} />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile?.cover} visitor={visitor} />
          <ProfilePictureInfos profile={profile} visitor={visitor} photos={photos.resources}/>
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleDiscovery />
            <div className="profile_grid">
              <div className="profile_left">
                <Photos photos={photos}/>
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

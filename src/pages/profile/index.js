import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { profileReducer } from "../../functions/reducers";
import { useEffect, useReducer } from "react";
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

export default function Profile({ setPostVisible }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  var userName = username === undefined ? user.username : username; // eslint-disable-next-line
  const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: ""
  });

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
  }, [userName, user?.token, user, navigate]); console.log(profile)

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile?.cover} />
          <ProfilePictureInfos profile={profile} />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleDiscovery />
            <div className="profile_grid">
              <div className="profile_left">

              </div>
              <div className="profile_right">
                <CreatePost profile user={user} setPostVisible={setPostVisible} />
                <GridPosts />
                <div className="posts">
                  {profile.posts && profile.posts.length && profile.posts.map((post, i) => (
                    <Post post={post} user={user} key={i}/>
                  ))}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

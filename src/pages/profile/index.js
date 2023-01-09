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
// import CreatePost from "../../components/createPost";
import GridPosts from "./GridPosts";
import Post from "../../components/post";
// import Photos from "./Photos";
import Friends from "./Friends";
import Intro from "../../components/intro";
import { useMediaQuery } from "react-responsive";
// import CreatePostPopup from "../../components/createPostPopup";
import Skeleton from "react-loading-skeleton";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HashLoader } from "react-spinners";


export default function Profile({ setSlideNumber, setFullscreen, setPostImages }) {
  // export default function Profile({ getAllPosts }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  // const [postVisible, setPostVisible] = useState(false);
  var userName = username === undefined ? user.username : username; // eslint-disable-next-line
  const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: ""
  });
  const [othername, setOthername] = useState("");
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
            const images = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/listImages`, { path, sort, max }, {
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
    setOthername(profile?.details?.otherName);
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
      {/* {postVisible &&
        <CreatePostPopup
          user={user}
          setPostVisible={setPostVisible}
          posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      } */}
      <Header page="profile" visitor={visitor} />
      {/* <Header page="profile" visitor={visitor} getAllPosts={getAllPosts} /> */}

      {/* SKELETON GRADIENT LOADING */}
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          {loading
            ?
            <>
              <div className="profile_cover">
                <Skeleton
                  // highlightColor="pink"
                  height="347.5px"
                  containerClassName="avatar-skeleton"
                  style={{
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px"
                  }}
                />
              </div>
              <div className="profile_img_wrap" style={{ marginBottom: "-4.2rem", transform: "translateY(-8px)" }} >
                <div className="profile_w_left">
                  <Skeleton
                    circle
                    // highlightColor="pink"
                    height="180px"
                    width="180px"
                    containerClassName="avatar-skeleton"
                    style={{ transform: "translateY(-3.3rem)" }}
                  />
                  <div className="profile_w_col">
                    <div className="profile_name">
                      <Skeleton
                        // highlightColor="pink"
                        height="35px"
                        width="200px"
                        containerClassName="avatar-skeleton"
                      />
                      <Skeleton
                        height="30px"
                        width="100px"
                        containerClassName="avatar-skeleton"
                      // style={{ transform: "translateY(5px)" }}
                      />
                    </div>
                    <div className="profile_friend_count gray_btn">
                      <Skeleton
                        highlightColor="pink"
                        width="200px"
                        height="52px"
                        containerClassName="avatar-skeleton"
                      />
                    </div>
                    {/* <div className="profile_friend_imgs">
                      {Array.from(new Array(6), (val, i) => i + 1).map((id, i) => (
                        <Skeleton
                          key={i}
                          highlightColor="pink"
                          circle
                          style={{transform: `translateX(${-i * 7}px)`}}
                          width="32px"
                          height="32px"
                          containerClassName="avatar-skeleton"
                        />
                      ))}
                    </div> */}
                  </div>
                </div>
                {visitor && <div className="friendship">
                  <Skeleton
                    // highlightColor="pink"
                    height="33px"
                    width={120}
                    containerClassName="avatar-skeleton"
                  />
                  <div className="flex">
                    <Skeleton
                      // highlightColor="pink"
                      height="33px"
                      width={100}
                      containerClassName="avatar-skeleton"
                    />
                    <Skeleton
                      // highlightColor="pink"
                      height="33px"
                      width={100}
                      containerClassName="avatar-skeleton"
                    />
                  </div>
                </div>}
              </div>
            </>
            :
            <>
              <Cover cover={profile?.cover} visitor={visitor} photos={photos.resources} />
              <ProfilePictureInfos profile={profile} visitor={visitor} othername={othername} photos={photos.resources} />
            </>
          }
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
                {loading
                  ? <>
                    <div className="profile_card">
                      <div className="profile_card_header">Intro</div>
                      <div className="skeleton_loader">
                        <HashLoader
                          color="#F51997"
                        />
                      </div>
                    </div>
                    {/* <div className="profile_card">
                      <div className="profile_card_header">Photos
                        {photos && photos.total_count > 0 && <div className="profile_header_link hover4">See all</div>}
                      </div>
                      <div className="skeleton_loader">
                        <HashLoader
                          color="#F51997"
                        />
                      </div>
                    </div> */}
                    <div className="profile_card">
                      <div className="profile_card_header">Friends
                        {photos && photos.total_count > 0 && <div className="profile_header_link hover4">See all</div>}
                      </div>
                      <div className="skeleton_loader">
                        <HashLoader
                          color="#F51997"
                        />
                      </div>
                    </div>
                  </>
                  : <>
                    <Intro detailss={profile.details} visitor={visitor} setOthername={setOthername} />
                    {/* <Photos photos={photos} /> */}
                    <Friends friends={profile.friends} />
                  </>
                }
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
                <div className="seperator">
                  {/* {loading ?
                    ""
                    : !visitor && <CreatePost profile user={user} setPostVisible={setPostVisible} />
                  } */}
                  <GridPosts />
                  {/* <GridPosts profile={profile} /> */}
                </div>
                {/* {loading
                  ? <div className="skeleton_loader">
                    <HashLoader
                      color="#F51997"
                    />
                  </div>
                  : */}
                <div className="posts">
                  {profile.posts && profile.posts.length ?
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile={profile} setSlideNumber={setSlideNumber} setFullscreen={setFullscreen} setPostImages={setPostImages} />
                    )) : (
                      loading ? (
                        <div className="skeleton_loader">
                          <HashLoader
                            color="#F51997"
                          />
                        </div>
                      )
                        : < div className="no_posts">No Posts yet...</div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

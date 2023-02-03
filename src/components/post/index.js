import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./style.css";
import { Dots, Public } from "../../svg";
import ReactPopup from "./ReactPopup";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { getReacts, reactPost } from "../../functions/post";
import Comment from "./Comment";


export default function Post({ post, user, profile, setSlideNumber, setFullscreen, setPostImages, setCoverType }) {  
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [reacts, setReacts] = useState();
    const [check, setCheck] = useState();
    const [total, setTotal] = useState(0);
    const [comments, setComments] = useState([]);
    const [count, setCount] = useState(0);
    const [checkSaved, setCheckSaved] = useState();

    useEffect(() => {
        const getPostReacts = async () => {
            const res = await getReacts(post._id, user.token);
            setReacts(res.reacts);
            setCheck(res.check);
            setTotal(res.total);
            setCheckSaved(res.checkSaved);
        };
        getPostReacts(post?.comments);
    }, [post, user.token]);
    useEffect(() => {
        setComments(post?.comments)
    }, [post]);

    const reactHandler = async (type) => {
        reactPost(post._id, type, user.token);
        if (check === type) {
            setCheck();
            let index = reacts.findIndex((x) => x.react === check);
            if (index !== -1) {
                setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
                setTotal((prev) => --prev);
            }
        } else {
            setCheck(type);
            let index = reacts.findIndex((x) => x.react === type);
            let index1 = reacts.findIndex((x) => x.react === check);
            if (index !== -1) {
                setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
                setTotal((prev) => ++prev);
            }
            if (index1 !== -1) {
                setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
                setTotal((prev) => --prev);
            }
        }
    };

    const [error, setError] = useState("");
    const [allow, setAllow] = useState(false);
    const toggleComments = () => {
        if (comments.length === 0) {
            setError("No Comments yet");
        }
        if (!allow) {
            setCount(3);
            setAllow(true);
        }
        else {
            setCount(0);
            setAllow(false);
        }
    }

    // const menuRef = useRef(null);
    // useClickOutside(menuRef, () => setShowMenu(false));

    const postRef = useRef(null);
    return (
        <div className="no_overflow">
            <div
                className="post"
                ref={postRef}
                style={{ width: `${profile && "100%"}` }}
            >
                <div className="post_header">
                    <Link to={`/profile/${post.user.username}`} className="post_header_left">
                        <img src={post.user.picture} alt="Profile" />
                        <div className="header_col">
                            <div className="post_profile_name">
                                <div className="post_profile_user">{post.user.first_name} {post.user.last_name}</div>
                                <div className="updated_p">
                                    {
                                        post.type === "profilePicture" &&
                                        `Updated ${post.user.gender === "male" ? "his" : post.user.gender === "female" ? "her" : ""} Profile Picture`
                                    }
                                    {
                                        post.type === "coverPicture" &&
                                        `Updated ${post.user.gender === "male" ? "his" : post.user.gender === "female" ? "her" : ""} Cover Photo`
                                    }
                                </div>
                            </div>
                            <div className="post_profile_privacy_date">
                                <Moment fromNow interval={30}>
                                    {post.createdAt}
                                </Moment>
                                &nbsp;•&nbsp;<Public color="#F51997" />
                                {/* &nbsp;❁&nbsp;<Public color="#F51997"/> */}
                                {/* &nbsp;●&nbsp;<Public color="#F51997" /> */}
                            </div>
                        </div>
                    </Link>
                    <div className="post_header_right_second hover1" onClick={() => setShowMenu(prev => !prev)}>
                        <Dots color="#828387" />
                    </div>
                </div>
                {post.background ? (
                    <div className="post_bg" style={{ backgroundImage: `url(${post.background})` }}>
                        <div className="post_bg_text">{post.text}</div>
                    </div>
                ) : post.type === null ? (
                    <>
                        <div className="post_text">
                            {post.text}
                        </div>
                        {post.images && post.images.length && (
                            <div className={
                                post.images.length === 1
                                    ? "grid_1"
                                    : post.images.length === 2
                                        ? "grid_2"
                                        : post.images.length === 3
                                            ? "grid_3"
                                            : post.images.length === 4
                                                ? "grid_4"
                                                : post.images.length >= 5
                                                && "grid_5"
                            }>
                                {
                                    post.images.slice(0, 5).map((image, i) => (
                                        <img
                                            src={image.url}
                                            key={i}
                                            alt="Post"
                                            className={`img-${i}`}
                                            onClick={() => {
                                                setPostImages(post.images)
                                                setSlideNumber(i);
                                                setFullscreen(true);
                                            }}
                                        />
                                    ))
                                }
                                {
                                    post.images.length > 5 && (
                                        <div className="more-pics-shadow">
                                            +{post.images.length - 5}
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </>
                ) : post.type === "profilePicture" ? (
                    <div className="post_profile_wrap">
                        <div className="post_updated_bg">
                            <img
                                src={post.user.cover}
                                alt=""
                                onClick={() => {
                                    setCoverType(true)
                                    setPostImages(post.user.cover)
                                    setFullscreen(true);
                                }}
                            />
                        </div>
                        <div className="post_updated_image">
                            <img
                                src={post.images[0].url}
                                className="post_updated_picture"
                                alt="Profile"
                                onClick={() => {
                                    setPostImages(post.images)
                                    setFullscreen(true);
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="post_cover_wrap">
                        <img
                            src={post.images[0].url}
                            alt=""
                            onClick={() => {
                                setPostImages(post.images)
                                setFullscreen(true);
                            }}
                        />
                    </div>
                )}

                {/* {total && total > 0 ? */}
                <div className="post_infos">
                    <div className="reacts_count">
                        <div className="reacts_count_imgs">{
                            reacts && reacts
                                .sort((a, b) => {
                                    return b.count - a.count;
                                })
                                .slice(0, 6)
                                .map((react, i) => (
                                    react.count > 0 && <img src={`../../../reacts/${react.react}.svg`} key={i} alt="" />
                                ))
                        }</div>
                        <div className="reacts_count_num">{total > 0 && total}</div>
                    </div>
                    {comments && comments.length > 0 && <div className="to_right" onClick={() => toggleComments()}>
                        <div className="comments_count">
                            <div className="span_second">
                                <i className="comment_icon"></i>
                                <span>{comments.length}</span>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="post_actions">
                    <ReactPopup reactHandler={reactHandler} visible={visible} setVisible={setVisible} />
                    <div
                        className="post_action"
                        // className="post_action hover4"
                        onMouseOver={() => {
                            setTimeout(() => {
                                setVisible(true)
                            }, 500)
                        }}
                        onMouseLeave={() => {
                            setTimeout(() => {
                                setVisible(false)
                            }, 500)
                        }}
                        onClick={() => reactHandler(check ? check : "like")}
                    // onClick={() => setVisible(prev => !prev)}
                    >
                        {check
                            ? <img src={`../../../reacts/${check}.svg`} className="small_react" style={{ width: "19px" }} alt="Reacts" />
                            : <i className="like_icon"></i>
                        }
                        <span
                            style={{
                                color: `
                            ${check === "like"
                                        ? "#4267b2"
                                        : check === "love"
                                            ? "#F63459"
                                            : check === "haha"
                                                ? "#F7B125"
                                                : check === "wow"
                                                    ? "#F7B125"
                                                    : check === "sad"
                                                        ? "#F7B125"
                                                        : check === "angry"
                                                            ? "#E4605A"
                                                            : ""}`
                            }}
                        >
                            {check ? check : "Like"}
                        </span>
                    </div>
                    {/* <div className="post_action hover3" onClick={() => toggleComments()}> */}
                    <div className="post_action" onClick={() => toggleComments()}>
                        <i className="comment_icon"></i>
                        <span>Comments</span>
                        {/* <div className="span_second">{comments && comments.length > 0 && `(${comments.length})`}</div> */}
                    </div>
                    {error &&
                        <div className="postError_zindex comment_error">
                            <div className="postError_error">{error}</div>
                            <button className="pink_btn" onClick={() => { setError("") }}>Close</button>
                        </div>
                    }
                </div>
                <div className="comments_wrap">
                    <div className="comments_order"></div>
                    <CreateComment
                        user={user}
                        postId={post._id}
                        setComments={setComments}
                        setCount={setCount}
                    />
                    {comments && comments
                        .sort((a, b) => {
                            return new Date(b.commentAt) - new Date(a.commentAt);
                        })
                        .slice(0, count)
                        .map((comment, i) => <Comment comment={comment} key={i} />)
                    }
                    <div className="myView">
                        {allow && comments.length !== 0 && (
                            <div className="view_comments" onClick={() => {
                                setCount(0);
                                setAllow(false);
                            }}>
                                <span>Close</span>
                            </div>
                        )}
                        {allow && count < comments.length && (
                            <div className="view_comments" onClick={() => setCount(prev => prev + 3)}>
                                <span>View More</span>
                            </div>
                        )}
                    </div>
                    {showMenu &&
                        <PostMenu
                            // menuRef={menuRef}
                            userId={user.id}
                            postUserId={post.user._id}
                            imagesLength={post?.images?.length}
                            postId={post?._id}
                            token={user.token}
                            checkSaved={checkSaved}
                            setCheckSaved={setCheckSaved}
                            images={post?.images}
                            imagesName={post?.user?.first_name}
                            postRef={postRef}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

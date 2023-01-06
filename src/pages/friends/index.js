import { useEffect, useReducer } from "react";
import Header from "../../components/header";
import "./style.css";
import { getFriendsPageInfos } from "../../functions/user";
import { useSelector } from "react-redux";
import { friendspage } from "../../functions/reducers";
import Card from "./Card";
import { Link, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";


export default function Friends() {
    const { user } = useSelector((state) => ({ ...state }));
    const { type } = useParams();

    // eslint-disable-next-line
    const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
        loading: false,
        data: {},
        error: "",
    });
    useEffect(() => {
        getData(); // eslint-disable-next-line 
    }, []);
    const getData = async () => {
        dispatch({ type: "FRIENDS_REQUEST" });
        const data = await getFriendsPageInfos(user?.token);
        if (data.status === "ok") {
            dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
        }
        else {
            dispatch({ type: "FRIENDS_ERROR", payload: data.data });
        }
    };

    return (
        <>
            <Header page="friends" />
            <div className="friends">
                {/* LEFT WRAP */}
                <div className="friends_left">
                    {/* <div className="friends_left_header">
                        <h3>Friends</h3>
                        <div className="small_circle_second">
                            <i className="settings_filled_icon"></i>
                        </div>
                    </div> */}
                    <div className="friends_left_wrap">
                        <Link to="/friends" className={`menu_item hover1 ${type === undefined && "active_friends"}`}>
                            <div className="small_circle_second">
                                <i className="friends_home_icon"></i>
                            </div>
                            <span>Home</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link to="/friends/requests" className={`menu_item hover1 ${type === "requests" && "active_friends"}`}>
                            <div className="small_circle_second">
                                <i className="friends_suggestions_icon"></i>
                            </div>
                            <span>Friend Requests</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        <Link to="/friends/sent" className={`menu_item hover1 ${type === "sent" && "active_friends"}`}>
                            <div className="small_circle_second">
                                <i className="friends_requests_icon"></i>
                            </div>
                            <span>Sent Requests</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        {/* <div className="menu_item hover1">
                            <div className="small_circle_second">
                                <i className="friends_requests_icon"></i>
                            </div>
                            <span>Suggestions</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div> */}
                        <Link to="/friends/all" className={`menu_item hover1 ${type === "all" && "active_friends"}`}>
                            <div className="small_circle_second">
                                <i className="all_friends_icon"></i>
                            </div>
                            <span>My Friends</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </Link>
                        {/* <div className="menu_item hover1">
                            <div className="small_circle_second">
                                <i className="birthdays_icon"></i>
                            </div>
                            <span>Birthdays</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div> */}
                        {/* <div className="menu_item hover3">
                            <div className="small_circle">
                                <i className="all_friends_icon"></i>
                            </div>
                            <span>Custom Lists</span>
                            <div className="rArrow">
                                <i className="right_icon"></i>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* RIGHT WRAP */}


                <div className="friends_right">
                    {loading
                        ? <div className="skeleton_loader_second">
                            <HashLoader
                                color="#F51997"
                            />
                        </div>
                        : <div>
                            {
                                (type === undefined || type === "requests") && (
                                    <div className="friends_right_wrap">
                                        <div className="friends_left_header">
                                            <h3>Friend Requests</h3>
                                            {type === undefined && (
                                                <Link to="/friends/requests" className="see_link hover3">
                                                    See all
                                                </Link>
                                            )}
                                        </div>
                                        <div className="flex_wrap">
                                            {data.requests && data.requests
                                                .slice(0, 5)
                                                .map((user, i) => (
                                                    <Card
                                                        userr={user}
                                                        type="request"
                                                        key={i}
                                                        getData={getData}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                (type === undefined || type === "sent") && (
                                    <div className="friends_right_wrap">
                                        <div className="friends_left_header">
                                            <h3>Sent Requests</h3>
                                            {type === undefined && (
                                                <Link to="/friends/sent" className="see_link hover3">
                                                    See all
                                                </Link>
                                            )}
                                        </div>
                                        <div className="flex_wrap">
                                            {data.sentRequests && data.sentRequests
                                                .slice(0, 5)
                                                .map((user, i) => (
                                                    <Card
                                                        userr={user}
                                                        type="sent"
                                                        key={i}
                                                        getData={getData}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                (type === undefined || type === "all") && (
                                    <div className="friends_right_wrap">
                                        <div className="friends_left_header">
                                            <h3>My Friends</h3>
                                            {type === undefined && (
                                                <Link to="/friends/all" className="see_link hover3">
                                                    See all
                                                </Link>
                                            )}
                                        </div>
                                        <div className="flex_wrap">
                                            {data.friends && data.friends
                                                .slice(0, 5)
                                                .map((user, i) => (
                                                    <Card
                                                        userr={user}
                                                        type="friends"
                                                        key={i}
                                                        getData={getData}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>)
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
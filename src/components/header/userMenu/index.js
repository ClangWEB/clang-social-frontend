import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Settings from "./Settings";
import HelpSupport from "./HelpSupport";
import DisplayAccess from "./DisplayAccess";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";


export default function UserMenu({ user }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = () => {
        Cookies.set("user", "");
        dispatch({
            type: "LOGOUT",
        });
        navigate("/");
    };
    const [visible, setVisible] = useState(0);

    return (
        <div className="menu">
            {visible === 0 && (
                <div>
                    <Link to="/profile" className="menu_header hover1">
                        <img src={user?.picture} alt="Profile" />
                        <div className="menu_col">
                            <span>{user?.first_name} {user?.last_name}</span>
                            <span>My Profile</span>
                        </div>
                    </Link>
                    <div className="menu_splitter"></div>
                    {/* <div className="menu_item hover1" onClick={() => {setVisible(1)}}>
                        <div className="small_circle">
                            <i className="settings_filled_icon"></i>
                        </div>
                        <span>All Settings</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>
                        </div>
                    </div> */}
                    <div className="menu_item hover1"onClick={() => {setVisible(2)}}>
                        <div className="small_circle">
                            <i className="dark_filled_icon"></i>
                        </div>
                        <span>Display Setting</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>
                        </div>
                    </div>
                    {/* <div className="menu_item hover1" onClick={() => {setVisible(3)}}>
                        <div className="small_circle">
                            <i className="help_filled_icon"></i>
                        </div>
                        <span>Help & Support</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>
                        </div>
                    </div> */}
                    <div className="menu_item hover1" onClick={() => { logOut(); }}>
                        <div className="small_circle">
                            <i className="logout_filled_icon"></i>
                        </div>
                        <span>Log Out</span>
                    </div>
                    <div className="menu_splitter"></div>
                    <div className="menu_item hover1">
                        <div className="small_circle">
                            <i className="report_filled_icon"></i>
                        </div>
                        <div className="menu_col">
                            <div className="menu_span1">Feedback</div>
                            <div className="menu_span2">Help us improve Clang Social</div>
                        </div>
                    </div>
                </div>
            )}
            {visible === 1 && (
                <div>
                    <Settings setVisible={setVisible} />
                </div>
            )}
            {visible === 2 && (
                <div>
                    <DisplayAccess setVisible={setVisible} />
                </div>
            )}
            {visible === 3 && (
                <div>
                    <HelpSupport setVisible={setVisible} />
                </div>
            )}
        </div>
    )
}

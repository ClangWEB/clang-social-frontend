import "./style.css";
import { Link } from "react-router-dom"
import { Logo, Search, HomeActive, Friends, ArrowDown, Home, FriendsActive } from "../../svg";
// import { Logo, Search, HomeActive, Friends, Menu, Messenger, Notifications, ArrowDown, Home, FriendsActive } from "../../svg";
// import { Logo, Search, HomeActive, Friends, Watch, Market, Gaming, Menu, Messenger, Notifications, ArrowDown, Home } from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/clickOutside";
import UserMenu from "./userMenu";


export default function Header({ page, visitor }) {
// export default function Header({ page, visitor, getAllPosts }) {

    const { user } = useSelector((user) => ({ ...user }));
    const color = "#65676b";
    const [showSearchMenu, setShowSearchMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const [showAllMenu, setShowAllMenu] = useState(false);
    const allMenu = useRef(null);
    const usermenu = useRef(null);

    useClickOutside(allMenu, () => {
        setShowAllMenu(false);
    })
    useClickOutside(usermenu, () => {
        setShowUserMenu(false);
    })

    return (
        <header>
            {/* HEADER LEFT */}
            <div className="header_left">
                <Link to="/" className="header_logo">
                {/* <Link to="/" onClick={() => getAllPosts()} className="header_logo"> */}
                    <div className="circle">
                        <Logo />
                    </div>
                </Link>
                <div className="search search1" onClick={() => { setShowSearchMenu(true) }}>
                    <Search color={color} />
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="hide_input"
                    />
                </div>
            </div>

            {showSearchMenu && 
                <SearchMenu
                    token = {user?.token} 
                    color={color} 
                    setShowSearchMenu={setShowSearchMenu} 
                />
            }

            {/* HEADER MIDDLE */}
            <div className="header_middle">
                <Link to="/" className={`middle_icon ${page === "home" ? "active" : "hover1"}`}>
                {/* <Link to="/" onClick={() => getAllPosts()} className={`middle_icon ${page === "home" ? "active" : "hover1"}`}> */}
                    {page === "home" ? <HomeActive /> : <Home color={color} />}
                </Link>
                <Link to="/friends" className={`middle_icon ${page === "friends" ? "active" : "hover1"}`}>
                {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
                </Link>
                {/* <Link to="/" className="middle_icon hover1">
                    <Watch color={color} />
                    <div className="middle_notification">9+</div>
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Market color={color} />
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Gaming color={color} />
                </Link> */}
            </div>

            {/* HEADER RIGHT */}
            <div className="header_right">
                {!visitor ? (
                    <Link to="/profile" className={`profile_link hover1 ${page === "profile" ? "activate_link" : ""}`}>
                        <img src={user?.picture} className={`profile_link_img ${page === "profile" ? "activate_image" : ""}`} alt="Profile" />
                        <span>{user?.first_name}</span>
                    </Link>) : (
                    <Link to="/profile" className="profile_link hover1">
                        <img src={user?.picture} className="profile_link_img" alt="Profile" />
                        <span>{user?.first_name}</span>
                    </Link>
                )}
                {/* <div className={`circle_icon hover1 ${showAllMenu && "active_header"}`} ref={allMenu}>
                    <div onClick={() => setShowAllMenu((prev) => !prev)}>
                        <div style={{ transform: "translateY(2.5px)" }}>
                            <Menu />
                        </div>
                    </div> */}
                    {showAllMenu && <AllMenu />}
                {/* </div> */}
                {/* <div className="circle_icon hover1">
                    <Messenger />
                </div> */}
                {/* <div className="circle_icon hover1">
                    <Notifications />
                    <div className="right_notification">5</div>
                </div> */}
                <div className={`circle_icon hover1 ${showUserMenu && "active_header"}`} ref={usermenu} >
                    <div onClick={() => setShowUserMenu((prev) => !prev)}>
                        <div style={{ transform: "translateY(2.5px)" }}>
                            <ArrowDown />
                        </div>
                    </div>
                    {showUserMenu && <UserMenu user={user} />}

                </div>
            </div>
        </header>
    )
}

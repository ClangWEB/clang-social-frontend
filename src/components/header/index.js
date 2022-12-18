import "./style.css";
import { Link } from "react-router-dom"
// import { Logo, Search, HomeActive, Friends, Watch } from "../../svg";
import { Logo, Search, HomeActive, Friends, Watch, Market, Gaming, Menu, Messenger, Notifications, ArrowDown } from "../../svg";
import { useSelector } from "react-redux";


export default function Header() {

    const { user } = useSelector((user) => ({ ...user }));
    const color = "#65676b";

    return (
        <header>
            {/* HEADER LEFT */}
            <div className="header_left">
                <Link to="/" className="header_logo">
                    <div className="circle">
                        <Logo />
                    </div>
                </Link>
                <div className="search search1">
                    <Search color={color} />
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="hide_input"
                    />
                </div>
            </div>

            {/* HEADER MIDDLE */}
            <div className="header_middle">
                <Link to="/" className="middle_icon active">
                    <HomeActive />
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Friends color={color} />
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Watch color={color} />
                    <div className="middle_notification">9+</div>
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Market color={color} />
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Gaming color={color} />
                </Link>
            </div>

            {/* HEADER RIGHT */}
            <div className="header_right">
                <Link to="/profile" className="profile_link hover1">
                    <img src={user?.picture} alt="Profile" />
                    <span>{user?.first_name}</span>
                </Link>
                <div className="circle_icon hover1">
                    <Menu />
                </div>
                <div className="circle_icon hover1">
                    <Messenger />
                </div>
                <div className="circle_icon hover1">
                    <Notifications />
                    <div className="right_notification">5</div>
                </div>
                <div className="circle_icon hover1">
                    <ArrowDown />
                </div>
            </div>
        </header>
    )
}

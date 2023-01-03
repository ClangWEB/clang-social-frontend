import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import Shortcut from "./Shortcut";


export default function LeftHome({ user }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="left_home scrollbar">
            <Link to="/profile" className="left_link hover2">
                <img src={user?.picture} alt="Profile" />
                <span>{user?.first_name} {user?.last_name}</span>
            </Link>
            {
                left.slice(0, 8).map((link, i) => (
                    <LeftLink key={i} img={link.img} text={link.text} notification={link.notification} />
                ))
            }
            {!visible && (
                <div className="left_link hover1" onClick={() => setVisible(true)}>
                    <div className="small_circle_second">
                        <ArrowDown1 />
                    </div>
                    <span>&nbsp;Show More</span>
                </div>
            )}
            {visible && (
                <div className="more_left">
                    {
                        left.slice(8, left.length).map((link, i) => (
                            <LeftLink key={i} img={link.img} text={link.text} notification={link.notification} />
                        ))
                    }
                    <div className="left_link hover2" onClick={() => setVisible(false)}>
                        <div className="small_circle_second upsidedown">
                            <ArrowDown1 />
                        </div>
                        <span>&nbsp;Show Less</span>
                    </div>
                </div>
            )}
            <div className="splitter"></div>
            <div className="shortcut">
                <div className="heading">My Social Links</div>
                <div className="edit_shortcut">Edit</div>
            </div>
            <div className="shortcut_list">
                <Shortcut
                    link="https://www.youtube.com/"
                    img="../../images/ytb.png"
                    name="My Youtube Channel"
                />
                <Shortcut
                    link="https://www.instagram.com/"
                    img="../../images/insta.png"
                    name="My Instagram"
                />
            </div>
            {/* <div className={`cs_copyright ${visible && "relative_cs_copright"}`}>
                <div>
                    <Link to="/">Privacy&nbsp; </Link>
                    <Link to="/">Terms&nbsp; </Link>
                    <Link to="/">Cookies&nbsp; </Link>
                    <Link to="/">More&nbsp; </Link>
                </div>
                <Link to="/">Casuals4Fun © 2022</Link>
            </div> */}
        </div>
    )
}

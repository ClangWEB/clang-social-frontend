import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";


export default function Reset() {
    const { user } = useSelector((state) => ({ ...state }));
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
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [userInfos, setUserInfos] = useState("");
    console.log(userInfos);

    return (
        <div className="reset">
            <div className="reset_header">
                <img src="../../../icons/ClangSocial_Reset.png" alt="" />
                {user ?
                    <div className="right_reset">
                        <Link to="/profile"><img src={user?.picture} alt="" /></Link>
                        <button onClick={() => { logOut() }} className="pink_btn">Log Out</button>
                    </div>
                    :
                    <Link to="/login" className="right_reset">
                        <button className="pink_btn">Log In</button>
                    </Link>
                }
            </div>
            <div className="reset_wrap">
                {visible === 0 &&
                    <SearchAccount email={email} setEmail={setEmail} error={error} setError={setError} setLoading={setLoading} setUserInfos={setUserInfos} setVisible={setVisible}/>
                }
                {visible === 1 && userInfos &&
                    <SendEmail setLoading={setLoading} userInfos={userInfos}/>
                }
                {visible === 2 &&
                    <CodeVerification code={code} setCode={setCode} error={error} setLoading={setLoading}/>
                }
                {visible === 3 &&
                    <ChangePassword password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} error={error} setLoading={setLoading}/>
                }
            </div>
            <Footer />
        </div>
    )
}

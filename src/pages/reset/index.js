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
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="reset">
            <div className="reset_header">
                <img src="../../../icons/ClangSocial_Reset.png" alt="" />
                {user ?
                    <div className="right_reset">
                        <Link to="/profile"><img src={user?.picture} alt="" /></Link>
                        <button onClick={() => { logOut() }} className="pink_btn">Login</button>
                    </div>
                    :
                    <Link to="/login" className="right_reset">
                        <button className="pink_btn">Log Out</button>
                    </Link>
                }
            </div>
            <div className="reset_wrap">
                {visible === 0 &&
                    <SearchAccount email={email} setEmail={setEmail} error={setError}/>
                }
                {visible === 1 &&
                    <SendEmail user={user}/>
                }
                {visible === 2 &&
                    <CodeVerification code={code} setCode={setCode} error={error}/>
                }
                {visible === 3 &&
                    <ChangePassword password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} error={error}/>
                }
            </div>
            <Footer />
        </div>
    )
}

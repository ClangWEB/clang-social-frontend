import axios from "axios";
import { Link } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

export default function SendEmail({ email, userInfos, error, setError, loading, setLoading, setUserInfos, setVisible }) {
    const sendEmail = async () => {
        try {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`, { email });
            setError("");
            setLoading(false);
            setVisible(2);
        }
        catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return (
        <div className="reset_form dynamic_height">
            <div className="reset_form_header">Reset your Password</div>
            <div className="reset_grid">
                <div className="reset_left">
                    <div className="reset_form_text">A code will be sent to your Email address to reset your password</div>
                    <label htmlFor="email" className="">
                        <input type="radio" name="" id="email" checked readOnly />
                        <div className="label_col">
                            <span>Send code via email</span>
                            <span>{userInfos?.email}</span>
                        </div>
                    </label>
                </div>
                <div className="reset_right">
                    <img src={userInfos?.picture} alt="Profile" />
                    <div className="flex_name">
                        <span>{userInfos?.first_name}</span> <span>{userInfos?.last_name}</span>
                    </div>
                    <span>{userInfos?.email}</span>
                    <span style={{ color: "#F51997" }}>Clang Social User</span>
                </div>
            </div>
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
                <Link to="/login" className="gray_btn">Not Me</Link>
                {!loading
                    ? <button onClick={() => { sendEmail() }} className="pink_btn">Continue</button>
                    : <div className="pink_btn">
                        <RiseLoader
                            color="#fff"
                            // className="loading_btn"
                            loading={loading}
                            size={8.5}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                }
            </div>
        </div>
    )
}

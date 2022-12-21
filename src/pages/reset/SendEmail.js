import { Link } from "react-router-dom";

export default function SendEmail({ setLoading, userInfos }) {


    return (
        <div className="reset_form dynamic_height">
            <div className="reset_form_header">Reset your Password</div>
            <div className="reset_grid">
                <div className="reset_left">
                    <div className="reset_form_text">A code will be sent to your Email address to reset your password</div>
                    {/* <div className="reset_form_text">How do you want to recieve the code to reset your password?</div> */}
                    <label htmlFor="email" className="hover3">
                        <input type="radio" name="" id="email" checked readOnly />
                        <div className="label_col">
                            <span>Send code via email</span>
                            <span>{userInfos?.email}</span>
                        </div>
                    </label>
                </div>
                <div className="reset_right">
                    <img src={userInfos?.picture} alt="Profile" />
                    <span>{userInfos?.email}</span>
                    <span style={{color: "#F51997"}}>Clang Social User</span>
                </div>
            </div>
            <div className="reset_form_btns">
                <Link to="/login" className="gray_btn">Not Me</Link>
                <button type="submit" className="pink_btn">Continue</button>
            </div>
        </div>
    )
}

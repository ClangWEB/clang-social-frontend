import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoginInput from "../inputs/logininput";
import RiseLoader from "react-spinners/RiseLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const loginInfos = {
    email: "",
    password: "",
}

export default function LoginForm({ setVisible }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(loginInfos);
    const { email, password } = login;
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
    const loginValidation = Yup.object({
        email: Yup
            .string()
            .required("Enter your Email address")
            .email("Enter valid Email address")
            .max(100, "Maximum allowed characters is 100"),
        password: Yup
            .string()
            .required("Enter your Password"),

    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loginSubmit = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_LOGIN_URL}/login`, { email, password });
            setLoading(false);
            navigate("/");
            dispatch({ type: "LOGIN", payload: data });
            Cookies.set("user", JSON.stringify(data), {expires: 365});
        }
        catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return (
        <div className="login_wrap">
            <div className="login_1">
                <img src="../../icons/clangsocial.svg" alt="" />
                <span>
                    Post Anything Anytime Anywhere
                </span>
            </div>
            <div className="login_2">
                <div className="login_2_wrap">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            email,
                            password,
                        }}
                        validationSchema={loginValidation}
                        onSubmit={() => {
                            setError("");
                            setLoading(true);
                            loginSubmit();
                        }}
                    >
                        {
                            (formik) => (
                                <Form>
                                    <LoginInput onChange={handleLoginChange} type="text" name="email" placeholder="Email Address" />
                                    <LoginInput onChange={handleLoginChange} type="password" name="password" placeholder="Password" bottom />
                                    {!loading
                                        ? <button type="submit" className="pink_btn">Log In</button>
                                        :
                                        <div className="pink_btn">
                                            <RiseLoader
                                                color="#fff"
                                                // color="#F51997"
                                                loading={loading}
                                                className="loading_btn"
                                                size={10}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div>
                                    }
                                </Form>
                            )
                        }
                    </Formik>
                    <Link to="/reset" className="forgot_password">Recover Password</Link>

                    <div className="error_text">
                        {/* <RiseLoader
                            color="#F51997"
                            loading={loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        /> */}
                        {error && <div>{error}</div>}
                    </div>
                    <div className="sign_splitter"></div>
                    <button disabled={loading} className="pink_btn open_signup" type="" onClick={() => setVisible(true)}>Create Account</button>
                </div>
                {/* <Link to="/" className="sign_extra">
              <b>Create a Page </b>
              for NGOs, Official Business, Government, etc. 
            </Link> */}
            </div>
        </div>
    )
}

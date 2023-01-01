import axios from "axios";
import LoginInput from "../../components/inputs/logininput";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";


export default function ChangePassword({ userInfos, password, setPassword, confirmPassword, setConfirmPassword, error, setError, loading, setLoading }) {
    const navigate = useNavigate();
    const validatePassword = Yup.object({
        password: Yup.string()
            .required("Create your new password!")
            .min(6, "Your new password must be atleast of 6 characters."),
        confirmPassword: Yup.string()
            .required("Confirm your new password!")
            .oneOf([Yup.ref("password")], "Password doesn't match. Try again!")
    })

    const { email } = userInfos;
    const changePassword = async () => {
        try {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, { email, password });
            setError("");
            setLoading(false);
            navigate("/");
        }
        catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return (
        <div className="reset_form" style={{ height: "310px" }}>
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">Enter a strong password</div>
            <Formik
                enableReinitialize
                initialValues={{ password, confirmPassword }}
                validationSchema={validatePassword}
                onSubmit={() => { changePassword() }}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="password"
                            name="password"
                            placeholder="Set new Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <LoginInput
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            bottom
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn">Cancel</Link>
                            {!loading
                                ? <button type="submit" className="pink_btn">Continue</button>
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
                    </Form>
                )}
            </Formik>
        </div>
    )
}

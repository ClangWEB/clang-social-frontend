import axios from "axios";
import LoginInput from "../../components/inputs/logininput";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import RiseLoader from "react-spinners/RiseLoader";


export default function CodeVerification({ code, userInfos, setCode, error, setError, loading, setLoading, setVisible }) {
    const validateCode = Yup.object({
        code: Yup.string()
            .required("Enter the code!")
            .min("5", "Code must be of 5 characters")
            .max("5", "Code must be of 5 characters")
    });

    const { email } = userInfos;

    const verifyCode = async () => {
        try {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/validateResetCode`, { email, code });
            setError("");
            setLoading(false);
            setVisible(3);
        }
        catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return (
        <div className="reset_form">
            <div className="reset_form_header">Code Verification</div>
            <div className="reset_form_text">Enter the code that has been sent to your email</div>
            <Formik
                enableReinitialize
                initialValues={{ code }}
                validationSchema={validateCode}
                onSubmit={() => { verifyCode() }}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="code"
                            placeholder="XXXXX"
                            onChange={(e) => setCode(e.target.value)}
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

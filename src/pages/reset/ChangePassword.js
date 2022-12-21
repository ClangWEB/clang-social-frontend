import LoginInput from "../../components/inputs/logininput";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";


export default function ChangePassword({ password, setPassword, confirmPassword, setConfirmPassword, error }) {
    const validatePassword = Yup.object({
        password: Yup.string()
            .required("Create your new password!")
            .min(6, "Your new password must be atleast of 6 characters."),
        confirmPassword: Yup.string()
            .required("Confirm your new password!")
            .oneOf([Yup.ref("password")], "Password doesn't match. Try again!")
    })

    return (
        <div className="reset_form" style={{ height: "310px" }}>
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">Enter a strong password</div>
            <Formik
                enableReinitialize
                initialValues={{ password, confirmPassword }}
                validationSchema={validatePassword}
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
                            <button type="submit" className="pink_btn">Continue</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

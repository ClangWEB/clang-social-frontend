import LoginInput from "../../components/inputs/logininput";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";


export default function ChangePassword({ password, setPassword, confirmPassword, setConfirmPassword, error  }) {
    return (
        <div className="reset_form" style={{height: "310px"}}>
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">Enter a strong password</div>
            <Formik
                enableReinitialize
                initialValues={{ password, confirmPassword }}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="password"
                            placeholder="Set new Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <LoginInput
                            type="text"
                            name="confirmPassword"
                            placeholder="Confirm new Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

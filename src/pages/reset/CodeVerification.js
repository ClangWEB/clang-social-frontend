import LoginInput from "../../components/inputs/logininput";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";


export default function CodeVerification({ code, setCode, error }) {
    const validateCode = Yup.object({
        code: Yup.string()
            .required("Enter the code!")
            .min("5", "Code must be of 5 characters")
            .max("5", "Code must be of 5 characters")
    })

    return (
        <div className="reset_form">
            <div className="reset_form_header">Code Verification</div>
            <div className="reset_form_text">Enter the code that has been sent to your email</div>
            <Formik
                enableReinitialize
                initialValues={{ code }}
                validationSchema={validateCode}
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
                            <button type="submit" className="pink_btn">Continue</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

import LoginInput from "../../components/inputs/logininput";
import { Search } from "../../svg";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";


export default function SearchAccount({ email, setEmail, error }) {
    const validateEmail = Yup.object({
        email: Yup.string()
        .required("Enter the Email address!")
        .email("Enter valid Email address!")
    })

    return (
        <div className="reset_form">
            <div className="reset_form_header">Find your Account</div>
            <div className="reset_form_text">Please enter your Email address to search for your account</div>
            <Formik
                enableReinitialize
                initialValues={{ email }}
                validationSchema={validateEmail}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="email"
                            placeholder="Enter your email here..."
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn">Cancel</Link>
                            {/* <button type="submit" className="pink_btn">Search</button> */}
                            <button type="submit" className="pink_btn"><Search color="#fff" />Search</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

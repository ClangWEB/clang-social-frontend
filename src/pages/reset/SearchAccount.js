import LoginInput from "../../components/inputs/logininput";
import { Search } from "../../svg";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";


export default function SearchAccount({ email, setEmail, error, setError,  setLoading, setUserInfos, setVisible }) {
    const validateEmail = Yup.object({
        email: Yup.string()
        .required("Enter the Email address!")
        .email("Enter valid Email address!")
    })
    const handleSearch = async () => {
        try {
            setError("");
            setLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/findUser`, {email});
            setUserInfos(data);
            setVisible(1);
        } 
        catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return (
        <div className="reset_form">
            <div className="reset_form_header">Find your Account</div>
            <div className="reset_form_text">Please enter your Email address to search for your account</div>
            <Formik
                enableReinitialize
                initialValues={{ email }}
                validationSchema={validateEmail}
                onSubmit={() => {
                    handleSearch();
                }}
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

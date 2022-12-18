import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="login_footer">
            <div className="login_footer_wrap">
                <Link to="/">Sign Up</Link>
                <Link to="/login">Log in</Link>
                <Link to="/">Privacy</Link>
                <Link to="/">Cookies</Link>
                <Link to="/">Terms</Link>
                <Link to="/">Help</Link>
            </div>
            <div className="footer_splitter"></div>
            <div className="login_footer_wrap">
                <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
                    Casuals4Fun © 2022
                </Link>
            </div>
        </footer>
    )
}

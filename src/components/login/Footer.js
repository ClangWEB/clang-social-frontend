import { Link } from "react-router-dom";

export default function Footer({ setVisible }) {
    return (
        <footer className="login_footer">
            <div className="login_footer_wrap">
                <Link to="/" onClick={() => setVisible(true)}>Sign Up</Link>
                <Link to="/login">Log in</Link>
                <Link to="/privacy">Privacy</Link>
                <Link to="/cookies">Cookies</Link>
                <Link to="/terms">Terms</Link>
                {/* <Link to="/">Help</Link> */}
            </div>
            <div className="footer_splitter"></div>
            <div className="login_footer_wrap companyWrap">
                {/* <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}> */}
                <div style={{ fontSize: "12px" }}>
                    Made with 🖤 by Casuals4Fun
                </div>
                <div style={{ fontSize: "12px", textDecoration: "underline"}}>
                    WeKnewHow
                </div>
            </div>
        </footer>
    )
}

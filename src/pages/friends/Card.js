import { Link } from "react-router-dom";

export default function Card({ user, type }) {
    return (
        <div className="req_card">
            <Link to={`/profile/${user.username}`}>
                <img src={user.picture} alt="" />
            </Link>
            <div className="req_name">
                <Link to={`/profile/${user.username}`}>{user.first_name} {user.last_name}</Link>
            </div>
            {
                type === "request"
                    ? <div className="flex">
                        <button className="pink_btn">Accept</button>
                        <button className="gray_btn">Reject</button>
                    </div>
                    : type === "sent"
                        ? <button className="pink_btn">Cancel Request</button>
                        : ""
            }
        </div>
        
    )
}

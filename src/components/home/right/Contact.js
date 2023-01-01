export default function Contact({ user }) {
    return (
        <div className="contact hover1">
            <div className="contact_img">
                <img src={user?.picture} alt="Contacts" />
            </div>
            <span>{user?.first_name} {user?.last_name}</span>
        </div>
    )
}

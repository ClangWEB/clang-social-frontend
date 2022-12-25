export default function MenuItem({ icon, title, subtitle }) {
  return (
    <li className="hover3">
        <i className={icon}></i>
        <div className="post_menu_text">
            <span>{title}</span>
            {subtitle && 
                <span className="menu_post_col">
                    {subtitle}
                </span>
            }
        </div>
    </li>
  )
}

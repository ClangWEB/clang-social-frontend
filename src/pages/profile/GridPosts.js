// export default function GridPosts({ profile }) {
export default function GridPosts() {
    return (
        <div>
            {/* <div className="createPost"> */}
            <div className="createPost_header">
                {/* <div className="createPost_header" style={{ justifyContent: "space-between" }}> */}
                <div className="left_header_grid">Posts</div>
                {/* {profile.posts && profile.posts.length ? (
                    <div className="flex">
                        <div className="gray_btn">
                            <i className="equalize_icon" />
                        </div>
                        <div className="gray_btn">
                            <i className="manage_icon" />Manage Posts
                        </div>
                    </div>) : ("")
                } */}
            </div>
            {/* <div className="create_splitter"></div> */}
            {/* {profile.posts && profile.posts.length ? (
                <div className="createPost_body grid2">
                    <div className="view_type active">
                        <i className="list_icon filter_pink" />List View
                    </div>
                    <div className="view_type">
                        <i className="grid_icon" />Grid View
                    </div>
                </div>) : ("")
            } */}
        </div>
    )
}

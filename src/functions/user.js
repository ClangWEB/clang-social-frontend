import axios from "axios";

// UPDATE PROFILE PICTURE
export const updateprofilePicture = async (url, token) => {
    try {
        // const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/createPost`, {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`, { url }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return "ok";
    }
    catch (error) {
        return error.response.data.message;
    }
};

// UPDATE COVER PHOTO
export const updateCover = async (url, token) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateCover`, { url }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return "ok";
    }
    catch (error) {
        return error.response.data.message;
    }
};

// SEND FRIEND REQUEST
export const addFriend = async (id, token) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return "ok";
    }
    catch (error) {
        return error.response.data.message;
    }
};

// CANCEL FRIEND REQUEST
export const cancelRequest = async (id, token) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return "ok";
    }
    catch (error) {
        return error.response.data.message;
    }
};

// FOLLOW
export const follow = async (id, token) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/follow/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return "ok";
    }
    catch (error) {
        return error.response.data.message;
    }
};

// UNFOLLOW
export const unfollow = async (id, token) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return "ok";
    }
    catch (error) {
        return error.response.data.message;
    }
};

// ACCEPT FRIEND REQUEST
export const acceptRequest = async (id, token) => {
    try {
        await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return "ok";
    } catch (error) {
        return error.response.data.message;
    }
};

// UNFRIEND
export const unfriend = async (id, token) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return "ok";
    }
    catch (error) {
        return error.response.data.message;
    }
};

// DELETE REQUEST
export const deleteRequest = async (id, token) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return "ok";
    }
    catch (error) {
        return error.response.data.message;
    }
};
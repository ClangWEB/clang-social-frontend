import axios from "axios";

// CREATING NEW POST
export const createPost = async (type, background, text, images, user, token) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_LOGIN_URL}/createPost`, {
            type, background, text, images, user,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return { status: "ok", data };
    }
    catch (error) {
        return error.response.data.message;
    }
};

// REACTING TO POST
export const reactPost = async (postId, react, token) => {
    try {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/reactPost`, {
            postId, react
        }, {
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

// GET POSTS REACTS
export const getReacts = async (postId, token) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_LOGIN_URL}/getReacts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }
    catch (error) {
        return error.response.data.message;
    }
};

// COMMENT
export const comment = async (postId, comment, image, token) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_LOGIN_URL}/comment`, {
            postId, comment, image
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }
    catch (error) {
        return error.response.data.message;
    }
};

// SAVE POST
export const savePost = async (postId, token) => {
    try {
        const { data } = await axios.put(`${process.env.REACT_APP_LOGIN_URL}/savePost/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }
    catch (error) {
        return error.response.data.message;
    }
};

//DELETE POST
export const deletePost = async (postId, token) => {
    try {
        const { data } = await axios.delete(`${process.env.REACT_APP_LOGIN_URL}/deletePost/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }
    catch (error) {
        return error.response.data.message;
    }
};
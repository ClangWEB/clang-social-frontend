import axios from "axios";


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
}
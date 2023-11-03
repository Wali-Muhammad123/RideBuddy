import axios from "axios";
import api from "../utils/constants";

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(api+'accounts/login/', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
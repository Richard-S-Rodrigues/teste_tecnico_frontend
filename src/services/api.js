import axios from "axios";

const api = axios.create({
	baseURL: "https://sandbox.iexapis.com/stable",
	params: {
		token: process.env.REACT_APP_PRIVATE_API_KEY,
	},
});

export default api;

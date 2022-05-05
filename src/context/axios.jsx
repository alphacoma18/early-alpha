import Axios from "axios";

export const axios = Axios.create({
	baseURL: "https://mnhs-shs.herokuapp.com",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": [
			"https://github.com/mnhs-shs/early-alpha",
			"https://mnhs-shs.herokuapp.com",
			"https://cheerful-llama-689748.netlify.app"
		],
		"Access-Control-Allow-Credentials": true,
		"Access-Control-Allow-Origin": true,
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Max-Age": "3600",
		"Access-Control-Expose-Headers":
			"Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Credentials",
	},
});

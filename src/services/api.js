import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://sandbox.iexapis.com/stable',
	params: {
		token: process.env.REACT_APP_PRIVATE_API_KEY
	}
})


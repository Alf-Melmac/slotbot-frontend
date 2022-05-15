import axios from 'axios';

const slotbotServerClient = axios.create({
	headers: {
		'Content-type': 'application/json',
	},
});

slotbotServerClient.interceptors.response.use((response) => response, (error) => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		/*console.log(error.response.data);
		console.log(error.response.headers);*/

		if (error.response.status === 404) {
			window.location.replace('https://armamachtbock.de/error/404');
		}
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.error(error.request);
	} else {
		// Something happened in setting up the request that triggered an Error
		console.error(error.message);
	}
	return Promise.reject(error);
});
export default slotbotServerClient;

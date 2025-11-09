import axios from 'axios';
import {getBackendUrl} from '../utils/urlHelper';

const slotbotServerClient = axios.create({
	baseURL: getBackendUrl(),
	withCredentials: import.meta.env.DEV ? true : undefined,
	withXSRFToken: import.meta.env.DEV ? true : undefined,
});

slotbotServerClient.interceptors.response.use(
	(response) => {
		if (response.data === 'This session has been expired (possibly due to multiple concurrent logins being attempted as the same user).') {
			globalThis.location.replace('/session-expired');
		}
		return response;
	},
	(error) => {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			if (error.response.status === 404) {
				globalThis.location.replace('/404');
			}
			if (error.response.status === 403) {
				globalThis.location.replace('/403');
			}
			console.error(error.response.data);
			console.error(error.response.headers);
			return Promise.reject({
				message: error.response.data.errorMessage,
			});
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
	},
);
export default slotbotServerClient;

export function voidFunction() {
	/*Do nothing*/
}

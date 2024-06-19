import axios from 'axios';
import { setAlert } from './alert';
import {
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from './types';

// axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;
export const login = (login) => async (dispatch) => {
  let csrf;
  let name = 'csrftoken=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      csrf =  c.substring(name.length, c.length);
    }
  }

  console.log('🚀 ~ file: auth.js ~ line 15 ~ login ~ csrf', csrf);
	const config = {
    headers: {
      'Accept': '/',
      'Cache-Control': 'no-cache',
			'Content-Type': 'application/json',
      'Cookie': `${csrf}`,
      
    },
    credentials: 'same-origin',
	};
	const body = JSON.stringify(login);
	console.log('🚀 ~ file: auth.js ~ line 22 ~ login ~ login', login);

	try {
		const res = await axios.post(
			`http://localhost:8000/api/token/`,
			body,
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(setAlert('Authenticated successfully', 'success'));
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
		});

		dispatch(setAlert('Error Authenticating', 'error'));
	}
};

export const signup = (register) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify(register);

	try {
		const res = await axios.post(
			'http://localhost:8000/api/accounts/signup',
			body,
			config
		);

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data,
		});

		const { email, password } = register;

		const login = {
			email: `${email}`,
			password: `${password}`,
		};

		dispatch(login(login));
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
		});
		dispatch(setAlert('Error Authenticating', 'error'));
	}
};

export const logout = () => (dispatch) => {
	dispatch(setAlert('logout successful.', 'success'));
	dispatch({ type: LOGOUT });
};

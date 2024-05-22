import axios from 'axios';
import {
    deleteAccessToken,
    deleteRefreshToken,
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from './tokenService';

const baseURL = process.env.REACT_APP_BASE_URL;
const AppApi = axios.create({
    timeout: 120 * 1000, // 2min timeout for all connections
});

// Attach an access token to each request sent to the backend
AppApi.interceptors.request.use(config => {
    config.headers['Authorization'] = `JWT ${getAccessToken()}`;
    return config;
});

// Preprocess HTTP responses
AppApi.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        const originalConfig = err.config;
        if (err.response) {
            // On unauthorized, renew tokens
            if (err.response.status === 401) {
                const userTokens = await renewTokens();

                setAccessToken(userTokens.access);
                setRefreshToken(userTokens.refresh);
                AppApi.defaults.headers.common['Authorization'] = `JWT ${userTokens.access}`;

                return await AppApi(originalConfig);
            }
        }

        return Promise.reject(err);
    }
);

/**
 * Trade the refresh token for a new set of refresh and access
 * tokens.
 *
 * @returns {Object} New refresh and access tokens
 */
async function renewTokens() {
    try {
        let refreshToken = getRefreshToken();
        deleteAccessToken();
        deleteRefreshToken();

        let tokens = await axios.get(baseURL + '/refreshTokens', {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        if (!(tokens.data && tokens.data.tokens)) {
            throw Error('Could not refresh tokens');
        }
        return tokens.data.tokens;
    } catch (error) {
        window.location.reload();
    }
}

export default AppApi;

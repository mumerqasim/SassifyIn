const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
};

const getRefreshToken = () => {
    return sessionStorage.getItem('refreshToken');
};

const setAccessToken = accessToken => {
    if (accessToken.startsWith('JWT ')) {
        accessToken = accessToken.replace('JWT ', '');
    }
    sessionStorage.setItem('accessToken', accessToken);
};

const setRefreshToken = refreshToken => {
    sessionStorage.setItem('refreshToken', refreshToken);
};

const deleteAccessToken = () => {
    sessionStorage.removeItem('accessToken');
};

const deleteRefreshToken = () => {
    sessionStorage.removeItem('refreshToken');
};

export { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, deleteAccessToken, deleteRefreshToken };

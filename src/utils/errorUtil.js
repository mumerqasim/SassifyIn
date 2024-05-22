const clearError = (setError, time) => {
    setTimeout(() => {
        setError('');
    }, time);
};

export default clearError;

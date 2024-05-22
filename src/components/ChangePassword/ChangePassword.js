import React, { useState } from 'react';
import styles from './ChangePassword.module.css';
import AppApi from '../../services/appApi';
import clearError from '../../utils/errorUtil';

function ChangePassword(props) {
    const [currentPassword, setcurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const baseURL = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async e => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            clearError(setError, 3000);
            return;
        }

        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            clearError(setError, 3000);
            return;
        }

        if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword)) {
            setError('New password must contain both uppercase and lowercase letters.');
            clearError(setError, 3000);
            return;
        }

        if (!/\d/.test(newPassword)) {
            setError('New password must contain at least one numeric character.');
            clearError(setError, 3000);
            return;
        }

        try {
            const response = await AppApi.post(baseURL + '/changePassword', {
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                setSuccessMessage('Password changed successfully.');
                clearError(setSuccessMessage, 2000);
                setTimeout(props.logout, 2100);
                setError('');
                setcurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            clearError(setError, 2000);
        }
    };

    return (
        <div className={styles.changePassword}>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setcurrentPassword(e.target.value)}
                    required
                    placeholder="Old Password"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    placeholder="New Password"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm New Password"
                />
                {error && <p className={styles.error}>{error}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
                <button className={styles.changePass} type="submit">
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;

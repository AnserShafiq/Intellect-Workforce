import React, { useEffect, useState } from 'react';
import '../pages.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../firebase.jsx';
import { setDoc, doc, getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const CreateNewUser = () => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernamesActive, setUsernamesActive] = useState([]);
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [newUser, setNewUser] = useState({
        userName: '',
        email: '',
        fullName: '',
        userType: '',
    });

    const fetchData = async () => {
        const activeUserNamesList = await getDocs(collection(firestore, 'AdminUsers'));
        const submissionArray = activeUserNamesList.docs.map(doc => doc.data().userName);
        setUsernamesActive(submissionArray);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const validatePassword = (password) => {
        const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return passwordCriteria.test(password) ;
    };

    const handleUserCreation = async (e) => {
        e.preventDefault();

        if (!usernameAvailable) {
            alert('Username is already taken. Please choose another one.');
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
            );
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, password);
            const user = userCredential.user;
            console.log('New User Got Created!!', user);

            const fireDoc = doc(firestore, 'AdminUsers', user.uid);
            await setDoc(fireDoc, { ...newUser, userType: 'admin' });

            window.location.href = `/${newUser.fullName}`;
        } catch (e) {
            console.error('Error creating user:', e);
        }
    };

    const checkUserNameAvailability = (e) => {
        const userName = e.target.value;
        setNewUser(prev => ({ ...prev, userName }));

        const isAvailable = !usernamesActive.includes(userName);
        setUsernameAvailable(isAvailable);

        if (!isAvailable) {
            console.log('Username is already taken.');
        } else {
            console.log('Username is available.');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    return (
        <div className='page-size wd-100 new-user-section'>
            <h1 className='capatalizedStyle colorRed welcome-head underline-head'>Welcome To Admin Page</h1>
            <div className='loginBox'>
                <h3 className='loginBox-headline'>Register</h3>
                <h3 className='loginbox-usercreation'><Link to='/'>Already Have An Account?</Link></h3>
                <form onSubmit={handleUserCreation}  className='signin-form'>
                    <label className='field-name'>Username</label>
                    <input
                        type='text'
                        value={newUser.userName}
                        onChange={checkUserNameAvailability}
                        className='entry-field'
                        placeholder='Enter username'
                        required
                    />
                    {!usernameAvailable && (
                        <p className='error-message'>Username is already taken. Please choose another one.</p>
                    )}
                    <label className='field-name'>E-Mail</label>
                    <input
                        type='email'
                        value={newUser.email}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                        className='entry-field'
                        placeholder='Enter email'
                        required
                    />
                    <label className='field-name'>Full Name</label>
                    <input
                        type='text'
                        value={newUser.fullName}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, fullName: e.target.value }))}
                        className='entry-field'
                        placeholder='Enter fullname'
                        required
                    />
                    <label className='field-name'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                        className='entry-field'
                        placeholder='Enter password'
                        required
                    />
                    {passwordError && (
                        <p className='error-message'>{passwordError}</p>
                    )}
                    <button type='submit' className='submit-btn' disabled={!usernameAvailable || passwordError}>Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNewUser;

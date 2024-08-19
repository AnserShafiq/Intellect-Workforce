import React, { useState,useEffect } from 'react';
import './pages.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../firebase';

const AdminHome = () => {
    const [usersList, setUsersList] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const fetchData = async () => {
        const activeUserNamesList = await getDocs(collection(firestore, 'AdminUsers'));
        const submissionArray = activeUserNamesList.docs.map(doc => doc.data());
        setUsersList(submissionArray);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // console.log(usersList)

    const handleSignIn = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                // console.log('User signed in:', user.email);
                const dataItem = usersList.find(obj => obj.email === user.email);
                // console.log(dataItem)
                if (dataItem.email === user.email) {
                    localStorage.setItem('userName', dataItem.fullName);
                    navigate(`/${dataItem.fullName}`);
                } else {
                    console.log('No such user found in Firestore!');
                    setError('No such user found in the database.');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing in:', errorCode, errorMessage);
                setError('Incorrect password or email.');
            });
    };

    return (
        <div className='page-size wd-100 login-section'>
            <h1 className='capatalizedStyle colorRed welcome-head underline-head'>Welcome To Admin Portal</h1>
            <div className='loginBox'>
                <h3 className='loginBox-headline'>Let's get log-in</h3>
                <h3 className='loginbox-usercreation'>New User? <Link to='/new-admin-creation'>Create an account</Link></h3>
                <form onSubmit={handleSignIn} className='signin-form'>
                    <label  className='field-name'>Email</label>
                    <input 
                        type='text' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className='entry-field' 
                        placeholder='Enter email' 
                    />

                    <label  className='field-name'>Password</label>
                    <input 
                        type='password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='entry-field' 
                        placeholder='Enter password' 
                    />

                    {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
                    
                    <button type='submit' className='submit-btn'>Log In</button>
                </form>
            </div>
        </div>
    );
};

export default AdminHome;

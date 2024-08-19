import React, { useState, useEffect } from 'react';
import './components.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDocs, collection } from 'firebase/firestore'; 
import { firestore } from '../firebase'; 
import Logo from '../Images/logo.png';
import { Link} from 'react-router-dom';

const Header = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [usersList, setUsersList] = useState([]);
    
    useEffect(() => {
        // Fetch users list on component mount
        const fetchData = async () => {
            try {
                const activeUserNamesList = await getDocs(collection(firestore, 'AdminUsers'));
                const submissionArray = activeUserNamesList.docs.map(doc => doc.data());
                setUsersList(submissionArray);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        
        fetchData();
    }, []); // Empty dependency array to run once on mount

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            if (authUser) {
                const dataItem = usersList.find(obj => obj.email === authUser.email);

                if (dataItem) {
                    setUserLoggedIn(true);
                    setUser({ ...authUser, userName: dataItem.userName }); 
                } else {
                    console.error('No such user found in Firestore!');
                    setUserLoggedIn(false);
                    setUser(null);
                }
            } else {
                setUserLoggedIn(false);
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [usersList]); // Depend on usersList to trigger when it updates

    const handleLogout = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signOut(auth);
            setUserLoggedIn(false);
            setUser(null);
            localStorage.clear();
            window.location.href = '/';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className='headerBody'>
            
              {userLoggedIn ? (
                <div className='login-done'>
                    <div className='logoSection'>
                        <img src={Logo} alt='Intellect Workforce' className='portal-logo' />
                    </div>
                  <div className='menuSection'>
                      <Link to={`/${user?.userName}`}>Home</Link>
                      <Link to={`/cf-entries-list`}>Contact Form</Link>
                      <Link to={`/js-entries-list`}>Job Seekers Form</Link>
                      <Link to={`/emp-entries-list`}>Employers Form</Link>
                      <Link to={`/jobs-listing`}>Job Listings</Link>
                      <Link to= {`/adding-new-job-listing`}>To Add New Job</Link>
                  </div>
                  <div className='logoutSection'>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                  </div>
              ) : (
                <div className='login-display'>
                    <div className='logoSection'>
                        <img src={Logo} alt='Intellect Workforce' className='portal-logo' />
                    </div>
                </div>

              )}
        </div>
    );
}

export default Header;

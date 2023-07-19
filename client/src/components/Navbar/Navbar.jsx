import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import logo from '../../assets/memories.png';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      
      if (decodedToken.exp * 1000 < new Date().getTime()) logout(); 
    }
    
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  const logout = () => {
    dispatch( { type: 'LOGOUT'});
    setUser(null);
    navigate('/');
  }


  return (
    <div className="my-8 mx-32 py-4 px-24 flex items-center justify-between border rounded-lg bg-white">
        <a className='flex items-center justify-center gap-2' href='/'>    
            <h1 className="text-7xl text text-[#00b7ff]">Memories</h1>
            <img className="w-16 h-16" src={logo} alt='memories' />
        </a>

        {user ? (
            <div className='flex items-center justify-between gap-16'>
                <div className='flex items-center justify-between gap-4'>
                {user.result.picture ? 
                <img className='w-10 h-10 rounded-full' src={user.result.picture} alt='user-name' /> :
                <h1 className='border rounded-full bg-black text-white w-10 h-10 flex items-center justify-center font-bold'>
                {user.result.name.charAt(0)}
                </h1>
                }
                <h2>{user.result.name}</h2>
                </div>
                <button className='bg-red-600 text-white py-1 px-2 rounded-sm shadow-lg' onClick={logout}>LOG OUT</button>
            </div>
        ) : (           

            <>
                <button className='bg-blue-700 text-white py-1 px-2 rounded-sm shadow-lg' type='button' onClick={() => navigate("/auth")}>SIGN IN</button>
            </>
      )}
    </div>
  );
};

export default Navbar;

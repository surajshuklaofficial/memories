import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider} from '@react-oauth/google';

import { Navbar, Auth, Home} from "./components";
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <GoogleOAuthProvider clientId='919772698977-04oos83omqtv3sfb162o54ab24o1chhe.apps.googleusercontent.com' >
            <BrowserRouter>

                <Navbar />
                <Routes>
                    <Route path="/posts/search" element={<Home />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/posts" element={<Home />} />
                    <Route path="/auth"  element={ !user? <Auth />: <Navigate to='/posts' />}/>
                    <Route path="/"  element={<Navigate to='/posts' />}/>
                    <Route path="*" element={<div>no match found</div>} />
                </Routes>           

            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;
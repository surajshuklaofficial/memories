import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider} from '@react-oauth/google';

import { Navbar, Auth, Home} from "./components";

const App = () => {
  
    return (
        <GoogleOAuthProvider clientId='919772698977-04oos83omqtv3sfb162o54ab24o1chhe.apps.googleusercontent.com' >
            <BrowserRouter>

                <Navbar />
                <Routes>
                    <Route path="/"  element={<Home />}/>
                    <Route path="/auth"  element={<Auth />}/>
                </Routes>           

            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;
import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Feed from './Components/Feed';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import {AuthProvider} from './Context/AuthContext'
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import Ioa from './Components/Ioa';

function App() {
  return (
    <div className="App">
       <Router>
          <AuthProvider>
          <Routes> 
           <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
           <Route exact element={<PrivateRoute  />}>
            <Route exact path="/" element={<Feed />} />
            </Route>
            <Route exact element={<PrivateRoute  />}>
              <Route exact path="/profile/:id" element={<Profile />} />
            </Route>
           </Routes> 
         </AuthProvider>
        </Router>
    </div>
  )
}


  

export default App;

import './App.css';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import TopRatedScreen from './screens/TopRatedScreen'
import AuthInitialContext from './store/AuthContext';
import {useContext} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

function App() {
  const {token} = useContext(AuthInitialContext)

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/toprated' element={<TopRatedScreen />} />
        <Route path='/auth' element={<AuthScreen />} />
        <Route path='/profile' element={token ? <ProfileScreen /> : <Navigate to="/auth" />} />
      </Routes>
    </div>
  );
}

export default App;

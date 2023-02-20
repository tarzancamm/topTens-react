import './App.css';
import HomeScreen from './components/screens/HomeScreen';
import {Routes, Route, Navigate} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Auth/Login';
import {Toaster} from 'react-hot-toast'
function App() {

  return (
    
    <BrowserRouter>
 <Home/> 
   
    <Toaster/>
    </BrowserRouter>
  );
}

export default App;

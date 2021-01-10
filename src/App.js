import '../src/styles/App.css';
import {selectSignedIn} from './app/features/userSlice'; 
import {useSelector} from 'react-redux'; 
import Blogs from './components/Blogs';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar'; 

function App() {
  const isSignedIn = useSelector(selectSignedIn)
  return (
    <div className="App">
    <Navbar />
    <HomePage />
    {isSignedIn && <Blogs/>}
      
      
    </div>
  );
}

export default App;

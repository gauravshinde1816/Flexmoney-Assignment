
import { Outlet } from 'react-router-dom';
import './App.css';
import Alerts from './components/Alerts';
import Navbar from './components/Navbar';
import homepage from "./assets/home.jpg"

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="row">
        <div className="col-12">
          <img src={homepage} height={100} width={100} className="img-fluid"/>
        </div>
      </div>
      <div className='container'>
        <Outlet />
      </div>

    </div>
  );
}

export default App;

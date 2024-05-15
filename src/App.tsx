
import './App.css';
import reduxLogo from './assets/redux.png';
import mobxLogo from './assets/mobx.png';
import tanstack from './assets/tanstack.png'
import { Link, Outlet } from 'react-router-dom';
function App() {


  return (
    <>
      <div className='sticky top-0 left-0 right-0 z-30 w-full h-24 py-5 px-20 bg-blue-200 flex justify-center space-x-10 shadow-xl'>
      <Link to={'/typescript'} ><img src={tanstack} alt="" className='h-full w-16' /></Link>
        <Link to={'/redux'} ><img src={reduxLogo} alt="" className='h-full w-16' /></Link>
        <Link to={'/mobx'} ><img src={mobxLogo} alt="" className='h-full w-16' /></Link>
      </div>
      <div className='mt-20'>
            <Outlet/>
      </div>
    </>
  );
}

export default App;

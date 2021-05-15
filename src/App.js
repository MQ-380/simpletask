import './App.css';
import Home from './Home/Home'
import Login from './Login/Login';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  let [ login, setLogin ] = useState(false);

  useEffect(()=>{
    if(hasLogin()) {
      setLogin(true);
    }
  }, []);

  function hasLogin() {
    return true;
  }

  return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/">
    //       <Login setLogin={setLogin}/>
    //     </Route>
    //     <Route path="/main">
    //       <Home />
    //     </Route>
    //   </Switch>
    // </BrowserRouter>
    <div className='Home'>
      {!login && <Login setLogin={setLogin}/>}
      {login && <Home user={{userType: 'Admin', name: 'Admin1'}}></Home>}
    </div>
  )
}

export default App;

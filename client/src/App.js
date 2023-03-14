import logo from './logo.svg';
import headerimg from './headerIMG.jpg';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import HomePage from './Housing/HomePage';
import { Button } from 'antd';
import ApplicationPage from './Housing/ApplicationPage';

function App() {
  return (
    <div className="App">
      <div className='imgContainer'>
          <div id='txtContainer'>
            <h1>US House market</h1>
            <p>More than 7500 house available, +680 seller</p>
            <p id='details'>More than 7500 house available, +680 seller<br />
               More than 7500 house available, +680 seller More than 7500 house available, +680 seller</p>
               <Button type='primary' size='large'>Learn more</Button>
          </div>
          <img src={headerimg} />
      </div>
      <header className="App-header">
         <Router>
             <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route exact path='/:houseID' component={ApplicationPage}/>
             </Switch>
         </Router>
      </header>
    </div>
  );
}

export default App;


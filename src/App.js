import React, { Component } from 'react';
import logo from './logo.jpg';
import rlogo from'./logo.svg';
import jace from './jace.jpg';
import tezz from './tezz.jpg';
import './App.css';
import  Cards  from './components/Cards';
class App extends Component {
  

  render() {

    return (
      <React.Fragment>
          <div className="App">
            <h1 className="title2">React Magic</h1>
            <img src={jace} className="flavorImg" alt=""/>
            <img src={logo} className="logo" alt=""/>
            <img src={rlogo} className="logo" alt=""/>
            <img src={tezz} className="flavorImg" alt=""/>
            <Cards/>
            <div><h6>&copy;Nicholas Presler 2018</h6></div>
        </div>
        
      </React.Fragment>
    );
  }
}

export default App;

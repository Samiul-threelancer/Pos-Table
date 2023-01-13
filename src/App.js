import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router , Route, Link} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { Input  } from 'semantic-ui-react'
import Login from './components/Login';
import Update from './components/Update';
import Accordion from './components/Accordion';
import { PosTable } from './components/PosTable';
import Test from './components/testonly/Test';




function App() {

  return (

    <Router> 
    
      <div className="App">
        <header className="App-header1">
          {/* <p className='para h1 pt-5 '> Welcome </p> */}
            <div className=''>
              <div class="ui secondary menu parent-div">
              <Link to='/' className='navbar item'>
                Login
              </Link>

              <Link to='/home' className=' navbar item '>
              Home 
              </Link>
              <Link to='/about' className='navbar item '>
              About 
              </Link>
              <Link to='/products' className=' navbar item'>
              Product
              </Link>                
                <div class="right menu">
                  <div class=" item">
                    <div class="ui icon input">
                      <Input type="text" placeholder="Search..." />
                      <i class="search link icon"></i>
                </div>
            </div>
            <Link to='/logout' className=' navbar item'>
              Logout
              </Link>
          </div>
        </div>
          </div>
          
          
       
          <Route exact path='/home' component={Home} />
          <Route exact path='/about' component={About}/>
          <Route exact path='/postable' component={PosTable}/>
          {/* <Route exact path='/update' component={Update}/> */}
          <Route exact path={`/update/:id`} component={Update}/>
          <Route exact path='/' component={Login}/>
          <Route exact path ='/Accordion' component={Accordion} />
          <Route exact path ='/test' component={Test} />
        </header>
      </div>
   
    </Router> 
  );
}

export default App;

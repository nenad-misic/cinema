import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Movies from './Movies/Movies';
import Movie from './Movies/Movie/Movie';
import WatchMovie from './Movies/WatchMovie/WatchMovie';
import Shows from './Shows/Shows';
import Show from './Shows/Show/Show';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        inputValue: ''
      };
    }

  render() {
    return (
      <div className="App">
        <div>
        <NavBar></NavBar>
        <Route exact path='/' component={Movies}/>
        <Route exact path='/cinema' component={Movies}/>
        <Route exact path='/movies' component={Movies}/>
        <Route exact path='/shows' component={Shows}/>
        <Route exact path='/movie/:movieId' component={Movie}/>
        <Route exact path='/show/:showTitle' component={Show}/>
        <Route exact path='/watch-movie/:movieId' component={WatchMovie}/>
        </div>
      </div>
    );
  }
}

export default App;
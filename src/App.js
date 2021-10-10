import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Movies from './Movies/Movies';
import Movie from './Movies/Movie/Movie';
import WatchMovie from './Movies/WatchMovie/WatchMovie';
import Shows from './Shows/Shows';
import Show from './Shows/Show/Show';
import Suggestions from './Suggestions/Suggestions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <Route exact path='/cinema/' component={Suggestions}/>
        <Route exact path='/cinema/cinema' component={Suggestions}/>
        <Route exact path='/cinema/movies' component={Movies}/>
        <Route exact path='/cinema/shows' component={Shows}/>
        <Route exact path='/cinema/movie/:movieId' component={Movie}/>
        <Route exact path='/cinema/show/:showTitle' component={Show}/>
        <Route exact path='/cinema/watch-movie/:movieId' component={WatchMovie}/>
      </div>
    );
  }
}

export default App;
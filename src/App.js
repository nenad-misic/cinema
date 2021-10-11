import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Movies from './Movies/Movies';
import Movie from './Movies/Movie/Movie';
import WatchMovie from './Movies/WatchMovie/WatchMovie';
import Shows from './Shows/Shows';
import Show from './Shows/Show/Show';
import Suggestions from './Suggestions/Suggestions';

import { aiap } from './Environment/environment';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        inputValue: ''
      };
    }

  updateInputValue = (evt) => {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post(`${aiap}user`, {'name': this.state.inputValue}).then((res) => {
      let uid = res.data['User ID'];
      localStorage.setItem('user_id', uid);
      this.setState({'inputValue': ''})
    })
  }

  render() {
    return (
      <div className="App">

        {localStorage.getItem('user_id')?(
        <div>
        <NavBar></NavBar>
        <Route exact path='/' component={Suggestions}/>
        <Route exact path='/cinema' component={Suggestions}/>
        <Route exact path='/movies' component={Movies}/>
        <Route exact path='/shows' component={Shows}/>
        <Route exact path='/movie/:movieId' component={Movie}/>
        <Route exact path='/show/:showTitle' component={Show}/>
        <Route exact path='/watch-movie/:movieId' component={WatchMovie}/>
        </div>):(
        <div className="wholescreenoverlay">
          <table className="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1 mt-5">
            <tr>
              <td align="center" valign="middle">
              <form onSubmit={this.onSubmit}>
                <div className="form-group col-12">
                  <h1 className="text-primary my-5">Welcome to Cinema</h1>
                  <h2 className="text-light mt-5 mb-4">What's your name?</h2>
                  <input type="text" className="form-control bg-primary text-light" value={this.state.inputValue} onChange={this.updateInputValue}/>
                  <div className="my-5">
                    <button type="submit" className="btn btn-primary border">Submit</button>
                  </div>
                </div>
              </form>
              </td>
            </tr>
          </table>
        </div>)}
      </div>
    );
  }
}

export default App;
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { aiap, api } from '../Environment/environment';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
        movies: [],
    };
  }

  async componentDidMount() {
    let x = (await axios.post(`${aiap}recommendations`, {'user_id': localStorage.getItem('user_id')})).data;
    console.log(x);
    const movies = (await axios.get(`${api}list_movies.json?sort_by=rating&with_images=true&limit=20&page=0`)).data.data.movies

    this.setState({
        movies: movies,
    });
  }

  render() {
    return (
      <div className="container-fluid">
          <h1 className="col-10 offset-1 my-5">
              Suggestions:
          </h1>
          
          <div className="row">
          {
              this.state.movies && this.state.movies.map(e => (
            <div key={e.id} className="col-6 col-lg-3 my-5">
            <Link to={`/movie/${e.id}`}>
              <div className="hover hover-2 text-white rounded">
                <img src={e.background_image_original} alt=""/>
                <div className="hover-overlay"></div>
                <div className="hover-2-content p-5">
                  <h3 className="hover-2-title text-uppercase font-weight-bold mb-0">{e.title_long}</h3>
                  <p className="hover-2-description mb-0">{e.description_full}</p>
                </div>
              </div>
            </Link>
            </div>
          ))
          }
          </div>
      </div>
      )
    }
}
export default Suggestions;
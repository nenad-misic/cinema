import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { aiap, api } from '../Environment/environment';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.name_map = [
      'Surprise model recommendations',
      'Keras model recommendations',
      'Content based recommendations',
      'Top rated movies'
    ]
    this.state = {
        movies: [],
    };
  }

  async componentDidMount() {
    let content_similar_promises = []
    let surprise_similar_promises = []
    let keras_similar_promises = []
    let suggestions = []
    let {content_similar,surprise_similar,keras_similar} = (await axios.post(`${aiap}recommendations`, {'user_id': localStorage.getItem('user_id')})).data;
    
    for (let movie of content_similar) {
      content_similar_promises.push(axios.get(`${api}list_movies.json`, {
        params: {
          limit: 1,
          query_term: movie
        }
      }))
    }
    for (let movie of surprise_similar) {
      surprise_similar_promises.push(axios.get(`${api}list_movies.json`, {
        params: {
          limit: 1,
          query_term: movie
        }
      }))
    }
    for (let movie of keras_similar) {
      keras_similar_promises.push(axios.get(`${api}list_movies.json`, {
        params: {
          limit: 1,
          query_term: movie
        }
      }))
    }

    let all_promises = [
      Promise.all(content_similar_promises),
      Promise.all(surprise_similar_promises),
      Promise.all(keras_similar_promises),
      Promise.all([axios.get(`${api}list_movies.json?sort_by=rating&with_images=true&limit=20&page=0`)]),
    ]

    let results = await Promise.all(all_promises);
    debugger;
    for (let i = 0; i < results.length; i++) {
      let current_list = []
      for (let result of results[i]) {
        if (result.data.data.movie_count == 0 | !result.data.data.movies) {
          continue;
        }
        for (let movie of result.data.data.movies){
          current_list.push(movie);
        }
      }
      suggestions.push(current_list);
    }

    this.setState({
        movies: [
          suggestions[1],
          suggestions[2],
          suggestions[0],
          suggestions[3],
        ],
    });
  }

  render() {
    return (
      <div className="container-fluid">
        
          {this.state.movies && this.state.movies.map((x, i) => (
              <div>
                <h1 className="col-10 offset-1 my-5">
                    {this.name_map[i]}:
                </h1>
                
                <div className="row">
                {
                  x && x.map(e => (
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
          ))}
          
      </div>
      )
    }
}
export default Suggestions;
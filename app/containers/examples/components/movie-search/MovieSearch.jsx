import React, { Component } from 'react';


const Movie = props => {
    return (
        <div className="card col-md-3">
            <div className="card-header">{props.title}</div>
            <div className="card-body text-primary">
                <img className='card-img-top' src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${props.poster_path}`} />
                <h5 className="card-title">Relese date: {props.release_date}</h5>
                <p className="card-text">{props.overview.slice(0, 20)}</p>
            </div>
        </div>
    )
};

const Movies = props => (
    <div className="row">
        {props.movies.map(movie => (
            <Movie key={movie.id} {...movie} />
        ))}
    </div>
);

const Search = props => (
    <form className="col-md-3" onInput={event => props.onInput(event.target.value)}>
        <div className='form-group'>
            <div className="input-group">
                <input className='form-control' type="text" id='search' value={props.query} placeholder={props.placeholder} />
                <div className="input-group-prepend">
                    <span className="input-group-text" id="search">
                        <i className='fa fa-search'></i>
                    </span>
                </div>
            </div>
        </div>
    </form>
);

class MovieSearch extends Component {
    state = {
        movies: [],
        query: ''
    };

    onInput = (query) => {
        this.setState({
            query
        });

        this.searchMovie(query);
    }

    getPopularMovies = () => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data.results
                })
            });
    }

    searchMovie = query => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=cfe422613b250f702980a3bbf9e90716`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data.results
                })
            });
    }

    componentDidMount() {
        this.getPopularMovies();
    }

    render() {
        const { movies, query } = this.state;
        const isSearched = query => item => !query || item.title.toLowerCase().includes(query.toLowerCase());

        return (
            <div className='container'>
                <Search query={query} onInput={this.onInput} placeholder="Search for Movie Title …" />
                <Movies movies={movies.filter(isSearched(query))} />
            </div>
        );
    }
}

export { MovieSearch };

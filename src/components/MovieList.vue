<template>
    <div id="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies"
                        v-bind:movie="movie.movie">
                <sessions v-bind:sessions="movie.sessions"
                          v-bind:day="day"
                          v-bind:time="time"
                          v-bind:moviePassesTimeFilter="moviePassesTimeFilter">
                </sessions>
            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            {{ noResults }}
        </div>
        <div v-else class="no-results">
            Loading...
        </div>
    </div>
</template>
<script>
    import MovieItem from './MovieItem.vue';
    import times from '../util/times.js';
    import Sessions from "./Sessions.vue";

    export default {
        props: ['genre', 'time', 'movies', 'day'],
        methods: {
            moviePassesGenreFilter(movie) {
                if(!this.genre.length) {
                    return true;
                }else {
                    let movieGenre = movie.movie.Genre.split(", ");
                    let matched = true;
                    this.genre.forEach(genre => {
                        if(movieGenre.indexOf(genre) === -1) {
                            matched = false;
                        }
                    });
                    return matched;
                }
            },
            moviePassesTimeFilter(session) {
                if(!this.day.isSame(this.$moment(session.time), 'day')) {
                    return false;
                } else if(this.time.length === 0 || this.time.length === 2) {
                    return true;
                } else if(this.time[0] === times.AFTER_6PM) {
                    return this.$moment(session.time).hour() >= 18;
                } else {
                    return this.$moment(session.time).hour() < 18;
                }
            }
        },
        computed: {
            filteredMovies() {
                return this.movies
                    .filter(this.moviePassesGenreFilter)
                    .filter(movie => movie.sessions.find(this.moviePassesTimeFilter));
            },
            noResults() {
                let times = this.time.join(", ");
                let genres = this.genre.join(", ");;
                return `No results for ${genres}${times.length ? ' ' : ''}${times}.`;
            }
        },
        components: {
            Sessions,
            MovieItem,
        },
    }
</script>
import Vue from 'vue';
import './style.scss';
import VueResource from 'vue-resource';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';
Vue.use(VueResource);

new Vue({
   el: '#app',
    data: {
       genre: [],
       time: [],
       movies: [],
    },
    methods: {
       checkFilter(category, title, checked) {
           if(checked) {
               this[category].push(title);
           } else {
               let index = this[category].indexOf(title);
               if(index > -1) {
                   this[category].splice(index, 1);
               }
           }
       },
    },
   components: {
       MovieList,
       MovieFilter,
   },
    created() {
       this.$http.get('/api').then(response => {
           this.movies = response.data;
           console.log(this.movies)
       });
    }
});

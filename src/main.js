import Vue from 'vue';
import './style.scss';
import VueResource from 'vue-resource';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';
import moment from 'moment-timezone';

Vue.use(VueResource);

moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { value: bus });

new Vue({
   el: '#app',
    data: {
       genre: [],
       time: [],
       movies: [],
        moment,
        day: moment(),
        bus,
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
       });
       this.$bus.$on('check-filter', this.checkFilter);
    },
});

import Vue from 'vue';
import './style.scss';
import VueResource from 'vue-resource';
import moment from 'moment-timezone';

import OverView from './components/OverView.vue';

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
       OverView,
   },
    created() {
       this.$http.get('/api').then(response => {
           this.movies = response.data;
       });
       this.$bus.$on('check-filter', this.checkFilter);
    },
});

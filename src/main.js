import Vue from 'vue';
import VueResource from 'vue-resource';
import moment from 'moment-timezone';
import VueRouter from 'vue-router';

import './style.scss';
import OverView from './components/OverView.vue';
import Detail from './components/Detail.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { value: bus });

const router = new VueRouter({
    routes: [
        {path: '/', component: OverView, name: 'home'},
        {path: '/movie/:id', component: Detail, name: 'movie'},
        {path: '*', redirect: {name: 'home'}},
    ],
});

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
    created() {
       this.$http.get('/api').then(response => {
           this.movies = response.data;
       });
       this.$bus.$on('check-filter', this.checkFilter);
       this.$bus.$on('set-day', (day) => {this.day = day});
    },
    router,
});

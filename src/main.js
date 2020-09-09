// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueRouter from 'vue-router';
import App from './App.vue';
import CreateBudget from './components/CreateBudget.vue';
import BudgetDetails from './components/BudgetDetails.vue';

Vue.use(VueRouter);
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);


const routes = [
  {
        name: 'CreateBudget',
        path: '/',
        component: CreateBudget
    },
    {
    	name: 'BudgetDetails',
    	path: '/budget',
    	component: BudgetDetails
    }
];

const router = new VueRouter({ mode: 'history', routes: routes});
new Vue(Vue.util.extend({ router }, App)).$mount('#app');

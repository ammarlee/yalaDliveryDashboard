import Vue from 'vue';
import VueRouter from 'vue-router';

import SharedRoutes from '../features/shared/shared-routes'
import LandShippingRoutes from '../features/LandShipping/land-shipping-routes'
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    
    redirect:'/shipping/resturant/'
},
  ...SharedRoutes,
  ...LandShippingRoutes,

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
 
  routes,
});

export default router;

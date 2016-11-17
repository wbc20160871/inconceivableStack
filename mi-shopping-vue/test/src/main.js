import Main from './Main.vue';
import Cart from './Cart.vue';
import Classify from './Classify.vue';
import Home from './Home.vue'

Vue.use(VueRouter);

var router = new VueRouter({
	routes: [{
		path:'/home', component: Home
	}{
		path:'/classify', component:Classify
	}{
		path:'/cart'
	}]
})

new Vue({
  el: '#app',
  render: h => h(App)
})

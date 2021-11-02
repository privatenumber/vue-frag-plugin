import Vue from 'vue';
import MultiRootComponent from './FragmentTest.vue';

new Vue({
	el: '#app',
	render: h => h(MultiRootComponent),
}).$mount();

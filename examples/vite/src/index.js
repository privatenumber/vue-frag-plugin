import Vue from 'vue';
import MultiRootComponent from './FragmentTest.vue';

const app = new Vue({
	render: h => h(MultiRootComponent),
});

app.$mount('#app');

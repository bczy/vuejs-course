/** @format */
Vue.filter('currency', (value) => `${Number.parseFloat(value).toFixed(2)} $`);

const data = {
	maxPrice: undefined,
	site: {
		name: 'My winter shop',
		description: 'You will not be freezing',
		logo: 'assets/img/logo_site_winter_market.jpeg',
	},
	products: [
		{
			name: 'Bamboo Thermal Ski Coat',
			description: 'You will not be freezing',
			image: 'assets/img/coat1.jpg',
			price: 99,
		},
		{
			name: 'Goose Thermal Ski Coat',
			description: 'Ducky as hell',
			image: 'assets/img/coat2.jpg',
			price: 99.9,
		},
		{
			name: 'Panda Ski Coat',
			description: 'Expensive & not cool',
			image: 'assets/img/coat3.jpg',
			price: 999,
		},
	],
	cart: [],
};
var app = new Vue({
	el: '#app',
	data,
	methods: {
		addItem: function (product) {
			this.cart.push(product);
		},
		beforeEnter: function (el) {
			el.className = 'd-none';
		},
		enter: function (el) {
			const delay = el.dataset.index * 100;
			setTimeout(() => (el.className = 'animated fadeInRight'));
		},
		leave: function (el) {
			el.className = 'animated fadeOutRight';
		},
	},
	computed: {
		getCartText() {
			const nbCartItem = this.cart.length;
			if (nbCartItem === 0) {
				return 'Empty';
			} else if (nbCartItem === 1) {
				return `${nbCartItem} item`;
			}
			return `${nbCartItem} items`;
		},
	},

	mounted: function () {
		fetch('https://hplussport.com/api/products/order/price')
			.then((res) => res.json())
			.then(
				(data) =>
					(this.products = [...this.products, ...data].sort(
						(a, b) => b.price - a.price
					))
			);
	},
});

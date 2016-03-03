(function (window) {
	'use strict';
	// todoheader 模板
	var TodoHeader = Vue.extend({
		data: function() {
			return {
				newtext: "",
			}
		},
		template: '<header class="header">\
			<h1>{{ message }} todos</h1>\
			<input @keyup.enter="inputkeyuphandler" v-model="newtext" class="new-todo" placeholder="What needs to be done?" autofocus>\
		</header>',
		methods: {
			inputkeyuphandler: function() {
				this.$dispatch("add-todo", this.newtext);
				this.newtext = "";
			}
		}
	})
	// todoitem 模板
	var TodoItem = Vue.extend({
		props: ["$index", "item", "alertme"],
		template: '<li :class="{completed: item.state}">\
			<div class="view">\
				<input @click="clickme" class="toggle" type="checkbox" v-model="item.state">\
				<label>{{item.text}}</label>\
				<button class="destroy"></button>\
			</div>\
			<input class="edit" value="Create a TodoMVC template">\
		</li>',
		methods: {
			clickme: function() {
				this.alertme(this.$index)
			}
		},
		beforeCompile: function() {
		}
	})
	// todomain 模板
	var TodoMain = Vue.extend({
		props: ["todolists", "alertme"],
		template: '<section class="main">\
			<input class="toggle-all" type="checkbox">\
			<label for="toggle-all">Mark all as complete</label>\
			<ul class="todo-list">\
				<todo-item\
					v-for="item in todolists"\
					:$index="$index"\
					:item="item"\
					:alertme="alertme">\
				</todo-item>\
			</ul>\
		</section>',
		beforeCompile: function() {
		}
	})
	// todofooter 模板
	var TodoFooter = Vue.extend({
		props: ["active"],
		template: '<footer class="footer">\
			<span class="todo-count"><strong>{{active}}</strong> item left</span>\
			<ul class="filters">\
				<li>\
					<a class="selected" href="#/">All</a>\
				</li>\
				<li>\
					<a href="#/active">Active</a>\
				</li>\
				<li>\
					<a href="#/completed">Completed</a>\
				</li>\
			</ul>\
			<button class="clear-completed">Clear completed</button>\
		</footer>',
		beforeCompile: function() {
		}
	})
	var TodoApp = Vue.extend({
		props: ["todolists", "alertme", "active"],
		template: '<section class="todoapp">\
			<todo-header></todo-header>\
			<todo-main\
				:todolists="todolists"\
				:alertme="alertme">\
			</todo-main>\
			<todo-footer :active="active"></todo-footer>\
		</section>',
		beforeCompile: function() {
		}
	})
	// 注册组件
	Vue.component("todo-app", TodoApp);
	Vue.component("todo-header", TodoHeader);
	Vue.component("todo-main", TodoMain);
	Vue.component("todo-item", TodoItem);
	Vue.component("todo-footer", TodoFooter);

	var model = {
		todolists: [
			{key: 1, text: "hello galen", state: true},
			{key: 2, text: "hello world", state: false}
		],
		key: 2,
	}
	var KEYCODEENTER = 13;
	new Vue({
		el: "#app",
		data: model,
		computed: {
			active: function() {
				var total = _.filter(this.todolists, function(item) {
					return item.state === false
				})
				return total.length;
			},
			all: function() {
				return this.todolists.length;
			},
			completed: function() {
				var total = _.filter(this.todolists, function(item) {
					return item.state === true;
				})
				return total.length;
			}
		},
		methods: {
			alertme: function(index) {
				console.log(this.todolists)
			}
		},
		events: {
			"add-todo": function(newtext) {
				console.log(newtext);
				this.key ++;
				var newTodo = {key: this.key, text: newtext, state: false};
				this.$set("todolists", this.todolists.concat(newTodo));
			},
		},
		beforeCompile: function() {
		}
	})

})(window);

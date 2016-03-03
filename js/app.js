(function (window) {
	'use strict';
	// todoheader 模板
	var TodoHeader = Vue.extend({
		template: '<header class="header">\
			<h1>{{ message }} todos</h1>\
			<input class="new-todo" placeholder="What needs to be done?" autofocus>\
		</header>'
	})
	// todoitem 模板
	var TodoItem = Vue.extend({
		props: ["item"],
		template: '<li class="completed">\
			<div class="view">\
				<input class="toggle" type="checkbox" checked>\
				<label>{{item.text}}</label>\
				<button class="destroy"></button>\
			</div>\
			<input class="edit" value="Create a TodoMVC template">\
		</li>',
		beforeCompile: function() {
			console.log(this.item)
		}
	})
	// todomain 模板
	var TodoMain = Vue.extend({
		props: ["todo-lists"],
		template: '<section class="main">\
			<input class="toggle-all" type="checkbox">\
			<label for="toggle-all">Mark all as complete</label>\
			<ul class="todo-list">\
				<todo-item v-for="item in todo-lists" :index="$index" :item="item"></todo-item>\
			</ul>\
		</section>',

	})
	// todofooter 模板
	var TodoFooter = Vue.extend({
		template: '<footer class="footer">\
			<span class="todo-count"><strong>0</strong> item left</span>\
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
		</footer>'
	})
	var TodoApp = Vue.extend({
		template: '<section class="todoapp">\
			<todo-header></todo-header>\
			<todo-main :todo-lists="todoLists"></todo-main>\
			<todo-footer></todo-footer>\
		</section>'
	})
	// 注册组件
	Vue.component("todo-app", TodoApp);
	Vue.component("todo-header", TodoHeader);
	Vue.component("todo-main", TodoMain);
	Vue.component("todo-item", TodoItem);
	Vue.component("todo-footer", TodoFooter);

	var model = {
		todoLists: [
			{key: 1, text: "hello galen", state: true},
			{key: 2, text: "hello world", state: false}
		]
	}
	new Vue({
		el: "#app",
		data: model,
	})

})(window);

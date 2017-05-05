

var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
};

var list = store.fetch("tang-new-class");

var filter = {
	all: function(list){
		return list;
	},
	finished: function(list){
		return list.filter(function(item){
			return item.isChecked;
		})
	},
	unfinished: function(list){
		return list.filter(function(item){
			return !item.isChecked;
		})
	}
};

var vm = new Vue({
	el: '.main',
	data: {
		list: list,
		todo: "",
		edtorTodos: '',		//记录正在编辑的数据
		beforeTitle: '',	//记录正在编辑的数据的title
		visibility: "all"	//通过这个属性值的变化对数据进行筛选
	},
	watch: {				//监控某项属性的变化
		list: {
			handler: function(){	//监控List这个属性，当这个属性对应的值发生变化就会执行函数
				store.save("tang-new-class",this.list);
			},
			deep:true
		}
	},
	methods: {				//事件
		addTodo(){		//添加任务
			//事件函数中的this指向的是，当前这个根实例
			this.list.push({
				title: this.todo,
				isChecked: false
			})
			this.todo = '';
		},
		deleteTodo(todo){	//删除任务
			var index = this.list.indexOf(todo);
			this.list.splice(index,1)
		},
		edtorTodo(todo){	//编辑任务
			this.beforeTitle = todo.title;
			this.edtorTodos = todo;
		},
		edtorTodoed(){		//编辑任务成功
			this.edtorTodos = '';
		},
		cancelTodo(todo){	//取消编辑
			todo.title = this.beforeTitle;
			this.edtorTodos = '';
		}
	},
	directives: {			//自定义指令
		"focus": {
			update(el,binding){
				if(binding.value==true){
					el.focus();
				}
			}
		}
	},
	computed: {				//计算数据
		noCheckedLength(){
			return this.list.filter(function(item){
                        return !item.isChecked
                    }).length;
		},
		filteredList: function(){
			//找到了过滤函数，就返回过滤后的数据，如果没有找到，就返回所有
			return filter[this.visibility]? filter[this.visibility](this.list): list;
		}
	}
});
function watchHashChange(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
};
watchHashChange();
window.addEventListener("hashchange",watchHashChange);
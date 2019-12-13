(function () {
    'use strict';

    var vm = new Vue({
        el: '#app',
        data: {
            selectedMember: "",
            newItem: '',
            // 担当者ID
            memberId: null,
            todos: [{
                id: 1,
                title: '人事評価',
                detail: "給与の査定",
                member_id: 1,
                isDone: false
            }, {
                id: 2,
                title: '面接',
                detail: "田中さん",
                member_id: 1,
                isDone: false

            }, {
                id: 3,
                title: '資料整理',
                detail: "決算",
                member_id: 2,
                isDone: false
            }
            ],
            members: [
                { id: 1, name: "部長" },
                { id: 2, name: "課長" },
                { id: 3, name: "主任" },
                { id: 4, name: "係長" }
            ]
        },

        watch: {
            // todos: function() {
            //     localStorage.setItem('todos', JSON.stringify(this.todos));
            //     alert('saved');
            // }

            todos: {
                handler: function () {
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                    // alert('Data saved');
                },
                deep: true
            }

        },
        methods: {
            addItem: function () {
                var item = {
                    title: this.newItem,
                    isDone: false,
                    member_id: 2,
                }
                this.todos.push(item);
                this.newItem = "";
                // console.log(this.todos);
                
            },
            changePerson: function(index) {
                var item = {
                    id: 3,
                    title: '担当者を変更',
                    detail: "決算",
                    member_id: this.memberId,
                    isDone: false
                }
                // 該当タスクID
                let latestTaskId = this.todos[index].id;

                // idが一致するtodo情報を取得
                let selectedTodo = this.todos.find((todo) => todo.id == latestTaskId);

                // 未選択時を除外
                if (this.selectedMember){
                    // 更新担当者IDを取得
                    let updateMemberId = this.members.find((member) => member.name == this.selectedMember).id;
                    selectedTodo.member_id = updateMemberId;
                };
            },
            deleteItem: function (index) {
                if (confirm('are you sure?')) {
                    this.todos.splice(index, 1);
                }
            },
            purge: function () {
                if (!confirm('delete finished?')) {
                    return;
                }
                this.todos = this.remaining;
            }
        },
        computed: {
            remaining: function () {
                return this.todos.filter(function (todo) {
                    return !todo.isDone;
                });
            }
        }
    });
})();
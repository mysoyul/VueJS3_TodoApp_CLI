import http from "@/store/common/http-common"
import axios from "axios"

export const moduleTodo = {
    namespaced: true,
    state: () => ({
        todoItems: []
    }),
    actions: {
        loadTodoItems({ commit }) {
            http
                .get('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.log(error?.response?.status + ' : ' + error?.message)
                    } else {
                        console.error(error);
                    }
                })
        }, //loadTodoItems
        removeTodo({ commit }, payload) {
            http
                .delete(`/todos/${payload.id}`)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        }, //removeTodo
        addTodo({ commit }, payload) {
            http
                .post(`/todos`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        },
        toggleTodo({ commit }, payload) {
            http
                .patch(`/todos/${payload.id}`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.log(error?.response?.status + ' : ' + error?.message)
                    } else {
                        console.error(error);
                    }
                })
        },
        clearTodo({ commit }) {
            http
                .delete('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        },
    },
    mutations: {
        setTodoItems(state, items) {
            state.todoItems = items;
        },
        addTodo(state, todoItem) {
            const obj = { completed: false, item: todoItem };
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeTodo(state, payload) {
            const { todoItem: { item }, index } = payload
            localStorage.removeItem(item);
            state.todoItems.splice(index, 1);
        },
        toggleTodo(state, payload) {
            const { todoItem: { item, completed }, index } = payload
            state.todoItems[index].completed = !completed
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
        },
        clearTodo(state) {
            localStorage.clear()
            state.todoItems = []
        }
    },
}
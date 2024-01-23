import { createStore, createLogger } from "vuex"
import http from "./common/http-common"
import axios from "axios"

// const storage = {
//     fetch() {
//         const arr = [];
//         if (localStorage.length > 0) {
//             for (let i = 0; i < localStorage.length; i++) {
//                 const itemJson = localStorage.getItem(localStorage.key(i))
//                 if (itemJson) {
//                     arr.push(JSON.parse(itemJson))
//                 }
//             }
//         }
//         return arr;
//     }
// }

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    state: {
        todoItems: []
    },
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
                .put(`/todos/${payload.id}`, payload)
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


})
<template>
    <div class="list row">
        <div class="col-md-12">
            <h1 class="text-center">Posts</h1>
                <h3 v-if="loadingStatus" class="text-center">Loading...</h3>
                <div v-else>
                    <ul class="list-group">
                        <li v-for="post in posts" :key="post.id" class="list-group-item">
                            <router-link :to="{ name: 'post', params: { id: post.id } }" class="link-primary">
                                [ID: {{ post.id }}] {{ post.title }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
</template>

<script setup>
import { useStore } from "vuex"
import { onBeforeMount, computed } from "vue"

const store = useStore()

const posts = computed(() => store.state.modulePost.posts)
const loadingStatus = computed(() => store.state.modulePost.loadingStatus)

// onBeforeMount(() => {
//     fetchData();
// });
onBeforeMount(async () => {
    try {
        await fetchData();
    } catch (error) {
        console.log(error)
    } 
});

const fetchData = () => {
    store.dispatch("modulePost/loadPosts")
};

</script>
<style scoped>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}

a {
    padding-right: 30px;
    text-decoration: none;
}

a:hover {
    background-color: #98d8de;
    padding: 2px;
}
</style>
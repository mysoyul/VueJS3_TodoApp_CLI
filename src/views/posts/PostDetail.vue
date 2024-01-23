<template>
    <div>
        <div v-if="post" class="row mt-4">
            <h4 class="text-center">View Post</h4>
            <div class="mx-auto" style="width: 500px;">
                <h5>[ID: {{ post.id }}]</h5>
                <div><label><strong>Email:</strong></label> {{ post.email }}</div>
                <div><label><strong>Title:</strong></label> {{ post.title }}</div>
            </div>
            <div class="mt-4 text-center">
                <button class="btn btn-danger" v-on:click="removePost(post.id)">Delete</button>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { onBeforeMount, computed, watch } from "vue";
  import { useRouter, useRoute } from "vue-router"
  import { useStore } from "vuex"
  
  const router = useRouter();
  const route = useRoute();
  const store = useStore();
  
  const post = computed(() => store.state.modulePost.post);
  
  onBeforeMount(() => {
    fetchData();
  });
  
  const removePost = (id) => {
    store.dispatch("modulePost/removePost", id);
    router.push("/posts");
  };
  const fetchData = () => {
    if(route.params.id) {
      store.dispatch("modulePost/loadPost", { id: +route.params.id })
    }
  };
  
  watch(() => route.params.id, fetchData)
  
  </script>
  <style scoped>
  button {
    margin: 1rem 0;
  }
  </style>  
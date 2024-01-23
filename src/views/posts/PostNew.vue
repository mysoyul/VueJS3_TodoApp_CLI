<template>
    <div class="row mt-4">
        <h4 class="text-center">New Post</h4>
        <form @submit="onSubmit">
            <div class="form-group">
                <label><strong>Email : </strong></label>
                <input type="email" v-model="email" v-bind="emailAttrs" class="form-control" />
                <div v-show="errors.email" class="alert alert-danger">{{ errors.email }}</div>
            </div>
            <div class="form-group">
                <label><strong>Title : </strong></label>
                <input type="text" v-model="title" v-bind="titleAttrs" class="form-control" />
                <div v-show="errors.title" class="alert alert-danger">{{ errors.title }}</div>
            </div>
            <div class="mt-4 text-center">
                <button class="btn btn-success">Save</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { useForm } from 'vee-validate';
import * as yup from 'yup'

const store = useStore()
const router = useRouter()

const {  defineField, handleSubmit, errors } = useForm({
    validationSchema: yup.object({
        email: yup.string().email().required(),
        title: yup.string().required(),
    }),
});

const [email, emailAttrs] = defineField('email');
const [title, titleAttrs] = defineField('title');

const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
    store.dispatch('modulePost/addPost', values).then(() => {
        router.push('/posts');
    });
});

</script>
<style scoped>
input {
    margin: 1rem 0;
}
</style>
<script setup>
    import {ref, onMounted} from 'vue';
    import TodoList from "./components/TodoList.vue";
</script>

<template>
    <main>
        <div class="container">
            <TodoList></TodoList> 
        </div>
    </main>
</template>

<style scoped lang="scss">
    .container{
        width: 100%;
        max-width: 1440px;
        padding: 50px 130px;
        @media (max-width: 1280px){
            padding: 30px 20px;
        }
    }
</style>

<script setup>
    import {ref} from 'vue';
    const props = defineProps({
        disabled: Boolean,
        require: Boolean,
        name: {
            type: String,
            default: ''
        },
    });
    const text = defineModel()

    const disabled = ref(props.disabled);
    const require = ref(props.require);
    const error = ref('');
</script>

<template>
    <div class = "textarea">
        <span class = "textarea__name">{{ name }}</span>
        <textarea name="" id="" :required = require class = "textarea__field" v-model="text"></textarea>
        <span class="textarea__error">{{ error }}</span>
    </div>
</template>

<style scoped lang="scss">
    .textarea{
        position: relative;

        &__field{
            position: relative;
            padding: 10px;
            border: 1px solid var(--black);
            border-radius: 10px;
            background: var(--white);
            width: 100%;  
            height: 200px;  
            box-sizing: border-box;  
            font-size: 14px; 
            color: var(--black);
        }

        &__name{
            position: absolute;
            top: 0;
        }
        &__error{
            position: relative;
            font-size: 12px;
            color: var(--bg-secondary);
            margin-top: 4px;
        }
    }


</style>

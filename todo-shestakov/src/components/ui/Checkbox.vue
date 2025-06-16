<script setup>
    import CheckIcon from "/public/icon/completed.svg";
    import {ref} from 'vue';
    const props = defineProps({
        checked: Boolean,
        disabled: Boolean,
        text: {
            type: String,
            default: ''
        },
    });

    const checked = ref(props.checked);
    const disabled = ref(props.disabled);
    const text = ref(props.text);
</script>

<template>
    <label class="custom-checkbox">
        <input type="checkbox" v-model="checked" :disabled="disabled" @change="$emit('checked', checked)">
        <span class="custom-checkbox__check">
            <CheckIcon></CheckIcon>
        </span>
        <span v-if="text.length > 0">{{ text }}</span>
    </label>
</template>

<style scoped lang="scss">
.custom-checkbox{
    input{
        display: none;
        &:checked + .custom-checkbox__check {
            transition: all var(--transition);
            border-color: var(--icon-success);
            background-color: var(--icon-success);
            &> svg{
                fill: var(--white);
                transition: all var(--transition);
            }
        }
    }

    &__check{
        &:hover{
            transition: all var(--transition);
            border-color: var(--icon-success);
            &> svg{
                fill: var(--icon-success);
                transition: all var(--transition);
            }
        }

        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid black;
        transition: all var(--transition);
        border-radius: 50px;
        padding: 3px;
        svg{
            position: relative;
            top: -1px;
            left: -1px;
            width: 100%;
            transition: all var(--transition);
            fill: black;
        }
        max-width: 30px;
        max-height: 30px;
    }
    
}

</style>

<script setup>
    import {ref} from 'vue';
    import TextArea from "../ui/TextArea.vue";
    const props = defineProps({
        item: {
            type: Object,
            default: {
                title: '',
                id: 1, 
                user_id: 1,  
                completed: false
            }
        },
        typePopup: {
            type: String,
            default: 'add'
        },
    });

    const newItem = ref({
        title:'', 
        user_id: 1, 
        completed: false
    })

    const editItem = ref({
        title: props.item.title,
        id: props.item.id,
        user_id: props.item.user_id,
        completed:props.item.completed,
    })

</script>

<template>
    <div class="modal--background"></div>
    <div class="modal">
        <template v-if="typePopup == 'edit'">
            <span class="modal__title">Изменение задачи</span>
            <TextArea v-model="editItem.title"></TextArea>
            <div class="modal__btn">
                <button class="btn"  @click="$emit('acceptPopup', props.typePopup, editItem)">
                    <span>Подтвердить</span>
                </button>
                <button class="btn btn-close " @click="$emit('closePopup')">
                    <span>Отмена</span>
                </button>
            </div>
        </template>
        
        <template v-if="typePopup == 'add'">
            <span class="modal__title">Создать задачу</span>
            <TextArea v-model="newItem.title"></TextArea>
            <div class="modal__btn">
                <button class="btn"  @click="$emit('acceptPopup', props.typePopup, newItem)"> 
                    <span>Создать</span>
                </button>
                <button class="btn btn-close" @click="$emit('closePopup')">
                    <span>Отмена</span>
                </button>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">

.btn{
    background-color: var(--icon-success);
    border: 1px solid  var(--icon-success);
    color: var(--white);
    transition: var(--transition);
    border-radius: 10px;
    padding: 5px 10px;

    &:hover{
        color: var(--icon-success);
        background-color: transparent;
        transition: var(--transition);
    }

    &.btn-close{
        background-color: var(--bg-secondary);
        border: 1px solid  var(--bg-secondary);

        &:hover{
            color: var(--bg-secondary);
            background-color: transparent;
        }
    }
}

.modal{
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 20px;
    padding: 20px;
    background-color: var(--bg-light);
    box-shadow: -4px 8px 8px 0px rgba(34, 60, 80, 0.2);
    z-index: 100;
    top: 50px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    max-width: 500px;
    min-width: 300px;
    height: auto;
    &__btn{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        width: 100%;
        gap: 10px;
    }

    &__title{
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }
}

.modal--background{
    z-index: 90;
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--black);
    pointer-events: none;
    opacity: 0.5;
}
</style>

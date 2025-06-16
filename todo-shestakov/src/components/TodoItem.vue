<script setup>
    import {ref, defineEmits} from 'vue';
    import EditIcon from "/public/icon/edit.svg";
    import DeleteIcon from "/public/icon/delete.svg";
    import Checkbox from "./ui/Checkbox.vue";   
    const emitForCompleted = defineEmits(['completedItem'])  
    const props = defineProps({
        dataItem: {
            type: Object,
            default: {}
        }
    });

    const loader = ref(false);
    const completed = ref(props.dataItem.completed);
    function changeCompletedInItem(checked){
        try{
            console.log(checked);
            loader.value = true;
            fetch( `https://jsonplaceholder.typicode.com/todos/${props.dataItem.id}` , {
                method: "PATCH",
                body: JSON.stringify({
                    completed: checked,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }) 
            .then((response) => response.json())
            .then((json) => {
                console.log(props.dataItem)
                props.dataItem.completed = json.completed;
                emitForCompleted('completedItem', props.dataItem);
                loader.value = false;
            });
        }
        catch(err){
            alert('Ошибка изменения состояния задачи');
        }
        
    }
</script>

<template>
    <div class="todo--item" :class = "completed ? 'completed' : ''">
        <div class="todo--item__title">
            <span>{{ props.dataItem.title }}</span>
        </div>

        <div class="todo--item__buttons">
            <div class="loader" v-if="loader"></div>

            <Checkbox 
                class="todo--item__completed"
                :checked = 'completed'
                @checked = "changeCompletedInItem"
                title="Изменить статус работы">
            </Checkbox>

            <button 
                class="btn todo--item__edit" 
                title="Редактировать задачу" 
                @click = "$emit('initModal', props.dataItem,  'edit')">
                <EditIcon></EditIcon>
            </button>

            <button 
                class="btn todo--item__delete" 
                title="Удалить задачу" 
                @click = "$emit('deleteItem', props.dataItem)">
                <DeleteIcon></DeleteIcon>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .todo--item{
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        max-width: 400px;
        min-width: 200px;
        width: auto;
        padding: 20px 40px 20px 20px;
        border-radius: 10px;
        background: linear-gradient(-135deg, transparent 21px, var(--bg-accent) 0);
        color: var(--black);
        box-shadow: -4px 8px 8px 0px rgba(34, 60, 80, 0.2);
        transition: all var(--transition);

        @media(max-width: 765px){
            max-width: 300px
        }

        &.completed{
            opacity: 0.5;
            text-decoration:line-through;
        }

        &:hover{
            transform: scale(1.01) translate(2px, 2px);
            transition: all var(--transition);
        }

        &::before{
            position: absolute;
            content: ' ';
            top: 0; 
            right: 0;
            border-bottom-left-radius: 10px;
            width: 30px;
            height: 30px;
            background: linear-gradient(to left bottom, transparent 50%, rgba(0,0,0,.4) 0) no-repeat 100% 0 / 30px 30px,
        }

        &__title{
            font-weight: 500;
            font-size: 14px;            
        }

        &__buttons{
            display: flex;
            margin-top: 20px;
            gap: 5px;
            justify-content: flex-end;
        }

        &__completed{
            font-size: 14px;
        };

        button{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            max-width: 30px;
            max-height: 30px;
            border-radius: 50px;
        };

        &__edit{    
            border: 2px solid var(--black); 
            transition: all var(--transition);     
            &:hover{ 
                transition: all var(--transition);
                border-color: var(--bg-primary);      
                svg{
                    transition: all var(--transition);
                    fill: var(--bg-primary); 
                }
            }
        };

        &__delete{
            border: 2px solid var(--black);   
            transition: all var(--transition);   
            &:hover{
                transition: all var(--transition);
                border-color: var(--bg-secondary);  
                svg{
                    transition: all var(--transition);
                    fill: var(--bg-secondary);
                }
            }
        };
    }
</style>

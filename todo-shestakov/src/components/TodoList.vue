<script setup>
    import {ref, onMounted, Transition, onUnmounted} from 'vue';
    import TodoPanel from "./TodoPanel.vue";
    import TodoItem from "./TodoItem.vue";
    import ModalEdit from "./modal/Modal.vue";

    const loader = ref(false);
    const openPopup = ref(false);
    const typePopup = ref('add');
    const tmpEditItem = ref({});

    const url = "https://jsonplaceholder.typicode.com/todos";
    const todoObject = ref({});

    /*Загружаем данные по TodoList. Если localStorage пуст, то отправляем запрос по url, иначе берем данные из хранилища*/
    onMounted(() => {
        if(localStorage.getItem('count_i')){
            try{
                const tmpObject = [];
                const arrayKeyStorage = Object.keys({...localStorage});
                Object.keys(todoObject.value).forEach(key => delete todoObject.value[key]); 
                arrayKeyStorage.forEach(key => {
                    const item = localStorage.getItem(key);
                    if(typeof(item) == 'string' && item != 'undefined' && key !== 'count_i' && key.includes('item')){
                        todoObject.value[key] = JSON.parse(item);
                    }       
                })
            }
            catch(err){
                console.log('Ошибка открытия данных из LocalStorage. Некорректные данные. Отправляю запрос на сервер с данными.' + err);
                getDataApi();
            }
        }
        else{
            getDataApi();
        }
    })

    function changeCompleted(item){
       todoObject.value[`item_${item.id}`].completed = item.completed;
       safeLocalStorage();
    }

    function safeLocalStorage(){
        localStorage.clear();
        const keys = Object.keys(todoObject.value);
        keys.forEach(key =>{
            localStorage.setItem(key, JSON.stringify(todoObject.value[key]));
        })
        localStorage.setItem('count_i', keys.length);
    }

    async function getDataApi(){
        try{
            await fetch( url, {
                method: 'GET',
            }).then(( response ) => response.json())
            .then(( json ) => {
                const jsonObj = json.slice(0, 10);
                for(let key = 0; key < jsonObj.length; key++)
                {
                    todoObject.value[`item_${jsonObj[key].id}`] = jsonObj[key];
                }
                safeLocalStorage();
            });
        }
        catch(err){
            console.log('Ошибка загрузки данных TodoList: ' + err);
        }

    }

    function initModal(item, typeModal = 'add'){
        tmpEditItem.value = item;
        typePopup.value = typeModal;
        openPopup.value = true;
    }

    function closeModal(){
        openPopup.value = false;
        tmpEditItem.value = {};
    }

    function editItem(item){
        loader.value = true;
        try{
            fetch( `${url}/${item.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    id: item.id,
                    title: item.title,
                    completed: item.completed,
                    user_id: item.user_id,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }) 
            .then((response) => response.json())
            .then((json) => {
                todoObject.value[`item_${json.id}`]= json;
                safeLocalStorage();
                loader.value = false;
                closeModal();

            });
        }
        catch(err){
            alert("Ошибка в отправке данных серверу. " + err);
        }
    }

    function addItem(item){
        loader.value = true;
        try{
            fetch( `${url}` , {
                method: "POST",
                body: JSON.stringify({
                    title: item.title,
                    completed: item.completed,
                    user_id: item.user_id,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }) 
            .then((response) => response.json())
            .then((json) => {
                todoObject.value[`item_${json.id}`]= json;
                loader.value = false;
                safeLocalStorage();
                closeModal();
                console.log({...localStorage});
            });
        }
        catch(err){
            alert("Ошибка в отправке данных серверу. " + err);
        }
    }

    function acceptModal(type, item){
        loader.value = true;
        switch(type){
            case 'edit': editItem(item);
                break;
            case 'add': addItem(item);
                break;
        }
    }

    function deleteItem(tmpItem){
        try{
            fetch( `${url}/${tmpItem.id}` , {
                method: "DELETE",
            }).then((response) => {
                const keys = Object.keys(todoObject.value);
                for(let i = 0; i < keys.length; i++){
                    if(todoObject.value[keys[i]].id == tmpItem.id){
                        delete todoObject.value[keys[i]];
                        console.log(todoObject.value)
                        safeLocalStorage();
                        return;
                    }
                }
                
            })          
        }
        catch(err){
            alert('Ошибка при удалении элемента: '+ err);
        }
    }
</script>

<template>
    <div class="todo--list">
        <div class="todo--list__head">
            <h1>Todo</h1>
            <TodoPanel @init-modal = "initModal"></TodoPanel>
        </div>
        <div class="todo--list__container">
            <template v-if= "Object.keys(todoObject).length > 0">
                <div class="todo--list__column" data-list="In-work">
                    <h2>В работе</h2>
                    <template v-for="todoItem in todoObject" >
                        <Transition >
                            <TodoItem 
                            :dataItem="todoItem"  
                            @init-modal = "initModal"
                            @delete-item = "deleteItem"
                            @completed-item = 'changeCompleted'
                            v-if="todoItem && !todoItem.completed"
                            :key = "todoItem.id"
                        ></TodoItem>
                        </Transition>
                    </template>
                </div>
                <div class="todo--list__column column__completed" data-list="completed">
                    <h2>Выполненые</h2>
                    <template v-for="todoItem in todoObject" >
                        <Transition>
                            <TodoItem 
                            :dataItem="todoItem" 
                            @init-modal = "initModal"
                            @delete-item = "deleteItem"
                            v-if="todoItem && todoItem.completed"
                            :key = "todoItem.id"
                            ></TodoItem>
                        </Transition>
                    </template>
                </div>
            </template>
            <template v-else>
                <span class="todo--list__text">Нет задач</span>
            </template>
        </div>

        <div class="todo--list__footer">
            <p>project was created by Mikhail Shestakov</p>
        </div>
    </div>
    <Transition>
        <ModalEdit 
            :item = "tmpEditItem" 
            :typePopup = "typePopup" 
            v-if = "openPopup" 
            @close-popup = "closeModal" 
            @accept-popup = "acceptModal">
        </ModalEdit>
    </Transition>
</template>

<style lang="scss" scoped>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .todo--list{
        display: flex;
        flex-direction: column;
        max-width: 100%;

        &__head{
            display: flex;
            margin-bottom: 30px;
            width: 100%;
            h1{
                font-size: 36px;
                font-weight: 600;
            }
        }

        &__footer{
            margin-top: 50px;
            font-size: 12px;
            display: flex;
            justify-content: end;
        }

        &__container{
            display: flex;
            flex-direction: row;
            align-items: start;
            justify-content: space-between;
            width: 100%;
            height: auto;
            gap: 30px;
            @media (max-width: 1280px){
                gap: 10px;
            }
        }

        &__column{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: start;
            justify-content: start;
            width: 100%;
            height: auto;
            gap: 10px;            
            padding: 20px;
            
            @media (max-width: 1280px){
                max-width: 45%;
            }

            h2{
                width: 100%;
                margin-bottom: 20px;
                font-size: 22px;
            }

            &.column__completed{
                border-left: 1px solid var(--black);
                @media (max-width: 768px){
                    border-left: none;
                    border-top: 1px solid var(--black);
                }
            }
        }

        
    }

</style>

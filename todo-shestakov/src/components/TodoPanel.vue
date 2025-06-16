<script setup>
    import loader from 'sass-loader';
    import {onMounted, ref} from 'vue';
    const props = defineProps({
        loader: Boolean,
    });
</script>

<template>
    <div class="todo--panel">
        <div v-show="props.loader" class="loader"></div>
        <button class="todo--panel__add" title="Добавить задачу" @click = "$emit('initModal')" >
            <span>+</span>
        </button>
    </div>
</template>

<style scoped lang="scss">

    .todo--panel{

        display: flex;
        margin-left: auto;
        align-items: center;

        .loader{
            margin-right: 20px;
        }

        &__add{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            width: 34px;
            height: 34px;
            padding: 5px;
            border: 1px solid var(--black);
            margin-right: 10px;
            transition: all var(--transition);   

            span{
                font-size: 30px;
                font-weight: 400;
                line-height: 70%;
            }

            &:hover{
                background-color: var(--bg-green);
                border-color: var(--bg-green);
                color: var(--white);
                transition: all var(--transition);   
            }
        }

        &__filter{
            display: flex;
            gap: 10px;
            label{
                input{
                    display: none;
                    &:checked + span{
                        background-color: var(--bg-primary);
                        border-color: var(--bg-primary);
                        color: var(--white);
                        transition: all var(--transition);   
                    }
                }

                span{
                    border-radius: 20px;
                    border: 1px solid black;
                    padding: 8px 12px;
                    font-size: 14px;
                    transition: all var(--transition);   
                }

                &:hover{
                    span{
                        transition: all var(--transition);   
                        background-color: var(--bg-primary-bright);
                        border-color: var(--bg-primary);
                    }
                }
            }
        }
    }

</style>

<template>
    <div class="dropdown-wrapper">
        <div class="dropdown-selected-option">
             {{ selectedOption || 'select something' }}

        </div>
        <div class="options-wrapper">
            <div class="option" v-for="(option,index) in options" :key="index">
                {{ option }}
            </div>

        </div>
    </div>
</template>
<script setup>
import {defineProps, ref} from 'vue'

const props = defineProps( {
    options:{
        type: array,
        required: true
    }
})

const selectedOption = ref(null)
const toggleOptionSelect = (option) => {
    selectedOption.value = option;
}
</script>
<style>
.dropdown-wrapper {
    padding: 16px;
    cursor: pointer;
    max-width: 200px;
    margin: 0 auto;
}
.dropdown-selected-option {
    padding: 16px;
    border: solid 1px #313131;
    border-radius: 8px;
    box-sizing: border-box;
    margin-bottom: 4px;
}
</style>
<template>
  <div class="editable-product">
    <template v-if="state.isEditing">
      <product-form
        :price="price"
        :imageSrc="imageSrc"
        :title="title"
        :description="description"
        @save="onSave"
      ></product-form>
    </template>
    <template v-else>
      <button @click="state.isEditing = true">
        Click here to edit
      </button>
      <product-details
        :price="price"
        :imageSrc="imageSrc"
        :title="title"
        :description="description"
      ></product-details>
    </template>
    </div>
</template>

<script>
import { reactive } from 'vue';
import ProductDetails from '../ProductDetails/ProductDetails.vue';
import ProductForm from '../ProductForm/ProductForm.vue';
import './EditableProduct.css';

export default {
  name: 'editable-product',
  props: {
    imageSrc: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    description: {
      type: String,
      required: true,
      default: ''
    },
    price: {
      type: Number,
      required: true,
      default: 0
    }
  },
  emits: ['save'],
  components: {
    ProductDetails,
    ProductForm
  },
  setup(props, { emit }) {
    const state = reactive({
      isEditing: false
    })

    return {
      state,
      onSave(formData) {
        state.isEditing = false;
        emit('save', formData);
      }
    }
  }
}
</script>

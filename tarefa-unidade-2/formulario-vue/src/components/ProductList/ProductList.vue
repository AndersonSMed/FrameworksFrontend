<template>
  <div class="product-list">
    <editable-product
      v-for="product in state.products" :key="product.uuid"
      :price="product.price"
      :imageSrc="product.imageSrc"
      :title="product.title"
      :description="product.description"
      @save="onSave(product.uuid, $event)"
    ></editable-product>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import { reactive } from 'vue';
import EditableProduct from '../EditableProduct/EditableProduct.vue';
import './ProductList.css';

export default {
  name: 'product-list',
  props: {
    products: {
      type: Array,
      require: false,
      default: []
    }
  },
  components: { EditableProduct },
  setup(props) {
    const state = reactive({
      products: props.products.map(product => ({ ...product, uuid: uuid() }))
    });

    return {
      state,
      onSave: (productUUID, newData) => {
        state.products = state.products.map(product => {
          if (product.uuid === productUUID)
            return { ...product, ...newData };
          return product;
        });
      }
    }
  }
}
</script>

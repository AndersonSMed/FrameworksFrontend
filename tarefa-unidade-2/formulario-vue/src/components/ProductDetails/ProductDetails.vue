<template>
  <div class="product-details">
    <div class="product-details__body">
      <div class="product-details__image-container" >
        <template v-if="!!imageSrc">
          <img
            alt="Product"
            class="product-details__image"
            :src="imageSrc"
          />
        </template>
        <template v-else>
          No image
        </template>
        <span class="product-details__price">
          {{ formattedPrice }}
        </span>
      </div>
      <h3 class="product-details__title">{{ title }}</h3>
      <h4 class="product-details__description">{{ description }}</h4>
    </div>
    <div class="product-details__footer">
      <button>Buy Now</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import './ProductDetails.css';

export default {
  name: 'product-details',
  props: [
    'imageSrc',
    'price',
    'title',
    'description'
  ],
  setup(props) {
    return {
      formattedPrice: computed(() => {
        const parsedPrice = parseFloat(props.price.toString());
        return `R$ ${parsedPrice.toFixed(2)}`;
      }),
    }
  }
}
</script>
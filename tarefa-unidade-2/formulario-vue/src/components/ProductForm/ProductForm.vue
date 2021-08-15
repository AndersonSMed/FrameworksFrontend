<template>
  <form
    class="product-form"
    @submit.prevent="onSave"
  >
    <label>
      Title
      <input
        v-model="formData.title"
        name="title"
        placeholder="Smart Watch"
      />
      <template v-if="getError('title')">
        <span class="product-form__error-message">
          {{ getError('title') }}
        </span>
      </template>
    </label>
    <label>
      Description
      <textarea
        v-model="formData.description"
        name="description"
        placeholder="This is a nice smart watch used to monitor your life"
      ></textarea>
      <template v-if="getError('description')">
        <span class="product-form__error-message">
          {{ getError('description') }}
        </span>
      </template>
    </label>
    <label>
      Price
      <input
        v-model="formData.price"
        name="price"
        type="number"
        placeholder="99.99"
      />
      <template v-if="getError('price')">
        <span class="product-form__error-message">
          {{ getError('price') }}
        </span>
      </template>
    </label>
    <label>
      Image URL
      <input
        v-model="formData.imageSrc"
        name="imageSrc"
        type="url"
        placeholder="http://image.jpg"
      />
      <template v-if="getError('imageSrc')">
        <span class="product-form__error-message">
          {{ getError('imageSrc') }}
        </span>
      </template>
    </label>
    <button type="submit" :disabled="hasErrors">
      Save Changes
    </button>
  </form>
</template>

<script>
import { computed, watch, reactive } from 'vue';
import { useYup } from './validators'; 
import './ProductForm.css';

export default {
  name: 'product-form',
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
  setup(props, { emit }) {
    const schema = useYup({
      title: {
        type: 'text',
        required: true 
      },
      description: {
        type: 'text',
        required: true 
      },
      price: {
        type: 'number',
        required: true 
      },
      imageSrc: { type: 'url' }
    });

    const state = reactive({
      formData: {
        title: props.title,
        description: props.description,
        price: props.price,
        imageSrc: props.imageSrc
      },
      error: null
    });

    watch(state, changes => {
      schema
        .validate(changes.formData)
        .then(() => { state.error = null; })
        .catch((err) => { state.error = err && err.message; })
    });
    
    return {
      formData: state.formData,
      error: state.error,
      hasErrors: computed(() => {
        return !!state.error;
      }),
      getError: (field) => {
        if (state.error && state.error.startsWith(field))
          return state.error.split(' ').slice(1).join(' ');
        return;
      },
      onSave() {
        emit('save', state.formData);
      }
    }
  }
}
</script>
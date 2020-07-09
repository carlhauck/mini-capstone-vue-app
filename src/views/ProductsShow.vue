<template>
  <div class="products-show">
    <h2>{{ product.name }}</h2>
    <h5>${{ product.price }}</h5>
    <!-- <img v-bind:src="product.images.first.url" v-bind:alt="product.name"> -->
    <p>{{ product.description }}</p>
    <router-link class="nav-link" :to="`/products/${product.id}/edit`">Edit</router-link>
    <button v-on:click="destroyProduct()">Delete</button>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      product: {}
    };
  },
  created: function() {
    axios.get(`/api/products/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.product = response.data;
    });
  },
  methods: {
    destroyProduct: function() {
      if (confirm("Are you sure you want to delete this product?")) {
        axios
          .delete(`/api/products/${this.$route.params.id}`)
          .then(response => {
            this.$router.push("/products");
          });
      }
    }
  }
};
</script>
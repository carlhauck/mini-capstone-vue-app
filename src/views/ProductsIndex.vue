<template>
  <div class="products-index">
    
    <div v-for="product in products">
      <h2>{{ product.name }}</h2>
      <h5>${{ product.price }}</h5>
      <!-- <img v-bind:src="product.images.first.url" v-bind:alt="product.name"> -->
      <p>{{ product.description }}</p>
      <!-- in-stock and supplier -->
      <router-link class="nav-link" :to="`/products/${product.id}`">More Info</router-link>
      <!-- <button v-on:click="showProduct()">More Info</button> -->
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      products: []
    };
  },
  created: function() {
    this.indexProducts();
  },
  methods: {
    indexProducts: function() {
      axios.get("/api/products").then(response => {
        this.products = response.data;
      });
    }
  }
};
</script>

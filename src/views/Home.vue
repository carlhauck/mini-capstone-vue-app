<template>
  <div class="home">
    
    <h1>{{ message }}</h1>
    
    <div>
      Name: <input type="text" v-model="newProductName"><br>
      Price: <input type="text" v-model="newProductPrice"><br>
      Description: <input type="text" v-model="newProductDescription"><br>
      <!-- Image URL: <input type="text" v-model="newProductImageUrl"><br> -->
      <button v-on:click="createProduct()">Create product</button>
    </div>
    
    <ul>
      <li style="list-style: none" v-for="error in errors">{{ error }}, you fool!</li>
    </ul>
    
    <div v-for="product in products">
      <h2>{{ product.name }}</h2>
      <h3>${{ product.price }}</h3>
      <!-- <img v-bind:src="product.images.first.url" v-bind:alt="product.name"> -->
      <p>{{ product.description }}</p>
      <button v-on:click="showProduct(product)">Edit Product</button>
    </div>

    <dialog id="product-details">
      <form method="dialog">
        <h1>Edit Product</h1>
        <p>Name: <input type="text" v-model="currentProduct.name"></p>
        <p>Price: <input type="text" v-model="currentProduct.price"></p>
        <!-- <p>Image URL: <input type="text" v-model="currentProduct.image_url"></p> -->
        <p>Description: <input type="text" v-model="currentProduct.description"></p>
        <button v-on:click="updateProduct(currentProduct)">Update</button>
        <button v-on:click="destroyProduct(currentProduct)">Delete</button>
        <button>Close</button>
      </form>
    </dialog>

  </div>
</template>

<style>
img {
  width: 300px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      message: "Let's buy stuff!",
      products: [],
      errors: [],
      newProductName: "",
      newProductDescription: "",
      newProductPrice: "",
      newProductImageUrl: "",
      currentProduct: {}
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
    },
    createProduct: function() {
      var params = {
        name: this.newProductName,
        description: this.newProductDescription,
        price: this.newProductPrice
        // image_url: this.newProductImageUrl
      };
      axios
        .post("/api/products", params)
        .then(response => {
          console.log("Successful", response.data);
          this.products.push(response.data);
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
      this.newProductName = "";
      this.newProductDescription = "";
      this.newProductPrice = "";
      // this.newProductImageUrl = "";
    },
    showProduct: function(product) {
      console.log(product);
      this.currentProduct = product;
      document.querySelector("#product-details").showModal();
    },
    updateProduct: function(product) {
      var params = {
        name: product.name,
        description: product.description,
        price: product.price
        // image_url: product.image_url
      };
      axios.patch(`/api/products/${product.id}`, params).then(response => {
        console.log("Successful update", response.data);
      });
    },
    destroyProduct: function(product) {
      axios.delete(`/api/products/${product.id}`).then(response => {
        console.log("Successful destruction", response.data);
      });
      var index = this.products.indexOf(product);
      this.products.splice(index, 1);
    }
  }
};
</script>

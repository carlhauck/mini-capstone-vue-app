<template>
  <div class="products-edit">

    <form v-on:submit.prevent="updateProduct()">
      <h1>Edit Product</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="product.name">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="text" class="form-control" v-model="product.price">
      </div>
      <div class="form-group">
        <label>Description:</label>
        <input type="text" class="form-control" v-model="product.description">
      </div>
      <input type="submit" class="btn btn-primary" value="Update">
    </form>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      errors: [],
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
    updateProduct: function() {
      var params = this.product;
      axios
        .patch(`/api/products/${this.$route.params.id}`, params)
        .then(response => {
          this.$router.push(`/products/${response.data.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
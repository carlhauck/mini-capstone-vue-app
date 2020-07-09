<template>
  <div class="products-new">

    <form v-on:submit.prevent="createProduct()">
      <h1>Create Product</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="name">
      </div>
      <div class="form-group">
        <label>Price:</label>
        <input type="text" class="form-control" v-model="price">
      </div>
      <div class="form-group">
        <label>Description:</label>
        <input type="text" class="form-control" v-model="description">
      </div>
      <div class="form-group">
        <label>Supplier ID:</label>
        <input type="text" class="form-control" v-model="supplier_id">
      </div>
      <input type="submit" class="btn btn-primary" value="Create">
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
      name: "",
      price: "",
      description: "",
      supplier_id: ""
    };
  },
  created: function() {},
  methods: {
    createProduct: function() {
      var params = {
        name: this.name,
        price: this.price,
        description: this.description,
        supplier_id: this.supplier_id
      };
      axios
        .post(`/api/products/`, params)
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
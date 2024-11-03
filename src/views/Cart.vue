<template>
    <div>
      <h1>Carrinho de Compras</h1>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.name }} - R$ {{ item.price.toFixed(2) }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cart: []
      };
    },
    created() {
      //carrinho localstorage
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
      }
    }
  };
  </script>
  
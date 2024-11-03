<template>
  <div class="d-flex flex-column align-items-center justify-content-center min-vh-100">
    <div>
      <h3 class="text-white">Carrinho de compras</h3>
    </div>

    <div
      v-for="product in visibleProducts"
      :key="product.id"
      class="card mb-3"
      style="width: 70rem; height: 12rem; color: white; background-color: #2C2C36;"
    >
      <div class="card-body">
        <p class="card-text">{{ product.name }}</p>
        <span class="stars">{{ product.rating }} ⭐ ({{ product.reviews }} avaliações) </span>
        <h3 style="color: #A33AFF;">R$ {{ product.price.toFixed(2) }}</h3>
        <button
          type="button"
          class="addCart"
          @click="addToCart(product)"
          style="background-color: #39115C; color: white; width: 15rem; height: 3rem; border-radius: 5px; border-color: #A33AFF;"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>

    <div class="button-container">
      <button
        v-if="productsToShow < products.length"
        type="button"
        class="button btn-success addCart"
        style="background-color: #39115C; color: white; width: 15rem; height: 3rem; border: none; border-radius: 5px;"
        @click="loadMore"
      >
        Carregar mais produtos
      </button>
      <button
        type="button"
        class="button moreProducts"
        style="background-color: #39CC33; color: white; width: 15rem; height: 3rem; border: none; border-radius: 5px; margin-left: 3rem;"
        @click="goToCart"
      >
       Ir para o carrinho 
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],      
      productsToShow: 3, 
      cart: []           
    };
  },
  created() {
    this.loadCart();    
    this.fetchProducts(); 
  },
  methods: {
    fetchProducts() {
      fetch('http://localhost:4000/products')
        .then(response => response.json())
        .then(data => {
          this.products = data; 
        });
    },
    loadMore() {
      //exibe de 3 em 3 produtos
      if (this.productsToShow < this.products.length) {
        this.productsToShow += 3;
      }
    },
    addToCart(product) {
      // produto ja esta no carrinho?  
      const productInCart = this.cart.find(item => item.id === product.id);

      if (!productInCart) {
        this.cart.push(product);

       localStorage.setItem('cart', JSON.stringify(this.cart));

        alert("Produto adicionado ao carrinho!");
      } else {
        alert("Este produto já está no carrinho!");
      }
    },
    loadCart() {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
      }
    },
    goToCart() {
      this.$router.push('/cart');
      console.log("Ir para o carrinho!", this.cart);
    }
  },
  computed: {
    visibleProducts() {
      return this.products.slice(0, this.productsToShow);
    },
  },
};
</script>

<style>
body {
  background-color: #23242c !important;
}
</style>

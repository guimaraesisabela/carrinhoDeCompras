<template>
  <div>
    <h1>Carrinho de Compras</h1>
    
    <ul>
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <!-- <img :src="item.image" alt="Imagem do produto" class="product-image"/> -->
        <div>
          <h3>{{ item.name }}</h3>
          <p>R$ {{ item.price.toFixed(2) }}</p>
        </div>
        
        <div class="quantity-control">
          <button @click="decreaseQuantity(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item)">+</button>
        </div>

        <p>Subtotal: R$ {{ (item.price * item.quantity).toFixed(2) }}</p>
      </li>
    </ul>

    <div class="total">
      <h3>Total: R$ {{ totalPrice.toFixed(2) }}</h3>
    </div>

    <button @click="clearCart" class="clear-cart-button">Limpar Carrinho</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => {
        const itemSubtotal = Number(item.price) * Number(item.quantity);
        return total + (isNaN(itemSubtotal) ? 0 : itemSubtotal);
      }, 0);
    }
  },
  created() {
    // carrega o carrinho localstorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart).map(item => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1
      }));
    }
  },
  methods: {
    increaseQuantity(item) {
      item.quantity++;
      this.updateLocalStorage();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateLocalStorage();
      }
    },
    clearCart() {
      this.cart = [];
      localStorage.removeItem('cart');
    },
    updateLocalStorage() {
      //atualizando localstorage
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
};
</script>

<style scoped>
h1 {
  color: white;
}
ul {
  color: white;
}
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #444;
  border-radius: 8px;
}
.quantity-control {
  display: flex;
  align-items: center;
}
.quantity-control button {
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: #fff;
  background-color: #555;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.quantity-control span {
  margin: 0 10px;
  font-size: 18px;
  color: #fff;
}
.total {
  font-size: 24px;
  font-weight: bold;
  text-align: right;
  margin-top: 20px;
  color: white;
}
.product-image {
  width: 50px;
  height: auto;
  margin-right: 15px;
  border-radius: 5px;
}
.clear-cart-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #d9534f;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.clear-cart-button:hover {
  background-color: #c9302c;
}
</style>

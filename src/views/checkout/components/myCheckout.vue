<template>
  <div style="background-color: #f2f2f2;width: 550px">
    <p style="text-align: center">Pay with credit card or debit card</p>
    <p style="text-align: center">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Card number
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      |&nbsp;&nbsp;Exp Date:MM/YY&nbsp;&nbsp;
      |&nbsp; CVC &nbsp;
      |&nbsp;Postal code
    </p>
    <div id="card-element" ref="cardElement" style="width: 400px; margin-left: auto;margin-right:auto;margin-bottom: 20px"></div>
    <el-button @click="submitPayment" style="margin: 0 auto; display: block;">Submit Payment</el-button>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import {loadStripe} from '@stripe/stripe-js';
import { useStore } from 'vuex';

export default {
  name: 'myCheckout',

  setup() {
    const store = useStore();
    const stripePromise = loadStripe(process.env.VUE_APP_STRIPE_pk);
    const cardElement = ref(null);
    const clientSecret = ref('');
    const cardElementValue = ref(null);

    let result = [];
    store.state.cart.forEach(item => {
      result.push({
        productID: item.id,
        amount: item.amount,
        price: item.price,
      });
    });


    const submitPayment = async () => {
      const stripe = await stripePromise;
      const {paymentMethod, error} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElementValue.value,
      });

      if (error) {
        console.log(error);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret.value, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        // Show error message to user
        // console.log(result.error.message);
      } else {
        // Payment successful
        console.log('Payment succeeded!');
      }
    }


    onMounted(async () => {
      const stripe = await stripePromise;
      const elements = stripe.elements();
      const card = elements.create('card');
      card.mount(cardElement.value);
      cardElementValue.value = card//新增

      const response = await fetch('http://localhost:8080/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          products:result,
        })
      });

      const data = await response.json();
      clientSecret.value = data.clientSecret;
    });

    return {
      cardElement,
      submitPayment,
    };
  },

};
</script>


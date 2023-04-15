<template>
  <div>
    <label htmlFor="card-element">Credit or debit card</label>
    <div id="card-element" ref="cardElement"></div>
    <el-button @click="submitPayment" style="margin: auto">Submit Payment</el-button>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import {loadStripe} from '@stripe/stripe-js';

export default {
  name: 'myCheckout',

  setup() {
    const stripePromise = loadStripe(process.env.STRIPE_pk);
    // const stripePromise = loadStripe('pk_test_51MtuTJIcbspUJZVnbSwOQDuevEt8HJF5PQQcGCze0qPE2Bqtg40x39Tu9FfbPDbQogztopKfrKSB75dnG6KxfjfS00EdffJfHW');
    const cardElement = ref(null);
    const clientSecret = ref('');
    const cardElementValue = ref(null);

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
      //   这里改成了paymentMethod.id就成功了，我不理解
      });

      if (result.error) {
        // Show error message to user
        console.log(result.error.message);
      } else {
        // Payment successful
        console.log('Payment succeeded!');
      }
    }


    onMounted(async () => {
      const stripe = await stripePromise;
      const elements = stripe.elements();
      const card = elements.create('card');//在这里，我标记了这是一张银行卡
      card.mount(cardElement.value);//这是把银行卡挂载到cardElement.value上，实际效果就是有了一个单行的form，所以我暂时不能挂载
      cardElementValue.value = card//新增

      //这是Fetch a PaymentIntent那一步 记1
      // 这一步是表达了开始转账的意向，标志着收款的开始
      const response = await fetch('http://localhost:8080/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [] // 根据实际需要传递商品信息，这里就是cart中的东西
        })
      });

      const data = await response.json();
      // console.log(data.clientSecret); // 获取到创建的PaymentIntent的client secret
      clientSecret.value = data.clientSecret;
    });

    return {
      cardElement,
      submitPayment,
    };
  },

};
</script>


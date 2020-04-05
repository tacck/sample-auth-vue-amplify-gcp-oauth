<template>
  <div>
    <button @click="signin">Google</button>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  methods: {
    signin: function() {
      Auth.federatedSignIn({ provider: 'Google' })
    },
  },
}
</script>

<style></style>

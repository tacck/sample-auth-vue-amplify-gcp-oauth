<template>
  <div>
    <button @click="signout">Sign Out</button>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  methods: {
    signout: function() {
      Auth.signOut()
    },
  },
}
</script>

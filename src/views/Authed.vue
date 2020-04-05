<template>
  <div>authed</div>
</template>

<script>
export default {
  mounted: function() {
    setTimeout(() => {
      this.$router.push('/')
    }, 1000)
  },
}
</script>

<style></style>

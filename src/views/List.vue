<template>
  <div>
    <h2>Informations</h2>
    <p>
      <a href="/information/new">Add</a>
    </p>
    <div class="informations-list">
      <ul>
        <li v-for="(information, index) in informations" :key="index">
          {{ information.title }}: {{ information.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify'
import { listInformations } from '@/graphql/queries'

export default {
  mounted: async function() {
    const informations = await API.graphql({
      query: listInformations,
      authMode: 'API_KEY',
    }).catch(err => console.error('listInformations', err))
    console.log('List mounted', informations)

    this.informations = informations.data.listInformations.items
  },
  data: function() {
    return {
      informations: [],
    }
  },
}
</script>

<style scoped>
.informations-list {
  display: inline-block;
  text-align: left;
}
</style>

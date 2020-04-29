<template>
  <div>
    <h2>Add Information</h2>
    <div class="infromation-item">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" v-model="title" />
    </div>
    <div class="infromation-item">
      <label for="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        v-model="description"
      />
    </div>
    <div class="btn">
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { getInformation } from '@/graphql/queries'
import { createInformation, updateInformation } from '@/graphql/mutations'

export default {
  props: {
    id: String,
  },
  mounted: async function() {
    if (this.id && this.id !== 'new') {
      const information = await API.graphql(
        graphqlOperation(getInformation, { id: this.id }),
      ).catch(err => console.error('getInformation', err))
      console.log('Information get', getInformation)
      this.information = information.data.getInformation
    }

    if ('title' in this.information) {
      this.title = this.information.title
    }
    if ('description' in this.information) {
      this.description = this.information.description
    }
  },
  data: function() {
    return {
      information: {},
      title: '',
      description: '',
    }
  },
  methods: {
    save: async function() {
      const saveInformation = {}

      if ('id' in this.information && this.information.id !== 'new') {
        saveInformation.id = this.information.id
      }

      if (this.title && this.title.length > 0) {
        saveInformation.title = this.title
      }
      if (this.description && this.description.length > 0) {
        saveInformation.description = this.description
      }

      console.log(saveInformation)
      if ('id' in saveInformation) {
        // update
        const savedInformation = await API.graphql(
          graphqlOperation(updateInformation, { input: saveInformation }),
        ).catch(err => console.error('updateSurvey', err))
        console.log('updateInformation', savedInformation)
      } else {
        // create
        const savedInformation = await API.graphql(
          graphqlOperation(createInformation, { input: saveInformation }),
        ).catch(err => console.error('savedSurvey', err))
        console.log('createInformation', savedInformation)
        this.information.id = savedInformation.data.createInformation.id
      }
    },
  },
}
</script>

<style scoped>
.infromation-item {
  display: flex;
  align-items: center;
}

.infromation-item > label {
  flex-basis: 10rem;
  text-align: right;
  margin-right: 0.5rem;
}

.infromation-item > input {
  flex-grow: 1;
  margin-right: 10rem;
}

.btn {
  text-align: center;
}
</style>

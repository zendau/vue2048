<template>
  <p v-if="loader">loading...</p>
  <table v-else class="table table-striped">
    <thead>
      <tr>
        <th>Place</th>
        <th>Username</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <td>{{ index + 1 }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.score }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>

import $api from "../axios";


export default {
  async mounted() {

    const userList = await $api.get("/top/getList")
    this.loader = false
    this.users = userList.data

  },
  data() {
    return {
      users: [],
      loader: true
    }
  },
}
</script>

<style scoped>
.table {
  text-align: center;
  width: 800px !important;
  margin: 10px auto;
}

@media (max-width: 720px) {
  .table {
    width: 100%!important;
  }
}
</style>


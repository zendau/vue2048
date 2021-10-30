<template>
  <p v-if="loader">loading...</p>
  <table v-else class="table">
    <thead>
    <tr>
      <th>Place</th>
      <th>Username</th>
      <th>Score</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(user, index) in users" :key="user.id">
      <td>{{index+1}}</td>
      <td>{{user.username}}</td>
      <td>{{user.score}}</td>
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


<style scoped lang="scss">
  table {
    width: 600px;
    border: none;
    margin: 0 auto 20px;

    thead {
      th {
        font-weight: bold;
        border: none;
        padding: 10px 15px;
        background: #d8d8d8;
        font-size: 14px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        text-align: center;
      }
    }
    tbody {

      tr:nth-child(even){
        background: #f3f3f3;
      }

      td {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 10px 15px;
        font-size: 14px;
        vertical-align: top;
        text-align: center;
      }
    }
    thead tr th:first-child, .table tbody tr td:first-child {
      border-left: none;
    }
    thead tr th:last-child, .table tbody tr td:last-child {
      border-right: none;
    }
  }

</style>
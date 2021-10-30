<template>
  <div class="about">
    <ul>
      <li v-for="user in users" :key="user.id"><p>{{user.username}}</p><p>{{user.score}}</p></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          username: "test1",
          score: "100"
        },
        {
          id:2,
          username: "test2",
          score: "200"
        },
        {
          id:3,
          username: "test3",
          score: "300"
        }
      ]
    }
  },
  components: {}
}
</script>
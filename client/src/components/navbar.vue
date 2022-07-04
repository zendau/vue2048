<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse navbar-center" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">New game</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/top" class="nav-link">Top list</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

nav.navbar {
  background-color: #DBE2EF!important;
}

.navbar-center {
  justify-content: center;
}

.active {
  color: #865439!important;
}

</style>
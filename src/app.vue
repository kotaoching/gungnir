<template>
<div>
  <div class="header">
    <div class="container">
      <div class="logo">
        <h1>
          <router-link to="/">Gungnir</router-link>
        </h1>
      </div>
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/project">Project</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/archive">Archive</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
    </div>
  </div>

  <router-view></router-view>

  <div class="footer">
  </div>
</div>
</template>

<style lang="sass" scoped>
.logo {
  float: left;

  h1 {
    margin: 0;
    font-size: 26px;
    // text-transform: uppercase;
  }
}

.nav {
  margin: 0;
  float: right;
  list-style-type: none;

  .nav-item {
    margin: 0;
    float: left;
    padding: 8px 0 8px 15px;
  }
}
</style>

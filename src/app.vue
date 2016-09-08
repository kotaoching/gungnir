<template>
  <div>
    <div class="header">
      <nav class="navbar navbar-light navbar-static-top bg-faded">
        <div class="container">
          <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#dlNavbar">
            ☰
          </button>
          <div class="collapse navbar-toggleable-xs" id="dlNavbar">
            <a class="navbar-brand" href="/">Gungnir</a>
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
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
      </nav>
    </div>

    <router-view></router-view>

    <div class="footer">
      <div class="container">
      </div>
    </div>
  </div>
</template>

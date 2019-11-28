<template>
  <div>
    <nav class="navbar horizontal-layout col-lg-12 col-12 p-0">
      <div class="container d-flex flex-row nav-top">
        <div class="text-center navbar-brand-wrapper d-flex align-items-top">
          <h5 class="pt-3">Student Management System</h5>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center">
          <form class="d-none d-sm-block">
            <div class="input-group search-box">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="mdi mdi mdi-magnify"></i>
                </span>
              </div>
            </div>
          </form>
          <div class="ml-auto">
            <button type="button" class="btn btn-icons btn-inverse-primary" @click="logout">
              <i class="material-icons">power_settings_new</i>
            </button>
          </div>
        </div>
      </div>
      <div class="nav-bottom">
        <div class="container-fluid">
          <ul class="nav page-navigation d-flex justify-content-center">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="link-icon material-icons">dashboard</i>
                <span class="menu-title">Dashboard</span>
              </router-link>
            </li>
            <li class="nav-item">
              <span class="nav-link">
                <i class="link-icon material-icons">account_circle</i>
                <span class="menu-title">Students</span>
                <i class="menu-arrow material-icons">arrow_drop_down</i>
              </span>
              <div class="submenu">
                <ul class="submenu-item">
                  <li class="nav-item">
                    <router-link to="/new-student" class="nav-link">New</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/list-student" class="nav-link">List</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/statistics" class="nav-link">Statistics</router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item">
              <router-link to="/department" class="nav-link">
                <i class="link-icon material-icons">view_list</i>
                <span class="menu-title">Departments & levels</span>
              </router-link>
            </li>
            <li class="nav-item">
              <span class="nav-link">
                <i class="link-icon material-icons">account_circle</i>
                <span class="menu-title">Users & roles</span>
                <i class="menu-arrow material-icons">arrow_drop_down</i>
              </span>
              <div class="submenu">
                <ul class="submenu-item">
                  <li class="nav-item">
                    <router-link to="/new-user" class="nav-link">New</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/list-user" class="nav-link">List</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/account" class="nav-link">Account</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      activeUser () {
        return this.$store.getters.activeUser;
      },
      logged () {
        return this.$store.getters.logged;
      }
    },
    methods: {
      logout () {
        if (confirm('Are you sure you want to logout?')) {
          this.$store.dispatch('logOut');
          this.$router.push({ path: '/login' })
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>

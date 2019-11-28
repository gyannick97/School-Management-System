<template>
  <div id="wrapper">
    <main class="container-scroller">
      <app-header></app-header>

      <div class="container-fluid page-body-wrapper">
        <div class="main-panel container mx-auto">
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import AppHeader from './app-header'

  export default {
    name: 'Dashboard',
    components: { AppHeader },

    data() {
      return {
      }
    },

    computed: {
      activeUser () {
        return this.$store.getters.activeUser;
      }
    }
  }
</script>

<style>
  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }
  .slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
</style>

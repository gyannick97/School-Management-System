<template>
  <div>
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100 mx-auto">
            <div class="col-sm-8 col-md-6 col-xl-4 mx-auto">
              <div class="auto-form-wrapper">
                <form @submit.prevent="onSubmit">
                  <div class="form-group">
                    <label class="label">Username</label>
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="user.username" placeholder="Username">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="label">Password</label>
                    <div class="input-group">
                      <input type="password" class="form-control" v-model="user.pass" placeholder="*********">
                    </div>
                  </div>
                  <div class="form-group mb-4">
                    <button class="btn btn-primary submit-btn btn-block">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        pass: ''
      }
    }
  },

  created() {
    this.$store.dispatch('initUser')
  },

  computed: {
    users () {
      return this.$store.getters.users;
    },
    activeUser () {
      return this.$store.getters.activeUser;
    }
  },

  methods: {
    onSubmit (formUser) {
      if (this.user.username != "" && this.user.pass != "") {
        if (this.user.username == "admin" && this.user.pass == "superadmin") {
          this.user.role = "Admin"
          this.$store.dispatch('signIn', this.user)
          this.$router.push({ path: "/" });
        } else {
          this.$db.findUsername('users', this.user.username, (err, user) => {
            if (user) {
              if (this.user.username == user.username && this.user.pass == user.pass) {
                this.user = user
                this.$store.dispatch('signIn', this.user)
                this.$router.push({ path: "/" })
              } else {
                alert('Incorrect password')
              }
            } else {
              alert('Incorrect username')
            }
          })
        }
      } else {
        alert('Empty fields')
      }
    }
  },
}
</script>

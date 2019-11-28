<template>
  <div>
    <div class="content-wrapper">
      <div class="row mt-5">
        <div class="col-12 col-md-6 grid-margin">
          <div class="card">
            <div class="card-body">
              <form  @submit.prevent="newUser" class="form-sample">
                <p class="card-description"> User info </p>
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">Name</label>
                      <div class="">
                        <input type="text" class="form-control" v-model="user.firstName" required />
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">Surname</label>
                      <div class="">
                        <input type="text" class="form-control" v-model="user.lastName" required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">Username</label>
                      <div class="">
                        <input class="form-control" type="text" v-model="user.username" required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <button type="button" class="btn btn-inverse-primary mt-3" @click="onSave">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 grid-margin">
          <div class="card">
            <div class="card-body">
              <form  @submit.prevent="onSavePass" class="form-sample">
                <p class="card-description"> Change your password </p>
                <div class="col-12">
                  <div class="form-group">
                    <label class="form-label">Current Password</label>
                    <div class="">
                      <input class="form-control" type="password" v-model="user.pass" required />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <div class="">
                      <input class="form-control" type="password" v-model="newPass.checkPass" required />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="form-label">New Password</label>
                    <div class="">
                      <input class="form-control" type="password" v-model="newPass.pass" required />
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <button type="button" class="btn btn-inverse-primary mt-3" @click="onSave">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'New_User',
  data() {
    return {
      user: {
        id: this.$store.getters.activeUser._id,
        firstName: this.$store.getters.activeUser.firstName,
        lastName: this.$store.getters.activeUser.lastName,
        username: this.$store.getters.activeUser.username,
        pass: '',
        role: this.$store.getters.activeUser.role
      },
      newPass: {
        pass: '',
        checkPass: '',
      }
    }
  },

  computed: {
    activeUser () {
      return this.$store.getters.activeUser
    },
  },
  
  methods: {
    onSave (e) {
      e.preventDefault();
      if (confirm('Are you sure you want to update your profil?')) {
        this.$store.dispatch('editUserSubmit', this.user);
      }
    },
    onSavePass (e) {
      this.$db.findOne('users', this.user.id, (err, user) => {
        if (this.newPass.checkPass == user.pass) {
          if (confirm('Are you sure you want to update your profil?')) {
            this.userData.pass = this.newPass.pass
            this.$store.dispatch('editUserSubmit', this.user)
            this.newPass = ""
            this.user.pass = ""
          }
        } else {
          alert("Incorrect password")
        }
      })
    }
  }
}
</script>

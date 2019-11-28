<template>
  <div>
    <div class="content-wrapper">
      <div class="col-12 col-lg-10 col-xl-8 grid-margin mx-auto mt-5">
        <div class="card">
          <div class="card-body">
            <form  @submit.prevent="newStudent" class="form-sample">
              <p class="card-description"> Users info </p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">First Name</label>
                    <div class="">
                      <input type="text" class="form-control" v-model="user.firstName" required />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Last Name</label>
                    <div class="">
                      <input type="text" class="form-control" v-model="user.lastName" required />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Username</label>
                    <div class="">
                      <input class="form-control" type="text" v-model="user.username" required/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Password</label>
                    <div class="">
                      <input class="form-control" type="password" v-model="user.pass" required/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <div class="">
                      <input class="form-control" type="password" v-model="user.confirmPass" required/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Role</label>
                    <div class="">
                      <select class="form-control" v-model="user.role" required>
                        <option>Admin</option>
                        <option>Intern</option>
                        <option>Ex Student</option>
                        <option>Espelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-right">
                <button type="button" class="btn btn-inverse-secondary mt-3" @click="onCancel">Cancel</button>
                <button type="submit" class="btn btn-inverse-primary mt-3">Save</button>
              </div>
            </form>
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
        firstName: '',
        lastName: '',
        username: '',
        pass: '',
        confirmPass: '',
        role: ''
      }
    }
  },
  
  methods: {
    newStudent () {
      this.$db.insert('users', this.user, (err, user) => {
        this.$store.dispatch('addUser', this.user);
        this.$router.push('/list-user');
      })
    },
    onCancel (e) {
      e.preventDefault();
      this.$router.push('/list-user');
    }
  }
}
</script>

<template>
  <div>
    <div class="content-wrapper">
      <div class="col-12 col-lg-10 col-xl-8 grid-margin mx-auto mt-5">
        <div class="card">
          <div class="card-body">
            <form  @submit.prevent="onSave" class="form-sample">
              <p class="card-description"> Users info </p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Name</label>
                    <div class="">
                      <input type="text" class="form-control" v-model="user.firstName" required disabled/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Surname</label>
                    <div class="">
                      <input type="text" class="form-control" v-model="user.lastName" required disabled/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Username</label>
                    <div class="">
                      <input class="form-control" type="text" v-model="user.username" required disabled/>
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
                <button type="button" class="btn btn-inverse-danger mt-3" @click="onDelete">Delete</button>
                <button type="button" class="btn btn-inverse-secondary mt-3" @click="onCancel">Cancel</button>
                <button type="button" class="btn btn-inverse-primary mt-3" @click="onSave">Save</button>
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
        id: this.$store.getters.currentUsers._id,
        firstName: this.$store.getters.currentUsers.firstName,
        lastName: this.$store.getters.currentUsers.lastName,
        username: this.$store.getters.currentUsers.username,
        role: this.$store.getters.currentUsers.role
      }
    }
  },

  computed: {
    currentUsers () {
      return this.$store.getters.currentUsers
    },
  },
  
  methods: {
    onSave (e) {
      e.preventDefault();
      if (confirm('Are you sure you want to update this item?')) {
        this.$store.dispatch('editUserSubmit', this.user);
        this.$router.push('/list-user');
      }
    },
    onCancel (e) {
      e.preventDefault();
      this.$router.push('/list-user');
    },
    onDelete (e) {
      e.preventDefault();
      const id = this.user.id
      if (confirm('Are you sure you want to delete this item?')) {
        this.$db.remove('users', id, (err, items) => {})
        this.$store.dispatch('removeUser', this.user);
        this.$router.push('/list-user');
      }
    }
  }
}
</script>

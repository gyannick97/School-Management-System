<template>
  <div>
    <div class="content-wrapper">
      <div class="row print-hidden">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <p class="card-description">Search Users</p>
              <div class="row">
                <div class="card-col col-md-4 col-12">
                  <div class="form-group mb-0">
                    <label class="form-label">Name of the user</label>
                    <b-input-group>
                      <b-form-input v-model="search.firstName" placeholder="Search by name" />
                    </b-input-group>
                  </div>
                </div>
                <div class="card-col col-md-4 col-12">
                  <div class="form-group mb-0">
                    <label class="form-label">Surname of the user</label>
                    <b-input-group>
                      <b-form-input v-model="search.lastName" placeholder="Search by surmane" />
                    </b-input-group>
                  </div>
                </div>
                <div class="card-col col-md-4 col-12">
                  <div class="form-group mb-0">
                    <label class="form-label">Username of the user</label>
                    <b-input-group>
                      <b-form-input v-model="search.username" placeholder="Search by username" />
                    </b-input-group>
                  </div>
                </div>
                <div class="card-col col-md-4 col-12">
                  <div class="row">
                    <div class="col-md-5 mt-2">
                      <div class="form-group">
                        <label class="form-label">Per page</label>
                        <b-form-select :options="pageOptions" v-model="perPage" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-margin stretch-card mt-4">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h4 class="card-title">Users List</h4>
                </div>
                <b-table
                  responsive
                  :items="usersList" 
                  :fields="fields" 
                  :outlined="outlined"
                  :bordered="bordered"
                  :current-page="currentPage"
                  :per-page="perPage">
                  <template slot="index" slot-scope="data" width="50">
                    {{ data.index + 1 }}
                  </template>
                  <template slot="action" slot-scope="row">
                    <b-button size="sm" @click="onEdit(row.item, row.index, $event.target)" class="btn btn-outline-primary">
                      <i class="material-icons">remove_red_eye</i>View
                    </b-button>
                  </template>
                </b-table>
                <div class="text-center pt-3" v-if="users.length == 0"><p class="text-danger">Empty data</p></div>
                <div v-if="users.length > 0">
                  <b-row class="text-center">
                    <b-col md="8" class="my-1">
                      <b-pagination
                        :total-rows="users.length"
                        :per-page="perPage"
                        v-model="currentPage"
                        class="my-0"
                      />
                    </b-col>
                    <div class="col-4 text-right">
                      <p class="text-muted mt-3">Total Users {{ usersList.length | numberConvert }}</p>
                    </div>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'List_User',
  components: {
  },
  data() {
    return {
      search: {
        firstName: '',
        lastName: '',
        username: '',
      },
      fields: [
      'index',
      {
        key: 'firstName',
        label: 'Name',
        sortable: true
      },
      {
        key: 'lastName',
        label: 'Surmane',
        sortable: true
      },
      {
        key: 'username',
        label: 'Username'
      },
      {
        key: 'role',
        label: 'Role',
        sortable: true
      },
      'action'],
      outlined: true,
      bordered: true,
      currentPage: 1,
      perPage: 50,
      totalRows: this.$store.getters.getUsers.length,
      pageOptions: [20, 40, 50, 100],
    }
  },

  computed: {
    users () {
      return this.$store.getters.getUsers;
    },
    usersList () {
      return this.$store.getters.getUsers
        .filter(user => user.firstName ?  user.firstName.toLowerCase().includes(this.search.firstName.toLowerCase()) : true)
        .filter(user => user.lastName ? user.lastName.toLowerCase().includes(this.search.lastName.toLowerCase()) : true)
        .filter(user => user.username ? user.username.toLowerCase().includes(this.search.username.toLowerCase()) : true)
    }
  },

  filters: {
    numberConvert: function(value) {
      if (value >= 1000000000) {
        value = (value/1000000000)+"M"
      }
      else if (value >= 1000000) {
        value = (value/1000000)+"m"
      }
      else if (value >= 1000) {
        value = (value/1000)+"K";
      }
      return value;
    }
  },

  methods: {
    onEdit(item, index, button) {
      this.$store.dispatch('editUser', item);
      this.$router.push('/edit-user/' + index);
    }
  }
}
</script>

<style scoped>
  .card-student {
    box-shadow: none;
    border: 1px solid #f2f2f2;
  }
  .custom-select {
    font-size: 0.75rem;
    border: 1px solid #f2f2f2;
  }
  .custom-select:focus {
    box-shadow: 0;
    border-color:  #f2f2f2;
  }

  .table {
    width: 100%
  }

  .text-underline {
    text-decoration: underline;
  }
  .text-underline-none {
    text-decoration: none !important;
  }
  .logo {
    max-width: 330px;
  }
  .square-semester {
    width: 30px;
    height: 10px;
    border: 1px solid #000;
    margin: 0.16rem 0.6rem 0 0;
    width: 45px;
    height: 17px;
  }
  /* .dote {
    position: relative;
  }
  .dote:before {
    content: '.';
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    right: 0;
  } */
</style>

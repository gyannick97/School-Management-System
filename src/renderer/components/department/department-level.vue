<template>
  <div>
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12">
          <div class="stretch-card mt-4">
            <div class="card">
              <div class="card-body">
                <form  @submit.prevent="newDepartment">
                  <div class="row">
                    <div class="form-group col-6">
                      <label class="form-label">Department name</label>
                      <input type="text" class="form-control" v-model="department.name" required />
                    </div>
                    <div class="form-group col-6">
                      <label class="form-label">Department Slug</label>
                      <input type="text" class="form-control" v-model="department.slug" required />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-6">
                      <label class="form-label">Department Option</label>
                      <vue-tags-input
                        v-model="option"
                        :tags="department.options"
                        @tags-changed="newTags => department.options = newTags"
                      />
                    </div>
                    <div class="form-group col-6">
                      <label class="form-label">Department Speciality</label>
                      <vue-tags-input
                        v-model="speciality"
                        :tags="department.specialities"
                        @tags-changed="newTags => department.specialities = newTags"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-6">
                      <label class="form-label">Department Levels</label>
                      <vue-tags-input
                        v-model="level"
                        :tags="department.levels"
                        @tags-changed="newTags => department.levels = newTags"
                      />
                    </div>
                  </div>
                  <div class="text-right">
                    <button type="submit" class="btn btn-inverse-primary">Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 grid-margin">
          <div class="grid-margin stretch-card mt-xl-4">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Departments</h4>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th style="width: 50px;"> # </th>
                        <th> Name </th>
                        <th> Slug </th>
                        <th> Level </th>
                        <th> Option </th>
                        <th> Speciality </th>
                        <th style="width: 50px;"> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(department, index) in departments" :key="department._id">
                        <td> {{ index + 1 }} </td>
                        <td> {{ department.name }} </td>
                        <td> {{ department.slug }} </td>
                        <td>
                          <span class="badge badge-outline-primary d-block mb-2 mr-1"
                            v-for="level in department.levels" :key="level._id">
                            {{ level.text }}
                          </span>
                        </td>
                        <td>
                          <span class="badge badge-outline-primary d-block mb-2 mr-1"
                            v-for="option in department.options" :key="option._id">
                            {{ option.text }}
                          </span>
                        </td>
                        <td>
                          <span class="badge badge-outline-primary d-block mb-2 mr-1"
                            v-for="speciality in department.specialities" :key="speciality._id">
                            {{ speciality.text }}
                          </span>
                        </td>
                        <td>
                          <b-button class="btn btn-icons btn-inverse-primary"
                            @click="onEditDepartment(department)" v-b-tooltip.hover title="Edit">
                            <i class="material-icons">border_color</i>
                          </b-button>
                          <b-button class="btn btn-icons btn-inverse-danger"
                            @click="onDelDepartment(department)" v-b-tooltip.hover title="Delete">
                            <i class="material-icons">delete_forever</i>
                          </b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center pt-3" v-if="departments.length == 0"><p class="text-danger">Empty data</p></div>
                  <div  v-if="departments.length > 0" class="col-12 text-right">
                    <p class="text-muted mt-3">Total Departments {{ departments.length }}</p>
                  </div>
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
import VueTagsInput from '@johmun/vue-tags-input';
const shortid = require('shortid')

export default {
  components: {
    VueTagsInput
  },
  data () {
    return {
      option: '',
      speciality: '',
      level: '',
      department: {
        shortid: shortid.generate(),
        name: '',
        slug: '',
        options: [],
        specialities: [],
        levels: []
      },
      statistic: {
        shortid: '',
        departmentSlug: '',
        departmentName: '',
        levels: [],
        students: [],
      }
    }
  },

  computed: {
    departments () {
      return this.$store.getters.getDepartments;
    },
    levels () {
      return this.$store.getters.getLevels;
    },
    statistics () {
      return this.$store.getters.getStatistics;
    }
  },

  methods: {
    newDepartment () {
      this.$db.insert('departments', this.department, (err, department) => {
        this.$store.dispatch('addDepartment', this.department);
        this.department = {}
      })
      this.statistic.shortid = this.department.shortid
      this.statistic.departmentName = this.department.name
      this.statistic.departmentSlug = this.department.slug
      this.statistic.levels = this.department.levels
      this.$db.insert('statistics', this.statistic, (err, statistic) => {
        this.$store.dispatch('addStatistic', this.statistic);
        this.statistic = {}
      })
    },
    onDelDepartment (department) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.$store.dispatch('removeDepartment', department._id);
        this.$store.dispatch('removeStatistic', department.shortid);
      }
    },
    onEditDepartment (department) {
      this.$store.dispatch('editDepartment', department);
      this.$router.push('/edit-department/' + department._id);
    },
  },
}
</script>

<style>
  .vue-tags-input {
    max-width: 100% !important;
  }
  .ti-input {
    border: 1px solid #f2f2f2 !important;
    font-family: "Poppins", sans-serif;
    font-size: 0.75rem;
    line-height: 14px;
    padding: 0.7rem .2rem !important;
    font-weight: 300;
  }
  .ti-tag {
    color: #2196f3 !important;
    background-image: none;
    background: transparent !important;
    border: 1px solid rgba(33, 150, 243, 0.2) !important;
  }
</style>
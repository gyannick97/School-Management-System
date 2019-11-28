<template>
  <div>
    <div class="content-wrapper">
      <div class="col-12 col-lg-10 col-xl-8 grid-margin mx-auto mt-5">
        <div class="card">
          <div class="card-body">
            <form  @submit.prevent="onSave" class="form-sample">
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
                <div class="form-group col-12">
                  <label class="form-label">Department Option</label>
                  <vue-tags-input
                    v-model="option"
                    :tags="department.options"
                    @tags-changed="newTags => department.options = newTags"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-12">
                  <label class="form-label">Department Speciality</label>
                  <vue-tags-input
                    v-model="speciality"
                    :tags="department.specialities"
                    @tags-changed="newTags => department.specialities = newTags"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-12">
                  <label class="form-label">Department Levels</label>
                  <vue-tags-input
                    v-model="level"
                    :tags="department.levels"
                    @tags-changed="newTags => department.levels = newTags"
                  />
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
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'New_Department',
  components: {
    VueTagsInput
  },
  data() {
    return {
      option: '',
      speciality: '',
      oldSlug: '',
      level: '',
      department: {
        shortid: this.$store.getters.currentDepartments.shortid,
        id: this.$store.getters.currentDepartments._id,
        name: this.$store.getters.currentDepartments.name,
        slug: this.$store.getters.currentDepartments.slug,
        options: this.$store.getters.currentDepartments.options,
        specialities: this.$store.getters.currentDepartments.specialities,
        levels: this.$store.getters.currentDepartments.levels,
      },
      statistic: {
        shortid: '',
        departmentSlug: '',
        departmentName: '',
        levels: [],
        students: []
      }
    }
  },

  mounted() {
    this.oldSlug = this.department.slug
  },

  computed: {
    currentDepartments () {
      return this.$store.getters.currentDepartments
    },
  },
  
  methods: {
    onSave (e) {
      e.preventDefault();
      if (confirm('Are you sure you want to update this item?')) {
        this.$store.dispatch('editDepartmentSubmit', this.department);
        this.statistic.shortid = this.department.shortid
        this.statistic.departmentName = this.department.name
        this.statistic.departmentSlug = this.department.slug
        this.statistic.levels = this.department.levels
        this.$store.dispatch('updateStatistic', this.statistic);
        // this.$db.findDepartment('students', this.oldSlug, (err, item) => {
        //   if (item) {
        //     item.forEach(studentList => {
        //       studentList.department = this.department.slug
        //       this.$store.dispatch('editStudentSubmit', studentList)
        //     })
        //   }
        // })
        // this.$db.findLevel('students', this.oldSlug, (err, item) => {
        //   if (item) {
        //     item.forEach(studentList => {
        //       studentList.department = this.department.slug
        //       this.$store.dispatch('editStudentSubmit', studentList)
        //     })
        //   }
        // })
        this.statistic = {}
        this.department = {}
        //this.$router.push('/department');
      }
    },
    onCancel (e) {
      e.preventDefault();
      this.$router.push('/department');
    },
    onDelete (e) {
      e.preventDefault();
      const id = this.department.id
      if (confirm('Are you sure you want to delete this item?')) {
        this.$db.remove('departments', id, (err, items) => {})
        this.$store.dispatch('removeDepartment', this.department);
        this.$store.dispatch('removeStatistic', this.department.shortid);
        this.$router.push('/department');
      }
    }
  }
}
</script>

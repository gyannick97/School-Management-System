<template>
  <div>
    <div class="content-wrapper">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <form  @submit.prevent="newStudent" class="form-sample">
              <p class="card-description"> Personal info </p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Matricule</label>
                    <div class="">
                      <input class="form-control" type="text" v-model="student.matricule"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Name</label>
                    <div class="">
                      <input type="text" class="form-control" v-model="student.firstName" required />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Surname</label>
                    <div class="">
                      <input type="text" class="form-control" v-model="student.lastName" required />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Date of Birth</label>
                    <div class="">
                      <input class="form-control" type="date" v-model="student.birthDay" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Place of Birth</label>
                    <div class="">
                      <input class="form-control" type="text" v-model="student.birthPlace"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Nationnality</label>
                    <div class="">
                      <input class="form-control" type="text" v-model="student.nationnality"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Sexe</label>
                    <select class="form-control" v-model="student.sexe">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Admitted Year</label>
                    <div class="">
                      <input class="form-control" type="text" v-mask="'####-####'" placeholder="0000-0000" v-model="student.admittedYear" required/>
                    </div>
                  </div>
                </div>
              </div>
              <p class="card-description">Etude info</p>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Department</label>
                    <div class="">
                      <select class="form-control" v-model="student.department" required>
                        <option v-for="(department, index) in departments" :key="index" :value="department.slug">
                          {{ department.slug }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Level</label>
                    <div class="">
                      <select v-if="student.department" class="form-control" v-model="student.level" required>
                        <option v-for="(level, index) in studentDepartments.levels" :key="index">
                          {{ level.text }}
                        </option>
                      </select>
                      <select v-else class="form-control">
                        <option>Chose one department</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Certificate</label>
                    <input type="text" class="form-control" v-model="student.certificate"/>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Phone number</label>
                    <div class="">
                      <input type="number" class="form-control" v-model="student.phoneNumber"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Status</label>
                    <div class="">
                      <select class="form-control" v-model="student.status" disabled>
                        <option>Pending</option>
                        <option>Active</option>
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
const shortid = require('shortid')

export default {
  name: 'New_Student',

  data() {
    return {
      student: {
        shortid: shortid.generate(),
        matricule: '',
        firstName: '',
        lastName: '',
        sexe: '',
        birthDay: '',
        birthPlace: '',
        nationnality: '',
        admittedYear: '',
        department: '',
        level: '',
        certificate: '',
        phoneNumber: '',
        status: 'Pending'
      },
      grouped: {},
      groupedLevel: {},
      students: []
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
    },
    studentDepartments () {
      return this.$store.getters.getDepartments.find(dep => {
        return dep.slug == this.student.department
      })
    }
  },

  methods: {
    newStudent () {
      this.$db.insert('students', this.student, (err, student) => {
        this.$store.dispatch('newStudent', this.student);
      })
      this.$db.findParams('statistics', {departmentSlug: this.student.department}, (err, item) => {
        if (item) {
          var mapLevel = item.levels.map(level => {
            return level
          })
          mapLevel.find(level => {
            if (level.text == this.student.level) {
              level.students = level.students || []
              level.students.push({
                studentId: this.student.shortid,
                createdAt: new Date(),
                updatedAt: new Date()
              })
              return level
            } else {
              return level
            }
          })
          this.$store.dispatch('updateStatistic', item);
        }
      })
      this.$router.push('/list-student');
    },
    onCancel (e) {
      e.preventDefault();
      this.$router.push('/list-student');
    }
  }
}
</script>
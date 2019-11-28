<template>
  <div>
    <div class="content-wrapper">
      <div class="row print-hidden">
        <div class="col-12 grid-margin">
          <div class="card">
            <div class="card-body">
              <p class="card-description">Search Student</p>
              <div class="row">
                <div class="card-col col-md-4 col-12">
                  <div class="row">
                    <div class="col-md-5">
                      <div class="form-group">
                        <label class="form-label">Per page</label>
                        <b-form-select :options="pageOptions" v-model="perPage" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <b-button class="mt-4 btn-inverse-primary" v-b-toggle.collapse1 variant="primary">Filter</b-button>
                    </div>
                  </div>
                </div>
                <div class="card-col col-md-4 col-12">
                  <div class="form-group mb-0">
                    <label class="form-label">Surname of the student</label>
                    <b-input-group>
                      <b-form-input v-model="search.lastName" placeholder="Search by Surname"/>
                    </b-input-group>
                  </div>
                </div>
                <div class="card-col col-md-4 col-12">
                  <div class="form-group mb-0">
                    <label class="form-label">Name of the student</label>
                    <b-input-group>
                      <b-form-input v-model="search.firstName" placeholder="Search by Name" />
                    </b-input-group>
                  </div>
                </div>
                <div class="w-100">
                  <div class="col-12">
                    <b-collapse id="collapse1" class="mt-2">
                      <b-card class="card-student">
                        <div class="row">
                          <div class="col-md-6 col-xl-4">
                            <div class="form-group mb-0">
                              <label class="form-label">Admitted Year</label>
                              <div class="">
                                <input v-model="search.admittedYear" type="text" v-mask="'####-####'" placeholder="0000-0000" class="form-control"/>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 col-xl-4">
                            <div class="form-group mb-0">
                              <label class="form-label">Living Year</label>
                              <div class="">
                                <input v-model="search.livingYear" class="form-control" type="text" v-mask="'####-####'" placeholder="0000-0000"/>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 col-xl-4 mt-xl-0 mt-3">
                            <div class="form-group mb-0">
                              <label class="form-label">Department</label>
                              <div class="input-group">
                                <select class="form-control" v-model="search.department">
                                  <option v-for="(department, index) in departments" :key="index" :value="department.slug">
                                    {{ department.slug }}
                                  </option>
                                </select>
                                <div class="input-group-prepend">
                                  <button class="btn btn-secondary" :disabled="!search.department" @click="search.department = ''">Clear</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 col-xl-4 mt-3">
                            <div class="form-group">
                              <label class="form-label">Level</label>
                              <div class="input-group">
                                <select v-if="search.department" class="form-control" v-model="search.level">
                                  <option v-for="(level, index) in studentDepartments.levels" :key="index">
                                    {{ level.text }}
                                  </option>
                                </select>
                                <select v-else class="form-control">
                                  <option>Chose one department</option>
                                </select>
                                <div class="input-group-prepend">
                                  <button class="btn btn-secondary" :disabled="!search.level" @click="search.level = ''">Clear</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 col-xl-4 mt-3">
                            <div class="form-group">
                              <label class="form-label">Status</label>
                              <div class="input-group">
                                <select v-model="search.status" class="form-control">
                                  <option>Pending</option>
                                  <option>Active</option>
                                  <option>Ex Student</option>
                                  <option>Espelled</option>
                                </select>
                                <div class="input-group-prepend">
                                  <button class="btn btn-secondary" :disabled="!search.status" @click="search.status = ''">Clear</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 col-xl-4 mt-3">
                            <div class="form-group">
                              <label class="form-label">Sexe</label>
                              <div class="input-group">
                                <select v-model="search.sexe" class="form-control">
                                  <option>Male</option>
                                  <option>Female</option>
                                </select>
                                <div class="input-group-prepend">
                                  <button class="btn btn-secondary" :disabled="!search.sexe" @click="search.sexe = ''">Clear</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </b-card>
                    </b-collapse>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-margin stretch-card mt-4">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h4 class="card-title">Student List</h4>
                  <div class="mb-3">
                    <button type="submit" class="btn btn-inverse-primary" :disabled="!search.department || !search.level" @click="onPrintATC">Print Attendance</button>
                    <button type="submit" class="btn btn-inverse-primary" :disabled="!search.department || !search.level" @click="onPrintSS">Print Score sheet</button>
                  </div>
                </div>
                <b-table
                  responsive
                  :items="studentsList" 
                  :fields="fields" 
                  :outlined="outlined"
                  :bordered="bordered"
                  :tbody-tr-class="rowClass"
                  :current-page="currentPage"
                  :per-page="perPage">
                  <template slot="index" slot-scope="data" width="50">
                    {{ data.index + 1 }}
                  </template>
                  <template slot="action" slot-scope="row">
                    <b-button class="btn btn-icons btn-inverse-primary"
                      size="sm" @click="onEdit(row.item, row.index, $event.target)"
                      v-b-tooltip.hover title="Edit Student Info">
                      <i class="material-icons">border_color</i>
                    </b-button>
                    <b-button class="btn btn-icons btn-inverse-info"
                      size="sm" @click="onSeeScore(row.item, row.index, $event.target)"
                      v-b-tooltip.hover title="Scores">
                      <i class="material-icons">assignment</i>
                    </b-button>
                  </template>
                </b-table>
                <div class="text-center pt-3" v-if="students.length == 0"><p class="text-danger">Empty data</p></div>
                <div v-if="students.length > 0">
                  <b-row class="text-center">
                    <b-col md="8" class="my-1">
                      <b-pagination
                        :total-rows="students.length"
                        :per-page="perPage"
                        v-model="currentPage"
                        class="my-0"
                      />
                    </b-col>
                    <div class="col-4 text-right">
                      <p class="text-muted mt-3">Total Students {{ studentsList.length | numberConvert }}</p>
                    </div>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card printATC-card mb-5" v-if="showOnPrintATC">
        <h3 class="text-center text-uppercase text-underline">Irgib-africa {{ new Date().getFullYear() - 1 +' - '+ new Date().getFullYear() }} academic session</h3>
        <h5 class="text-center text-underline">Weekly Attendance List</h5>
        <div class="d-flex justify-content-center mb-3">
          <span class="mr-5">Department: {{ search.department }}</span>
          <span class="mr-2">Level: {{ search.level }}.</span>
          <span>Date: From................TO................</span>
        </div>
        <div class="">
          <table class="table table-bordered table-sm">
            <tr>
              <th rowspan="2"> SN º </th>
              <th rowspan="2"> Surname & Name </th>
              <th colspan="3"> Monday </th>
              <th colspan="3"> Tuesday </th>
              <th colspan="3"> Wednesday </th>
              <th colspan="3"> Thursday </th>
              <th colspan="3"> Friday </th>
              <th colspan="3"> Saturday </th>
            </tr>
            <tr>
              <th> L1 </th>
              <th> L2 </th>
              <th> L3 </th>
              <th> L1 </th>
              <th> L2 </th>
              <th> L3 </th>
              <th> L1 </th>
              <th> L2 </th>
              <th> L3 </th>
              <th> L1 </th>
              <th> L2 </th>
              <th> L3 </th>
              <th> L1 </th>
              <th> L2 </th>
              <th> L3 </th>
              <th> L1 </th>
              <th> L2 </th>
              <th> L3 </th>
            </tr>
            <tr v-for="(student, index) in studentsListPrint" :key="index">
              <td> {{ index + 1 }} </td>
              <td>
                {{ student.lastName }} {{ student.firstName }}
              </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
            </tr>
            <tr>
              <td> {{ studentsListPrint.length + 1 }} </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
            </tr>
            <tr>
              <td> {{ studentsListPrint.length + 2 }} </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="card printSS-card" v-if="showOnPrintSS">
        <div class="d-flex mb-3">
          <img class="logo" src="../../assets/images/logo.png" alt="">
          <div class="text-center ml-auto">
            <small>
              Regional Institute of Industrial Engineering.<br>
              Biotechnologies and <br>
              Applied Sciences
            </small>
          </div>
        </div>
        <div class="px-5 mb-3">
          <div class="d-flex justify-content-between">
            <h6 class="font-weight-bold">Department: {{ search.department }}</h6>
            <h6 class="font-weight-bold">Level: {{ search.level }}</h6>
            <h6 class="font-weight-bold">Batch: {{ search.batch }}</h6>
          </div>
          <div class="d-flex">
            <h6 class="text-underline font-weight-bold">Lecturer's Name:</h6>
            <div class="dote"></div>
          </div>
          <div class="d-flex">
            <h6 class="text-underline font-weight-bold">Course code and title:</h6>
            <div class="dote"></div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="font-weight-bold">
              <span class="text-underline">
                Academic section:
              </span>
              <span class="text-underline-none">
                {{ new Date().getFullYear() - 1 +' - '+ new Date().getFullYear() }}
              </span>
            </div>
            <div class="font-weight-bold d-flex">
              <div class="square-semester"></div> <span>First Semester</span>
            </div>
            <div class="font-weight-bold d-flex">
              <div class="square-semester"></div> <span>Second Semester</span>
            </div>
          </div>
        </div>
        <div class="">
          <table class="table table-bordered table-sm">
            <tr>
              <th rowspan="2"> SN º </th>
              <th rowspan="2"> Surname & Name </th>
              <th colspan="3"> Continuous Assessments </th>
              <th rowspan="2"> Attend. Mark/20 </th>
              <th rowspan="2"> Exam Score/20 </th>
              <th rowspan="2"> Total (Average) </th>
            </tr>
            <tr>
              <th> T1/20 </th>
              <th> T2/20 </th>
              <th> T3/20 </th>
            </tr>
            <tr v-for="(student, index) in studentsListPrint" :key="index">
              <td> {{ index + 1 }} </td>
              <td>
                {{ student.lastName }} {{ student.firstName }}
              </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
            </tr>
            <tr>
              <td> {{ studentsListPrint.length + 1 }} </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
            </tr>
            <tr>
              <td> {{ studentsListPrint.length + 2 }} </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
              <td>  </td>
            </tr>
          </table>
        </div>

        <div class="nb-score">
          <p class="font-weight-bold mb-0">
            NB : Test, CA, Quiz etc. = 30% ; Attendance = 10% ; Exam = 60%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'List_Student',
  components: {
  },
  data() {
    return {
      showOnPrintATC: false,
      showOnPrintSS: false,
      search: {
        firstName: '',
        lastName: '',
        status: '',
        sexe: '',
        department: '',
        level: '',
        admittedYear: '',
        livingYear: ''
      },
      fields: [
      'index',
      {
        key: 'lastName',
        label: 'Surname',
        sortable: true
      },
      {
        key: 'firstName',
        label: 'Name',
        sortable: true
      },
      {
        key: 'department',
        label: 'Department'
      },
      {
        key: 'level',
        label: 'Level',
        sortable: true
      },
      {
        key: 'sexe',
        label: 'Sexe',
      },
      { 
        key: 'admittedYear',
        label: 'Admitted Year',
        sortable: true
      },
      { 
        key: 'livingYear',
        label: 'Living Year',
        sortable: true
      },
      { 
        key: 'status',
        label: 'Status',
        _cellVariants: { status: 'badge-warning' }
      },
      'action'],
      outlined: true,
      bordered: true,
      currentPage: 1,
      perPage: 50,
      totalRows: this.$store.getters.getStudents.length,
      pageOptions: [20, 40, 50, 100],
    }
  },

  computed: {
    students () {
      return this.$store.getters.getStudents;
    },
    departments () {
      return this.$store.getters.getDepartments;
    },
    levels () {
      return this.$store.getters.getLevels;
    },
    getAcademic () {
      var year = new Date().getFullYear()
      var lastyear = new Date().getFullYear() - 1
      var range = []
      var lastrange = []
      var academicYear = []
      lastrange.push(lastyear)
      range.push(year)
      for (var i = 1; i < 7; i++) {
        lastrange.push(lastyear + i)
        range.push(year + i)
        academicYear.push(lastrange[i - 1] + "/" + (lastrange[i]).toString().slice(-2))
        var fullyear = lastrange.concat(range)
      }
      console.log(academicYear)
    },
    studentDepartments () {
      return this.$store.getters.getDepartments.find(dep => {
        return dep.slug == this.search.department
      })
    },
    studentsList () {
      return this.$store.getters.getStudents
        .filter(studentList => studentList.firstName ? studentList.firstName.toLowerCase().includes(this.search.firstName.toLowerCase()) : true)
        .filter(studentList => studentList.lastName ? studentList.lastName.toLowerCase().includes(this.search.lastName.toLowerCase()) : true)
        .filter(studentList => studentList.sexe.indexOf(this.search.sexe) > -1)
        .filter(studentList => studentList.status.indexOf(this.search.status) > -1)
        .filter(studentList => studentList.department.indexOf(this.search.department) > -1)
        .filter(studentList => studentList.level.indexOf(this.search.level) > -1)
        .filter(studentList => studentList.admittedYear.indexOf(this.search.admittedYear) > -1)
        .filter(studentList => studentList.livingYear ? studentList.livingYear.indexOf(this.search.livingYear) > -1 : true)
    },
    studentsListPrint () {
      return this.$store.getters.getStudents
        .filter(studentList => studentList.status ? studentList.status == 'Active' : true)
        .filter(studentList => studentList.department ? studentList.department.indexOf(this.search.department) > -1 : true)
        .filter(studentList => studentList.level ? studentList.level.indexOf(this.search.level) > -1 : true)
        .filter(studentList => studentList.admittedYear ? studentList.admittedYear.indexOf(this.search.admittedYear) > -1 : true)
    }
  },

  filters:{
    numberConvert: function(value) {
      if(value>=1000000000) {
        value=(value/1000000000)+"M"
      }
      else if(value>=1000000) {
        value=(value/1000000)+"m"
      }
      else if(value>=1000) {
        value=(value/1000)+"K";
      }
      return value;
    }
  },

  methods: {
    rowClass(item, type) {
      if (!item) return
      if (item.status === 'Pending') return 'block-warning'
      if (item.status === 'Active') return 'block-success'
      if (item.status === 'Ex Student') return 'block-info'
      if (item.status === 'Espelled') return 'block-danger'
    },
    onEdit(item, index, button) {
      this.$store.dispatch('editStudent', item);
      this.$router.push('/edit-student/' + index);
    },
    onSeeScore (item, index, button) {
      this.$router.push('/score-student/' + index);
    },
    onPrintATC () {
      this.showOnPrintATC = true
      setTimeout(() => {
        window.print()
        this.showOnPrintATC = false
      }, 0);
    },
    onPrintSS () {
      this.showOnPrintSS = true
      setTimeout(() => {
        window.print()
        this.showOnPrintSS = false
      }, 0);
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
    max-height: 90px;
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
  @media print {
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: #FFF;
      color: #000 !important;
      font-size: 9.5pt;
    }
    .print-hidden {
      display: none;
    }
    .table-bordered th, .table-bordered td {
      /* border: 1px solid #000 !important; */
    }
    .table td, .jsgrid .jsgrid-table td, .table th, .jsgrid .jsgrid-table th {
      font-size: 0.875rem;
      line-height: 1.3 !important;
      white-space: unset !important;
      padding: 0 !important;
      padding-left: 0.7rem !important;
    }
    .printSS-card {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .nb-score {
      position: fixed;
      bottom: 0;
      left: 10px;
      right: 10px;
      margin: 0 auto;
      width: 100%;
      text-align: center;
    }
  }
</style>

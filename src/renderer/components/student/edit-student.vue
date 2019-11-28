<template>
  <div>
    <div class="content-wrapper">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <form class="form-sample">
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
                    <label class="form-label">First Name</label>
                    <div class="">
                      <input type="text" class="form-control" v-model="student.firstName" required />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Last Name</label>
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
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label">Defend Year</label>
                    <div class="">
                      <input class="form-control" type="text" v-mask="'####-####'" placeholder="0000-0000" v-model="student.livingYear"/>
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
                      <select class="form-control" v-model="student.department">
                        <option v-for="(department, index) in departments" :key="index">
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
                      <select v-if="student.department" class="form-control" v-model="student.level">
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
                      <select class="form-control" v-model="student.status">
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
                <b-button v-if="student.status == 'Active'" type="button" 
                  class="btn btn-inverse-primary mt-3" data-toggle="modal" 
                  data-target=".bd-example-modal-xl">Admission Letter</b-button>
                <button type="button" class="btn btn-inverse-danger mt-3" @click="onDelete">Delete</button>
                <button type="button" class="btn btn-inverse-secondary mt-3" @click="onCancel">Cancel</button>
                <button type="button" class="btn btn-inverse-primary mt-3" @click="onSave">Save</button>
              </div>
            </form>

            <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="d-block text-center">
                    <div class="card print-card">
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
                      <div class="mb-3">
                        <div class="d-flex justify-content-between">
                          <h6 class="font-weight-bold">Date: {{ new Date() }}</h6>
                          <h6 class="font-weight-bold">Réf: {{ admission.number }}/AD/DES/CAA/SA/{{ new Date().getFullYear() }}</h6>
                        </div>
                        <div class="d-flex">
                          <h6 class="font-weight-bold">Dear: {{ student.lastName }} {{ student.firstName }}</h6>
                        </div>
                        <div class="mt-4 text-center">
                          <h5 class="font-weight-bold">OFFER OF PROVISIONAL ADMISSION 
                            {{ new Date().getFullYear() - 1 +' / '+ new Date().getFullYear() }}
                          </h5>
                        </div>
                        <div class="text-left">
                          <p>
                            In reference to your application for admission as an undergraduate student of IRGIB-Africa, I 
                            am delighted to inform you that you have been offered provisional admission to undertake the 
                            following programme:
                          </p>
                          <p class="text-center font-weight-bold">Bachelor in Industrial Engineering </p>
                          <div class="col-6">
                            <div class="form-group row">
                              <label class="col-sm-3 text-left col-form-label">Option:</label>
                              <div class="col-sm-9">
                                <select class="form-control form-print" v-model="department">
                                  <option v-for="(option, index) in studentDepartments.options" :key="index">
                                    {{ option.text }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group row">
                              <label class="col-sm-3 text-left col-form-label">Specialty:</label>
                              <div class="col-sm-9">
                                <select class="form-control form-print" v-model="speciality">
                                  <option v-for="(speciality, index) in studentDepartments.specialities" :key="index">
                                    {{ speciality.text }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group row">
                              <label class="col-sm-3 text-left col-form-label">Duration:</label>
                              <div class="col-sm-9">
                                <input class="form-control form-print" type="text" v-model="duration">
                              </div>
                            </div>
                          </div>
                          <p>
                            All credentials (Originals) will be checked during registration. The University reserves the right to 
                            withdraw this admission if it is discovered that any of your claims in the application or documents 
                            submitted are false.
                          </p>
                          <p>
                            The rules and regulations governing the University must be strictly adhered to. Please contact your 
                            academic advisor for information on your course and academic information. 
                          </p>
                          <p>
                            As an indication of your acceptance of this provisional offer of admission, you are required to draw 
                            near the Office of the Accountant for the terms of payment.
                          </p>
                          <p>
                            For more information regarding registration, our programs and admission, please visit the school’s 
                            website: <u>www.irgibafrica.university</u> or by contacting us at <u>contact@irgibafrica.university</u>
                          </p>
                          <p>
                            Congratulations on receiving an offer into IRGIB-Africa University. If you have any questions or would 
                            like any further information at this time, please feel free to contact us. We look forward to welcoming 
                            you.
                          </p>
                          <p class="mt-2">Yours sincerely,</p>
                          <h6 class="font-weight-bold">Mr. Simon AMOUSSOU-GUENOU</h6>
                          <h6 class="font-weight-bold mt-5">The Registrar</h6>
                        </div>
                      </div>

                      <div class="nb-score">
                        <small class="text-primary mb-0">
                          Interregional University of Industrial Engineering, Biotechnologies and Applied Sciences (IRGIB-Africa University) 
                          07 BP 231 Cotonou, Benin Republic – Akpakpa Quartier JAK, beside Clinic Boni, Opposite René Pléven Stadium
                          Tel: +229 67 29 64 64 / 68 69 41 42 / 64 48 66 66 E-mail: <u class="text-info">contact@irgibafrica.university</u> website: <u class="text-info">www.irgibafrica.university</u>
                        </small>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-inverse-primary" @click="onPrint">Print</button>
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
export default {
  name: 'Edit_Student',

  data() {
    return {
      dear: '',
      department: '',
      speciality: '',
      duration: '',
      student: {
        id: this.$store.getters.currentStudents._id,
        shortid: this.$store.getters.currentStudents.shortid,
        matricule: this.$store.getters.currentStudents.matricule,
        firstName: this.$store.getters.currentStudents.firstName,
        lastName: this.$store.getters.currentStudents.lastName,
        sexe: this.$store.getters.currentStudents.sexe,
        birthDay: this.$store.getters.currentStudents.birthDay,
        birthPlace: this.$store.getters.currentStudents.birthPlace,
        nationnality: this.$store.getters.currentStudents.nationnality,
        admittedYear: this.$store.getters.currentStudents.admittedYear,
        livingYear: this.$store.getters.currentStudents.livingYear,
        department: this.$store.getters.currentStudents.department,
        level: this.$store.getters.currentStudents.level,
        certificate: this.$store.getters.currentStudents.certificate,
        address: this.$store.getters.currentStudents.address,
        city: this.$store.getters.currentStudents.city,
        phoneNumber: this.$store.getters.currentStudents.phoneNumber,
        country: this.$store.getters.currentStudents.country,
        status: this.$store.getters.currentStudents.status,
        createdAt: this.$store.getters.currentStudents.createdAt
      },
      admission: {
        id: this.$store.getters.getAdmissions[0]._id,
        number: this.$store.getters.getAdmissions[0].number,
      },
      statistic: {
        id: '',
        level: '',
        department: '',
        admittedYear: ''
      },
      studentStatistic: []
    }
  },

  computed: {
    currentStudents () {
      return this.$store.getters.currentStudents;
    },
    departments () {
      return this.$store.getters.getDepartments;
    },
    levels () {
      return this.$store.getters.getLevels;
    },
    admissions () {
      return this.$store.getters.getAdmissions;
    },
    statistics () {
      return this.$store.getters.getStatistics;
    },
    studentDepartments () {
      return this.$store.getters.getDepartments.find(dep => {
        return dep.slug == this.student.department
      })
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
    }
  },

  mounted() {
    console.log(this.$store.getters.currentStudents)
  },

  methods: {
    onSave (e) {
      e.preventDefault();
      if (confirm('Are you sure you want to update this item?')) {
        // this.$store.dispatch('editStudentSubmit', this.student);
        this.$db.findParams('statistics', {departmentSlug: this.student.department}, (err, item) => {
          if (item) {
            var mapLevel = item.levels.map(level => {
              return level
            })

            mapLevel.find(level => {
              if (level.text == this.student.level) {
                console.log(level)
                var mapStudent = level.students.map(student => {
                  return student
                })
                console.log(mapStudent)
                mapStudent.find(student => {
                  if (student.studentId == this.student.shortid) {
                    var index = mapStudent.indexOf(student.studentId)
                    level.students = level.students || []
                    level.students.splice(index, 1, {
                      studentId: this.student.shortid,
                      createdAt: this.student.createdAt,
                      updatedAt: new Date()
                    })
                    console.log(level)
                    return level
                  } else {
                    // level.students = level.students || []
                    // level.students.push({
                    //   studentId: this.student.shortid,
                    //   createdAt: new Date(),
                    //   updatedAt: new Date()
                    // })
                    return level
                  }
                })
              } else {
                
              }
            })
            console.log(item)
            // this.$store.dispatch('updateStatistic', item);
          }
        })
        // this.$router.push('/list-student');
      }
    },
    onCancel (e) {
      e.preventDefault();
      this.$router.push('/list-student');
    },
    onDelete (e) {
      e.preventDefault();
      const id = this.currentStudents.id
      if (confirm('Are you sure you want to delete this item?')) {
        this.$db.remove('students', this.currentStudents.id, (err, items) => {})
        this.$store.dispatch('removeStudent', this.student);
        this.$router.push('/list-student');
      }
    },
    onPrint() {
      window.print()
      this.admission.number += 1
      this.$store.dispatch('edit_AdmissionsSubmit', this.admission);
    },
  },
}
</script>

<style scoped>
  .logo {
    max-width: 330px;
    max-height: 90px;
  }
  .modal-xl {
    max-width: 1025px;
  }
  @media print {
    .modal-dialog {
      width: 100%;
      height: 100%;
      margin: 0 auto !important;
    }
    .modal-content {
      background-color: #fff !important;
      background-clip: padding-box !important;
      border: none !important;
      border-radius: 0 !important;
    }
    .modal-header,
    .modal-footer {
      display: none !important;
    }
    .modal-body {
      padding: 0 !important;
    }
    /* .nb-score {
      position: fixed;
      bottom: 0;
      left: 10px;
      right: 10px;
      margin: 0 auto;
      width: 100%;
      text-align: center;
    } */
    .form-print {
      border: none;
      color: #212529;
      appearance: none;
      -webkit-appearance: none;
      font-size: 0.875rem;
    }
    .print-card {
      padding: 0rem !important;
    }
  }
  .print-card {
    padding: 4rem;
  }
</style>

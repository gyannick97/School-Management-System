<template>
  <div>
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12 grid-margin">
          <div class="row">
            <div class="col-12 grid-margin">
              <div class="intro-banner text-center">
                <div class="banner-image w-100">
                  <img src="../../assets/images/dashboard/banner_img.png" alt="banner image">
                </div>
              </div>
            </div>
          </div>
          <div class="card card-statistics">
            <div class="row">
              <div class="card-col col-xl-3 col-md-6 col-6">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                    <i class="material-icons text-warning mr-0 mr-sm-4 icon-lg">supervisor_account</i>
                    <div class="wrapper text-center text-sm-left">
                      <p class="card-text mb-0">Pending</p>
                      <div class="fluid-container">
                        <h3 class="mb-0 font-weight-medium">{{ lPending | numberConvert }}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-col col-xl-3 col-md-6 col-6">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                    <i class="material-icons text-success mr-0 mr-sm-4 icon-lg">supervisor_account</i>
                    <div class="wrapper text-center text-sm-left">
                      <p class="card-text mb-0">Active</p>
                      <div class="fluid-container">
                        <h3 class="mb-0 font-weight-medium">{{ lActive | numberConvert }}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-col col-xl-3 col-md-6 col-6">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                    <i class="material-icons text-info mr-0 mr-sm-4 icon-lg">supervisor_account</i>
                    <div class="wrapper text-center text-sm-left">
                      <p class="card-text mb-0">Ex Student</p>
                      <div class="fluid-container">
                        <h3 class="mb-0 font-weight-medium">{{ lExStudent | numberConvert }}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-col col-xl-3 col-md-6 col-6">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                    <i class="material-icons text-danger mr-0 mr-sm-4 icon-lg">supervisor_account</i>
                    <div class="wrapper text-center text-sm-left">
                      <p class="card-text mb-0">Espelled</p>
                      <div class="fluid-container">
                        <h3 class="mb-0 font-weight-medium">{{ lEspelled | numberConvert }}</h3>
                      </div>
                    </div>
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
  data () {
    return {

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
  computed: {
    students () {
      return this.$store.getters.getStudents;
    },
    lPending () {
      let p = this.students.filter(student => {
        return student.status == "Pending"
      })
      return p.length ? p.length : 0
    },
    lActive () {
      let p = this.students.filter(student => {
        return student.status == "Active"
      })
      return p.length ? p.length : 0
    },
    lExStudent () {
      let p = this.students.filter(student => {
        return student.status == "Ex Student"
      })
      return p.length ? p.length : 0
    },
    lEspelled () {
      let p = this.students.filter(student => {
        return student.status == "Espelled"
      })
      return p.length ? p.length : 0
    }
  }
}
</script>
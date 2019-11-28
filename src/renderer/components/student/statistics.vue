<template>
  <div>
    <div class="content-wrapper">
      <div class="row">
        <div class="col-12 grid-margin">
          <div class="grid-margin stretch-card mt-4">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Student statistics</h4>
                <div v-for="(statistic, index) in statistics" :key="index" class="table-responsive mb-4">
                  <table class="table table-bordered">
                    <tr>
                      <th> Departments and Levels </th>
                      <th> Statistic </th>
                      <th> Total </th>
                    </tr>
                    <tr v-for="(level, index) in statistic.levels" :key="index">
                      <td> {{ level.text }} </td>
                      <th v-for="(level, index) in statistic.levels" :key="index">  </th>
                      <th> </th>
                    </tr>
                    
                  </table>
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
  name: 'List_Student',
  components: {
  },
  data() {
    return {
      search: {
        firstName: '',
        lastName: '',
        status: '',
        sexe: '',
        department: '',
        admittedYear: '',
        livingYear: ''
      },
      grouped: {}
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
    statistics () {
      return this.$store.getters.getStatistics;
    },
    groupByLevel () {
      // var ActLevels = this.$store.getters.getLevels.map(el => {
      //   return el.name
      // })
      // var ActDepartmenent = this.$store.getters.getDepartments.map(el => {
      //   return el.slug
      // })
      // let s = this.$store.getters.getStatistics.filter(slength => {
      //   slength.level == ActLevels
      // })
      // return s.length ? s.length : 0
      this.$store.getters.getStatistics.map(el => {
        el.students.map(l => {
          this.grouped[l.level] = this.grouped[l.level] || [];
          this.grouped[l.level].push({ id: l.id, createdAt: l.createdAt, updatedAt: l.updatedAt });
          return this.grouped[l.level]
        })
      })
      console.log(this.grouped)
    }
  },

  mounted() {
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
</style>

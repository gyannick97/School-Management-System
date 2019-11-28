import db from '../../services/index'

const state = {
  departments: [],
  currentDepartments: null,
}

const mutations = {
  INIT_DEPARTMENT (state, departments) {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.departments = departments.sort(compare)
  },
  
  ADD_DEPARTMENT (state, department) {
    state.departments.push(department)
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.departments = department.sort(compare)
  },

  REMOVE_DEPARTMENT (state, department) {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.departments = department.sort(compare)
  },

  EDIT_DEPARTMENT (state, item) {
    state.currentDepartments = item
  },

  EDIT_DEPARTMENT_SUBMIT (state, editedFamille) {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.departments = editedFamille.sort(compare)
  }
}

const actions = {
  initDepartment ({ commit }) {
    db.find('departments', (err, items) => {
      commit('INIT_DEPARTMENT', items)
    })
  },

  addDepartment ({ commit, state }, department) {
    db.find('departments', (err, items) => {
      commit('ADD_DEPARTMENT', items)
    })
  },

  removeDepartment ({ commit }, department) {
    db.remove('departments', department, (err, items) => {
      db.find('departments', (err, items) => {
        commit('REMOVE_DEPARTMENT', items)
      })
    })
  },

  editDepartment ({ commit }, department) {
    commit('EDIT_DEPARTMENT', department)
  },

  editDepartmentSubmit ({ commit }, department) {
    db.update('departments', department.id, department, (err, items) => {
      db.find('departments', (err, items) => {
        commit('EDIT_DEPARTMENT_SUBMIT', items)
      })
    })
  }
}

const getters = {
  getDepartments: state => {
    return state.departments;
  },
  currentDepartments: state => {
    return state.currentDepartments
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

import db from '../../services/index'

const state = {
  admissions:[]
}

const mutations = {
  setAdmissions (state, admission) {
    state.admissions = admission
  },
  admissionsSubmit (state, admission) {
    state.admissions = admission
  }
}

const actions = {
  initAdmission: ({ commit, state }) => {
    db.find('admissions', (err, items) => {
      commit('setAdmissions', items)
    })
  },
  edit_AdmissionsSubmit({ commit }, admissions) {
    db.update('admissions', admissions.id, admissions, (err, items) => {
      db.find('admissions', (err, items) => {
        commit('admissionsSubmit', items)
      })
    })
  }
}

const getters = {
  getAdmissions: state => {
    return state.admissions
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

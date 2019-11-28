import db from '../../services/index'

const state = {
  students: [],
  currentStudents: null,
}

const mutations = {
  INIT_STUDENT (state, students) {
    function compare(a, b) {
      if (a.lastName < b.lastName)
        return -1;
      if (a.lastName > b.lastName)
        return 1;
      return 0;
    }
    state.students = students.sort(compare)
  },
  
  NEW_STUDENT (state, student) {
    state.students.push(student)
    function compare(a, b) {
      if (a.lastName < b.lastName)
        return -1;
      if (a.lastName > b.lastName)
        return 1;
      return 0;
    }
    state.students = student.sort(compare)
  },

  REMOVE_STUDENT (state, student) {
    function compare(a, b) {
      if (a.lastName < b.lastName)
        return -1;
      if (a.lastName > b.lastName)
        return 1;
      return 0;
    }
    state.students = student.sort(compare)
  },

  EDIT_STUDENT (state, item) {
    state.currentStudents = item
  },

  EDIT_STUDENT_SUBMIT (state, editedFamille) {
    function compare(a, b) {
      if (a.lastName < b.lastName)
        return -1;
      if (a.lastName > b.lastName)
        return 1;
      return 0;
    }
    state.students = editedFamille.sort(compare)
  }
}

const actions = {
  initStudent ({ commit }) {
    db.find('students', (err, items) => {
      commit('INIT_STUDENT', items)
    })
  },

  newStudent ({ commit, state }, student) {
    db.find('students', (err, items) => {
      commit('NEW_STUDENT', items)
    })
  },

  removeStudent ({ commit }, student) {
    db.remove('students', student, (err, items) => {
      db.find('students', (err, items) => {
        commit('REMOVE_STUDENT', items)
      })
    })
  },

  editStudent ({ commit }, student) {
    commit('EDIT_STUDENT', student)
  },

  editStudentSubmit ({ commit }, student) {
    db.update('students', student.id, student, (err, items) => {
      db.find('students', (err, items) => {
        commit('EDIT_STUDENT_SUBMIT', items)
      })
    })
  }
}

const getters = {
  getStudents: state => {
    return state.students;
  },
  currentStudents: state => {
    return state.currentStudents
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

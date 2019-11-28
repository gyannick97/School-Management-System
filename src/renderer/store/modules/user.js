import db from '../../services/index'
import router from '../../router'

const state = {
  users: [],
  activeUser: {},
  logged: false,
  currentUsers: null,
}

const mutations = {
  INIT_USER (state, users) {
    if ("activeUser" in localStorage) {
      router.push({path: '/'})
    } else {
      router.push({path: '/login'})
    }
    function compare(a, b) {
      if (a.lastName < b.lastName)
        return -1
      if (a.lastName > b.lastName)
        return 1
      return 0
    }
    users.sort(compare)
    state.users = users
  },

  ADD_USER (state, user) {
    state.users.push(user)
    function compare(a, b) {
      if (a.lastName < b.lastName)
        return -1;
      if (a.lastName > b.lastName)
        return 1;
      return 0;
    }
    user.sort(compare)
    state.users = user
  },

  REMOVE_USER (state, user) {
    function compare(a, b) {
      if (a.lastName < b.lastName)
        return -1;
      if (a.lastName > b.lastName)
        return 1;
      return 0;
    }
    state.users = user.sort(compare)
  },

  SIGN_IN (state, user) {
    state.activeUser = user
    state.logged = true
    localStorage.setItem('activeUser', JSON.stringify(state.activeUser))
  },

  LOG_IN (state, user) {
    state.activeUser = user
    state.logged = true
  },

  LOG_OUT (state) {
    localStorage.removeItem('activeUser')
    state.activeUser = null
    state.logged = false
  },

  EDIT_USER (state, item) {
    state.currentUsers = item
  },

  EDIT_USER_SUBMIT (state, userData) {
    function compare(a, b) {
      if (a.lastName < b.lastName)
        return -1
      if (a.lastName > b.lastName)
        return 1
      return 0
    }
    userData.sort(compare)
    state.users = userData
  }
}

const actions = {
  initUser: ({commit, state}, users) => {
    return new Promise((resolve, reject) => {
      db.find('users', (err, items) => {
        if (err) {
          return reject(err);
        }

        commit('INIT_USER', items)
        if (localStorage.getItem('activeUser')) {
          commit('LOG_IN', JSON.parse(localStorage.getItem('activeUser')))
        }
        resolve(state.logged);
      })
    })
  },

  addUser({ commit }, users) {
    db.find('users', (err, items) => {
      commit('ADD_USER', items)
    })
  },

  removeUser({ commit }, users) {
    db.remove('users', users, (err, items) => {
      db.find('users', (err, items) => {
        commit('REMOVE_USER', items)
      })
    })
  },

  signIn({ commit }, users) {
    commit('SIGN_IN', users)
  },

  logOut({ commit }, users) {
    commit('LOG_OUT', users)
  },
  
  editUserSubmit({ commit }, userData) {
    db.update('users', userData.id, userData, () => {
      db.find('users', (err, items) => {
        commit('EDIT_USER_SUBMIT', items)
      })
    })
  },

  editUser ({ commit }, user) {
    commit('EDIT_USER', user)
  },
}

const getters = {
  getUsers: state => {
    return state.users
  },
  activeUser: state => {
    return state.activeUser
  },
  logged: state => {
    return state.logged
  },
  currentUsers: state => {
    return state.currentUsers
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

import db from '../../services/index'

const state = {
  levels: [],
  currentLevels: null,
}

const mutations = {
  INIT_LEVEL (state, levels) {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.levels = levels.sort(compare)
  },
  
  ADD_LEVEL (state, level) {
    state.levels.push(level)
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.levels = level.sort(compare)
  },

  REMOVE_LEVEL (state, level) {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.levels = level.sort(compare)
  },

  EDIT_LEVEL (state, item) {
    state.currentLevels = item
  },

  EDIT_LEVEL_SUBMIT (state, editedFamille) {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.levels = editedFamille.sort(compare)
  }
}

const actions = {
  initLevel ({ commit }) {
    db.find('levels', (err, items) => {
      commit('INIT_LEVEL', items)
    })
  },

  addLevel ({ commit, state }, level) {
    db.find('levels', (err, items) => {
      commit('ADD_LEVEL', items)
    })
  },

  removeLevel ({ commit }, level) {
    db.remove('levels', level, (err, items) => {
      db.find('levels', (err, items) => {
        commit('REMOVE_LEVEL', items)
      })
    })
  },

  editLevel ({ commit }, level) {
    commit('EDIT_LEVEL', level)
  },

  editLevelSubmit ({ commit }, level) {
    db.update('levels', level.id, level, (err, items) => {
      db.find('levels', (err, items) => {
        commit('EDIT_LEVEL_SUBMIT', items)
      })
    })
  }
}

const getters = {
  getLevels: state => {
    return state.levels;
  },
  currentLevels: state => {
    return state.currentLevels
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

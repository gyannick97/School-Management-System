import db from '../../services/index'

const state = {
  statistics: []
}

const mutations = {
  INIT_STATISTIC (state, statistics) {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.statistics = statistics.sort(compare)
  },
  
  ADD_STATISTIC (state, statistic) {
    state.statistics.push(statistic)
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.statistics = statistic.sort(compare)
  },

  UPDATE_STATISTIC (state, statistic) {
    state.statistics.push(statistic)
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.statistics = statistic.sort(compare)
  },

  REMOVE_STATISTIC (state, statistic) {
    function compare(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }
    state.statistics = statistic.sort(compare)
  }
}

const actions = {
  initStatistic ({ commit }) {
    db.find('statistics', (err, items) => {
      commit('INIT_STATISTIC', items)
    })
  },

  addStatistic ({ commit, state }, statistic) {
    db.find('statistics', (err, items) => {
      commit('ADD_STATISTIC', items)
    })
  },

  updateStatistic ({ commit, state }, statistic) {
    db.updateByShortid('statistics', statistic.shortid, statistic, (err, items) => {
      db.find('statistics', (err, items) => {
        commit('UPDATE_STATISTIC', items)
      })
    })
  },

  removeStatistic ({ commit }, statistic) {
    db.removeByShortid('statistics', statistic, (err, items) => {
      db.find('statistics', (err, items) => {
        commit('REMOVE_STATISTIC', items)
      })
    })
  },
}

const getters = {
  getStatistics: state => {
    return state.statistics;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

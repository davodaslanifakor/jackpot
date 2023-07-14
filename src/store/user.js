const state = {
  credits: 10,
};

const getters = {};

const mutations = {
  UPDATE_CREDITS(state, newVal) {
    state.credits = newVal;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

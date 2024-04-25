import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    countries: [],
    nameColumn: ['Название страны', 'Количество жителей', 'Столица', 'Месторасположение', 'Краткое описание']
  },
  getters: {
    getCountries: (state) => state.countries,
    getNameColumn: (state) => state.nameColumn,
  },
  mutations: {
    setCountries(state, countries) {
      state.countries = countries;
    },
  },
  actions: {
    async fetchCountries({ commit }) {
      try {
        const response = await axios.get('/data/country.json');
        commit('setCountries', response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    },
  },
})

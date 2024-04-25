<template>
  <nav>
    <router-link to="/">Home</router-link> | 
    <router-link to="/grid-table">Таблица на гридах</router-link> | 
    <router-link to="/drag-and-drop">Drag and Drop</router-link> | 
    <router-link to="/mutable-tables">Изменяемые таблицы</router-link>
  </nav>
  <router-view/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default { 
    methods: {
        ...mapActions({
            fetchCountries: 'fetchCountries',
        }),
    },
    mounted() {
        this.fetchCountries();
    },
};
</script>


<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  width: 100%;
  min-height: 100vh;
  height: max-content;
}
#app {
  min-height: 100vh;
  height: max-content;
  display: grid;
  grid-template-rows: max-content 1fr ;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  gap: 30px;
  justify-content: center;

  a {
    font-size: 20px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

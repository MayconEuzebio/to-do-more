<template>
  <div id="app">
    <Content></Content>
  </div>
</template>

<script>
// import Datepicker from 'vuejs-datepicker';
import Content from './components/Content';

export default {
  name: 'app',
  components: {
    Content,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.datepicker-input {
  border: none;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 5px;
  font-size: 1.15em;
  color: rgb(118, 121, 138);
  z-index: 1;
}

@media (min-width: 600px) {
  .md-dialog.md-reference {
    min-width: 500px;
  }
}
</style>

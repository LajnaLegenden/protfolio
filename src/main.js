import Vue from 'vue'
import App from './App.vue'
import router from './router'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

Vue.config.productionTip = false
Vue.config.performance = true;

import Nav from './components/NavBar.vue';

Vue.component('nav-bar', Nav);

const requireComponent = require.context('./components', true, /[A-Z]\w+\.(vue|js)$/)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )


  // Register component globally
  Vue.component(
    componentName,

    componentConfig.default || componentConfig
  )
})


window.app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


window.vm = {};
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Animate from 'animate.css/animate.css'
import Uimini from 'uimini/dist/css/uimini.css'

import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'

Vue.use(
  Vuelidate,
  Uimini,
  Animate
)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyClitldY--HXJXyHSb9sTSGYyoMsKpMqWk',
      authDomain: 'film-library-32566.firebaseapp.com',
      databaseURL: 'https://film-library-32566.firebaseio.com',
      projectId: 'film-library-32566',
      storageBucket: 'film-library-32566.appspot.com',
      messagingSenderId: '454768235004',
      appId: '1:454768235004:web:fcac4e2cfc0874ef822279',
      measurementId: 'G-LQ3SBENMDG'
    }
    firebase.initializeApp(firebaseConfig)
    // Поддержание логина при перезагрузке страницы
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadTasks')
    })
  }
})

console.log(Vue);

Vue.config.devtools = true;

const app = new Vue({
  el: '#app',
  data: {
    user,
    contacts,
    picUrl: './img/avatar',
    currentUser: 0,
  },
  methods: {
    setCurrentUser(index){
      this.currentUser = index;
    }
  },
});
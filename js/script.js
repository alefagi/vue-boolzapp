console.log(Vue);

Vue.config.devtools = true;

const app = new Vue({
  el: '#app',
  data: {
    user,
    contacts,
    picUrl: './img/avatar',
    currentUser: 0,
    messageText: '',
  },
  methods: {
    setCurrentUser(index){
      this.currentUser = index;
    },
    createMessage(index){
      let newMessage = {};
      newMessage.date = new Date();
      newMessage.message = this.messageText;
      newMessage.status = 'sent';
      this.contacts[index].messages.push(newMessage);
      this.messageText = '';
    },
  },
});
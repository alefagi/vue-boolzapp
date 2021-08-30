console.log(Vue);

Vue.config.devtools = true;

dayjs.extend(dayjs_plugin_customParseFormat);

const app = new Vue({
  el: '#app',
  data: {
    user,
    contacts,
    picUrl: './img/avatar',
    currentUser: 0,
    messageText: '',
    searchedContact: '',
    foundedUser: [],
  },
  methods: {
    setCurrentUser(index) {
      this.currentUser = index;
    },
    createMessage(index) {
      if(!this.messageText) return;
      const newMessage = {};
      newMessage.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
      newMessage.message = this.messageText;
      newMessage.status = 'sent';
      this.contacts[index].messages.push(newMessage);
      this.messageText = '';
      
      // metodo risposta automatica
      setTimeout(() => {
        const autoMessage = {};
        autoMessage.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
        autoMessage.message = 'ok';
        autoMessage.status = 'received';
        this.contacts[index].messages.push(autoMessage);
      }, 1000);
    },
    getLastAccess(index) {
      const sentMessages = this.contacts[index].messages.filter((item) => {
        if(item.status === 'sent') {
          return true;
        }
        return false;
      });
      return sentMessages[sentMessages.length-1].date;
    },
    searchContact() {
      this.contacts.forEach((contact) => {
        if(contact.name.toLowerCase().trim().includes(this.searchedContact.toLowerCase().trim())) {
          contact.visible = true;
        }
        else contact.visible =  false;
      });
      this.foundedUser = this.contacts.filter((contact) => {
        if(contact.name.toLowerCase().trim().includes(this.searchedContact.toLowerCase().trim())) {
          return true;
        }
        return false;
      });
    },
  },
});
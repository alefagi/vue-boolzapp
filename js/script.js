console.log(Vue);

Vue.config.devtools = true;

dayjs.extend(dayjs_plugin_customParseFormat);

const app = new Vue({
  el: '#app',
  data: {
    user,
    contacts,
    picUrl: './img/avatar',
    currentUser: null,
    messageText: '',
    searchedContact: '',
    foundedUser: contacts,
    currentMessage: null,
    isClicked: false,
    isTyping: false,
  },
  methods: {
    setCurrentUser(index) {
      this.currentUser = index;
    },
    setCurrentMessage(index) {
      this.currentMessage = index;
      this.isClicked = !this.isClicked;
    },
    createMessage(index) {
      if(!this.messageText) return;
      const newMessage = {};
      newMessage.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
      newMessage.message = this.messageText;
      newMessage.status = 'sent';
      this.contacts[index].messages.push(newMessage);
      this.messageText = '';
      setTimeout(() => {
        this.isTyping = true;
      }, 1000);
      
      // metodo risposta automatica
      setTimeout(() => {
        const autoMessage = {};
        autoMessage.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
        autoMessage.message = 'ok';
        autoMessage.status = 'received';
        this.contacts[index].messages.push(autoMessage);
        this.isTyping = false;
      }, 3000);
    },
    getLastAccess(index) {
      const sentMessages = this.contacts[index].messages.filter((item) => {
        if(item.status === 'sent') {
          return true;
        }
        return false;
      });
      if(sentMessages.length) {
        return sentMessages[sentMessages.length-1].date;
      }
      else return 'non disponibile';
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
    getLastMessage(array, index) {
      if(array.length) {
        return array[index].message.slice(0, 45);
      }
      else return '';
    },
    getLastDate(array, index) {
      if(array.length) {
        return array[index].date;
      }
      else return '"nessun messaggio presente"';
    }
  },
});
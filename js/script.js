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
    filteredContacts: contacts,
  },
  methods: {
    setCurrentUser(index){
      this.currentUser = index;
    },
    createMessage(index){
      const newMessage = {};
      newMessage.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
      newMessage.message = this.messageText;
      newMessage.status = 'sent';
      this.contacts[index].messages.push(newMessage);
      this.messageText = '';
    },
    createAutoMessage(index){
      setTimeout(() => {
        const autoMessage = {};
        autoMessage.date = dayjs().format('DD/MM/YYYY HH:mm:ss');
        autoMessage.message = 'ok';
        autoMessage.status = 'received';
        this.contacts[index].messages.push(autoMessage);
      }, 1000);
    },
    // da correggere errore su ricerca lettere non presenti in contatto
    // errrore compare quando dopo aver inserito la prima lettera, faccio click su un contatto, inserisco una seconda lettere che è presente
    searchContact(){
      this.filteredContacts = this.contacts.filter((contact) => {
        if(contact.name.toLowerCase().trim().includes(this.searchedContact.toLowerCase().trim())) {
          return true;
        }
        return false;
      });
    },
    getLastAccess(index){
      const sentMessages = this.contacts[index].messages.filter((item) => {
        if(item.status === 'sent') {
          return true;
        }
        return false;
      });
      return sentMessages[sentMessages.length-1].date;
    },
  },
});
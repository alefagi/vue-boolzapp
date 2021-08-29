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
    // IL PROBLEMA è SU HEADER RIGHT SECTION
    // da correggere errore su ricerca lettere non presenti in contatto
    // se clicco su luisa currentuser è 3, se cerco una lettera che esiste(quindi
    // la sezione destra è attiva perchè filteredContent ha una length),
    // cerca l'avatar con currentuser 3 (ma l'array non arriva a 3 e da errore)
    // già così se cerchiamo un utente e clicchiamo la data ultimo accesso è sbagliata
    searchContact(){
      this.filteredContacts = this.contacts.filter((contact) => {
        if(contact.name.toLowerCase().trim().includes(this.searchedContact.toLowerCase().trim())) {
          return true;
        }
        return false;
      });
      console.log(this.filteredContacts); // da rimuovere
      console.log(this.currentUser); // da rimuovere
      this.currentUser = 0;  // dovrei aver risolto resettando il currentUser a 0 in modo che nei filteredContacts si riparte da 0 come index
    },
    getLastAccess(index){
      const sentMessages = this.filteredContacts[index].messages.filter((item) => {
        if(item.status === 'sent') {
          return true;
        }
        return false;
      });
      return sentMessages[sentMessages.length-1].date;
    },
  },
});
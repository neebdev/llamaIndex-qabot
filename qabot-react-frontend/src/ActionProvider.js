import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  //method for add message in our chatbot
  addMessageToBotState = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };
  SelectZone = () =>{
    const message = this.createChatBotMessage(`Which one of these Freezones are you intersested in?` ,
  {
    withAvatar: true,
    widget: "SelectZone",
  })
  this.addMessageToBotState(message);
  }
  SelectADGM = () => {
    const url = 'http://127.0.0.1:5000/initialize';
    const data = { index_path: 'indices/adgm_index.json' };
      
    axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(response => {
      const selectedZone = 'ADGM, Abu Dhabi Global Market';
      const message = this.createChatBotMessage(`Ask any question related to ${selectedZone}! You can change the Freezone by typing "select".`);
      this.addMessageToBotState(message);
      localStorage.setItem('selectedZone', selectedZone);
    })
    .catch(error => {
      const message = this.createChatBotMessage(`Oops! Something went wrong. ${error}`);
      this.addMessageToBotState(message);

    });
  }

  SelectDAFZ = () =>{
    const url = 'http://127.0.0.1:5000/initialize';
    const data = { index_path: 'indices/dafz_index.json' };
    
    axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => {
        const selectedZone = 'DAFZ, Dubai Airport Freezone';
        const message = this.createChatBotMessage(`Ask any question related to ${selectedZone}! You can change the Freezone by typing "select".`);
        this.addMessageToBotState(message);
        localStorage.setItem('selectedZone', selectedZone);
      })
      .catch(error => {
        const message = this.createChatBotMessage(`Oops! Something went wrong. ${error}`);
        this.addMessageToBotState(message);
      });
  }
  SelectDMCC = () =>{
    const url = 'http://127.0.0.1:5000/initialize';
    const data = { index_path: 'indices/dmcc_index.json' };
    
    axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => {
        const selectedZone = 'DMCC, Dubai Multi Commodities Centre';
        const message = this.createChatBotMessage(`Ask any question related to ${selectedZone}! You can change the Freezone by typing "select".`);
        this.addMessageToBotState(message);
        localStorage.setItem('selectedZone', selectedZone);
      })
      .catch(error => {
        const message = this.createChatBotMessage(`Oops! Something went wrong. ${error}`);
        this.addMessageToBotState(message);
      });
  }
  SelectDubaiDesign = () =>{
    const url = 'http://127.0.0.1:5000/initialize';
    const data = { index_path: 'indices/dubaidesign_index.json' };
    
    axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => {
        const selectedZone = 'Dubai Design District';
        const message = this.createChatBotMessage(`Ask any question related to ${selectedZone}! You can change the Freezone by typing "select".`);
        this.addMessageToBotState(message);
        localStorage.setItem('selectedZone', selectedZone);
      })
      .catch(error => {
        const message = this.createChatBotMessage(`Oops! Something went wrong. ${error}`);
        this.addMessageToBotState(message);
      });
  }

  handleDefault = (query) => {
    const selectedZone = localStorage.getItem('selectedZone');
    if(selectedZone && query !== ""){
      const url = 'http://127.0.0.1:5000/query';
    const data = { query: query };
    
    axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => {
        const message = this.createChatBotMessage(response.data.response);
        this.addMessageToBotState(message);
      })
      .catch(error => {
        const message = this.createChatBotMessage(`Oops! Something went wrong. Error: ${error}`);
        this.addMessageToBotState(message);
      });
    }
    else{
      const message = this.createChatBotMessage(`Which one of these Freezones are you intersested in?` ,
  {
    withAvatar: true,
    widget: "SelectZone",
  })
  this.addMessageToBotState(message);
    }
  };
}

export default ActionProvider;

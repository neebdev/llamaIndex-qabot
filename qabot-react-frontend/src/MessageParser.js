class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse = (message) => {
    if(message === "select"){
      return this.actionProvider.SelectZone();
    }
    return this.actionProvider.handleDefault(message);

  };
}

export default MessageParser;

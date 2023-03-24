import { createChatBotMessage } from "react-chatbot-kit";
import SelectZone from "./widgets/SelectZone.js";

const botName = "QA Bot";
const config = {
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  initialMessages: [createChatBotMessage(`Hi, I am ${botName}. Which one of these Freezones are you intersested in?` ,
  {
    withAvatar: true,
    widget: "SelectZone",
  })
],
  widgets: [
    {
      widgetName: "SelectZone",
      widgetFunc: (props) => <SelectZone {...props} />,
      mapStateToProps: ["SelectZone"],
    }
  ],
};

export default config;
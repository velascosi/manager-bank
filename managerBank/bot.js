const { ActivityTypes } = require('botbuilder');

// Turn counter property
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';

class MyBot {
  /**
   *
   * @param {ConversationState} conversation state object
   */
  constructor(conversationState) {
    // Creates a new state accessor property.
    // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
    this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
    this.conversationState = conversationState.prompt1;
  }


  /**
   *
   * @param {TurnContext} on turn context object.
   */
  async onTurn(turnContext) {
    if (turnContext.activity.type === ActivityTypes.Message) {
      // read from state.
      let count = await this.countProperty.get(turnContext); 
      count = count === undefined ? 1 : ++count; //apos o inicio da conversa este sera a continuidade na conversa (count = salvar info)
      if (turnContext.activity.text == 'Criar TEA') {
        await turnContext.sendActivity(`${count}: Qual o seu modelo de TEA?`);
      } else {
        await turnContext.sendActivity(`${count}: She said "${turnContext.activity.text}"`);
      }
      //ele vai tratar a menssagem 1)conta 2)

      // increment and set turn counter.
      await this.countProperty.set(turnContext, count);
    } else {
      await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
    }

    // Save state changes
    await this.conversationState.saveChanges(turnContext);
  }
}

module.exports.MyBot = MyBot;
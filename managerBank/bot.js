const { ActivityTypes } = require('botbuilder');

// Turn counter property
const TURN_COUNTER_PROPERTY = 'turnCounterProperty';
const LAST_QUESTION = 'lastQA';

var contador = 0; 

class MyBot {
  constructor(conversationState) {
  }

  
  async onTurn(turnContext) {
    if (turnContext.activity.type === ActivityTypes.Message) {

      contador +=1;

      if(contador == 1) {
        return turnContext.sendActivity('furadeira')        
      }

      // if(contador == 2) {
      //   return turnContext.sendActivity('quer tomar cafe?')        
      // }

      contador = 0;

      return turnContext.sendActivity('32')
    }
  }
}

module.exports.MyBot = MyBot;
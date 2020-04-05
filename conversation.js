const inquirer = require("inquirer");

module.exports = class Conversation {
  constructor(dialoguePath) {
    const loadedDialogue = require(dialoguePath);
    this.dialogue = loadedDialogue;
  }
  //handle the client reply
  reply(answer) {
    let selectedQA = {};
    if (answer === "") {
      selectedQA = this.dialogue[0];
      return this.print(selectedQA);
    }
    //else
    selectedQA = this.dialogue.find((d) => d.id === answer);
    if (selectedQA.answerOptions) {
      return this.print(selectedQA);
    } else {
      console.log(selectedQA.question);
      return selectedQA.question;
    }
  }
  //to print the dialogue using the inquirer package
  print(selectedQA) {
    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "answer",
          message: selectedQA.question,
          choices: selectedQA.answerOptions.map((option, index) => {
            const choice = {};
            choice.name = option.answer;
            choice.value = index;
            return choice;
          }),
        },
      ])
      .then(({ answer }) => {
        return this.reply(selectedQA.answerOptions[answer].nextState);
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Prompt couldn't be rendered in the current environment");
        } else {
          console.log("Oops... Something went wrong!!!");
        }
      });
  }
};

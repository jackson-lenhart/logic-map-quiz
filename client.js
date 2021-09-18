'use strict';

var STATE = {
  questionIndex: 0
};

var allQuestions = [
  {
    question: 'I need to clean my...',
    choices: ['Home', 'Business']
  },
  {
    question: 'I need to clean a...',
    choices: [
      'Small Room (~300sq ft)',
      'Large Room (~800sq ft)',
      'Lots of Rooms (~1250sq ft)',
      'Entire Home/ Business (depending on previous answer) (~2500+sq ft)'
    ]
  },
  {
    question: 'I want to...',
    choices: ['Disinfect the area', 'Purify the air', 'Disinfect & purify']
  },
];

function cleanupNode(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

window.addEventListener('load', function() {
  var questionEl = document.getElementById('question');
  var choicesEl = document.getElementById('choices');
  var nextButton = document.getElementById('next');

  function renderQuestion() {
    questionEl.textContent = allQuestions[STATE.questionIndex].question;

    allQuestions[STATE.questionIndex].choices.forEach(function(choice, choiceIndex) {
      var choiceId = '' + STATE.questionIndex + choiceIndex;

      var choiceInputEl = document.createElement('input');
      choiceInputEl.type = 'radio';
      choiceInputEl.id = choiceId;
      choiceInputEl.value = choice;

      var choiceLabelEl = document.createElement('label');
      choiceLabelEl.htmlFor = choiceId;
      choiceLabelEl.textContent = choice;

      choicesEl.appendChild(choiceInputEl);
      choicesEl.appendChild(choiceLabelEl);

      choicesEl.appendChild(document.createElement('br'));
    });
  }

  renderQuestion();

  nextButton.addEventListener('click', function() {
    cleanupNode(choicesEl);

    STATE.questionIndex++;

    if (STATE.questionIndex >= allQuestions.length) {
      questionEl.textContent = 'DONE';
    } else {
      renderQuestion();
    }
  });
});

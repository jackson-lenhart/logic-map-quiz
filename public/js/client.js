'use strict';

var STATE = {
  questionIndex: 0,
  selections: []
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
      'Huge area (~2500+sq ft)'
    ]
  },
  {
    question: 'I want to...',
    choices: ['Disinfect the area', 'Purify the air', 'Disinfect & purify']
  },
  {
    choices: ['Reset']  // Results will be displayed at this point. Question to be filled out based on outcome
  }
];

var allOutcomes = {
  '001020': {
    productId: 1,
    description: 'We recommend the Apollo UV-C Disinfection Lamp for your home'
  },
  '001021': {
    productId: 2,
    description: 'We recommend the SmartAir Air Purifier for your home'
  },
  '001022': {
    productId: 3,
    description: 'We recommend the Complete Home Bundle'
  },
  '001120': {
    productId: 4,
    description: 'We recommend two Apollo UV-C Disinfection Lamps for your home'
  },
  '001121': {
    productId: 5,
    description: 'We recommend a SmartAir Pro & a SmartAir Air Purifier for your home'
  },
  '001122': {
    productId: 6,
    description: 'We recommend two Apollo units & two SmartAir units for your home'
  },
  '001220': {
    productId: 7,
    description: 'We recommend the Apollo UV-C Disinfection Lamp 4-Pack for your home'
  },
  '001221': {
    productId: 8,
    description: 'We recommend the SmartAir Air Purifier 4-Pack for your home'
  },
  '001222': {
    productId: 9,
    description: 'We recommend the Smart UV Business Pack for your home'
  },
  '001320': {
    productId: 10,
    description: 'We recommend two Apollo UV-C Disinfection Lamp 4-Packs for your home'
  },
  '001321': {
    productId: 11,
    description: 'We recommend two SmartAir Air Purifier 4-Packs for your home'
  },
  '001322': {
    productId: 12,
    description: 'We recommend two Apollo UV-C Disinfection Lamp 4-Packs, one SmartAir Air Purifier & two SmartAir Pros for your home'
  },
  '011020': {
    productId: 13,
    description: 'We recommend the Apollo UV-C Disinfection Lamp for your business'
  },
  '011021': {
    productId: 14,
    description: 'We recommend the SmartAir Air Purifier for your business'
  },
  '011022': {
    productId: 15,
    description: 'We recommend the Complete Home Bundle'
  },
  '011120': {
    productId: 16,
    description: 'We recommend two Apollo UV-C Disinfection Lamps for your business'
  },
  '011121': {
    productId: 17,
    description: 'We recommend a SmartAir Pro & a SmartAir Air Purifier for your business'
  },
  '011122': {
    productId: 18,
    description: 'We recommend two Apollo UV-C Disinfection Lamps, a SmartAir Pro & a SmartAir Air Purifier for your business'
  },
  '011220': {
    productId: 19,
    description: 'We recommend the Apollo UV-C Disinfection Lamp 4-Pack for your business'
  },
  '011221': {
    productId: 20,
    description: 'We recommend the SmartAir Air Purifier 4-Pack for your business'
  },
  '011222': {
    productId: 21,
    description: 'We recommend the Smart UV Business Pack for your business'
  },
  '011320': {
    productId: 22,
    description: 'We recommend two Apollo UV-C Disinfection Lamp 4-Packs for your business'
  },
  '011321': {
    productId: 23,
    description: 'We recommend two SmartAir Air Purifier 4-Packs for your business'
  },
  '011322': {
    productId: 24,
    description: 'We recommend two Apollo UV-C Disinfection Lamp 4-Packs, one SmartAir Air Purifier & two SmartAir Pros for your home'
  }
};

function cleanupNode(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

window.addEventListener('load', function() {
  var questionEl = document.getElementById('question');
  var choicesEl = document.getElementById('choices-container');

  function renderQuestion() {
    if (STATE.questionIndex < allQuestions.length - 1) {  // -1 because of reset question
      var currentNumQuestionEl = document.getElementById('num-question-' + STATE.questionIndex);
      currentNumQuestionEl.style = 'background-color: #3a75ff;';
      questionEl.textContent = allQuestions[STATE.questionIndex].question;
    } else {
      // Set outcome as final 'reset' question
      var selectionStr = '';
      STATE.selections.forEach(function(selection) {
        selectionStr = selectionStr.concat(selection);
      });

      questionEl.textContent = allOutcomes[selectionStr].description;
    }

    allQuestions[STATE.questionIndex].choices.forEach(function(choice, choiceIndex) {
      var choiceId = '' + STATE.questionIndex + choiceIndex;

      var choiceText = document.createElement('h3');
      choiceText.className = 'choice-text';
      choiceText.textContent = choice;

      var choiceButtonEl = document.createElement('div');
      choiceButtonEl.id = choiceId;
      choiceButtonEl.className = 'choice-button';

      choiceButtonEl.appendChild(choiceText);

      choiceButtonEl.addEventListener('click', function(event) {
        if (event.target.tagName === 'H3') {
          STATE.selections.push(event.target.parentNode.id);
        } else {
          STATE.selections.push(event.target.id);
        }

        cleanupNode(choicesEl);
        ['0', '1', '2'].forEach(function(numChar) {
          // Reset number to gray
          var el = document.getElementById('num-question-' + numChar);
          if (el.hasAttribute('style'))  el.removeAttribute('style');
        });

        STATE.questionIndex++;
        if (STATE.questionIndex === allQuestions.length) {
          // If we get here the reset button was pressed.
          STATE.questionIndex = 0;
          STATE.selections = [];
        }

        renderQuestion();
      });

      choicesEl.appendChild(choiceButtonEl);
    });
  }

  renderQuestion();
});

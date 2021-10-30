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
];

var allOutcomes = {
  '001020': {
    productId: 1,
    description: 'Wants to disinfect a small room in a home.'
  },
  '001021': {
    productId: 2,
    description: 'Wants to purify a small room in a home.'
  },
  '001022': {
    productId: 3,
    description: 'Wants to disinfect and purify a small room in a home.'
  },
  '001120': {
    productId: 4,
    description: 'Wants to disinfect a large room in a home.'
  },
  '001121': {
    productId: 5,
    description: 'Wants to purify a large room in a home.'
  },
  '001122': {
    productId: 6,
    description: 'Wants to disinfect and purify a large room in a home.'
  },
  '001220': {
    productId: 7,
    description: 'Wants to disinfect multiple rooms in a home.'
  },
  '001221': {
    productId: 8,
    description: 'Wants to purify multiple rooms in a home.'
  },
  '001222': {
    productId: 9,
    description: 'Wants to disinfect and purify multiple rooms in a home.'
  },
  '001320': {
    productId: 10,
    description: 'Wants to disinfect an entire home.'
  },
  '001321': {
    productId: 11,
    description: 'Wants to purify an entire home.'
  },
  '001322': {
    productId: 12,
    description: 'Wants to disinfect and purify an entire home.'
  },
  '011020': {
    productId: 13,
    description: 'Wants to disinfect a small room for a business.'
  },
  '011021': {
    productId: 14,
    description: 'Wants to purify a small room for a business.'
  },
  '011022': {
    productId: 15,
    description: 'Wants to disinfect and purify a small room for a business.'
  },
  '011120': {
    productId: 16,
    description: 'Wants to disinfect a large room for a business.'
  },
  '011121': {
    productId: 17,
    description: 'Wants to purify a large room for a business.'
  },
  '011122': {
    productId: 18,
    description: 'Wants to disinfect and purify a large room for a business.'
  },
  '011220': {
    productId: 19,
    description: 'Wants to disinfect multiple rooms for a business.'
  },
  '011221': {
    productId: 20,
    description: 'Wants to purify multiple rooms for a business.'
  },
  '011222': {
    productId: 21,
    description: 'Wants to disinfect and purify multiple rooms for a business.'
  },
  '011320': {
    productId: 22,
    description: 'Wants to disinfect an entire business.'
  },
  '011321': {
    productId: 23,
    description: 'Wants to purify an entire business.'
  },
  '011322': {
    productId: 24,
    description: 'Wants to disinfect and purify an entire business.'
  }
};

function cleanupNode(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

window.addEventListener('load', function() {
  var questionEl = document.getElementById('question');
  var choicesEl = document.querySelector('.quiz-button-box');

  function renderQuestion() {
    var currentNumQuestionEl = document.getElementById('num-question-' + STATE.questionIndex);
    currentNumQuestionEl.className = 'quiz-num-block _1';

    questionEl.textContent = allQuestions[STATE.questionIndex].question;

    allQuestions[STATE.questionIndex].choices.forEach(function(choice, choiceIndex) {
      var choiceId = '' + STATE.questionIndex + choiceIndex;

      var choiceText = document.createElement('h3');
      choiceText.className = 'small-sub-text button';
      choiceText.textContent = choice;

      var choiceButtonEl = document.createElement('div');
      choiceButtonEl.className = 'quiz-button';
      choiceButtonEl.id = choiceId;

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
          document.getElementById('num-question-' + numChar).className = 'quiz-num-block _2';
        })
        STATE.questionIndex++;

        if (STATE.questionIndex >= allQuestions.length) {
          var selectionStr = '';
          STATE.selections.forEach(function(selection) {
            selectionStr = selectionStr.concat(selection);
          });

          questionEl.style.display = 'none';
          choicesEl.style.display = 'none';

          var resultsEl = document.getElementById('results');
          resultsEl.textContent = allOutcomes[selectionStr].description + '  (Dummy Product ID: ' + allOutcomes[selectionStr].productId + ').';
        } else {
          renderQuestion();
        }
      });

      choicesEl.appendChild(choiceButtonEl);
    });
  }

  renderQuestion();
});

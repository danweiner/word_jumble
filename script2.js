var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var words = [{ 
    text: "lion",
    hint: "Animal that roars",
    components: ["l", "i", "o", "n", "n"]
  }, {
    text: "zebra",
    hint: "Animal with stripes",
    components: ["z", "e", "b", "b","r", "a"]
  }, {
    text: "horse",
    hint: "Animal with runs quickly",
    components: ["h", "o", "o", "r", "s", "e"]
  	}
  ]


function getRandomWord(myWords) {
	var randomNumber = Math.floor(Math.random()*(myWords.length));
	var randomWord = myWords[randomNumber];
	return randomWord;
}


var numberOfButtons = 7 //max buttons on screen

function getButtonLetters(thisWord){
  
  	var buttonLetters = [];
  // set number of buttons equal to letters in the word (array)
 	var myLetters = thisWord.components;

  	myLetters = _.uniq(myLetters);

  	// console.log(thisWord[0].components);
 	for (var i = 0; i < myLetters.length; i++) {
   	 	buttonLetters.push(myLetters[i]);
  	}
  	// Add buttons word length to number of buttons 
  	// Remove duplicate letters from button letters
  	for(var i = myLetters.length; i < numberOfButtons; i++) {
  		var difference = _.difference(letters, buttonLetters);
  		console.log(difference);
  		// var letterSample = letters.splice(letters.length, thisWord.components.length)
    	var randomLetters = _.sample(difference) // uses underscore.js to get random letters from array
    	console.log(randomLetters);
    	buttonLetters.push(randomLetters); 
  	}

  	var shuffleLetters = _.shuffle(buttonLetters)
  	return shuffleLetters; 
  
}


$(document).ready(function() {


	// Get input from user for number of questions
  	var condition= false;
  	do {
     	var myNum= prompt("Enter number");
         	if (isNaN(myNum) === true) {
            	condition=false;
           	} else {
           		condition=true;
           	}
 	} while(condition===false);

  	var answerLetters = [];
  
  	$('#next-button').append('<button class="btn btn-success">'+ 'Next' +'</button>');

  
  	function setBoard() {
	  	var myWord = getRandomWord(words);
	    var buttonLetters = getButtonLetters(myWord);
	    var answer = myWord.components;
	    var correct = [];
	    var hint = myWord.hint;
	    var text = myWord.text;
	    var incorrect = [];

    
	 

	  	for (var i = 0; i < myWord.components.length; i++) {
	    	answerLetters.push(" " + '_' + " ");
	    	console.log(answerLetters);
	    }

	  	$.each(buttonLetters, function(index, letter){
	     	var el = $('<button class="btn btn-default btn-letter" data-letter="'+letter+'">'
	      	+ letter +'</button>');
	    	$('#letter-options').append(el);
	  	});

	  	$('#hint').html(hint);
	  	$('#letters').html(answerLetters);

	 
	  	$('.btn-letter').click(function(event){
	    	console.log(event.target)
	    	var el = $(event.target)
	    	var myLetter = el.data('letter')
	    	var index = count(answer, myLetter);
	    
	    // console.log(index)

		    // For words with multiple of same letters, track index
			function count(array,element){
			  var counts = [];
			    for (i = 0; i < array.length; i++){
			      if (array[i] === element) {  
			        counts.push(i);
			      }
			    }
			  return counts;
			}  
		
			// When button letter clicked, add letter to answerLetters array, hide button, display letter on screen
			for (var i = 0; i < index.length; i++) {
				if (answer.indexOf(myLetter) !== -1) {
					answerLetters[index[i]] = myLetter;
					el.hide();
					$('#letters').html(answerLetters);

		 		} 	
		 	}

		 	if (answer.toString() == answerLetters.toString()) {
				$('#answer').html(text);
		      	$('#letters').text("Your letters are " + answerLetters);
		       	var currentValue = parseInt($("#score").text(),10);
		      	var newValue = currentValue + 1;
					$("#score").text(newValue);
			} 

			if (newValue == myNum) {
				alert("game over");
				$("#score").html('0');
				$('#letters').empty();
    			$('#answer').empty();
    			$('#letter-options').empty();
    			$('#hint').empty();
    			var nextGame = prompt('Do you want to play again?');

			}
		

	  	})
	}

	// Check if answer array same as answerLetters (word is correct)
	
	setBoard();
	

  	$('#next-button').click(function(){
    
    	$('#letters').empty();
    	$('#answer').empty();
    	$('#letter-options').empty();
    	answerLetters = [];

    	// console.log(buttonLetters);

    	setBoard();

   
  	})

});

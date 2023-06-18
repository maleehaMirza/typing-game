// Name: Maleeha 
// Date: Jun 11, 2023

const quotes = ['When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
'There is nothing more deceptive than an obvious fact.',
'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
'I never make exceptions. An exception disproves the rule.',
'What one man can invent another can discover.',
'Nothing clears up a case so much as stating it to another person.',
'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];


// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// the starting time
let startTime = Date.now();

const quoteElement = document.getElementById('quote'); 
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

// var is available before declaration, is a mutable variable type (can reassign it, change data type), is function scoped 

// let is similar but is available only after declaration, is block scoped (available in curly brackets), can be changed in scope (only change in curly brackets)

// const is block scoped, cannot be changed (can be assigned, not reassigned), Only available after declaration 

// Use const as default, let in loops\


// When user clicks start, selects quote, sets up user interface, and starts timer
document.getElementById('start').addEventListener('click', () => { // Checks when user clicks 'start'
    // Math.random() returns random number between 0 inclusive and 1 exclusive  
    // get a random quote
    const quoteIndex = Math.floor(Math.random() * quotes.length); // Picks index between 0 and 7
    const quote = quotes[quoteIndex]; // Gets the quote at that index

    // Splits the quote further into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;

    // span element refers to part of text 
    // Create an array of spanWords, which contains each word inside a span element
    // This will allow us to highlight the word on the display
    const spanWords = words.map(function(word) { return `<span>${word} </span>`}); // Creates array of words in that quote
    
    // gets html content of element with id "quote"
    quoteElement.innerHTML = spanWords.join(''); // Put quote on display by converting quote from array into string 

    quoteElement.childNodes[0].className = 'highlight'; // Highlights first word 

    messageElement.innerText = ''; // Clears prior messages

    // innerText returns all plain text contained by an element and all its child elements.
    // innerHtml returns all text, including html tags, that is contained by an element.

    // In HTML: 
    // This element is <strong>strong</strong> and     has some super fun <code>code</code>!

    /* getValue.innerHTML

    This element is <strong>strong</strong> and has    some super fun <code>code</code>!

    getValue.innerText

    This element is strong and has some super fun code!
    */

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler

    // Start the timer
    startTime = new Date().getTime();

});

typedValueElement.addEventListener('input', () => {
    
    const currentWord = words[wordIndex]; // Gets current word
    const typedValue = typedValueElement.value; // Gets the typed value/word that user enters
    
    // Checks if user is at end of sentence and the last word is correct
    // === -> type and value must be equal for it to return true
    if (typedValue === currentWord &&  wordIndex === words.length - 1){ 
        
        const elapsedTime = new Date().getTime() - startTime;
        const message = `CONGRATULATIONS 🎉! You finished in ${elapsedTime / 1000} seconds.`;
        messageElement.innerText = message; // Displays message to user
    }
    // Checks when user is at middle of sentence and typed correct word (at end of word)
    // trim() removes whitespace from string (spaces)
    else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typedValueElement.value = ''; // Resets typed value so user can enter next word
        wordIndex++; // Goes to next word in quote

        // Reset all class names so you can highlight next word
        for (const wordElement of quoteElement.childNodes) {  
            wordElement.className = '';
        }

        // highlight the next word
        quoteElement.childNodes[wordIndex].className = 'highlight'; // childnodes are like array of strings to iterate through
    }
    else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    }
    else {
        typedValueElement.className = "error";
    }

});
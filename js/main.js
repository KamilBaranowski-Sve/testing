function prepareText() {
    // english texts
    let textEnglishTitle = [];
    let textEnglishAuthor = [];
    let textEnglishText = [];

// swedish texts
    let textSwedishTitle = [];
    let textSwedishAuthor = [];
    let textSwedishText = [];

    // check ignore_cases setting
    let ignoreCasesButtonChecked = document.getElementById('ignore_cases').checked;

    // XML request
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.open('GET', '../texts.xml');


    const textsObject = [
        {
            id: 0,
            title: "Katherine",
            author: "Abraham Lincoln",
            language: "english",
            text: "I am not bound to win, but I am bound to be true. I am not bound to succeed, but I am bound to live by the light that I have. I must stand with anybody that stands right, and stand with him while he is right, and part with him when he goes wrong."
        },
        {
            id: 1,
            title: "Love and Weirdness",
            author: "Dr. Seuss",
            language: "english",
            text: "We are all a little weird and life's a little weird, and when we find someone whose weirdness is compatible with ours, we join up with them and fall in mutual weirdness and call it love."
        },
        {
            id: 2,
            title: "Integrity",
            author: "Francis Bacon",
            language: "english",
            text: "It's not what we eat but what we digest that makes us strong; not what we gain but what we save that makes us rich; not what we read but what we remember that makes us learned; and not what we profess but what we practice that gives us integrity."
        },
        {
            id: 3,
            title: "The Odyssey",
            author: "Homer",
            language: "english",
            text: "May the gods grant you all things which your heart desires, and may they give you a husband and a home and gracious concord, for there is nothing greater and better than this - when a husband and wife keep a household in oneness of mind, a great woe to their enemies and joy to their friends, and win high renown."
        }
    ];


    console.log(textsObject[0].author);

    let authorsTemp = textsObject.map(function (textEntry){
        return textEntry.author;
    })

    console.log(authorsTemp);

    xmlRequest.onload = () => {
        const data = xmlRequest.response;
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, 'application/xml');



        // adding data into texts arrays
        let titles = xml.getElementsByTagName('title');
        let authors = xml.getElementsByTagName('author');
        let languages = xml.getElementsByTagName('language');
        let texts = xml.getElementsByTagName('text');

        for (let i = 0; i < languages.length; i++) {
            if (languages[i].firstChild.nodeValue === "english") {
                textEnglishTitle.push(titles[i].firstChild.nodeValue);
                textEnglishAuthor.push(authors[i].firstChild.nodeValue);
                textEnglishText.push(texts[i].firstChild.nodeValue);
            } else if (languages[i].firstChild.nodeValue === "swedish") {
                textSwedishTitle.push(titles[i].firstChild.nodeValue);
                textSwedishAuthor.push(authors[i].firstChild.nodeValue);
                textSwedishText.push(texts[i].firstChild.nodeValue);
            }
        }

        // creating additional options inside Choose text menu
        let languageEnglish = document.getElementById('language_english');
        let languageSwedish = document.getElementById('language_swedish');
        let numberTexts;

        if (languageEnglish.checked) {
            numberTexts = textEnglishTitle.length;
        } else {
            numberTexts = textSwedishTitle.length;
        }

        for (let i = 0; i < (numberTexts - 1); i++) {
            let newOption = document.createElement('option');
            document.getElementById('choose_text_list').appendChild(newOption);
        }

        // filling choose text list with values
        let textList = document.getElementById('choose_text_list');

        for (let i = 0; i < textList.childElementCount; i++) {
            if (languageEnglish.checked) {
                textList[i].innerHTML = textEnglishTitle[i];
            } else if (languageSwedish.checked) {
                textList[i].innerHTML = textSwedishTitle[i];
            }
        }

        // filling title, author and text with initial values
        let textTitle = document.getElementById('text_title');
        let textAuthor = document.getElementById('text_author');

        let textContentTemp = document.createElement('div');

        if (languageEnglish.checked) {
            textTitle.innerHTML = textEnglishTitle[0];
            textAuthor.innerHTML = textEnglishAuthor[0];
            textContentTemp.innerHTML = textEnglishText[0];
        } else if (languageSwedish.checked) {
            textTitle.innerHTML = textSwedishTitle[0];
            textAuthor.innerHTML = textSwedishAuthor[0];
            textContentTemp.innerHTML = textSwedishText[0];
        }

        let textContentTempNormal = textContentTemp.innerHTML;
        let textContentTempLowerCase = textContentTemp.innerHTML.toLowerCase();  // adjusting letters case

        // choosing correct letters case
        if (ignoreCasesButtonChecked === true){
            textContentTemp.innerHTML = textContentTempLowerCase;
        } else {
            textContentTemp.innerHTML = textContentTempNormal;
        }

        prepareGame(textContentTemp, textAuthor);

        window.changeTextList = function() {
            // resetting values when setting changed
            controlGameStop();
            let typeHere = document.getElementById('type_here');
            typeHere.value = "";
            ignoreCasesButtonChecked = document.getElementById('ignore_cases').checked;

            let languageEnglish = document.getElementById('language_english');
            let languageSwedish = document.getElementById('language_swedish');

            // filling title with values
            for (let i = 0; i < textList.childElementCount; i++) {
                if (languageEnglish.checked) {
                    textList[i].innerHTML = textEnglishTitle[i];
                } else if (languageSwedish.checked) {
                    textList[i].innerHTML = textSwedishTitle[i];
                }
            }

            // get text language
            let textLanguage;
            if (languageEnglish.checked) {
                textLanguage = "english";

            } else if (languageSwedish.checked) {
                textLanguage = "swedish";
            }

            // get text index
            let textIndex;
            for (let i = 0; i < textList.childElementCount; i++) {
                if (textLanguage === "english" && textEnglishTitle[i] === chooseTextList.value) {
                    textIndex = i;
                } else if (textLanguage === "swedish" && textSwedishTitle[i] === chooseTextList.value) {
                    textIndex = i;
                }
            }
            // filling title, author and text with values
            if (textLanguage === "english") {
                textTitle.innerHTML = textEnglishTitle[textIndex];
                textAuthor.innerHTML = textEnglishAuthor[textIndex];
                textContentTemp.innerHTML = textEnglishText[textIndex];
            } else if (textLanguage === "swedish") {
                textTitle.innerHTML = textSwedishTitle[textIndex];
                textAuthor.innerHTML = textSwedishAuthor[textIndex];
                textContentTemp.innerHTML = textSwedishText[textIndex];
            }

            let textContentTempNormal = textContentTemp.innerHTML;
            let textContentTempLowerCase = textContentTemp.innerHTML.toLowerCase();

            if (ignoreCasesButtonChecked === true){
                textContentTemp.innerHTML = textContentTempLowerCase;
            } else {
                textContentTemp.innerHTML = textContentTempNormal;
            }

            prepareGame(textContentTemp, textAuthor);
        }


        // event listeners
        let chooseTextList = document.getElementById('choose_text_list');
        chooseTextList.addEventListener('change', changeTextList);

        let languageEnglishChange = document.getElementById('language_english');
        languageEnglishChange.addEventListener('change', changeTextList);

        let languageSwedishChange = document.getElementById('language_swedish');
        languageSwedishChange.addEventListener('change', changeTextList);

        let ignoreCasesChanged = document.getElementById('ignore_cases');
        ignoreCasesChanged.addEventListener('change', changeTextList);
    }
    xmlRequest.send();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function prepareGame(textContTemp, textAuthor) {
    // setting up text content
    let typeHere = document.getElementById('type_here');
    typeHere.readOnly = false;
    let textArrayWords = textContTemp.innerHTML.split(" ");
    let textArrayWordsSplit = [];

    for (let i = 0; i < textArrayWords.length ; i++ ){
        textArrayWordsSplit.push(textArrayWords[i].split(""));
    }

    textAuthor.innerHTML += ' (' + textArrayWords.length + ' words, ' + textContTemp.innerHTML.length + ' chars)';

    prepareFunctions(textContTemp, textArrayWords, textArrayWordsSplit);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function prepareFunctions(textContTemp, textArrayWords, textArrayWordsSplit) {
    // variables
    let typeHere = document.getElementById('type_here');
    let currentKey = 0;
    let currentWord = 0;
    let currentWordColor = 0;

    // get the textarea
    let textarea = document.getElementById('textarea');

    textarea.textContent = '';

    function createSpanItem(letter) {
        let span = document.createElement('span');
        span.textContent = letter;
        return span;
    }

    // add child to textarea
    for (let i = 0; i < textContTemp.firstChild.length; i++) {
        // adding new span to the textarea
        textarea.appendChild(createSpanItem(textContTemp.firstChild.data[i]));
    }
    textarea.children[0].classList.add('highlighter');

    // variables needed for calculations
    let currentIndex = 0;
    currentWord = 0;
    currentWordColor = 0;
    let nextWordIndex = 0;
    let countKeyPress = -1;
    let gameIsOn = false;
    let numberErrorsHTML = document.getElementById('errors');
    let numberErrors = 0;
    let numberWrittenWords = 0;
    let numberCorrect = 0;
    let numberErrorsTemp = 0;
    typeHere.addEventListener('keypress', controlWord);

    // sound when mistype
    const sound = new Audio('audio/beep.wav');

    window.controlGameStop = function() {
        let buttonStartStop = document.getElementById('control_button');
        buttonStartStop.style.backgroundImage = "url('img/start_button.png')";

        if (gameIsOn === true){
            gameStop();
            gameIsOn = false;
            typeHere.removeEventListener('keypress', controlWord);
        }
    }

    function gameStop() {
        // change state button
        let buttonStartStop = document.getElementById('control_button');
        buttonStartStop.style.backgroundImage = "url('img/start_button.png')";
        typeHere.removeEventListener('keypress', controlWord);
        typeHere.readOnly = true;
        buttonStartStop.addEventListener('click', changeTextList);
    }

    function gameStart() {
        gameIsOn = true;

        // change state button
        let buttonStartStop = document.getElementById('control_button');
        buttonStartStop.style.backgroundImage = "url('img/stop_button.png')";

        let date = new Date();
        window.timeStart = date.getTime();

        // conditions for game end
        buttonStartStop.addEventListener('click', controlGameStop);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //GAME STARTS WITH FIRST LETTER PRESSED
    // variable for keeping state of the game
    function controlWord(event) {
        numberErrors = 0;
        numberCorrect = 0;
        // start the game
        countKeyPress++;
        if (countKeyPress === 0){
            gameStart();
        }

        // control index next word
        let currentWordLength = textArrayWordsSplit[currentWord].length;

        // control highlighter
        let pressedKey = event.key;

        if (textContTemp.innerText[currentIndex] !== ' ') {
            currentIndex++;
            if (currentIndex < textContTemp.innerHTML.length) {
                textarea.children[currentIndex - 1].classList.remove('highlighter');
            }
            if (currentIndex < textContTemp.innerHTML.length){
                textarea.children[currentIndex].classList.add('highlighter');
            }

        }

        if (pressedKey === ' ') {
            // save the current index
            let indexWhenSpacePressed = currentIndex - 1;
            let indexOfLastLetter;
            numberWrittenWords++;

            if (currentIndex <= textContTemp.innerHTML.length) {
                textarea.children[currentIndex].classList.remove('highlighter');
            }
            nextWordIndex += currentWordLength + 1;
            currentIndex = nextWordIndex;

            if (currentIndex <= textContTemp.innerHTML.length) {
                textarea.children[currentIndex].classList.add('highlighter');
            }
            currentWord++;

            // change letter color to red if space key pressed too early
            indexOfLastLetter = currentIndex - 2;
            let redAdded = 0;
            for (let i = indexWhenSpacePressed; i <= indexOfLastLetter ; i++ ){
                    textarea.children[i].classList.add('redLetter');
                    redAdded++;
            }
            if ((currentIndex - indexOfLastLetter) === 2 &&
                textarea.childNodes[indexOfLastLetter].className === 'redLetter'){
                numberWrittenWords--;
            }
            if (nextWordIndex > textContTemp.innerHTML.length){
                gameStop();
            }
        }


        // control color of current letter
        let currentLetter = textArrayWordsSplit[currentWordColor][currentKey];
        currentKey++;
        if (pressedKey === ' ') {
            typeHere.value = "";
            currentWordColor++;
            currentKey = 0;
        }

        // control if pressed letter is correct
        if ((currentLetter === pressedKey) && (pressedKey !== " ")) {
            textarea.children[currentIndex - 1].classList.add('grayLetter');
        } else if ((currentLetter !== pressedKey) && (pressedKey !== " ")) {
            if (currentIndex <= textContTemp.innerHTML.length) {
                textarea.children[currentIndex - 1].classList.add('redLetter');
            }
        }

        // checking end game condition
        if ((currentIndex) === textContTemp.innerHTML.length){
            gameStop();
        }

        for (let i = 0; i < textarea.childNodes.length ; i++ ){
            if (textarea.childNodes[i].className === 'redLetter'){
                numberErrors++;
            }
            if (textarea.childNodes[i].className === 'grayLetter'){
                numberCorrect++;
            }
        }

        // play sound
        if (numberErrorsTemp !== numberErrors){
            sound.play();
        }
        numberErrorsTemp = numberErrors;
        numberCorrect += numberWrittenWords;

        numberErrorsHTML.innerHTML = 'Errors: ' + numberErrors;

        // setting up stats
        let accuracyHTML = document.getElementById('accuracy');
        let accuracy = (numberCorrect / (numberCorrect + numberErrors)) * 100;
        accuracyHTML.innerHTML = 'Accuracy: ' + Math.round(accuracy) + '%';

        let grossWPMhtml = document.getElementById('gross_WPM');
        let netWMPhtml = document.getElementById('net_WPM');

        let dateNow = new Date();
        let timeNow = dateNow.getTime();

        let elapsed_minutes = (timeNow - timeStart) * 0.000016667;
        let grossWPM = ((numberCorrect + numberErrors) / 5) / elapsed_minutes;
        let netWPM = grossWPM - (numberErrors / elapsed_minutes);

        grossWPMhtml.innerHTML = 'Gross WPM: ' + Math.round(grossWPM);
        netWMPhtml.innerHTML = 'Net WPM: ' + Math.round(netWPM);
    }
}

// START FUNCTION
function start() {
    // calling functions
    prepareText();
}

// WINDOW ONLOAD EVENT LISTENER
window.addEventListener('load', start);
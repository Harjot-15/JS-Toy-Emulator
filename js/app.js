/* Variables */
var synth = window.speechSynthesis;
var textToSpeak = '';
var speakButton = document.querySelector('#speakButton');

/* Arrays */
var subjects = ["The Turkey", "Mom", "Dad", "Dog", "My teacher", "Elephant", "The Cat"];
var verbs = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"];
var adjectives = ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"];
var nouns = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
var places = ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"];

/* Story Parts */
var storyParts = {
    subject: null,
    verb: null,
    adjective: null,
    noun: null,
    place: null
};

/* Functions */
function getRandomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateStory() {
    // Check if any parts are missing and fill them in
    for (var part in storyParts) {
        if (storyParts[part] === null) {
            switch (part) {
                case 'subject': storyParts.subject = getRandomWord(subjects); break;
                case 'verb': storyParts.verb = getRandomWord(verbs); break;
                case 'adjective': storyParts.adjective = getRandomWord(adjectives); break;
                case 'noun': storyParts.noun = getRandomWord(nouns); break;
                case 'place': storyParts.place = getRandomWord(places); break;
            }
        }
    }
    // Organize the sentence in SVO order
    textToSpeak = `${storyParts.subject} ${storyParts.verb} ${storyParts.adjective} ${storyParts.noun} ${storyParts.place}`;
    document.getElementById('output').textContent = textToSpeak;
}

function reset() {
    textToSpeak = '';
    document.getElementById('output').textContent = '';
    for (var part in storyParts) {
        storyParts[part] = null;
    }
}

function speakNow() {
    if (document.getElementById('output').textContent !== '') {
        var utterThis = new SpeechSynthesisUtterance(document.getElementById('output').textContent);
        synth.speak(utterThis);
    }
}

/* Event Listeners */
function setStoryPart(part, value) {
    storyParts[part] = value;
    document.getElementById('output').textContent = Object.values(storyParts).join(' ');
}

document.getElementById('subject').onclick = function() {
    setStoryPart('subject', getRandomWord(subjects));
};

document.getElementById('verb').onclick = function() {
    setStoryPart('verb', getRandomWord(verbs));
};

document.getElementById('adjective').onclick = function() {
    setStoryPart('adjective', getRandomWord(adjectives));
};

document.getElementById('noun').onclick = function() {
    setStoryPart('noun', getRandomWord(nouns));
};

document.getElementById('place').onclick = function() {
    setStoryPart('place', getRandomWord(places));
};

document.getElementById('generate').onclick = generateStory;
document.getElementById('reset').onclick = reset;

speakButton.onclick = function() {
    speakNow();
};

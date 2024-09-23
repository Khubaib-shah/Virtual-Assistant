let btn = document.querySelector(".btn");
let content = document.querySelector(".content");
let audioTHEME = document.querySelector("#audioTHEME");
audioTHEME.style.display = "none";
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-GB";

  window.speechSynthesis.speak(text_speak);
}
function wishMe() {
  let day = new Date();
  let hour = day.getHours();

  hour > 6 && hour < 11
    ? speak("Good morning sir")
    : hour >= 11 && hour < 13
    ? speak("Good noon sir")
    : hour >= 13 && hour < 15
    ? speak("Good afternoon sir")
    : hour >= 15 && hour < 20
    ? speak("good evening sir")
    : speak("good evening sir");
}
window.addEventListener("load", () => {
  wishMe();
});

let speachRecognization =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognization = new speachRecognization();
recognization.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  //   console.log(transcript);
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};
btn.addEventListener("click", () => {
  let audio = document.getElementById("clickAudio");
  audio.play();
  recognization.start();
  btn.style.display = "none";
});

recognization.onstart = () => {
  audioTHEME.style.display = "flex";
};
recognization.onend = () => {
  btn.style.display = "flex";

  audioTHEME.style.display = "none";
};
function takeCommand(message) {
  btn.style.display = "flex";

  if (message.includes("hi") || message.includes("hello")) {
    speak("hello sir");
  } else if (message.includes("how are you")) {
    speak("I'm good, how are you sir?");
  } else if (message.includes("i am good")) {
    speak(
      "Glad to hear that! Let me know if there's anything I can assist you with!"
    );
  } else if (message.includes("luna") || message.includes("hey")) {
    speak("yes sir");
  } else if (
    message.includes("what's your name") ||
    message.includes("who are you")
  ) {
    speak("My name is Luna, created by khubaib shah");
  } else if (message.includes("what time is it")) {
    let currentTime = new Date().toLocaleTimeString();
    speak(`The current time is ${currentTime}`);
  } else if (
    message.includes("what's the date") ||
    message.includes("what day is it")
  ) {
    let currentDate = new Date().toLocaleDateString();
    speak(`Today is ${currentDate}`);
  } else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");
  } else if (message.includes("open facebook")) {
    speak("Opening facebook");
    window.open("https://www.facebook.com", "_blank");
  } else if (message.includes("open whatsapp")) {
    speak("Opening whatsap");
    window.open("https://www.whatsapp.com", "_blank");
  } else if (message.includes("open youtube")) {
    speak("Opening youtube");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("tell me a joke")) {
    speak("Why don’t scientists trust atoms? Because they make up everything!");
  } else if (message.includes("goodbye") || message.includes("bye")) {
    speak("Goodbye sir! Have a great day ahead!");
  } else if (message.includes("what's the weather")) {
    speak(
      "Sorry, I cannot check the weather yet, but you can open a weather website!"
    );
    window.open("https://www.weather.com", "_blank");
  } else if (message.includes("set a reminder")) {
    speak("What would you like me to remind you about?");
  } else if (message.includes("play music")) {
    speak("Playing your favorite playlist.");
    window.open("https://open.spotify.com", "_blank");
  } else if (message.includes("stop listening")) {
    speak("Okay, I will stop listening for now.");
  } else if (message.includes("increase volume")) {
    speak("Increasing volume.");
    document.getElementById("clickAudio").volume += 0.1;
  } else if (message.includes("decrease volume")) {
    speak("Decreasing volume.");
    document.getElementById("clickAudio").volume -= 0.1;
  } else if (message.includes("mute")) {
    let audio = document.getElementById("clickAudio");
    if (message.includes("mute")) {
      audio.muted = true;
      speak("Audio is muted.");
    } else {
      audio.muted = false;
      speak("Audio is unmuted.");
    }
  } else if (message.includes("what can you do")) {
    speak(
      "I can help with greetings, checking the time, opening websites, playing music, and more. Just ask!"
    );
  } else {
    //   speak("I didn't understand that. Could you please repeat?");
    speak("here what i found on the web");
    window.open(`https://www.google.com/search?q=${message}`);
  }
}

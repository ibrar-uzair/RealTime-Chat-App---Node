const socket = io("http://localhost:3000/");

const form = document.getElementById("sendForm");

const messageInput = document.getElementById("messageInput");

const messageContainer = document.getElementById("messageContainer");

const append = (message) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  //   messageElement.classList.add("message");
  messageConatiner.append(messageElement);
};

const connectedName = prompt("Enter your name");
socket.emit("new-user-connected", connectedName);

socket.on("user-joined", (name) => {
  append("${name} joined the chat");
});

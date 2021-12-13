// const e = require("connect-flash");

const socket = io("http://localhost:3000/");

const form = document.getElementById("sendForm");

const messageInput = document.getElementById("messageInput");

const append = (message, position) => {
  const outerElement = document.createElement("div");
  outerElement.classList.add("pb-4");
  outerElement.classList.add(position);

  const imageTimeElement = document.createElement("div");
  const imageElement = document.createElement("img");
  imageElement.setAttribute(
    "src",
    "https://bootdey.com/img/Content/avatar/avatar1.png"
  );
  imageElement.classList.add("rounded-circle", "mr-1");
  imageElement.setAttribute("width", "40");
  imageElement.setAttribute("height", "40");
  imageElement.setAttribute("alt", "Chris Wood");
  imageTimeElement.append(imageElement);

  const textElement = document.createElement("div");
  textElement.classList.add("text-muted", "small", "text-nowrap", "mt-2");
  textElement.innerText = "2.33 am";
  imageTimeElement.append(textElement);

  //

  const messageBlockElement = document.createElement("div");
  outerElement.append(messageBlockElement);
  messageBlockElement.classList.add(
    "flex-shrink-1",
    "bg-light",
    "rounded",
    "py-2",
    "px-3",
    "mr-3"
  );

  const sentElement = document.createElement("div");
  sentElement.innerText = "You";
  sentElement.classList.add("font-weight-bold", "mb-1");

  messageBlockElement.innerText = message;

  //const messageContainer = document.querySelector(".messageContainer");
  //messageContainer.append(outerElement);
};

const connectedName = prompt("Enter your name");
socket.emit("new-user-connected", connectedName);

socket.on("user-joined", (name) => {
  console.log("Name of the user is ", name);
  append(`${name} joined the chat`);
});

form.addEventListener("submit", () => {
  //   e.preventDefault();
  const message = messageInput.value;
  append(`you:${message}`, "chat-message-right");
  socket.emit("send", message);
  messageInput.value = "";
});

socket.on("recieve", (data) => {
  append(`${data.name}:${data.message}`, "chat-message-left");
});

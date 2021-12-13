const socket = io("http://localhost:3000/");

const form = document.getElementById("sendForm");

const messageInput = document.getElementById("messageInput");

const messageContainer = document.getElementById("messageContainer");

const append = (message) => {
  alert(message);
  const outerElement = document.createElement("div");
  outerElement.classList("chat-message-right pb-4");
  const imageTimeElement = document.createElement("div");
  const imageElement = document.createElement("div");
  imageElement.setAttribute(
    "src",
    "https://bootdey.com/img/Content/avatar/avatar1.png"
  );
  imageElement.classList.add("rounded-circle mr-1");
  imageElement.setAttribute("width", "40");
  imageElement.setAttribute("height", "40");
  imageElement.setAttribute("alt", "Chris Wood");
  imageTimeElement.append(imageElement);
  const textElement = document.createElement("div");
  textElement.classList("text-muted small text-nowrap mt-2");
  textElement.innerText = "2.33";
  imageTimeElement.append(textElement);
  outerElement.append(imageTimeElement);
  const messageBlockElement = document.createElement("div");
  messageBlockElement.classList.add(
    "flex-shrink-1 bg-light rounded py-2 px-3 mr-3"
  );
  const sentElement = document.createElement("div");
  sentElement.innerText = "You";
  sentElement.classList.add("font-weight-bold mb-1");
  messageBlockElement.append(sentElement);
  messageBlockElement.innerText = message;
  outerElement.append(messageBlockElement);

  messageConatiner.append(outerElement);
};

const connectedName = prompt("Enter your name");
socket.emit("new-user-connected", connectedName);

socket.on("user-joined", (name) => {
  append("${name} joined the chat");
});

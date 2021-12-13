const socket = io("http://localhost:3000/");

const form = document.getElementById("sendForm");

const messageInput = document.getElementById("messageInput");

const messageContainer = document.getElementById("messageContainer");

const append = (message) => {
  const outerElement = document.createElement("div");
  outerElement.classList.add("chat-message-right pb-4");
      const imageTimeElement = document.createElement("div");
            const imageElement = document.createElement("div");
imageElement.setAttribute("src","https://bootdey.com/img/Content/avatar/avatar1.png")
imageElement.classList.add("rounded-circle mr-1")
imageElement.setAttribute("width","40")
imageElement.setAttribute("height","40")
imageElement.setAttribute("alt","Chris Wood")
imageTimeElement.append(imageElement)

            const textElement = document.createElement("div");
textElement.classList.add("text-muted small text-nowrap mt-2")
textElement.innerText="2.33"
imageTimeElement.append(textElement)

  //   messageElement.innerText = message;
  //   messageElement.classList.add("message");
  messageConatiner.append(messageElement);
};
 <div class="chat-message-right pb-4">
    <div>
        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40">
        <div class="text-muted small text-nowrap mt-2">2:33 am</div>
    </div>
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
        <div class="font-weight-bold mb-1">You</div>
        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
    </div>
</div>

const connectedName = prompt("Enter your name");
socket.emit("new-user-connected", connectedName);

socket.on("user-joined", (name) => {
  append("${name} joined the chat");
});


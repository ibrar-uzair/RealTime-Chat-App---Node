const socket = io("http://localhost:3000/");

const form = document.getElementById("sendForm");

const messageInput = document.getElementById("messageInput");

const messageContainer = document.getElementById("messageContainer");

const name = prompt("Enter your name");
socket.emit("new-user-connected", name);

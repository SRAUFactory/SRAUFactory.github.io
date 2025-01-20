document.getElementById("send-button").addEventListener("click", () => {
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput) {
    addMessage("user", userInput);
    respondToMessage(userInput);
    document.getElementById("user-input").value = "";
  }
});

function addMessage(sender, text) {
  const chatWindow = document.getElementById("chat-window");
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.textContent = text;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function respondToMessage(input) {
  let response;

  if (input.includes("料金")) {
    response = "料金に関する詳細は、以下をご参照ください: [料金表](#)";
  } else if (input.includes("サービス")) {
    response = "サービスについてはこちらをご確認ください: [サービス案内](#)";
  } else {
    response = "ご質問ありがとうございます。詳細については後ほどご連絡します。";
  }

  addMessage("bot", response);
}

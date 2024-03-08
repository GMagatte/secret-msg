document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const contentInput = document.querySelector(".myMessage");

  if (contentInput.value === "") {
    return console.error("Empty field");
  }
  console.log(contentInput.value);

  const encodedContent = window.btoa(contentInput.value);
  const shareableLink = `${window.location}#${encodedContent}`;

  const copyBtn = document.createElement("button");
  copyBtn.innerHTML = "Copy Link";
  copyBtn.classList.add("button");
  copyBtn.classList.add("is-success");
  copyBtn.classList.add("is-light");

  const copyBtnContainer = document.createElement("div");
  copyBtnContainer.classList.add("field", "is-grouped", "is-grouped-centered");

  copyBtnContainer.appendChild(copyBtn);
  
  copyBtn.addEventListener("click", () => {
      navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
          console.log("Copied successfully");
        })
        .catch((error) => {
            console.error("Error copying link:", error);
        });
    });
    
    const formContainer = document.querySelector(".formbox-container");
    const hiddenMessageContainer = document.querySelector(".hiddenMessage");
    
    formContainer.style.display = "none";
    hiddenMessageContainer.style.display = "block";
    
    const receivecMsg = document.querySelector(".receivedMsg");
    receivecMsg.textContent = shareableLink;
    
    hiddenMessageContainer.appendChild(copyBtnContainer);
    
    contentInput.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  const { hash } = window.location;
  const decryptedContent = window.atob(hash.replace("#", ""));

  if (decryptedContent) {
    document.querySelector(".formbox-container").style.display = "none";
    document.querySelector(".hiddenMessage").style.display = "block";
    document.querySelector(".receivedMsg").textContent = decryptedContent;
  } else {
    document.querySelector(".formbox-container").style.display = "block";
    document.querySelector(".hiddenMessage").style.display = "none";
    document.querySelector(".createMsgBtn").style.display = "none";
  }
});
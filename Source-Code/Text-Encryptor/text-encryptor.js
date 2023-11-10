// Define the character set
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";

// Function to perform encryption
function encryptText(text, key) {
  let encryptedText = "";
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const keyChar = key[i % key.length];
    
    const charIndex = alphabet.indexOf(char);
    const keyIndex = alphabet.indexOf(keyChar);
    
    if (charIndex === -1) {
      encryptedText += char;
    } else {
      const newIndex = (charIndex + keyIndex) % alphabet.length;
      encryptedText += alphabet[newIndex];
    }
  }
  
  return encryptedText;
}

// Function to perform decryption
function decryptText(encryptedText, key) {
  let decryptedText = "";
  
  for (let i = 0; i < encryptedText.length; i++) {
    const char = encryptedText[i];
    const keyChar = key[i % key.length];
    
    const charIndex = alphabet.indexOf(char);
    const keyIndex = alphabet.indexOf(keyChar);
    
    if (charIndex === -1) {
      decryptedText += char;
    } else {
      let newIndex = charIndex - keyIndex;
      if (newIndex < 0) newIndex += alphabet.length;
      decryptedText += alphabet[newIndex];
    }
  }
  
  return decryptedText;
}

// Function to update the result
function updateResult(isEncrypting) {
  const message = document.getElementById("message").value;
  const key = document.getElementById("key").value;
  const resultElement = document.getElementById("result");
  
  let result = "";
  
  if (isEncrypting) {
    result = encryptText(message, key);
  } else {
    result = decryptText(message, key);
  }
  
  resultElement.textContent = result;
}

// Add event listeners to buttons
document.getElementById("enc-btn").addEventListener('click', function () {
  updateResult(true);
});

document.getElementById("dec-btn").addEventListener('click', function () {
  updateResult(false);
});

// Initialize the result with encrypted text when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateResult(true);
});

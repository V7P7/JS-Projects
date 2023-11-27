const preview = document.getElementById("preview"),
  code = document.getElementById("code"),
  ranges = document.querySelectorAll(".settings input"),
  copyBtn = document.getElementById("copyBtn");

ranges.forEach((slider) => {
  slider.addEventListener("input", generateCode);
});

function generateCode() {
  const xShadow = document.getElementById("x-shadow").value;
  const yShadow = document.getElementById("y-shadow").value;
  const blurRadius = document.getElementById("b-rad").value;
  const spreadRadius = document.getElementById("s-rad").value;
  const shadowColor = document.getElementById("shadow-color").value;
  const shadowOpacity = document.getElementById("shadow-opacity").value;
  const shadowInset = document.getElementById("inset-shadow").checked;
  const borderRadius = document.getElementById("bor-rad").value;

  const boxShadow = `${
    shadowInset ? "inset " : ""
  } ${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
    shadowColor,
    shadowOpacity
  )}`;

  preview.style.boxShadow = boxShadow;
  preview.style.borderRadius = `${borderRadius}px`;

  code.textContent = `box-shadow: ${boxShadow};\nborder-radius: ${borderRadius}px;`;
}

function hexToRgba(shadowColor, shadowOpacity) {
  const r = parseInt(shadowColor.substr(1, 2), 16);
  const g = parseInt(shadowColor.substr(3, 2), 16);
  const b = parseInt(shadowColor.substr(5, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
}

function copyCode() {
  code.select();
  document.execCommand("copy");
  copyBtn.innerText = "Copied!";
  setTimeout(() => {
    copyBtn.innerText = "Copy Styles";
  }, 500);
}

generateCode();

const inputContainer = document.getElementById("inputContainer");
const addInputButton = document.getElementById("addInput");
const form = document.getElementById("myForm");

let inputCount = 0;

addInputButton.addEventListener("click", function() {
  const input = document.createElement("input");
  input.type = "text";
  input.name = "champ_" + inputCount;
  input.placeholder = "Champ " + (inputCount + 1);
  
  const removeButton = document.createElement("button");
  removeButton.textContent = "Supprimer";
  removeButton.addEventListener("click", function() {
    inputContainer.removeChild(inputGroup);
  });

  const inputGroup = document.createElement("div");
  inputGroup.appendChild(input);
  inputGroup.appendChild(removeButton);
  
  inputContainer.appendChild(inputGroup);
  inputCount++;
});

form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const formData = new FormData(form);
  
  fetch("save_data.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("Enregistrement réussi !");
      inputContainer.innerHTML = ''; // Effacer les champs après l'enregistrement
    } else {
      alert("Échec de l'enregistrement.");
    }
  });
});

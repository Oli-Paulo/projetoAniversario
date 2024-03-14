// Variavel do botão confirmação
const confirmacaoPresenca = document.getElementById("confirmarPresenca");

// Variaveis da confirmação de presença
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const numero = document.getElementById("numero");

// Variavel do envio de mensagens
const commentForm = document.getElementById('commentForm');

confirmacaoPresenca.addEventListener('click', function(){
  if (form.style.display === 'none'){
    form.style.display = 'block';
    confirmacaoPresenca.style.display = 'none';
  } else {
    form.style.display = 'none';
  }
});
// Formulário da confirmação de presença
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

// Formulário do envio de mensagens
commentForm.addEventListener("submit", function(e){
  e.preventDefault();
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;
  
  if (name.trin() === "" || comment.trim() === "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  let commentContainer = document.getElementById("comments");
  let newComment = document.createElement("div");
  newComment.innerHTML = "<strong>" + name + ":</strong>" + comment;
  commentContainer.appendChild(newComment);
  document.getElementById("commentForm").requestFullscreen();
});

// Funções da confirmação de presença
function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const numeroValue = numero.value;

  if (usernameValue == "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if (emailValue == "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (numeroValue == "") {
    setErrorFor(numero, "O número é obrigatório.");
  } else {
    setSuccessFor(numero);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control sucess";
  });
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adicionar mensagem de erro
  small.innerText = message;

  // Adicionar a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

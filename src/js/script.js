// Variavel do botão confirmação
const confirmacaoPresenca = document.getElementById("confirmarPresenca");

// Variaveis da confirmação de presença
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const numero = document.getElementById("numero");

// Variavel do envio de mensagens
const commentForm = document.getElementById('commentForm');

// Botão para acessar a confirmação de presença
confirmacaoPresenca.addEventListener('click', function(){
  if (form.style.display === 'none'){
    form.style.display = 'block';
    confirmacaoPresenca.style.display = 'none';
  } else {
    form.style.display = 'none';
  }
});

// Confirmação de presença
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

// Envio de mensagens
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

  if (usernameValue != apenasLetras) {
    setErrorFor(username, "Nome fora dos padrões.")
  } else if (usernameValue == "") {
    setErrorFor(username, "O nome é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if(emailValue == "") {
    setSuccessFor(email);
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if(numeroValue == ""){
    setSuccessFor(numero);
  } else if(!checkNumero(numeroValue)) {
    setErrorFor(numero, "Número fora dos padrões!")
  } else {
    setSuccessFor(numero);
  }
  
  if(numeroValue == "" && emailValue == "") {
    setErrorFor(numero, "Email ou número precisam ser preenchidos.")
    setErrorFor(email, "")
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
function apenasLetras(texto) {
  // Expressão regular para verificar se há apenas letras na string
  let letras = /^[a-zA-Z]+$/;
  return letras.test(texto);
}

  //Função validar email
function checkEmail(email) {
  let validar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validar.test(email);
}
  //Função validar numero de celular
  function checkNumero(telefone) {
    // Remove todos os caracteres que não são números
    telefone = telefone.replace(/\D/g, '');

    // Verifica se a quantidade de dígitos está correta
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    // Se tiver 11 dígitos, verifica se começa com 9 (celular)
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

    // Verifica se não há nenhum número digitado errado
    for (var n = 0; n < 10; n++) {
        if (telefone == Array(11).join(n) || telefone == Array(12).join(n)) return false;
    }

    // DDDs válidos
    let codigosDDD = [
        11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99
    ];
    // Verifica se o DDD é válido
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

    // Verifica se o número é realmente válido
    if (new Date().getFullYear() < 2017) return true;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    // Se passar por todas as validações, está tudo certo
    return true;
}
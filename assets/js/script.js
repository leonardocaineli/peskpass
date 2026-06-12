// Burger menu
const hamburguer = document.getElementById("hamburguer");
const menuCelular = document.getElementById("menu-celular");
const hamburguerIcone = hamburguer.querySelector(".material-symbols-rounded");
hamburguer.addEventListener("click", () => {
  const isOpen = hamburguer.classList.toggle("open");
  menuCelular.classList.toggle("open");
  hamburguer.setAttribute("aria-expanded", isOpen);
  hamburguer.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuCelular.setAttribute("aria-hidden", !isOpen);
  hamburguerIcone.textContent = isOpen ? "close" : "menu";
});
function fecharMenu() {
  hamburguer.classList.remove("open");
  menuCelular.classList.remove("open");
  hamburguer.setAttribute("aria-expanded", "false");
  hamburguer.setAttribute("aria-label", "Abrir menu");
  menuCelular.setAttribute("aria-hidden", "true");
  hamburguerIcone.textContent = "menu";
}

// Revelar ao rolar
const elementosRevelar = document.querySelectorAll(".revelar");
const observador = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visivel"), i * 60);
        observador.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
elementosRevelar.forEach((el) => observador.observe(el));

// Copyright year
document.getElementById("ano-copyright").textContent = new Date().getFullYear();

// Form submit
function enviarFormulario(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".formulario-enviar");
  btn.textContent = "✅ Cadastro recebido! Vamos te chamar no WhatsApp com seu acesso antecipado.";
  btn.style.background = "#1a9e72";
  btn.disabled = true;
}

// FAQ accordion
document.querySelectorAll(".faq-pergunta").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("aberto");
    document.querySelectorAll(".faq-item.aberto").forEach((i) => i.classList.remove("aberto"));
    if (!isOpen) item.classList.add("aberto");
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
});

// Calculadora de potencial
function calcularPotencial(e) {
  e.preventDefault();
  const vagas = parseFloat(document.getElementById("calc-vagas").value.replace(",", "."));
  const valor = parseFloat(document.getElementById("calc-valor").value.replace(",", "."));
  const dias = parseFloat(document.getElementById("calc-dias").value.replace(",", "."));
  const porDia = Math.round(vagas * valor);
  const porSemana = Math.round(porDia * dias);
  const porMes = Math.round(porSemana * 4.3);
  const fmt = (n) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  document.getElementById("calc-valor-dia").textContent = fmt(porDia);
  document.getElementById("calc-valor-semana").textContent = fmt(porSemana);
  document.getElementById("calc-valor-mes").textContent = fmt(porMes);
  document.getElementById("calc-resultado").classList.add("visivel");
}

// Carrossel do hero
(function () {
  const slides = document.querySelectorAll(".carrossel-slide");
  const pontosEl = document.getElementById("carrossel-pontos");
  let atual = 0;
  let timer;

  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.className = "carrossel-ponto" + (i === 0 ? " ativo" : "");
    btn.setAttribute("aria-label", "Tela " + (i + 1));
    btn.addEventListener("click", () => {
      irPara(i);
      reiniciarTimer();
    });
    pontosEl.appendChild(btn);
  });

  function irPara(idx) {
    const anterior = slides[atual];
    anterior.classList.remove("ativo");
    anterior.classList.add("saindo");
    setTimeout(() => {
      anterior.style.transition = "none";
      anterior.classList.remove("saindo");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => (anterior.style.transition = ""))
      );
    }, 510);
    pontosEl.children[atual].classList.remove("ativo");
    atual = (idx + slides.length) % slides.length;
    slides[atual].classList.add("ativo");
    pontosEl.children[atual].classList.add("ativo");
  }

  function avancar() {
    irPara(atual + 1);
  }

  function reiniciarTimer() {
    clearInterval(timer);
    timer = setInterval(avancar, 5000);
  }

  reiniciarTimer();

  document
    .getElementById("heroi-carrossel")
    .addEventListener("mouseenter", () => clearInterval(timer));
  document.getElementById("heroi-carrossel").addEventListener("mouseleave", reiniciarTimer);
})();

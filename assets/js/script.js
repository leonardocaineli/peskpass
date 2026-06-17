// ───────────────────────────────────────────────────────────
// Destino dos cadastros: Cloudflare Pages Function (functions/api/lead.js),
// que grava no banco D1. Mesma origem do site — sem CORS.
// Requer o binding D1 "DB" configurado (ver wrangler.toml / README).
// ───────────────────────────────────────────────────────────
const ENDPOINT_FORMULARIO = "/lead";

// ── Menu hambúrguer ──
const hamburguer = document.getElementById("hamburguer");
const menuCelular = document.getElementById("menu-celular");
const hamburguerIcone = hamburguer.querySelector(".material-symbols-rounded");

function abrirFecharMenu(forcarFechar) {
  const isOpen = forcarFechar ? false : hamburguer.classList.toggle("open");
  menuCelular.classList.toggle("open", isOpen);
  hamburguer.classList.toggle("open", isOpen);
  hamburguer.setAttribute("aria-expanded", String(isOpen));
  hamburguer.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuCelular.setAttribute("aria-hidden", String(!isOpen));
  hamburguerIcone.textContent = isOpen ? "close" : "menu";
}

hamburguer.addEventListener("click", () => abrirFecharMenu());
// Fecha o menu ao clicar em qualquer link (substitui o onclick inline)
menuCelular.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => abrirFecharMenu(true));
});

// ── Revelar ao rolar ──
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

// ── Ano do copyright ──
document.getElementById("ano-copyright").textContent = new Date().getFullYear();

// ── Envio do formulário de cadastro ──
const formCadastro = document.getElementById("form-cadastro");
const formErro = document.getElementById("form-erro");

function validarFormulario() {
  const v = (name) => formCadastro.querySelector(`[name="${name}"]`).value.trim();
  const campos = ["nome_pesqueiro", "nome_responsavel", "cidade", "estado", "email", "whatsApp"];
  if (campos.some((c) => !v(c))) return "Preencha todos os campos obrigatórios.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v("email"))) return "Informe um e-mail válido.";
  return null;
}

formCadastro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mensagemErro = validarFormulario();
  if (mensagemErro) {
    formErro.textContent = mensagemErro;
    formErro.hidden = false;
    return;
  }
  formErro.hidden = true;

  const caixa = formCadastro.closest(".formulario-caixa");
  const btn = formCadastro.querySelector(".formulario-enviar");
  const textoOriginal = btn.textContent;

  btn.disabled = true;
  btn.textContent = "Enviando…";

  try {
    if (ENDPOINT_FORMULARIO) {
      const resp = await fetch(ENDPOINT_FORMULARIO, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(formCadastro),
      });
      if (!resp.ok) throw new Error("Resposta " + resp.status);
    } else {
      // Sem backend configurado: simula sucesso para não travar o fluxo.
      await new Promise((r) => setTimeout(r, 500));
    }

    caixa.innerHTML = `
      <div class="formulario-sucesso" role="status">
        <span class="material-symbols-rounded">check_circle</span>
        <h3>Cadastro recebido!</h3>
        <p>Assim que confirmarmos sua região, vamos te chamar no WhatsApp com seu acesso antecipado.</p>
      </div>`;
  } catch (err) {
    btn.disabled = false;
    btn.textContent = textoOriginal;
    const erro = document.createElement("p");
    erro.className = "formulario-erro";
    erro.textContent =
      "Não foi possível enviar agora. Tente novamente em instantes ou nos chame pelo WhatsApp.";
    formCadastro.querySelector(".formulario-grade").appendChild(erro);
  }
});

// ── Acordeão do FAQ ──
document.querySelectorAll(".faq-pergunta").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("aberto");
    document.querySelectorAll(".faq-item.aberto").forEach((i) => {
      i.classList.remove("aberto");
      i.querySelector(".faq-pergunta").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("aberto");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// ── Calculadora de potencial ──
const formCalc = document.getElementById("form-calc");
const calcErro = document.getElementById("calc-erro");
const calcResultado = document.getElementById("calc-resultado");

function calcularPotencial(e) {
  e.preventDefault();
  const numero = (id) => parseFloat(document.getElementById(id).value.replace(",", "."));
  const vagas = numero("calc-vagas");
  const valor = numero("calc-valor");
  const dias = numero("calc-dias");

  const valido =
    Number.isFinite(vagas) &&
    vagas > 0 &&
    Number.isFinite(valor) &&
    valor >= 0 &&
    Number.isFinite(dias) &&
    dias > 0 &&
    dias <= 7;

  if (!valido) {
    calcErro.hidden = false;
    calcErro.textContent = "Preencha os três campos com números válidos (dias de 1 a 7).";
    calcResultado.classList.remove("visivel");
    return;
  }
  calcErro.hidden = true;

  const porDia = Math.round(vagas * valor);
  const porSemana = Math.round(porDia * dias);
  const porMes = Math.round(porSemana * 4.3);
  const fmt = (n) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  document.getElementById("calc-valor-dia").textContent = fmt(porDia);
  document.getElementById("calc-valor-semana").textContent = fmt(porSemana);
  document.getElementById("calc-valor-mes").textContent = fmt(porMes);
  calcResultado.classList.add("visivel");
}
formCalc.addEventListener("submit", calcularPotencial);

// ── Carrossel do hero ──
(function () {
  const carrossel = document.getElementById("heroi-carrossel");
  const slides = carrossel.querySelectorAll(".carrossel-slide");
  const pontosEl = document.getElementById("carrossel-pontos");
  let atual = 0;

  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "carrossel-ponto" + (i === 0 ? " ativo" : "");
    btn.setAttribute("aria-label", "Ir para a tela " + (i + 1));
    btn.addEventListener("click", () => irPara(i));
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
        requestAnimationFrame(() => (anterior.style.transition = "")),
      );
    }, 510);
    pontosEl.children[atual].classList.remove("ativo");
    atual = (idx + slides.length) % slides.length;
    slides[atual].classList.add("ativo");
    pontosEl.children[atual].classList.add("ativo");
  }

  let intervalo = setInterval(() => irPara(atual + 1), 5000);

  carrossel.addEventListener("mouseenter", () => clearInterval(intervalo));
  carrossel.addEventListener("mouseleave", () => {
    intervalo = setInterval(() => irPara(atual + 1), 5000);
  });
})();

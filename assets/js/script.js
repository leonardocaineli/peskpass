// Burger menu
const hamburguer = document.getElementById('hamburguer');
const menuCelular = document.getElementById('menu-celular');
hamburguer.addEventListener('click', () => {
  const isOpen = hamburguer.classList.toggle('open');
  menuCelular.classList.toggle('open');
  hamburguer.setAttribute('aria-expanded', isOpen);
  hamburguer.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  menuCelular.setAttribute('aria-hidden', !isOpen);
});
function fecharMenu() {
  hamburguer.classList.remove('open');
  menuCelular.classList.remove('open');
  hamburguer.setAttribute('aria-expanded', 'false');
  hamburguer.setAttribute('aria-label', 'Abrir menu');
  menuCelular.setAttribute('aria-hidden', 'true');
}

// Revelar ao rolar
const elementosRevelar = document.querySelectorAll('.revelar');
const observador = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visivel'), i * 60);
      observador.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
elementosRevelar.forEach(el => observador.observe(el));

// Copyright year
document.getElementById('ano-copyright').textContent = new Date().getFullYear();

// Form submit
function enviarFormulario(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.formulario-enviar');
  btn.textContent = '✅ Cadastro recebido! Vamos te chamar no WhatsApp com seu acesso antecipado.';
  btn.style.background = '#1a9e72';
  btn.disabled = true;
}

// FAQ accordion
document.querySelectorAll('.faq-pergunta').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('aberto');
    document.querySelectorAll('.faq-item.aberto').forEach(i => i.classList.remove('aberto'));
    if (!isOpen) item.classList.add('aberto');
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// Calculadora de potencial
function calcularPotencial() {
  const camposErros = [
    { id: 'calc-vagas', erroId: 'erro-vagas', msg: 'Preencha o campo vagas' },
    { id: 'calc-valor', erroId: 'erro-valor', msg: 'Preencha o campo valor' },
    { id: 'calc-dias',  erroId: 'erro-dias',  msg: 'Preencha o campo dias' },
  ];
  let valido = true;
  const valores = {};
  camposErros.forEach(({ id, erroId, msg }) => {
    const input = document.getElementById(id);
    const erro  = document.getElementById(erroId);
    const val   = parseFloat(input.value.replace(',', '.'));
    if (!val || val <= 0) {
      erro.textContent = msg;
      input.style.borderColor = 'var(--red)';
      valido = false;
    } else {
      erro.textContent = '';
      input.style.borderColor = '';
      valores[id] = val;
    }
  });
  if (!valido) return;
  const porDia    = Math.round(valores['calc-vagas'] * valores['calc-valor']);
  const porSemana = Math.round(porDia * valores['calc-dias']);
  const porMes    = Math.round(porSemana * 4.3);
  const fmt = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  document.getElementById('calc-valor-dia').textContent    = fmt(porDia);
  document.getElementById('calc-valor-semana').textContent = fmt(porSemana);
  document.getElementById('calc-valor-mes').textContent    = fmt(porMes);
  document.getElementById('calc-resultado').classList.add('visivel');
}

// Carrossel do hero
(function() {
  const slides = document.querySelectorAll('.carrossel-slide');
  const pontosEl = document.getElementById('carrossel-pontos');
  let atual = 0;
  let timer;

  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'carrossel-ponto' + (i === 0 ? ' ativo' : '');
    btn.setAttribute('aria-label', 'Tela ' + (i + 1));
    btn.addEventListener('click', () => { irPara(i); reiniciarTimer(); });
    pontosEl.appendChild(btn);
  });

  function irPara(idx) {
    const anterior = slides[atual];
    anterior.classList.remove('ativo');
    anterior.classList.add('saindo');
    setTimeout(() => anterior.classList.remove('saindo'), 510);
    pontosEl.children[atual].classList.remove('ativo');
    atual = (idx + slides.length) % slides.length;
    slides[atual].classList.add('ativo');
    pontosEl.children[atual].classList.add('ativo');
  }

  function avancar() { irPara(atual + 1); }

  function reiniciarTimer() {
    clearInterval(timer);
    timer = setInterval(avancar, 5000);
  }

  reiniciarTimer();

  document.getElementById('heroi-carrossel').addEventListener('mouseenter', () => clearInterval(timer));
  document.getElementById('heroi-carrossel').addEventListener('mouseleave', reiniciarTimer);
})();

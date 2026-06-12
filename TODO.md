# TODO — PeskPASS Landing Page

## Pendente

### 🔴 Crítico

- [ ] **Formulário não envia dados** — `enviarFormulario()` só troca o texto do botão; nenhum lead é capturado. Definir destino (Cloudflare Workers ou Formspree) e implementar envio com tratamento de erro.

### 🟠 SEO / Social

- [ ] **og:image + twitter:image** — `twitter:card=summary_large_image` declarado mas sem imagem; compartilhamento no WhatsApp/redes sai sem preview. Criar imagem 1200×630px e adicionar as metatags.
- [ ] **Favicon + apple-touch-icon** — aba do navegador e ícone ao salvar na tela do celular ficam em branco.

### 🚀 Deploy

- [x] **Publicar no Cloudflare** — https://peskpass.leonardocaineli.workers.dev
- [ ] **Configurar domínio** — apontar `peskpass.com.br` nas configurações do projeto em Settings → Domains.

---

## Concluído

- [x] Estrutura de seções completa (Hero, Problema, Solução, Calculadora, Como funciona, Antes/depois, Funcionalidades, Relatos, FAQ, Cadastro)
- [x] Carrossel do hero (hero-1.png a hero-9.png) com slide automático a cada 5s, pontos de navegação, pausa no hover
- [x] Mapa do lago substituído por imagem real (mapa-lago.png) na seção Funcionalidades
- [x] Assets organizados em subpastas: `/assets/images/`, `/assets/css/`, `/assets/js/`
- [x] CSS separado do HTML → `assets/css/style.css`
- [x] JavaScript separado do HTML → `assets/js/script.js`
- [x] Imagem placeholder da Cloudbeds removida
- [x] Copy revisada: escassez padronizada (100 vagas), CTAs unificados, "app" → "plataforma", calculadora reenquadrada como potencial máximo, concordâncias corrigidas
- [x] Formulário reduzido de 8 para 5 campos (Nome, Pesqueiro, Cidade, Estado, WhatsApp obrigatório)
- [x] Validação inline da calculadora (sem alert, mensagens por campo, vírgula decimal normalizada)
- [x] Responsividade mobile: carrossel 100% largura, sombras ajustadas, scroll-padding-top no nav fixo
- [x] Acessibilidade: aria-expanded, aria-label, scroll-padding-top, contraste elevado em textos com alpha baixo
- [x] FAQ max-height aumentado (300px → 600px) para respostas longas não cortarem no mobile
- [x] Depoimentos refeitos com textos reais e fonte de origem (grupo Facebook, fórum, WhatsApp)
- [x] Preconnect para Google Fonts + display=block nos Material Symbols (sem flash de ícones como texto)
- [x] Navegação: header com 5 itens, footer com 8 (sitemap completo)
- [x] Hospedagem: Cloudflare Workers/Pages — https://peskpass.leonardocaineli.workers.dev
- [x] Repositório GitHub: github.com/leonardocaineli/peskpass (branch main)
- [x] README criado

# TODO — PeskPASS Landing Page

## Pendente

> Nenhum item crítico pendente. ✅ A captura de leads está funcionando em produção.

### 🚀 Deploy

- [ ] **Configurar domínio** — apontar `peskpass.com.br` no projeto Pages em Settings → Custom domains.
  - [ ] **Ao apontar o domínio, trocar as URLs de `peskpass.pages.dev` → `peskpass.com.br`** em `index.html` (7 ocorrências: `canonical`, `og:url`, `og:image`, `twitter:image`, `url` dos schemas SoftwareApplication/Organization e `logo` da Organization). Hoje apontam para `pages.dev` porque o domínio ainda não está no ar (senão o preview de link, ex. WhatsApp, fica sem imagem). Depois: redeploy + re-scrape no Facebook Sharing Debugger.

## Concluído

### Otimização técnica (code review)

- [x] **Captura de leads funcionando em produção** — `fetch` POST para `/api/lead` (Pages Function `functions/api/lead.js`) gravando no banco D1 `peskpass-leads`, com validação no servidor e honeypot anti-spam; front com estados de enviando/sucesso/erro. Testado em prod (cadastro gravado e confirmado via `SELECT`)
- [x] **og:image + twitter:image** — imagem 1200×630 (`og-image.png`) criada com mockup real do app + `og:image:width/height/alt` e `og:site_name`
- [x] **Favicon + apple-touch-icon** — `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png` e `theme-color`
- [x] **Imagens otimizadas** — PNG → WebP (1.270 KB → 530 KB, -59%), com `width`/`height` (elimina CLS), `decoding="async"`, `loading="lazy"` e `fetchpriority="high"` no 1º slide
- [x] **Calculadora validada** — inputs `type="number"` com `min`/`max`/`step`, tratamento de `NaN`/negativos e mensagem de erro objetiva e legível
- [x] **Acessibilidade** — `:focus-visible` global, `@media (prefers-reduced-motion: reduce)`, carrossel com botão de pausa + pausa ao foco do teclado (WCAG 2.2.2/2.3.3/2.4.7), `aria-expanded` sincronizado no FAQ
- [x] **H1 orientado a benefício + palavra-chave** — "Seu pesqueiro lotado, organizado e pago antes de abrir o portão"
- [x] **Schema FAQPage + Organization** adicionados (além do SoftwareApplication)
- [x] **Seção "Depoimentos" → "Relatos reais"** no nav/rodapé/seção, deixando explícito que são relatos de fóruns, não clientes
- [x] **Estilos e handlers inline removidos** — `0` ocorrências de `style=` e de `onclick/onsubmit`; substituídos por classes utilitárias e `addEventListener`
- [x] **CTA no resultado da calculadora** — botão "Garantir minha vaga →" que leva ao cadastro
- [x] **`.revelar` resiliente a JS desativado** — só esconde quando `html.js` está presente
- [x] **CSS migrado para mobile-first** — base mobile + um único `@media (min-width: 900px)`
- [x] **Sanitização** — removidas imagens órfãs (9 `hero-*.png`, `mapa-lago.png`, `og-image.webp`) e CSS/JS mortos (`.nav-separador`, `.oque-credibilidade`, `.depoimentos-demanda`, `.calc-cta`, etc.)

### Estrutura e conteúdo (base)

- [x] Estrutura de seções completa (Hero, Problema, Solução, Calculadora, Como funciona, Antes/depois, Funcionalidades, Relatos, FAQ, Cadastro)
- [x] Carrossel do hero (hero-1.webp a hero-9.webp) com slide automático a cada 5s, pontos de navegação e pausa no hover
- [x] Mapa do lago com imagem real (mapa-lago.webp) na seção Funcionalidades
- [x] Assets organizados em subpastas: `/assets/images/`, `/assets/css/`, `/assets/js/`
- [x] CSS separado do HTML → `assets/css/style.css`
- [x] JavaScript separado do HTML → `assets/js/script.js`
- [x] Imagem placeholder da Cloudbeds removida
- [x] Copy revisada: escassez padronizada (100 vagas), CTAs unificados, "app" → "plataforma", calculadora reenquadrada como potencial máximo, concordâncias corrigidas
- [x] Formulário com campos essenciais (Nome do pesqueiro, Responsável, Cidade, Estado, E-mail, WhatsApp)
- [x] Responsividade mobile: carrossel 100% largura, sombras ajustadas, scroll-padding-top no nav fixo
- [x] FAQ max-height aumentado (300px → 600px) para respostas longas não cortarem no mobile
- [x] Relatos com textos reais e fonte de origem (grupo Facebook, fórum, WhatsApp)
- [x] Preconnect para Google Fonts + display=block nos Material Symbols (sem flash de ícones como texto)
- [x] Navegação: header com 5 itens, footer com 8 (sitemap completo)
- [x] Hospedagem: Cloudflare Pages — https://peskpass.pages.dev (deploy via `wrangler pages deploy .`)
- [x] Repositório GitHub: github.com/leonardocaineli/peskpass (branch main)
- [x] README criado

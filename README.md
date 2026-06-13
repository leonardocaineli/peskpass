# PeskPASS — Landing Page

> Plataforma de reservas para pesqueiros brasileiros. Donos gerenciam vagas e pagamentos; pescadores reservam o espaço favorito no lago com antecedência.

## URLs

| Ambiente | URL |
|---|---|
| Produção | https://peskpass.com.br (domínio a apontar) |
| No ar | https://peskpass.pages.dev (Cloudflare Pages) |

---

## O que é

Landing page de pré-lançamento do PeskPASS, capturando cadastros de donos de pesqueiro. Página única com seções:

- **Hero** — proposta de valor + carrossel de telas do app
- **Problema** — dores do pesqueiro sem sistema (fila, no-show, receita imprevisível)
- **Solução** — o que é o PeskPASS para o dono e para o pescador
- **Calculadora** — estimativa de potencial de faturamento com reservas antecipadas
- **Como funciona** — passo a passo para pesqueiro e pescador
- **Antes/depois** — comparativo sem e com PeskPASS
- **Funcionalidades** — mapa do lago, pacotes, pagamento antecipado, painel, etc.
- **Relatos** — depoimentos coletados de pescadores em grupos online
- **FAQ** — dúvidas frequentes (custo, app, pagamento, cancelamento, walk-ins)
- **Cadastro** — formulário de pré-lançamento (Nome, Pesqueiro, Cidade, Estado, WhatsApp)

## Stack

| Camada | Tecnologia | Observação |
|---|---|---|
| Frontend | HTML + CSS externo + Vanilla JS externo | Single file HTML — sem framework, sem build |
| Tipografia | Plus Jakarta Sans + DM Sans | Google Fonts com preconnect |
| Ícones | Material Symbols Rounded | Google Fonts — variável, sem instalação |
| Assets | WebP (hero-1 a hero-9, mapa-lago) | Hospedados localmente em `/assets` |
| Hospedagem | Cloudflare Pages | Direct Upload ou via repositório Git |
| Formulário | Cloudflare Pages Functions + D1 | `functions/api/lead.js` grava no banco D1 (sem terceiros) |
| Domínio | peskpass.com.br | A apontar para Cloudflare Pages |

## Estrutura

```
peskpass/
├── index.html          — página única (HTML puro, sem CSS/JS inline)
├── assets/
│   ├── css/
│   │   └── style.css   — todos os estilos (mobile-first)
│   ├── js/
│   │   └── script.js   — todo o JavaScript
│   └── images/
│       ├── hero-1.webp — telas do app para o carrossel do hero
│       ├── ...
│       ├── hero-9.webp
│       ├── mapa-lago.webp
│       ├── og-image.png        — preview social (1200×630)
│       └── favicon.ico, favicon-32.png, apple-touch-icon.png
├── functions/
│   └── api/
│       └── lead.js     — Pages Function: POST /api/lead → grava no D1
├── schema.sql          — schema da tabela `leads`
├── wrangler.toml       — config do Pages + binding do D1
├── README.md
└── TODO.md
```

## Deploy — Cloudflare Pages

1. Acesse **Cloudflare Pages → Create a project → Direct Upload**
2. Faça upload da pasta `peskpass/` inteira
3. Sem build command — raiz é o próprio `index.html`
4. Após o deploy, configure o domínio em **Custom domains → peskpass.com.br**

## Formulário de cadastro (leads → Cloudflare D1)

O formulário envia um `POST` para `/api/lead`, atendido pela Pages Function `functions/api/lead.js`, que valida e grava cada lead no banco **D1**. Mesma origem do site (sem CORS) e sem serviços de terceiros.

**Configuração (uma vez):**

```bash
# 1. Criar o banco D1
npx wrangler d1 create peskpass-leads
#    → copie o "database_id" retornado para o wrangler.toml

# 2. Criar a tabela
npx wrangler d1 execute peskpass-leads --remote --file=./schema.sql

# 3. Publicar (Functions + D1 já vão junto)
npx wrangler pages deploy .
```

> Se o deploy for via **Direct Upload** (dashboard), configure o binding manualmente em
> **Pages → Settings → Functions → D1 database bindings**: variável `DB` → `peskpass-leads`.

**Consultar os leads:**

```bash
npx wrangler d1 execute peskpass-leads --remote --command "SELECT * FROM leads ORDER BY criado_em DESC;"
```

Proteção anti-spam: campo honeypot oculto (`website`) — se preenchido, o servidor descarta silenciosamente.

## Desenvolvimento local

Abra `index.html` diretamente no navegador ou use o **Live Server** (VS Code — extensão de Ritwick Dey) para hot reload.

```
Extensão recomendada: Live Server (Ritwick Dey) — VS Code Marketplace
```

## Público-alvo

**Donos de pesqueiro (B2B)** — pesqueiros que operam 5–7x por semana no Brasil (estimativa: 17.000+ no país). Tom direto, linguagem simples, sem jargão técnico.

## Licença

Proprietário — © 2026 PeskPASS

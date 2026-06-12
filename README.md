# PeskPASS — Landing Page

> Plataforma de reservas para pesqueiros brasileiros. Donos gerenciam vagas e pagamentos; pescadores reservam o espaço favorito no lago com antecedência.

## URLs

| Ambiente | URL |
|---|---|
| Produção | https://peskpass.com.br (a publicar) |
| Staging | https://peskpass.pages.dev (a publicar) |

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
| Frontend | HTML + CSS (embedded) + Vanilla JS | Single file — sem framework, sem build |
| Tipografia | Plus Jakarta Sans + DM Sans | Google Fonts com preconnect |
| Ícones | Material Symbols Rounded | Google Fonts — variável, sem instalação |
| Assets | PNG (hero-1 a hero-9, mapa-lago) | Hospedados localmente em `/assets` |
| Hospedagem | Cloudflare Pages | Direct Upload ou via repositório Git |
| Formulário | A definir | Candidatos: Cloudflare Workers, Formspree |
| Domínio | peskpass.com.br | A apontar para Cloudflare Pages |

## Estrutura

```
peskpass/
├── index.html        — página única (HTML + CSS + JS)
├── assets/
│   ├── hero-1.png    — telas do app para o carrossel do hero
│   ├── hero-2.png
│   ├── ...
│   ├── hero-9.png
│   └── mapa-lago.png — screenshot do mapa do lago (seção Funcionalidades)
├── README.md
└── TODO.md
```

## Deploy — Cloudflare Pages

1. Acesse **Cloudflare Pages → Create a project → Direct Upload**
2. Faça upload da pasta `peskpass/` inteira
3. Sem build command — raiz é o próprio `index.html`
4. Após o deploy, configure o domínio em **Custom domains → peskpass.com.br**

## Desenvolvimento local

Abra `index.html` diretamente no navegador ou use o **Live Server** (VS Code — extensão de Ritwick Dey) para hot reload.

```
Extensão recomendada: Live Server (Ritwick Dey) — VS Code Marketplace
```

## Público-alvo

**Donos de pesqueiro (B2B)** — pesqueiros que operam 5–7x por semana no Brasil (estimativa: 17.000+ no país). Tom direto, linguagem simples, sem jargão técnico.

## Licença

Proprietário — © 2026 PeskPASS

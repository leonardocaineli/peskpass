-- Tabela de leads do pré-lançamento PeskPASS (Cloudflare D1)
-- Aplicar com:
--   npx wrangler d1 execute peskpass-leads --remote --file=./schema.sql
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome_pesqueiro TEXT NOT NULL,
  nome_responsavel TEXT NOT NULL,
  cidade TEXT,
  estado TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  criado_em TEXT NOT NULL,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_criado_em ON leads (criado_em);
CREATE INDEX IF NOT EXISTS idx_leads_estado ON leads (estado);

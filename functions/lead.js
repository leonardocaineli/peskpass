// Cloudflare Pages Function — POST /lead
// Recebe o cadastro do pré-lançamento e grava no D1 (binding "DB").
//
// Binding esperado (configurado no wrangler.toml ou no painel do Cloudflare Pages):
//   DB -> banco D1 (obrigatório)

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Lê tanto FormData quanto JSON
  let data = {};
  try {
    const tipo = request.headers.get("content-type") || "";
    if (tipo.includes("application/json")) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form);
    }
  } catch {
    return json({ ok: false, error: "Requisição inválida." }, 400);
  }

  // Honeypot: se o campo oculto veio preenchido, é bot — fingimos sucesso e ignoramos
  if (data.website) return json({ ok: true });

  const limpar = (v) => (typeof v === "string" ? v.trim() : "");
  const lead = {
    nome_pesqueiro: limpar(data.nome_pesqueiro),
    nome_responsavel: limpar(data.nome_responsavel),
    cidade: limpar(data.cidade),
    estado: limpar(data.estado),
    email: limpar(data.email),
    whatsapp: limpar(data.whatsApp || data.whatsapp),
  };

  // Validação mínima no servidor
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email);
  if (!lead.nome_pesqueiro || !lead.nome_responsavel || !lead.estado || !emailOk) {
    return json({ ok: false, error: "Preencha os campos obrigatórios corretamente." }, 400);
  }

  if (!env.DB) {
    return json({ ok: false, error: "Banco de dados não configurado." }, 500);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO leads
         (nome_pesqueiro, nome_responsavel, cidade, estado, email, whatsapp, criado_em, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        lead.nome_pesqueiro,
        lead.nome_responsavel,
        lead.cidade,
        lead.estado,
        lead.email,
        lead.whatsapp,
        new Date().toISOString(),
        request.headers.get("user-agent") || "",
      )
      .run();
  } catch {
    return json({ ok: false, error: "Não foi possível salvar o cadastro." }, 500);
  }

  return json({ ok: true });
}

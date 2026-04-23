const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TO_EMAIL = "info@skcdigital.co.za"; // <-- change to your inbox
const FROM_EMAIL = "SKC Digital <info@skcdigital.co.za>"; // verified domain
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

interface Body { name: string; email: string; message: string; }

function badRequest(msg: string) {
  return new Response(JSON.stringify({ error: msg }), {
    status: 400,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return badRequest("Method not allowed");

  let body: Body;
  try { body = await req.json(); } catch { return badRequest("Invalid JSON"); }

  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();

  if (!name || name.length > 100) return badRequest("Invalid name");
  if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return badRequest("Invalid email");
  if (!message || message.length > 2000) return badRequest("Invalid message");

  // Log so you can see submissions in Edge Function logs even before email is wired.
  console.log("[contact-submit] new submission", { name, email, len: message.length });

  // Send email via Resend (through Lovable connector gateway)
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      console.warn("Resend not configured; skipping email send");
    } else {
      const html = `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
      `;
      const resp = await fetch(`${GATEWAY_URL}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          reply_to: email,
          subject: `New contact from ${name}`,
          html,
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        console.error(`Resend send failed [${resp.status}]:`, data);
      } else {
        console.log("Resend send ok", data);
      }
    }
  } catch (e) {
    console.warn("email send error", e);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

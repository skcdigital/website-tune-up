import { corsHeaders } from "@supabase/supabase-js/cors";

const TO_EMAIL = "info@skcdigital.co.za"; // <-- change to your inbox

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

  // Forward via Lovable's transactional email if configured (optional — soft fail).
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (SUPABASE_URL && SERVICE_ROLE) {
      // Best-effort notification; ignore errors so the form still succeeds.
      await fetch(`${SUPABASE_URL}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${SERVICE_ROLE}` },
        body: JSON.stringify({
          templateName: "contact-form-notification",
          recipientEmail: TO_EMAIL,
          idempotencyKey: `contact-${crypto.randomUUID()}`,
          templateData: { name, email, message },
        }),
      }).catch((e) => console.warn("email notify failed", e));
    }
  } catch (e) { console.warn("notify error", e); }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

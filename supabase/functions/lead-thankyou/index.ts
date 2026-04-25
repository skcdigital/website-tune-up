const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TO_NOTIFY = "info@skcdigital.co.za";
const FROM_EMAIL = "SKC Digital <info@skcdigital.co.za>";
const GUIDE_URL = "https://skcdigital.co.za/google-business-profile-guide.pdf";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

interface Body { email: string; source?: string; }

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

  const email = (body.email ?? "").toString().trim().toLowerCase();
  const source = (body.source ?? "unknown").toString().trim().slice(0, 100);

  if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return badRequest("Invalid email");
  }

  console.log("[lead-thankyou]", { email, source });

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    console.warn("Resend not configured; skipping email send");
    return new Response(JSON.stringify({ ok: true, sent: false }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#222;line-height:1.6">
    <h2 style="color:#0b0b14;margin-bottom:8px">Thanks for grabbing the guide 👋</h2>
    <p>Hi there,</p>
    <p>Thanks for downloading the <strong>Google Business Profile Setup Guide</strong> for South African small businesses. Here's your link:</p>
    <p style="margin:24px 0">
      <a href="${GUIDE_URL}" style="background:#00b8cc;color:#fff;text-decoration:none;padding:12px 22px;border-radius:6px;font-weight:600">Open the guide →</a>
    </p>
    <p>The 7 steps inside take most owners about 30 minutes to work through. By the end your business should start showing up on Google Maps and Search for your area.</p>
    <p><strong>Stuck on a step?</strong> Just reply to this email or WhatsApp me on
      <a href="https://wa.me/27673793503" style="color:#00b8cc">+27 67 379 3503</a> — I'll help you through it.</p>
    <p style="margin-top:28px">Cheers,<br/>Suzan<br/><span style="color:#666;font-size:13px">SKC Digital · Pretoria</span></p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
    <p style="font-size:12px;color:#888">You're getting this because you requested the guide on skcdigital.co.za. If this wasn't you, just ignore this email.</p>
  </div>`;

  const adminHtml = `
    <h3>New lead captured</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Source:</strong> ${source}</p>
    <p>Thank-you email auto-sent.</p>
  `;

  try {
    // Send to lead
    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        reply_to: TO_NOTIFY,
        subject: "Your Google Business Profile guide is here 📍",
        html,
      }),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) console.error(`Lead email failed [${resp.status}]:`, data);
    else console.log("Lead email sent", data);

    // Notify admin
    await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_NOTIFY],
        subject: `New lead: ${email} (${source})`,
        html: adminHtml,
      }),
    }).catch((e) => console.warn("admin notify failed", e));
  } catch (e) {
    console.error("send error", e);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

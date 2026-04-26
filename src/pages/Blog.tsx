import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SITE, waLink } from "@/lib/site";

const TITLE = "Blog — Practical Tips for SA Small Businesses | SKC Digital";
const DESC =
  "Honest, practical articles on Excel, automation, websites and digital tools written for South African small business owners — no jargon, no upsells.";

const POSTS = [
  {
    tag: "Get Found Online",
    title: "Get Your Business On Google Maps in 7 Simple Steps",
    excerpt: "The exact free setup most local SA businesses skip — and why it brings in more customers than Facebook ads. Free walkthrough.",
    readTime: "10 min",
    date: "Free guide",
  },
  {
    tag: "Get Found Online",
    title: "Why Your WhatsApp Catalog Is Costing You Sales",
    excerpt: "How a R1,500 one-page website outperforms scrolling through 47 WhatsApp images — with real before/after numbers.",
    readTime: "6 min",
    date: "By Suzan",
  },
  {
    tag: "Run Your Business Better",
    title: "5 Excel Tricks That Save SA Spaza & Salon Owners 4 Hours a Week",
    excerpt: "Simple formulas and templates for stock, sales, and daily takings — no accountant needed. SUM, IF, VLOOKUP and more, in plain English.",
    readTime: "7 min",
    date: "By Suzan",
  },
];

function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Practical tips for <span className="text-gradient">SA small business</span>
          </>
        }
        description="Plain-English guides on getting your business online, automating boring stuff, and looking professional without breaking the bank."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface/40 p-7 transition-colors hover:border-primary/40"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/15 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-primary">
                  {p.tag}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {p.date}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {p.readTime}
                </span>
              </div>
              <h2 className="font-display text-2xl font-semibold transition-colors group-hover:text-primary">
                {p.title}
              </h2>
              <p className="text-muted-foreground">{p.excerpt}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-surface/40 p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">
            Want articles in your WhatsApp?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Send us a quick &ldquo;subscribe&rdquo; and we&apos;ll WhatsApp you when each new article goes live. No spam — just useful posts.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(`Hi ${SITE.name}, please add me to your blog updates.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Get blog updates
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:border-primary/40"
            >
              Suggest a topic
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export default BlogPage;

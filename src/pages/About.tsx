import { Link } from "react-router-dom";
import { GraduationCap, Briefcase, MapPin, Clock, Zap, Heart, Globe2, Quote } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SITE, waLink } from "@/lib/site";

const TITLE = "About SKC Digital — Suzan Kwinika, Pretoria IT Founder";
const DESC =
  "SKC Digital is run by Suzan Kwinika, a Pretoria-based IT professional and BCom Business Informatics student building practical digital tools for South African SMEs.";

const TESTIMONIALS = [
  { name: "Thandi M.", role: "Salon Owner · Soshanguve", initials: "TM", text: "SKC built me a cash flow tracker in two days. I finally know exactly where my money goes every month. Best R400 I've spent on my business." },
  { name: "Johan P.", role: "Plumber · Centurion", initials: "JP", text: "My old website was embarrassing. SKC Digital rebuilt it in 48 hours and now customers actually message me from the site. Worth every cent." },
  { name: "Nomvula M.", role: "Caterer · Mamelodi", initials: "NM", text: "No long meetings, no overcharging. I sent a WhatsApp, got a quote in an hour, and my invoice template was ready the next day. Refreshing service." },
];

const STACK = [
  { icon: "📊", name: "Excel" },
  { icon: "🐍", name: "Python" },
  { icon: "🌐", name: "HTML/CSS" },
  { icon: "⚡", name: "JavaScript" },
  { icon: "🗄️", name: "SQL" },
  { icon: "☁️", name: "Google Sheets" },
  { icon: "🔷", name: "Power BI" },
  { icon: "📁", name: "SharePoint" },
  { icon: "🖥️", name: "Windows" },
  { icon: "🚀", name: "Vercel" },
  { icon: "📧", name: "M365" },
  { icon: "🔧", name: "Automation" },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            The person behind <span className="text-gradient">SKC Digital</span>
          </>
        }
        description="You're not dealing with a faceless agency. You're working directly with someone who understands both the tech and the business side."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="rounded-2xl border border-border bg-surface/40 p-8">
            <div className="grid h-24 w-24 place-items-center rounded-2xl bg-primary text-primary-foreground font-display text-4xl font-bold">
              SK
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">Suzan Kwinika</h2>
            <p className="mt-1 text-sm text-muted-foreground">Founder · Developer · BCom Student</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Pretoria, Gauteng</li>
              <li className="flex items-center gap-3"><Briefcase className="h-4 w-4 text-primary" /> IT Professional · 3+ years</li>
              <li className="flex items-center gap-3"><GraduationCap className="h-4 w-4 text-primary" /> BCom Business Informatics · UNISA</li>
              <li className="flex items-center gap-3"><Clock className="h-4 w-4 text-primary" /> Available evenings & weekends</li>
            </ul>
            <a
              href={waLink(`Hi Suzan, I'd like to chat about a project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Message Suzan on WhatsApp
            </a>
          </div>

          <div>
            <p className="font-display text-2xl leading-relaxed">
              Hi, I&apos;m <span className="text-primary">Suzan</span> — I started SKC Digital because I saw too many small South African businesses paying for clunky software they didn&apos;t need, or doing everything by hand on paper.
            </p>
            <p className="mt-5 text-muted-foreground">
              By day I work in IT. By night I study <strong className="text-foreground">BCom Business Informatics</strong> at UNISA. That mix means I don&apos;t just build tools — I understand <em>why</em> a business needs them, what saves money, and what just looks fancy.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every project I take on is built personally, priced fairly and delivered fast. No long contracts, no jargon, no long wait — just practical digital tools that help your business run better.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Pill icon={<Zap className="h-4 w-4" />} title="Fast Delivery" body="Most projects in 24–48 hours" />
              <Pill icon={<Heart className="h-4 w-4" />} title="Direct Contact" body="WhatsApp the founder directly" />
              <Pill icon={<Globe2 className="h-4 w-4" />} title="Local Pricing" body="ZAR rates, EFT-friendly" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">Tools & technologies</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Our tech stack</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            The tools we use daily to build fast, reliable solutions for our clients.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {STACK.map((t) => (
              <div
                key={t.name}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/40"
              >
                <span className="text-3xl">{t.icon}</span>
                <span className="font-mono text-xs text-muted-foreground">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">Testimonials</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            What clients are saying
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Honest feedback from South African business owners we&apos;ve helped.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-border bg-surface/40 p-6"
              >
                <Quote className="h-6 w-6 text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">★★★★★</p>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 font-mono text-sm font-semibold text-primary">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Start your project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Pill({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4">
      <div className="flex items-center gap-2 text-primary">{icon}<span className="font-mono text-xs uppercase tracking-wider">{title}</span></div>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
export default AboutPage;

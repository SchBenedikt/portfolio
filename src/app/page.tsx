"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProjectArtwork from "@/components/project-artwork";
import { useAchievements } from "@/components/providers/achievements-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { projectData } from "@/lib/projects";
import "./home-redesign.css";

const featuredSlugs = ["notio", "meum-diarium"] as const;

const copy = {
  de: {
    eyebrow: "Persönliches Portfolio · 2026",
    introduction: "Ich entwickle digitale Produkte, denke gern über Fachgrenzen hinweg und mache aus Ideen greifbare Projekte.",
    subintro: "Webentwicklung, Open Source & Crossmedia.",
    viewProjects: "Projekte entdecken",
    about: "Mehr über mich",
    imageCaption: "Crossmedia-Preis · Bayerischer Rundfunk, 2025",
    scroll: "Weiter entdecken",
    selectedLabel: "01 / Was ich mache",
    selectedTitle: "Ausgewählte Arbeiten",
    selectedIntro: "Nicht nur Konzepte, sondern Projekte, die man ausprobieren, lesen oder benutzen kann.",
    allProjects: "Alle Projekte ansehen",
    projectLabels: ["Webanwendung · Bildung", "Crossmedia · Storytelling"],
    projectDescriptions: [
      "Eine digitale Lernplattform, die Schulalltag und Leistungsübersicht übersichtlicher macht. Ausgezeichnet beim Crossmedia-Wettbewerb.",
      "Antike Geschichte als interaktiver Influencer-Blog: gemeinsam entwickelt und mit dem Deutschen Multimediapreis mb21 ausgezeichnet."
    ],
    researchLabel: "Weitere Arbeit / 2026",
    researchTitle: "Wie nachhaltig können Rechenzentren sein?",
    researchDescription: "Eine wissenschaftliche Arbeit über Infrastruktur, Energieeffizienz und Rechenzentren – auf der Erde und darüber hinaus.",
    researchLink: "Wissenschaftswoche 2026 lesen",
    awardsLabel: "02 / Anerkennung",
    awardsTitle: "Ausgezeichnete Ideen.",
    awardsIntro: "Zwei Projekte, zwei Auszeichnungen – und viel Motivation, Neues auszuprobieren.",
    awards: [
      { year: "2025", title: "Crossmedia-Preis", detail: "Sparte Interactive · Bayerischer Rundfunk", project: "Notio", href: "/projects/notio" },
      { year: "2024", title: "Deutscher Multimediapreis mb21", detail: "Hauptpreis · Meum Diarium", project: "Meum Diarium", href: "/projects/meum-diarium" }
    ],
    allAwards: "Alle Auszeichnungen",
    aboutLabel: "03 / Über mich",
    aboutTitle: "Neugier ist mein Antrieb.",
    aboutParagraph: "Ich bin Schüler am König-Karlmann-Gymnasium in Altötting. Mich interessiert besonders, was entsteht, wenn Technik, Gestaltung und gesellschaftliche Fragen aufeinandertreffen. Ich entwickle Webanwendungen, beschäftige mich mit digitalen Infrastrukturen und erzähle Geschichten über neue Medien.",
    aboutAsideTitle: "Woran ich gern arbeite",
    aboutTopics: ["Web & Open Source", "Digitale Bildung", "Crossmedia & KI", "Self-Hosting"],
    resumeLink: "Meinen Werdegang ansehen",
    exploreLabel: "Noch mehr entdecken",
    moreLinks: [
      { num: "01", name: "Blog", detail: "Gedanken und Einblicke", href: "/blog" },
      { num: "02", name: "Presse", detail: "Berichte und Interviews", href: "/press" },
      { num: "03", name: "Galerie", detail: "Momente und Eindrücke", href: "/gallery" }
    ],
    contactLabel: "Kontakt",
    contactTitle: "Eine Idee im Kopf?",
    contactSubtitle: "Ich freue mich über interessante Projekte, neue Perspektiven und gute Gespräche.",
    contactLink: "In Kontakt kommen"
  },
  en: {
    eyebrow: "Personal portfolio · 2026",
    introduction: "I build digital products, think across disciplines and turn ideas into projects you can actually explore.",
    subintro: "Web development, open source & crossmedia.",
    viewProjects: "Explore projects",
    about: "More about me",
    imageCaption: "Crossmedia Award · Bavarian Broadcasting, 2025",
    scroll: "Scroll to explore",
    selectedLabel: "01 / Selected work",
    selectedTitle: "Things I've made",
    selectedIntro: "More than ideas: projects you can explore, read or use.",
    allProjects: "All projects",
    projectLabels: ["Web application · Education", "Crossmedia · Storytelling"],
    projectDescriptions: [
      "An education platform designed to make grades and everyday learning easier to manage. Recognized at the Crossmedia Awards.",
      "Ancient history as an interactive influencer blog: built together and honored with the German Multimedia Award mb21."
    ],
    researchLabel: "Another project / 2026",
    researchTitle: "How sustainable can data centers be?",
    researchDescription: "A research paper on infrastructure, energy efficiency and data centers – on Earth and beyond.",
    researchLink: "Explore the 2026 research project",
    awardsLabel: "02 / Recognition",
    awardsTitle: "Ideas with impact.",
    awardsIntro: "Two projects, two awards – and plenty of motivation to keep experimenting.",
    awards: [
      { year: "2025", title: "Crossmedia Award", detail: "Interactive category · Bavarian Broadcasting", project: "Notio", href: "/projects/notio" },
      { year: "2024", title: "German Multimedia Award mb21", detail: "Grand prize · Meum Diarium", project: "Meum Diarium", href: "/projects/meum-diarium" }
    ],
    allAwards: "All awards",
    aboutLabel: "03 / About",
    aboutTitle: "Driven by curiosity.",
    aboutParagraph: "I'm a student at König-Karlmann-Gymnasium in Altötting, Germany. I'm interested in what happens when technology, design and social questions intersect. I build web applications, explore digital infrastructure and tell stories through new media.",
    aboutAsideTitle: "What I enjoy working on",
    aboutTopics: ["Web & open source", "Digital education", "Crossmedia & AI", "Self-hosting"],
    resumeLink: "Explore my background",
    exploreLabel: "Explore more",
    moreLinks: [
      { num: "01", name: "Journal", detail: "Ideas and insights", href: "/blog" },
      { num: "02", name: "Press", detail: "Articles and interviews", href: "/press" },
      { num: "03", name: "Gallery", detail: "Moments and impressions", href: "/gallery" }
    ],
    contactLabel: "Contact",
    contactTitle: "Have an idea?",
    contactSubtitle: "I'm always interested in new projects, fresh perspectives and good conversations.",
    contactLink: "Get in touch"
  }
};

export default function Home() {
  const { locale } = useI18n();
  const { unlockAchievement } = useAchievements();
  const c = copy[locale];

  useEffect(() => {
    unlockAchievement("FIRST_STEP");
  }, [unlockAchievement]);

  const featuredProjects = featuredSlugs
    .map(slug => projectData.find(project => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  return (
    <div className="home-refresh">
      <Header />
      <main id="main-content">
        <section className="refresh-hero refresh-shell" aria-labelledby="home-title">
          <div className="refresh-hero-topline">
            <span className="refresh-overline">{c.eyebrow}</span>
            <span className="refresh-hero-symbol" aria-hidden="true">✳</span>
          </div>

          <h1 id="home-title" className="refresh-name">
            <span>Benedikt</span>
            <span>Schächner<span className="refresh-period">.</span></span>
          </h1>

          <div className="refresh-hero-lower">
            <div className="refresh-hero-copy">
              <p className="refresh-lead">{c.introduction}</p>
              <p className="refresh-sublead">{c.subintro}</p>
              <div className="refresh-hero-actions">
                <Link className="refresh-button refresh-button-primary" href="/projects">
                  {c.viewProjects} <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link className="refresh-text-link" href="/resume">
                  {c.about} <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <figure className="refresh-portrait">
              <div className="refresh-portrait-frame">
                <Image
                  src="https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/crossmedia-3.jpeg"
                  alt="Benedikt Schächner bei der Crossmedia-Preisverleihung des Bayerischen Rundfunks"
                  width={760}
                  height={960}
                  priority
                  sizes="(max-width: 720px) 90vw, (max-width: 1050px) 40vw, 400px"
                />
              </div>
              <figcaption>{c.imageCaption}</figcaption>
            </figure>
          </div>

          <a className="refresh-scroll-cue" href="#arbeiten">
            <ArrowDown size={17} aria-hidden="true" />
            <span>{c.scroll}</span>
          </a>
        </section>

        <section className="refresh-section refresh-shell" id="arbeiten" aria-labelledby="work-title">
          <div className="refresh-section-heading">
            <div>
              <p className="refresh-overline">{c.selectedLabel}</p>
              <h2 id="work-title">{c.selectedTitle}<span className="refresh-period">.</span></h2>
            </div>
            <p>{c.selectedIntro}</p>
          </div>

          <div className="refresh-projects">
            {featuredProjects.map((project, index) => (
              <article className="refresh-project" key={project.slug}>
                <Link href={"/projects/" + project.slug} className="refresh-project-picture" aria-label={project.title}>
                  <ProjectArtwork slug={project.slug} />
                  <span className="refresh-project-picture-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
                </Link>
                <div className="refresh-project-meta">
                  <span>{String(index + 1).padStart(2, "0")} / {c.projectLabels[index]}</span>
                  <span>{project.date.slice(0, 4)}</span>
                </div>
                <h3><Link href={"/projects/" + project.slug}>{project.title} <ArrowUpRight size={24} aria-hidden="true" /></Link></h3>
                <p>{c.projectDescriptions[index]}</p>
              </article>
            ))}
          </div>

          <Link className="refresh-research" href="/projects/wissenschaftswoche-2026">
            <span className="refresh-research-icon" aria-hidden="true">↗</span>
            <span className="refresh-research-content">
              <span className="refresh-overline">{c.researchLabel}</span>
              <strong>{c.researchTitle}</strong>
              <span>{c.researchDescription}</span>
            </span>
            <span className="refresh-research-cta">{c.researchLink} <ArrowUpRight size={17} aria-hidden="true" /></span>
          </Link>

          <Link className="refresh-inline-link" href="/projects">{c.allProjects} <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </section>

        <section className="refresh-awards" aria-labelledby="awards-title">
          <div className="refresh-shell">
            <div className="refresh-section-heading">
              <div>
                <p className="refresh-overline">{c.awardsLabel}</p>
                <h2 id="awards-title">{c.awardsTitle}</h2>
              </div>
              <p>{c.awardsIntro}</p>
            </div>
            <div className="refresh-award-list">
              {c.awards.map((award) => (
                <Link href={award.href} className="refresh-award" key={award.year}>
                  <span className="refresh-award-year">{award.year}</span>
                  <span className="refresh-award-text"><strong>{award.title}</strong><span>{award.detail}</span></span>
                  <span className="refresh-award-project">{award.project}</span>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <Link className="refresh-inline-link" href="/awards">{c.allAwards} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="refresh-about refresh-shell" aria-labelledby="about-title">
          <div>
            <p className="refresh-overline">{c.aboutLabel}</p>
            <h2 id="about-title">{c.aboutTitle}</h2>
          </div>
          <div className="refresh-about-right">
            <p className="refresh-about-body">{c.aboutParagraph}</p>
            <p className="refresh-small-label">{c.aboutAsideTitle}</p>
            <div className="refresh-topics">{c.aboutTopics.map(topic => <span key={topic}>{topic}</span>)}</div>
            <Link className="refresh-inline-link" href="/resume">{c.resumeLink} <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="refresh-explore refresh-shell" aria-label={c.exploreLabel}>
          <p className="refresh-overline">{c.exploreLabel}</p>
          <div className="refresh-explore-grid">
            {c.moreLinks.map(item => (
              <Link key={item.href} href={item.href} className="refresh-explore-link">
                <span className="refresh-overline">{item.num}</span>
                <strong>{item.name}</strong>
                <span className="refresh-explore-bottom">{item.detail}<ArrowUpRight size={20} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="refresh-contact refresh-shell" aria-labelledby="contact-title">
          <div>
            <p className="refresh-overline">{c.contactLabel}</p>
            <h2 id="contact-title">{c.contactTitle}</h2>
            <p>{c.contactSubtitle}</p>
          </div>
          <Link className="refresh-button refresh-button-primary" href="/links">
            {c.contactLink} <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

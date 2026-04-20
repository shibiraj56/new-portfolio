import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { label: "React.js", pct: 90, color: "#61DAFB" },
  { label: "JavaScript ES6+", pct: 88, color: "#F7DF1E" },
  { label: "HTML5 / CSS3", pct: 92, color: "#E34F26" },
  { label: "REST API Integration", pct: 82, color: "#4CAF50" },
  { label: "Git / GitHub", pct: 80, color: "#F05032" },
  { label: "Responsive Design", pct: 85, color: "#38BDF8" },
  { label: "Python", pct: 65, color: "#3776AB" },
  { label: "MySQL / SQL Server", pct: 68, color: "#4479A1" },
  { label: "UI / UX Design", pct: 68, color: "#4479A1" },
  { label: "Manual Testing", pct: 79, color: "#4479A1" },
  { label: "Troubleshooting", pct: 68, color: "#4479A1" },
  { label: "Data Annotation", pct: 76, color: "#4479A1" },
  { label: "Functional Testing", pct: 68, color: "#4479A1" },
  { label: "Test Case Design", pct: 72, color: "#4479A1" },
  { label: "User Acceptance Testing", pct: 74, color: "#4479A1" },
  { label: "Test Reporting", pct: 70, color: "#4479A1" },
];

const EXPERIENCE = [
  {
    role: "Graduate Apprentice Trainee",
    company: "Tamil Nadu State Transport Corporation (VPM) Ltd.",
    location: "Villupuram",
    period: "Jan 2025 – Jan 2026",
    icon: "🚌",
    color: "#E6F1FB",
    points: [
      "Maintained and updated internal web-based operational interfaces with cross-browser compatibility.",
      "Diagnosed and resolved front-end display issues improving accuracy for end users.",
      "Delivered technical guidance to staff on internal web tools.",
    ],
  },
  {
    role: "Human Resources Executive",
    company: "SKL Exports Pvt. Ltd.",
    location: "Tiruppur",
    period: "Oct 2024 – Dec 2024",
    icon: "⚡",
    color: "#EAF3DE",
    points: [
      "Managed end-to-end recruitment lifecycle including sourcing, screening, interviewing, and onboarding of candidates.",
  "Coordinated with department heads to understand manpower requirements and ensured timely hiring closures.",
  "Maintained and updated employee records, attendance, and HR documentation in compliance with company policies.",
  "Assisted in payroll processing, leave management, and statutory compliance (PF, ESI, etc.).",
  "Facilitated employee onboarding, induction programs, and exit formalities.",
  "Addressed employee queries and supported grievance handling to improve workplace satisfaction.",
  "Implemented HR policies and ensured adherence across departments.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "MachDatum Pvt. Ltd.",
    location: "Coimbatore",
    period: "Jun 2023 – Aug 2023",
    icon: "⚡",
    color: "#EAF3DE",
    points: [
      "Built responsive front-end modules with ReactJS from UI designs into reusable components.",
      "Integrated RESTful APIs to display real-time backend data in dashboards.",
      "Debugged layout, API rendering, and cross-browser issues in collaboration with backend team.",
    ],
  },
  {
    role: "PHP Developer Intern",
    company: "Nandha Info Tech",
    location: "Coimbatore",
    period: "Jun 2022 – Jul 2022",
    icon: "🛒",
    color: "#FAEEDA",
    points: [
      "Developed a full-stack PHP/MySQL e-commerce app with product listing, cart, and checkout.",
      "Designed responsive front-end pages with consistent rendering across devices.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Food Ordering Web App",
    icon: "🍔",
    year: "2023",
    tech: ["React.js", "Hooks", "REST API", "State Mgmt"],
    desc: "Fully functional food ordering app with real-time cart updates, dynamic menu rendering, and mock REST API integration.",
    color: "#FAEEDA",
    featured: false,
  },
  {
    title: "Textile Shopping Platform",
    icon: "🧵",
    year: "2023",
    tech: ["PHP", "MySQL", "HTML/CSS"],
    desc: "Responsive full-stack e-commerce platform with product catalog, cart, and order management modules.",
    color: "#E1F5EE",
    featured: false,
  },
  {
    title: "Rummy Card Game",
    icon: "🃏",
    year: "2022",
    tech: ["JavaScript", "DOM API", "CSS3"],
    desc: "Interactive browser-based card game using vanilla JS with real-time game state and event-driven programming.",
    color: "#FBEAF0",
    featured: false,
  },
  {
    title: "License Plate Detection System",
    icon: "🔬",
    year: "2024",
    tech: ["Python", "Computer Vision", "IEEE"],
    desc: "Computer vision data pipeline for license plate detection — published in IEEE May 2024.",
    color: "#E6F1FB",
    featured: true,
  },
  {
    title: "Vehicle Master",
    icon: "🔬",
    year: "2025",
    tech: ["React JS", "JavaScript", "html", "css"],
    desc: "Developed a Vehicle Master management module using React JS to streamline vehicle data handling, including creation, updates, and tracking. Implemented responsive UI components with HTML, CSS, and JavaScript to ensure a seamless user experience and efficient data management.",
    color: "#E6F1FB",
    featured: true,
  },
  {
    title: "Amazon Product Data Analysis",
    icon: "🔬",
    year: "2026",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Excel"],
    desc: "Performed comprehensive analysis of Amazon product data using Python to extract actionable insights on pricing, ratings, and customer trends. Utilized Pandas and NumPy for data cleaning and transformation, and visualized key patterns using Matplotlib and Seaborn to support data-driven decision-making.",
    color: "#E6F1FB",
    featured: true,
  },

];

const CERTIFICATIONS = [
  { title: "Software Engineer Intern", issuer: "HackerRank", date: "Mar 2026" },
  { title: "React (Basic)", issuer: "HackerRank", date: "2024" },
  { title: "JavaScript Basic & Intermediate", issuer: "HackerRank", date: "2024" },
  { title: "Problem Solving Basic & Intermediate", issuer: "HackerRank", date: "2024" },
  { title: "Java (Basic)", issuer: "HackerRank", date: "2024" },
  { title: "IEEE Publication", issuer: "IEEE — License Plate Detection", date: "May 2024" },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function Tag({ label, accent = false }) {
  return (
    <span style={{
      fontSize: 11, padding: "3px 9px", borderRadius: 20,
      background: accent ? "#185FA5" : "#E6F1FB",
      color: accent ? "#fff" : "#185FA5",
      fontWeight: 500,
    }}>{label}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 600, letterSpacing: "1.2px",
      textTransform: "uppercase", color: "#888", marginBottom: 24,
    }}>{children}</p>
  );
}

function AnimatedBar({ pct, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) setTimeout(() => setWidth(pct), delay);
  }, [inView, pct, delay]);
  return (
    <div ref={ref} style={{ height: 3, background: "#f0f0f0", borderRadius: 2, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 2, background: color,
        width: `${width}%`, transition: "width 0.9s cubic-bezier(0.22,1,0.36,1)",
      }} />
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Skills", "Experience", "Projects", "Contact"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "0.5px solid #e8e8e8" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60,
      }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>
          Shibi<span style={{ color: "#378ADD" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {links.map(l => (
            <a key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setActive(l)}
              style={{
                fontSize: 13, fontWeight: active === l ? 600 : 400,
                color: active === l ? "#378ADD" : "#555",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >{l}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const titles = ["React Developer", "Frontend Engineer", "UI Builder"];
  const [ti, setTi] = useState(0);

  useEffect(() => {
    let i = 0;
    let deleting = false;
    let current = titles[ti];
    const interval = setInterval(() => {
      if (!deleting) {
        setTyped(current.slice(0, i + 1));
        i++;
        if (i === current.length) { deleting = true; setTimeout(() => {}, 1200); }
      } else {
        setTyped(current.slice(0, i - 1));
        i--;
        if (i === 0) {
          deleting = false;
          setTi(prev => (prev + 1) % titles.length);
          current = titles[(ti + 1) % titles.length];
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, [ti, titles]);

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "80px 2rem 60px",
      maxWidth: 1100, margin: "0 auto",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%" }}>
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#E6F1FB", color: "#185FA5",
            padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500,
            marginBottom: 24,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#378ADD",
              animation: "pulse 1.8s infinite",
            }} />
            Open to opportunities
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700,
            lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 8,
          }}>
            Shibi Raj S
          </h1>

          <div style={{ fontSize: 22, fontWeight: 500, color: "#378ADD", marginBottom: 20, minHeight: 30 }}>
            {typed}<span style={{ animation: "blink 1s infinite", opacity: 1 }}>|</span>
          </div>

          <p style={{
            fontSize: 15, color: "#666", lineHeight: 1.8,
            maxWidth: 460, marginBottom: 32,
          }}>
            Computer Science graduate building responsive, data-driven web applications
            with React.js and JavaScript. Passionate about clean component architecture,
            great UX, and shipping polished products.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#projects" style={{
              background: "#0F1117", color: "#fff",
              padding: "11px 24px", borderRadius: 8,
              fontSize: 13, fontWeight: 500, textDecoration: "none",
            }}>View Projects →</a>
            <a href="mailto:shibiraj56@gmail.com" style={{
              background: "transparent", color: "#0F1117",
              border: "1px solid #d0d0d0",
              padding: "11px 24px", borderRadius: 8,
              fontSize: 13, textDecoration: "none",
            }}>Get in Touch</a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 32 }}>
            {[["4+", "Internships"], ["7+", "Projects"], ["1", "IEEE Paper"], ["5+", "Certs"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{n}</div>
                <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Avatar card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{
            width: 320, background: "#fff",
            border: "1px solid #eee", borderRadius: 20,
            padding: 28, boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg, #378ADD, #185FA5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 30, fontWeight: 700, color: "#fff",
              marginBottom: 16,
            }}>SR</div>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>Shibi Raj S</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Frontend Developer · React.js & JS</div>
            <div style={{ borderTop: "0.5px solid #f0f0f0", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["📍", "Tiruppur, Tamil Nadu"],
                ["🎓", "BE in CSE — KPR Institute"],
                ["📰", "IEEE Published Author"],
                ["🏆", "YI YUVA Road Safety Chair"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#555" }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}

function Skills() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" ref={ref} style={{
      background: "#FAFAFA", padding: "80px 2rem",
      borderTop: "0.5px solid #eee", borderBottom: "0.5px solid #eee",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Technical Skills</SectionLabel>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 34,
          fontWeight: 700, letterSpacing: -0.8, marginBottom: 40,
        }}>What I work with</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}>
          {SKILLS.map((s, i) => (
            <div key={s.label} style={{
              background: "#fff", border: "0.5px solid #eee",
              borderRadius: 12, padding: "16px 18px",
              opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.5s ease ${i * 0.07}s`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 12, color: "#999" }}>{s.pct}%</span>
              </div>
              <AnimatedBar pct={s.pct} color={s.color} delay={i * 70} />
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["React Hooks", "Component Architecture", "Fetch API", "async/await", "CSS Flexbox/Grid", "Mobile-first", "Chrome DevTools", "npm", "VS Code", "Jupyter"].map(t => (
            <span key={t} style={{
              background: "#fff", border: "0.5px solid #ddd",
              padding: "5px 12px", borderRadius: 20, fontSize: 12, color: "#555",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" style={{ padding: "80px 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Work Experience</SectionLabel>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 34,
          fontWeight: 700, letterSpacing: -0.8, marginBottom: 40,
        }}>Where I've worked</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={exp.role} style={{
              border: `1px solid ${open === i ? "#378ADD" : "#eee"}`,
              borderRadius: 14, overflow: "hidden",
              transition: "border-color 0.2s",
            }}>
              <div
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "18px 22px", cursor: "pointer",
                  background: open === i ? "#F8FBFF" : "#fff",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: exp.color, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>{exp.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{exp.role}</div>
                  <div style={{ fontSize: 13, color: "#777", marginTop: 2 }}>{exp.company} · {exp.location}</div>
                </div>
                <div style={{ fontSize: 12, color: "#aaa" }}>{exp.period}</div>
                <span style={{ color: "#aaa", fontSize: 18, transform: open === i ? "rotate(180deg)" : "none", transition: "0.2s" }}>⌄</span>
              </div>
              {open === i && (
                <div style={{ padding: "4px 22px 18px 78px" }}>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 6 }}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "React.js", "JavaScript", "PHP", "Python"];

  const filtered = filter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.tech.some(t => t.includes(filter)));

  return (
    <section id="projects" style={{
      background: "#FAFAFA", padding: "80px 2rem",
      borderTop: "0.5px solid #eee",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Projects</SectionLabel>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 34,
            fontWeight: 700, letterSpacing: -0.8,
          }}>Things I've built</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 12,
                border: `1px solid ${filter === f ? "#378ADD" : "#ddd"}`,
                background: filter === f ? "#378ADD" : "#fff",
                color: filter === f ? "#fff" : "#555",
                cursor: "pointer", fontWeight: filter === f ? 600 : 400,
              }}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {filtered.map((p) => (
            <div key={p.title} style={{
              background: "#fff",
              border: `1px solid ${p.featured ? "#378ADD" : "#eee"}`,
              borderRadius: 14, padding: 22,
              position: "relative", transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(55,138,221,0.12)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              {p.featured && (
                <span style={{
                  position: "absolute", top: 14, right: 14,
                  background: "#E6F1FB", color: "#185FA5",
                  fontSize: 10, padding: "3px 8px", borderRadius: 20, fontWeight: 600,
                }}>IEEE Published</span>
              )}
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: p.color, fontSize: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14,
              }}>{p.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tech.map(t => <Tag key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section style={{ padding: "80px 2rem", borderTop: "0.5px solid #eee" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Certifications & Achievements</SectionLabel>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 34,
          fontWeight: 700, letterSpacing: -0.8, marginBottom: 36,
        }}>Recognition & credentials</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 12,
        }}>
          {CERTIFICATIONS.map((c) => (
            <div key={c.title} style={{
              background: "#fff", border: "0.5px solid #eee",
              borderRadius: 12, padding: "16px 18px",
              display: "flex", gap: 12, alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 20 }}>🏅</span>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>{c.issuer}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{c.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{
      background: "#0F1117", padding: "80px 2rem",
      color: "#fff",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          fontSize: 11, letterSpacing: "1.2px", textTransform: "uppercase",
          color: "#378ADD", fontWeight: 600, marginBottom: 16,
        }}>Get in Touch</div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 40,
          fontWeight: 700, letterSpacing: -1, marginBottom: 16,
        }}>Let's work together</h2>
        <p style={{ fontSize: 15, color: "#aaa", lineHeight: 1.8, marginBottom: 44 }}>
          I'm actively looking for frontend developer opportunities. If you have a role
          that fits, or just want to chat, feel free to reach out.
        </p>
        <a href="mailto:shibiraj56@gmail.com" style={{
          display: "inline-block",
          background: "#378ADD", color: "#fff",
          padding: "14px 36px", borderRadius: 10,
          fontSize: 14, fontWeight: 600, textDecoration: "none",
          marginBottom: 44,
        }}>shibiraj56@gmail.com</a>

        <div style={{
  display: "flex",
  justifyContent: "center",
  gap: 16,
  flexWrap: "wrap",
}}>
  {[
    { icon: "📞", text: "+91 97870 92977" },
    { icon: "📍", text: "Tiruppur, Tamil Nadu" },
    {
      icon: "💼",
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/shibi-raj-s/"
    },
    {
      icon: "🐙",
      text: "GitHub",
      link: "https://github.com/shibiraj56/"
    }
  ].map((item, index) => (
    <div
      key={index}
      onClick={() => item.link && window.open(item.link, "_blank")}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 14px",
        borderRadius: 10,
        background: "#0e56e6",
        cursor: item.link ? "pointer" : "default",
        transition: "0.2s ease"
      }}
    >
      <span>{item.icon}</span>
      <span>{item.text}</span>
    </div>
  ))}
</div>

        <div style={{ marginTop: 60, borderTop: "0.5px solid #222", paddingTop: 24, fontSize: 12, color: "#555" }}>
          Built with React.js · Designed by Shibi Raj S © {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState("About");

  useEffect(() => {
    // Load Playfair Display font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const sections = ["about", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#fff", color: "#0F1117" }}>
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
}

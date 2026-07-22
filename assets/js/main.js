(() => {
  const links = [...document.querySelectorAll(".section-nav a")];
  const sections = links.map((link) => document.querySelector(link.hash)).filter(Boolean);
  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  const visible = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
      else visible.delete(entry.target.id);
    });
    const current = [...visible].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
    if (!current) return;
    links.forEach((link) => {
      const active = link.hash === `#${current[0]}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-20% 0px -65%" });
  sections.forEach((section) => observer.observe(section));
})();

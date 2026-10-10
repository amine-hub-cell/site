// Replace this with the official IEEE RAS ISSATM email.
const OFFICIAL_EMAIL = "ras-issatm@ieee.org";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

document.querySelector("#contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const subject = form.elements.subject.value.trim() || "Contact — IEEE RAS ISSATM";
  const message = form.elements.message.value.trim();
  const status = form.querySelector(".form-status");

  if (OFFICIAL_EMAIL.includes("YOUR_OFFICIAL")) {
    status.textContent = "Please set the official chapter email in script.js first.";
    return;
  }

  const body = `Hello IEEE RAS ISSATM,%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}`;
  window.location.href = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
});

const spyMap={home:"home",journey:"home",work:"work",expect:"work",gallery:"gallery",team:"team",contact:"contact"};
const spyLinks=document.querySelectorAll(".nav-links a[data-s]");
const spy=new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(!en.isIntersecting)return;
    const key=spyMap[en.target.id]||"home";
    spyLinks.forEach(a=>a.classList.toggle("active",a.dataset.s===key));
  });
},{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("main section[id]").forEach(s=>spy.observe(s));

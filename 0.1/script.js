const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menu');
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const openPolicy = document.getElementById('openPolicy');
const policyLink = document.getElementById('policyLink');
const policyModal = document.getElementById('policyModal');
const closePolicy = document.getElementById('closePolicy');
const contactForm = document.getElementById('contactForm');

function openMenu(force) {
  const shouldOpen = typeof force === 'boolean' ? force : !menu.classList.contains('open');
  menu.classList.toggle('open', shouldOpen);
  navToggle.setAttribute('aria-expanded', String(shouldOpen));
}

navToggle?.addEventListener('click', () => openMenu());
menu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => openMenu(false));
});

const hasAcceptedCookies = localStorage.getItem('mrCookiesAccepted') === 'true';
if (!hasAcceptedCookies) {
  cookieBanner.style.display = 'flex';
}

acceptCookies?.addEventListener('click', () => {
  localStorage.setItem('mrCookiesAccepted', 'true');
  cookieBanner.style.display = 'none';
});

function showPolicy() {
  policyModal.style.display = 'grid';
  policyModal.setAttribute('aria-hidden', 'false');
}
function hidePolicy() {
  policyModal.style.display = 'none';
  policyModal.setAttribute('aria-hidden', 'true');
}

openPolicy?.addEventListener('click', showPolicy);
policyLink?.addEventListener('click', showPolicy);
closePolicy?.addEventListener('click', hidePolicy);
policyModal?.addEventListener('click', (e) => {
  if (e.target === policyModal) hidePolicy();
});

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const button = contactForm.querySelector('button[type="submit"]');
  const oldText = button.textContent;
  button.textContent = 'Mensagem pronta para envio';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = oldText;
    button.disabled = false;
    contactForm.reset();
    alert('Formulário visual pronto. Conecte esse formulário ao WhatsApp, e-mail ou backend.');
  }, 700);
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

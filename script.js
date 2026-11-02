// 1. Mobile menu that opens and closes
const menu = document.getElementById('menu');
const links = document.getElementById('links');
menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', false);
  }
});

// 2. Light and dark theme toggle
const themeBtn = document.getElementById('theme');
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  themeBtn.textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
  try { localStorage.setItem('theme', t); } catch (err) {}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (err) {}
setTheme(saved === 'dark' ? 'dark' : 'light');
themeBtn.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

// 3. Highlight the link of the section you are reading
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    navLinks.forEach(a => {
      const on = a.getAttribute('href') === '#' + en.target.id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => observer.observe(s));

// 4. Expand and collapse project details
document.querySelectorAll('.more').forEach(b => b.addEventListener('click', () => {
  const box = document.getElementById(b.getAttribute('aria-controls'));
  const willOpen = box.hidden;
  box.hidden = !willOpen;
  b.setAttribute('aria-expanded', willOpen);
}));

// 5. Contact form: checks the fields and shows a confirmation (it does not send email)
const form = document.getElementById('form');
const msg = document.getElementById('msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const text = document.getElementById('text').value.trim();
  msg.className = 'err';
  if (!name) return msg.textContent = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return msg.textContent = 'Enter a valid email address.';
  if (text.length < 10) return msg.textContent = 'Write a message of at least 10 characters.';
  msg.className = 'ok';
  msg.textContent = 'Thanks, ' + name + '. Your details look correct. This form does not send email, so please write to me at nakul56p@gmail.com.';
  form.reset();
});

// 6. Back-to-top button
const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => { topBtn.hidden = window.scrollY < 500; });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0 }));

// 7. Footer year
document.getElementById('year').textContent = new Date().getFullYear();

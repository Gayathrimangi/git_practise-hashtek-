const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', open); toggle.textContent = open ? '×' : '☰'; });

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('.role-item').forEach(item => item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter);
}));

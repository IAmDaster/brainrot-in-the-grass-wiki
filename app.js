'use strict';

// Rarity classifications are deliberately not assigned to characters until verified.
const rarities = [
  { name: 'Common', index: '01', tagline: 'The everyday encounter.', cls: 'common', symbol: '●' },
  { name: 'Uncommon', index: '02', tagline: 'A little harder to come by.', cls: 'uncommon', symbol: '✚' },
  { name: 'Rare', index: '03', tagline: 'Worth a second look.', cls: 'rare', symbol: '◆' },
  { name: 'Epic', index: '04', tagline: 'A standout discovery.', cls: 'epic', symbol: '✧' },
  { name: 'Legendary', index: '05', tagline: 'A moment to remember.', cls: 'legendary', symbol: '✦' },
  { name: 'Mythic', index: '06', tagline: 'Far beyond ordinary.', cls: 'mythic', symbol: '✳' },
  { name: 'Secret', index: '07', tagline: 'Mysteries in the grass.', cls: 'secret', symbol: '◈' },
  { name: 'Glitched', index: '08', tagline: 'Something feels different.', cls: 'glitched', symbol: '⌁' }
];

// Character names documented from the project's development roster.
// Colors and symbols are decorative artwork — not in-game rarity assignments.
const characters = [
  { name: 'Noobini Pizzanini', symbol: 'NP', tone: 'lime' },
  { name: 'Bananita Dolphinita', symbol: 'BD', tone: 'gold' },
  { name: 'Lirili Larila', symbol: 'LL', tone: 'mint' },
  { name: 'Brr Brr Patapim', symbol: 'BP', tone: 'blue' },
  { name: 'Bombombini Gusini', symbol: 'BG', tone: 'rose' },
  { name: 'Cappuccino Assassino', symbol: 'CA', tone: 'lavender' },
  { name: 'Chimpanzini Bananini', symbol: 'CB', tone: 'gold' },
  { name: 'Graipuss Medussi', symbol: 'GM', tone: 'lavender' },
  { name: 'La Vaca Saturno Saturnita', symbol: 'LV', tone: 'mint' },
  { name: 'Bombardiro Crocodilo', symbol: 'BC', tone: 'rose' },
  { name: 'Tung Tung Tung Sahur', symbol: 'TS', tone: 'blue' },
  { name: 'Tralalero Tralala', symbol: 'TT', tone: 'lime' },
  { name: 'La Grande Combinasion', symbol: 'LC', tone: 'gold' },
  { name: 'Strawberry Elephant', symbol: 'SE', tone: 'rose' },
  { name: 'Meowl', symbol: 'M', tone: 'lavender' }
];

const rarityGrid = document.querySelector('#rarity-grid');
const characterGrid = document.querySelector('#character-grid');
const searchInput = document.querySelector('#character-search');
const sortSelect = document.querySelector('#character-sort');
const characterCount = document.querySelector('#character-count');
const noResults = document.querySelector('#no-results');
const dialog = document.querySelector('#character-dialog');
let lastActiveElement = null;

rarityGrid.innerHTML = rarities.map(r => `
  <article class="rarity-card rarity-${r.cls}">
    <div class="rarity-card-top"><span>RANK ${r.index}</span><span class="rarity-symbol" aria-hidden="true">${r.symbol}</span></div>
    <div class="rarity-card-bottom"><h3>${r.name}</h3><p>${r.tagline}</p></div>
  </article>
`).join('');

function renderCharacters() {
  const q = searchInput.value.trim().toLocaleLowerCase();
  const current = characters.filter(c => c.name.toLocaleLowerCase().includes(q));
  if (sortSelect.value === 'az') current.sort((a,b) => a.name.localeCompare(b.name));
  if (sortSelect.value === 'za') current.sort((a,b) => b.name.localeCompare(a.name));
  characterGrid.innerHTML = current.map(c => `
    <button type="button" class="character-card character-${c.tone}" data-name="${c.name}" aria-label="Open field record for ${c.name}">
      <span class="character-art" aria-hidden="true"><span class="character-rays"></span><span class="character-mark">${c.symbol}</span><span class="character-mini-star">✧</span></span>
      <span class="character-info"><span class="character-record">ENCOUNTER RECORD <span aria-hidden="true">↗</span></span><strong>${c.name}</strong><span class="character-more">VIEW FIELD RECORD <span>↗</span></span></span>
    </button>`).join('');
  characterCount.textContent = `${current.length} ${current.length === 1 ? 'ENTRY' : 'ENTRIES'}`;
  noResults.hidden = current.length > 0;
}

function openCharacter(name) {
  const entry = characters.find(c => c.name === name);
  if (!entry) return;
  lastActiveElement = document.activeElement;
  document.querySelector('#dialog-title').textContent = entry.name;
  document.querySelector('#dialog-glyph').textContent = entry.symbol;
  document.querySelector('#dialog-visual').className = `dialog-visual character-${entry.tone}`;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
}
function closeCharacter() { if (dialog.open) dialog.close(); }

searchInput.addEventListener('input', renderCharacters);
sortSelect.addEventListener('change', renderCharacters);
characterGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.character-card');
  if (card) openCharacter(card.dataset.name);
});
document.querySelector('#clear-search').addEventListener('click', () => { searchInput.value=''; renderCharacters(); searchInput.focus(); });
document.querySelector('#dialog-close').addEventListener('click', closeCharacter);
document.querySelector('#dialog-back').addEventListener('click', closeCharacter);
dialog.addEventListener('click', event => { if (event.target === dialog) closeCharacter(); });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastActiveElement?.focus(); });

const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#primary-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) { nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Open navigation'); }
});
window.addEventListener('keydown', event => {
  const activeTag = document.activeElement?.tagName;
  if (event.key === '/' && !dialog.open && !['INPUT','TEXTAREA','SELECT'].includes(activeTag) && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault(); searchInput.focus(); document.querySelector('#field-guide').scrollIntoView({ behavior: 'smooth' });
  }
  if (event.key === 'Escape' && nav.classList.contains('is-open')) { nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded','false'); }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
renderCharacters();

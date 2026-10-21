(() => {
  'use strict';
  const blog = document.querySelector('[data-blog]');
  if (!blog) return;
  const catalogue = blog.querySelector('#articles');
  const grid = blog.querySelector('[data-article-grid]');
  const cards = Array.from(grid.querySelectorAll('[data-article]'));
  const search = blog.querySelector('#blog-search');
  const sort = blog.querySelector('#blog-sort');
  const filters = Array.from(blog.querySelectorAll('[data-filter]'));
  const more = blog.querySelector('[data-load-more]');
  const empty = blog.querySelector('[data-empty]');
  const resetRow = blog.querySelector('[data-reset-row]');
  const resetButton = blog.querySelector('[data-reset]');
  const pageSize = 9;
  let category = 'all';
  let limit = pageSize;
  let query = '';
  const normalize = value => value.toLocaleLowerCase('ru').replace(/ё/g, 'е').replace(/[«»".,:!?]/g, ' ').replace(/\s+/g, ' ').trim();
  const searchable = new Map(cards.map(card => [card, normalize(card.textContent)]));
  function updateScrollOffset() {
    const headerHeight = Math.max(0, ...Array.from(document.querySelectorAll('.header__fix')).map(header => header.offsetHeight));
    catalogue.style.scrollMarginTop = `${headerHeight + 24}px`;
  }
  const scrollToCatalogue = () => {
    updateScrollOffset();
    catalogue.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };

  function updateURL() {
    if (location.protocol === 'file:') return;
    const url = new URL(location.href);
    url.searchParams.delete('offline-search');
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    if (category !== 'all') url.searchParams.set('topic', category); else url.searchParams.delete('topic');
    if (sort.value !== 'newest') url.searchParams.set('sort', sort.value); else url.searchParams.delete('sort');
    try { history.replaceState(null, '', url); } catch (_) { /* Local copies also work without browser history access. */ }
  }

  function render() {
    const tokens = normalize(query).split(' ').filter(Boolean);
    const matches = cards.filter(card => (category === 'all' || card.dataset.category === category) && tokens.every(token => searchable.get(card).includes(token)));
    matches.sort((a, b) => sort.value === 'oldest' ? a.dataset.date.localeCompare(b.dataset.date) : sort.value === 'title' ? a.dataset.title.localeCompare(b.dataset.title, 'ru') : b.dataset.date.localeCompare(a.dataset.date));
    cards.forEach(card => { card.hidden = true; });
    matches.forEach((card, index) => { grid.append(card); card.hidden = index >= limit; });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    const shown = Math.min(limit, matches.length);
    more.hidden = shown >= matches.length;
    empty.hidden = matches.length > 0;
    grid.hidden = matches.length === 0;
    resetButton.hidden = !query && category === 'all' && sort.value === 'newest';
    resetRow.hidden = resetButton.hidden;
    updateURL();
  }

  function selectCategory(value, scroll = true) {
    category = filters.some(button => button.dataset.filter === value) ? value : 'all';
    limit = pageSize;
    render();
    if (scroll) scrollToCatalogue();
  }

  function reset() {
    query = '';
    search.value = '';
    category = 'all';
    sort.value = 'newest';
    limit = pageSize;
    render();
  }

  // The copy's shared submit handler owns contact forms; blog search stays local.
  blog.querySelector('[data-blog-search]').addEventListener('click', () => {
    query = search.value.trim();
    limit = pageSize;
    render();
    scrollToCatalogue();
  });
  search.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    blog.querySelector('[data-blog-search]').click();
  });
  let searchTimer;
  search.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { query = search.value.trim(); limit = pageSize; render(); }, 180);
  });
  blog.addEventListener('click', event => {
    const topic = event.target.closest('[data-filter], [data-topic]');
    if (topic) selectCategory(topic.dataset.filter || topic.dataset.topic, !topic.hasAttribute('data-filter'));
    if (event.target.closest('[data-reset], [data-reset-empty]')) reset();
  });
  sort.addEventListener('change', () => { limit = pageSize; render(); });
  more.addEventListener('click', () => {
    const previous = new Set(cards.filter(card => !card.hidden));
    limit += pageSize;
    render();
    const firstNew = Array.from(grid.children).find(card => !card.hidden && !previous.has(card));
    firstNew?.querySelector('a')?.focus({ preventScroll: true });
  });
  updateScrollOffset();
  window.addEventListener('resize', updateScrollOffset);
  const params = new URLSearchParams(location.search);
  query = params.get('q') || params.get('offline-search') || '';
  search.value = query;
  if (['newest', 'oldest', 'title'].includes(params.get('sort'))) sort.value = params.get('sort');
  selectCategory(params.get('topic') || 'all', false);
  if (query || params.has('topic')) requestAnimationFrame(scrollToCatalogue);
})();

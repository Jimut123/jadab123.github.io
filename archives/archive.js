(() => {
  'use strict';

  const elements = {
    results: document.getElementById('archive-results'),
    count: document.getElementById('results-count'),
    search: document.getElementById('archive-search'),
    archive: document.getElementById('filter-archive'),
    category: document.getElementById('filter-category'),
    year: document.getElementById('filter-year'),
    type: document.getElementById('filter-type'),
    sort: document.getElementById('archive-sort'),
    tabs: [...document.querySelectorAll('.archive-tab')]
  };
  let records = [];
  let selectedArchive = 'all';

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const fileUrl = (path) => path.split('/').map(encodeURIComponent).join('/');

  function fillFilter(select, values, label) {
    const selected = select.value;
    select.innerHTML = `<option value="">${label}</option>` + values.map((value) =>
      `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join('');
    if (values.includes(selected)) select.value = selected;
  }

  function visibleRecords() {
    const query = elements.search.value.trim().toLocaleLowerCase();
    return records.filter((record) => {
      if (selectedArchive !== 'all' && record.archive !== selectedArchive) return false;
      if (elements.archive.value && record.archive !== elements.archive.value) return false;
      if (elements.category.value && record.category !== elements.category.value) return false;
      if (elements.year.value && String(record.year ?? '') !== elements.year.value) return false;
      if (elements.type.value && record.document_type !== elements.type.value) return false;
      const haystack = [record.title, record.filename, record.archive, record.category, record.case_id,
        record.case_title, record.date, record.year, record.document_type, record.description,
        record.reference_number].filter(Boolean).join(' ').toLocaleLowerCase();
      return !query || haystack.includes(query);
    }).sort((a, b) => {
      switch (elements.sort.value) {
        case 'date-asc': return (a.date || '9999').localeCompare(b.date || '9999') || a.title.localeCompare(b.title);
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'category-asc': return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
        default: return (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title);
      }
    });
  }

  function render() {
    const items = visibleRecords();
    elements.count.textContent = `${items.length} of ${records.length} documents`;
    if (!items.length) {
      elements.results.innerHTML = '<p class="empty-state">No documents match these search and filter settings.</p>';
      return;
    }

    const groups = new Map();
    items.forEach((record) => {
      const key = record.case_id ? `${record.archive}::${record.case_id}` : `${record.archive}::single::${record.id}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(record);
    });

    elements.results.innerHTML = [...groups.values()].map((group) => {
      const grouped = Boolean(group[0].case_id);
      const title = grouped ? (group[0].case_title || group[0].case_id.replaceAll('-', ' ')) : group[0].title;
      const rows = group.map((record) => {
        const url = fileUrl(record.filepath);
        const isPdf = record.document_type === 'PDF';
        const dateLabel = record.date ? new Date(`${record.date}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : (record.year ? String(record.year) : 'Date not verified');
        const preview = isPdf ? `<details class="pdf-preview"><summary>Preview PDF</summary><iframe title="PDF preview: ${escapeHtml(record.title)}" loading="lazy" src="${url}#view=FitH"></iframe></details>` : '';
        return `<article class="document-row"><span class="file-mark" aria-hidden="true">${isPdf ? 'PDF' : escapeHtml(record.document_type)}</span><div class="document-copy"><h3>${escapeHtml(record.title)}</h3><p class="document-meta"><span>${escapeHtml(dateLabel)}</span><span>${escapeHtml(record.archive)}</span><span>${escapeHtml(record.category)}</span></p>${record.description ? `<p class="document-description">${escapeHtml(record.description)}</p>` : ''}${record.review_required ? '<p class="review-flag">Metadata review required</p>' : ''}${preview}</div><div class="document-actions"><a href="${url}" target="_blank" rel="noopener noreferrer">View</a><a href="${url}" download>Download</a></div></article>`;
      }).join('');
      return `<section class="case-group" aria-label="${escapeHtml(title)}"><div class="case-heading"><span class="case-archive">${escapeHtml(group[0].archive)}</span><h2>${escapeHtml(title)}</h2>${grouped ? `<span class="case-count">${group.length} documents · provisional grouping</span>` : ''}</div>${rows}</section>`;
    }).join('');
  }

  function updateStats() {
    const years = records.map((r) => Number(r.year)).filter(Number.isInteger);
    const cases = new Set(records.map((r) => r.case_id).filter(Boolean));
    document.getElementById('stat-documents').textContent = records.length;
    document.getElementById('stat-cases').textContent = cases.size;
    document.getElementById('stat-years').textContent = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : 'Not established';
  }

  function setArchive(value) {
    selectedArchive = value;
    elements.tabs.forEach((tab) => {
      const active = tab.dataset.archive === value;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    elements.archive.value = value === 'all' ? '' : value;
    render();
  }

  fetch('archives/documents.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load archive index (${response.status}).`);
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error('The archive index must contain a JSON array.');
      records = data;
      fillFilter(elements.archive, [...new Set(records.map((r) => r.archive))].sort(), 'All archives');
      fillFilter(elements.category, [...new Set(records.map((r) => r.category))].sort(), 'All categories');
      fillFilter(elements.year, [...new Set(records.map((r) => r.year).filter(Boolean))].sort((a, b) => b - a).map(String), 'All years');
      fillFilter(elements.type, [...new Set(records.map((r) => r.document_type).filter(Boolean))].sort(), 'All file types');
      updateStats();
      render();
    })
    .catch((error) => {
      elements.count.textContent = 'Archive index unavailable';
      elements.results.innerHTML = `<p class="empty-state">${escapeHtml(error.message)} Open this site through its GitHub Pages URL or a local static web server; browser restrictions may prevent fetch from a file:// URL.</p>`;
    });

  [elements.search, elements.archive, elements.category, elements.year, elements.type, elements.sort].forEach((control) => {
    control.addEventListener(control === elements.search ? 'input' : 'change', render);
  });
  elements.archive.addEventListener('change', () => setArchive(elements.archive.value || 'all'));
  elements.tabs.forEach((tab) => tab.addEventListener('click', () => setArchive(tab.dataset.archive)));
})();

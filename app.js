/* ============================================
   SILVER SYCAMORE - PAGE-BASED DASHBOARD
   Version: 5.0
   ============================================ */

// === CONFIGURATION ===
const ARTIFACTS = {
    'command-center': 'content/command-center.md',
    'engagement-tracker': 'content/engagement-tracker.md',
    'catering': 'content/catering.md',
    'weddings': 'content/weddings.md',
    'other-channels': 'content/other-channels.md',
    'engagement-log': 'content/engagement-log.md',
    'business-map': 'content/business-map.md',
    'people': 'content/people.md',
    'initiatives': 'content/initiatives.md',
    'document-index': 'content/document-index.md'
};

const POLL_INTERVAL = 5000;

// Default tabs for each page
const DEFAULT_TABS = {
    'revenue': 'catering',
    'decisions': 'confirmed',
    'context': 'business',
    'activity': 'log'
};

// Sessions configuration
const SESSIONS_MANIFEST = 'content/sessions/_manifest.md';
const SESSIONS_BASE = 'content/sessions/';

// === STATE ===
let rawContent = {};
let contentHashes = {};
let synthesizedData = null;
let sessionsData = {
    sessions: [],
    sessionContent: {},
    currentSession: null
};

// === ROUTER MODULE ===
const Router = {
    currentPage: null,
    currentTab: null,

    init() {
        window.addEventListener('hashchange', () => this.handleHashChange());
        this.handleHashChange();
    },

    handleHashChange() {
        const hash = window.location.hash || '#/dashboard';
        const parts = hash.replace('#/', '').split('/');
        const pageId = parts[0] || 'dashboard';
        const tabId = parts[1] || null;

        this.navigate(pageId, tabId);
    },

    navigate(pageId, tabId = null) {
        // Validate page exists
        const page = document.querySelector(`[data-page="${pageId}"]`);
        if (!page) {
            this.navigate('dashboard');
            return;
        }

        // Switch page
        this.switchPage(pageId);

        // Handle tabs
        if (DEFAULT_TABS[pageId]) {
            // Page has tabs
            const effectiveTab = tabId || TabMemory.recall(pageId) || DEFAULT_TABS[pageId];
            this.switchTab(pageId, effectiveTab);
        }

        // Update URL if needed (without triggering hashchange)
        const targetHash = tabId ? `#/${pageId}/${tabId}` : `#/${pageId}`;
        if (window.location.hash !== targetHash) {
            history.replaceState(null, '', targetHash);
        }
    },

    switchPage(pageId) {
        if (this.currentPage === pageId) return;

        // Deactivate all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Activate target page
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update nav state
        this.updateNavState(pageId);
        this.currentPage = pageId;

        // Close mobile sidebar
        MobileNav.closeSidebar();
    },

    switchTab(pageId, tabId) {
        const page = document.getElementById(`page-${pageId}`);
        if (!page) return;

        // Update tab buttons
        page.querySelectorAll('.tab-item').forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        // Update tab content
        page.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tabId}`);
        });

        // Remember tab
        TabMemory.remember(pageId, tabId);
        this.currentTab = tabId;
    },

    updateNavState(pageId) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageId);
        });
    }
};

// === TAB MEMORY MODULE ===
const TabMemory = {
    storageKey: 'ss-tab-memory',

    remember(pageId, tabId) {
        try {
            const memory = this.getAll();
            memory[pageId] = tabId;
            sessionStorage.setItem(this.storageKey, JSON.stringify(memory));
        } catch (e) {}
    },

    recall(pageId) {
        const memory = this.getAll();
        return memory[pageId] || null;
    },

    getAll() {
        try {
            return JSON.parse(sessionStorage.getItem(this.storageKey)) || {};
        } catch (e) {
            return {};
        }
    }
};

// === MOBILE NAVIGATION MODULE ===
const MobileNav = {
    init() {
        const toggle = document.getElementById('nav-toggle');
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');

        toggle.addEventListener('click', () => this.toggleSidebar());
        backdrop.addEventListener('click', () => this.closeSidebar());
    },

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('nav-toggle');
        const backdrop = document.getElementById('sidebar-backdrop');
        const isOpen = sidebar.classList.toggle('open');

        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
        backdrop.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    },

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('nav-toggle');
        const backdrop = document.getElementById('sidebar-backdrop');

        sidebar.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
    }
};

// === ACCORDION MODULE ===
const Accordion = {
    init() {
        this.bindAll();
    },

    bindAll() {
        document.querySelectorAll('.accordion-header').forEach(header => {
            // Remove old listeners by cloning
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);

            newHeader.addEventListener('click', () => this.toggle(newHeader));
            newHeader.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle(newHeader);
                }
            });
        });
    },

    toggle(header) {
        const accordion = header.closest('.accordion');
        const isOpen = accordion.classList.toggle('open');
        header.setAttribute('aria-expanded', isOpen);
    },

    openFirst(container) {
        const first = container.querySelector('.accordion');
        if (first) {
            first.classList.add('open');
            const header = first.querySelector('.accordion-header');
            if (header) header.setAttribute('aria-expanded', 'true');
        }
    },

    closeAll(container) {
        container.querySelectorAll('.accordion').forEach(acc => {
            acc.classList.remove('open');
            const header = acc.querySelector('.accordion-header');
            if (header) header.setAttribute('aria-expanded', 'false');
        });
    }
};

// === SESSIONS MODULE ===
const Sessions = {
    async loadManifest() {
        try {
            const response = await fetch(SESSIONS_MANIFEST + '?t=' + Date.now());
            if (!response.ok) {
                sessionsData.sessions = [];
                return;
            }
            const content = await response.text();
            sessionsData.sessions = this.parseManifest(content);
        } catch (error) {
            console.error('Failed to load sessions manifest:', error);
            sessionsData.sessions = [];
        }
    },

    parseManifest(content) {
        // Parse markdown table from _manifest.md
        const sessions = [];
        const lines = content.split('\n');
        let inTable = false;
        let headerParsed = false;

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('|') && trimmed.includes('Session')) {
                inTable = true;
                headerParsed = false;
                continue;
            }
            if (inTable && trimmed.startsWith('|---')) {
                headerParsed = true;
                continue;
            }
            if (inTable && headerParsed && trimmed.startsWith('|')) {
                const cells = trimmed.split('|').map(c => c.trim()).filter(c => c);
                if (cells.length >= 4) {
                    sessions.push({
                        id: cells[0],
                        date: cells[1],
                        type: cells[2],
                        status: cells[3],
                        notes: cells[4] || ''
                    });
                }
            }
            if (inTable && !trimmed.startsWith('|') && trimmed !== '') {
                inTable = false;
            }
        }
        return sessions;
    },

    async loadSessionContent(sessionId) {
        if (sessionsData.sessionContent[sessionId]) {
            return sessionsData.sessionContent[sessionId];
        }

        const session = sessionsData.sessions.find(s => s.id === sessionId);
        if (!session) return null;

        const content = { session: null, notes: [] };

        // Load session.md
        try {
            const sessionPath = SESSIONS_BASE + sessionId + '/session.md';
            const response = await fetch(sessionPath + '?t=' + Date.now());
            if (response.ok) {
                content.session = await response.text();
            }
        } catch (error) {}

        // Parse notes from the Notes field
        if (session.notes) {
            const noteFiles = session.notes.split(',').map(f => f.trim()).filter(f => f);
            for (const file of noteFiles) {
                try {
                    const notePath = SESSIONS_BASE + sessionId + '/' + file;
                    const response = await fetch(notePath + '?t=' + Date.now());
                    if (response.ok) {
                        content.notes.push({
                            file: file,
                            content: await response.text()
                        });
                    }
                } catch (error) {}
            }
        }

        sessionsData.sessionContent[sessionId] = content;
        return content;
    },

    render() {
        const listEl = document.getElementById('sessions-list');
        const detailEl = document.getElementById('session-detail');

        if (sessionsData.sessions.length === 0) {
            listEl.innerHTML = '<p class="empty">No sessions recorded</p>';
            listEl.style.display = 'block';
            detailEl.style.display = 'none';
            return;
        }

        // Group sessions by date (most recent first)
        const sortedSessions = [...sessionsData.sessions].sort((a, b) =>
            b.date.localeCompare(a.date)
        );

        let html = '<ul class="sessions-nav">';
        for (const session of sortedSessions) {
            const statusClass = session.status === 'active' ? 'status-active' : 'status-closed';
            html += `
                <li class="session-item" data-session-id="${escapeHtml(session.id)}">
                    <div class="session-info">
                        <span class="session-date">${escapeHtml(session.date)}</span>
                        <span class="session-type">${escapeHtml(session.type)}</span>
                        <span class="session-badge ${statusClass}">${escapeHtml(session.status)}</span>
                    </div>
                    ${session.notes ? `<div class="session-notes-count">${session.notes.split(',').length} note(s)</div>` : ''}
                </li>
            `;
        }
        html += '</ul>';

        listEl.innerHTML = html;
        listEl.style.display = 'block';
        detailEl.style.display = 'none';

        // Bind click handlers
        listEl.querySelectorAll('.session-item').forEach(item => {
            item.addEventListener('click', () => {
                this.showDetail(item.dataset.sessionId);
            });
        });
    },

    async showDetail(sessionId) {
        const listEl = document.getElementById('sessions-list');
        const detailEl = document.getElementById('session-detail');
        const titleEl = document.getElementById('session-title');
        const statusEl = document.getElementById('session-status');
        const tabsEl = document.getElementById('session-tabs');
        const contentEl = document.getElementById('session-content');
        const backBtn = document.getElementById('session-back');

        // Show loading
        listEl.style.display = 'none';
        detailEl.style.display = 'block';
        contentEl.innerHTML = '<p>Loading session...</p>';

        const session = sessionsData.sessions.find(s => s.id === sessionId);
        if (!session) {
            contentEl.innerHTML = '<p class="error">Session not found</p>';
            return;
        }

        titleEl.textContent = `${session.date} (${session.type})`;
        statusEl.textContent = session.status;
        statusEl.className = `session-status ${session.status === 'active' ? 'status-active' : 'status-closed'}`;

        sessionsData.currentSession = sessionId;

        // Load content
        const content = await this.loadSessionContent(sessionId);

        // Build tabs
        let tabsHtml = '<button class="tab-item active" role="tab" data-session-tab="overview">Overview</button>';
        if (content && content.notes.length > 0) {
            content.notes.forEach((note, idx) => {
                const label = note.file.replace(/\.md$/, '').replace(/^\d+-/, '');
                tabsHtml += `<button class="tab-item" role="tab" data-session-tab="note-${idx}">${escapeHtml(label)}</button>`;
            });
        }
        tabsEl.innerHTML = tabsHtml;

        // Show overview
        this.showSessionTab('overview', content);

        // Bind tab handlers
        tabsEl.querySelectorAll('.tab-item').forEach(btn => {
            btn.addEventListener('click', () => {
                tabsEl.querySelectorAll('.tab-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.showSessionTab(btn.dataset.sessionTab, content);
            });
        });

        // Back button
        backBtn.onclick = () => {
            sessionsData.currentSession = null;
            this.render();
        };
    },

    showSessionTab(tabId, content) {
        const contentEl = document.getElementById('session-content');

        if (tabId === 'overview') {
            if (content && content.session) {
                contentEl.innerHTML = marked.parse(content.session);
            } else {
                contentEl.innerHTML = '<p class="empty">No session overview available</p>';
            }
        } else if (tabId.startsWith('note-')) {
            const idx = parseInt(tabId.replace('note-', ''));
            if (content && content.notes[idx]) {
                contentEl.innerHTML = marked.parse(content.notes[idx].content);
            } else {
                contentEl.innerHTML = '<p class="empty">Note not found</p>';
            }
        }
    },

    init() {
        // Back button handler is set in showDetail
    }
};

// === MARKDOWN ACCORDION WRAPPER ===
function wrapSectionsInAccordions(html, options = {}) {
    const { firstOpen = true, allOpen = false } = options;

    // Create a temporary container to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Find all h2 elements (section headers)
    const headers = temp.querySelectorAll('h2');
    if (headers.length === 0) return html;

    const result = document.createElement('div');
    let currentAccordion = null;
    let beforeFirstH2 = true;

    // Process all nodes
    Array.from(temp.childNodes).forEach((node, nodeIndex) => {
        if (node.nodeType === 1 && node.tagName === 'H2') {
            // This is an h2 - start new accordion
            beforeFirstH2 = false;

            const headerText = node.textContent;
            const accordionIndex = result.querySelectorAll('.accordion').length;
            const isOpen = allOpen || (firstOpen && accordionIndex === 0);

            currentAccordion = document.createElement('div');
            currentAccordion.className = 'accordion' + (isOpen ? ' open' : '');

            const accordionHeader = document.createElement('button');
            accordionHeader.className = 'accordion-header';
            accordionHeader.setAttribute('aria-expanded', isOpen);
            accordionHeader.setAttribute('tabindex', '0');
            accordionHeader.textContent = headerText;

            const accordionContent = document.createElement('div');
            accordionContent.className = 'accordion-content';

            currentAccordion.appendChild(accordionHeader);
            currentAccordion.appendChild(accordionContent);
            result.appendChild(currentAccordion);
        } else if (beforeFirstH2) {
            // Content before any h2 - add directly
            result.appendChild(node.cloneNode(true));
        } else if (currentAccordion) {
            // Content after h2 - add to current accordion
            const content = currentAccordion.querySelector('.accordion-content');
            content.appendChild(node.cloneNode(true));
        }
    });

    return result.innerHTML;
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', async () => {
    initializeTheme();
    initializeTabHandlers();
    initializeNavHandlers();
    MobileNav.init();
    Sessions.init();

    await Promise.all([
        loadAllContent(),
        Sessions.loadManifest()
    ]);

    synthesizeData();
    renderAll();

    // Initialize router after content is loaded
    Router.init();

    startPolling();
});

// === THEME MANAGEMENT ===
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'dark');
    setTheme(theme);

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
}

// === NAV & TAB HANDLERS ===
function initializeNavHandlers() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = item.dataset.page;
            const tabId = TabMemory.recall(pageId) || DEFAULT_TABS[pageId] || null;
            const hash = tabId ? `#/${pageId}/${tabId}` : `#/${pageId}`;
            window.location.hash = hash;
        });
    });
}

function initializeTabHandlers() {
    document.querySelectorAll('.tab-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            const page = btn.closest('.page');
            const pageId = page.dataset.page;

            // Update URL and navigate
            window.location.hash = `#/${pageId}/${tabId}`;
        });

        // Keyboard navigation for tabs
        btn.addEventListener('keydown', (e) => {
            const tabBar = btn.closest('.tab-bar');
            const tabs = Array.from(tabBar.querySelectorAll('.tab-item'));
            const currentIndex = tabs.indexOf(btn);

            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                tabs[currentIndex - 1].focus();
                tabs[currentIndex - 1].click();
            } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
                tabs[currentIndex + 1].focus();
                tabs[currentIndex + 1].click();
            }
        });
    });
}

// === CONTENT LOADING ===
async function loadAllContent() {
    const loadPromises = Object.entries(ARTIFACTS).map(async ([id, path]) => {
        try {
            const response = await fetch(path + '?t=' + Date.now());
            if (response.ok) {
                const content = await response.text();
                rawContent[id] = content;
                contentHashes[id] = hashString(content);
            } else {
                rawContent[id] = '';
                contentHashes[id] = '';
            }
        } catch (error) {
            rawContent[id] = '';
            contentHashes[id] = '';
        }
    });
    await Promise.all(loadPromises);
}

async function checkForUpdates() {
    let hasChanges = false;

    const checkPromises = Object.entries(ARTIFACTS).map(async ([id, path]) => {
        try {
            const response = await fetch(path + '?t=' + Date.now());
            if (response.ok) {
                const content = await response.text();
                const newHash = hashString(content);
                if (contentHashes[id] !== newHash) {
                    rawContent[id] = content;
                    contentHashes[id] = newHash;
                    hasChanges = true;
                }
            }
        } catch (error) {}
    });

    await Promise.all(checkPromises);

    // Also reload sessions manifest
    await Sessions.loadManifest();

    if (hasChanges) {
        synthesizeData();
        renderAll();
    }
}

function startPolling() {
    setInterval(checkForUpdates, POLL_INTERVAL);
}

// === DATA SYNTHESIS ===
function synthesizeData() {
    synthesizedData = {
        phase: extractPhase(),
        activeWork: extractActiveWork(),
        blockedItems: extractBlockedItems(),
        nextActions: extractNextActions(),
        sessionLink: extractSessionLink(),
        channels: {
            catering: rawContent['catering'] || '',
            weddings: rawContent['weddings'] || '',
            other: rawContent['other-channels'] || ''
        },
        people: synthesizePeople(),
        decisions: extractDecisions(),
        hypotheses: extractHypotheses(),
        deliverables: extractDeliverables(),
        business: rawContent['business-map'] || '',
        documents: rawContent['document-index'] || '',
        activity: rawContent['engagement-log'] || '',
        initiatives: rawContent['initiatives'] || ''
    };
}

function extractPhase() {
    const content = rawContent['command-center'] || '';
    const phaseSection = extractSection(content, 'Phase');
    if (phaseSection) {
        const lines = phaseSection.split('\n').filter(l => l.trim() && !l.startsWith('#'));
        if (lines.length > 0) {
            return lines[0].trim();
        }
    }
    return 'Discovery';
}

function extractActiveWork() {
    const content = rawContent['command-center'] || '';
    const section = extractSection(content, 'Active');
    return parseCheckboxItems(section);
}

function parseCheckboxItems(section) {
    const items = [];
    if (!section) return items;

    const lines = section.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        const match = trimmed.match(/^-\s*\[[ x]\]\s*(.+)/i);
        if (match) {
            items.push(match[1].trim());
        }
    }
    return items;
}

function extractBlockedItems() {
    const content = rawContent['command-center'] || '';
    const section = extractSection(content, 'Blocked');
    const items = [];

    if (!section) return items;

    const lines = section.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ') && !trimmed.startsWith('- [')) {
            const text = trimmed.slice(2);
            const parts = text.split(/\s*[—–]\s*/);
            const item = parts[0] || text;
            let reason = '';

            if (parts.length > 1) {
                reason = parts.slice(1).join(' — ').replace(/\s*→.*$/, '').trim();
            }

            items.push({ item, reason });
        }
    }

    return items;
}

function extractNextActions() {
    const content = rawContent['command-center'] || '';
    const section = extractSection(content, 'Next');
    return parseNumberedItems(section);
}

function parseNumberedItems(section) {
    const items = [];
    if (!section) return items;

    const lines = section.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        const match = trimmed.match(/^\d+\.\s*(.+)/);
        if (match) {
            items.push(match[1].trim());
        }
    }
    return items;
}

function extractSessionLink() {
    const content = rawContent['command-center'] || '';
    const section = extractSection(content, 'Current Session');
    if (section) {
        const lines = section.split('\n').filter(l => l.trim());
        if (lines.length > 0) {
            return lines[0].trim();
        }
    }
    return null;
}

// === PEOPLE SYNTHESIS ===
function synthesizePeople() {
    const peopleContent = rawContent['people'] || '';
    return peopleContent;
}

// === DECISIONS / HYPOTHESES / DELIVERABLES ===
function extractDecisions() {
    const trackerContent = rawContent['engagement-tracker'] || '';
    const section = extractSection(trackerContent, 'Decisions');
    return section || '';
}

function extractHypotheses() {
    const trackerContent = rawContent['engagement-tracker'] || '';
    const section = extractSection(trackerContent, 'Working Hypotheses');
    return section || '';
}

function extractDeliverables() {
    const trackerContent = rawContent['engagement-tracker'] || '';
    const section = extractSection(trackerContent, 'Deliverables');
    return section || '';
}

// === RENDERING ===
function renderAll() {
    if (!synthesizedData) return;

    renderPhase();
    renderDashboard();
    Sessions.render();
    renderRevenue();
    renderDecisionsPage();
    renderContext();
    renderActivity();

    initializeModal();

    // Initialize accordions after all content is rendered
    Accordion.init();
}

function renderPhase() {
    document.getElementById('phase').textContent = synthesizedData.phase;
}

function renderDashboard() {
    // Active list
    const activeEl = document.getElementById('active-list');
    if (synthesizedData.activeWork.length > 0) {
        activeEl.innerHTML = synthesizedData.activeWork.map(item =>
            `<li>${escapeHtml(item)}</li>`
        ).join('');
    } else {
        activeEl.innerHTML = '<li class="empty">No active items</li>';
    }

    // Blocked list
    const blockedEl = document.getElementById('blocked-list');
    if (synthesizedData.blockedItems.length > 0) {
        blockedEl.innerHTML = synthesizedData.blockedItems.map(item => `
            <li>
                ${escapeHtml(item.item)}
                ${item.reason ? `<span class="blocker-reason">${escapeHtml(item.reason)}</span>` : ''}
            </li>
        `).join('');
    } else {
        blockedEl.innerHTML = '<li class="empty">No blocked items</li>';
    }

    // Next list
    const nextEl = document.getElementById('next-list');
    if (synthesizedData.nextActions.length > 0) {
        nextEl.innerHTML = synthesizedData.nextActions.map(item =>
            `<li>${escapeHtml(item)}</li>`
        ).join('');
    } else {
        nextEl.innerHTML = '<li class="empty">No next actions</li>';
    }

    // Session link
    const sessionEl = document.getElementById('session-link');
    if (synthesizedData.sessionLink) {
        sessionEl.innerHTML = marked.parse(synthesizedData.sessionLink);
    } else {
        sessionEl.textContent = 'No active session';
    }
}

function renderRevenue() {
    const cateringEl = document.getElementById('catering-content');
    const weddingsEl = document.getElementById('weddings-content');
    const otherEl = document.getElementById('other-content');

    if (synthesizedData.channels.catering) {
        const html = marked.parse(synthesizedData.channels.catering);
        cateringEl.innerHTML = wrapSectionsInAccordions(html, { firstOpen: true });
    } else {
        cateringEl.innerHTML = '<p class="empty">No catering data available</p>';
    }

    if (synthesizedData.channels.weddings) {
        const html = marked.parse(synthesizedData.channels.weddings);
        weddingsEl.innerHTML = wrapSectionsInAccordions(html, { firstOpen: true });
    } else {
        weddingsEl.innerHTML = '<p class="empty">No weddings data available</p>';
    }

    if (synthesizedData.channels.other) {
        const html = marked.parse(synthesizedData.channels.other);
        otherEl.innerHTML = wrapSectionsInAccordions(html, { firstOpen: true });
    } else {
        otherEl.innerHTML = '<p class="empty">No other channel data available</p>';
    }
}

function renderDecisionsPage() {
    const decisionsEl = document.getElementById('decisions-content');
    const hypothesesEl = document.getElementById('hypotheses-content');
    const deliverablesEl = document.getElementById('deliverables-content');

    decisionsEl.innerHTML = synthesizedData.decisions
        ? marked.parse(synthesizedData.decisions)
        : '<p class="empty">No confirmed decisions</p>';

    hypothesesEl.innerHTML = synthesizedData.hypotheses
        ? marked.parse(synthesizedData.hypotheses)
        : '<p class="empty">No working hypotheses</p>';

    deliverablesEl.innerHTML = synthesizedData.deliverables
        ? marked.parse(synthesizedData.deliverables)
        : '<p class="empty">No deliverables tracked</p>';
}

function renderContext() {
    const businessEl = document.getElementById('business-content');
    const peopleEl = document.getElementById('people-content');
    const documentsEl = document.getElementById('documents-content');

    if (synthesizedData.business) {
        const html = marked.parse(synthesizedData.business);
        businessEl.innerHTML = wrapSectionsInAccordions(html, { firstOpen: true });
    } else {
        businessEl.innerHTML = '<p class="empty">No business context available</p>';
    }

    if (synthesizedData.people) {
        const html = marked.parse(synthesizedData.people);
        peopleEl.innerHTML = wrapSectionsInAccordions(html, { firstOpen: true });
    } else {
        peopleEl.innerHTML = '<p class="empty">No people data available</p>';
    }

    if (synthesizedData.documents) {
        const html = marked.parse(synthesizedData.documents);
        documentsEl.innerHTML = wrapSectionsInAccordions(html, { firstOpen: true });
    } else {
        documentsEl.innerHTML = '<p class="empty">No documents indexed</p>';
    }
}

function renderActivity() {
    const activityEl = document.getElementById('activity-content');
    const initiativesEl = document.getElementById('initiatives-content');

    if (synthesizedData.activity) {
        const html = marked.parse(synthesizedData.activity);
        // Activity log: only first (most recent) entry open
        activityEl.innerHTML = wrapSectionsInAccordions(html, { firstOpen: true });
    } else {
        activityEl.innerHTML = '<p class="empty">No activity logged</p>';
    }

    if (synthesizedData.initiatives) {
        const html = marked.parse(synthesizedData.initiatives);
        // Initiatives: all sections open by default (sparse content)
        initiativesEl.innerHTML = wrapSectionsInAccordions(html, { allOpen: true });
    } else {
        initiativesEl.innerHTML = '<p class="empty">No initiatives tracked</p>';
    }
}

// === MODAL ===
function initializeModal() {
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(title, content) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `<h2>${escapeHtml(title)}</h2>${marked.parse(content)}`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// === UTILITIES ===
function extractSection(content, sectionName) {
    const lines = content.split('\n');
    let inSection = false;
    let sectionLines = [];
    const sectionPattern = new RegExp(`^##\\s*${sectionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (sectionPattern.test(line.trim())) {
            inSection = true;
            continue;
        }

        if (inSection) {
            if (/^##\s/.test(line) || /^---\s*$/.test(line)) {
                break;
            }
            sectionLines.push(line);
        }
    }

    return sectionLines.join('\n').trim();
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// === DEBUG ===
window.dashboardDebug = {
    rawContent,
    synthesizedData,
    sessionsData,
    router: Router,
    tabMemory: TabMemory,
    sessions: Sessions,
    forceRefresh: async () => {
        await Promise.all([
            loadAllContent(),
            Sessions.loadManifest()
        ]);
        synthesizeData();
        renderAll();
    }
};

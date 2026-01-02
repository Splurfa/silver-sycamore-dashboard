/* ============================================
   SILVER SYCAMORE DASHBOARD - APPLICATION LOGIC
   ============================================ */

// === CONFIGURATION ===
const ARTIFACTS = [
    { id: 'command-center', title: 'Command Center', path: 'content/command-center.md', group: 'Operational', icon: '▣' },
    { id: 'engagement-tracker', title: 'Tracker', path: 'content/engagement-tracker.md', group: 'Operational', icon: '✓' },
    { id: 'catering', title: 'Catering', path: 'content/catering.md', group: 'Channels', badge: 'P' },
    { id: 'weddings', title: 'Weddings', path: 'content/weddings.md', group: 'Channels', badge: 'S' },
    { id: 'other-channels', title: 'Other Channels', path: 'content/other-channels.md', group: 'Channels' },
    { id: 'engagement-log', title: 'Engagement Log', path: 'content/engagement-log.md', group: 'Reference', icon: '📋' },
    { id: 'business-map', title: 'Business Map', path: 'content/business-map.md', group: 'Reference', icon: '🗺' },
    { id: 'people', title: 'People', path: 'content/people.md', group: 'Reference', icon: '👥' },
    { id: 'notes-ideas', title: 'Notes & Ideas', path: 'content/notes-ideas.md', group: 'Reference', icon: '💡' }
];

const POLL_INTERVAL = 5000; // 5 seconds
const DEFAULT_ARTIFACT = 'command-center';

// === STATE ===
let contentCache = {};
let contentHashes = {};
let currentArtifact = null;

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', async () => {
    initializeTheme();
    renderSidebar();
    await preloadAllContent();
    initializeRouter();
    startPolling();
});

// === THEME MANAGEMENT ===
function initializeTheme() {
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'dark'); // Default to dark

    setTheme(theme);

    // Set up toggle button
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// === SIDEBAR RENDERING ===
function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    const groups = {};

    // Group artifacts
    ARTIFACTS.forEach(artifact => {
        if (!groups[artifact.group]) {
            groups[artifact.group] = [];
        }
        groups[artifact.group].push(artifact);
    });

    // Render grouped navigation
    Object.keys(groups).forEach(groupName => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'nav-group';

        const groupTitle = document.createElement('div');
        groupTitle.className = 'nav-group-title';
        groupTitle.textContent = groupName;
        groupDiv.appendChild(groupTitle);

        groups[groupName].forEach(artifact => {
            const navItem = document.createElement('a');
            navItem.className = 'nav-item';
            navItem.href = `#${artifact.id}`;
            navItem.dataset.id = artifact.id;

            if (artifact.icon) {
                const icon = document.createElement('span');
                icon.className = 'nav-item-icon';
                icon.textContent = artifact.icon;
                navItem.appendChild(icon);
            }

            const title = document.createElement('span');
            title.textContent = artifact.title;
            navItem.appendChild(title);

            if (artifact.badge) {
                const badge = document.createElement('span');
                badge.className = artifact.badge === 'P' ? 'nav-item-badge' : 'nav-item-badge secondary';
                badge.textContent = artifact.badge;
                navItem.appendChild(badge);
            }

            groupDiv.appendChild(navItem);
        });

        nav.appendChild(groupDiv);
    });
}

// === CONTENT LOADING ===
async function preloadAllContent() {
    const loadPromises = ARTIFACTS.map(async artifact => {
        try {
            const response = await fetch(artifact.path);
            if (response.ok) {
                const content = await response.text();
                contentCache[artifact.id] = content;
                contentHashes[artifact.id] = hashString(content);
            } else {
                contentCache[artifact.id] = `# ${artifact.title}\n\nContent not available. File not found: \`${artifact.path}\``;
                contentHashes[artifact.id] = '';
            }
        } catch (error) {
            contentCache[artifact.id] = `# ${artifact.title}\n\nError loading content: ${error.message}`;
            contentHashes[artifact.id] = '';
        }
    });

    await Promise.all(loadPromises);
}

async function checkForUpdates() {
    const updatePromises = ARTIFACTS.map(async artifact => {
        try {
            const response = await fetch(artifact.path + '?t=' + Date.now());
            if (response.ok) {
                const content = await response.text();
                const newHash = hashString(content);

                if (contentHashes[artifact.id] !== newHash) {
                    contentCache[artifact.id] = content;
                    contentHashes[artifact.id] = newHash;

                    // Re-render if currently viewing this artifact
                    if (currentArtifact === artifact.id) {
                        renderContent(artifact.id);
                    }
                }
            }
        } catch (error) {
            console.error(`Error checking for updates: ${artifact.id}`, error);
        }
    });

    await Promise.all(updatePromises);
}

function startPolling() {
    setInterval(checkForUpdates, POLL_INTERVAL);
}

// === ROUTING ===
function initializeRouter() {
    window.addEventListener('hashchange', handleRouteChange);
    handleRouteChange(); // Initial load
}

function handleRouteChange() {
    const hash = window.location.hash.slice(1); // Remove #
    const artifactId = hash || DEFAULT_ARTIFACT;

    // Validate artifact exists
    const artifact = ARTIFACTS.find(a => a.id === artifactId);
    if (!artifact) {
        window.location.hash = DEFAULT_ARTIFACT;
        return;
    }

    currentArtifact = artifactId;
    updateActiveNav(artifactId);
    renderContent(artifactId);
}

function updateActiveNav(artifactId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const activeItem = document.querySelector(`.nav-item[data-id="${artifactId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// === CONTENT RENDERING ===
function renderContent(artifactId) {
    const content = contentCache[artifactId] || '# Loading...\n\nContent is being loaded.';
    const contentDiv = document.getElementById('content');

    // Render markdown
    let html = marked.parse(content);

    // Convert task list items
    html = convertTaskLists(html);

    // Make internal .md links work with hash navigation
    html = convertInternalLinks(html);

    contentDiv.innerHTML = html;

    // Extract and update status counts if viewing command-center
    if (artifactId === 'command-center') {
        updateStatusCounts(content);
        updatePhaseIndicator(content);
    }

    // Scroll to top
    contentDiv.scrollTop = 0;
}

function convertTaskLists(html) {
    // Convert [ ] to unchecked checkbox
    html = html.replace(/\[ \]/g, '<input type="checkbox" disabled>');
    // Convert [x] to checked checkbox
    html = html.replace(/\[x\]/gi, '<input type="checkbox" checked disabled>');
    return html;
}

function convertInternalLinks(html) {
    // Convert .md file links to hash navigation
    // Example: href="catering.md" -> href="#catering"
    return html.replace(/href="([^"]+)\.md"/g, (match, filename) => {
        // Remove any path components, just get the filename
        const artifactId = filename.split('/').pop();
        return `href="#${artifactId}"`;
    });
}

// === STATUS EXTRACTION ===
function updateStatusCounts(content) {
    const blockedCount = countSectionItems(content, '## Blocked');
    const stagedCount = countSectionItems(content, '## Staged');
    const scratchCount = countSectionItems(content, '## Scratch');

    document.getElementById('blocked-count').textContent = blockedCount;
    document.getElementById('staged-count').textContent = stagedCount;
    document.getElementById('scratch-count').textContent = scratchCount;
}

function countSectionItems(content, sectionHeader) {
    const sections = content.split(/^## /m);
    const section = sections.find(s => s.startsWith(sectionHeader.replace('## ', '')));

    if (!section) return 0;

    // Count list items (lines starting with -)
    const lines = section.split('\n');
    let count = 0;

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            count++;
        }
    }

    return count;
}

function updatePhaseIndicator(content) {
    // Extract phase from command-center content
    // Look for **Current Phase:** or similar pattern
    const phaseMatch = content.match(/\*\*(?:Current\s+)?Phase:\*\*\s*(.+)/i);

    if (phaseMatch) {
        const phase = phaseMatch[1].trim();
        document.getElementById('phase-indicator').textContent = phase;
    } else {
        document.getElementById('phase-indicator').textContent = 'Phase 1: Discovery';
    }
}

// === UTILITIES ===
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
}

// === EXPORT FOR DEBUGGING ===
window.dashboardDebug = {
    artifacts: ARTIFACTS,
    contentCache,
    contentHashes,
    currentArtifact,
    forceRefresh: () => {
        contentCache = {};
        contentHashes = {};
        preloadAllContent().then(() => renderContent(currentArtifact));
    }
};

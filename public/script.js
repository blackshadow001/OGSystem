// OfficeGuard V1.0 Interactive Client & Classy Animation Engine
function initOfficeGuard() {
  if (!document.getElementById('page-loader')) return;
  if (window.__officeGuardInitialized) return;
  window.__officeGuardInitialized = true;

  // =========================================================================
  // 1. PAGE PRELOADER SEQUENCE (HIGH-TECH SYSTEM INITIALIZATION)
  // =========================================================================
  const pageLoader = document.getElementById('page-loader');
  const loaderBar = document.getElementById('loader-bar-fill');
  const loaderPercent = document.getElementById('loader-percent');
  const loaderStatus = document.getElementById('loader-status-text');

  if (pageLoader) {
    let progress = 0;
    const stages = [
      { at: 25, text: 'VERIFYING DRIVER INTEGRITY...' },
      { at: 60, text: 'SYNCHRONIZING CACHED POLICIES...' },
      { at: 85, text: 'ESTABLISHING CRYPTOGRAPHIC MESH...' },
      { at: 100, text: 'CONTROL PLANE ONLINE · ACTIVE' }
    ];

    const loadInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 16) + 12;
      if (progress > 100) progress = 100;

      if (loaderBar) loaderBar.style.width = `${progress}%`;
      if (loaderPercent) loaderPercent.textContent = `${progress}%`;

      const stage = stages.find(s => progress <= s.at) || stages[stages.length - 1];
      if (loaderStatus && stage) loaderStatus.textContent = stage.text;

      if (progress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
          pageLoader.classList.add('loaded');
          // Trigger initial hero reveal
          document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('revealed'));
          // Trigger initial counters
          triggerCounters();
        }, 200);
      }
    }, 35);
  }

  // Safety fallback: if anything stalls, force remove loader after 1.5s
  setTimeout(() => {
    if (pageLoader && !pageLoader.classList.contains('loaded')) {
      pageLoader.classList.add('loaded');
      document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('revealed'));
      triggerCounters();
    }
  }, 1500);

  // =========================================================================
  // 2. SCROLL PROGRESS BAR & STICKY HEADER TREATMENT
  // =========================================================================
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const siteHeader = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollProgressBar) {
      const scrolled = (window.scrollY / totalHeight) * 100;
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
    }

    if (siteHeader) {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // =========================================================================
  // 3. SCROLL REVEAL (INTERSECTION OBSERVER) & ANIMATED COUNTERS
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // If element contains counters, trigger them
        const counters = entry.target.querySelectorAll('.count-up');
        counters.forEach(counter => animateCounter(counter));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseInt(el.dataset.target || '0', 10);
    const duration = 1200; // ms
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      el.textContent = String(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = String(target);
      }
    }

    requestAnimationFrame(updateCount);
  }

  function triggerCounters() {
    document.querySelectorAll('.count-up').forEach(c => animateCounter(c));
  }

  // =========================================================================
  // 4. CLASSY SPOTLIGHT CARD HOVER EFFECT (MOUSE TRACKING GLOW)
  // =========================================================================
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // =========================================================================
  // 5. CAPABILITIES TAB SWITCHER
  // =========================================================================
  const features = {
    transfer: {
      index: 'CAPABILITY / 01',
      title: 'Share locally, with a decision on both ends.',
      description: 'Employees select an eligible coworker and send files directly across the office LAN. The receiver reviews file details and explicitly accepts or rejects before a single byte moves.',
      bullets: [
        'Direct laptop-to-laptop LAN transfer with zero 3rd-party cloud dependence',
        'Two square grid buttons: CLEAR (safe queue purge) & LOCAL TRANSFER',
        '10-step cryptographic handshake with SHA-256 integrity verification',
        'Original folder structure and file names preserved (no forced ZIP compression)'
      ],
      link: 'Explore the interactive transfer playground',
      href: '#local-transfer',
      art: `<div class="transfer-window"><div class="window-bar"><span class="window-dots"><i></i><i></i><i></i></span><span>OFFICEGUARD LOCAL TRANSFER · AGENT V1.0</span><span>● LAN CONNECTED</span></div><div class="transfer-line"><div class="person-card"><span class="person-avatar">AK</span><strong>Alex Kumar</strong><small>Finance Laptop (192.168.1.45)</small></div><div class="connection animated-connection"><span>ENCRYPTED STREAM</span><div class="packet-stream"><i class="packet-dot"></i></div><b>→</b></div><div class="person-card receiver"><span class="person-avatar">RM</span><strong>Rachel Morris</strong><small>Engineering Laptop (192.168.1.82)</small></div></div><div class="file-row"><span class="file-icon">▤</span><div><b>Financial_Model_2026.xlsx</b><small>3 files · 18.5 MB · SHA-256 Verified</small></div><span class="file-status">PENDING APPROVAL</span></div></div>`
    },
    device: {
      index: 'CAPABILITY / 02',
      title: 'Know which laptops your organization can trust.',
      description: 'Cryptographic enrollment securely binds an employee identity to a managed Windows laptop. Administrators maintain continuous visibility into agent health, OS builds, and policy synchronization.',
      bullets: [
        'Mutual device enrollment with hardware cryptographic tokens',
        'Hardware specs, Windows build, and MAC/IP telemetry reporting',
        '6 real-time health states: Healthy, Warning, Disconnected, Outdated, Failed, Unprotected',
        'Immediate revocation of trust when an employee account is deactivated'
      ],
      link: 'Inspect device telemetry',
      href: '#device-health',
      art: `<div class="transfer-window"><div class="window-bar"><span class="window-dots"><i></i><i></i><i></i></span><span>DEVICE RECORD · LAPTOP-FIN-02</span><span>● PROTECTED</span></div><div class="file-row" style="padding: 16px;"><span class="file-icon">▣</span><div><b>Hardware Token Verified</b><small>Windows 11 Pro · Finance Laptop</small></div><span class="tag-synced">AGENT v1.0.4</span></div><div style="padding: 14px 18px; border-top: 1px solid #25444a; font-size: 11px; display: flex; flex-direction: column; gap: 8px;"><div><span style="color:#7ba2a3;">Assigned Employee:</span> <strong>Alex Kumar (Finance)</strong></div><div><span style="color:#7ba2a3;">Policy Synchronization:</span> <b style="color:var(--cyan);">100% Up to Date ✓</b></div><div><span style="color:#7ba2a3;">Offline Cache Status:</span> <b style="color:var(--cyan);">Active & Enforced</b></div></div></div>`
    },
    policy: {
      index: 'CAPABILITY / 03',
      title: 'Central policy enforcement across 12 categories.',
      description: 'Manage browser policies, upload restrictions, USB drives, rogue applications, and network shares from a central dashboard with local offline cache enforcement.',
      bullets: [
        '12 granular policy categories: Browser, USB, Uploads, Apps, NAS, and more',
        'Managed browser upload inspection blocks unapproved sharing destinations',
        'Windows driver-level USB mass storage blocking and serial whitelisting',
        '30-minute self-expiring temporary exceptions for client deliverables'
      ],
      link: 'View the 12 policy modules',
      href: '#policy-matrix',
      art: `<div class="transfer-window"><div class="window-bar"><span class="window-dots"><i></i><i></i><i></i></span><span>POLICY ENGINE · LOCAL CACHE</span><span>● SYNCED</span></div><div class="file-row" style="padding: 16px;"><span class="file-icon">🛡️</span><div><b>Active Security Bundle #104</b><small>Enforced on 24 endpoints</small></div><span class="status-pill">ACTIVE</span></div><div style="padding: 14px 18px; border-top: 1px solid #25444a; font-size: 11px; display: flex; flex-direction: column; gap: 8px;"><div><span>Normal Web Browsing:</span> <b style="color:var(--cyan);">Allowed by Default ✓</b></div><div><span>Protected Company Uploads:</span> <b style="color:var(--danger);">Blocked by Default ⊘</b></div><div><span>Office Server & NAS Access:</span> <b style="color:var(--cyan);">Approved & Safe ✓</b></div></div></div>`
    },
    audit: {
      index: 'CAPABILITY / 04',
      title: 'Turn every endpoint action into an audit trail.',
      description: 'Give authorized administrators real-time visibility into local transfers, blocked uploads, USB insertions, and policy synchronizations with tamper-resistant audit logs.',
      bullets: [
        '18 event categories recorded with employee ID, device serial, and timestamp',
        'Tamper-resistant audit ledger synchronized automatically upon reconnect',
        'Role-based notifications for employees and administrators',
        'One-click export of compliance audit reports'
      ],
      link: 'Review the audit ledger',
      href: '#audit-stream',
      art: `<div class="transfer-window"><div class="window-bar"><span class="window-dots"><i></i><i></i><i></i></span><span>AUDIT LOG MONITOR</span><span>● AUDIT READY</span></div><div class="file-row" style="padding: 16px;"><span class="file-icon">▤</span><div><b>Real-Time Event Stream</b><small>Cryptographically signed entries</small></div><span class="badge-status-live">LIVE FEED</span></div><div style="padding: 12px 18px; border-top: 1px solid #25444a; font-size: 10px; display: flex; flex-direction: column; gap: 6px;"><div><span style="color:#6a9193;">10:28:44</span> <b style="color:var(--danger);">[BLOCKED UPLOAD]</b> Unapproved cloud upload intercepted</div><div><span style="color:#6a9193;">10:26:12</span> <b style="color:var(--cyan);">[LOCAL TRANSFER]</b> 3 files verified & completed</div><div><span style="color:#6a9193;">10:22:05</span> <b style="color:var(--amber);">[USB DETECTED]</b> Removable media write access denied</div></div></div>`
    }
  };

  const featureTabs = [...document.querySelectorAll('.feature-tab')];
  function selectFeature(key) {
    const feature = features[key];
    if (!feature) return;

    featureTabs.forEach(tab => {
      const active = tab.dataset.feature === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    const panel = document.getElementById('feature-panel');
    if (!panel) return;
    panel.setAttribute('aria-labelledby', `tab-${key}`);

    const indexEl = document.querySelector('.panel-index');
    if (indexEl) indexEl.textContent = feature.index;

    const titleEl = document.getElementById('feature-title');
    if (titleEl) titleEl.textContent = feature.title;

    const descEl = document.getElementById('feature-description');
    if (descEl) descEl.textContent = feature.description;

    const bulletsEl = document.getElementById('feature-bullets');
    if (bulletsEl) {
      bulletsEl.replaceChildren(...feature.bullets.map(item => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      }));
    }

    const linkEl = document.getElementById('feature-link');
    if (linkEl) {
      linkEl.firstChild.textContent = `${feature.link} `;
      linkEl.href = feature.href;
    }

    const artEl = document.getElementById('feature-art');
    if (artEl) {
      artEl.innerHTML = feature.art;
    }
  }

  featureTabs.forEach((tab, index) => {
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.addEventListener('click', () => selectFeature(tab.dataset.feature));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? featureTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + featureTabs.length) % featureTabs.length;
      featureTabs[next].focus();
      selectFeature(featureTabs[next].dataset.feature);
    });
  });

  // =========================================================================
  // 6. THE LOCAL TRANSFER INTERACTIVE PLAYGROUND (SPEC SECTION 9 & 19)
  // =========================================================================
  const queueList = document.getElementById('queue-list');
  const queueCountEl = document.getElementById('queue-count');
  const queueSizeEl = document.getElementById('queue-size');
  const btnClearQueue = document.getElementById('btn-clear-queue');
  const btnStartTransfer = document.getElementById('btn-start-transfer');
  const actionFeedback = document.getElementById('action-feedback');
  const feedbackText = document.getElementById('feedback-text');
  const feedbackIcon = document.getElementById('feedback-icon');

  const btnAddFile = document.getElementById('btn-add-file');
  const btnAddFolder = document.getElementById('btn-add-folder');
  const dropZone = document.getElementById('drop-zone');

  const modalFileInfo = document.getElementById('modal-file-info');
  const btnAcceptTransfer = document.getElementById('btn-accept-transfer');
  const btnRejectTransfer = document.getElementById('btn-reject-transfer');
  const transferProgressBox = document.getElementById('transfer-progress-box');
  const progressFillBar = document.getElementById('progress-fill-bar');
  const progressPercentage = document.getElementById('progress-percentage');
  const progressStatusLabel = document.getElementById('progress-status-label');

  let sampleFileCounter = 4;

  function updateQueueSummary() {
    if (!queueList) return;
    const items = queueList.querySelectorAll('.queue-item');
    const count = items.length;
    let totalSize = 0;
    items.forEach(item => {
      totalSize += parseFloat(item.dataset.size || '0');
    });

    if (queueCountEl) queueCountEl.textContent = String(count);
    if (queueSizeEl) queueSizeEl.textContent = `${totalSize.toFixed(1)} MB`;
    if (modalFileInfo) modalFileInfo.textContent = `${count} files · ${totalSize.toFixed(1)} MB`;

    // Disable or enable Local Transfer button
    if (btnStartTransfer) {
      if (count === 0) {
        btnStartTransfer.style.opacity = '0.5';
        btnStartTransfer.style.pointerEvents = 'none';
      } else {
        btnStartTransfer.style.opacity = '1';
        btnStartTransfer.style.pointerEvents = 'auto';
      }
    }
  }

  function showFeedback(text, isError = false) {
    if (!actionFeedback || !feedbackText) return;
    actionFeedback.hidden = false;
    feedbackText.textContent = text;
    if (feedbackIcon) feedbackIcon.textContent = isError ? '✕' : '✓';
    actionFeedback.style.borderColor = isError ? 'var(--danger)' : 'var(--cyan)';
    actionFeedback.style.color = isError ? 'var(--danger)' : 'var(--cyan)';
    actionFeedback.style.background = isError ? 'rgba(255, 107, 107, 0.12)' : 'rgba(73, 220, 205, 0.12)';
  }

  // Remove individual file listener
  if (queueList) {
    queueList.addEventListener('click', e => {
      const btn = e.target.closest('.btn-remove-item');
      if (btn) {
        const item = btn.closest('.queue-item');
        if (item) {
          item.remove();
          updateQueueSummary();
          showFeedback('Item removed from transfer queue.');
        }
      }
    });
  }

  // Drag & drop visual interaction
  if (dropZone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, e => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, e => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
      });
    });

    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      const files = e.dataTransfer ? e.dataTransfer.files : null;
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          const sizeMB = (f.size / (1024 * 1024)).toFixed(1);
          const item = document.createElement('div');
          item.className = 'queue-item';
          item.dataset.size = String(sizeMB || '1.0');
          item.innerHTML = `
            <span class="file-icon-mini">📄</span>
            <div class="file-meta">
              <strong>${f.name}</strong>
              <small>Local File · ${sizeMB} MB</small>
            </div>
            <button type="button" class="btn-remove-item" title="Remove file" aria-label="Remove ${f.name}">✕</button>
          `;
          queueList.appendChild(item);
        }
        updateQueueSummary();
        showFeedback(`Added ${files.length} dropped file(s) to queue.`);
      } else {
        if (btnAddFile) btnAddFile.click();
      }
    });
  }

  // Add File Sample
  if (btnAddFile) {
    btnAddFile.addEventListener('click', () => {
      const sampleNames = [
        { name: 'Executive_Briefing_Q1.docx', size: 2.4, icon: '📄' },
        { name: 'Network_Topology_Map.svg', size: 1.1, icon: '📐' },
        { name: 'Client_NDA_Signed.pdf', size: 3.6, icon: '📜' }
      ];
      const pick = sampleNames[sampleFileCounter % sampleNames.length];
      sampleFileCounter++;

      const item = document.createElement('div');
      item.className = 'queue-item';
      item.dataset.size = String(pick.size);
      item.innerHTML = `
        <span class="file-icon-mini">${pick.icon}</span>
        <div class="file-meta">
          <strong>${pick.name}</strong>
          <small>Document · ${pick.size} MB</small>
        </div>
        <button type="button" class="btn-remove-item" title="Remove file" aria-label="Remove ${pick.name}">✕</button>
      `;
      queueList.appendChild(item);
      updateQueueSummary();
      showFeedback(`Added "${pick.name}" to transfer queue.`);
    });
  }

  // Add Folder Sample
  if (btnAddFolder) {
    btnAddFolder.addEventListener('click', () => {
      const item = document.createElement('div');
      item.className = 'queue-item';
      item.dataset.size = '14.8';
      item.innerHTML = `
        <span class="file-icon-mini">📁</span>
        <div class="file-meta">
          <strong>Q4_Financial_Receipts_Folder/ (12 items)</strong>
          <small>Preserved Directory · 14.8 MB</small>
        </div>
        <button type="button" class="btn-remove-item" title="Remove folder" aria-label="Remove receipts folder">✕</button>
      `;
      queueList.appendChild(item);
      updateQueueSummary();
      showFeedback('Added folder hierarchy to transfer queue. Folder structure preserved.');
    });
  }

  // BUTTON 1: CLEAR (SPEC SECTION 9.2)
  if (btnClearQueue) {
    btnClearQueue.addEventListener('click', () => {
      if (queueList) {
        queueList.innerHTML = '';
        updateQueueSummary();
      }
      showFeedback('Transfer queue cleared. Safety guarantee: Original files on laptop remain 100% untouched.');
    });
  }

  // BUTTON 2: LOCAL TRANSFER (SPEC SECTION 9.2)
  if (btnStartTransfer) {
    btnStartTransfer.addEventListener('click', () => {
      const items = queueList.querySelectorAll('.queue-item');
      if (items.length === 0) {
        showFeedback('Please add files or folders before initiating Local Transfer.', true);
        return;
      }

      showFeedback('Initiating 10-step handshake. Handshake ticket sent to Rachel Morris (Engineering Laptop)...');

      // Update Handshake timeline steps visually
      const step5 = document.getElementById('step-5');
      if (step5) {
        step5.className = 'active-step';
        step5.innerHTML = '<b>05</b> Receiver explicitly alerted on Engineering Laptop [Awaiting Decision...]';
      }

      // Flash incoming modal card
      const modal = document.getElementById('incoming-modal');
      if (modal) {
        modal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        modal.style.borderColor = 'var(--cyan)';
        modal.style.boxShadow = '0 0 25px rgba(73, 220, 205, 0.3)';
        setTimeout(() => {
          modal.style.boxShadow = '';
        }, 1500);
      }
    });
  }

  // RECEIVER APPROVAL: ACCEPT (SPEC SECTION 9.4 & 9.5)
  let transferInterval = null;
  if (btnAcceptTransfer) {
    btnAcceptTransfer.addEventListener('click', () => {
      if (transferInterval) clearInterval(transferInterval);
      if (transferProgressBox) transferProgressBox.hidden = false;

      // Update Handshake timeline
      ['step-5', 'step-6', 'step-7', 'step-8'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.className = 'active-step';
      });

      let progress = 0;
      if (progressFillBar) progressFillBar.style.width = '0%';
      if (progressPercentage) progressPercentage.textContent = '0%';
      if (progressStatusLabel) progressStatusLabel.textContent = 'Transferring encrypted LAN packets...';

      transferInterval = setInterval(() => {
        progress += 10;
        if (progressFillBar) progressFillBar.style.width = `${progress}%`;
        if (progressPercentage) progressPercentage.textContent = `${progress}%`;

        if (progress >= 100) {
          clearInterval(transferInterval);
          if (progressStatusLabel) {
            progressStatusLabel.textContent = '✓ Transfer complete! Saved to C:\\Users\\Rachel\\OfficeGuard\\Received\\';
            progressStatusLabel.style.color = 'var(--cyan)';
          }
          const step9 = document.getElementById('step-9');
          const step10 = document.getElementById('step-10');
          if (step9) step9.className = 'active-step';
          if (step10) step10.className = 'active-step';

          showFeedback('Transfer completed successfully. SHA-256 integrity hash verified. Audit event logged.');
        }
      }, 100);
    });
  }

  // RECEIVER APPROVAL: REJECT
  if (btnRejectTransfer) {
    btnRejectTransfer.addEventListener('click', () => {
      if (transferInterval) clearInterval(transferInterval);
      if (transferProgressBox) transferProgressBox.hidden = true;

      const step5 = document.getElementById('step-5');
      if (step5) {
        step5.className = 'active-step';
        step5.innerHTML = '<b>05</b> Receiver rejected transfer request. Stream cancelled.';
        step5.style.borderLeftColor = 'var(--danger)';
      }
      showFeedback('Transfer rejected by receiver. Security notification sent to sender.', true);
    });
  }

  // =========================================================================
  // 7. TEMPORARY EXCEPTION SIMULATOR (SPEC SECTION 15)
  // =========================================================================
  const btnToggleException = document.getElementById('btn-toggle-exception');
  const btnResetException = document.getElementById('btn-reset-exception');
  const exceptionStatusPill = document.getElementById('exception-status-pill');
  const exceptionStateText = document.getElementById('exception-state-text');
  const exceptionTimer = document.getElementById('exception-timer');
  const exceptionAuditText = document.getElementById('exception-audit-text');

  let countdownInterval = null;
  let secondsRemaining = 1800; // 30 mins

  function startExceptionTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    secondsRemaining = 1800;

    if (exceptionStatusPill) {
      exceptionStatusPill.className = 'status-live-pill active';
      exceptionStatusPill.textContent = 'TEMPORARY EXCEPTION ACTIVE';
    }
    if (exceptionStateText) {
      exceptionStateText.className = 'text-cyan';
      exceptionStateText.textContent = 'ALLOWED (TIME-BOUND: 30 MIN)';
    }
    if (exceptionAuditText) {
      exceptionAuditText.textContent = 'Audit #8491: Super Admin granted a 30-minute client portal upload exception to Sarah Jenkins. Auto-expiry scheduled.';
    }

    countdownInterval = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining <= 0) {
        clearInterval(countdownInterval);
        resetExceptionState();
        return;
      }
      const mins = Math.floor(secondsRemaining / 60);
      const secs = secondsRemaining % 60;
      if (exceptionTimer) {
        exceptionTimer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} (Active)`;
      }
    }, 1000);
  }

  function resetExceptionState() {
    if (countdownInterval) clearInterval(countdownInterval);
    if (exceptionStatusPill) {
      exceptionStatusPill.className = 'status-live-pill';
      exceptionStatusPill.textContent = 'DEFAULT POLICY ACTIVE';
    }
    if (exceptionStateText) {
      exceptionStateText.className = 'text-danger';
      exceptionStateText.textContent = 'BLOCKED BY DEFAULT';
    }
    if (exceptionTimer) {
      exceptionTimer.textContent = '00:00 (Inactive)';
    }
    if (exceptionAuditText) {
      exceptionAuditText.textContent = 'Policy #104 enforcing default block. Uploads to external cloud restricted.';
    }
  }

  if (btnToggleException) {
    btnToggleException.addEventListener('click', () => {
      startExceptionTimer();
    });
  }

  if (btnResetException) {
    btnResetException.addEventListener('click', () => {
      resetExceptionState();
    });
  }

  // =========================================================================
  // 8. THE 12 POLICY MODULES FILTER (SPEC SECTION 4.4)
  // =========================================================================
  const policyFilterBtns = document.querySelectorAll('.policy-filter-btn');
  const policyCards = document.querySelectorAll('.policy-module-card');

  policyFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      policyFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      policyCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeSlideUp 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 9. AUDIT LOG FILTER (SPEC SECTION 14)
  // =========================================================================
  const auditPills = document.querySelectorAll('.audit-pill');
  const auditItems = document.querySelectorAll('.audit-log-item');

  auditPills.forEach(pill => {
    pill.addEventListener('click', () => {
      auditPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.auditFilter;
      auditItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'flex';
          item.style.animation = 'fadeSlideUp 0.25s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 10. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.hidden = !open;
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // =========================================================================
  // 11. DEMO REQUEST FORM
  // =========================================================================
  const demoForm = document.getElementById('demo-request-form');
  const demoFormStatus = document.getElementById('demo-form-status');

  if (demoForm && demoFormStatus) {
    demoForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!demoForm.reportValidity()) return;

      const submitButton = demoForm.querySelector('button[type="submit"]');
      const originalButtonContent = submitButton.innerHTML;
      const payload = Object.fromEntries(new FormData(demoForm).entries());
      submitButton.disabled = true;
      submitButton.textContent = 'Sending request…';
      demoFormStatus.textContent = '';
      demoFormStatus.removeAttribute('data-state');

      try {
        const response = await fetch('/api/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Your request could not be saved.');
        demoForm.reset();
        demoFormStatus.textContent = `Demo request received by the sample server. Reference: ${result.requestId}. No email has been sent.`;
        demoFormStatus.dataset.state = 'success';
      } catch (error) {
        demoFormStatus.textContent = error instanceof Error ? error.message : 'Your request could not be saved. Please try again.';
        demoFormStatus.dataset.state = 'error';
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonContent;
      }
    });
  }

  // =========================================================================
  // 12. FOOTER YEAR
  // =========================================================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Initialize summary count on load
  updateQueueSummary();
}

// Safely execute whether DOMContentLoaded has already passed or not
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOfficeGuard);
} else {
  initOfficeGuard();
}

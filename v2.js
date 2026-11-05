(function(){
  // Même destination que la V1 (dépôt lerenard, index.html). À renseigner dans les deux variantes en même temps.
  var ENDPOINT = 'https://formspree.io/f/VOTRE_ID';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Mesure A/B : points d'intégration, aucun prestataire chargé ici ----------
  // Chaque événement est poussé dans window.dataLayer s'il existe déjà (outil installé ailleurs),
  // et diffusé en CustomEvent 'landing:track' sur document. Aucune donnée saisie n'est transmise.
  // Ajouter ?debug-track à l'URL pour voir les événements dans la console.
  var EXPERIMENT = { experiment_id: 'landing-direction-v1-v2', variant: 'B' };
  var host = location.hostname;
  var isDev = location.protocol === 'file:' || host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || /\.(localhost|test)$/.test(host);
  var debug = /[?&]debug-track\b/.test(location.search);
  window.__landingEvents = [];
  function track(name, params){
    var payload = { event: name, experiment_id: EXPERIMENT.experiment_id, variant: EXPERIMENT.variant, is_dev: isDev };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    window.__landingEvents.push(payload);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    try { document.dispatchEvent(new CustomEvent('landing:track', { detail: payload })); } catch (e) {}
    if (debug && window.console) console.info('[landing:track]', name, payload);
  }
  track('variant_view', {});

  // toujours ouvrir en haut de page, même depuis un favori avec une ancre (#beta…)
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo(0, 0);
  window.addEventListener('load', function(){ window.scrollTo(0, 0); });

  // liens internes : défiler sans ajouter l'ancre à l'URL, puis placer le focus sur la cible
  document.querySelectorAll('a[href^="#"]').forEach(function(a){ a.addEventListener('click', function(ev){
    var cta = a.getAttribute('data-cta');
    if (cta) track('beta_cta_click', { placement: cta });
    var t = document.querySelector(a.getAttribute('href')); if (!t) return;
    ev.preventDefault();
    if (t.tagName === 'DETAILS') t.open = true;
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    var focusTarget = t.tagName === 'DETAILS' ? t.querySelector('summary') : t;
    if (focusTarget && focusTarget !== document.body && typeof focusTarget.focus === 'function') {
      try { focusTarget.focus({ preventScroll: true }); } catch (e) { focusTarget.focus(); }
    }
  }); });

  // navigation : signale la section en cours de lecture (aria-current)
  var navLinks = document.querySelectorAll('.nav__link');
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function(l){ byId[l.getAttribute('href').slice(1)] = l; });
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var l = byId[e.target.id]; if (!l) return;
        if (e.isIntersecting) { navLinks.forEach(function(o){ o.removeAttribute('aria-current'); }); l.setAttribute('aria-current', 'location'); }
        else if (l.hasAttribute('aria-current')) l.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function(id){ var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // formulaire : mêmes champs, validations et messages que la V1
  var f = document.getElementById('beta-form'), msg = document.getElementById('form-msg'), btn = document.getElementById('submit-btn');
  var started = false;
  function markStart(){ if (started) return; started = true; track('beta_form_start', {}); }
  f.addEventListener('input', markStart);
  f.addEventListener('change', markStart);
  function say(text, isError){ msg.textContent = text; msg.classList.toggle('is-error', !!isError); }
  // erreurs de saisie affichées sous le champ concerné (reliées par aria-describedby)
  var emailErr = document.getElementById('email-err'), consentErr = document.getElementById('consent-err');

  f.addEventListener('submit', function(ev){
    ev.preventDefault();
    var email = f.email, consent = f.consent;
    email.setAttribute('aria-invalid', 'false');
    consent.removeAttribute('aria-invalid');
    emailErr.textContent = ''; consentErr.textContent = ''; say('', false);
    if (!email.value || !email.checkValidity()) { email.setAttribute('aria-invalid', 'true'); emailErr.textContent = 'Indiquez une adresse e-mail valide, par exemple prenom@entreprise.fr.'; email.focus(); track('beta_form_error', { error_type: 'invalid_email' }); return; }
    if (!consent.checked) { consent.setAttribute('aria-invalid', 'true'); consentErr.textContent = 'Cochez la case d\'accord pour que nous puissions vous recontacter.'; consent.focus(); track('beta_form_error', { error_type: 'missing_consent' }); return; }
    if (f._gotcha.value) return;
    var done = function(){ document.getElementById('ok-mail').textContent = email.value; f.hidden = true; var ok = document.getElementById('form-ok'); ok.hidden = false; ok.focus(); };
    if (ENDPOINT.indexOf('VOTRE_ID') !== -1) { say('Aperçu : le formulaire sera relié à votre boîte mail une fois l\'identifiant Formspree renseigné.', false); track('beta_form_error', { error_type: 'endpoint_not_configured' }); return; }
    btn.disabled = true; btn.textContent = 'Envoi…'; say('', false);
    fetch(ENDPOINT, { method: 'POST', body: new FormData(f), headers: { 'Accept': 'application/json' } })
      .then(function(r){
        if (r.ok) { done(); track('beta_form_success', {}); }
        else { var err = new Error('http'); err.status = r.status; throw err; }
      })
      .catch(function(err){
        say('L\'envoi n\'a pas abouti. Réessayez dans un instant, ou écrivez-nous à contact@votre-domaine.fr.', true);
        track('beta_form_error', err && err.status ? { error_type: 'server', http_status: err.status } : { error_type: 'network' });
      })
      .then(function(){ btn.disabled = false; btn.textContent = 'Rejoindre la bêta'; });
  });
})();

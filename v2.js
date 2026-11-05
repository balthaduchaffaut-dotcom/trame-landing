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

  // illustration du hero : au survol, les fenêtres et la loupe se soulèvent, le clavier tape.
  // Les calques réutilisent l'image déjà chargée (aucun fichier en plus) ; leurs tracés, mesurés
  // sur l'illustration 1090 × 920, sont dans v2.css. Rien n'est ajouté sans souris ni avec le mouvement réduit.
  var art = document.querySelector('.hero__art');
  if (art && !reduce && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var KEYBOARD = '722,620 641,716 582,698 258,592 316,544 359,510 423,528';
    var KEYS = '501,582 476,575 489,564 502,566 514,571|498,602 477,596 474,594 486,582 510,590 510,591|655,652 630,644 628,642 640,630 647,632 665,638 666,640|381,566 369,562 358,558 371,548 380,548 394,554|651,608 626,602 626,599 633,592 657,600 658,601|520,652 516,652 500,646 494,644 494,643 507,630 531,638 532,639|681,638 663,634 660,631 671,620 675,620 698,627|472,574 449,568 448,565 461,554 482,560 484,563|376,524 352,518 352,516 359,510 361,510 383,516 384,518|650,672 628,666 623,664 622,662 635,650 661,658 662,660|414,556 394,550 392,549 392,547 404,538 417,540 426,545|438,544 414,536 412,534 419,528 423,528 445,536 446,537|591,630 586,630 564,623 577,610 601,618 602,620|650,694 624,686 622,685 635,672 657,678 656,686|460,612 439,606 436,603 449,592 471,598 472,600|469,592 465,592 446,586 444,584 457,574 479,580 480,582|558,580 535,574 534,572 541,564 564,572 566,573|283,600 259,594 258,592 274,580 285,582 298,587|529,570 525,570 505,564 504,562 511,556 535,562 536,564|375,630 351,622 348,620 363,608 368,608 374,610 390,615 385,622|427,622 422,622 406,616 403,616 402,613 415,602 438,608 440,610|622,642 599,634 596,632 608,620 615,622 633,628 634,629|431,602 427,602 407,596 406,593 419,582 442,588 444,591|531,592 508,586 506,583 518,572 541,578 542,581|365,604 343,596 342,594 356,584 363,584 380,590 378,594|641,716 616,708 614,706 620,700 622,700 644,706 646,709|488,642 475,638 463,634 462,633 475,622 480,622 500,628 500,630|342,620 319,612 318,610 335,598 355,604 358,606|551,662 528,656 526,653 538,640 562,648 564,650|357,538 334,531 347,520 370,527 369,530|491,620 487,620 467,614 466,612 479,600 502,608 504,609|498,562 476,556 474,553 482,546 505,554 506,555|386,546 376,544 364,540 364,539 376,528 388,532 398,536|559,622 535,614 534,612 546,602 550,602 570,608 572,610|522,630 500,624 497,624 496,622 508,610 512,610 532,616 534,619|457,632 453,632 432,624 432,623 444,612 449,612 469,618 470,620|410,574 388,568 386,566 400,556 421,562 422,564|608,704 604,704 585,698 582,698 580,695 593,682 598,682 619,688 620,690 620,693|705,624 689,620 688,618 696,612 720,618 722,620|372,584 350,578 348,576 362,564 382,570 386,572|439,584 416,578 416,575 428,564 450,570 452,573|584,672 556,664 571,650 595,658 596,660|617,684 593,676 590,674 601,662 606,662 628,668 630,671|618,660 613,660 591,654 590,651 603,640 627,646 628,649|442,564 421,558 420,556 431,546 436,546 453,552 454,554|469,552 446,546 444,544 452,538 475,544 476,546|529,612 506,606 504,603 516,592 540,598 540,601|313,610 291,604 288,601 304,588 326,594 328,597|337,594 333,594 291,580 282,578 280,575 293,564 296,564 348,580 352,582|620,598 603,594 595,592 594,590 601,584 604,584 626,590 626,592|623,620 598,614 596,612 608,600 613,600 633,606 634,609|553,640 540,638 526,632 540,620 563,626 564,629|589,590 570,584 564,582 564,581 570,574 574,574 594,580 596,583|585,650 559,644 558,641 570,630 595,636 596,639|561,600 550,598 536,593 548,582 572,588 572,590|354,556 318,546 316,544 331,534 363,544 366,546|654,630 631,624 628,621 640,610 665,616 666,619|407,534 385,528 384,525 389,520 393,520 416,527|591,610 567,604 566,601 578,590 602,598 604,599|396,612 372,606 372,604 385,592 398,596 410,600|574,694 548,686 546,684 560,670 588,678 588,680|401,592 382,588 378,584 391,574 401,576 414,581|684,618 679,618 665,614 657,610 656,609 663,602 667,602 689,610 690,611|343,574 300,562 298,559 310,550 315,548 354,560 358,563';
    var heroImg = art.querySelector('img');
    var layer = function(name, src){
      var s = document.createElement('span'), i = new Image();
      s.className = 'hero-layer hero-layer--' + name; s.setAttribute('aria-hidden', 'true');
      i.alt = ''; i.src = src; s.appendChild(i);
      return s;
    };
    var buildLayers = function(){
      var src = heroImg.currentSrc || heroImg.src, NS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(NS, 'svg'), hit = document.createElementNS(NS, 'polygon'), caps = document.createElementNS(NS, 'g');
      svg.setAttribute('class', 'hero-keys'); svg.setAttribute('viewBox', '0 0 1090 920'); svg.setAttribute('aria-hidden', 'true');
      hit.setAttribute('class', 'hero-keys__hit'); hit.setAttribute('points', KEYBOARD);
      caps.setAttribute('class', 'hero-keys__caps');
      // ordre de frappe déjà mélangé ; un rythme irrégulier, comme quelqu'un qui tape
      KEYS.split('|').forEach(function(p, n){
        var k = document.createElementNS(NS, 'polygon');
        k.setAttribute('points', p);
        k.style.animationDelay = (n * 0.09 + (n * 37 % 11) * 0.012).toFixed(3) + 's';
        caps.appendChild(k);
      });
      svg.appendChild(hit); svg.appendChild(caps); art.appendChild(svg);
      art.appendChild(layer('panel', src));
      art.appendChild(layer('card', src));
      var mag = layer('mag', src), lens = layer('lens', src);
      lens.removeAttribute('aria-hidden'); mag.appendChild(lens); art.appendChild(mag);
    };
    if (heroImg.complete && heroImg.naturalWidth) buildLayers(); else heroImg.addEventListener('load', buildLayers, { once: true });
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

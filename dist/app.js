'use strict';
const $ = (id) => document.getElementById(id);
const media = $('birthday-video');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionOff = reduceMotion.matches;
let phase = 'username';
let runId = 0;
let toastTimer;
let confettiTimer;

function setMotion(off) {
  motionOff = off;
  document.body.classList.toggle('motion-off', off);
  $('motion-toggle').textContent = `animação: ${off ? 'off' : 'on'}`;
  $('motion-toggle').setAttribute('aria-pressed', String(off));
  if (off) $('confetti').replaceChildren();
}
setMotion(motionOff);
$('motion-toggle').addEventListener('click', () => setMotion(!motionOff));
reduceMotion.addEventListener('change', (event) => setMotion(event.matches));

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, motionOff ? 0 : ms));

// A birthday puzzle, not an authentication service. Values remain browser-local.
function correctCredentials() {
  return $('username').value.trim() === 'emihomemdacasa' &&
    $('password').value === 'uqoiUjy627Hgsk(oPsa@js';
}

$('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (phase === 'booting' || phase === 'open') return;
  $('login-error').textContent = '';
  if (phase === 'username') {
    if (!$('username').value.trim()) return;
    phase = 'password';
    $('password-step').hidden = false;
    $('password').required = true;
    $('username-row').querySelector('button').hidden = true;
    $('login-hint').textContent = 'agora a senha. o presente está quase aí.';
    $('password').focus();
    return;
  }
  if (!correctCredentials()) {
    $('login-error').textContent = 'Ops. Usuário ou senha não conferem. Tenta de novo?';
    $('password').value = '';
    $('password').focus();
    return;
  }
  phase = 'booting';
  document.body.classList.add('is-loading');
  $('login-hint').textContent = 'acesso autorizado. ativando modo aniversário...';
  $('password').value = '';
  await delay(550);
  document.body.classList.remove('is-loading');
  openBirthday();
});

async function openBirthday() {
  const currentRun = ++runId;
  phase = 'open';
  document.body.classList.add('pink');
  document.querySelector('meta[name="theme-color"]').content = '#f7dce5';
  document.title = 'Feliz aniversário, Emi! ♡';
  $('system-status').textContent = 'modo aniversário';
  $('login-screen').hidden = true;
  $('birthday-screen').hidden = false;
  $('video-section').hidden = true;
  $('promo-section').hidden = true;
  $('purchase-response').hidden = true;
  $('birthday-log').replaceChildren();
  $('progress-fill').style.transform = 'scaleX(0)';
  $('progress-percent').textContent = '0%';
  $('progress-label').textContent = 'carregando coisas boas...';
  window.scrollTo({top: 0, behavior: 'instant'});
  $('motion-toggle').focus({preventScroll: true});
  burst();
  const lines = [
    '✓ identidade confirmada: pessoa de milhões',
    '✓ tema rosa instalado com sucesso',
    '✓ carinho.exe rodando em segundo plano',
    'Que não faltem risadas, abraços e dias leves.',
    'Feliz aniversário, Emi. Você merece o mundo. ♡'
  ];
  for (let i = 0; i < lines.length; i++) {
    await delay(i === 0 ? 450 : 760);
    if (currentRun !== runId) return;
    const line = document.createElement('p');
    line.textContent = lines[i];
    if (i === lines.length - 1) line.className = 'log-final';
    $('birthday-log').append(line);
    const progress = Math.round(((i + 1) / lines.length) * 100);
    $('progress-fill').style.transform = `scaleX(${progress / 100})`;
    $('progress-percent').textContent = `${progress}%`;
  }
  $('progress-label').textContent = 'presente desbloqueado';
  await delay(650);
  if (currentRun !== runId) return;
  $('video-section').hidden = false;
  $('video-section').classList.add('reveal-in');
  loadVideo();
}

function loadVideo() {
  $('video-error').hidden = true;
  $('video-empty').hidden = false;
  if (!media.getAttribute('src')) media.src = 'assets/birthday.mp4';
  media.muted = true;
  updateSoundButton();
  media.play().catch(() => {
    // Autoplay policies vary. Native controls always remain available.
    $('video-empty').hidden = true;
  });
}

media.addEventListener('loadeddata', () => { $('video-empty').hidden = true; });
media.addEventListener('playing', () => { $('video-empty').hidden = true; });
media.addEventListener('error', () => {
  if (!media.getAttribute('src') || phase !== 'open') return;
  $('video-empty').hidden = true;
  $('video-error').hidden = false;
});
$('retry-video').addEventListener('click', () => { media.load(); loadVideo(); });
function updateSoundButton() {
  $('sound-button').querySelector('span').textContent = media.muted ? 'assistir com som' : 'desligar som';
  $('sound-button').setAttribute('aria-pressed', String(!media.muted));
}
media.addEventListener('volumechange', updateSoundButton);
$('sound-button').addEventListener('click', () => {
  media.muted = !media.muted;
  if (!media.muted && media.currentTime > 2) media.currentTime = 0;
  media.play().catch(() => { $('video-empty').hidden = true; });
  updateSoundButton();
});

function revealPromo() {
  if (phase !== 'open') return;
  media.pause();
  const wasHidden = $('promo-section').hidden;
  $('promo-section').hidden = false;
  if (wasHidden) {
    $('promo-section').classList.add('reveal-in');
    burst();
  }
  $('promo-section').scrollIntoView({behavior: motionOff ? 'instant' : 'smooth', block: 'start'});
  $('buy-button').focus({preventScroll: true});
}
media.addEventListener('ended', revealPromo);
$('skip-video').addEventListener('click', revealPromo);
$('buy-button').addEventListener('click', () => {
  clearTimeout(toastTimer);
  $('purchase-response').hidden = false;
  $('buy-button').textContent = 'Azeite imaginário garantido ♡';
  burst();
  toastTimer = setTimeout(() => { $('purchase-response').hidden = true; }, 12000);
});
$('close-response').addEventListener('click', () => { $('purchase-response').hidden = true; });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') $('purchase-response').hidden = true;
});

function burst() {
  if (motionOff) return;
  clearTimeout(confettiTimer);
  $('confetti').replaceChildren();
  const pieces = document.createDocumentFragment();
  for (let i = 0; i < 44; i++) {
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * .55}s`;
    piece.style.animationDuration = `${2.3 + Math.random() * 1.4}s`;
    pieces.append(piece);
  }
  $('confetti').append(pieces);
  confettiTimer = setTimeout(() => $('confetti').replaceChildren(), 4600);
}

function resetMedia() {
  media.pause();
  media.removeAttribute('src');
  media.load();
  media.muted = true;
  clearTimeout(toastTimer);
  $('purchase-response').hidden = true;
  $('video-error').hidden = true;
  $('buy-button').innerHTML = 'Financiar meu azeite <svg class="icon"><use href="#i-arrow"/></svg>';
}
$('replay-button').addEventListener('click', () => { resetMedia(); openBirthday(); });
$('logout-button').addEventListener('click', () => {
  ++runId;
  phase = 'username';
  resetMedia();
  $('confetti').replaceChildren();
  document.body.classList.remove('pink');
  document.querySelector('meta[name="theme-color"]').content = '#151516';
  document.title = 'emi.os — uma surpresa pra você';
  $('system-status').textContent = 'aguardando você';
  $('birthday-screen').hidden = true;
  $('login-screen').hidden = false;
  $('login-form').reset();
  $('password-step').hidden = true;
  $('password').required = false;
  $('username-row').querySelector('button').hidden = false;
  $('login-error').textContent = '';
  $('login-hint').textContent = 'digite seu usuário e pressione enter';
  window.scrollTo({top: 0, behavior: 'instant'});
  $('username').focus({preventScroll: true});
});

const root = document.documentElement;
const intro = document.querySelector('.brand-intro');
const scene = document.querySelector('.hero-scene');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const blocked = [...document.querySelectorAll('body>.site-header,body>main,body>footer,body>.floating-contact,body>.skip-link')];
let introTimer;
function finishIntro(returnFocus = false) {
  const hadFocus = intro?.contains(document.activeElement);
  clearTimeout(introTimer);
  delete root.dataset.intro;
  delete root.dataset.introStarted;
  blocked.forEach(element => { element.inert = false; });
  if (intro) intro.hidden = true;
  scene?.classList.add('is-ready');
  if (returnFocus || hadFocus) document.querySelector('#main')?.focus({ preventScroll: true });
  window.dispatchEvent(new Event('blow:intro-complete'));
}
if (root.dataset.intro === 'pending' && !reducedMotion.matches && intro) {
  blocked.forEach(element => { element.inert = true; });
  intro.querySelector('button').focus({ preventScroll: true });
  introTimer = setTimeout(finishIntro, Math.max(0,1800 - (performance.now() - Number(root.dataset.introStarted))));
} else finishIntro();
intro?.querySelector('button').addEventListener('click', () => finishIntro(true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && root.dataset.intro === 'pending') { event.preventDefault(); finishIntro(true); }
});
window.addEventListener('blow:intro-timeout', () => { if (intro && !intro.hidden) finishIntro(); });
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finishIntro(); });

const demo = document.querySelector('.writing-demo');
if (demo) {
  const fields = [...demo.querySelectorAll('[data-type-start]')].map(element => ({
    element, text: element.textContent, start: Number(element.dataset.typeStart), end: Number(element.dataset.typeEnd)
  }));
  const steps = [...demo.querySelectorAll('[data-step]')];
  const saveState = demo.querySelector('.editor-save-state');
  const duration = 7200;
  const cycle = duration + 2200;
  let frame = 0, elapsed = 0, startedAt = 0;
  let running = false, visible = false, state = '';
  function render(time) {
    const next = time < 1200 ? 'compose' : time < 4100 ? 'write' : time < 5800 ? 'media' : time < duration ? 'save' : 'done';
    if (next !== state) {
      state = next;
      demo.dataset.state = next;
      const active = ['compose','write'].includes(next) ? 'write' : next === 'media' ? 'media' : 'save';
      steps.forEach(step => step.classList.toggle('is-current',step.dataset.step === active));
    }
    const start = time < 4100 ? 0 : time < 5800 ? 4100 : 5800;
    const end = time < 4100 ? 4100 : time < 5800 ? 5800 : duration;
    demo.style.setProperty('--step-progress',Math.min(1,(time - start) / (end - start)));
    for (const field of fields) {
      const progress = Math.max(0,Math.min(1,(time - field.start) / (field.end - field.start)));
      const text = field.text.slice(0,Math.floor(progress * field.text.length));
      if (field.element.textContent !== text) field.element.textContent = text;
      field.element.dataset.typing = String(running && progress > 0 && progress < 1);
    }
    saveState.style.opacity = time >= duration ? '1' : '0';
  }
  function tick(now) { elapsed = (now - startedAt) % cycle; render(elapsed); frame = requestAnimationFrame(tick); }
  function pause() {
    scene.classList.remove('is-playing');
    if (!running) return;
    elapsed = (performance.now() - startedAt) % cycle;
    running = false; cancelAnimationFrame(frame); render(elapsed);
  }
  function play() {
    if (running || !visible || document.hidden || reducedMotion.matches || root.dataset.intro === 'pending') return;
    running = true; startedAt = performance.now() - elapsed;
    scene.classList.add('is-playing'); render(elapsed); frame = requestAnimationFrame(tick);
  }
  function finish() { pause(); elapsed = 0; render(duration); }
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) play(); else pause();
  },{threshold:.15});
  observer.observe(demo);
  if (reducedMotion.matches) finish(); else render(0);
  window.addEventListener('blow:intro-complete',play);
  document.addEventListener('visibilitychange',() => document.hidden ? pause() : play());
  reducedMotion.addEventListener('change',() => reducedMotion.matches ? finish() : play());
  window.addEventListener('pagehide',pause);
  window.addEventListener('pageshow',play);
  // The editor follows the pointer slightly; reading and touch use the authored resting angle.
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let pointerFrame = 0;
  demo.addEventListener('pointermove',event => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      const box = demo.getBoundingClientRect();
      demo.style.setProperty('--scene-x',((.5 - (event.clientY - box.top) / box.height) * 3).toFixed(2) + 'deg');
      demo.style.setProperty('--scene-y',(((event.clientX - box.left) / box.width - .5) * 4).toFixed(2) + 'deg');
    });
  },{passive:true});
  function resetTilt() { cancelAnimationFrame(pointerFrame); demo.style.removeProperty('--scene-x'); demo.style.removeProperty('--scene-y'); }
  demo.addEventListener('pointerleave',resetTilt);
  reducedMotion.addEventListener('change',resetTilt);
}

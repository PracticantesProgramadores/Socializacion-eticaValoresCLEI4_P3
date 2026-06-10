const STORAGE_KEY = "socializacionClei4P3_v1";
const steps = ["reading", "comprehension", "dignity", "stereotypes", "decisions", "campaign", "delivery"];

const state = loadState();
let currentHotspot = null;
let previousFocus = null;
let soundEnabled = false;

const backdrop = document.getElementById("modalBackdrop");
const modal = backdrop.querySelector(".modal");
const modalTitle = document.getElementById("modalTitle");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const toast = document.getElementById("toast");

const content = {
  intro: {
    eyebrow: "Hotspot 1 · Tablero central",
    title: "Introducción",
    html: `
      <div class="content-card">
        <span class="objective-label">Objetivo de aprendizaje:</span>
        <p>Argumentar ideas sobre la dignidad humana, la espiritualidad, la libertad y la responsabilidad a partir de la interpretación de una lectura reflexiva, reconociendo la importancia de las personas por sus acciones, valores y cualidades humanas más allá de su apariencia física.</p>
      </div>
      <div class="modal-actions"><button class="primary-button" type="button" data-start="reading">Comenzar actividad</button></div>`
  },
  reading: {
    eyebrow: "Hotspot 2 · Poema",
    title: "Lectura Reflexiva",
    html: `
      <div class="poem-layout">
        <figure class="poem-visual">
          <img id="poemImage" src="Imagen 1.jpg" alt="Ilustración asociada al primer párrafo del poema">
          <figcaption id="poemCaption">Imagen 1 · Párrafo 1 de 8</figcaption>
        </figure>
        <article class="poem-copy">
          <h3>La verdadera belleza</h3>
          <p class="poem-stanza active" data-image="1"><span>Muchos miran el brillo de un rostro,</span><span>la forma perfecta de una sonrisa,</span><span>la elegancia de una figura</span><span>o el reflejo que devuelve un espejo.</span></p>
          <p class="poem-stanza" data-image="2"><span>Pero el tiempo avanza silencioso,</span><span>las apariencias cambian,</span><span>y aquello que parecía eterno</span><span>se transforma con los años.</span></p>
          <p class="poem-stanza" data-image="3"><span>Hay una belleza que no envejece,</span><span>que no depende de la moda,</span><span>ni del juicio de quienes observan,</span><span>ni de las fotografías compartidas.</span></p>
          <p class="poem-stanza" data-image="4"><span>Es la belleza de quien escucha,</span><span>de quien ayuda sin esperar recompensa,</span><span>de quien respeta las diferencias,</span><span>de quien reconoce el valor de los demás.</span></p>
          <p class="poem-stanza" data-image="5"><span>Se encuentra en las palabras que animan,</span><span>en las manos que acompañan,</span><span>en las decisiones que nacen del amor,</span><span>la justicia y la responsabilidad.</span></p>
          <p class="poem-stanza" data-image="6"><span>Quien aprende a mirar más allá de la apariencia</span><span>descubre que cada persona posee una historia,</span><span>unos sueños, unas luchas y una dignidad</span><span>que merecen ser reconocidos y respetados.</span></p>
          <p class="poem-stanza" data-image="7"><span>La verdadera belleza habita en el interior,</span><span>en aquello que guía nuestras acciones,</span><span>en la libertad con la que elegimos hacer el bien</span><span>y en la responsabilidad de construir un mundo mejor.</span></p>
          <p class="poem-stanza" data-image="7"><span>Por eso, antes de juzgar a alguien por lo que muestra por fuera,</span><span>vale la pena conocer lo que guarda en su corazón,</span><span>porque allí se encuentra aquello que realmente define a una persona.</span></p>
        </article>
      </div>
      <div class="modal-actions"><button class="primary-button compliance-button" type="button" data-complete="reading" data-next="comprehension"><span aria-hidden="true">✓</span> Cumplido · continuar al siguiente punto</button></div>`
  },
  comprehension: {
    eyebrow: "Hotspot 3 · Panel creativo",
    title: "Comprensión e interpretación de la lectura",
    html: illustratedActivity("comprehension", "esquema.png", "Esquema para la comprensión e interpretación de la lectura", `
      <p><strong>1. Comprensión e interpretación de la lectura:</strong></p>
      <p>Realiza un resumen de la lectura identificando:</p>
      <ul class="prompt-list"><li>La idea principal del texto.</li><li>Los valores que promueve.</li><li>La enseñanza que deja para la vida cotidiana.</li></ul>`)
  },
  dignity: {
    eyebrow: "Hotspot 4 · Mural de valores",
    title: "Dignidad humana y belleza interior",
    html: illustratedActivity("dignity", "dignidad.png", "Esquema sobre dignidad humana y belleza interior", `
      <p>A partir de la siguiente frase extraída de la lectura:</p>
      <blockquote class="quote-card">"La verdadera belleza habita en el interior, en aquello que guía nuestras acciones."</blockquote>
      <p>Responde:</p>
      <ul class="prompt-list"><li>¿Qué significado tiene esta afirmación para ti?</li><li>¿Por qué consideras que la dignidad humana va más allá de la apariencia física?</li><li>¿Crees que la sociedad actual valora más la imagen exterior que las cualidades humanas? Justifica tu respuesta.</li></ul>`)
  },
  stereotypes: {
    eyebrow: "Hotspot 5 · Pantalla multimedia",
    title: "Estereotipos sociales y valoración de las personas",
    html: contentOnlyActivity("stereotypes", `
      <div class="gallery">
        ${[1,2,3,4].map((number) => `<figure><img src="estereotipo_0${number}.png" alt="Imagen ${number} para analizar estereotipos sociales"><figcaption>Imagen ${number}</figcaption></figure>`).join("")}
      </div>
      <ul class="prompt-list"><li>¿Qué estereotipos sociales se evidencian en algunas de ellas?</li><li>¿Cómo pueden afectar estos estereotipos la autoestima y las relaciones entre las personas?</li><li>¿Qué acciones pueden ayudar a combatir estos prejuicios en la familia, la escuela y la sociedad?</li></ul>`)
  },
  decisions: {
    eyebrow: "Hotspot 6 · Laboratorio de decisiones",
    title: "Libertad y responsabilidad en nuestras decisiones",
    html: illustratedActivity("decisions", "libertad.png", "Esquema sobre libertad y responsabilidad en nuestras decisiones", `
      <p>La lectura afirma que las personas se definen por sus acciones y decisiones.</p>
      <p>Reflexiona y responde:</p>
      <ul class="prompt-list"><li>¿Cómo influye la libertad en las decisiones que tomamos diariamente?</li><li>¿Por qué toda libertad debe ir acompañada de responsabilidad?</li><li>Describe una situación de tu vida o de tu entorno donde una decisión responsable haya generado consecuencias positivas.</li></ul>`)
  },
  campaign: {
    eyebrow: "Hotspot 7 · Agencia Creativa",
    title: "Campaña de sensibilización",
    html: `
      <div class="content-card">
        <p>Diseña una campaña que promueva el reconocimiento de la dignidad humana y el respeto por las diferencias.</p>
        <p>La campaña debe incluir:</p>
        <ul class="prompt-list"><li>Nombre de la campaña.</li><li>Eslogan.</li><li>Imagen, dibujo o diseño creativo.</li><li>Mensaje principal.</li><li>Tres acciones concretas que inviten a valorar a las personas por lo que son y no por su apariencia física.</li></ul>
      </div>
      <figure class="activity-image">
        <img src="campana.png" alt="Esquema para diseñar la campaña de sensibilización">
      </figure>
      <div class="modal-actions"><button class="primary-button compliance-button" type="button" data-complete="campaign"><span aria-hidden="true">✓</span> Cumplido · continuar al siguiente punto</button></div>`
  },
  delivery: {
    eyebrow: "Hotspot 8 · Escritorio digital",
    title: "Entrega del trabajo",
    html: `
      <div class="content-card">
        <p>Una vez finalizadas las actividades, organiza tu trabajo de manera clara y ordenada.</p>
        <p>Puedes entregarlo en formato PDF, Word, PowerPoint o presentación digital.</p>
        <div class="format-row"><span class="format-chip">PDF</span><span class="format-chip">Word</span><span class="format-chip">PowerPoint</span><span class="format-chip">Presentación digital</span></div>
        <p>Verifica que el archivo incluya:</p>
        <div class="delivery-checklist">
          <label><input type="checkbox" data-check="cover"> <span>Portada con nombre completo, CLEI y fecha.</span></label>
          <label><input type="checkbox" data-check="activities"> <span>Desarrollo completo de todas las actividades.</span></label>
          <label><input type="checkbox" data-check="arguments"> <span>Argumentaciones claras y bien sustentadas.</span></label>
          <label><input type="checkbox" data-check="creativity"> <span>Creatividad en la campaña de sensibilización.</span></label>
          <label><input type="checkbox" data-check="writing"> <span>Buena ortografía y redacción.</span></label>
        </div>
        <p>Antes de enviar tu trabajo, revisa que tus respuestas reflejen una reflexión personal sobre la dignidad humana, la espiritualidad, la libertad, la responsabilidad y la importancia de reconocer el valor integral de cada persona.</p>
      </div>
      <figure class="activity-image delivery-image">
        <img src="entrega.png" alt="Esquema para la entrega del trabajo">
      </figure>
      <div class="modal-actions"><button class="primary-button compliance-button" type="button" data-complete="delivery"><span aria-hidden="true">✓</span> Cumplido · finalizar actividad</button></div>`
  }
};

function illustratedActivity(id, imageSrc, imageAlt, prompt) {
  return `<div class="content-card">${prompt}</div>
    <figure class="activity-image">
      <img src="${imageSrc}" alt="${imageAlt}">
    </figure>
    <div class="modal-actions"><button class="primary-button compliance-button" type="button" data-complete="${id}"><span aria-hidden="true">✓</span> Cumplido · continuar al siguiente punto</button></div>`;
}

function contentOnlyActivity(id, prompt) {
  return `<div class="content-card">${prompt}</div>
    <div class="modal-actions"><button class="primary-button compliance-button" type="button" data-complete="${id}"><span aria-hidden="true">✓</span> Cumplido · continuar al siguiente punto</button></div>`;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { started: saved?.started || Boolean(saved?.completed?.length), completed: saved?.completed || [], answers: saved?.answers || {}, checks: saved?.checks || [] };
  } catch {
    return { started: false, completed: [], answers: {}, checks: [] };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function openHotspot(id) {
  if (!content[id]) return;
  if (!isUnlocked(id)) {
    showToast("Completa el punto anterior para habilitar esta actividad.");
    playTone(260, .05);
    return;
  }
  previousFocus = document.activeElement;
  currentHotspot = id;
  modalEyebrow.textContent = content[id].eyebrow;
  modalTitle.textContent = content[id].title;
  modalContent.innerHTML = content[id].html;
  backdrop.hidden = false;
  document.body.classList.add("modal-open");
  document.body.style.overflow = "hidden";
  bindDynamicContent();
  modalClose.focus();
  playTone(510, .04);
}

function closeModal() {
  backdrop.hidden = true;
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  currentHotspot = null;
  previousFocus?.focus();
}

function bindDynamicContent() {
  modalContent.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => openHotspot(button.dataset.open)));
  modalContent.querySelectorAll("[data-start]").forEach((button) => button.addEventListener("click", () => {
    state.started = true;
    saveState();
    updateProgress();
    openHotspot(button.dataset.start);
  }));
  modalContent.querySelectorAll("[data-complete]").forEach((button) => button.addEventListener("click", () => completeStep(button.dataset.complete, button.dataset.next)));
  modalContent.querySelectorAll("[data-field]").forEach((field) => field.addEventListener("input", () => {
    state.answers[field.dataset.field] = field.value;
    saveState();
  }));
  modalContent.querySelectorAll("[data-check]").forEach((checkbox) => {
    checkbox.checked = state.checks.includes(checkbox.dataset.check);
    checkbox.addEventListener("change", () => {
      state.checks = [...modalContent.querySelectorAll("[data-check]:checked")].map((item) => item.dataset.check);
      saveState();
    });
  });
  modalContent.querySelectorAll(".poem-stanza").forEach((stanza, index) => {
    stanza.addEventListener("mouseenter", () => setPoemImage(stanza, index));
    stanza.addEventListener("focus", () => setPoemImage(stanza, index));
    stanza.addEventListener("click", () => setPoemImage(stanza, index));
    stanza.tabIndex = 0;
  });
}

function setPoemImage(stanza, index) {
  const imageNumber = stanza.dataset.image;
  const image = document.getElementById("poemImage");
  modalContent.querySelectorAll(".poem-stanza").forEach((item) => item.classList.remove("active"));
  stanza.classList.add("active");
  image.style.opacity = ".25";
  setTimeout(() => {
    image.src = `Imagen ${imageNumber}.jpg`;
    image.alt = `Ilustración asociada al párrafo ${index + 1} del poema`;
    document.getElementById("poemCaption").textContent = `Imagen ${imageNumber} · Párrafo ${index + 1} de 8`;
    image.style.opacity = "1";
  }, 130);
}

function completeStep(id, next) {
  if (!state.completed.includes(id)) state.completed.push(id);
  const stepIndex = steps.indexOf(id);
  const followingStep = next || steps[stepIndex + 1];
  saveState();
  updateProgress();
  showToast(id === "delivery" ? "Actividad finalizada. Tu progreso quedó guardado." : "Actividad completada. Progreso guardado.");
  playTone(690, .08);
  if (followingStep) setTimeout(() => openHotspot(followingStep), 350);
  else if (id === "delivery") setTimeout(closeModal, 650);
}

function isUnlocked(id) {
  if (id === "intro") return true;
  if (id === "reading") return state.started || state.completed.includes("reading");
  const index = steps.indexOf(id);
  return index > 0 && (state.completed.includes(steps[index - 1]) || state.completed.includes(id));
}

function updateProgress() {
  const completedCount = steps.filter((step) => state.completed.includes(step)).length;
  const percentage = Math.round((completedCount / steps.length) * 100);
  const nextStep = state.started ? steps.find((step) => !state.completed.includes(step)) : "intro";
  document.getElementById("progressPercent").textContent = `${percentage}%`;
  document.getElementById("progressFill").style.width = `${percentage}%`;
  document.querySelectorAll(".progress-steps li").forEach((item) => item.classList.toggle("complete", state.completed.includes(item.dataset.step)));
  document.querySelectorAll(".progress-steps li").forEach((item) => {
    const unlocked = isUnlocked(item.dataset.step);
    item.classList.toggle("locked", !unlocked);
    item.querySelector("button").setAttribute("aria-disabled", String(!unlocked));
  });
  document.querySelectorAll(".hotspot[data-hotspot]").forEach((item) => {
    const id = item.dataset.hotspot;
    const unlocked = isUnlocked(id);
    item.classList.toggle("completed", state.completed.includes(id));
    item.classList.toggle("locked", !unlocked);
    item.classList.toggle("current", id === nextStep);
    item.setAttribute("aria-disabled", String(!unlocked));
  });
  const guide = document.getElementById("routeGuide");
  if (guide) guide.querySelector("strong").textContent = nextStep ? `${nextStep === "intro" ? "Inicia por" : "Siguiente:"} ${content[nextStep].title}` : "Ruta completada";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function playTone(frequency, duration) {
  if (!soundEnabled) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(.035, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

document.querySelectorAll(".hotspot").forEach((button) => button.addEventListener("click", () => openHotspot(button.dataset.hotspot)));
document.querySelectorAll(".progress-steps li").forEach((item) => item.querySelector("button").addEventListener("click", () => openHotspot(item.dataset.step)));
modalClose.addEventListener("click", closeModal);
backdrop.addEventListener("mousedown", (event) => { if (event.target === backdrop) closeModal(); });
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !backdrop.hidden) closeModal();
  if (event.key === "Tab" && !backdrop.hidden) {
    const focusable = [...modal.querySelectorAll("button, input, textarea, [tabindex='0']")].filter((element) => !element.disabled);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
document.getElementById("soundButton").addEventListener("click", (event) => {
  soundEnabled = !soundEnabled;
  event.currentTarget.setAttribute("aria-pressed", soundEnabled);
  event.currentTarget.querySelector(".button-label").textContent = soundEnabled ? "Sonido activo" : "Sonido";
  playTone(560, .06);
});
document.getElementById("resetButton").addEventListener("click", () => {
  if (!window.confirm("¿Deseas borrar el progreso y todas las respuestas guardadas?")) return;
  state.completed = [];
  state.started = false;
  state.answers = {};
  state.checks = [];
  saveState();
  updateProgress();
  showToast("La actividad se reinició correctamente.");
});

updateProgress();

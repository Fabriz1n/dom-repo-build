const TIMELINE_EVENTS = [
  { id: 1, year: "1955", era: "Juventud", title: "Nacimiento en Seattle", desc: "Nace William Henry Gates III el 28 de octubre en Seattle, Washington." },
  { id: 2, year: "1968", era: "Juventud", title: "Primer contacto con computadoras en Lakeside", desc: "A los 13 años programa en BASIC en una terminal conectada a un mainframe y coescribe un juego de tres en línea." },
  { id: 3, year: "1975", era: "Microsoft", title: "Fundación de Micro-Soft", desc: "Junto a Paul Allen crea un intérprete de BASIC para el Altair 8800 y abandona Harvard para dedicarse al software." },
  { id: 4, year: "1985", era: "Microsoft", title: "Lanzamiento de Windows 1.0", desc: "Introduce la interfaz gráfica por ventanas en el ecosistema PC, impulsando la adopción masiva de ordenadores." },
  { id: 5, year: "2000", era: "Filantropía", title: "Creación de la Fundación Gates", desc: "Junto a Melinda French Gates consolida una de las mayores organizaciones filantrópicas privadas del mundo." },
  { id: 6, year: "2010", era: "Filantropía", title: "Impulso de The Giving Pledge", desc: "Junto a Warren Buffett promueve que grandes fortunas comprometan la mayor parte de su riqueza a causas sociales." }
];

const MICROSOFT_HIGHLIGHTS = [
  {
    title: "Altair BASIC (1975)",
    badge: "Lenguajes y Compiladores",
    summary: "Junto a Paul Allen, desarrolló un intérprete de BASIC para el microcomputador Altair 8800, marcando el arranque formal de Micro-Soft."
  },
  {
    title: "MS-DOS y Windows (1981–1995)",
    badge: "Sistemas Operativos",
    summary: "Estandarizó el entorno de escritorio con Windows 95, integrando menús, barra de tareas y mayor accesibilidad para usuarios no técnicos."
  },
  {
    title: "Ofimática y Nube Empresarial",
    badge: "Productividad",
    summary: "Impulsó herramientas de oficina y una visión de software como servicio y plataforma para empresas y educación."
  }
];

const PHILANTHROPY_AREAS = [
  { area: "Salud Global", title: "Erradicación de enfermedades", desc: "Apoyo a campañas de vacunación, salud infantil y combate contra malaria y poliomielitis." },
  { area: "Clima y Energía", title: "Innovación verde", desc: "Inversión en tecnologías limpias y reducción de emisiones industriales, tema central en Cómo evitar un desastre climático." },
  { area: "Educación", title: "Acceso y calidad", desc: "Programas orientados a mejorar oportunidades educativas y herramientas digitales." }
];

const BOOKS_LIST = [
  { id: "b1", title: "Cómo evitar un desastre climático", author: "Bill Gates", topic: "Clima y tecnología" },
  { id: "b2", title: "Camino al futuro", author: "Bill Gates", topic: "Transformación digital" },
  { id: "b3", title: "Sapiens: De animales a dioses", author: "Yuval Noah Harari", topic: "Historia humana" },
  { id: "b4", title: "Factfulness", author: "Hans Rosling", topic: "Datos y perspectiva global" }
];

const TRIVIA_QUESTIONS = [
  {
    q: "¿En qué ciudad nació Bill Gates en 1955?",
    options: ["San Francisco", "Seattle", "Boston", "Chicago"],
    correct: 1
  },
  {
    q: "¿Con quién cofundó Microsoft en 1975?",
    options: ["Steve Jobs", "Paul Allen", "Larry Page", "Linus Torvalds"],
    correct: 1
  },
  {
    q: "¿Para qué microcomputador escribieron su versión inicial de BASIC en 1975?",
    options: ["Altair 8800", "Apple II", "Commodore 64", "IBM PC"],
    correct: 0
  }
];

const STORAGE_KEYS = {
  theme: "gates_bio_theme_v1",
  savedBooks: "gates_bio_books_v1",
  notes: "gates_bio_notes_v1"
};

function getSavedBooks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.savedBooks) || "[]");
}

function saveBooksList(books) {
  localStorage.setItem(STORAGE_KEYS.savedBooks, JSON.stringify(books));
  updateSavedBadge();
}

function updateSavedBadge() {
  const badge = document.getElementById("savedCount");
  if (badge) {
    badge.textContent = getSavedBooks().length;
  }
}

function toggleSaveBook(book) {
  const current = getSavedBooks();
  const exists = current.some((item) => item.id === book.id);
  const updated = exists ? current.filter((item) => item.id !== book.id) : [...current, book];
  saveBooksList(updated);
  return !exists;
}

function initTheme() {
  if (localStorage.getItem(STORAGE_KEYS.theme) === "light") {
    document.body.classList.add("light-theme");
  }
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
    });
  }
}

function initFooter() {
  const yearEl = document.getElementById("footerYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------------- INICIO ---------------- */
function renderHomePage() {
  const grid = document.getElementById("featuredMilestonesGrid");
  const rotateBtn = document.getElementById("rotateMilestonesBtn");
  if (!grid) return;

  let list = [...TIMELINE_EVENTS];
  const draw = () => {
    grid.innerHTML = "";
    list.slice(0, 3).forEach((ev) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div>
          <span class="card-tag">${ev.era}</span>
          <h3 class="card-title">${ev.title}</h3>
          <p class="card-desc">${ev.desc}</p>
        </div>
        <div class="card-footer">
          <span class="year-pill">${ev.year}</span>
          <a href="cronologia.html" class="btn btn-outline btn-sm">Ver más</a>
        </div>
      `;
      grid.appendChild(card);
    });
  };

  draw();
  if (rotateBtn) {
    rotateBtn.addEventListener("click", () => {
      list = list.sort(() => Math.random() - 0.5);
      draw();
    });
  }
}

/* ---------------- CRONOLOGÍA ---------------- */
function renderCronologiaPage() {
  const grid = document.getElementById("timelineGrid");
  const counter = document.getElementById("timelineCounter");
  const searchInput = document.getElementById("searchTimelineInput");
  const eraButtons = document.querySelectorAll("#eraFilters button[data-era]");
  if (!grid) return;

  let activeEra = "Todas";
  let query = "";

  const paint = () => {
    const filtered = TIMELINE_EVENTS.filter((ev) => {
      const matchEra = activeEra === "Todas" || ev.era === activeEra;
      const text = `${ev.year} ${ev.title} ${ev.desc} ${ev.era}`.toLowerCase();
      return matchEra && text.includes(query.toLowerCase());
    });

    grid.innerHTML = "";
    if (counter) counter.textContent = `${filtered.length} evento(s)`;

    if (filtered.length === 0) {
      grid.innerHTML = `<p class="card-desc">No hay eventos que coincidan con tu búsqueda.</p>`;
      return;
    }

    filtered.forEach((ev) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div>
          <span class="card-tag">${ev.era}</span>
          <h3 class="card-title">${ev.title}</h3>
          <p class="card-desc">${ev.desc}</p>
        </div>
        <div class="card-footer">
          <span class="year-pill">${ev.year}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  };

  eraButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      eraButtons.forEach((b) => {
        b.classList.remove("btn-primary");
        b.classList.add("btn-outline");
      });
      btn.classList.remove("btn-outline");
      btn.classList.add("btn-primary");
      activeEra = btn.dataset.era;
      paint();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      query = e.target.value;
      paint();
    });
  }

  paint();
}

/* ---------------- MICROSOFT ---------------- */
function renderMicrosoftPage() {
  const grid = document.getElementById("msHighlightsGrid");
  const titleEl = document.getElementById("inspectorTitle");
  const textEl = document.getElementById("inspectorText");
  const labelEl = document.getElementById("selectedEraDetail");
  if (!grid) return;

  MICROSOFT_HIGHLIGHTS.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <span class="card-tag">${item.badge}</span>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.summary}</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary btn-sm" type="button">Inspeccionar</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => {
      if (titleEl) titleEl.textContent = item.title;
      if (textEl) textEl.textContent = item.summary;
      if (labelEl) labelEl.textContent = `Activo: ${item.badge}`;
    });
    grid.appendChild(card);
  });
}

/* ---------------- FILANTROPÍA Y LIBROS ---------------- */
function renderFilantropiaPage() {
  const phGrid = document.getElementById("philanthropyGrid");
  const booksGrid = document.getElementById("booksGrid");
  const clearBtn = document.getElementById("clearSavedBooksBtn");
  if (!phGrid || !booksGrid) return;

  PHILANTHROPY_AREAS.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <span class="card-tag">${p.area}</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.desc}</p>
      </div>
    `;
    phGrid.appendChild(card);
  });

  const paintBooks = () => {
    const savedIds = getSavedBooks().map((b) => b.id);
    booksGrid.innerHTML = "";

    BOOKS_LIST.forEach((book) => {
      const isSaved = savedIds.includes(book.id);
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div>
          <span class="card-tag">${book.topic}</span>
          <h3 class="card-title">${book.title}</h3>
          <p class="card-desc">Autor: ${book.author}</p>
        </div>
        <div class="card-footer">
          <button class="btn ${isSaved ? "btn-gold" : "btn-outline"} btn-sm" type="button">
            ${isSaved ? "Guardado ✓" : "Guardar lectura"}
          </button>
        </div>
      `;
      card.querySelector("button").addEventListener("click", () => {
        toggleSaveBook(book);
        paintBooks();
      });
      booksGrid.appendChild(card);
    });
  };

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      saveBooksList([]);
      paintBooks();
    });
  }

  paintBooks();
}

/* ---------------- TRIVIA ---------------- */
function renderTriviaPage() {
  const qProgress = document.getElementById("questionProgress");
  const qText = document.getElementById("questionText");
  const optsBox = document.getElementById("optionsContainer");
  const feedback = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("nextQuestionBtn");
  const scoreDisplay = document.getElementById("scoreDisplay");
  if (!qText || !optsBox) return;

  let index = 0;
  let score = 0;
  let answered = false;

  const loadQuestion = () => {
    answered = false;
    if (feedback) feedback.hidden = true;
    const item = TRIVIA_QUESTIONS[index];
    if (qProgress) qProgress.textContent = `Pregunta ${index + 1} de ${TRIVIA_QUESTIONS.length}`;
    qText.textContent = item.q;
    optsBox.innerHTML = "";

    item.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-outline option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        if (feedback) feedback.hidden = false;
        if (idx === item.correct) {
          score += 10;
          if (scoreDisplay) scoreDisplay.textContent = `Puntaje: ${score}`;
          if (feedback) {
            feedback.className = "feedback success";
            feedback.textContent = "¡Correcto! +10 puntos.";
          }
        } else if (feedback) {
          feedback.className = "feedback error";
          feedback.textContent = `Respuesta incorrecta. Era: ${item.options[item.correct]}.`;
        }
      });
      optsBox.appendChild(btn);
    });
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % TRIVIA_QUESTIONS.length;
      loadQuestion();
    });
  }

  loadQuestion();
}

/* ---------------- CONTACTO Y NOTAS ---------------- */
function renderContactoPage() {
  const form = document.getElementById("noteForm");
  const listEl = document.getElementById("notesList");
  const feedbackEl = document.getElementById("noteFeedback");
  if (!form || !listEl) return;

  const notes = JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || "[]");

  const paintNotes = () => {
    listEl.innerHTML = "";
    notes.forEach((n) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div>
          <span class="card-tag">Por ${n.author}</span>
          <h3 class="card-title">${n.title}</h3>
          <p class="card-desc">${n.content}</p>
        </div>
      `;
      listEl.appendChild(card);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("noteTitle").value.trim();
    const author = document.getElementById("noteAuthor").value.trim();
    const content = document.getElementById("noteContent").value.trim();
    if (!title || !author || !content) return;

    notes.unshift({ title, author, content });
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
    paintNotes();
    form.reset();

    if (feedbackEl) {
      feedbackEl.hidden = false;
      feedbackEl.className = "feedback success";
      feedbackEl.textContent = "Nota agregada al DOM y guardada localmente.";
    }
  });

  paintNotes();
}

/* ---------------- INICIALIZACIÓN ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initFooter();
  updateSavedBadge();

  const page = document.documentElement.dataset.page;
  if (page === "home") renderHomePage();
  if (page === "cronologia") renderCronologiaPage();
  if (page === "microsoft") renderMicrosoftPage();
  if (page === "filantropia") renderFilantropiaPage();
  if (page === "trivia") renderTriviaPage();
  if (page === "contacto") renderContactoPage();
});
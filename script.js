const chatToggle = document.getElementById("chatToggle");
const chatbot = document.getElementById("chatbot");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatPrompts = document.getElementById("chatPrompts");
const profileForm = document.getElementById("profileForm");
const profileResult = document.getElementById("profileResult");
const profileModal = document.getElementById("profileModal");
const modalClose = document.getElementById("modalClose");
const openProfileButtons = document.querySelectorAll(".open-profile");
const pricingClass = document.getElementById("pricingClass");
const pricingFee = document.getElementById("pricingFee");
const pricingNote = document.getElementById("pricingNote");
const advisoryTitle = document.getElementById("advisoryTitle");
const advisorySummary = document.getElementById("advisorySummary");
const advisoryFee = document.getElementById("advisoryFee");
const advisoryNote = document.getElementById("advisoryNote");
const carouselShells = document.querySelectorAll(".carousel-shell");
const pricingCards = document.querySelectorAll(".pricing-card");

const tierSlugs = {
  "Upper Mass Affluent": "upper-mass-affluent",
  "Affluent": "affluent",
  "HNI": "hni",
  "UHNI": "uhni",
  "VHNI": "vhni"
};

function highlightPricingCard(label) {
  pricingCards.forEach((card) => card.classList.remove("is-active"));
  const slug = tierSlugs[label];
  if (!slug) return;
  const match = document.querySelector(`.pricing-card[data-tier="${slug}"]`);
  if (match) match.classList.add("is-active");
}

const promptQuestions = [
  "Which services do you offer?",
  "How does pricing work?",
  "What is my profession risk level?",
  "Show low-risk options",
  "How do you plan retirement?",
  "Where can I download the brochure?"
];

const professionRisk = {
  doctor: { level: "Medium risk", reason: "high income potential with professional liability and time constraints" },
  lawyer: { level: "Medium-high risk", reason: "case-driven income cycles and liability exposure" },
  ca: { level: "Medium risk", reason: "seasonal income intensity around compliance and advisory cycles" },
  architect: { level: "Medium risk", reason: "project-linked cash flow and delayed receivables" },
  consultant: { level: "Medium-high risk", reason: "client concentration and variable retainers" },
  freelancer: { level: "High risk", reason: "irregular income and limited employer-backed benefits" },
  engineer: { level: "Low risk", reason: "typically steadier salary visibility and lower professional liability" },
  army: { level: "High risk", reason: "service risk, relocation needs and family-protection priority" },
  other: { level: "Custom review", reason: "profession-specific risk needs to be reviewed manually" }
};

if (chatToggle && chatbot) chatToggle.addEventListener("click", () => chatbot.classList.add("open"));
if (chatClose && chatbot) chatClose.addEventListener("click", () => chatbot.classList.remove("open"));
if (openProfileButtons.length && profileModal) {
  openProfileButtons.forEach((button) => {
    button.addEventListener("click", () => openProfileModal());
  });
}
if (modalClose) modalClose.addEventListener("click", () => closeProfileModal());
if (profileModal) {
  profileModal.addEventListener("click", (event) => {
    if (event.target === profileModal) closeProfileModal();
  });
}

function openProfileModal() {
  if (!profileModal) return;
  profileModal.classList.add("open");
  profileModal.setAttribute("aria-hidden", "false");
}

function closeProfileModal() {
  if (!profileModal) return;
  profileModal.classList.remove("open");
  profileModal.setAttribute("aria-hidden", "true");
}

function addMessage(text, type) {
  const message = document.createElement("p");
  message.className = type;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(input) {
  const text = input.toLowerCase();

  if (text.includes("price") || text.includes("pricing") || text.includes("cost")) {
    return "Pricing follows client class: Upper Mass Affluent at Rs. 25,000, then 50% higher for Affluent, HNI and UHNI. VHNI is custom.";
  }

  if (text.includes("service") || text.includes("offer")) {
    return "Osher focuses on investment planning, cash-flow design, insurance, goal planning, debt management and retirement planning.";
  }

  if (text.includes("profession") || text.includes("engineer") || text.includes("army")) {
    return "Profession changes risk context. Engineer is treated as low risk. Army / Defence is treated as high risk. Freelancers and creators are also high risk because income is less predictable.";
  }

  if (text.includes("risk") || text.includes("safe") || text.includes("government")) {
    return "Low-risk planning may include PPF, EPF, sovereign-backed instruments, conservative debt allocation, emergency corpus and insurance-first protection.";
  }

  if (text.includes("retire") || text.includes("retirement")) {
    return "Retirement planning looks at years left, current assets, income stability, target lifestyle and risk capacity before suggesting a corpus path.";
  }

  if (text.includes("brochure") || text.includes("download")) {
    return "Use the Download Brochure button in the first section. It downloads the PDF brochure.";
  }

  if (text.includes("contact") || text.includes("call")) {
    return "Use the contact form near the bottom of the page to request a private discovery call.";
  }

  return "Try one of the suggested prompts. I can guide you on services, pricing, risk level, low-risk options, retirement and brochure download.";
}

function askPrompt(question) {
  addMessage(question, "user");
  addMessage(getBotReply(question), "bot");
}

if (chatPrompts) {
  promptQuestions.forEach((question) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = question;
    button.addEventListener("click", () => askPrompt(question));
    chatPrompts.appendChild(button);
  });
}

carouselShells.forEach((shell) => {
  const track = shell.querySelector("[data-carousel]");
  const previous = shell.querySelector("[data-carousel-prev]");
  const next = shell.querySelector("[data-carousel-next]");
  if (!track || !previous || !next) return;

  function moveCarousel(direction) {
    const card = track.querySelector(".service-card");
    const gap = 18;
    const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  previous.addEventListener("click", () => moveCarousel(-1));
  next.addEventListener("click", () => moveCarousel(1));
});

function classifyClient(income, assets) {
  const score = Math.max(income, assets);
  if (score >= 200000000) return { label: "VHNI", fee: "Custom private quote", note: "private mandate and family-office style review" };
  if (score >= 50000000) return { label: "UHNI", fee: "Rs. 84,375", note: "family-level strategy and risk governance" };
  if (score >= 15000000) return { label: "HNI", fee: "Rs. 56,250", note: "advanced portfolio guidance and retirement modelling" };
  if (score >= 5000000) return { label: "Affluent", fee: "Rs. 37,500", note: "expanded planning for goals and uneven cash flow" };
  return { label: "Upper Mass Affluent", fee: "Rs. 25,000", note: "starter financial plan and protection review" };
}

function updatePricing(profile) {
  if (!pricingClass || !pricingFee || !pricingNote) return;
  pricingClass.textContent = `${profile.client.label} advisory profile`;
  pricingFee.textContent = profile.client.fee;
  pricingNote.textContent = `${profile.summary} Low-risk mandate, if selected, is charged separately at Rs. 18,000 plus 0.35% of the investment made.`;
  highlightPricingCard(profile.client.label);   
}

function loadAdvisoryPage() {
  if (!advisoryTitle || !advisorySummary || !advisoryFee || !advisoryNote) return;
  const saved = localStorage.getItem("osherProfile");
  if (!saved) return;
  const profile = JSON.parse(saved);
  advisoryTitle.textContent = `${profile.client.label} advisory profile`;
  advisorySummary.textContent = profile.summary;
  advisoryFee.textContent = profile.client.fee;
  advisoryNote.textContent = `Profession risk: ${profile.risk.level}. Low-risk mandate can be added separately at Rs. 18,000 plus 0.35% of the investment made.`;
}

if (profileForm) profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const age = Number(document.getElementById("age").value);
  const profession = document.getElementById("profession").value;
  const income = Number(document.getElementById("income").value);
  const assets = Number(document.getElementById("assets").value);
  const retirement = Number(document.getElementById("retirement").value);
  const client = classifyClient(income, assets);
  const risk = professionRisk[profession];
  const years = Math.max(retirement - age, 0);
  const summary = `Demo profile: ${client.label}. Profession risk: ${risk.level}, due to ${risk.reason}. Planning focus: ${years} years to retirement, liquidity buffers and ${client.note}.`;
  const profile = { client, risk, summary };

  profileResult.textContent = `${summary} Suggested fee: ${client.fee}.`;
  localStorage.setItem("osherProfile", JSON.stringify(profile));
  updatePricing(profile);
  closeProfileModal();
  window.location.href = "advisory.html";
});

loadAdvisoryPage();

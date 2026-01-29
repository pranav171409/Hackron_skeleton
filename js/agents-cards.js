// Menu toggle
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");
toggle.onclick = () => nav.classList.toggle("open");

// Login/Logout button
document.getElementById("login-btn").onclick = () => {
  window.location.href = "/auth"; // redirect to auth
};

// Agent card functionality
const agentCards = document.querySelectorAll(".agent-card");

agentCards.forEach(card => {
  const runBtn = card.querySelector(".run-agent-btn");
  const outputDiv = card.querySelector(".agent-output");
  const textInput = card.querySelector(".agent-text");
  const fileInput = card.querySelector(".agent-file");
  const agentName = card.getAttribute("data-agent");

  runBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    const file = fileInput.files[0];

    if(!text && !file) {
      outputDiv.textContent = "Please provide text or file input to run this agent.";
      return;
    }

    // Clear previous output
    outputDiv.textContent = "";

    // Dispatch event for backend integration
    const runEvent = new CustomEvent("runAgent", {
      detail: { agent: agentName, text: text, file: file }
    });
    document.dispatchEvent(runEvent);

    outputDiv.textContent = "Running agent..."; // placeholder until backend responds
  });
});

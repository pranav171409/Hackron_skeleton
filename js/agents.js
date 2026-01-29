// Menu toggle
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");
toggle.onclick = () => nav.classList.toggle("open");

// Login/Logout button
document.getElementById("login-btn").onclick = () => {
  window.location.href = "/auth"; // redirect to auth
};

// Agents logic
const agentList = document.querySelectorAll('.agents-sidebar li');
const agentTitle = document.getElementById('agent-title');
const agentDesc = document.getElementById('agent-desc');
const agentOutput = document.getElementById('agent-output');

const agentsData = {
  research: {
    title: "Research Agent",
    desc: "Performs autonomous research and summarizes information across multiple domains.",
  },
  workflow: {
    title: "Workflow Agent",
    desc: "Automates repetitive tasks and multi-step processes for productivity.",
  },
  vision: {
    title: "Vision Agent",
    desc: "Analyzes images, diagrams, and visual data with AI vision models.",
  },
  archive: {
    title: "Archive Agent",
    desc: "Organizes, summarizes, and retrieves data efficiently.",
  },
  execution: {
    title: "Execution Agent",
    desc: "Handles scripts, API calls, and task execution for automation.",
  }
};

// Update panel when agent is selected
agentList.forEach(li => {
  li.addEventListener('click', () => {
    const key = li.getAttribute('data-agent');
    agentTitle.textContent = agentsData[key].title;
    agentDesc.textContent = agentsData[key].desc;
    agentOutput.textContent = ""; // clear previous output
    document.getElementById('agent-input').value = ""; // clear input
  });
});

// Run agent button
document.getElementById('run-btn').onclick = () => {
  const input = document.getElementById('agent-input').value.trim();
  const agent = agentTitle.textContent;

  if(!input) {
    agentOutput.textContent = "Please enter a task or prompt to run the agent.";
    return;
  }

  // Trigger backend integration
  // Example: dispatch event with agent and input
  const runEvent = new CustomEvent("runAgent", {
    detail: { agent: agent, input: input }
  });
  document.dispatchEvent(runEvent);

  // Clear previous output (backend should update it)
  agentOutput.textContent = "";
};

(function () {
  const API_URL = window.PORTFOLIO_CHAT_API || "/api/chat";
  const MAX_HISTORY = 6;

  const root = document.getElementById("chatbot");
  if (!root) return;

  const toggle = document.getElementById("chatbotToggle");
  const panel = document.getElementById("chatbotPanel");
  const closeBtn = document.getElementById("chatbotClose");
  const form = document.getElementById("chatbotForm");
  const input = document.getElementById("chatbotInput");
  const messages = document.getElementById("chatbotMessages");
  const status = document.getElementById("chatbotStatus");

  /** @type {{ role: string, content: string }[]} */
  let history = [];
  let busy = false;

  function setOpen(open) {
    root.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
    if (open) {
      input.focus();
    }
  }

  function appendMessage(role, text) {
    const el = document.createElement("div");
    el.className = `chatbot-msg chatbot-msg--${role}`;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function setStatus(text) {
    status.textContent = text || "";
  }

  async function sendMessage(text) {
    if (busy || !text) return;
    busy = true;
    form.classList.add("is-busy");
    setStatus("");

    appendMessage("user", text);
    history.push({ role: "user", content: text });
    if (history.length > MAX_HISTORY * 2) {
      history = history.slice(-MAX_HISTORY * 2);
    }

    const pending = appendMessage("assistant", "…");
    pending.classList.add("is-pending");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: history.slice(0, -1).slice(-MAX_HISTORY),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Request failed");
      }

      const reply = data.reply || "I could not generate a reply.";
      pending.textContent = reply;
      pending.classList.remove("is-pending");
      history.push({ role: "assistant", content: reply });
      setStatus("");
    } catch (err) {
      pending.textContent =
        err.message || "Something went wrong. Please try again.";
      pending.classList.remove("is-pending");
      pending.classList.add("is-error");
      setStatus("");
    } finally {
      busy = false;
      form.classList.remove("is-busy");
      messages.scrollTop = messages.scrollHeight;
      input.focus();
    }
  }

  toggle.addEventListener("click", () => {
    setOpen(!root.classList.contains("is-open"));
  });

  closeBtn.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) {
      setOpen(false);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    sendMessage(text);
  });

  root.querySelectorAll("[data-chat-prompt]").forEach((btn) => {
    btn.addEventListener("click", () => {
      sendMessage(btn.getAttribute("data-chat-prompt"));
    });
  });
})();

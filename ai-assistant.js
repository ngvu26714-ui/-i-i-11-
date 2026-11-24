
(() => {
  "use strict";

  // AI Trợ lý Chiến sĩ BBB11
  const API_URL =
    "https://bbb11-ai-assistant.ngvu26714.workers.dev";

  // Không tạo chatbot trùng lặp
  if (document.getElementById("bbb11-ai-root")) return;

  // Nạp CSS giao diện
  if (!document.querySelector('link[data-bbb11-ai-css]')) {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = new URL("./ai-assistant.css", document.baseURI).href;
    style.dataset.bbb11AiCss = "true";
    document.head.appendChild(style);
  }

  // Tạo chatbot
  const root = document.createElement("div");
  root.id = "bbb11-ai-root";

  root.innerHTML = `
    <button id="bbb11-ai-button" type="button"
      aria-expanded="false" aria-controls="bbb11-ai-panel">
      ✨ AI Trợ lý BBB11
    </button>

    <section id="bbb11-ai-panel" aria-label="AI Trợ lý Chiến sĩ">
      <header class="bbb11-ai-header">

        <div class="bbb11-ai-avatar"
          aria-label="Nhân vật chiến sĩ BBB11">

          <img
            class="bbb11-ai-avatar-img"
            src="https://etbczslniaqsivyogdpw.supabase.co/storage/v1/object/public/admin@gmali.com/images%20(1).jfif"
            alt="Chiến sĩ AI BBB11"
          />

        </div>

        <div class="bbb11-ai-heading">
          <div class="bbb11-ai-title">
            🇻🇳 AI Trợ lý Chiến sĩ BBB11
          </div>
          <div class="bbb11-ai-subtitle">
            ✨ Đồng hành cùng chiến sĩ
          </div>
        </div>

        <button id="bbb11-ai-close" type="button"
          aria-label="Đóng cửa sổ">×</button>
      </header>

      <div id="bbb11-ai-messages" aria-live="polite"></div>

      <form id="bbb11-ai-form">
        <textarea id="bbb11-ai-input" rows="1"
          placeholder="Nhập câu hỏi của bạn..."
          aria-label="Nhập câu hỏi" required></textarea>
        <button id="bbb11-ai-send" type="submit">Gửi ➤</button>
      </form>
    </section>
  `;

  // QUAN TRỌNG: Thêm chatbot vào website
  // Đây là phần bị thiếu trong code bạn gửi
  function mountChatbot() {
    if (!document.getElementById("bbb11-ai-root")) {
      document.body.appendChild(root);
    }
  }

  if (document.body) {
    mountChatbot();
  } else {
    document.addEventListener("DOMContentLoaded", mountChatbot, {
      once: true
    });
  }

  const toggle = root.querySelector("#bbb11-ai-button");
  const panel = root.querySelector("#bbb11-ai-panel");
  const close = root.querySelector("#bbb11-ai-close");
  const messages = root.querySelector("#bbb11-ai-messages");
  const form = root.querySelector("#bbb11-ai-form");
  const input = root.querySelector("#bbb11-ai-input");
  const send = root.querySelector("#bbb11-ai-send");
  const avatar = root.querySelector(".bbb11-ai-avatar-img");

  const history = [];
  let busy = false;

  // Nếu ảnh lỗi, hiển thị biểu tượng dự phòng
  avatar.addEventListener("error", () => {
    avatar.style.display = "none";
    avatar.parentElement.textContent = "🪖";
    avatar.parentElement.style.fontSize = "32px";
  }, { once: true });

  // Hiển thị tin nhắn an toàn
  function addMessage(text, role) {
    const bubble = document.createElement("div");

    bubble.className =
      "bbb11-ai-message " +
      (role === "user" ? "bbb11-ai-user" : "bbb11-ai-bot");

    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;

    return bubble;
  }

  function openChat() {
    panel.classList.add("bbb11-ai-open");
    toggle.setAttribute("aria-expanded", "true");
    input.focus();
  }

  function closeChat() {
    panel.classList.remove("bbb11-ai-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", () => {
    if (panel.classList.contains("bbb11-ai-open")) {
      closeChat();
    } else {
      openChat();
    }
  });

  close.addEventListener("click", closeChat);

  // Lời chào ban đầu
  addMessage(
    "Xin chào! Tôi là AI Trợ lý Chiến sĩ BBB11. " +
    "Bạn có thể hỏi về học tập chính trị, ôn tập kiến thức, " +
    "cẩm nang chiến sĩ hoặc cách sử dụng website.",
    "assistant"
  );

  // Gửi câu hỏi tới Cloudflare Workers
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (!message || busy) return;

    if (message.length > 2000) {
      addMessage("Câu hỏi tối đa 2000 ký tự nhé.", "assistant");
      return;
    }

    addMessage(message, "user");
    input.value = "";

    busy = true;
    send.disabled = true;
    input.disabled = true;

    const waiting = addMessage(
      "Đang suy nghĩ, bạn chờ một chút nhé...",
      "assistant"
    );

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          history: history.slice(-10)
        })
      });

      const data = await response.json();

      waiting.remove();

      if (!response.ok) {
        throw new Error(
          data.error || `Lỗi HTTP ${response.status}`
        );
      }

      if (
        typeof data.reply !== "string" ||
        !data.reply.trim()
      ) {
        throw new Error(
          "AI chưa trả về câu trả lời hợp lệ."
        );
      }

      addMessage(data.reply, "assistant");

      history.push(
        { role: "user", content: message },
        { role: "assistant", content: data.reply }
      );

      if (history.length > 10) {
        history.splice(0, history.length - 10);
      }

    } catch (error) {
      waiting.remove();

      console.error("BBB11 AI:", error);

      addMessage(
        "Chưa thể kết nối AI lúc này. " +
        (error.message || "Vui lòng thử lại sau."),
        "assistant"
      );

    } finally {
      busy = false;
      send.disabled = false;
      input.disabled = false;
      input.focus();
    }
  });

  // Enter để gửi, Shift + Enter để xuống dòng
  input.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.isComposing
    ) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

})();



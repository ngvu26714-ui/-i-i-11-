
/* ==================================================
   AI TRỢ LÝ CHIẾN SĨ BBB11
   CSS đồng bộ với ai-assistant.js
   ================================================== */

#bbb11-ai-root {
  --ai-red: #a90000;
  --ai-red-dark: #570000;
  --ai-gold: #ffdf77;
  --ai-cream: #fffaf0;
  font-family: "Segoe UI", Arial, sans-serif;
}

/* Nút mở chatbot */
#bbb11-ai-button {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 99998;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 19px;
  border: 2px solid var(--ai-gold);
  border-radius: 50px;
  background: linear-gradient(135deg, #650000, #d71920);
  color: #fff2b0;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 7px 25px #72000050;
  transition: transform .2s, box-shadow .2s;
  animation: bbb11-ai-glow 2.8s ease-in-out infinite;
}

#bbb11-ai-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px #a9000070;
}

#bbb11-ai-button:focus-visible,
#bbb11-ai-close:focus-visible,
#bbb11-ai-send:focus-visible {
  outline: 3px solid #ffdf77;
  outline-offset: 3px;
}

@keyframes bbb11-ai-glow {
  0%, 100% {
    box-shadow: 0 7px 25px #72000050;
  }
  50% {
    box-shadow: 0 7px 28px #ffdf7750;
  }
}

/* Cửa sổ trò chuyện */
#bbb11-ai-panel {
  position: fixed;
  right: 22px;
  bottom: 88px;
  z-index: 99999;
  display: none;
  flex-direction: column;
  width: 390px;
  max-width: calc(100vw - 24px);
  height: min(570px, calc(100dvh - 115px));
  min-height: 300px;
  overflow: hidden;
  border: 2px solid var(--ai-gold);
  border-radius: 22px;
  background: var(--ai-cream);
  color: #29231b;
  box-shadow: 0 18px 55px #35000040;
  font-family: "Segoe UI", Arial, sans-serif;
  box-sizing: border-box;
}

#bbb11-ai-panel.bbb11-ai-open {
  display: flex;
  animation: bbb11-ai-enter .22s ease-out;
}

#bbb11-ai-panel *,
#bbb11-ai-button {
  box-sizing: border-box;
}

@keyframes bbb11-ai-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Thanh tiêu đề */
#bbb11-ai-root .bbb11-ai-header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  min-height: 92px;
  padding: 14px;
  overflow: hidden;
  color: #fff2b0;
  background:
    radial-gradient(circle at 90% 10%, #ffdc6240, transparent 38%),
    linear-gradient(125deg, #570000, #a90000 60%, #d51c20);
  border-bottom: 3px solid var(--ai-gold);
}

/* Nhân vật chiến sĩ AI */
#bbb11-ai-root .bbb11-ai-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 64px;
  width: 64px;
  height: 64px;
  padding: 0;
  overflow: hidden;
  border: 2px solid var(--ai-gold);
  border-radius: 50%;
  background: linear-gradient(145deg, #a90000, #570000);
  box-shadow: 0 0 0 3px #ffffff18,
              0 0 18px #ffdf7755;
}

#bbb11-ai-root .bbb11-ai-avatar-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

/* Tên và lời giới thiệu */
#bbb11-ai-root .bbb11-ai-heading {
  flex: 1;
  min-width: 0;
}

#bbb11-ai-root .bbb11-ai-title {
  font-size: 14px;
  font-weight: 800;
  line-height: 1.5;
}

#bbb11-ai-root .bbb11-ai-subtitle {
  margin-top: 4px;
  color: #ffe9a6;
  font-size: 11px;
  line-height: 1.5;
}

/* Nút đóng */
#bbb11-ai-close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid #ffffff30;
  border-radius: 9px;
  background: #ffffff18;
  color: white;
  cursor: pointer;
  font-size: 25px;
  line-height: 1;
}

#bbb11-ai-close:hover {
  background: #ffffff30;
}

/* Khu vực tin nhắn */
#bbb11-ai-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
}

.bbb11-ai-message {
  max-width: 90%;
  padding: 10px 13px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.65;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.bbb11-ai-bot {
  align-self: flex-start;
  background: #f1eadb;
  color: #29231b;
  border-bottom-left-radius: 4px;
}

.bbb11-ai-user {
  align-self: flex-end;
  background: #850000;
  color: white;
  border-bottom-right-radius: 4px;
}

/* Khung nhập câu hỏi */
#bbb11-ai-form {
  display: flex;
  align-items: flex-end;
  flex-shrink: 0;
  gap: 8px;
  padding: 11px;
  border-top: 1px solid #eadfca;
  background: white;
}

#bbb11-ai-input {
  display: block;
  flex: 1;
  width: 0;
  min-width: 0;
  min-height: 42px;
  max-height: 110px;
  resize: vertical;
  padding: 11px;
  border: 1px solid #d9d0c0;
  border-radius: 12px;
  outline: none;
  background: white;
  color: #29231b;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.5;
}

#bbb11-ai-input:focus {
  border-color: #a00000;
  box-shadow: 0 0 0 3px #a0000015;
}

#bbb11-ai-send {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 58px;
  height: 42px;
  padding: 0 11px;
  border: 0;
  border-radius: 12px;
  background: #850000;
  color: #ffdf00;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: background .2s;
}

#bbb11-ai-send:hover:not(:disabled) {
  background: #b00000;
}

#bbb11-ai-send:disabled {
  opacity: .55;
  cursor: wait;
}

/* Thanh cuộn */
#bbb11-ai-messages::-webkit-scrollbar {
  width: 6px;
}

#bbb11-ai-messages::-webkit-scrollbar-thumb {
  background: #d8c89e;
  border-radius: 10px;
}

/* Điện thoại */
@media (max-width: 480px) {
  #bbb11-ai-button {
    right: 14px;
    bottom: 16px;
    padding: 12px 15px;
    font-size: 13px;
  }

  #bbb11-ai-panel {
    right: 8px;
    bottom: 80px;
    width: calc(100vw - 16px);
    max-width: none;
    height: min(590px, calc(100dvh - 96px));
    border-radius: 18px;
  }

  #bbb11-ai-root .bbb11-ai-header {
    gap: 9px;
    padding: 11px;
  }

  #bbb11-ai-root .bbb11-ai-avatar {
    flex-basis: 54px;
    width: 54px;
    height: 54px;
  }

  #bbb11-ai-root .bbb11-ai-title {
    font-size: 12px;
  }

  #bbb11-ai-root .bbb11-ai-subtitle {
    font-size: 10px;
  }

  .bbb11-ai-message {
    max-width: 94%;
  }
}

/* Hạn chế chuyển động nếu người dùng yêu cầu */
@media (prefers-reduced-motion: reduce) {
  #bbb11-ai-button,
  #bbb11-ai-panel.bbb11-ai-open {
    animation: none;
    transition: none;
  }

  #bbb11-ai-messages {
    scroll-behavior: auto;
  }
}



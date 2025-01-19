const CONFIG_URL = chrome.runtime.getURL('config.js');

function injectStylesheet(filename) {
  const link = document.createElement('link');
  link.href = chrome.runtime.getURL(filename);
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

injectStylesheet('style.css');


(async () => {
    const module = await import(CONFIG_URL);
    const CONFIG = module.default;
    // 選択範囲を取得
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : "";
  
    // 選択範囲を含むHTMLを取得
    const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
    const containerElement = range?.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? range.commonAncestorContainer
      : range?.commonAncestorContainer?.parentElement;
  
    const selectedHTML = containerElement ? containerElement.outerHTML : "";
  
    // 入力ウィンドウを作成
    const inputContainer = document.createElement("div");
    inputContainer.className = "inputContainer"; // スタイルクラスを適用
    
    const inputField = document.createElement("textarea");
    inputField.placeholder = "Enter additional text (optional)";
    inputField.className = "inputField"; // スタイルクラスを適用
    
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer"; // スタイルクラスを適用
    
    const sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.className = "button"; // スタイルクラスを適用
    
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "button"; // スタイルクラスを適用
  
    buttonContainer.appendChild(sendButton);
    buttonContainer.appendChild(cancelButton);
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(buttonContainer);
    document.body.appendChild(inputContainer);
  
    // フォーカスを設定
    inputField.focus();
  
    const removeInputContainer = () => {
      if (inputContainer.parentElement) {
        inputContainer.parentElement.removeChild(inputContainer);
      }
    };
  
    const sendData = async () => {
      const userInput = inputField.value.trim();
  
      const dataToSend = {
        selectedText: selectedText || null,
        selectedHTML: selectedHTML || null,
        userInput: userInput || null
      };
  
      try {
        await fetch(CONFIG.WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
        alert("Data sent successfully!");
      } catch (error) {
        console.error("Failed to send data:", error);
        alert("Failed to send data.");
      } finally {
        removeInputContainer();
      }
    };
  
    // 入力フィールドのサイズを調整
    inputField.addEventListener("input", () => {
      inputField.style.height = "auto"; // 自動リセット
      inputField.style.height = `${inputField.scrollHeight}px`; // 内容に応じた高さに調整
    });
  
    // ボタンのクリックで送信
    sendButton.addEventListener("click", sendData);
  
    // キャンセルボタンのクリックでウィンドウを閉じる
    cancelButton.addEventListener("click", removeInputContainer);
  
    // Command + Enter (Mac) または Ctrl + Enter (Windows/Linux) で送信
    inputField.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        sendData();
      }
    });
  
    // Escapeキーでウィンドウを閉じる
    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        removeInputContainer();
      }
    });
  })();
  
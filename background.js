chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.frameId === 0 && details.url !== "https://www.google.com/" && details.url !== "chrome://new-tab-page/") {
    fetch("http://127.0.0.1:3001/predict_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: details.url }),
    })
      .then((response) => response.json())
      .then((data) => {
        chrome.tabs.sendMessage(details.tabId, { action: "checkURL", data: data.predict });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

chrome.webNavigation.onErrorOccurred.addListener(function(details) {
  if (details.frameId === 0) {
    console.log("Error loading page:", details.url, details.error);
    s = "Trang truy cập có nguy cơ độc hại. Bạn có muốn tiếp tục truy cập?";
    // Tạo cửa sổ confirm với hai nút "OK" và "Cancel"
    var result = confirm(s);
    if (result) {
      // Nếu người dùng nhấn "OK"
      console.log("User clicked OK");
    } else {
      // Nếu người dùng nhấn "Cancel"
      chrome.tabs.update({ url: "https://www.google.com" });
    }
  }
});


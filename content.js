chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkURL") {
    customConfirm(request.data);
  }
});

function customConfirm(message) {
  var s = "";
  if (message == 0) {
    s = "Trang truy cập là an toàn.";
    alert(s);
  } else {
    s = "Trang truy cập có nguy cơ độc hại. Bạn có muốn tiếp tục truy cập?";
    // Tạo cửa sổ confirm với hai nút "OK" và "Cancel"
    var result = confirm(s);
    if (result) {
      // Nếu người dùng nhấn "OK"
      console.log("User clicked OK");
    } else {
      // Nếu người dùng nhấn "Cancel"
      window.location.href = "https://www.google.com";
    }
  }
}


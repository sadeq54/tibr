(function () {
  try {
    var s = localStorage.getItem("gpa-theme");
    var t;
    if (s === "light" || s === "dark") {
      t = s;
    } else {
      var h = new Date().getHours();
      t = h >= 7 && h < 19 ? "light" : "dark";
    }
    var root = document.documentElement;
    root.classList.remove(t === "light" ? "dark" : "light");
    root.classList.add(t);
    root.dataset.theme = t;
  } catch (e) {}
})();

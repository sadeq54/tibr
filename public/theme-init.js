(function () {
  try {
    var s = localStorage.getItem("tibr-theme");
    var p = window.matchMedia("(prefers-color-scheme: light)").matches;
    var t = s || (p ? "light" : "dark");
    if (t === "light") document.documentElement.classList.add("light");
    document.documentElement.dataset.theme = t;
  } catch (e) {}
})();

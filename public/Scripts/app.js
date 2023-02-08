(function () {
  function Start() {
    console.log("App Started...");
  }

  window.addEventListener("load", Start);
})();
function onSubmit() {
  console.log("Clicked");
  window.location.href = "/";
}

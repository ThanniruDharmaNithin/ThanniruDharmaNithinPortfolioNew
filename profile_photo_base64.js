document.addEventListener("DOMContentLoaded", () => {
  const imgEl = document.getElementById("profile-pic");
  const wrapper = document.getElementById("profile-photo-wrapper");

  if (!imgEl || !wrapper) return;

  // Replace with your real base64 if you have a real photo
  const base64Data =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

  imgEl.src = `data:image/png;base64,${base64Data}`;

  imgEl.onload = () => {
    wrapper.classList.add("has-photo");
  };

  imgEl.onerror = () => {
    console.error("Failed to load profile image from base64.");
  };
});

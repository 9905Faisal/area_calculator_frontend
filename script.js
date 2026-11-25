const $ = (id) => document.getElementById(id);

function readNumber(id) {
  const field = $(id);
  const value = field.value.trim();
  if (value === "" || !Number.isFinite(Number(value)) || Number(value) < 0) {
    field.focus();
    return null;
  }
  return Number(value);
}

function showResult(shape, value) {
  const box = $(`${shape}Result`);
  box.classList.remove("error");
  box.querySelector("strong").textContent = Number(value.toFixed(4)).toLocaleString();
}

function showError(shape) {
  const box = $(`${shape}Result`);
  box.classList.add("error");
  box.querySelector("strong").textContent = "Enter valid values";
}

document.querySelectorAll("[data-calc]").forEach((button) => {
  button.addEventListener("click", () => {
    const shape = button.dataset.calc;
    let area;

    if (shape === "circle") {
      const radius = readNumber("radius");
      if (radius === null) return showError(shape);
      area = 3.1416 * radius * radius; // Same constant as the supplied C++.
    } else if (shape === "rectangle") {
      const length = readNumber("length");
      const width = readNumber("width");
      if (length === null || width === null) return showError(shape);
      area = length * width;
    } else {
      const base = readNumber("base");
      const height = readNumber("height");
      if (base === null || height === null) return showError(shape);
      area = 0.5 * base * height;
    }
    showResult(shape, area);
  });
});

$("resetBtn").addEventListener("click", () => {
  document.querySelectorAll("input").forEach((input) => input.value = "");
  document.querySelectorAll(".result").forEach((result) => {
    result.classList.remove("error");
    result.querySelector("strong").textContent = "—";
  });
});

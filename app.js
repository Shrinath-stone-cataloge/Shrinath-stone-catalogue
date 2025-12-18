const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTjeI7jZfj9znA-zzkQqYmQ5EIFyS3oX89k4EG8eYsZ2Ne8wB2Tn-NHNxLNZ1fKYScXem2owry5ueuq/pub?output=csv";

fetch(SHEET_URL)
  .then((res) => res.text())
  .then((csv) => {
    const rows = csv.split("\n").slice(1);

    rows.sort((a, b) => {
      return b.split(",")[0] - a.split(",")[0]; // newest first
    });

    const feed = document.getElementById("product-feed");

    rows.forEach((row) => {
      const cols = row.split(",");
      if (!cols[0]) return;

      const images = cols.slice(8, 12).filter((img) => img);

      let sliderHTML = "";
      images.forEach((img) => {
        sliderHTML += `<img src="${img}" alt="Product image">`;
      });

      feed.innerHTML += `
        <section class="product-card">
          <div class="slider">${sliderHTML}</div>
          <div class="product-info">

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTjeI7jZfj9znA-zzkQqYmQ5EIFyS3oX89k4EG8eYsZ2Ne8wB2Tn-NHNxLNZ1fKYScXem2owry5ueuq/pub?output=csv";

function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let char of text) {
    if (char === '"' ) {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(value);
      value = "";
    } else if (char === "\n" && !insideQuotes) {
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  row.push(value);
  rows.push(row);
  return rows;
}

fetch(SHEET_URL)
  .then(res => res.text())
  .then(csv => {
    const data = parseCSV(csv).slice(1).reverse();
    const feed = document.getElementById("product-feed");

    data.forEach(cols => {
      if (!cols[2]) return;

      const images = cols.slice(8, 12).filter(Boolean);
      let sliderHTML = images.map(img => `<img src="${img}">`).join("");

      feed.innerHTML += `
        <section class="product-card">
          <div class="slider">${sliderHTML}</div>
          <div class="product-info">
            <h2>${cols[2]}<br><small>${cols[3]}</small></h2>
            <p>${cols[5]} | ${cols[6]} | ${cols[7]}</p>
            <p>Status: ${cols[12]}</p>
            <a class="whatsapp-btn"
              href="https://wa.me/917877425470?text=${encodeURIComponent(cols[13] || cols[2])}">
              Enquire on WhatsApp
            </a>
          </div>
        </section>`;
    });
  });


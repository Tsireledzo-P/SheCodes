const form = document.getElementById("travel-form");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const experience = document.getElementById("experience").value;
  const budget = document.getElementById("budget").value;
  const climate = document.getElementById("climate").value;
  const season = document.getElementById("season").value;
  const group = document.getElementById("group").value;

  resultsDiv.innerHTML = "Generating travel destinations... 🌍";

  const prompt = `
  Suggest 3 travel destinations for someone who wants a "${experience}" experience, has a "${budget}" budget, prefers a "${climate}" climate, wants to travel in "${season}", and is traveling as a "${group}". For each destination, include a name, a short description, and 1-2 unique reasons why it fits.
  `;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY" // Replace with your key
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.7,
    })
  });

  const data = await response.json();
  resultsDiv.innerHTML = `<pre>${data.choices[0].text}</pre>`;
});

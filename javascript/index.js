document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("load-btn");
  const container = document.getElementById("cards-container");

  function nomFichierDepuisSigne(signe) {
    return signe
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  button.addEventListener("click", () => {
    console.log("Le bouton a été cliqué !");
    container.innerHTML = "";
    const loader = document.createElement("div");
    loader.textContent = "Chargement en cours...";
    loader.classList.add("loader");
    container.appendChild(loader);

    setTimeout(() => {
      fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key:
            "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!",
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Réponse réseau non OK");
          return response.json();
        })
        .then((data) => {
          console.log("Réponse reçue de l’API :", data);
          if (data.error) throw new Error("Erreur API : " + data.message);

          const horoscopes = data.horoscope;
          container.innerHTML = "";

          for (const signe in horoscopes) {
            const message = horoscopes[signe];
            const imageName = nomFichierDepuisSigne(signe);
            const imagePath = `images/images-zodiaque/${imageName}.webp`;

            const card = document.createElement("div");
            card.classList.add("card");

            // Le titre hors hover en bas + overlay uniquement pour le texte
            card.innerHTML = `
              <div class="card-inner">
                <div class="card-img-wrapper">
                  <img src="${imagePath}" alt="${signe}" class="card-img" />
                  <div class="card-overlay">
                    <p>${message}</p>
                  </div>
                </div>
                <h3 class="card-title">${signe}</h3>
              </div>
            `;

            container.appendChild(card);
          }
        })
        .catch((error) => {
          console.error("Erreur :", error);
          container.innerHTML =
            "<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>";
        });
        //temps de chargement en ms
    }, 1000);
  });
});

const form = document.getElementById('contactForm');
const result = document.getElementById('result');

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Estetään lomakkeen lähetys
// Haetaan lomakkeen tiedot
    const channel =document.getElementById('channel').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
// muista lisätä puhelinnumeron kenttä HTML:ään, jotta se löytyy tästä skriptistä

    if (!channel || !name || !email || !phone || !message) {
        result.textContent = "Täytä kaikki kentät ennen lähettämistä.";
        result.style.color = "red";
        return;
    }
    result.textContent = "Lomake on tarkistettu onnistettu ja lähetetty!";
    result.textContent = `Valitsit yhteydenottokanavan: ${channel}. Nimi: ${name}, Sähköposti: ${email}, Puhelin: ${phone}, Viesti: ${message}`;
    result.style.color = "green";
    result.textContent += "<br>";
    result.textContent += " Kiitos yhteydenotostasi, palaamme asiaan mahdollisimman pian";
}

console.log({ channel, name, email, phone, message });
);


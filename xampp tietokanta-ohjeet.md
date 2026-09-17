1. TIETOKANNAN LUOMINEN XAMPPissa
Käynnistä XAMPP Control Panel ja varmista että Apache ja MySQL ovat päällä.
Avaa selain ja mene osoitteeseen http://localhost/phpmyadmin/.
Klikkaa vasemmasta reunasta New (uusi)

Anna teitokannalle nimeksi betha (pienillä kirjaimilla kaikki) ja
valitse merkistöksi utf8mb4_unicode_ (tukee ääkkösiä ja emojeja) klikkaa Create.

2. TARVITTAVAT TIETOKANTATAULUT (DATABASE SCHEMA)

A. Käyttäjät (users)

Säilyttää sekä tavallisten käyttäjien että ylläpitäjien eli (Admin) tiedot.
Käyttäjärooli määritetään role sarakkeella.


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Salattu salasana
    role ENUM('user', 'admin') DEFAULT 'user', -- Määrittää oikeudet
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


B. Ravintolat (restaurants)

Sivustolla olevat ravintolat, joita arvostellaan.


CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


C. Arvostelut (reviews)

Käyttäjien tekemät arviot. Tämä taulu yhdistää käyttäjän ja ravintolan (FOREIGN KEY).


CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    restaurant_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5), -- Arvosana 1-5
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);


D. Kuvat (images)

Kuvat kannattaa tallentaa omaan tauluunsa. Kuva voi liittyä joko suoraan ravintolaan tai tietyyn arvesteluun.


CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NULL, -- Jos kuva kuuluu arvosteluun
    restaurant_id INT NULL, -- Jos kuva on ravintolan yleiskuva
    image_path VARCHAR(255) NOT NULL, -- Tiedostopolku (esim. htdocs/uploads/kuva.jpg)
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);


3. KAIKKI TAULUT KERRALLA

Voit kopioida alla olevan koko koodilohkon ja liittää sen phpMyAdminin SQL-välilehdelle.
Varmista, että tietokanta betha on valittuna.


USE betha;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    restaurant_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NULL,
    restaurant_id INT NULL,
    image_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);


MUUTA HUOMIOITAVAA!
    Roolien hallinta: PHP-koodissa tai millä tahansa koodikielellä pitää aina tarkistaa käyttäjän rooli tietokannasta. Kun Admin kirjautuu sisään koodi lukee role = Admin ja sallii pääsyn MUOKKAA / POISTA painikkeisiin joita tavallinen käyttäjä ei näe.

    Kuvien tallennus: Älä tallenna kuvia suoraan tietokantaa (BLOB-muodossa). Se tekee tietokannasta hitaan ja raskaan. Tähän täytyy palata että kuinka tallennamme kuvat!
    
    Tietoturva (Salasanat ja SQL-injektiot): Salasanat pitää aina suojata. Älä koskaan tallenna nitä selväkielisenä. Käytä PHP:ssä password_hash() funktiota tallennukseen ja password_verify() -funktiota kirjautumisessa. Käytä tietokantakyselyissä Prepared Statements -tekniikkaa (esim PDO tai MySQL), jotta kukaan ei voi hakkeroida tietokantaa SQL-injektiolla.

    Viite-eheys (ON DELETE CASCADE): Yllä olevissa SQL-komennoissa käytetty ON DELETE CASCADE tarkoittaa sitä että jos esimerkiksi ravintola tai käyttäjä poistetaan, myös kaikki siihen liittyvät arvostelut ja kuivat poistuvat automaattisesti. Tämä pitää tietokannan siistinä.
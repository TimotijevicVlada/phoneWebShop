//Function for aside menu on phone screens
const aside = document.querySelector(".aside_area");
const bar = document.querySelector(".fa-bars");
bar.onclick = () => {
  aside.style.left = "0%";
}



if (document.readyState == "loading") {
  //Sa ovime izbegavamo situaciju da nam pucaju liseneri a nije nam ucitan DOM
  document.addEventListener("DOMContentLoaded", ucitavanje);
} else {
  ucitavanje(); //Inicijalizacija
}

function ucitavanje() {
  let dodajDugmici = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < dodajDugmici.length; i++) {
    dodajDugmici[i].addEventListener("click", dodajArtikal);
  }
  document.getElementsByClassName("btn-purchase")[0].addEventListener("click", naruci);
}

function naruci() {

  let kupi = document.getElementsByClassName("cart-items")[0];
  if (kupi.hasChildNodes()) {
    //Provera da li u korpi ima artikala
    document
      .getElementsByClassName("btn-purchase")[0]
      .addEventListener("click", (window.location = "kontaktforma.html")); //Ako ima artikala dopusti kretanje ka formi
  } else {
    alert("Niste odabrali artikle!"); //Ako nema artikala ispisi alert "Niste odabrali artikle!"
  }

  let cartItems = document.getElementsByClassName("cart-items")[0]; //Div koji je prazan i u koji treba da se ubace proizvodi
  while (cartItems.hasChildNodes()) {
    //Ako ovaj div ima childove...
    cartItems.removeChild(cartItems.firstChild);
  }
  azurirajCenu();
}

function dodajArtikal(event) {
  //Funkcija za dodavanje artikala u korpu
  let dugme = event.target; //Target isto kao opcija "this" samo sto sa target gadjamo bas taj element a sa this roditeljski
  let shopItem = dugme.parentElement;
  let naslov = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let cena = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let slika = shopItem.getElementsByClassName("shop-item-image")[0].src;
  dodajUKorpu(naslov, cena, slika); //Ove parametre treba da prosledimo u korpu
  azurirajCenu();
}

function dodajUKorpu(naslov, cena, slika) {
  //Opet navodimo parametre koje prosledjujemo u korpu
  let cartRow = document.createElement("div"); //cartRow Je red koji treba da se pojavi kada ubacimo u korpu (Za sada se on ne vidi)
  cartRow.classList.add("cart-row"); //Moramo da mu dodamo klasu kako bi ga formatirali
  let cartItems = document.querySelector(".cart-items"); //Dohvatamo cartItems
  let naslovProvera = cartItems.getElementsByClassName("cart-item-title"); //Provera sa IF da ne bi ubacivali dva puta isti element u korpu
  for (let i = 0; i < naslovProvera.length; i++) {
    if (naslovProvera[i].innerText == naslov) {
      //Ako je naslov jednako naslov onda ne ubacuj u korpu
      alert("Ovaj proizvod ste vec ubacili u korpu!");
      return; //Returnom izlazimo iz ove funkcije
    }
  }
  //Pravimo elemente koji ce da se ispisuju nakon klika na Dodaj u korpu
  let ispis = `<div class='cart-item cart-column' >     
                <img class='cart-item-image' src="${slika}">
                <span class="cart-item-title">${naslov}</span>
               </div>
                <span class="cart-price cart-column">${cena}</span>
               <div class="cart-quantity  cart-column">
                  <input type="number" class="cart-quantity-input" value="1" max="10">
                  <button class="btn btn-remove" type="button"><i class="fas fa-trash"></i></button>
               </div>                 
            `;
  cartRow.innerHTML = ispis;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", obrisiArtikal);
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", promeniKolicinu);
}

function obrisiArtikal(event) {
  let dugme = event.target;
  dugme.parentElement.parentElement.parentElement.remove(); //Brisemo ceo red tako da moramo da se vratimo 3 koraka u nazad
  azurirajCenu();
}

function azurirajCenu() {
  let cartItems = document.querySelector(".cart-items");
  let cartRows = cartItems.getElementsByClassName("cart-row");
  let suma = 0; //Treba nam brojac kako bi sabirali cenu
  for (let i = 0; i < cartRows.length; i++) {
    let cenaE = cartRows[i].querySelector(".cart-price").innerText;
    let kolicina = cartRows[i].querySelector(".cart-quantity-input").value;
    let cena = parseFloat(cenaE.replace("RSD", "")); //Posto je RSD zalepljeno za cenu moramo da izbrisemo kako bi mogli da radimo racunske operacije
    suma = suma + cena * kolicina; //Funkcija za sabiranje cene i kolicine proizvoda
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "RSD " + suma.toFixed(2); //Renderujemo RSD + dobijena suma
}

function promeniKolicinu(event) {
  let input = event.target; //Razlika izmedju target i this je ta sto sa this gadjamo roditeljski element
  if (isNaN(input.value) || input.value <= 0) {
    //a sa targetom bas taj element koji je u dogadjaju!
    input.value = 1; //Naravno sve ovo moze da se resi i sa this opcijom
  }
  azurirajCenu();
}


/*******************************************************************************************************************************/
/*REGULARNI IZRAZI*/

document.getElementById("naruci").addEventListener("click", function () {
  //Postavljamo lisener na NARUCI btn

  //IME I EMAIL REGEX
  let ime = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  let regexIme = /^[A-Z][a-z]{2,}/;
  let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let imeProvera = regexIme.test(ime);
  let emailProvera = emailRegex.test(email);

  let imeTrue = document.getElementById("nameTrue");
  let imeFalse = document.getElementById("nameFalse");
  let imeFalse1 = document.getElementById("name");

  if (imeProvera) {
    imeFalse.classList.add("hide");
    imeFalse.classList.remove("red-color");
    imeTrue.classList.remove("hide");
    imeFalse1.classList.remove("red");
  } else {
    imeTrue.classList.add("hide");
    imeFalse.classList.remove("hide");
    imeFalse.classList.add("red-color");
    imeFalse1.classList.add("red");
  }

  let emailTacno = document.getElementById("emailTrue");
  let emailNetacno = document.getElementById("emailFalse");
  let emailNetacno1 = document.getElementById("email");

  if (emailProvera) {
    emailNetacno.classList.add("hide");
    emailNetacno.classList.remove("red-color");
    emailNetacno1.classList.remove("red");
    emailTacno.classList.remove("hide");
  } else {
    emailTacno.classList.add("hide");
    emailNetacno.classList.remove("hide");
    emailNetacno.classList.add("red-color");
    emailNetacno1.classList.add("red");
  }


    //ADRESA REGEX
    let adresa = document.getElementById("subject").value;
    let regexAdresa = /^[a-zA-Z0-9\s,.'-]{3,}$/;      
    let adresaProvera = regexAdresa.test(adresa);

    let adresaTrue = document.getElementById("adressTrue");
    let adresaFalse = document.getElementById("adressFalse");
    let adresaFalse1 = document.getElementById("subject");

    if(adresaProvera) {
        adresaFalse.classList.add("hide");
        adresaFalse.classList.remove("red-color");
        adresaFalse1.classList.remove("red");
        adresaTrue.classList.remove("hide");
    }else {
        adresaTrue.classList.add("hide");
        adresaFalse.classList.remove("hide");
        adresaFalse.classList.add("red-color");
        adresaFalse1.classList.add("red");
    }


    //DRZAVA REGEX

    let drzava = document.getElementById("adress").value;
    let regexDrzava = /^[A-Z][a-z]{2,}/;
    let drzavaProvera = regexDrzava.test(drzava);

    let drzavaTrue = document.getElementById("drzavaTrue");
    let drzavaFalse = document.getElementById("drzavaFalse");
    let drzavaFalse1 = document.getElementById("adress");

    if(drzavaProvera) {
        drzavaFalse.classList.add("hide");
        drzavaFalse.classList.remove("red-color");
        drzavaFalse1.classList.remove("red");
        drzavaTrue.classList.remove("hide");
    }else {
        drzavaTrue.classList.add("hide");
        drzavaFalse.classList.remove("hide");
        drzavaFalse.classList.add("red-color");
        drzavaFalse1.classList.add("red");
    }

    
    //POSTANSKI BROJ REGEX 

    let postBroj = document.getElementById("post").value;
    let regexPost = /[0-9]{5}/;       
    let proveraPost = regexPost.test(postBroj);

    let postTrue = document.getElementById("postTrue");
    let postFalse = document.getElementById("postFalse");
    let postFalse1 = document.getElementById("post");

    if(proveraPost) {
        postFalse.classList.add("hide");
        postFalse.classList.remove("red-color");
        postFalse1.classList.remove("red");
        postTrue.classList.remove("hide");
    }else {
        postTrue.classList.add("hide");
        postFalse.classList.remove("hide");
        postFalse.classList.add("red-color");
        postFalse1.classList.add("red");
    }


    //PROVERA NACINA PLACANJA
    const kartica = document.getElementById("placanje1");
    const pouzecem = document.getElementById("placanje2");

    const karticaChk = kartica.checked;     //Vraca true ili false
    const pouzecemChk = pouzecem.checked;   

    let pKartica = document.getElementById("kartica");
    let pPouzece = document.getElementById("pouzece");
    let nista = document.getElementById("nista");

    if(karticaChk) {
        pPouzece.classList.add("hide");
        pKartica.classList.remove("hide");
        nista.classList.add("hide");
        nista.classList.remove("red-color");
    }else if (pouzecemChk) {
        pKartica.classList.add("hide");
        pPouzece.classList.remove("hide");
        nista.classList.add("hide");
        nista.classList.remove("red-color");
    }else {
        pKartica.classList.add("hide");
        pPouzece.classList.add("hide");
        nista.classList.remove("hide");
        nista.classList.add("red-color");
    } 
})

//Variavel para pegar que pagina está atualmente
const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")

//Usado para colocar classe active caso esteja na pagina, porem caso tenha members/2 ele não funcionara
// for (item of menuItens) {
//     if(currentPage == item.getAttribute("href")) { //Se o nome for igual adiciona a classe active
//         item.classList.add("active")
//     }
// }

// Método que funciona, usar o .includes o qual retorna true caso dentro da string tenha o item desejado
for (item of menuItens) {
    if(currentPage.includes(item.getAttribute("href"))) { //Se o nome for igual adiciona a classe active
        item.classList.add("active")
    }
}
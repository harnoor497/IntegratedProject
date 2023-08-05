//for the nav bar profile dropdown
    
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
  }


  
  document.addEventListener("DOMContentLoaded", function () {
    menuToggle();
});

function menuToggle() {

    // MENU HEADER
    const menuIcon = document.getElementById("JS_header__menu-icon");
    const menu = document.querySelector(".header__menu-options");
    menuIcon.addEventListener("click", () => {
        // Si el menú está oculto, mostrarlo
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            document.body.style.overflow = "auto"; // Ocultar el scroll vertical del body
        } else { // Si el menú está visible, ocultarlo
            menu.classList.add("active");
            document.body.style.overflow = "hidden"; // Habilitar el scroll vertical del body
        }
    });

    const closeIcon = document.getElementById("JS_header__menu-close");
    closeIcon.addEventListener("click", () => {
        // Si el menú está oculto, mostrarlo
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            document.body.style.overflow = "auto"; // Ocultar el scroll vertical del body
        } else { // Si el menú está visible, ocultarlo
            menu.classList.add("active");
            document.body.style.overflow = "hidden"; // Habilitar el scroll vertical del body
        }
    });

    // MENU MY ACCOUNT

    const menuAccount = document.getElementById("JS_account__label");
    const menuUl = document.querySelector(".account__ul");
    menuAccount.addEventListener("click", () => {
        // Si el menú está oculto, mostrarlo
        if (menuUl.classList.contains("active")) {
            menuUl.classList.remove("active");
            menuAccount.classList.remove("active");
        } else { // Si el menú está visible, ocultarlo
            menuUl.classList.add("active");
            menuAccount.classList.add("active");
        }
    });

}
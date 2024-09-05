document.addEventListener("DOMContentLoaded", function(){
    crearGaleria();
    navegacionFija();
    ubicacionCliente();
    scrollNav()
})

function navegacionFija(){
    const header = document.querySelector(".header")
    const festivalContenedor = document.querySelector(".festival-contenedor")


    document.addEventListener("scroll", function(){
        if(festivalContenedor.getBoundingClientRect().bottom < 1){
            header.classList.add("fixed")
        }else{
            header.classList.remove("fixed")
        }
    })
}


function ubicacionCliente(){
    document.addEventListener("scroll", function(){
        const sections = document.querySelectorAll("section")
        const navLinks = document.querySelectorAll(".navegacion-principal a")

        let actual = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3) ) {
                actual = section.id
            }
        });
        navLinks.forEach(link =>{
            link.classList.remove("active")
            if(link.getAttribute("href") === "#"  + actual){
                link.classList.add("active")
            }
        })
    })
    
}   




function crearGaleria(){
    const cantidadImagenes = 16
    const galeria = document.querySelector(".galeria-imagenes")

    for(let i=1 ; i <= cantidadImagenes ; i++){
        const imagen = document.createElement("IMG")
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt = 'imagen de la galeria'


        //Event handler (proceso de detectar y responder)
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i){
    const imagen = document.createElement("IMG")
    imagen.src = `src/img/gallery/full/${i}.jpg`
    imagen.alt = 'imagen de la galeria'
    //generar modal
    const modal = document.createElement("DIV")
    modal.classList.add('modal') 
    modal.onclick = cerrarModal

    //boton cerrar modal
    const cerrarModalBtn = document.createElement("BUTTON")
    cerrarModalBtn.textContent = "X"
    cerrarModalBtn.classList.add("btn-cerrar")
    cerrarModalBtn.onclick = cerrarModal

    
    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBtn)
    //agregar al html
    const body = document.querySelector('body')
    body.appendChild(modal)
    body.classList.add("overflow-hidden")
    
}

function cerrarModal(){
    const modal = document.querySelector(".modal")
    modal.classList.add("fade-out")

    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove("overflow-hidden")
    }, 400);
    
}

function scrollNav(){
    const navLinks = document.querySelectorAll(".navegacion-principal a")

    navLinks.forEach(link =>{
        link.addEventListener("click", e =>{
            e.preventDefault()

            const sectionScroll = e.target.getAttribute("href")
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: "smooth"})
        })
    })
}
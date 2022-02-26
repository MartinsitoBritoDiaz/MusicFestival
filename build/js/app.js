document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
};

function crearGaleria(){
    const galeria = document.querySelector('.gallery-img');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpeg" alt="Image Gallery"></img>
        `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpeg" alt="Image Gallery"></img>
    `;

    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){        
        const body = document.querySelector('body');
        body.classList.remove('fixed-body');
        overlay.remove();
    }

    //Boton para cerrar el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-close');
    cerrarModal.onclick = function(){
        
        const body = document.querySelector('body');
        body.classList.remove('fixed-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    //Anade el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fixed-body');
}
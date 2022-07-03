
//Obtener productos desde array
function ArrayProductosParaViews(array){
    for(const producto of array){
        producto.img="."+producto.img;
    }
    return array;
}

function arrayTipos(array,tipo){
    let arrayDelTipo=[];
    for(const producto of array){
        if(producto.tipo==tipo){
            arrayDelTipo.push(producto);
        }
    }
    return arrayDelTipo;
}

function cargarProductosDeArrayACards(array){
    let cardsDeProductos = document.getElementById("cardsDeProductos");
        for(const producto of array){
            let card = document.createElement("div");           
            card.innerHTML = `
            <div class="card text-center ${producto.tipo}" style="width: 18rem;"class="card text-center" style="width: 18rem;">
                <div class="card-body cartaProducto">
                    <div class="contenedorFotoProductoCard">
                        <img src="${producto.img}" id="" class="card-img-top img-fluid fotoProductoCard" alt="">
                    </div>
                    <h2 class="card-title tituloCardProducto">${producto.nombre}</h2>
                    <h5 class="card-subtitle mb-2 text-muted">${producto.caracteristicas}</h5>
                    <p class="card-text textoPrecioCardProducto">$${producto.precio}</p>
    
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button id="agregar${producto.idProducto}" type="button" onclick="agregarAlCarrito(${producto.idProducto})" class="btn btn-dark"> Agregar </button>
                    </div>
                </div>
            </div>      
            `;
            cardsDeProductos.appendChild(card);
        }
}

function mostrarCategoria(categoria){
    let todosLosProductos=document.getElementsByClassName("card text-center")
    let categoriaCorrecta= document.getElementsByClassName(categoria);
    for(const producto of todosLosProductos){
       producto.classList.add("productoEscondido");
       
    }
    for(const producto of categoriaCorrecta){
        producto.classList.remove("productoEscondido");
        
    }
}

let busquedaCategoriaForm=document.getElementById("busquedaCategoria");
busquedaCategoriaForm.addEventListener("submit",busquedaCategoria);

function busquedaCategoria(evento){
    if(isNaN(campoDeBusqueda.value)&& campoDeBusqueda.value!=""){
        evento.preventDefault();
        let categoriaBusqueda=campoDeBusqueda.value;
        mostrarCategoria(categoriaBusqueda);
    } if(!isNaN(campoDeBusqueda.value)){
        campoDeBusqueda.oninput=()=>{
            document.campoDeBusqueda.style.color="red";
        }
    }
}

//side bar 

$(document).ready(function(){
    $('.sub-btn').click(function(){
      $(this).next('.sub-menu').slideToggle();
      $(this).find('.dropdown').toggleClass('rotate');
    });

    $('.menu-btn').click(function(){
      $('.side-bar').addClass('active');
      $('.menu-btn').css("visibility", "hidden");
    });

    $('.close-btn').click(function(){
      $('.side-bar').removeClass('active');
      $('.menu-btn').css("visibility", "visible");
    });
  });
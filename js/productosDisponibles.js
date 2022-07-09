//Busca un usuario activo, y luego obtiene el carrito de compras
let usuarioActivo=JSON.parse(sessionStorage.getItem("usuarioActivo"))
let carritoCompras;
let productosDisponibles=[];

obtenerProductosAPI();
obtenerCarrito();

// Obtener productos desde archivo JSON local
function obtenerProductosAPI(){
    const URLGET="js/productos.json"
    fetch(URLGET)
        .then((resultado) => resultado.json())
        .then((info)=>{
            productosDisponibles=info.productosDisponibles;
            cargarProductosDeArrayACards(productosDisponibles)
        })    
}


// si el usuario no esta logueado, sigue permitiendo la ejecucion, para mostrar productos
function obtenerCarrito(){
    carritoCompras=usuarioActivo?.carritoCompras; 
}

function confirmacionBorrarDelCarro(idProductoPorBorrar){
    Swal.fire({
        title: '¿Estas seguro?',
        showCancelButton: true,
        confirmButtonColor: '#01a179',
        cancelButtonColor: '#232323', 
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
            borrarDelCarrito(idProductoPorBorrar);
        }
      })
}

function borrarDelCarrito(idProductoPorBorrar){
    let productoPorBorrar;
    for(const producto of productosDisponibles){
        if(producto.idProducto==idProductoPorBorrar){
            productoPorBorrar=producto;
        }
    }
    let indexProductoPorBorrar= carritoCompras.findIndex(producto =>producto.idProducto==idProductoPorBorrar);
    let elementoBorrado= carritoCompras.splice(indexProductoPorBorrar,1);
    actualizarEstadoUsuarioSessionS(); 
    toastBorradoCarro(elementoBorrado); 
    let filaABorrar= document.getElementById(`fila${idProductoPorBorrar}`);
    document.getElementById("tBodyCarrito").removeChild(filaABorrar);
    actualizarDatosCarrito();
}
function agregarNuevoProducto(id){
    let productoPorAgregar;
    for(const producto of productosDisponibles){
        if(producto.idProducto==id){
            productoPorAgregar=producto;
        }
    }
    usuarioActivo.carritoCompras.push(productoPorAgregar)
    actualizarEstadoUsuarioSessionS()
    toastAgregarCarro(productoPorAgregar);

}

function agregarOtraUnidadAlCarro(id){
    for(const producto of usuarioActivo.carritoCompras){
        if(producto.idProducto==id){
            producto.cantidad++;
            toastAgregarCarro(producto);
            actualizarEstadoUsuarioSessionS();
            actualizarDatosCarrito();
            //para trabajar sobre el carrito, con boton +1
            document.getElementById("cantidadProducto"+id).innerHTML=producto.cantidad;
            document.getElementById("precioTotal"+id).innerHTML=producto.cantidad*producto.precio;            
        }
    }
}

function quitarUnaUnidadDelCarro(id){
    //para trabajar sobre el carrito, con boton -1
    for(const producto of usuarioActivo.carritoCompras){
        if(producto.idProducto==id){
            if(producto.cantidad>1){
                producto.cantidad--;
                document.getElementById("cantidadProducto"+id).innerHTML=producto.cantidad;
                document.getElementById("precioTotal"+id).innerHTML=producto.cantidad*producto.precio;
                actualizarEstadoUsuarioSessionS();
                actualizarDatosCarrito();
            } if(producto.cantidad==1){
                confirmacionBorrarDelCarro(id);
            }
        }
    }

}

function agregarAlCarrito(idProductoPorAgregar){
    let productoEnCarro=false;
    if(usuarioActivo){
        for(const producto of usuarioActivo.carritoCompras){
            //si esta el producto
            if(producto.idProducto==idProductoPorAgregar){
                productoEnCarro=true;
                agregarOtraUnidadAlCarro(idProductoPorAgregar);
            }
        }
        //si no esta
        if(productoEnCarro==false){
            agregarNuevoProducto(idProductoPorAgregar);
        }
    } else {
        pedirLogin();
    }
}

function actualizarEstadoUsuarioSessionS(){
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
}

function pedirLogin(){
    vex.dialog.prompt({
        message: 'Ingresa Usuario y contraseña para realizar una compra',
        placeholder: 'Usuario',
        callback: function (usuarioIngresado) {
            let usuarioRegistradoEnStorage= JSON.parse(localStorage.getItem(usuarioIngresado));
            if(usuarioRegistradoEnStorage==null){
                //alert("Por favor coloca un usuario valido");
                vex.dialog.confirm({
                    message: '¿No tenes cuenta? Registrate!',
                    callback: function (value) {
                        if(value){
                            window.location="./views/nuevoUsuario.html";
                        } 
                    }
                })
            }else {
                vex.dialog.prompt({
                    message: 'Por favor, ingresa la contraseña',
                    placeholder: 'Contraseña',
                    callback: function (value) {
                        if(value==usuarioRegistradoEnStorage.contraseña){
                            alertaLoginExitoso();
                            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioRegistradoEnStorage));
                            }
                        }
                    })
            }
        }
    })
}


function toastAgregarCarro(productoPorAgregar){
    Toastify({
        text: `${productoPorAgregar.tipo} ${productoPorAgregar.nombre} ¡Agregado al carrito!`,
        duration: 5000,
        destination: "views/carrito.html",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#01a179",
        },
      }).showToast();
}

function toastBorradoCarro(elementoBorrado){
    Toastify({
        text: `${elementoBorrado.tipo} ${elementoBorrado.nombre} ¡Ha sido eliminado del carrito!`,
        duration: 5000,
        destination: "carrito.html",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#01a179",
        },
      }).showToast();

}

function alertaLoginExitoso(){
    let timerInterval
    Swal.fire({
    title: 'Login Exitoso',
    html: '',
    timer: 800,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
        window.location="./index.html";
    }
    })
}
let precioCarrito; 
let leyendaCarroVacio=document.getElementById("carritoVacio");

carritoCompras.length==0 && mostrarCarroVacio();
carritoCompras.length>0 && mostrarCarroConProductos();

function calcularPrecioCarrito(){
    precioCarrito=0;
    for (const prod of carritoCompras){
        precioCarrito+=(prod.precio*prod.cantidad);  
    }
    return precioCarrito;
}

function mostrarCarroVacio(){
   leyendaCarroVacio.classList.remove("productoEscondido");
}

function mostrarCarroConProductos(){
    leyendaCarroVacio.classList.add("productoEscondido");
    PagoCarroVacio.classList.remove("productoEscondido");
    mostrarCarritoTabla();
}

function mostrarCarritoTabla(){
    let usuarioActivo=JSON.parse(sessionStorage.getItem("usuarioActivo"))
    let carritoCompras=usuarioActivo.carritoCompras;
    
    if(carritoCompras.length>0){
        let tablaCarrito = document.createElement("table");
        tablaCarrito.className="table"
        tablaCarrito.id="tablaCarrito";
        let tTiulo=document.createElement("thead");
        let filaTitulo=document.createElement("tr");
    //Estructura tabla carrito
        filaTitulo.innerHTML=`
        <th colspan="2">Producto</th>
        <th class="txtCenter">Cantidad</th>
        <th class="txtCenter">Precio</th>
        <th class="txtCenter">Precio Total</th>
        <th class="txtCenter">Acciones</th>`;
        tTiulo.appendChild(filaTitulo);
        tablaCarrito.appendChild(tTiulo);
    
        let tBody = document.createElement("tBody");
        tBody.id="tBodyCarrito";
   //Contenido carrito
        for(const producto of carritoCompras){
            precioCarrito+=parseInt(producto.precio);
            let fila=document.createElement("tr");
            fila.id=`fila${producto.idProducto}`;
            fila.innerHTML=`
                        <td colspan="2">${producto.tipo} ${producto.nombre}</td>
                        <td class="txtCenter" id="cantidadProducto${producto.idProducto}">${producto.cantidad}</td>
                        <td class="txtCenter">$ ${+producto.precio}</td>
                        <td class="txtCenter" id="precioTotal${producto.idProducto}">$ ${+producto.precio*producto.cantidad}</td>
                        <td class="botonesAccion">
                            <button type="button" onclick="agregarOtraUnidadAlCarro(${producto.idProducto})" class="btn btn-dark btnAgregar"> + </button>
                            <button type="button" onclick="quitarUnaUnidadDelCarro(${producto.idProducto})" class="btn btn-dark btnBorrar"> -  </button>
                            <button type="button" onclick="confirmacionBorrarDelCarro(${producto.idProducto})" class="btn btn-dark btnEliminar"> Eliminar </button>

                        </td>`;
                        tBody.appendChild(fila);
        }
       
            let ultimaFila=document.createElement("tr");
            ultimaFila.innerHTML=`
                        <td colspan="3" class="sumaTablaPrecio">PRECIO TOTAL</td>
                        <td colspan="2" class="sumaTabla" id="sumaTotalCarrito">$ ${calcularPrecioCarrito()}</td>
                        <td colspan="2" class="sumaTablaPrecio"></td>`;
                        tBody.appendChild(ultimaFila);
    
        tablaCarrito.appendChild(tBody);
        let dondeVaTabla=document.getElementById("agregarTablaCarrito");
        dondeVaTabla.appendChild(tablaCarrito);

    } 
}

//Alerta compra final
function finalizarCompra(){
    Swal.fire({
        title: 'Gracias por su compra',
        text: "Pronto recibirá su pedido",
        icon: 'success',
        style: {
            background: "#01a179",
          },
        showCancelButton: true,
        confirmButtonColor: '#02e2aa',
        cancelButtonColor: '#000000',
        confirmButtonText: 'Ok'
      })
}
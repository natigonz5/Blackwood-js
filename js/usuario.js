//Class de usuario registrado
class Usuario{
    constructor (nombre,apellido,mail,contraseña){
        this.nombre=nombre;
        this.apellido=apellido;
        this.mail=mail;
        this.contraseña=contraseña;
        this.carritoCompras=[];
        this.precioCarrito=0;
    }   
}
// formulario registro
formularioRegistroUsuario.addEventListener("submit",validarFormulario);
let campoNombre =document.getElementById("nombreU");
let campoApellido =document.getElementById("apellidoU");
let campoMail =document.getElementById("mailU");
let campoContraseña =document.getElementById("contraseña");
let campoContraseña2 =document.getElementById("contraseña2");

campoNombre.oninput=()=>!isNaN(campoNombre.value)? campoNombre.style.color="red" :campoNombre.style.color="black";
campoApellido.oninput=()=>!isNaN(campoApellido.value)? campoApellido.style.color="red" : campoApellido.style.color="black";
campoMail.oninput=()=>!isNaN(campoMail.value)? campoMail.style.color="red" : campoMail.style.color="black";

function validarFormulario(evento){
    let u;
    evento.preventDefault();
    if(campoNombre.value==""||campoApellido.value==""||campoMail.value==""||campoContraseña.value==""||campoContraseña2.value==""){
        alert("todos los campos son obligatorios!")
    }else if(campoContraseña.value==campoContraseña2.value){
        u= new Usuario (campoNombre.value,campoApellido.value,campoMail.value,campoContraseña.value);
        localStorage.setItem(campoMail.value, JSON.stringify(u));
        alert("¡Usuario creado correctamente! \n Bienvenido "+u.nombre)
        window.location="./login.html";  
    } else{
        alert("¡Contraseñas no coinciden!")
    }
}


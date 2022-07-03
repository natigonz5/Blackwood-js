// chequeo de usuario logueado
let nombreUsarioActivo=document.getElementById("nombreUsarioActivo");
let usuarioRegistrado=sessionStorage.getItem("usuarioActivo");
if(usuarioRegistrado){
    nombreUsarioActivo.setAttribute("id","nombreUsuarioRegistrado")
    
    let nombreUsuario=JSON.parse(usuarioRegistrado).nombre
    nombreUsarioActivo.innerHTML=`${nombreUsuario.toUpperCase()}`;
}
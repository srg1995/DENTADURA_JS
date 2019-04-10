var listaDientes = [];
var colorDiente = [];
var idImagen; 
var idTexto;
var img;

$(document).ready(function () {
    desplegarMenu();
    guardarDatos();
    pintarDientes();
    cambiarChecks();
    funcionalidadFooter();
});

function desplegarMenu(){
    $("#ico-menu-lateral").on("click",function(){
        $("#menu-desplegable").animate({
            left: '10%',
            width: '90%'
          });
          $("#menu-desplegable").css("display","block");
          $("#capa-opaca").animate({
            left:'0',
            width: '100%'
          });
          $("#capa-opaca").css("display","block");
          $("body").css("overflow","hidden");
    });

    $("#ico-back-inversa").on("click",function(){
        $("#menu-desplegable").width("0")
        $("#menu-desplegable").css("left","768px")
        $("#menu-desplegable").hide();
        $("#capa-opaca").hide();
        $("body").css("overflow","auto");
    });

}

function guardarDatos(){
    //Cojo todos los path que empiezan por d(los dientes) y los guardo en un array, para tener almacenado el color por defecto
    $("path").each(function (indice, elemento){
        if($(elemento).attr("id").charAt(0) === 'd'){
            listaDientes.push({id:$(elemento).attr("id"), color:$(elemento).attr("fill")});
        }
    });
}


function pintarDientes(){
    //agregrar en evento onclick a todos los dientes
    listaDientes.forEach(function(diente, indice) {
        //concateno el id de cada diente
        var idDiente = "#"+diente.id;
        $(idDiente).css("cursor","pointer");
        var idTextoDiente = "#"+idDiente.substr(2);
        $(idDiente).on("click", function(){
            //(if)si el color no es azul pinto el diente azul
            //(else) si es azul pinto el color anterior accediendo a su ubicacion en el array
            //Los numeros de los dientes ya pulsados, los dejo en azul para saber que se han pulsado minimo una vez
            if($(idDiente).attr("fill") !== "#0066AC"){
                $(idDiente).attr("fill","#0066AC");
                $(idTextoDiente).attr("fill","#0066AC");
            }else{
                $(idDiente).attr("fill", diente.color);
            }
        });

    });
}

function cambiarChecks(){
    //agregar el evento click a los circulos
    $(".circulo i").on("click",function(){
        //(if)si al hacer click tengo la clase de circulo relleno, la elimino y añado la de circulo vacio
        //(else)si al hacer click no tengo la clase de circulo relleno,elimino la clase de circulo vacio y añado la clase de circulo lleno
        if($(this).attr("class") === "fas fa-check-circle"){
            $(this).removeClass("fas fa-check-circle");
            $(this).addClass("far fa-circle");
        }
        else{
            $(this).removeClass("far fa-circle");
            $(this).addClass("fas fa-check-circle");
        }
    });
}


function funcionalidadFooter(){
    //agregar evento click a los tres elementos
    $("#f-historial img").on("click",function(){
        pintarElementoFooter(this);
    });
    $("#f-odontograma img").on("click",function(){
        pintarElementoFooter(this);
    });
    $("#f-documentacion img").on("click",function(){
        pintarElementoFooter(this);
    });

    $( "#f-historial" ).mouseover(function() {
        sobreElemento("historial")
    });

    $( "#f-historial" ).mouseleave(function() {
        fueraElemento("historial")
    });

    $( "#f-odontograma" ).mouseover(function() {
        sobreElemento("odontograma")
    });

    $( "#f-odontograma" ).mouseleave(function() {
        fueraElemento("odontograma")
    });

    $( "#f-documentacion" ).mouseover(function() {
        sobreElemento("documentacion")
    });

    $( "#f-documentacion" ).mouseleave(function() {
        fueraElemento("documentacion")
    });

}

function sobreElemento(nombre){
        //cuando se hace hover cambio los elementos a azul
        idImagen = "#"+nombre; 
        idTexto = "#txt-"+nombre
        img = $(idImagen).attr("data-nombre")+"Active.svg"; 
        $(idImagen).attr("src", img);
        $(idTexto).css("color" , "rgb(0, 102, 172)")
}

function fueraElemento(nombre){
        //cuando dejo de estar encima vuelve a su estado actual(sea actvo o no activo)
        idImagen = "#"+nombre; 
        idTexto = "#txt-"+nombre;
        img = $(idImagen).attr("data-nombre")+".svg"; 
        if(!$(idImagen).hasClass("activo")){
            $(idImagen).attr("src", img);
            $(idTexto).css("color" , "rgb(0, 0, 0)")
        }
        
}

function pintarElementoFooter(el){
    //para cambiar el color de los elementos del footer creo una etiqueta data que contienen el srcNuevo
    //aprovechando el identificador de la imagen puedo acceder al del texto mediante una concatenacion
    var srcActual = $(el).attr("src");
    var srcNuevo = $(el).attr("data-nombre");
    var identificadorTexto = "#txt-" + $(el).attr("id");
    //(if)si el srcActual contiene la palabra Active y ademas tiene la clase activo 
    //    modifico el srcNuevo haciendo una concatenacion que no incluya el Active, ademas cambio el color del texto
    //(else)si no contiene Active concateno al srcNuevo la palabra active, y ademas cambio el color.
    if(srcActual.indexOf("Active") !== -1 && $(el).hasClass("activo")){
        $(el).attr("src", srcNuevo+".svg");
        $(identificadorTexto).css("color" , "rgb(0, 0, 0)");
        $(el).removeClass("activo")
    }
    else{
        $(el).addClass("activo")
        $(el).attr("src", srcNuevo+"Active.svg");
        $(identificadorTexto).css("color" , "rgb(0, 102, 172)")
    }
}



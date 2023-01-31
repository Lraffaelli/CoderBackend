$(document).ready(function(){

const URLjson='./productos.json'


function imprimirProductos(producto){
        const listaCard = document.querySelector("#lista-productos");
  
                const contentDiv = document.createElement("div");
                contentDiv.id = "cardProduct"
                contentDiv.className = "card col-md-3";
        
                const imagen = document.createElement("img");
                imagen.className = "card-img-top";
                imagen.alt = `Cake${producto.id}`;
                imagen.src = `${producto.foto}`;
        
                const textDiv = document.createElement("div");
                textDiv.className = "card-body";
        
                const titulo = document.createElement("h5");
                titulo.className = "card-title";
                titulo.textContent = `${producto.nombre}`;
        
                const textDescripcion = document.createElement("p");
                textDescripcion.className = "card-text";
                textDescripcion.textContent = `${producto.descripcion}`;
        
                const textPrecio = document.createElement("p");
                textPrecio.className = "precio";
                textPrecio.textContent = 'Precio:$' ;
                const spanPrecio = document.createElement('span');
                spanPrecio.textContent = `${producto.precio}`
        
                const button = document.createElement("a");
                
                button.className = "btn btn-primary agregar-carrito";
                button.setAttribute('data-id',`${producto.id}`) 
                button.textContent = "Agregar al Carrito";
        
                listaCard.appendChild(contentDiv);
                contentDiv.appendChild(imagen);
                contentDiv.appendChild(textDiv);
                textDiv.appendChild(titulo);
                textDiv.appendChild(textDescripcion);
                textDiv.appendChild(textPrecio);
                textPrecio.appendChild(spanPrecio);
                textDiv.appendChild(button);
    }

 //Metodo AJAX
 $.ajax({
    type: "get",
    url: URLjson,
    data: "datos",       
    success: function (response) {
        
        let datos = response;
        for(const producto of datos){
            imprimirProductos(producto)
        }
    }
});

})
//Recupera películas de localStorage o inicializa un array vacío
let movies = JSON.parse(localStorage.getItem('movies')) || [];

let cuenta = JSON.parse(localStorage.getItem('cuenta'));

var total = 0;
if(cuenta > 0) {
    total = cuenta;
} else {
    total = 0;
}

const movieTableBody = document.querySelector('#movieTable tbody'); //la tabla que tenemos en html
let editingIndex = null;

//Función para cargar las películas en la tabla
function renderMovies() {
    movieTableBody.innerHTML = ''; //limpia la tabla
    movies.forEach((movie, index) => {  //recorre el array de libros
        const row = document.createElement('tr'); //se crea un nuevo renglón en la tabla y en cada una de las 4 celdas los datos de los libros
        row.innerHTML = `
            <td>${movie.producto}</td>  
            <td>${movie.precio}</td>
            <td>
                <button onclick="eliminar(${index})"><img src="/media/delete.png" width="30px"></button>
            </td>
        `;
        movieTableBody.appendChild(row); //se agrega el renglón que creamos con datos a la tabla
    });
    var tam = movies.length;
    document.getElementById("total").innerHTML = "Productos totales: " + tam;
    document.getElementById("pagar").innerHTML = "Total: $" + total.toFixed(2);
}

function añadir(producto, precio) {
    total += precio;
    localStorage.setItem('cuenta',total);

    const newMovie = {producto, precio};

    movies.push(newMovie);

    localStorage.setItem('movies', JSON.stringify(movies));

    renderMovies();
}

function eliminar(index) {
    movies.splice(index,1); //tabla
    localStorage.setItem('movies', JSON.stringify(movies));
    localStorage.removeItem(JSON.stringify(movies[index])); //borra localstorage
    renderMovies();
    
}

//Render inicial, llama a la función anterior
renderMovies();
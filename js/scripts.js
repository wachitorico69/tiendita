//Recupera películas de localStorage o inicializa un array vacío
let movies = JSON.parse(localStorage.getItem('movies')) || [];

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
}

function añadir(producto, precio) {
    const newMovie =  {producto, precio};

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
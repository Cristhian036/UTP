const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

const datobusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',

}


//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);

    llenarSelect()
});

marca.addEventListener('change', e => {
    datobusqueda.marca = e.target.value;

    filtrarAutos();
});

year.addEventListener('change', e => {
    datobusqueda.year = parseInt(e.target.value);

    filtrarAutos();
});

minimo.addEventListener('change', e => {
    datobusqueda.minimo = e.target.value;

    filtrarAutos();
});

maximo.addEventListener('change', e => {
    datobusqueda.maximo = e.target.value;

    filtrarAutos();
});

puertas.addEventListener('change', e => {
    datobusqueda.puertas = parseInt(e.target.value);

    filtrarAutos();
});

transmision.addEventListener('change', e => {
    datobusqueda.transmision = e.target.value;

    filtrarAutos();
});

color.addEventListener('change', e => {
    datobusqueda.color = e.target.value;

    filtrarAutos();
    console.log(datobusqueda);
});

//FUNCTIONS

function mostrarAutos(autos) {
    limpiarHTML();

    autos.forEach(auto => {

        const {marca, modelo,year, puertas,transmision,precio,color} = auto;
        const autoHTML = document.createElement('p');
        resultado.appendChild(autoHTML);

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        resultado.appendChild(autoHTML)
    });
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);    
    }
}

function llenarSelect() {
        for (let i = maxYear; i >= minYear; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

//FUNCIONES DE FILTRO

function filtrarAutos() {
    const resultado = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarPuertas)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo)
        .filter(filtrarPuertas)
        .filter(filtrarTransmision)
        .filter(filtrarColor);

        if(resultado.length) {
            mostrarAutos(resultado);
        }else {
            noResultado();
        }
        console.log(resultado);
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados encontrados, Intente nuevamente';
    resultado.appendChild(noResultado);
}


//FUNCIONES CAMPOS 

function filtrarMarca(auto) {
    const {marca} = datobusqueda;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const {year} = datobusqueda;
    if (year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const {minimo} = datobusqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datobusqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datobusqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datobusqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datobusqueda;
    if (color) {
        return auto.color === color;
    }
    return auto;
}
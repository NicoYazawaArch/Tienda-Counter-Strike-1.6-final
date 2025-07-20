const productos = [
    { id: 'ak47', nombre: 'AK-47', imagen: 'img/armas/ak47.png', precio: 2700, descripcion: 'Rifle automático, 7.62mm, usado por Terroristas.' },
{ id: 'awp', nombre: 'AWP', imagen: 'img/armas/AWP.jpg', precio: 4750, descripcion: 'Rifle de francotirador, .338 Magnum, usado por ambos equipos.' },
{ id: 'glock', nombre: 'Glock', imagen: 'img/armas/glock.webp', precio: 400, descripcion: 'Pistola, 9mm, usada por Terroristas.' },
{ id: 'deagle', nombre: 'Desert Eagle', imagen: 'img/armas/deagle.webp', precio: 650, descripcion: 'Pistola, .50 AE, usada por ambos equipos.' },
{ id: 'mac10', nombre: 'MAC-10', imagen: 'img/armas/mac10.jpg', precio: 1400, descripcion: 'Subfusil, .45 ACP, usado por Terroristas.' },
{ id: 'ump45', nombre: 'UMP-45', imagen: 'img/armas/UMP45.JPG', precio: 1700, descripcion: 'Subfusil, .45 ACP, usado por ambos equipos.' },
{ id: 'm249', nombre: 'M249', imagen: 'img/armas/M249.jpg', precio: 5750, descripcion: 'Ametralladora, 5.56mm, usado por ambos equipos.' },
{ id: 'xm1014', nombre: 'XM1014', imagen: 'img/armas/XM1014.webp', precio: 3000, descripcion: 'Escopeta automática, cartuchos calibre 12, usada por Antiterroristas.' },
{ id: 'famas', nombre: 'FAMAS', imagen: 'img/armas/FAMAS (Clarion 5.56).jpg', precio: 2250, descripcion: 'Rifle automático, 5.56mm, usado por Antiterroristas.' },
{ id: 'sg552', nombre: 'SG552', imagen: 'img/armas/SG552 (Krieg 552 Commando).jpg', precio: 3500, descripcion: 'Rifle de asalto, 5.56mm, usado por Terroristas.' },
{ id: 'p228', nombre: 'P228', imagen: 'img/armas/P228 (SIG-Sauer P228).webp', precio: 600, descripcion: 'Pistola, 9mm, usada por ambos equipos.' },
{ id: 'five-seven', nombre: 'Five-Seven', imagen: 'img/armas/Five-Seven (ES Five-Seven).webp', precio: 750, descripcion: 'Pistola, 5.7mm, usada por Antiterroristas.' },
{ id: 'dualberettas', nombre: 'Dual Berettas', imagen: 'img/armas/Dual Berettas (96G Elite).webp', precio: 800, descripcion: 'Pistola, 9mm, usada por Terroristas.' },
{ id: 'tmp', nombre: 'TMP', imagen: 'img/armas/TMP (Steyr Tactical Machine Pistol).jpg', precio: 1250, descripcion: 'Subfusil, 9mm, usado por Antiterroristas.' },
{ id: 'usp', nombre: 'USP', imagen: 'img/armas/USP (.45 Tactical).webp', precio: 500, descripcion: 'Pistola, .45 ACP, usada por Antiterroristas.' },
{ id: 'm4a1', nombre: 'M4A1', imagen: 'img/armas/M4A1 (Maverick M4A1 Carbine).jpg', precio: 3100, descripcion: 'Rifle automático, 5.56mm, usado por Antiterroristas.' },
{ id: 'aug', nombre: 'AUG', imagen: 'img/armas/AUG.jpg', precio: 3500, descripcion: 'Rifle de asalto, 5.56mm, usado por Antiterroristas.' },
{ id: 'p90', nombre: 'P90', imagen: 'img/armas/P90 (FN P90).png', precio: 2350, descripcion: 'Subfusil, 5.7mm, usado por ambos equipos.' },
{ id: 'scout', nombre: 'Scout', imagen: 'img/armas/Scout.jpg', precio: 2750, descripcion: 'Rifle de francotirador, 5.56mm, usado por ambos equipos.' },
];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('productos-container');
    productos.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 col-lg-3';
        col.innerHTML = `
        <div class="producto card bg-secondary text-white">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="producto-contenido card-body">
        <h4 class="card-title">${producto.nombre}</h4>
        <span>Precio: $${producto.precio}</span>
        <p><small>${producto.descripcion}</small></p>
        <button class="btn-comprar btn btn-warning" data-id="${producto.id}">Comprar</button>
        </div>
        </div>
        `;
        contenedor.appendChild(col);
    });

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('contador-carrito');
    const modal = new bootstrap.Modal(document.getElementById('modal-carrito'));
    const lista = document.getElementById('lista-carrito');
    const totalEl = document.getElementById('total-carrito');

    function actualizarVistaCarrito() {
        lista.innerHTML = '';
        let total = 0;
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between bg-dark text-white';
            li.innerHTML = `
            ${item.nombre} x${item.cantidad}
            <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            `;
            lista.appendChild(li);
        });
        contador.textContent = carrito.reduce((sum, i) => sum + i.cantidad, 0);
        totalEl.textContent = total.toFixed(2);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    document.querySelector('#productos-container').addEventListener('click', e => {
        if (e.target.classList.contains('btn-comprar')) {
            const id = e.target.dataset.id;
            const prod = productos.find(p => p.id === id);
            const enCarrito = carrito.find(c => c.id === id);
            if (enCarrito) enCarrito.cantidad++;
            else carrito.push({ ...prod, cantidad: 1 });
            actualizarVistaCarrito();
        }
    });

    document.getElementById('abrir-carrito').addEventListener('click', () => {
        actualizarVistaCarrito();
        modal.show();
    });

    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        carrito = [];
        actualizarVistaCarrito();
    });

    document.getElementById('finalizar-compra').addEventListener('click', () => {
        if (carrito.length === 0) return;
        alert('Compra realizada con éxito! Total: $' + totalEl.textContent);
        carrito = [];
        actualizarVistaCarrito();
        modal.hide();
    });

    // Validación formulario
    document.querySelector('form').addEventListener('submit', e => {
        // ya implementado con Formspree
    });
});

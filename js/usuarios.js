fetch('./js/clientes.json')
    .then(resp => resp.json())
    .then((data) => {
        data.forEach((usuarios) => {
            const lista = `
            <div class="card" style="width: 18rem;">
                <img src="${usuarios.img}" class="card-img-top clientes" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${usuarios.name}</h5>
                    <h5 class="card-title">${usuarios.email}</h5>
                    <p class="card-text">${usuarios.comentario}</p>
                </div>
            </div>
            `

            const cards = document.getElementById(`list__clientes`);
            cards.innerHTML += lista

        })
    })
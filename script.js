const placesList = document.getElementById('places-list');
const placeInput = document.getElementById('place-input');
const addPlaceForm = document.getElementById('add-place-form');

// Carregar lugares do localStorage
let places = JSON.parse(localStorage.getItem('places')) || [];

// Função para renderizar os lugares
function renderPlaces() {
    placesList.innerHTML = '';
    places.forEach((place, index) => {
        const li = document.createElement('li');
        
        // Nome do lugar
        const placeName = document.createElement('span');
        placeName.textContent = place.name;

        // Estrelas de classificação
        const stars = document.createElement('div');
        stars.classList.add('stars');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.innerHTML = '★';
            if (i <= place.rating) {
                star.classList.add('selected');
            }
            star.addEventListener('click', () => {
                updateRating(index, i);
            });
            stars.appendChild(star);
        }

        // Botão de remover
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            removePlace(index);
        });

        li.appendChild(placeName);
        li.appendChild(stars);
        li.appendChild(removeBtn);
        placesList.appendChild(li);
    });
}

// Função para adicionar um novo lugar
addPlaceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const placeName = placeInput.value;
    places.push({ name: placeName, rating: 0 });
    placeInput.value = '';
    saveAndRender();
});

// Função para atualizar a classificação por estrelas
function updateRating(index, rating) {
    places[index].rating = rating;
    saveAndRender();
}

// Função para remover um lugar
function removePlace(index) {
    places.splice(index, 1);
    saveAndRender();
}

// Função para salvar os dados no localStorage e renderizar a lista
function saveAndRender() {
    localStorage.setItem('places', JSON.stringify(places));
    renderPlaces();
}

// Inicializar a renderização
renderPlaces();

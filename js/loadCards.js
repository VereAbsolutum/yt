
function loadCards(cardsData) {
    var grid = document.getElementById('sortableGrid');

    grid.innerHTML = '';
    var fragment = document.createDocumentFragment();

    cardsData.forEach((data, index) => {
        var cardContainer = document.createElement('div');
        cardContainer.classList.add('col-sm-4', 'sortable-item', 'mb-3');

        var card = cardFactory({
            title: data.title,
            text: data.text,
            src: data.src,
            id: index
        });

        cardContainer.innerHTML = card;

        fragment.appendChild(cardContainer);
    });

    grid.appendChild(fragment);
}
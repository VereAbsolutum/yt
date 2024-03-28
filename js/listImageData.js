
function listImageData (ev) {
    var imageFiles = document.getElementById("image-input").files;

    var cardData = [];

    [...imageFiles].forEach((src, idx) => {

        var imageSrc = URL.createObjectURL(src);
        var data =  { src: imageSrc };
        cardData.push(data);

    });

    loadCards(cardData);
}
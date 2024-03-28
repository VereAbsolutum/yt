function zipImages(data) {
    var zip = new JSZip();
    var type = data.type;
    var promises = [];

    if (type !== 'image' && type !== 'text') {
        return;
    }

    if (type === 'image') {
        var imageData = data.data;

        imageData.forEach(function (element) {
            var imageSrc = element.imageSrc;
            console.log('imageSrc',imageSrc);
            var filename = element.filename;

            var promise = fetch(imageSrc)
                .then(response => response.blob())
                .then(blob => {
                    // Adicione a imagem ao arquivo ZIP
                    zip.file(filename, blob);
                });

            promises.push(promise);
        });
    }

    Promise.all(promises).then(() => {
        zip.generateAsync({ type: 'blob' }).then(function (content) {
            var link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'imagens.zip';
            link.click();
        });
    });
}

var projectName = 'Damn-Reincarnation';

var manwhaController = {
    index: function(data) {
        var imageInput = data.imageInput;
        var files = [...imageInput.files];

        var cardsHTML = '';

        files.forEach((image, id) => {
            var imageSrc = URL.createObjectURL(image);
            cardsHTML += createCard({id: id, image: imageSrc, title: image.name});
        });

        return cardsHTML;
    },

    store: function(request) {
        var imageData = [];

        request.forEach((r) => {
            imageData.push(manwha({
                projectName: projectName,
                imageSrc: r.imageSrc,
                text: r.text,
                order: r.order,
            }).data);
        })

        zipImages({data: imageData, type: 'image'});
    },

    updateImage: function (data) {
        var reader = new FileReader();

        reader.onload = function (e) {
            data.imageElement.src = e.target.result;
        }

        reader.readAsDataURL(data.inputElement.files[0]);

        return data.imageElement;
    },

    destroy: function(id, cardsComponents) {
        return Array.from(cardsComponents).filter((cardComponent, i) =>{
            var card = cardComponent.querySelector('.manwha-card');
            console.log('cardsComponents',cardComponent.querySelector('.manwha-card'),cardComponent);
            return card.id !== id
        });
    },

    loadInputTextContent: function (textInput) {
        var files = [...textInput.files];
        fileData = {
            fileContents: [],
            sentences: []
        }

        function readFiles(index) {
            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                var file = files[index];

                reader.onload = function (ev) {
                    var contents = ev.target.result;
                    var sentences = contents.split('.');
                    fileData.fileContents.push(contents);
                    fileData.sentences.push(sentences);
                    resolve(fileData);
                }

                reader.onerror = function(err){
                    reject(err);
                }

                reader.readAsText(file);
            })
        }

        var promisses = [] ;
        files.forEach((file, index) => {
            promisses.push(readFiles(index));
        });

        return Promise.all(promisses).then(data => {
            const combinedData = data.reduce((result, current) => {
                console.log('curretn',current);
                result.fileContents.push(...current.fileContents);
                result.sentences.push(...current.sentences);
                return result;
            }, { fileContents: [], sentences: [] });

            // Concatenando os arrays em um único array
            combinedData.fileContents = combinedData.fileContents.flat();
            combinedData.sentences = combinedData.sentences.flat();

            console.log('combinedData', combinedData);

            return combinedData;
        });
    }
};

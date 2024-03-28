
function listTextData(ev) {

    const textFiles = document.getElementById('text-input').files;

    loadInputFiles(textFiles, 'text').then(textData => {

        return textData.join('.').split('.').filter(sentence => sentence !== '');

    }).then(sentences => {

        document.querySelectorAll('[data-text]').forEach((textarea, index) => {

            textarea.value = sentences[index];

        });

        storage.setText(sentences.join('.'));

    }).catch(err=>console.error(err));
}
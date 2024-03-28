function TextProcessor (storage) {
    var splitNext = function (newText) {
        storage.setText(newText);
        loadText();
    }

    var splitPrevious = function (newText) {
        var text = newText.split('/').map((parte, index) => index === 0 ? parte.replace(/\.(?=[^.]*$)/, ' ') : parte).join('.');
        storage.setText(text);
        loadText();
    }

    var loadText = function () {
        var textParts = storage.getText().split('.').filter(sentence => sentence !== '');

        if(textParts) {
            document.querySelectorAll('[data-text]')
            .forEach((textarea, index) => {
               if (index < textParts.length) {
                   textarea.value = textParts[index];
               } else {
                   textarea.value = '';
               }
           });
        }

    };

    return {
        splitNext: splitNext,
        splitPrevious: splitPrevious,
        loadText: loadText
    }
}
var textProcessor = new TextProcessor(storage);

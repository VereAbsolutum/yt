
function TemporaryStorage() {
    var images = [];
    var text =  '';

    var setText = function (newText) {
        text = newText;
    }

    var setImages = function (newSetOfImages) {
        images = newSetOfImages;
    }

    var getImages = function() {
        return data;
    };

    var getText = function() {
        return text;
    }

    var add = function(item) {
        //
    };

    var remove = function(index) {
        //
    };

    var duplicate = function(index) {
        //
    }

    return {
        add: add,
        remove: remove,
        getImages: getImages,
        getText: getText,
        duplicate: duplicate,
        setText: setText,
        setImages: setImages
    };
}
var storage = new TemporaryStorage();

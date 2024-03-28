
function loadInputFiles(files, type='image') {
    var promisses = [];

    [...files].forEach(file => {
        promisses.push(new Promise((resolve, reject) => {
            var reader = new FileReader();

            reader.onload = function(e) {
                var content = e.target.result;
                resolve(content);
            }

            reader.onerror = function(err) {
                reject(err);
            }

            if (type == 'text'){
                reader.readAsText(file);
            } else if(type=='image'){
                reader.readAsDataURL(file);
            }
        }));
    });

    return Promise.all(promisses);
}
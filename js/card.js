function cardFactory({ src, text, title, id }) {
    return `
        <div data-active="" class="manwha-card card" style="max-width: 540px;">
            <div class="row g-0">

                <div class="col-md-6">
                    <div class="input-group">
                        <input type="file" class="form-control visually-hidden" id="fileInput${id}" aria-describedby="inputGroupFileAddon01">
                        <label class="input-group-text p-0" for="fileInput${id}">
                            <img data-imageSrc src="${src}" class="img-fluid rounded-start input-image" alt="...">
                        </label>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card border border-0 h-100">

                        <div class="card-header p-0">
                            <div class="btn-group d-flex" role="group" aria-label="Basic example">
                                <span data-counter class="btn btn-alert bg-gray py-1 rounded-0"><strong>0</strong></span>
                                <button type="button" class="card-delete btn btn-alert btn-danger py-1 rounded-0">x</button>
                                <button type="button" class="card-duplicate btn btn-primary btn-block py-1 rounded-0">+</button>
                            </div>
                        </div>

                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <div class="form-floating">
                                <textarea data-text class="form-control"  placeholder="Leave a comment here" id="floatingTextarea2" style="height: 170px">${text}</textarea>
                                <label for="floatingTextarea2">Comments</label>
                            </div>
                            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sortableGrid').addEventListener('change', function (ev) {
        if(ev.target.id.startsWith('fileInput')) {
            const input = ev.target;
            const reader = new FileReader();
            reader.onload = function(e) {
                input.closest('.input-group').querySelector('img').setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    });
});

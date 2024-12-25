document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.header__location').addEventListener('click', function() {
        dropdownSelected(this);
    });
    document.getElementById("trailer").style.height = window.innerHeight - 150 + 'px';
});
window.addEventListener('resize', function(event){
    document.getElementById("trailer").style.height = window.innerHeight - 150 + 'px';
});
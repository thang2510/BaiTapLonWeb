appendLocation();
function appendLocation() {
    var listLocation = ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Biên Hoà', 'Nha Trang', 'Bình Dương', 'Phan Thiết', 'Hạ Long', 'Cần Thơ', 'Vũng Tàu', 'Quy Nhơn'
        , 'Huế', 'Long Xuyên', 'Thái Nguyên', 'Buôn Ma Thuột', 'Bắc Giang', 'Bến Tre', 'Việt Trì', 'Ninh Bình', 'Thái Bình', 'Vinh', 'Bảo Lộc', 'Đà Lạt', 'Trà Vinh'
        , 'Yên Bái', 'Kiên Giang', 'Vĩnh Long', 'Cà Mau', 'Hậu Giang', 'Tây Ninh', 'Tuyên Quang', 'Thanh Hóa', 'Nam Định', 'Hải Dương', 'Gia Lai', 'Hà Tĩnh', 'Phú Yên'
        , 'Bạc Liêu', 'Long An', 'Đồng Hới', 'Hà Nam', 'Bắc Ninh', 'Quảng Trị', 'Kon Tum', 'Sóc Trăng', 'Sơn La', 'Lạng Sơn', 'Quảng Ngãi', 'Mỹ Tho', 'Đồng Tháp', 'Hưng Yên'];
    var strLocation = '';
    for (i = 0; i < listLocation.length; i++) {
        strLocation += '<li data-id-location="' + i + '">' + listLocation[i] + '</li>';
    }
    if (document.querySelector('.header__location .header__dropdown') != null) {
        document.querySelector('.header__location .header__dropdown').innerHTML = strLocation;
    }
}
appendLogoPartnerFooter()
function appendLogoPartnerFooter() {
    var listLogoPartner = ['cgv.jpg', 'bhd.jpg', 'galaxycine.jpg', 'cinestar.jpg', '404b8c4b80d77732e7426cdb7e24be20.jpg', 'megags.jpg', 'bt.jpg', 'dongdacinema.jpg', 
    'TOUCH.jpg', 'cnx.jpg', 'STARLIGHT.jpg', 'dcine.jpg', 'zalopay_icon.jpg', 'payoo.jpg', 'VCB.jpg', 'AGRIBANK.jpg', 'VIETTINBANK.jpg', 'IVB.jpg', '123go.jpg', 'laban.jpg'];
    var strLocation = '';
    for (i = 0; i < listLogoPartner.length; i++) {
        if (i < 5) {
            strLocation += '<li class="nospacing"><a href="#"><img src ="./images/icons/partner/' + listLogoPartner[i] + '" /></a></li>';
        }
        else {
            strLocation += '<li><a href="#"><img src ="./images/icons/partner/' + listLogoPartner[i] + '" /></a></li>';
        }
    }
    if (document.querySelector('.footer .footer__partner') != null) {
        document.querySelector('.footer .footer__partner').innerHTML = strLocation;
    }
}

function dropdownSelected(el) {
    el.querySelector('.dropdown__menu').classList.toggle('active');
    el.querySelectorAll('.dropdown__menu li').forEach(elem => {
        elem.addEventListener('click', function() {
            el.querySelectorAll('.dropdown__menu li').forEach(element => {
                element.classList.remove('active');
            });
            elem.classList.add('active');
            el.querySelector('.dropdown__selected').innerHTML = elem.innerHTML;
        })
    });
}


logoLoading();
function logoLoading() {    
    document.querySelector('.logo__loading').classList.add('active');
    setTimeout(function(){ 
        document.querySelector('.logo__loading').classList.remove('active');
    }, 1900);
}

var cssFiles = ['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', './css/sf-fonts.min.css'];
function loadCssFile(cssFiles){
    var link = document.head.querySelectorAll('link');
    for(i = 0; i < cssFiles.length; i++) {
        var fileref = document.createElement('link');
        fileref.setAttribute('rel', 'stylesheet');
        fileref.setAttribute('type', 'text/css');
        fileref.setAttribute('href', cssFiles[i]);
        document.getElementsByTagName('head')[0].appendChild(fileref);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadCssFile(cssFiles);

    if (typeof jQuery.ui !== 'undefined') { } 
    else {
        $.loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js', function () {});
    }
    if (typeof jQuery.lazy !== 'undefined') { } 
    else {
        $.loadScript('./js/jquery.lazy.min.js', function () {
            $('.lazy').lazy();
        });
    }
});

function getDataFormJson(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
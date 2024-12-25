"use strict";

cssFiles.push('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css', './css/main.css');
document.addEventListener('DOMContentLoaded', function () {
  if (typeof jQuery.owlCarousel !== 'undefined') {} else {
    $.loadScript('./js/owl.carousel.min.js', function () {
      $('.bnslide').owlCarousel({
        items: 1,
        nav: true,
        merge: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        video: true,
        lazyLoad: true,
        center: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
      });
      $.loadScript('https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.js', function () {
        $(function () {
          $('.bnslide_popup').magnificPopup({
            disableOn: 320,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
          });
        });
      });
      $('.stapp__slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        nav: false,
        dots: false
      });
      $('.showstime').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
      });
    });
  }

  getDataFormJson("./data/data.json", function (text) {
    var data = JSON.parse(text);
    var temphim = '';

    for (i = 0; i < data.Movie.length; i++) {
      temphim += '<li id=' + data.Movie[i].ID_Movie + '>' + data.Movie[i].MovieName + '</li>';
    }

    var bkMovie = document.querySelector('.bkmovie__name .dropdown__menu');
    var bkCimena = document.querySelector('.bkmovie__cimena .dropdown__menu');
    bkMovie.innerHTML = temphim;
    document.querySelector('.bkmovie__name').addEventListener('click', function () {
      dropdownSelected(this);
      bkCimena.classList.remove('active');
    }); // chọn phim rồi mới đc chọn rạp chiếu nha

    document.querySelector('.bkmovie__cimena').addEventListener('click', function () {
      if (document.querySelector('.bkmovie__name .dropdown__selected').innerHTML.toLowerCase() != "phim") {
        var rapchieu = '';
        document.querySelectorAll('.bkmovie__name .dropdown__menu').forEach(function (el) {
          var index = el.querySelector('li.active').getAttribute('id') - 1; //console.log(data.Movie[index].ID_Cinema);

          for (j = 0; j < data.Movie[index].ID_Cinema.length; j++) {
            rapchieu += '<li id=' + data.Movie[index].ID_Movie + '_' + data.Cinema[j].ID_Cinema + '>' + data.Cinema[j].CinemaName + '</li>';
          }
        });
        bkCimena.innerHTML = rapchieu;
        dropdownSelected(this);
      } else {
        bkCimena.classList.toggle('active');
        bkCimena.innerHTML = '<li>Vui lòng chọn phim trước!</li>';
      }
    }); // chọn ngày xem rồi mới được chọn giờ xem

    document.querySelector('.bkmovie__showtimes').addEventListener('click', function () {
      var bkShowtimes = document.querySelector('.bkmovie__showtimes .dropdown__menu');

      if (document.querySelector('.bkmovie__datepick .dropdown__selected').innerHTML.toLowerCase() != "ngày xem") {
        var gioxem = '';
        document.querySelectorAll('.bkmovie__name .dropdown__menu').forEach(function (el) {
          var index = el.querySelector('li.active').getAttribute('id'); //console.log(data.Movie[index].ID_Cinema);

          for (j = 0; j < data.Showtimes.length; j++) {
            //console.log(data.Showtimes[j].Time);
            //console.log(data.Showtimes[j].ID_Movie.includes(index));
            if (data.Showtimes[j].ID_Movie.includes(index)) {
              gioxem += '<li>' + data.Showtimes[j].Time + '</li>';
            }
          }
        });
        bkShowtimes.innerHTML = gioxem;
        dropdownSelected(this); // document.querySelector('.bkmovie__showtimes .dropdown__menu li').addEventListener('click', function() {
        //     console.log('đặt vé thành công');
        // });
      } else {
        bkShowtimes.classList.toggle('active');
        bkShowtimes.innerHTML = '<li>Vui lòng chọn phim trước!</li>';
      }

      if (document.querySelector('.bkmovie__showtimes .dropdown__selected').innerHTML.toLowerCase() != "suất chiếu") {
        document.querySelector('.bkmovie__book .btn-default').classList.add('active');
      }
    });
  }); // Chọn xong rạp chiếu rồi đến chọn ngày đi xem: thời gian phát sóng phim là 1 tuần 

  function getBKDatePick() {
    (function () {
      var days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
      var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

      Date.prototype.getMonthName = function () {
        return months[this.getMonth()];
      };

      Date.prototype.getDayName = function () {
        return days[this.getDay()];
      };

      Date.prototype.getDayNameNext = function (i, utDay) {
        //console.log(i);
        if (i >= utDay) {
          return days[this.getDay() - 7 + i];
        }

        return days[this.getDay() + i];
      };
    })();

    var now = new Date();
    var day = now.getDayName();
    var month = now.getMonthName();
    var bkDate = '';

    for (i = 0; i < 7; i++) {
      var _date = now.getDate() + i;

      if (_date == now.getDate()) {
        bkDate += '<li class="bkmovie__date"><p>Hôm nay</p><p>' + now.getDate() + '-' + now.getMonthName() + '-' + now.getFullYear() + '</p></li>';
      } else if (_date == now.getDate() + 1) {
        bkDate += '<li class="bkmovie__date"><p>Ngày mai</p><p>' + (now.getDate() + 1) + '-' + now.getMonthName() + '-' + now.getFullYear() + '</p></li>'; //console.log('Ngày mai', now.getMonthName(), now.getFullYear());
      } else {
        bkDate += '<li class="bkmovie__date"><p>' + now.getDayNameNext(i, now.getUTCDay()) + '</p><p>' + (now.getDate() + i) + '-' + now.getMonthName() + '-' + now.getFullYear() + '</p></li>'; //console.log(now.getDayNameNext(i,now.getUTCDay()), now.getMonthName(), now.getFullYear());
      }
    }

    document.querySelector('.bkmovie__datepick').addEventListener('click', function () {
      var bkDatePick = document.querySelector('.bkmovie__datepick .dropdown__menu');
      console.log(document.querySelector('.bkmovie__cimena .dropdown__selected').innerHTML.toLowerCase());

      if (document.querySelector('.bkmovie__cimena .dropdown__selected').innerHTML.toLowerCase() != "rạp") {
        bkDatePick.innerHTML = bkDate;
        dropdownSelected(this);
      } else {
        bkDatePick.classList.toggle('active');
        bkDatePick.innerHTML = '<li>Vui lòng chọn rạp trước!</li>';
      }
    });
  }

  getBKDatePick();
  document.querySelector('.header__location').addEventListener('click', function () {
    dropdownSelected(this);
  });
  getDataFormJson("./data/movie-schedule.json", function (text) {
    // Thêm tab đầu tiên
    var data = JSON.parse(text);
    var cinema = '';

    for (i = 0; i < data.Cinema.length; i++) {
      if (data.Cinema[i].ID_Parent == 0) {
        if (parseInt(data.Cinema[i].ID_Cinema) == 1) {
          cinema += '<li id="' + data.Cinema[i].ID_Cinema + '" class="nav-item mvschedule__tab__item"><a class="mvschedule__tab__link nav-link active" id="' + data.Cinema[i].CinemaLink + '-tab" ' + 'data-toggle="tab" href="#' + data.Cinema[i].CinemaLink + '" role="tab" aria-controls="' + data.Cinema[i].CinemaLink + '" aria-selected="true">' + '<img src="./images/icons/partner/' + data.Cinema[i].CinemaLogo + '" alt="' + data.Cinema[i].CinemaName + '" /></a></li>';
        } else {
          cinema += '<li id="' + data.Cinema[i].ID_Cinema + '" class="nav-item mvschedule__tab__item"><a class="mvschedule__tab__link nav-link" id="' + data.Cinema[i].CinemaLink + '-tab" ' + 'data-toggle="tab" href="#' + data.Cinema[i].CinemaLink + '" role="tab" aria-controls="' + data.Cinema[i].CinemaLink + '" aria-selected="true">' + '<img src="./images/icons/partner/' + data.Cinema[i].CinemaLogo + '" alt="' + data.Cinema[i].CinemaName + '" /></a></li>';
        }
      } else {}
    }

    document.getElementById('mvschedule-tab').innerHTML = cinema;
    document.querySelectorAll('#mvschedule-tab li').forEach(function (el) {
      el.addEventListener('click', function () {
        document.querySelectorAll('#mvschedule-tab li').forEach(function (elm) {
          elm.querySelector('a').classList.remove('active');
        });
        el.querySelector('a').classList.add('active');
      });
    }); // Thêm tab thứ 2

    document.querySelectorAll('#mvschedule-tab').forEach(function (el) {
      var index = el.querySelector('li a.active').parentNode.getAttribute('id');
      var cinemaChild = '';
      cinemaChild += '<div class="row"><div class="tab-pane mvschedule__child customscroll col-12 col-sm-2 fade active show" id="' + data.Cinema[index].CinemaLink + '" role="tabpanel" aria-labelledby="' + data.Cinema[index].CinemaLink + '-tab">' + '<ul class="nav-tabs mvschedule__child__tab" id="mvschedule-child-tab" role="tablist">';

      for (j = 0; j < data.Cinema.length; j++) {
        if (parseInt(data.Cinema[j].ID_Parent) == parseInt(index)) {
          cinemaChild += '<li id="' + data.Cinema[j].ID_Cinema + '" class="nav-item mvschedule__child__item"><a class="mvschedule__child__link nav-link" id="' + data.Cinema[j].CinemaLink + '-tab" ' + 'data-toggle="tab" href="#' + data.Cinema[j].CinemaLink + '" role="tab" aria-controls="' + data.Cinema[j].CinemaLink + '" aria-selected="true">' + '<div class="image"><img src="./images/icons/movie-schedule/' + data.Cinema[j].CinemaLogo + '" alt="' + data.Cinema[j].CinemaName + '" /></div>' + '<div class="content"><div class="title">' + data.Cinema[j].CinemaName + '</div><div class="desc">' + data.Cinema[j].CinemaLocation + '</div><input class="btn-detail" type="button" value="[Chi tiết]" /></div>' + '</a></li>';
        }
      }

      cinemaChild += '</ul></div><div class="tab-content mvschedule__content customscroll col-12 col-sm-10" id="mvschedule-content"></div></div>';
      document.getElementById('mvschedule-tab-content').innerHTML = cinemaChild; //console.log(document.querySelector('#mvschedule-child-tab li').firstChild);

      document.querySelector('#mvschedule-child-tab li').firstChild.classList.add('active');
    }); // Click vào tab thì thay đổi nội dung

    document.querySelectorAll('#mvschedule-tab li').forEach(function (el) {
      el.addEventListener('click', function () {
        //console.log(el.getAttribute('id'));
        var index = el.getAttribute('id');
        var cinemaChild = '';
        cinemaChild += '<div class="row"><div class="tab-pane mvschedule__child customscroll col-12 col-sm-2 fade active show" id="' + data.Cinema[index].CinemaLink + '" role="tabpanel" aria-labelledby="' + data.Cinema[index].CinemaLink + '-tab">' + '<ul class="nav-tabs mvschedule__child__tab" id="mvschedule-child-tab" role="tablist">';

        for (j = 0; j < data.Cinema.length; j++) {
          if (parseInt(data.Cinema[j].ID_Parent) == parseInt(index)) {
            //console.log(data.Cinema[j].ID_Cinema);
            cinemaChild += '<li id="' + data.Cinema[j].ID_Cinema + '" class="nav-item mvschedule__child__item"><a class="mvschedule__child__link nav-link" id="' + data.Cinema[j].CinemaLink + '-tab" ' + 'data-toggle="tab" href="#' + data.Cinema[j].CinemaLink + '" role="tab" aria-controls="' + data.Cinema[j].CinemaLink + '" aria-selected="true">' + '<div class="image"><img src="./images/icons/movie-schedule/' + data.Cinema[j].CinemaLogo + '" alt="' + data.Cinema[j].CinemaName + '" /></div>' + '<div class="content"><div class="title">' + data.Cinema[j].CinemaName + '</div><div class="desc">' + data.Cinema[j].CinemaLocation + '</div><input class="btn-detail" type="button" value="[Chi tiết]" /></div>' + '</a></li>';
          }
        }

        cinemaChild += '</ul></div><div class="tab-content mvschedule__content customscroll col-12 col-sm-10" id="mvschedule-content"></div></div>';
        document.getElementById('mvschedule-tab-content').innerHTML = cinemaChild;
        document.querySelector('#mvschedule-child-tab li').firstChild.classList.add('active');
        document.querySelectorAll('#mvschedule-child-tab').forEach(function (elm) {
          var index = elm.querySelector('li a.active').parentNode.getAttribute('id'); //console.log(index);

          var cinemaMovie = '';
          cinemaMovie += '<div class="tab-pane fade active show" id="' + data.Cinema[index].CinemaLink + '" role="tabpanel" aria-labelledby="' + data.Cinema[index].CinemaLink + '-tab">';

          for (j = 0; j < data.Cinema_Movie.length; j++) {
            if (parseInt(data.Cinema_Movie[j].ID_Cinema) == parseInt(index)) {
              cinemaMovie += '<div class="mvschedule__movie">' + '<div class="image"><img src="./images/icons/movie-schedule/' + data.Cinema_Movie[j].MovieLogo + '" alt="' + data.Cinema_Movie[j].MovieName + '" /></div>' + '<div class="content">' + '<div class="title"><span class="btn-age">' + data.Cinema_Movie[j].Age + '</span>' + data.Cinema_Movie[j].MovieName + '</div>' + '<div class="desc">' + data.Cinema_Movie[j].MovieTime + '</div>' + '</div>' + '<div class="digital">' + data.Cinema_Movie[j].Digital + '</div>' + '<div class="mvschedule__showtimes">';

              for (k = 0; k < data.Cinema_Movie[j].MovieShowtimes.length; k++) {
                cinemaMovie += '<a class="btn-default" href="#">' + data.Cinema_Movie[j].MovieShowtimes[k] + '</a>';
              }

              cinemaMovie += '</div>' + '</div>';
            }
          }

          cinemaMovie += '</div>';
          document.getElementById('mvschedule-content').innerHTML = cinemaMovie;
        });
        document.querySelectorAll('#mvschedule-child-tab li').forEach(function (elm) {
          elm.addEventListener('click', function () {
            //console.log(el.getAttribute('id'));
            var index = elm.getAttribute('id');
            console.log(index);
            var cinemaMovie = '';
            cinemaMovie += '<div class="tab-pane fade active show" id="' + data.Cinema[index].CinemaLink + '" role="tabpanel" aria-labelledby="' + data.Cinema[index].CinemaLink + '-tab">';

            for (j = 0; j < data.Cinema_Movie.length; j++) {
              if (parseInt(data.Cinema_Movie[j].ID_Cinema) == parseInt(index)) {
                cinemaMovie += '<div class="mvschedule__movie">' + '<div class="image"><img src="./images/icons/movie-schedule/' + data.Cinema_Movie[j].MovieLogo + '" alt="' + data.Cinema_Movie[j].MovieName + '" /></div>' + '<div class="content">' + '<div class="title"><span class="btn-age">' + data.Cinema_Movie[j].Age + '</span>' + data.Cinema_Movie[j].MovieName + '</div>' + '<div class="desc">' + data.Cinema_Movie[j].MovieTime + '</div>' + '</div>' + '<div class="digital">' + data.Cinema_Movie[j].Digital + '</div>' + '<div class="mvschedule__showtimes">';

                for (k = 0; k < data.Cinema_Movie[j].MovieShowtimes.length; k++) {
                  cinemaMovie += '<a class="btn-default" href="#">' + data.Cinema_Movie[j].MovieShowtimes[k] + '</a>';
                }

                cinemaMovie += '</div>' + '</div>';
              }
            }

            cinemaMovie += '</div>';
            document.getElementById('mvschedule-content').innerHTML = cinemaMovie;
          });
        });
        document.querySelectorAll('#mvschedule-child-tab li').forEach(function (elem) {
          elem.addEventListener('click', function () {
            // /alert('acb');
            document.querySelectorAll('#mvschedule-child-tab li').forEach(function (elme) {
              elme.querySelector('a').classList.remove('active');
            });
            elem.querySelector('a').classList.add('active');
          });
        });
      });
    });
    document.querySelectorAll('#mvschedule-child-tab li').forEach(function (el) {
      el.addEventListener('click', function () {
        // /alert('acb');
        document.querySelectorAll('#mvschedule-child-tab li').forEach(function (elm) {
          elm.querySelector('a').classList.remove('active');
        });
        el.querySelector('a').classList.add('active');
      });
    }); //  Nội dung của tab thứ 2

    document.querySelectorAll('#mvschedule-child-tab').forEach(function (el) {
      var index = el.querySelector('li a.active').parentNode.getAttribute('id'); //console.log(index);

      var cinemaMovie = '';
      cinemaMovie += '<div class="tab-pane fade active show" id="' + data.Cinema[index].CinemaLink + '" role="tabpanel" aria-labelledby="' + data.Cinema[index].CinemaLink + '-tab">';

      for (j = 0; j < data.Cinema_Movie.length; j++) {
        if (parseInt(data.Cinema_Movie[j].ID_Cinema) == parseInt(index)) {
          cinemaMovie += '<div class="mvschedule__movie">' + '<div class="image"><img src="./images/icons/movie-schedule/' + data.Cinema_Movie[j].MovieLogo + '" alt="' + data.Cinema_Movie[j].MovieName + '" /></div>' + '<div class="content">' + '<div class="title"><span class="btn-age">' + data.Cinema_Movie[j].Age + '</span>' + data.Cinema_Movie[j].MovieName + '</div>' + '<div class="desc">' + data.Cinema_Movie[j].MovieTime + '</div>' + '</div>' + '<div class="digital">' + data.Cinema_Movie[j].Digital + '</div>' + '<div class="mvschedule__showtimes">';

          for (k = 0; k < data.Cinema_Movie[j].MovieShowtimes.length; k++) {
            cinemaMovie += '<a class="btn-default" href="#">' + data.Cinema_Movie[j].MovieShowtimes[k] + '</a>';
          }

          cinemaMovie += '</div>' + '</div>';
        }
      }

      cinemaMovie += '</div>';
      document.getElementById('mvschedule-content').innerHTML = cinemaMovie;
    });
    document.querySelectorAll('#mvschedule-child-tab li').forEach(function (el) {
      el.addEventListener('click', function () {
        //console.log(el.getAttribute('id'));
        var index = el.getAttribute('id');
        console.log(index);
        var cinemaMovie = '';
        cinemaMovie += '<div class="tab-pane fade active show" id="' + data.Cinema[index].CinemaLink + '" role="tabpanel" aria-labelledby="' + data.Cinema[index].CinemaLink + '-tab">';

        for (j = 0; j < data.Cinema_Movie.length; j++) {
          if (parseInt(data.Cinema_Movie[j].ID_Cinema) == parseInt(index)) {
            cinemaMovie += '<div class="mvschedule__movie">' + '<div class="image"><img src="./images/icons/movie-schedule/' + data.Cinema_Movie[j].MovieLogo + '" alt="' + data.Cinema_Movie[j].MovieName + '" /></div>' + '<div class="content">' + '<div class="title"><span class="btn-age">' + data.Cinema_Movie[j].Age + '</span>' + data.Cinema_Movie[j].MovieName + '</div>' + '<div class="desc">' + data.Cinema_Movie[j].MovieTime + '</div>' + '</div>' + '<div class="digital">' + data.Cinema_Movie[j].Digital + '</div>' + '<div class="mvschedule__showtimes">';

            for (k = 0; k < data.Cinema_Movie[j].MovieShowtimes.length; k++) {
              cinemaMovie += '<a class="btn-default" href="#">' + data.Cinema_Movie[j].MovieShowtimes[k] + '</a>';
            }

            cinemaMovie += '</div>' + '</div>';
          }
        }

        cinemaMovie += '</div>';
        document.getElementById('mvschedule-content').innerHTML = cinemaMovie;
      });
    });
  });
});
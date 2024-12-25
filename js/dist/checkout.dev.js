"use strict";

document.addEventListener('DOMContentLoaded', function () {
  function printSeatMan(posSeat, typeSeat) {
    return '<div class="row">' + '<div class="col-1"><div class="seatroom__pos__item">' + posSeat + '</div></div>' + '<div class="col-2 px-0">' + '<div class="seatroom__pos">' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '</div>' + '</div>' + '<div class="col-8 px-0">' + '<div class="seatroom__pos jus-center ' + typeSeat + '">' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '</div>' + '</div>' + '<div class="col-1 px-0">' + '<div class="seatroom__pos jus-end">' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '<div class="seatroom__pos__item"><i class="border-square"></i><i class="fa fa-square"></i></div>' + '</div>' + '</div>' + '</div>';
  }

  getDataFormJson("./data/checkout.json", function (text) {
    var data = JSON.parse(text);
    var ghengoi = '';

    for (i = 0; i < data.Position.length; i++) {
      var posName = data.Position[i].PositionName;

      if (posName == 'E' || posName == 'F' || posName == 'G' || posName == 'H' || posName == 'J' || posName == 'K') {
        ghengoi += printSeatMan(posName, 'seatroom__pos__vip');
      } else if (posName == 'L') {
        ghengoi += printSeatMan(posName, 'seatroom__pos__deluxe');
      } else {
        ghengoi += printSeatMan(posName, '');
      }
    }

    var SeatPositin = document.querySelector('.seatroom__man');
    SeatPositin.innerHTML = ghengoi;
  });

  function appendPaymetATM() {
    var listPaymentATM = ['abbank.jpg', 'acb.jpg', 'agribank.jpg', 'vrb.jpg', 'baoviet.jpg', 'bidv.jpg', 'donga.jpg', 'eximbank.jpg', 'gpbank.jpg', 'hdbank.jpg', 'kienlongbank.jpg', 'lienvietpostbank.jpg', 'maritimebank.jpg', 'mb.jpg', 'namabank.jpg', 'ncb.jpg', 'ocb.jpg', 'oceanbank.jpg', 'pgbank.jpg', 'publicbank.jpg', 'pvcombank.jpg', 'sacombank.jpg', 'saigonbank.jpg', 'scb.jpg', 'seabank.jpg', 'shb.jpg', 'techcombank.jpg', 'tpbank.jpg', 'vib.jpg', 'vietabank.jpg', 'vietcapitalbank.jpg', 'vietcombank.jpg', 'vietinbank.jpg', 'vpbank.jpg'];
    var strPaymentATM = '';

    for (i = 0; i < listPaymentATM.length; i++) {
      strPaymentATM += '<li data-id-payment-atm="payment-atm-' + i + '"><img src="images/icons/checkout/' + listPaymentATM[i] + '" atl="' + listPaymentATM[i] + '" /></li>';
    }

    document.getElementById('list-bank').innerHTML = strPaymentATM;
  }

  document.querySelectorAll('.ckinfor__payment__type').forEach(function (el) {
    el.addEventListener('click', function () {
      document.getElementById('list-bank').classList.remove('active');
    });
  });
  document.getElementById('payment-atm').addEventListener('click', function () {
    this.querySelector('input').checked = true;
    document.getElementById('list-bank').classList.toggle('active');
    appendPaymetATM();
  });
});

function startTimer(duration, display) {
  var timer = duration,
      minutes,
      seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = 0;
      document.querySelector('.sstimeout').classList.add('active');
    }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 5,
      display = document.querySelector('.seatroom__countdown');
  startTimer(fiveMinutes, display);
  document.querySelectorAll('.seatroom__pos .seatroom__pos__item').forEach(function (el) {
    var sum = 0;
    el.addEventListener('click', function () {
      el.classList.add('active');
      sum += parseInt(document.querySelector('.ckinfor__total > span').innerHTML) + 90000;
      console.log(sum);
      document.querySelector('.ckinfor__total > span').innerHTML = sum;
      document.querySelector('.ckinfor__seattype__price > span').innerHTML = sum;
    });
  });
  document.querySelectorAll('.seatroom__pos.seatroom__pos__vip .seatroom__pos__item').forEach(function (el) {
    var sum = 0;
    el.addEventListener('click', function () {
      el.classList.add('active');
      sum += parseInt(document.querySelector('.ckinfor__total > span').innerHTML) + 10000;
      console.log(sum);
      document.querySelector('.ckinfor__total > span').innerHTML = sum;
      document.querySelector('.ckinfor__seattype__price > span').innerHTML = sum;
    });
  });
  document.querySelectorAll('.seatroom__pos.seatroom__pos__deluxe .seatroom__pos__item').forEach(function (el) {
    var sum = 0;
    el.addEventListener('click', function () {
      el.classList.add('active');
      sum += parseInt(document.querySelector('.ckinfor__total > span').innerHTML) + 30000;
      console.log(sum);
      document.querySelector('.ckinfor__total > span').innerHTML = sum;
      document.querySelector('.ckinfor__seattype__price > span').innerHTML = sum;
    });
  });
};
//Задача 1

window.payment = {};

//Налоги
document.getElementById('cat__tax').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.add('selected');
    document.getElementById('cat__cold-water').classList.remove('selected');
    document.getElementById('cat__internet').classList.remove('selected');
    document.getElementById('cat__security').classList.remove('selected');
    document.getElementById('cat__exchange').classList.remove('selected');

    const id = document.getElementById('cat__tax').getAttribute('data-id');
    payment.id = id;

    const header = document.getElementById('center__header');
    header.innerHTML = 'Налоги';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Оплата налоговых сборов';
});

//Холодная вода
document.getElementById('cat__cold-water').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.remove('selected');
    document.getElementById('cat__cold-water').classList.add('selected');
    document.getElementById('cat__internet').classList.remove('selected');
    document.getElementById('cat__security').classList.remove('selected');
    document.getElementById('cat__exchange').classList.remove('selected');

    const id = document.getElementById('cat__cold-water').getAttribute('data-id');
    payment.id = id;

    const header = document.getElementById('center__header');
    header.innerHTML = 'Холодная вода';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Оплата холодного водоснабжения';
});

//Интернет
document.getElementById('cat__internet').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.remove('selected');
    document.getElementById('cat__cold-water').classList.remove('selected');
    document.getElementById('cat__internet').classList.add('selected');
    document.getElementById('cat__security').classList.remove('selected');
    document.getElementById('cat__exchange').classList.remove('selected');

    const id = document.getElementById('cat__internet').getAttribute('data-id');
    payment.id = id;

    const header = document.getElementById('center__header');
    header.innerHTML = 'Интернет';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Оплата услуг интернет-провайдера';
});

//Охрана
document.getElementById('cat__security').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.remove('selected');
    document.getElementById('cat__cold-water').classList.remove('selected');
    document.getElementById('cat__internet').classList.remove('selected');
    document.getElementById('cat__security').classList.add('selected');
    document.getElementById('cat__exchange').classList.remove('selected');

    const id = document.getElementById('cat__security').getAttribute('data-id');
    payment.id = id;

    const header = document.getElementById('center__header');
    header.innerHTML = 'Охрана';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Оплата услуг безопасности';
});

//Валюта
document.getElementById('cat__exchange').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.remove('selected');
    document.getElementById('cat__cold-water').classList.remove('selected');
    document.getElementById('cat__internet').classList.remove('selected');
    document.getElementById('cat__security').classList.remove('selected');
    document.getElementById('cat__exchange').classList.add('selected');

    const id = document.getElementById('cat__exchange').getAttribute('data-id');
    payment.id = id;

    const header = document.getElementById('center__header');
    header.innerHTML = 'Обмен валют';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Покупка и продажа валюты';
});

//Задача 2

//Работа с селектом

document.getElementById('meters').addEventListener('change', ({target}) => {
    window.payment.meterId = target.value;
});

//Работа с инпутами

document.getElementById('id__center__form').addEventListener('submit', () => {
    const prValue = document.getElementById('previous').value;
    const curValue = document.getElementById('current').value;

    if (prValue >= 0) {
        payment.previous = prValue;
    } else {
        alert ('Некорректное значение');
    }

    if (curValue >= 0 && curValue > payment.previous) {
        payment.current = curValue;
    } else {
        alert ('Некорректное значение');
    }

    event.preventDefault();
});







//Попытка 1 - перебрать коллекцию элементов класса и повесить событие на всех 
//let paymentBtns = document.getElementsByClassName('left__company');
//
//paymentBtns.forEach((el) => {
//   el.addEventListener('click', (e) => {
//        e.classlist.add('selected');
//    })
//});


//Заготовки 

//    header.className = 'center__title';

//const header = document.createElement('h2');
//header.classList.add('center__title');
//header.innerHTML = 'Налоги';
//div.appendChild(header);

//document.getElementById('id__center__form').addEventListener('submit', () => {
//    let meters = document.getElementById('meters').options.selectedIndex.text; 
//
//});


//document.getElementById('previous').addEventListener('change', () => {
//    const prValue = document.getElementById('previous').value;
//    if (prValue >= 0) {
//       payment.previous = prValue;
//    } else {
//        alert ('Некорректное значение');
//    }

    
//});

//document.getElementById('current').addEventListener('change', () => {
//    const curValue = document.getElementById('current').value;
//    if (curValue >= 0 && curValue > payment.previous) {
//        payment.current = curValue;
//    } else {
//        alert ('Некорректное значение');
//    }
//});


//setInterval
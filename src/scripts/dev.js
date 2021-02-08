

import {tarifs} from './constants'
import {balance as totalBalance} from './index'

window.payment = {};
window.payments = [];

//Попытка подгрузить локал сторидж 
//let payments = JSON.parse(localStorage.getItem('payments'));
//window.payments = payments;
//let serviceObj = JSON.parse(localStorage.getItem('serviceObj'));
//window.serviceObj = serviceObj;


// Считаем к Оплате
let iGlobal = 0;
window.serviceObj = {};  //Объект для хранения вспомогательных вычислений
window.serviceObj.i = iGlobal; //Вспомогательное вычисление

let inTotal =[];
window.serviceObj.inTotal = inTotal;


//Задача 1

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

    let ruValueIndex = target.options.selectedIndex;
    let ruValue = target.options[ruValueIndex].textContent;
    window.payment.meterIdValue = ruValue;
});

//Отображение нуля напротив Всего
let anewBPrice = document.createElement("b");
anewBPrice.innerHTML = '0'; 
document.getElementById('intotal-span__id').appendChild(anewBPrice);

// Сабмит формы
document.getElementById('id__center__form').addEventListener('submit', () => {

    //Работа с инпутами
    const prValue = document.getElementById('previous').value;
    const curValue = document.getElementById('current').value;

    if (prValue >= 0) {
        payment.previous = prValue;
    } else {
        event.preventDefault();
        return alert ('Некорректное значение');
    }

    if (curValue >= 0 && curValue > payment.previous) {
        payment.current = curValue;
    } else {
        event.preventDefault();
        return alert ('Некорректное значение');
        
    }
    event.preventDefault();

    //Задача 3

    //Считаем итоговую сумму с коэффициентом 
    let price;
    for (let key in tarifs) {
        if (payment.id == key){
            price = (payment.current - payment.previous) * tarifs[key];  
        }
    }
    payment.price = price;

    //Добавляем объект платежа в общий массив
    const paymentClone = Object.assign(
        {},
        payment, 
    );
    payments.push(paymentClone);

    //Заполняем чекбоксы (отображение сохраненных платежей)
    if (payment.id === 'taxes'){
        document.getElementById('checkbox-taxes').setAttribute("checked", "true");
    }
    if (payment.id === 'water'){
        document.getElementById('checkbox-water').setAttribute("checked", "true");
    }
    if (payment.id === 'internet'){
        document.getElementById('checkbox-internet').setAttribute("checked", "true");
    }
    if (payment.id === 'security'){
        document.getElementById('checkbox-security').setAttribute("checked", "true");
    }
    if (payment.id === 'exchange'){
        document.getElementById('checkbox-exchange').setAttribute("checked", "true");
    }

    //Очищаем объект
    for (let i in payment) {
        delete payment[i];
    }

    //Очищаем инпуты
    document.getElementById("previous").value = "";
    document.getElementById("current").value = "";

    //Создаем динамический вывод К оплате
    for (iGlobal; iGlobal < payments.length; iGlobal++) {
        let localmeterIdValue = payments[iGlobal].meterIdValue;
        let localPrice = payments[iGlobal].price;

        let newLi = document.createElement("li");
        newLi.setAttribute("class", "list__item list__item-hide");
        document.getElementById('summary-list__id').prepend(newLi);
        let newP = document.createElement("p");
        newLi.appendChild(newP);
        let newSpanText = document.createElement("span");
        newSpanText.setAttribute("class", "list__item-label");
        newSpanText.textContent = `${localmeterIdValue}`;
        newP.appendChild(newSpanText);
        let newSpanPrice = document.createElement("span");
        newSpanPrice.setAttribute("class", "price");
        newSpanPrice.innerHTML = '$';
        newP.appendChild(newSpanPrice);
        let newBPrice = document.createElement("b");
        newBPrice.innerHTML = `${localPrice}`;
        newSpanPrice.appendChild(newBPrice);

        inTotal.push(localPrice);


        if (iGlobal == 0) {
            anewBPrice.innerHTML = `${localPrice}`;
        } else {
            inTotal.reduce((sum, el) => {
                return window.serviceObj.inTotalOutcome = sum + el; 
            });
    
            anewBPrice.innerHTML = `${window.serviceObj.inTotalOutcome}`;
        }
    };
});

//Задача 4

//Отчистить форму
document.getElementById('id__center__form').addEventListener('reset', () => {
    //Обнулили Всего
    anewBPrice.innerHTML = '0';

    //Убрали к Оплате
    let deleteList = Array.from(document.getElementsByClassName('list__item-hide'));
    deleteList.forEach(element => {
        element.remove();
    });

    //Отчистили payments
    payments.length = 0;

    //Отчистили служебный объект
    serviceObj = {};

    iGlobal = 0;
    window.serviceObj.i = iGlobal; 
    inTotal =[];
    window.serviceObj.inTotal = inTotal;

    //Отчистили чекбоксы
    document.getElementById('checkbox-taxes').removeAttribute("checked");
    document.getElementById('checkbox-water').removeAttribute("checked");
    document.getElementById('checkbox-internet').removeAttribute("checked");
    document.getElementById('checkbox-security').removeAttribute("checked");
    document.getElementById('checkbox-exchange').removeAttribute("checked");
    
});

//Задача 5
//Вывод сохраненных платежей и формирование локального хранилища
document.getElementById('right__payments-id').addEventListener('submit', () => {
    event.preventDefault();
    let count = 0;
    let newBalance;
    //Налоги
    if (document.getElementById('checkbox-taxes').checked) {
        let newLiItem = document.createElement("li");
        if (count === 0){
            newBalance = totalBalance - payments[count].price;
        } else {
            newBalance = newBalance - payments[count].price;
        }
        count++
        if (newBalance > 0){
            newLiItem.innerHTML = 'Налоги: успешно оплачено';
            newLiItem.setAttribute("class", "list__item ");
        } else {
            newLiItem.innerHTML = 'Налоги: ошибка транзакции';
            newLiItem.setAttribute("class", "list__item-error list__item ");
        }
        document.getElementById('transactions__list-id').appendChild(newLiItem);
        document.getElementById('checkbox-taxes').removeAttribute("checked");
    }

    //Вода
    if (document.getElementById('checkbox-water').checked) {
        let newLiItem = document.createElement("li");
        if (count === 0){
            newBalance = totalBalance - payments[count].price;
        } else {
            newBalance = newBalance - payments[count].price;
        }
        serviceObj.imp = newBalance;
        serviceObj.count = count;
        serviceObj.countpr =payments[count].price;
        count++
        if (newBalance > 0){
            newLiItem.innerHTML = 'Вода: успешно оплачено';
            newLiItem.setAttribute("class", "list__item ");
        } else {
            newLiItem.innerHTML = 'Вода: ошибка транзакции';
            newLiItem.setAttribute("class", "list__item-error list__item ");
        }
        document.getElementById('transactions__list-id').appendChild(newLiItem);
        document.getElementById('checkbox-water').removeAttribute("checked");
    }

    //Интернет
    if (document.getElementById('checkbox-internet').checked) {
        let newLiItem = document.createElement("li");
        if (count === 0){
            newBalance = totalBalance - payments[count].price;
        } else {
            newBalance = newBalance - payments[count].price;
        }
        serviceObj.imp = newBalance;
        serviceObj.count = count;
        serviceObj.countpr =payments[count].price;
        count++
        if (newBalance > 0){
            newLiItem.innerHTML = 'Интернет: успешно оплачено';
            newLiItem.setAttribute("class", "list__item ");
        } else {
            newLiItem.innerHTML = 'Интернет: ошибка транзакции';
            newLiItem.setAttribute("class", "list__item-error list__item ");
        }
        document.getElementById('transactions__list-id').appendChild(newLiItem);
        document.getElementById('checkbox-internet').removeAttribute("checked");
    }

    //Охрана
    if (document.getElementById('checkbox-security').checked) {
        let newLiItem = document.createElement("li");
        if (count === 0){
            newBalance = totalBalance - payments[count].price;
        } else {
            newBalance = newBalance - payments[count].price;
        }
        serviceObj.imp = newBalance;
        serviceObj.count = count;
        serviceObj.countpr =payments[count].price;
        count++
        if (newBalance > 0){
            newLiItem.innerHTML = 'Охрана: успешно оплачено';
            newLiItem.setAttribute("class", "list__item ");
        } else {
            newLiItem.innerHTML = 'Охрана: ошибка транзакции';
            newLiItem.setAttribute("class", "list__item-error list__item ");
        }
        document.getElementById('transactions__list-id').appendChild(newLiItem);
        document.getElementById('checkbox-security').removeAttribute("checked");
    }

    //Обмен валют
    if (document.getElementById('checkbox-exchange').checked) {
        let newLiItem = document.createElement("li");
        if (count === 0){
            newBalance = totalBalance - payments[count].price;
        } else {
            newBalance = newBalance - payments[count].price;
        }
        serviceObj.imp = newBalance;
        serviceObj.count = count;
        serviceObj.countpr =payments[count].price;
        count++
        if (newBalance > 0){
            newLiItem.innerHTML = 'Обмен валют: успешно оплачено';
            newLiItem.setAttribute("class", "list__item ");
        } else {
            newLiItem.innerHTML = 'Обмен валют: ошибка транзакции';
            newLiItem.setAttribute("class", "list__item-error list__item ");
        }
        document.getElementById('transactions__list-id').appendChild(newLiItem);
        document.getElementById('checkbox-exchange').removeAttribute("checked");
    }

//    localStorage.setItem('payments', JSON.stringify(payments));
//    localStorage.setItem('serviceObj', JSON.stringify(serviceObj));
});

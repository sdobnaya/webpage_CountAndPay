
// Привет, это один из первых моих проектов - и он невероятно уродлив. 
// Я не стала серьезно его переделывать, ведь только сравнивая новые работы 
// с предыдущими можно оценить свой прогресс. Сейчас я могу лучше :)

import { tarifs } from './constants';
import { balance as totalBalance } from './index';

let iGlobal = 0;
let ruValueIndex = 4;

let inTotal = [];
let thePayment = { id: "water", meterId: "DS949321", meterIdValue: "ДС 949321", previous: "25", current: "60" };
let allPayments = [];
let serviceObject = { i:iGlobal, inTotal: inTotal };


document.getElementById('cat__tax').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.add('selected');
    document.getElementById('cat__cold-water').classList.remove('selected');
    document.getElementById('cat__internet').classList.remove('selected');
    document.getElementById('cat__security').classList.remove('selected');
    document.getElementById('cat__exchange').classList.remove('selected');

    const id = document.getElementById('cat__tax').getAttribute('data-id');


    thePayment.id = id;


    const header = document.getElementById('center__header');
    header.innerHTML = 'Налоги';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Оплата налоговых сборов';
});

document.getElementById('cat__cold-water').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.remove('selected');
    document.getElementById('cat__cold-water').classList.add('selected');
    document.getElementById('cat__internet').classList.remove('selected');
    document.getElementById('cat__security').classList.remove('selected');
    document.getElementById('cat__exchange').classList.remove('selected');

    const id = document.getElementById('cat__cold-water').getAttribute('data-id');

    thePayment.id = id;


    const header = document.getElementById('center__header');
    header.innerHTML = 'Холодная вода';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Оплата холодного водоснабжения';
});

document.getElementById('cat__internet').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.remove('selected');
    document.getElementById('cat__cold-water').classList.remove('selected');
    document.getElementById('cat__internet').classList.add('selected');
    document.getElementById('cat__security').classList.remove('selected');
    document.getElementById('cat__exchange').classList.remove('selected');

    const id = document.getElementById('cat__internet').getAttribute('data-id');

    thePayment.id = id;

    const header = document.getElementById('center__header');
    header.innerHTML = 'Интернет';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Оплата услуг интернет-провайдера';
});

document.getElementById('cat__security').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.remove('selected');
    document.getElementById('cat__cold-water').classList.remove('selected');
    document.getElementById('cat__internet').classList.remove('selected');
    document.getElementById('cat__security').classList.add('selected');
    document.getElementById('cat__exchange').classList.remove('selected');

    const id = document.getElementById('cat__security').getAttribute('data-id');

    thePayment.id = id;

    const header = document.getElementById('center__header');
    header.innerHTML = 'Охрана';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Оплата услуг безопасности';
});

document.getElementById('cat__exchange').addEventListener('click', () => {
    document.getElementById('cat__tax').classList.remove('selected');
    document.getElementById('cat__cold-water').classList.remove('selected');
    document.getElementById('cat__internet').classList.remove('selected');
    document.getElementById('cat__security').classList.remove('selected');
    document.getElementById('cat__exchange').classList.add('selected');

    const id = document.getElementById('cat__exchange').getAttribute('data-id');

    thePayment.id = id;

    const header = document.getElementById('center__header');
    header.innerHTML = 'Обмен валют';

    const subtitle = document.getElementById('center__subtitle');
    subtitle.innerHTML = 'Покупка и продажа валюты';
});


//Работа с селектом
document.getElementById('meters').addEventListener('change', ({target}) => {
    thePayment.meterId = target.value;

    ruValueIndex = target.options.selectedIndex;
    
    let ruValue = target.options[ruValueIndex].textContent;

    thePayment.meterIdValue = ruValue;
});

//Отображение нуля напротив Всего
let anewBPrice = document.createElement("b");
anewBPrice.innerHTML = '0'; 
document.getElementById('intotal-span__id').appendChild(anewBPrice);

// Сабмит формы

document.getElementById('id__center__form').addEventListener('submit', (event) => {
    event.preventDefault();

    //Работа с инпутами
    const prValue = document.getElementById('previous').value;
    const curValue = document.getElementById('current').value;

    if (prValue >= 0) {
        thePayment.previous = prValue;
    } else {
        return alert ('Некорректное значение');
    }

    if (curValue >= 0 && curValue > thePayment.previous) {
        thePayment.current = curValue;
    } else {
        return alert ('Некорректное значение');
    }

    // Считаем итоговую сумму с коэффициентом 
    let price;

    // Выставляем дефолтные значения селектора, если пользователь не менял их
    if (!thePayment.meterId) {
        thePayment.meterId = 'DS949321';
    }

    if (!thePayment.meterIdValue) {
        thePayment.meterIdValue = 'ДС 949321';
    }

    if (!thePayment.id) {
        thePayment.id ='taxes';
    }


    for (let key in tarifs) {
        if (thePayment.id == key) {
            price = (thePayment.current - thePayment.previous) * tarifs[key];  
            thePayment.price = price;
        }
    }


    //Добавляем объект платежа в общий массив
    const paymentClone = Object.assign(
        {},

        thePayment
    );
    allPayments.push(paymentClone);

    //Заполняем чекбоксы (отображение сохраненных платежей)
    if (thePayment.id === 'taxes'){
        document.getElementById('checkbox-taxes').setAttribute("checked", "true");
    }
    if (thePayment.id === 'water'){
        document.getElementById('checkbox-water').setAttribute("checked", "true");
    }
    if (thePayment.id === 'internet'){
        document.getElementById('checkbox-internet').setAttribute("checked", "true");
    }
    if (thePayment.id === 'security'){
        document.getElementById('checkbox-security').setAttribute("checked", "true");
    }
    if (thePayment.id === 'exchange'){

        document.getElementById('checkbox-exchange').setAttribute("checked", "true");
    }

    //Очищаем объект
    for (let i in thePayment) {
        delete thePayment[i];
    }

    //Очищаем инпуты
    document.getElementById("previous").value = "";
    document.getElementById("current").value = "";

    //Создаем динамический вывод К оплате

    for (iGlobal; iGlobal < allPayments.length; iGlobal++) {
        let localmeterIdValue = allPayments[iGlobal].meterIdValue;
        let localPrice = allPayments[iGlobal].price;


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
                serviceObject.inTotalOutcome = sum + el; 
                return serviceObject.inTotalOutcome;
            });
    
            anewBPrice.innerHTML = `${serviceObject.inTotalOutcome}`;


        }
    };
});

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

    allPayments.length = 0;

    //Отчистили служебный объект
    serviceObject = {};

    iGlobal = 0;
    inTotal =[];

    //Отчистили чекбоксы
    document.getElementById('checkbox-taxes').removeAttribute("checked");
    document.getElementById('checkbox-water').removeAttribute("checked");
    document.getElementById('checkbox-internet').removeAttribute("checked");
    document.getElementById('checkbox-security').removeAttribute("checked");
    document.getElementById('checkbox-exchange').removeAttribute("checked");
    
});


//Вывод сохраненных платежей и формирование локального хранилища
document.getElementById('right__payments-id').addEventListener('submit', (event) => {
    event.preventDefault();
    let count = 0;
    let newBalance = 0;

    //Налоги
    if (document.getElementById('checkbox-taxes').checked) {
        let newLiItem = document.createElement("li");

        if (count === 0) {
            newBalance = totalBalance - allPayments[count].price;
        } else {
            newBalance = newBalance - allPayments[count].price;
        }
        serviceObject.imp = newBalance;
        serviceObject.count = count;
        serviceObject.countpr = allPayments[count].price;
        count++;

        if (newBalance > 0) {


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

        if (count === 0) {
            newBalance = totalBalance - allPayments[count].price;
        } else {
            newBalance = newBalance - allPayments[count].price;
        }
        serviceObject.imp = newBalance;
        serviceObject.count = count;
        serviceObject.countpr = allPayments[count].price;
        count++;

        if (newBalance > 0) {

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

        if (count === 0) {
            newBalance = totalBalance - allPayments[count].price;
        } else {
            newBalance = newBalance - allPayments[count].price;
        }
        serviceObject.imp = newBalance;
        serviceObject.count = count;
        serviceObject.countpr = allPayments[count].price;
        count++;

        if (newBalance > 0) {

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

        if (count === 0) {
            newBalance = totalBalance - allPayments[count].price;
        } else {
            newBalance = newBalance - allPayments[count].price;
        }
        serviceObject.imp = newBalance;
        serviceObject.count = count;
        serviceObject.countpr = allPayments[count].price;
        count++;

        if (newBalance > 0) {

 
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

        if (count === 0) {
            newBalance = totalBalance - allPayments[count].price;
        } else {
            newBalance = newBalance - allPayments[count].price;
        }
        serviceObject.imp = newBalance;
        serviceObject.count = count;
        serviceObject.countpr = allPayments[count].price;
        count++;

        if (newBalance > 0) {

            newLiItem.innerHTML = 'Обмен валют: успешно оплачено';
            newLiItem.setAttribute("class", "list__item ");
        } else {
            newLiItem.innerHTML = 'Обмен валют: ошибка транзакции';
            newLiItem.setAttribute("class", "list__item-error list__item ");
        }
        document.getElementById('transactions__list-id').appendChild(newLiItem);
        document.getElementById('checkbox-exchange').removeAttribute("checked");
    }

    localStorage.setItem('allPayment', JSON.stringify(allPayment));
    localStorage.setItem('serviceObject', JSON.stringify(serviceObject));
});



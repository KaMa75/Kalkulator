import { Calculator } from './Calculator';

class DecCalculator extends Calculator {
    constructor(selectorName){
        super(selectorName);
        this.setEditable();
        console.log(this.getName());
    }

    /* Ustawienie atrybutu contenteditable*/
    setEditable() {
        const numberElements = this.$calculatorDOMElement.find('.active');
        numberElements.each(function() {
            $(this).attr('contenteditable', 'true');
        });
    }

    /* Zmiana cyfry w polu */
    changeNumber(root) {
        let activeElement = root.find('.active');
        let currentValue = activeElement.text();
        activeElement.text('');
        activeElement.one('blur', () => {
            if(!activeElement.text()){
                activeElement.text(currentValue);
            } else {
                this.validNum(activeElement, activeElement.text(), currentValue);
            }
        });
    }

    /* Nadpisanie metody inicjalizującej eventy */
    initEvents() {
        super.initEvents();
        const sumBtn = this.$calculatorDOMElement.find('.operator-bar span');
        sumBtn.on('click', () => {
            this.checkNumber();
            this.updateResult();
        });
    }

    /* Dodawanie liczb */
    add(firstNum, secondNum) {
        let result = [0,0,0,0,0,0,0,0,0];
        for(let i = firstNum.length - 1; i >= 0  ; i--) {
            let carryBit =  firstNum[i] + secondNum[i] + result[i];
            if( carryBit  >= 10) {
                let tempNum = [...carryBit.toString()];
                result[i] = parseInt(tempNum[1]);
                result[i-1] = parseInt(tempNum[0]);
            } else {
                result[i] = carryBit;
            }
        }
        return result;
    }

    /* Wyświetlenie wyniku */
    updateResult() {
        let root =  this.$calculatorDOMElement;
        let $resultNumber = root.children(".group-number").children(".result-bit").children("span");
        for(let i =  this.resultNumberArray.length - 1, j = 0; i >= 0 ; i--, j++) {
           $($resultNumber[j]).text(this.resultNumberArray[i]);
        }
    }

    /* Walidacja */
    validNum(element, value, oldValue) {
        if(!(value >= 0 && value < 10)){
            element.parent().css('background', 'red');
            element.css('color', 'white');
            const time = setTimeout(() => {
                element.parent().css('background', '');
                element.css('color', '');
                element.text(oldValue);
                clearTimeout(time);
            }, 1000);
        } else {
            this.showTooltip();
        }
    }

    /* Wyświetlenie tooltipa */
    showTooltip() {
        this.$calculatorDOMElement.find('.tooltip').css('display', 'block');
    }

}

export { DecCalculator };

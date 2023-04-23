// Form Elements
const submitBtn = document.querySelector('.submit__btn');
const form = document.querySelector('form');

// all elements array
const inputsArray = document.querySelectorAll('.input__field');
const labelsArray = document.querySelectorAll('.time__input label');
const errorMessagesArray = document.querySelectorAll('.error__message');

// separate elements, that are related to inputs
const inputElements = {
    day: {
        errorMessage: document.querySelector('.error__day'),
        label: document.querySelector('.day__label'),
        input: document.getElementById('day'),
        result: document.querySelector('.days__result'),
    },
    month: {
        errorMessage: document.querySelector('.error__month'),
        label: document.querySelector('.month__label'),
        input: document.getElementById('month'),
        result: document.querySelector('.months__result'),
    },
    year: {
        errorMessage: document.querySelector('.error__year'),
        label: document.querySelector('.year__label'),
        input: document.getElementById('year'),
        result: document.querySelector('.years__result'),
    },
};

// current time constants
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // Months are zero indexed in JavaScript
const currentDay = today.getDate();

function resetFields() {
    inputsArray.forEach(
        (input) => (input.style.borderColor = 'var(--color-neutral-lightgray)')
    );
    errorMessagesArray.forEach((errorContainer) => {
        errorContainer.textContent = '';
    });
    labelsArray.forEach((label) => {
        label.style.color = 'var(--color-neutral-smokeygray)';
    });
}

function validateAllDates(day, month, year) {
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        monthLength[1] = 29;
    }
    return day <= monthLength[month - 1];
}

function isDateInFuture(dateString) {
    const inputDate = new Date(dateString);
    console.log();
    return inputDate > today;
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function throwAnError(time, type) {
    const errorColor = 'var(--color-primary-error)';
    let errorMessage;
    if (type === 'empty') {
        errorMessage = 'This field is required';
    } else if (type === 'invalid') {
        errorMessage = `Must be a valid ${time}`;
    } else if ((type = 'past')) {
        errorMessage = 'Must be in the past';
    }
    inputElements[time].errorMessage.textContent = errorMessage;
    inputElements[time].label.style.color = errorColor;
    inputElements[time].input.style.borderColor = errorColor;
}

function calculateAndDisplayAge(day, month, year) {
    const birthDate = new Date(year, month - 1, day);

    let years = today.getFullYear() - birthDate.getFullYear();
    console.log(today.getFullYear());
    console.log(birthDate.getFullYear());
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    if (days < 0) {
        const prevMonthLastDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();
        days += prevMonthLastDay;
        months--;
    }

    // inputElements.day.result.textContent = days;
    animateValue(inputElements.day.result, 0, day, 450);
    animateValue(inputElements.month.result, 0, months, 450);
    animateValue(inputElements.year.result, 0, years, 450);
    //inputElements.month.result.textContent = months;
    //inputElements.year.result.textContent = years;
}

function validateInputs(inputedDay, inputedMonth, inputedYear) {
    let hasEmptyInput = false;
    let hasInvalidInput = false;
    // Check if all fields are filled
    if (!inputedDay) {
        throwAnError('day', 'empty');
        hasEmptyInput = true;
    }
    if (!inputedMonth) {
        throwAnError('month', 'empty');
        hasEmptyInput = true;
    }
    if (!inputedYear) {
        throwAnError('year', 'empty');
        hasEmptyInput = true;
    }

    // return false if even one input has an empty input
    if (hasEmptyInput) {
        return false;
    }

    // Check if all field are filled corectly
    if (inputedDay < 1 || inputedDay > 31) {
        throwAnError('day', 'invalid');
        hasInvalidInput = true;
    }
    if (inputedMonth < 1 || inputedMonth > 12) {
        throwAnError('month', 'invalid');
        hasInvalidInput = true;
    }

    // if there's invalid day or month, return false
    if (hasInvalidInput) {
        return false;
    }

    if (
        inputedYear > 9999 ||
        isDateInFuture(`${inputedYear}-${inputedMonth}-${inputedDay}`)
    ) {
        throwAnError('year', 'past');
        return false;
    }

    if (!validateAllDates(inputedDay, inputedMonth, inputedYear)) {
        inputsArray.forEach(
            (input) => (input.style.borderColor = 'var(--color-primary-error)')
        );
        inputElements.day.errorMessage.textContent = 'Must be a valid date';
        labelsArray.forEach((label) => {
            label.style.color = 'var(--color-primary-error)';
        });
        return false;
    }
    return true;
}

function startApp(e) {
    e.preventDefault();
    resetFields();
    const day = +inputElements.day.input.value;
    const month = +inputElements.month.input.value;
    const year = +inputElements.year.input.value;
    if (validateInputs(day, month, year)) {
        calculateAndDisplayAge(day, month, year);
    }
}

form.addEventListener('submit', startApp);

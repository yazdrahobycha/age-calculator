// Form Elements
const submitBtn = document.querySelector('.submit__btn');
const form = document.querySelector('form');

// input elements
const inputsArray = document.querySelectorAll('.input__field');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

// labels Elements
const labelsArray = document.querySelectorAll('.time__input label');
const dayLabel = document.querySelector('.day__label');
const monthLabel = document.querySelector('.month__label');
const yearLabel = document.querySelector('.year__label');

// Error messages containers
const errorMessagesArray = document.querySelectorAll('.error__message');
const dayErrorMessage = document.querySelector('.error__day');
const monthErrorMessage = document.querySelector('.error__month');
const yearErrorMessage = document.querySelector('.error__year');

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
    return inputDate > today;
}

function validateInputs(inputedDay, inputedMonth, inputedYear) {
    // Check if all fields are filled
    if (!inputedDay) {
        dayErrorMessage.textContent = 'This field is required';
        dayLabel.style.color = 'var(--color-primary-error)';
        dayInput.style.borderColor = 'var(--color-primary-error)';
        return false;
    }
    if (!inputedMonth) {
        monthErrorMessage.textContent = 'This field is required';
        monthLabel.style.color = 'var(--color-primary-error)';
        monthInput.style.borderColor = 'var(--color-primary-error)';
        return false;
    }
    if (!inputedYear) {
        yearErrorMessage.textContent = 'This field is required';
        yearLabel.style.color = 'var(--color-primary-error)';
        yearInput.style.borderColor = 'var(--color-primary-error)';
        return false;
    }

    // Check if all field are filled corectly
    if (inputedDay < 1 || inputedDay > 31) {
        dayErrorMessage.textContent = 'Must be a valid day';
        dayLabel.style.color = 'var(--color-primary-error)';
        dayInput.style.borderColor = 'var(--color-primary-error)';
        return false;
    }
    if (inputedMonth < 1 || inputedMonth > 12) {
        monthErrorMessage.textContent = 'Must be a valid month';
        monthLabel.style.color = 'var(--color-primary-error)';
        monthInput.style.borderColor = 'var(--color-primary-error)';
        return false;
    }
    if (isDateInFuture(`${inputedYear}-${inputedMonth}-${inputedDay}`)) {
        yearErrorMessage.textContent = 'Must be in the past';
        yearLabel.style.color = 'var(--color-primary-error)';
        yearInput.style.borderColor = 'var(--color-primary-error)';
        return false;
    }

    if (!validateAllDates(inputedDay, inputedMonth, inputedYear)) {
        inputsArray.forEach(
            (input) => (input.style.borderColor = 'var(--color-primary-error)')
        );
        dayErrorMessage.textContent = 'Must be a valid date';
        labelsArray.forEach((label) => {
            label.style.color = 'var(--color-primary-error)';
        });
        return false
    }
    return true
}

function startApp(e) {
    e.preventDefault();
    resetFields();
    const day = +dayInput.value;
    const month = +monthInput.value;
    const year = +yearInput.value;
    if (validateInputs(day, month, year)) {
        console.log('the date is correnct!');
    }
}

form.addEventListener('submit', startApp);

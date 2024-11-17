const nameRegex = /^[A-Za-zА-Яа-яЄєІіЇїҐґ]+ [A-Za-zА-Яа-яЄєІіЇїҐґ]\.[A-Za-zА-Яа-яЄєІіЇїҐґ]\.$/;
const groupRegex =/^[A-Za-zА-Яа-яЄєІіЇїҐґ]{2}\-[0-9]{2}$/;
const idcardRegex = /^[А-ЯЄІЇҐ]{2} \№[0-9]{6}$/
const birthdayRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(19[0-9]{2}|20[0-9]{2})$/;
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const form = document.getElementById('myForm');
const nameInput = document.getElementById('nameInput');
const groupInput = document.getElementById('groupInput');
const idcardInput = document.getElementById('idcardInput');
const dateOfBirthInput= document.getElementById('birthdayInput');
const emailInput= document.getElementById('emailInput');

form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const name = nameInput.value.trim();
    const group = groupInput.value.trim();
    const idcard = idcardInput.value.trim();
    const birthday = birthdayInput.value.trim();
    const email = emailInput.value.trim();
  
    if (validateForm(name, group, idcard, birthday, email)) {
   
      const newWindow = window.open('', '_blank', 'width=600,height=400');
      newWindow.document.write(`
        <html>
          <head>
            <title>Submitted Data</title>
            <style>
              body { font-family: Montserrat, sans-serif; margin: 20px; }
              h1 { color: #000000; }
              p { margin: 5px 0; }
            </style>
          </head>
          <body>
            <h1>Дані форми</h1>
            <p><strong>ПІБ:</strong> ${name}</p>
            <p><strong>Група:</strong> ${group}</p>
            <p><strong>ID-card:</strong> ${idcard}</p>
            <p><strong>Дата народження:</strong> ${birthday}</p>
            <p><strong>Email:</strong> ${email}</p>
          </body>
        </html>
      `);
      newWindow.document.close();
    } else {
      alert('Будь ласка, перевірте правильність введених даних.');
    }
});
  
function validateForm(name, group, idcard, birthday, email) {
    let isValid = true;
    resetErrorsAndSuccess();

    if (!nameRegex.test(name)) {
        showError(nameInput, 'Неправильний формат ПІБ. Приклад: "Сікорський І.І."');
        isValid = false;
    } else {
        showSuccess(nameInput);
    }

    if (!groupRegex.test(group)) {
        showError(groupInput, 'Неправильний формат групи. Приклад: "IM-23"');
        isValid = false;
    } else {
        showSuccess(groupInput);
    }

    if (!idcardRegex.test(idcard)) {
        showError(idcardInput, 'Неправильний формат ID-карти. Приклад: "ГА №112233"');
        isValid = false;
    } else {
        showSuccess(idcardInput);
    }

    if (!birthdayRegex.test(birthday)) {
        showError(dateOfBirthInput, 'Неправильний формат дати народження. Приклад: "25.05.1889"');
        isValid = false;
    } else {
        showSuccess(dateOfBirthInput);
    }

    if (!emailRegex.test(email)) {
        showError(emailInput, 'Неправильний формат email. Приклад: "sikorsky@kpi.ua"');
        isValid = false;
    } else {
        showSuccess(emailInput);
    }

    return isValid;
}

function showError(inputElement, message) {
    inputElement.classList.add('error');
    alert(message);
}

function showSuccess(inputElement) {
    inputElement.classList.add('success');
}

function resetErrorsAndSuccess() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.classList.remove('success');
    });
}
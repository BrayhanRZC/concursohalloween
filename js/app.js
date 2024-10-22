let form = document.querySelector('.form-register');
let progressOptions = document.querySelectorAll('.progressbar__option');

// Manejador de los botones para avanzar y retroceder entre pasos
form.addEventListener('click', function(e) {
    let el = e.target;
    let isButtonBack = el.classList.contains('step__button--back');
    let isButtonNext = el.classList.contains('step__button--next');
    if (isButtonBack || isButtonNext) {
        let currentStep = document.getElementById('step-' + el.dataset.step);
        let jumpStep = document.getElementById('step-' + el.dataset.to_step);
        currentStep.addEventListener('animationend', function callback() {
            currentStep.classList.remove('active');
            jumpStep.classList.add('active');
            if (isButtonNext) {
                currentStep.classList.add('to-left');
                progressOptions[el.dataset.to_step - 1].classList.add('active');
            } else {
                jumpStep.classList.remove('to-left');
                progressOptions[el.dataset.step - 1].classList.remove('active');
            }
            currentStep.removeEventListener('animationend', callback);
        });
        currentStep.classList.add('inactive');
        jumpStep.classList.remove('inactive');
    }
});

// Enviar la información al webhook
function Enviar() {
    let email = document.getElementById("email").value;
    let nombre = document.getElementById("nombre").value;
    let pregunta1 = document.querySelector('input[name="paso1"]:checked').value;
    let pregunta2 = document.querySelector('input[name="paso2"]:checked').value;
    let pregunta3 = document.querySelector('input[name="paso3"]:checked').value;

    // Verifica que los campos no estén vacíos
    if (nombre && email && pregunta1 && pregunta2 && pregunta3) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Crear el JSON con la información
        let formulario = JSON.stringify({
            "Email": email,
            "Name": nombre,
            "Fields": [
                { "Id": 1, "Name": "NombreUsuario", "Value": nombre },
                { "Id": 2, "Name": "Pregunta1", "Value": pregunta1 },
                { "Id": 3, "Name": "Pregunta2", "Value": pregunta2 },
                { "Id": 4, "Name": "Pregunta3", "Value": pregunta3 }
            ]
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formulario,
            redirect: 'follow'
        };

        // Envía los datos al webhook
        fetch("https://hook.us2.make.com/m8ebk2g5wq9q6jvszwj3kshqomwdm38r", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                alert("¡Registro completado exitosamente!");
            })
            .catch(error => {
                console.log('error', error);
                alert("Hubo un error. Inténtalo de nuevo.");
            });
    } else {
        alert("Por favor, completa todos los campos y selecciona una opción en cada pregunta.");
    }
}


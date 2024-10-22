let form = document.querySelector('.form-register');
let progressOptions = document.querySelectorAll('.progressbar__option');

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

let form = document.querySelector('.form-register');
let progressOptions = document.querySelectorAll('.progressbar__option');

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

function Enviar() {
    let container = document.getElementById('form-register');
    if (pageIsValidContent(container)) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("groupId", "70");

        let formulario = JSON.stringify({
            "Email": document.getElementById("email").value,
            "Name": document.getElementById("nombre").value,
            "MobilePrefix": "57",
            "Fields": [
                {
                    "Id": 1,
                    "Name": "NombreUsuario",
                    "Value": document.getElementById("nombre").value
                },
                {
                    "Id": 20,
                    "Name": "PreguntaDulce",
                    "Value": document.querySelector('input[name="pregunta1"]:checked').value
                },
                {
                    "Id": 31,
                    "Name": "TipoLinea",
                    "Value": document.querySelector('input[name="pregunta2"]:checked').value
                },
                {
                    "Id": 38,
                    "Name": "FraseLorenzano",
                    "Value": document.querySelector('input[name="pregunta3"]:checked').value
                },
                {
                    "Id": 7,
                    "Name": "aceptaTerminos",
                    "Value": 'Si'
                },
                {
                    "Id": 8,
                    "Name": "aceptaContacto",
                    "Value": 'Si'
                },
                {
                    "Id": 30,
                    "Name": "Campaña",
                    "Value": 'Concurso Halloween'
                },
                {
                    "Id": 29,
                    "Name": "Marca",
                    "Value": 'Lorenzano'
                }
            ]
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formulario,
            redirect: 'follow'
        };

        fetch("https://hook.us2.make.com/m8ebk2g5wq9q6jvszwj3kshqomwdm38r", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                location.href = "https://www.lorenzano.co/halloween-gracias-concurso";
            })
            .catch(error => {
                console.log('error', error);
                location.href = "https://www.lorenzano.co/error-404";
            });
    }
}

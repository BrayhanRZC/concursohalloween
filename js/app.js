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
    let formData = new FormData(form); // Usa FormData para manejar todos los datos del formulario
    let fechaHoraActual = new Date();
    formData.append('fecha', fechaHoraActual.toLocaleDateString());
    formData.append('hora', fechaHoraActual.toLocaleTimeString());

    // Mostrar el popup con el spinner y el overlay
    mostrarPopup();

    // Envía los datos al webhook
    fetch("https://hook.us2.make.com/m8ebk2g5wq9q6jvszwj3kshqomwdm38r", {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Envío exitoso');
            window.location.href = 'https://www.lorenzano.co/halloween-gracias-concurso'; // Redirigir en caso de éxito
        } else {
            console.log('No enviado');
            mostrarErrorPopup(); // Muestra popup de error
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarErrorPopup(); // Muestra popup de error
    });
}

// Funciones para mostrar el popup
function mostrarPopup() {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.spinner-popup').style.display = 'block';
    // Ocultar el popup y el overlay después de 6 segundos
    setTimeout(function() {
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.spinner-popup').style.display = 'none';
    }, 6000);
}

function mostrarErrorPopup() {
    const errorPopup = document.querySelector('.error-popup');
    errorPopup.style.display = 'block';
    setTimeout(function() {
        errorPopup.style.display = 'none';
    }, 2000);
}

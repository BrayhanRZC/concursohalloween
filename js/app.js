let form = document.getElementById('form-register');
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

let submitBtn = document.querySelector('.step__button[type="submit"]'); // Selecciona el botón de envío

submitBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Evita el envío por defecto del formulario

    let formData = new FormData(form); // Usa el formulario completo
    let fechaHoraActual = new Date();
    formData.append('fecha', fechaHoraActual.toLocaleDateString());
    formData.append('hora', fechaHoraActual.toLocaleTimeString());

    mostrarPopup(); // Muestra el popup de carga

    // Cambia la URL al proxy de CORS y luego a tu webhook
    fetch('https://cors-anywhere.herokuapp.com/https://hook.us1.make.com/cxndb4giflcolhx6uovzqqe3ttoqv3ds', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        if (response.ok) {
            console.log('Envío exitoso');
            window.location.href = "https://www.lorenzano.co/halloween-gracias-concurso"; // Redirigir en caso de éxito
        } else {
            console.log('No enviado');
            mostrarErrorPopup(); // Muestra popup de error
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
        mostrarErrorPopup(); // Muestra popup de error
    });
});

function mostrarPopup() {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.spinner-popup').style.display = 'block';
    setTimeout(function() {
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.spinner-popup').style.display = 'none';
    }, 6000); // Muestra el spinner por 6 segundos
}

function mostrarErrorPopup() {
    document.querySelector('.error-popup').style.display = 'block';
    setTimeout(function() {
        document.querySelector('.error-popup').style.display = 'none';
    }, 2000); // Oculta el popup de error después de 2 segundos
}

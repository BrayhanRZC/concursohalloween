document.addEventListener('DOMContentLoaded', function() {
    let pasoActual = 1;

    document.querySelectorAll('.step__button--next').forEach(button => {
        button.addEventListener('click', function() {
            if (pasoActual < 4) {
                if (document.querySelectorAll('input[name=paso' + pasoActual + ']:checked').length === 0) {
                    mostrarErrorPopup();
                    return;
                }
                document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
                document.getElementById('step-' + (pasoActual + 1)).style.display = 'block';
                document.querySelector('.step__button--back').style.display = 'block';
                document.querySelectorAll('.progressbar__option.active')[0].classList.remove('active');
                document.querySelectorAll('.progressbar__option')[pasoActual].classList.add('active');
                pasoActual++;

                // Animación GSAP
                gsap.from('#step-' + pasoActual, { opacity: 0, duration: 0.5 });
            }
            if (pasoActual === 4) {
                document.querySelectorAll('.step__button--next').forEach(btn => btn.style.display = 'none');
                document.querySelector('.step__button[type="submit"]').style.display = 'block';
            }
        });
    });

    document.querySelector('.step__button--back').addEventListener('click', function() {
        if (pasoActual > 1) {
            document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
            document.getElementById('step-' + (pasoActual - 1)).style.display = 'block';
            document.querySelector('.step__button[type="submit"]').style.display = 'none';
            document.querySelectorAll('.step__button--next')[0].style.display = 'block';
            document.querySelectorAll('.progressbar__option.active')[0].classList.remove('active');
            document.querySelectorAll('.progressbar__option')[pasoActual - 2].classList.add('active');
            pasoActual--;

            // Animación GSAP
            gsap.from('#step-' + pasoActual, { opacity: 0, duration: 0.5 });
        }
        if (pasoActual === 1) {
            document.querySelector('.step__button--back').style.display = 'none';
        }
    });

    document.getElementById('form-register').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío por defecto del formulario

        let formData = new FormData(this); // Usa el formulario completo
        let fechaHoraActual = new Date();
        formData.append('fecha', fechaHoraActual.toLocaleDateString());
        formData.append('hora', fechaHoraActual.toLocaleTimeString());

        // Mostrar el popup con el spinner y el overlay
        mostrarPopup();

        // Aquí puedes enviar los datos utilizando Fetch API a tu webhook
        fetch('https://hook.us2.make.com/m8ebk2g5wq9q6jvszwj3kshqomwdm38r', {
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
    });

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
});

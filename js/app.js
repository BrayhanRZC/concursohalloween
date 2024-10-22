$(document).ready(function() {
    var pasoActual = 1;

    $('.step__button--next').click(function() {
        if (pasoActual < 4) { // Cambié a 4 para incluir todos los pasos
            if ($('input[name=paso' + pasoActual + ']:checked').length === 0) {
                mostrarErrorPopup();
                return;
            }
            $('.step').hide();
            $('#step-' + (pasoActual + 1)).show();
            $('.step__button--back').show();
            $('.progressbar__option.active').removeClass('active').eq(pasoActual).addClass('active');
            pasoActual++;

            // Animación GSAP
            gsap.from('#step-' + pasoActual, { opacity: 0, duration: 0.5 });
        }
        if (pasoActual === 4) {
            $('.step__button--next').hide();
            $('.step__button[type="submit"]').show().text('Registrarse');
        }
    });

    $('.step__button--back').click(function() {
        if (pasoActual > 1) {
            $('.step').hide();
            $('#step-' + (pasoActual - 1)).show();
            $('.step__button[type="submit"]').hide();
            $('.step__button--next').show();
            $('.progressbar__option.active').removeClass('active').eq(pasoActual - 2).addClass('active');
            pasoActual--;

            // Animación GSAP
            gsap.from('#step-' + pasoActual, { opacity: 0, duration: 0.5 });
        }
        if (pasoActual === 1) {
            $('.step__button--back').hide();
        }
    });

    $('#form-register').on('submit', function(e) {
        e.preventDefault(); // Evita el envío por defecto del formulario

        var data = $(this).serialize(); // Usa el formulario completo
        var fechaHoraActual = new Date();
        data += '&fecha=' + fechaHoraActual.toLocaleDateString() + '&hora=' + fechaHoraActual.toLocaleTimeString();

        // Mostrar el popup con el spinner y el overlay
        mostrarPopup();

        // Aquí puedes enviar los datos utilizando AJAX a tu webhook
        $.post('https://hook.us2.make.com/m8ebk2g5wq9q6jvszwj3kshqomwdm38r', data, function(response) {
            // Manejar la respuesta del webhook si es necesario
            console.log('Envío exitoso', response);
            window.location.href = 'https://www.lorenzano.co/halloween-gracias-concurso'; // Redirigir en caso de éxito
        })
        .fail(function() {
            console.log('No enviado');
            mostrarErrorPopup(); // Muestra popup de error
        });
    });

    function mostrarPopup() {
        $('.overlay').fadeIn();
        $('.spinner-popup').fadeIn();
        // Ocultar el popup y el overlay después de 6 segundos
        setTimeout(function() {
            $('.overlay').fadeOut();
            $('.spinner-popup').fadeOut();
        }, 6000);
    }

    function mostrarErrorPopup() {
        $('.error-popup').fadeIn().delay(2000).fadeOut();
    }
});

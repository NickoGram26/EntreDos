/* ================================================= */
/* ENTRE DOS - HISTORIA */
/* ================================================= */


/* ================================================= */
/* CONFIGURACIÓN SUPABASE */
/* ================================================= */

const SUPABASE_URL =
    "https://kkshmuyqeqljamlqrbov.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_A8yZt3n3V7yi6UTEfvZ5Ew_NNOLnU8g";


const supabaseHistoria =
    window.supabase?.createClient
        ? window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        )
        : null;


/* ================================================= */
/* CARGAR DATOS */
/* ================================================= */

let historia = null;


/* ================================================= */
/* OBTENER SLUG DESDE LA URL */
/* ================================================= */

const parametrosURL =
    new URLSearchParams(
        window.location.search
    );


const slugHistoria =
    parametrosURL.get("historia");


/* ================================================= */
/* ELEMENTOS PRINCIPALES */
/* ================================================= */

const bienvenida =
    document.querySelector("#bienvenida");


const bienvenidaNombre =
    document.querySelector("#bienvenida-nombre");


const botonAbrir =
    document.querySelector("#boton-abrir");


const paginaHistoria =
    document.querySelector("#historia");


const nombreHistoria =
    document.querySelector("#historia-nombre");


const fechaHistoria =
    document.querySelector("#historia-fecha");


const mensajeHistoria =
    document.querySelector("#historia-mensaje");


const galeriaHistoria =
    document.querySelector("#historia-galeria");


const spotifyContenedor =
    document.querySelector("#spotify-contenedor");


/* ================================================= */
/* CONTROLADOR DE SPOTIFY */
/* ================================================= */

let spotifyController = null;


/* ================================================= */
/* CARGAR HISTORIA */
/* ================================================= */

async function cargarHistoria() {

    /*
     * Si existe un slug en la URL,
     * buscamos la historia en Supabase.
     */

    if (
        slugHistoria &&
        supabaseHistoria
    ) {

        console.log(
            "Buscando historia:",
            slugHistoria
        );


        const {
            data,
            error
        } =
            await supabaseHistoria
                .from("historias")
                .select("*")
                .eq(
                    "slug",
                    slugHistoria
                )
                .single();


        if (error) {

            console.error(
                "Error cargando historia desde Supabase:",
                error
            );

        }


        if (data) {

            historia = data;

            console.log(
                "Historia cargada desde Supabase:",
                historia
            );

        }

    }


    /*
     * Si no encontramos una historia
     * mediante la URL, utilizamos el
     * localStorage como respaldo.
     *
     * Esto permite que las historias
     * antiguas sigan funcionando.
     */

    if (!historia) {

        const datosGuardados =
            localStorage.getItem(
                "entreDosHistoria"
            );


        if (datosGuardados) {

            try {

                historia =
                    JSON.parse(
                        datosGuardados
                    );

                console.log(
                    "Historia cargada desde localStorage."
                );

            } catch (error) {

                console.error(
                    "No se pudo leer la historia local:",
                    error
                );

            }

        }

    }


    aplicarHistoria();

}


/* ================================================= */
/* APLICAR DATOS DE LA HISTORIA */
/* ================================================= */

function aplicarHistoria() {

    /* ================================================= */
    /* COMPROBAR DATOS */
    /* ================================================= */

    if (!historia) {

        console.warn(
            "No se encontró una historia."
        );

        return;

    }


    /* ================================================= */
    /* TEMA */
    /* ================================================= */

    if (
        historia.tema &&
        paginaHistoria
    ) {

        paginaHistoria.classList.add(
            "tema-" +
            historia.tema
        );

    }


    /* ================================================= */
    /* NOMBRE */
    /* ================================================= */

    if (
        historia.nombre &&
        historia.nombre.trim() !== ""
    ) {

        if (bienvenidaNombre) {

            bienvenidaNombre.textContent =
                historia.nombre;

        }


        if (nombreHistoria) {

            nombreHistoria.textContent =
                historia.nombre;

        }

    }


    /* ================================================= */
    /* FECHA */
    /* ================================================= */

    if (
        historia.fecha &&
        historia.fecha !== ""
    ) {

        const fechaSeleccionada =
            new Date(
                historia.fecha +
                "T00:00:00"
            );


        const fechaFormateada =
            fechaSeleccionada.toLocaleDateString(
                "es-CL",
                {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }
            );


        if (fechaHistoria) {

            fechaHistoria.textContent =
                "Nuestra historia comenzó el " +
                fechaFormateada;

        }

    }


    /* ================================================= */
    /* MENSAJE */
    /* ================================================= */

    if (
        historia.mensaje &&
        historia.mensaje.trim() !== ""
    ) {

        if (mensajeHistoria) {

            mensajeHistoria.textContent =
                historia.mensaje;

        }

    }


    /* ================================================= */
    /* FOTOS */
    /* ================================================= */

    if (
        historia.fotos &&
        historia.fotos.length > 0 &&
        galeriaHistoria
    ) {

        galeriaHistoria.innerHTML = "";


        historia.fotos.forEach(
            function (foto) {

                const imagen =
                    document.createElement(
                        "img"
                    );


                imagen.src =
                    foto;


                imagen.alt =
                    "Foto de nuestra historia";


                imagen.classList.add(
                    "foto-aparece"
                );


                galeriaHistoria.appendChild(
                    imagen
                );

            }
        );

    }


    /* ================================================= */
    /* SPOTIFY */
    /* ================================================= */

    if (
        historia.spotify &&
        historia.spotify.trim() !== "" &&
        spotifyContenedor
    ) {

        const spotifyScript =
            document.createElement(
                "script"
            );


        spotifyScript.src =
            "https://open.spotify.com/embed/iframe-api/v1";


        spotifyScript.async = true;


        document.body.appendChild(
            spotifyScript
        );


        window.onSpotifyIframeApiReady =
            function (IFrameAPI) {

                const opcionesSpotify = {

                    width: "100%",

                    height: 152,

                    url:
                        historia.spotify

                };


                IFrameAPI.createController(

                    spotifyContenedor,

                    opcionesSpotify,

                    function (
                        EmbedController
                    ) {

                        spotifyController =
                            EmbedController;


                        console.log(
                            "Spotify está listo."
                        );

                    }

                );

            };

    }


    /* ================================================= */
    /* CONTADOR */
    /* ================================================= */

    iniciarContador();


    /*
     * Las fotos pueden haber sido creadas
     * después de que se definió el observador.
     * Por eso volvemos a buscar las imágenes.
     */

    iniciarObservadorFotos();

}


/* ================================================= */
/* SECCIONES */
/* ================================================= */

const seccionesHistoria =
    document.querySelectorAll(
        ".seccion-scroll"
    );


/* ================================================= */
/* REVELAR SECCIONES AL HACER SCROLL */
/* ================================================= */

function revisarSecciones() {

    const limite =
        window.innerHeight * 0.85;


    seccionesHistoria.forEach(
        function (seccion) {

            if (
                seccion.classList.contains(
                    "seccion-visible"
                )
            ) {

                return;

            }


            const posicion =
                seccion.getBoundingClientRect();


            if (
                posicion.top < limite &&
                posicion.bottom > 0
            ) {

                seccion.classList.add(
                    "seccion-visible"
                );

            }

        }
    );

}


/* ================================================= */
/* OBSERVADOR DE FOTOS */
/* ================================================= */

let observadorFotos = null;


function iniciarObservadorFotos() {

    const fotosHistoria =
        document.querySelectorAll(
            ".historia-galeria img"
        );


    if (!observadorFotos) {

        observadorFotos =
            new IntersectionObserver(
                function (entradas) {

                    entradas.forEach(
                        function (entrada) {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.classList.add(
                                    "foto-visible"
                                );


                                observadorFotos.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );

    }


    fotosHistoria.forEach(
        function (foto) {

            observadorFotos.observe(
                foto
            );

        }
    );

}


/* ================================================= */
/* BOTÓN ABRIR HISTORIA */
/* ================================================= */

if (botonAbrir) {

    botonAbrir.addEventListener(
        "click",
        function () {

            /* ========================================= */
            /* OCULTAR BIENVENIDA */
            /* ========================================= */

            if (bienvenida) {

                bienvenida.classList.add(
                    "bienvenida-oculta"
                );

            }


            /* ========================================= */
            /* MOSTRAR HISTORIA */
            /* ========================================= */

            setTimeout(
                function () {

                    if (paginaHistoria) {

                        paginaHistoria.classList.add(
                            "historia-visible"
                        );

                    }


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });


                    /* ================================= */
                    /* MOSTRAR CONTADOR */
                    /* ================================= */

                    const contador =
                        document.querySelector(
                            "#seccion-contador"
                        );


                    if (contador) {

                        contador.classList.add(
                            "seccion-visible"
                        );

                    }


                    /* ================================= */
                    /* REVISAR SECCIONES */
                    /* ================================= */

                    revisarSecciones();


                    /* ================================= */
                    /* ACTIVAR SCROLL */
                    /* ================================= */

                    window.addEventListener(
                        "scroll",
                        revisarSecciones
                    );


                    /* ================================= */
                    /* ACTIVAR FOTOS */
                    /* ================================= */

                    iniciarObservadorFotos();

                },
                700
            );

        }
    );

}


/* ================================================= */
/* REVISAR SECCIONES AL CARGAR */
/* ================================================= */

window.addEventListener(
    "load",
    function () {

        revisarSecciones();

    }
);


/* ================================================= */
/* CONTADOR */
/* ================================================= */

function iniciarContador() {

    if (
        !historia ||
        !historia.fecha
    ) {

        return;

    }


    const contadorAnios =
        document.querySelector(
            "#contador-anios"
        );


    const contadorMeses =
        document.querySelector(
            "#contador-meses"
        );


    const contadorDias =
        document.querySelector(
            "#contador-dias"
        );


    const contadorHoras =
        document.querySelector(
            "#contador-horas"
        );


    const contadorMinutos =
        document.querySelector(
            "#contador-minutos"
        );


    const contadorSegundos =
        document.querySelector(
            "#contador-segundos"
        );


    function actualizarContador() {

        const inicio =
            new Date(
                historia.fecha +
                "T00:00:00"
            );


        const ahora =
            new Date();


        if (ahora < inicio) {

            return;

        }


        /* ========================================= */
        /* AÑOS */
        /* ========================================= */

        let anios =
            ahora.getFullYear() -
            inicio.getFullYear();


        let fechaTemporal =
            new Date(inicio);


        fechaTemporal.setFullYear(
            inicio.getFullYear() +
            anios
        );


        if (
            fechaTemporal > ahora
        ) {

            anios--;


            fechaTemporal =
                new Date(inicio);


            fechaTemporal.setFullYear(
                inicio.getFullYear() +
                anios
            );

        }


        /* ========================================= */
        /* MESES */
        /* ========================================= */

        let meses =
            ahora.getMonth() -
            fechaTemporal.getMonth();


        if (meses < 0) {

            meses += 12;

        }


        let fechaConMeses =
            new Date(
                fechaTemporal
            );


        fechaConMeses.setMonth(
            fechaTemporal.getMonth() +
            meses
        );


        if (
            fechaConMeses > ahora
        ) {

            meses--;


            fechaConMeses =
                new Date(
                    fechaTemporal
                );


            fechaConMeses.setMonth(
                fechaTemporal.getMonth() +
                meses
            );

        }


        /* ========================================= */
        /* DÍAS */
        /* ========================================= */

        const diferenciaDias =
            ahora -
            fechaConMeses;


        const dias =
            Math.floor(
                diferenciaDias /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const fechaConDias =
            new Date(
                fechaConMeses.getTime() +
                dias *
                24 *
                60 *
                60 *
                1000
            );


        /* ========================================= */
        /* HORAS */
        /* ========================================= */

        const diferenciaRestante =
            ahora -
            fechaConDias;


        const horas =
            Math.floor(
                diferenciaRestante /
                (
                    1000 *
                    60 *
                    60
                )
            );


        /* ========================================= */
        /* MINUTOS */
        /* ========================================= */

        const minutos =
            Math.floor(
                (
                    diferenciaRestante %
                    (
                        1000 *
                        60 *
                        60
                    )
                ) /
                (
                    1000 *
                    60
                )
            );


        /* ========================================= */
        /* SEGUNDOS */
        /* ========================================= */

        const segundos =
            Math.floor(
                (
                    diferenciaRestante %
                    (
                        1000 *
                        60
                    )
                ) /
                1000
            );


        /* ========================================= */
        /* MOSTRAR */
        /* ========================================= */

        if (contadorAnios) {

            contadorAnios.textContent =
                anios;

        }


        if (contadorMeses) {

            contadorMeses.textContent =
                meses;

        }


        if (contadorDias) {

            contadorDias.textContent =
                dias;

        }


        if (contadorHoras) {

            contadorHoras.textContent =
                horas;

        }


        if (contadorMinutos) {

            contadorMinutos.textContent =
                minutos;

        }


        if (contadorSegundos) {

            contadorSegundos.textContent =
                segundos;

        }

    }


    actualizarContador();


    setInterval(
        actualizarContador,
        1000
    );

}


/* ================================================= */
/* INICIAR CARGA DE HISTORIA */
/* ================================================= */

cargarHistoria();
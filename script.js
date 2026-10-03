document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ELEMENTOS
    // =========================================

    const nombreInput =
        document.getElementById("nombre");

    const fechaInput =
        document.getElementById("fecha");

    const mensajeInput =
        document.getElementById("mensaje");

    const fotosInput =
        document.getElementById("fotos");

    const spotifyInput =
        document.getElementById("spotify");


    const previaNombre =
        document.getElementById("previa-nombre");

    const previaFecha =
        document.getElementById("previa-fecha");

    const previaMensaje =
        document.getElementById("previa-mensaje");

    const galeriaPrevia =
        document.getElementById("galeria-previa");


    const tarjetaPrevia =
        document.getElementById("tarjeta-previa") ||
        document.querySelector(".tarjeta-previa");


    const previaSpotify =
        document.getElementById("previa-spotify");


    const previaTema =
        document.getElementById("previa-tema");


    const botonesTema =
        document.querySelectorAll(".tema");


    let fotosSeleccionadas = [];

    let temaSeleccionado = "clasico";


    // =========================================
    // BOTÓN "CREAR MI HISTORIA" DE LA PORTADA
    // =========================================

    const botonPortada =
        document.querySelector(".portada .boton");


    if (botonPortada) {

        botonPortada.addEventListener("click", () => {

            const creador =
                document.getElementById("creador");

            if (creador) {

                creador.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    }


    // =========================================
    // GALERÍA DE VISTA PREVIA
    // =========================================

    if (galeriaPrevia) {

        galeriaPrevia.classList.add(
            "galeria-previa"
        );

    }


    // =========================================
    // NOMBRE
    // =========================================

    if (nombreInput) {

        nombreInput.addEventListener("input", () => {

            const nombre =
                nombreInput.value.trim() ||
                "Tu persona especial";

            if (previaNombre) {

                previaNombre.textContent =
                    nombre;

            }

        });

    }


    // =========================================
    // FECHA
    // =========================================

    if (fechaInput) {

        fechaInput.addEventListener("input", () => {

            if (!previaFecha) return;

            if (!fechaInput.value) {

                previaFecha.textContent =
                    "Nuestra historia comienza aquí";

                return;

            }


            const fecha =
                new Date(
                    fechaInput.value +
                    "T00:00:00"
                );


            previaFecha.textContent =
                fecha.toLocaleDateString(
                    "es-CL",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );

        });

    }


    // =========================================
    // MENSAJE
    // =========================================

    if (mensajeInput) {

        mensajeInput.addEventListener("input", () => {

            if (!previaMensaje) return;

            previaMensaje.textContent =
                mensajeInput.value.trim() ||
                "Tu mensaje aparecerá aquí...";

        });

    }


    // =========================================
    // SPOTIFY
    // =========================================

    if (spotifyInput) {

        spotifyInput.addEventListener("input", () => {

            if (!previaSpotify) return;

            previaSpotify.textContent =
                spotifyInput.value.trim()
                    ? "🎵 Canción agregada"
                    : "🎵 Aquí aparecerá tu canción";

        });

    }


    // =========================================
    // FOTOS
    // =========================================

    if (fotosInput) {

        fotosInput.addEventListener("change", () => {

            fotosSeleccionadas = [];


            if (galeriaPrevia) {

                galeriaPrevia.innerHTML = "";

                galeriaPrevia.classList.add(
                    "galeria-previa"
                );

            }


            const archivos =
                Array.from(
                    fotosInput.files
                );


            archivos.forEach((archivo) => {

                const lector =
                    new FileReader();


                lector.onload = (evento) => {

                    fotosSeleccionadas.push(
                        evento.target.result
                    );


                    if (!galeriaPrevia) return;


                    const imagen =
                        document.createElement(
                            "img"
                        );


                    imagen.src =
                        evento.target.result;


                    imagen.alt =
                        "Foto de la historia";


                    galeriaPrevia.appendChild(
                        imagen
                    );

                };


                lector.readAsDataURL(
                    archivo
                );

            });

        });

    }


    // =========================================
    // CAMBIO DE TEMA
    // =========================================

    function actualizarTemaPreview(tema) {

        temaSeleccionado = tema;

        if (!tarjetaPrevia) return;


        const elementosTexto =
            tarjetaPrevia.querySelectorAll(
                "h3, p, span, div"
            );


        // =====================================
        // CLÁSICO
        // =====================================

        if (tema === "clasico") {

            tarjetaPrevia.style.background =
                "linear-gradient(145deg, #fff0f4 0%, #ffd1dc 100%)";

            tarjetaPrevia.style.color =
                "#6b2638";

            tarjetaPrevia.style.border =
                "2px solid #d94f70";

            tarjetaPrevia.style.boxShadow =
                "0 18px 45px rgba(217, 79, 112, 0.25)";


            elementosTexto.forEach((elemento) => {

                elemento.style.color =
                    "#6b2638";

            });


            if (previaNombre) {

                previaNombre.style.color =
                    "#8f2945";

            }


            if (previaMensaje) {

                previaMensaje.style.color =
                    "#6b2638";

            }


            if (previaTema) {

                previaTema.textContent =
                    "🌹 Clásico";

            }

        }


        // =====================================
        // NOCHE
        // =====================================

        if (tema === "noche") {

            tarjetaPrevia.style.background =
                "linear-gradient(145deg, #120f20 0%, #3d2850 100%)";

            tarjetaPrevia.style.color =
                "#f8efff";

            tarjetaPrevia.style.border =
                "2px solid #a979c9";

            tarjetaPrevia.style.boxShadow =
                "0 20px 55px rgba(20, 10, 35, 0.45)";


            elementosTexto.forEach((elemento) => {

                elemento.style.color =
                    "#f8efff";

            });


            if (previaNombre) {

                previaNombre.style.color =
                    "#ffd6f1";

            }


            if (previaMensaje) {

                previaMensaje.style.color =
                    "#f8efff";

            }


            if (previaTema) {

                previaTema.textContent =
                    "🌙 Noche";

            }

        }


        // =====================================
        // SUAVE
        // =====================================

        if (tema === "suave") {

            tarjetaPrevia.style.background =
                "linear-gradient(145deg, #fffaf0 0%, #ead8c8 100%)";

            tarjetaPrevia.style.color =
                "#5c4638";

            tarjetaPrevia.style.border =
                "2px solid #b99b83";

            tarjetaPrevia.style.boxShadow =
                "0 18px 45px rgba(100, 75, 55, 0.18)";


            elementosTexto.forEach((elemento) => {

                elemento.style.color =
                    "#5c4638";

            });


            if (previaNombre) {

                previaNombre.style.color =
                    "#805b45";

            }


            if (previaMensaje) {

                previaMensaje.style.color =
                    "#5c4638";

            }


            if (previaTema) {

                previaTema.textContent =
                    "🌸 Suave";

            }

        }

    }


    // =========================================
    // BOTONES DE TEMA
    // =========================================

    botonesTema.forEach((boton) => {

        boton.addEventListener("click", () => {

            botonesTema.forEach((otroBoton) => {

                otroBoton.classList.remove(
                    "activo"
                );

            });


            boton.classList.add("activo");


            const tema =
                boton.dataset.tema ||
                "clasico";


            actualizarTemaPreview(
                tema
            );

        });

    });


    // =========================================
    // CREAR OBJETO DE HISTORIA
    // =========================================

    function obtenerHistoria() {

        return {

            nombre:
                nombreInput?.value.trim() ||
                "Tu persona especial",

            fecha:
                fechaInput?.value ||
                "",

            mensaje:
                mensajeInput?.value.trim() ||
                "Tu mensaje aparecerá aquí...",

            fotos:
                fotosSeleccionadas,

            spotify:
                spotifyInput?.value.trim() ||
                "",

            tema:
                temaSeleccionado

        };

    }


    // =========================================
    // GUARDAR HISTORIA LOCALMENTE
    // =========================================

    function guardarHistoriaLocal() {

        const historia =
            obtenerHistoria();


        localStorage.setItem(
            "entreDosHistoria",
            JSON.stringify(historia)
        );


        return historia;

    }


    // =========================================
    // GENERAR SLUG
    // =========================================

    function generarSlug() {

        const nombre =
            nombreInput?.value.trim() ||
            "historia";


        const nombreLimpio =
            nombre
                .toLowerCase()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )
                .replace(
                    /[^a-z0-9]+/g,
                    "-"
                )
                .replace(
                    /^-+|-+$/g,
                    ""
                );


        const identificador =
            crypto.randomUUID()
                .split("-")[0];


        return (
            (nombreLimpio || "historia") +
            "-" +
            identificador
        );

    }


    // =========================================
    // GUARDAR EN SUPABASE
    // =========================================

    async function guardarHistoriaSupabase() {

        const historia =
            obtenerHistoria();


        // La tabla de Supabase necesita una fecha.

        if (!historia.fecha) {

            alert(
                "Selecciona la fecha en que comenzó su historia ❤️"
            );

            return null;

        }


        if (
            !window.supabaseClient
        ) {

            console.error(
                "Supabase no está conectado."
            );

            alert(
                "No se pudo conectar con EntreDos. Revisa la conexión con Supabase."
            );

            return null;

        }


        const slug =
            generarSlug();


        const datosSupabase = {

            slug: slug,

            nombre:
                historia.nombre,

            fecha:
                historia.fecha,

            mensaje:
                historia.mensaje,

            spotify:
                historia.spotify,

            tema:
                historia.tema,

            fotos:
                historia.fotos

        };


        const {
            data,
            error
        } =
            await window.supabaseClient
                .from("historias")
                .insert(
                    [datosSupabase]
                )
                .select()
                .single();


        if (error) {

            console.error(
                "Error guardando historia:",
                error
            );

            alert(
                "No se pudo guardar la historia en EntreDos.\n\n" +
                error.message
            );

            return null;

        }


        console.log(
            "Historia guardada en Supabase:",
            data
        );


        return data;

    }


    // =========================================
    // BOTÓN CONTINUAR
    // =========================================

    const botonCrear =
        document.querySelector(
            ".crear-pagina"
        );


    if (botonCrear) {

        botonCrear.addEventListener(
            "click",
            () => {

                guardarHistoriaLocal();


                const personalizador =
                    document.getElementById(
                        "personalizador"
                    );


                if (personalizador) {

                    personalizador.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    // =========================================
    // CREAR MI PÁGINA
    // =========================================

    const botonFinal =
        document.querySelector(
            ".crear-final"
        );


    if (botonFinal) {

        botonFinal.addEventListener(
            "click",
            async () => {

                // Guardamos también localmente
                // para mantener el funcionamiento
                // actual de historia.html.

                guardarHistoriaLocal();


                // Evitamos múltiples clics
                // mientras se guarda.

                botonFinal.disabled = true;

                const textoOriginal =
                    botonFinal.textContent;


                botonFinal.textContent =
                    "Guardando tu historia... ❤️";


                const historiaGuardada =
                    await guardarHistoriaSupabase();


                if (!historiaGuardada) {

                    botonFinal.disabled = false;

                    botonFinal.textContent =
                        textoOriginal;

                    return;

                }


                // Guardamos el slug localmente
                // para utilizarlo en el siguiente
                // paso del proyecto.

                localStorage.setItem(
                    "entreDosSlug",
                    historiaGuardada.slug
                );


                // Por ahora historia.html
                // seguirá funcionando con
                // localStorage.

                window.location.href =
                    "historia.html?historia=" +
                    encodeURIComponent(
                        historiaGuardada.slug
                    );

            }
        );

    }


    // =========================================
    // TEMA INICIAL
    // =========================================

    actualizarTemaPreview(
        "clasico"
    );

});
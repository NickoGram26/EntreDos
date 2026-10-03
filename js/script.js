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


        // Las fotos se guardan directamente en Supabase.
        // No las almacenamos en localStorage porque en celulares
        // pueden superar rápidamente el límite de almacenamiento.

        const historiaLocal = {

            ...historia,

            fotos: []

        };


        try {

            localStorage.setItem(
                "entreDosHistoria",
                JSON.stringify(historiaLocal)
            );

        } catch (error) {

            console.warn(
                "No se pudo guardar la historia localmente:",
                error
            );

        }


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
    // MOSTRAR RESULTADO DE HISTORIA CREADA
    // =========================================

    function mostrarHistoriaCreada(urlHistoria) {

        const overlay =
            document.createElement("div");


        overlay.id =
            "entre-dos-resultado";


        overlay.innerHTML = `

            <div class="entre-dos-resultado-contenido">

                <div class="entre-dos-resultado-corazon">
                    ❤️
                </div>

                <h2>
                    ¡Tu historia está lista!
                </h2>

                <p>
                    Ahora puedes enviársela a esa persona especial.
                </p>

                <div class="entre-dos-link-box">

                    <input
                        type="text"
                        value="${urlHistoria}"
                        readonly
                        id="entre-dos-link"
                    >

                    <button
                        type="button"
                        id="entre-dos-copiar"
                    >
                        📋 Copiar enlace
                    </button>

                </div>

                <p
                    id="entre-dos-copiado"
                    class="entre-dos-copiado"
                >
                </p>

                <div class="entre-dos-acciones">

                    <button
                        type="button"
                        id="entre-dos-abrir"
                    >
                        ❤️ Abrir historia
                    </button>

                    <button
                        type="button"
                        id="entre-dos-cerrar"
                    >
                        Crear otra historia
                    </button>

                </div>

            </div>

        `;


        const estilos =
            document.createElement("style");


        estilos.textContent = `

            #entre-dos-resultado {

                position: fixed;
                inset: 0;
                z-index: 99999;

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 20px;

                background:
                    rgba(40, 10, 25, 0.72);

                backdrop-filter:
                    blur(10px);

                -webkit-backdrop-filter:
                    blur(10px);

                opacity: 0;

                animation:
                    entreDosAparecer
                    0.35s ease forwards;

            }


            .entre-dos-resultado-contenido {

                width: 100%;
                max-width: 560px;

                box-sizing: border-box;

                padding: 38px 30px;

                text-align: center;

                background:
                    linear-gradient(
                        145deg,
                        #fff8fa 0%,
                        #ffe7ed 100%
                    );

                border:
                    1px solid rgba(217, 79, 112, 0.25);

                border-radius:
                    28px;

                box-shadow:
                    0 25px 80px
                    rgba(80, 20, 40, 0.35);

                transform:
                    translateY(20px)
                    scale(0.97);

                animation:
                    entreDosSubir
                    0.4s ease
                    0.05s forwards;

            }


            .entre-dos-resultado-corazon {

                font-size: 42px;

                margin-bottom: 8px;

            }


            .entre-dos-resultado-contenido h2 {

                margin:
                    0 0 10px;

                color:
                    #8f2945;

                font-size:
                    30px;

            }


            .entre-dos-resultado-contenido > p {

                margin:
                    0 auto 24px;

                max-width:
                    420px;

                color:
                    #6b2638;

                line-height:
                    1.6;

                font-size:
                    16px;

            }


            .entre-dos-link-box {

                display:
                    flex;

                flex-direction:
                    column;

                gap:
                    10px;

                width:
                    100%;

                margin-bottom:
                    12px;

            }


            #entre-dos-link {

                width:
                    100%;

                box-sizing:
                    border-box;

                padding:
                    14px 16px;

                border:
                    1px solid
                    rgba(143, 41, 69, 0.22);

                border-radius:
                    14px;

                background:
                    #ffffff;

                color:
                    #5c2636;

                font-size:
                    14px;

                text-align:
                    center;

                outline:
                    none;

            }


            #entre-dos-copiar {

                width:
                    100%;

                border:
                    none;

                border-radius:
                    14px;

                padding:
                    14px 18px;

                background:
                    #d94f70;

                color:
                    white;

                font-size:
                    16px;

                font-weight:
                    600;

                cursor:
                    pointer;

                transition:
                    transform 0.2s ease,
                    box-shadow 0.2s ease;

            }


            #entre-dos-copiar:hover {

                transform:
                    translateY(-2px);

                box-shadow:
                    0 8px 20px
                    rgba(217, 79, 112, 0.3);

            }


            #entre-dos-copiar.copiado {

                background:
                    #7dba8a;

            }


            .entre-dos-copiado {

                min-height:
                    24px;

                margin:
                    0 0 8px !important;

                color:
                    #4d8c5c !important;

                font-size:
                    14px !important;

            }


            .entre-dos-acciones {

                display:
                    flex;

                flex-direction:
                    column;

                gap:
                    10px;

                margin-top:
                    8px;

            }


            #entre-dos-abrir {

                width:
                    100%;

                border:
                    none;

                border-radius:
                    14px;

                padding:
                    14px 18px;

                background:
                    #8f2945;

                color:
                    white;

                font-size:
                    16px;

                font-weight:
                    600;

                cursor:
                    pointer;

                transition:
                    transform 0.2s ease,
                    box-shadow 0.2s ease;

            }


            #entre-dos-abrir:hover {

                transform:
                    translateY(-2px);

                box-shadow:
                    0 8px 20px
                    rgba(143, 41, 69, 0.28);

            }


            #entre-dos-cerrar {

                border:
                    none;

                background:
                    transparent;

                color:
                    #8f2945;

                font-size:
                    14px;

                cursor:
                    pointer;

                padding:
                    8px;

            }


            @keyframes entreDosAparecer {

                from {
                    opacity: 0;
                }

                to {
                    opacity: 1;
                }

            }


            @keyframes entreDosSubir {

                from {

                    transform:
                        translateY(20px)
                        scale(0.97);

                }

                to {

                    transform:
                        translateY(0)
                        scale(1);

                }

            }


            @media (max-width: 500px) {

                .entre-dos-resultado-contenido {

                    padding:
                        30px 20px;

                    border-radius:
                        22px;

                }


                .entre-dos-resultado-contenido h2 {

                    font-size:
                        25px;

                }


                #entre-dos-link {

                    font-size:
                        12px;

                }

            }

        `;


        document.head.appendChild(
            estilos
        );


        document.body.appendChild(
            overlay
        );


        // =====================================
        // COPIAR ENLACE
        // =====================================

        const botonCopiar =
            document.getElementById(
                "entre-dos-copiar"
            );


        const campoEnlace =
            document.getElementById(
                "entre-dos-link"
            );


        const mensajeCopiado =
            document.getElementById(
                "entre-dos-copiado"
            );


        if (botonCopiar) {

            botonCopiar.addEventListener(
                "click",
                async () => {

                    try {

                        await navigator.clipboard.writeText(
                            urlHistoria
                        );


                        botonCopiar.textContent =
                            "✅ ¡Enlace copiado!";

                        botonCopiar.classList.add(
                            "copiado"
                        );


                        if (mensajeCopiado) {

                            mensajeCopiado.textContent =
                                "Ya puedes pegarlo en WhatsApp, Instagram o donde quieras ❤️";

                        }

                    } catch (error) {

                        if (campoEnlace) {

                            campoEnlace.select();
                            campoEnlace.setSelectionRange(
                                0,
                                99999
                            );

                        }

                        document.execCommand(
                            "copy"
                        );


                        botonCopiar.textContent =
                            "✅ ¡Enlace copiado!";

                        botonCopiar.classList.add(
                            "copiado"
                        );

                    }

                }
            );

        }


        // =====================================
        // ABRIR HISTORIA
        // =====================================

        const botonAbrir =
            document.getElementById(
                "entre-dos-abrir"
            );


        if (botonAbrir) {

            botonAbrir.addEventListener(
                "click",
                () => {

                    window.location.href =
                        urlHistoria;

                }
            );

        }


        // =====================================
        // CREAR OTRA HISTORIA
        // =====================================

        const botonCerrar =
            document.getElementById(
                "entre-dos-cerrar"
            );


        if (botonCerrar) {

            botonCerrar.addEventListener(
                "click",
                () => {

                    overlay.remove();

                    estilos.remove();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }


        // Seleccionamos automáticamente
        // el enlace para facilitar su copia.

        if (campoEnlace) {

            campoEnlace.addEventListener(
                "click",
                () => {

                    campoEnlace.select();

                }
            );

        }

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


                // Guardamos el slug localmente.

                localStorage.setItem(
                    "entreDosSlug",
                    historiaGuardada.slug
                );


                // =====================================
                // GENERAR ENLACE PARA COMPARTIR
                // =====================================

                const urlHistoria =
                    new URL(
                        "historia.html?historia=" +
                        encodeURIComponent(
                            historiaGuardada.slug
                        ),
                        window.location.href
                    ).href;


                // Restauramos el botón.

                botonFinal.disabled = false;

                botonFinal.textContent =
                    textoOriginal;


                // Mostramos el enlace.

                mostrarHistoriaCreada(
                    urlHistoria
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

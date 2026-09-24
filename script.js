import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';


// ======================================================
// ESCENA
// ======================================================

const canvas = document.getElementById("universo");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x010107);

scene.fog = new THREE.FogExp2(
    0x010107,
    0.00022
);


// ======================================================
// CÁMARA
// ======================================================

const camera = new THREE.PerspectiveCamera(
    58,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);

camera.position.set(
    0,
    32,
    155
);


// ======================================================
// RENDER
// ======================================================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;


// ======================================================
// ILUMINACIÓN
// ======================================================

const luzAmbiente =
    new THREE.AmbientLight(
        0x5b5268,
        1.5
    );

scene.add(luzAmbiente);


// Luz principal cálida

const luzEstrella =
    new THREE.PointLight(
        0xffd7a0,
        25,
        1100
    );

luzEstrella.position.set(
    0,
    0,
    0
);

scene.add(luzEstrella);


// Luz blanca lateral

const luzBlanca =
    new THREE.PointLight(
        0xffffff,
        4,
        700
    );

luzBlanca.position.set(
    -180,
    100,
    180
);

scene.add(luzBlanca);


// Luz azul ambiental

const luzAzul =
    new THREE.PointLight(
        0x5577bb,
        2,
        900
    );

luzAzul.position.set(
    250,
    80,
    -300
);

scene.add(luzAzul);


// ======================================================
// ESTRELLAS
// ======================================================

function crearEstrellas(
    cantidad,
    radioMin,
    radioMax,
    tamaño,
    color,
    opacidad
) {

    const posiciones =
        new Float32Array(
            cantidad * 3
        );

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const radio =
            radioMin +
            Math.random() *
            (radioMax - radioMin);

        const theta =
            Math.random() *
            Math.PI * 2;

        const phi =
            Math.acos(
                2 * Math.random() - 1
            );

        posiciones[i * 3] =
            radio *
            Math.sin(phi) *
            Math.cos(theta);

        posiciones[i * 3 + 1] =
            radio *
            Math.cos(phi);

        posiciones[i * 3 + 2] =
            radio *
            Math.sin(phi) *
            Math.sin(theta);
    }

    const geometria =
        new THREE.BufferGeometry();

    geometria.setAttribute(
        "position",
        new THREE.BufferAttribute(
            posiciones,
            3
        )
    );

    const material =
        new THREE.PointsMaterial({

            color: color,

            size: tamaño,

            transparent: true,

            opacity: opacidad,

            sizeAttenuation: true,

            depthWrite: false

        });

    const estrellas =
        new THREE.Points(
            geometria,
            material
        );

    scene.add(estrellas);

    return estrellas;
}


// Fondo profundo

const estrellas =
    crearEstrellas(
        24000,
        250,
        1300,
        0.75,
        0xffffff,
        0.9
    );


// Estrellas pequeñas cercanas

const estrellasPequenas =
    crearEstrellas(
        8000,
        170,
        750,
        0.42,
        0xdedede,
        0.55
    );


// Estrellas cálidas

const estrellasCalidas =
    crearEstrellas(
        1200,
        350,
        1100,
        0.9,
        0xffd9ad,
        0.55
    );


// Estrellas azuladas

const estrellasAzules =
    crearEstrellas(
        1000,
        400,
        1200,
        0.8,
        0xa8c8ff,
        0.4
    );


// ======================================================
// NEBULOSAS
// ======================================================

function crearTexturaNebulosa(
    color1,
    color2,
    color3
) {

    const canvasNebula =
        document.createElement("canvas");

    canvasNebula.width = 1024;
    canvasNebula.height = 1024;

    const ctx =
        canvasNebula.getContext("2d");

    const gradient =
        ctx.createRadialGradient(
            512,
            512,
            0,
            512,
            512,
            512
        );

    gradient.addColorStop(
        0,
        color1
    );

    gradient.addColorStop(
        0.35,
        color2
    );

    gradient.addColorStop(
        0.70,
        color3
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        1024,
        1024
    );

    return new THREE.CanvasTexture(
        canvasNebula
    );
}


function crearNebulosa(
    x,
    y,
    z,
    escalaX,
    escalaY,
    color1,
    color2,
    color3,
    rotacion,
    opacidad
) {

    const textura =
        crearTexturaNebulosa(
            color1,
            color2,
            color3
        );

    const material =
        new THREE.SpriteMaterial({

            map: textura,

            transparent: true,

            opacity: opacidad,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });

    const nebulosa =
        new THREE.Sprite(
            material
        );

    nebulosa.position.set(
        x,
        y,
        z
    );

    nebulosa.scale.set(
        escalaX,
        escalaY,
        1
    );

    nebulosa.material.rotation =
        rotacion;

    scene.add(nebulosa);

    return nebulosa;
}


// Morado

const nebulosaMorada =
    crearNebulosa(
        -360,
        120,
        -600,
        650,
        320,
        "rgba(105,65,150,0.30)",
        "rgba(65,35,100,0.16)",
        "rgba(20,10,40,0.03)",
        0.35,
        0.42
    );


// Azul

const nebulosaAzul =
    crearNebulosa(
        360,
        -100,
        -650,
        700,
        340,
        "rgba(50,90,160,0.25)",
        "rgba(20,45,100,0.14)",
        "rgba(5,15,40,0.03)",
        -0.25,
        0.38
    );


// Rojo

const nebulosaRoja =
    crearNebulosa(
        40,
        180,
        -800,
        550,
        280,
        "rgba(150,55,60,0.20)",
        "rgba(70,20,30,0.10)",
        "rgba(25,5,10,0.02)",
        0.1,
        0.28
    );


// ======================================================
// ESTRELLA CENTRAL
// ======================================================

const sol =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            7,
            96,
            96
        ),

        new THREE.MeshBasicMaterial({
            color: 0xffd58f
        })
    );

scene.add(sol);


// ======================================================
// CORONA DE LA ESTRELLA
// ======================================================

function crearCorona(
    escala,
    opacidad
) {

    const textura =
        crearTexturaNebulosa(

            "rgba(255,255,230,1)",

            "rgba(255,190,90,0.45)",

            "rgba(255,80,20,0)"

        );

    const material =
        new THREE.SpriteMaterial({

            map: textura,

            transparent: true,

            opacity: opacidad,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });

    const corona =
        new THREE.Sprite(
            material
        );

    corona.scale.set(
        escala,
        escala,
        1
    );

    scene.add(corona);

    return corona;
}


const coronaGrande =
    crearCorona(
        58,
        0.55
    );


const coronaPequena =
    crearCorona(
        30,
        0.75
    );


// ======================================================
// PLANETAS
// ======================================================

function crearPlaneta(
    tamaño,
    color,
    distancia,
    velocidad,
    inclinacion,
    rotacion
) {

    const planeta =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                tamaño,
                64,
                64
            ),

            new THREE.MeshStandardMaterial({

                color: color,

                roughness: 0.78,

                metalness: 0,

                emissive:
                    new THREE.Color(
                        color
                    ),

                emissiveIntensity:
                    0.045

            })
        );


    planeta.userData.angulo =
        Math.random() *
        Math.PI *
        2;

    planeta.userData.distancia =
        distancia;

    planeta.userData.velocidad =
        velocidad;

    planeta.userData.inclinacion =
        inclinacion;

    planeta.userData.rotacion =
        rotacion;


    scene.add(planeta);

    return planeta;
}


// ======================================================
// PLANETAS
// ======================================================

// Mercurio

const planeta1 =
    crearPlaneta(
        3.2,
        0xa9a7a1,
        24,
        0.012,
        0.08,
        0.008
    );


// Venus

const planeta2 =
    crearPlaneta(
        5,
        0xcbb67e,
        40,
        0.009,
        -0.12,
        0.006
    );


// Tierra

const planeta3 =
    crearPlaneta(
        3.5,
        0x4777a7,
        57,
        0.007,
        0.18,
        0.012
    );


// Marte

const planeta4 =
    crearPlaneta(
        4,
        0xa85e4c,
        72,
        0.006,
        -0.16,
        0.010
    );


// Júpiter

const planeta5 =
    crearPlaneta(
        8,
        0xb38e69,
        94,
        0.0048,
        0.10,
        0.014
    );


// Saturno

const planeta6 =
    crearPlaneta(
        6.5,
        0xc4aa7d,
        117,
        0.0038,
        -0.10,
        0.012
    );


// Urano

const planeta7 =
    crearPlaneta(
        4.7,
        0x79aaa9,
        140,
        0.003,
        0.15,
        0.009
    );


// Neptuno

const planeta8 =
    crearPlaneta(
        4.7,
        0x4d70ad,
        162,
        0.0024,
        -0.08,
        0.008
    );


// ======================================================
// ATMÓSFERAS
// ======================================================

function crearAtmosfera(
    planeta,
    color,
    escala,
    opacidad
) {

    const geometria =
        new THREE.SphereGeometry(
            planeta.geometry.parameters.radius * escala,
            48,
            48
        );

    const material =
        new THREE.MeshBasicMaterial({

            color: color,

            transparent: true,

            opacity: opacidad,

            blending:
                THREE.AdditiveBlending,

            side:
                THREE.BackSide,

            depthWrite: false

        });

    const atmosfera =
        new THREE.Mesh(
            geometria,
            material
        );

    planeta.add(atmosfera);

    return atmosfera;
}


// Tierra

crearAtmosfera(
    planeta3,
    0x5ca8ff,
    1.13,
    0.20
);


// Venus

crearAtmosfera(
    planeta2,
    0xe7c27e,
    1.10,
    0.12
);


// Neptuno

crearAtmosfera(
    planeta8,
    0x5e8fff,
    1.12,
    0.16
);


// ======================================================
// ANILLOS
// ======================================================

function crearAnillos(
    planeta,
    interno,
    externo,
    color,
    opacidad,
    inclinacion
) {

    const geometria =
        new THREE.RingGeometry(
            interno,
            externo,
            160
        );

    const material =
        new THREE.MeshBasicMaterial({

            color: color,

            side:
                THREE.DoubleSide,

            transparent: true,

            opacity: opacidad

        });

    const anillo =
        new THREE.Mesh(
            geometria,
            material
        );

    anillo.rotation.x =
        Math.PI / 2;

    anillo.rotation.z =
        inclinacion;

    planeta.add(anillo);

    return anillo;
}


// Saturno

const anillosSaturno =
    crearAnillos(
        planeta6,
        8.5,
        14,
        0xd6d0bf,
        0.72,
        0.20
    );


// Júpiter

crearAnillos(
    planeta5,
    9,
    11,
    0xb9a994,
    0.16,
    0.12
);


// Urano

crearAnillos(
    planeta7,
    6.5,
    9,
    0xb8cece,
    0.30,
    0.20
);


// ======================================================
// LUNAS
// ======================================================

function crearLuna(
    planeta,
    distancia,
    tamaño,
    velocidad
) {

    const orbita =
        new THREE.Object3D();

    planeta.add(orbita);


    const luna =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                tamaño,
                32,
                32
            ),

            new THREE.MeshStandardMaterial({

                color: 0xbdbdb8,

                roughness: 0.92

            })
        );

    luna.position.x =
        distancia;

    orbita.add(luna);


    orbita.userData.velocidad =
        velocidad;


    return orbita;
}


const luna1 =
    crearLuna(
        planeta3,
        7,
        0.8,
        0.025
    );


const luna2 =
    crearLuna(
        planeta4,
        7,
        0.65,
        0.030
    );


const luna3 =
    crearLuna(
        planeta5,
        11,
        1,
        0.020
    );


const luna4 =
    crearLuna(
        planeta6,
        13,
        1.1,
        0.015
    );


// ======================================================
// ÓRBITAS
// ======================================================

function crearOrbita(
    radio,
    inclinacion
) {

    const puntos = [];

    const segmentos = 300;

    for (
        let i = 0;
        i <= segmentos;
        i++
    ) {

        const angulo =
            (i / segmentos) *
            Math.PI * 2;

        puntos.push(

            new THREE.Vector3(

                Math.cos(angulo) *
                    radio,

                0,

                Math.sin(angulo) *
                    radio

            )

        );
    }


    const geometria =
        new THREE.BufferGeometry()
            .setFromPoints(
                puntos
            );


    const material =
        new THREE.LineBasicMaterial({

            color: 0xffffff,

            transparent: true,

            opacity: 0.28

        });


    const linea =
        new THREE.LineLoop(
            geometria,
            material
        );

    linea.rotation.z =
        inclinacion;

    scene.add(linea);

    return linea;
}


const orbitas = [];


orbitas.push(
    crearOrbita(
        24,
        0.08
    )
);


orbitas.push(
    crearOrbita(
        40,
        -0.12
    )
);


orbitas.push(
    crearOrbita(
        57,
        0.18
    )
);


orbitas.push(
    crearOrbita(
        72,
        -0.16
    )
);


orbitas.push(
    crearOrbita(
        94,
        0.10
    )
);


orbitas.push(
    crearOrbita(
        117,
        -0.10
    )
);


orbitas.push(
    crearOrbita(
        140,
        0.15
    )
);


orbitas.push(
    crearOrbita(
        162,
        -0.08
    )
);


// ======================================================
// CINTURÓN DE ASTEROIDES
// ======================================================

function crearCinturonAsteroides() {

    const cantidad = 1800;

    const posiciones =
        new Float32Array(
            cantidad * 3
        );

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const radio =
            78 +
            Math.random() *
            12;

        const angulo =
            Math.random() *
            Math.PI * 2;

        posiciones[i * 3] =
            Math.cos(angulo) *
            radio;

        posiciones[i * 3 + 1] =
            (Math.random() - 0.5) *
            8;

        posiciones[i * 3 + 2] =
            Math.sin(angulo) *
            radio;
    }


    const geometria =
        new THREE.BufferGeometry();

    geometria.setAttribute(
        "position",
        new THREE.BufferAttribute(
            posiciones,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color: 0xc7c0b6,

            size: 0.38,

            transparent: true,

            opacity: 0.65

        });


    const asteroides =
        new THREE.Points(
            geometria,
            material
        );

    scene.add(asteroides);

    return asteroides;
}


const asteroides =
    crearCinturonAsteroides();


// ======================================================
// POLVO CÓSMICO
// ======================================================

function crearPolvoCosmico() {

    const cantidad = 7000;

    const posiciones =
        new Float32Array(
            cantidad * 3
        );

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const radio =
            30 +
            Math.random() *
            340;

        const angulo =
            Math.random() *
            Math.PI * 2;

        posiciones[i * 3] =
            Math.cos(angulo) *
            radio;

        posiciones[i * 3 + 1] =
            (Math.random() - 0.5) *
            35;

        posiciones[i * 3 + 2] =
            Math.sin(angulo) *
            radio;
    }


    const geometria =
        new THREE.BufferGeometry();

    geometria.setAttribute(
        "position",
        new THREE.BufferAttribute(
            posiciones,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color: 0xb6afb8,

            size: 0.20,

            transparent: true,

            opacity: 0.20

        });


    const polvo =
        new THREE.Points(
            geometria,
            material
        );

    scene.add(polvo);

    return polvo;
}


const polvo =
    crearPolvoCosmico();


// ======================================================
// ESTRELLAS FUGACES
// ======================================================

function crearEstrellaFugaz() {

    const grupo =
        new THREE.Group();

    const geometria =
        new THREE.BufferGeometry()
            .setFromPoints([

                new THREE.Vector3(
                    0,
                    0,
                    0
                ),

                new THREE.Vector3(
                    -12,
                    0,
                    0
                )

            ]);

    const material =
        new THREE.LineBasicMaterial({

            color: 0xffffff,

            transparent: true,

            opacity: 0.8

        });

    const linea =
        new THREE.Line(
            geometria,
            material
        );

    grupo.add(linea);

    grupo.position.set(
        -200 +
        Math.random() * 400,

        -50 +
        Math.random() * 180,

        -400
    );

    grupo.rotation.z =
        -0.25;

    scene.add(grupo);

    return grupo;
}


const fugaces = [];


for (
    let i = 0;
    i < 8;
    i++
) {

    fugaces.push(
        crearEstrellaFugaz()
    );
}


// ======================================================
// ANIMACIÓN
// ======================================================

const reloj =
    new THREE.Clock();


function animar() {

    requestAnimationFrame(
        animar
    );


    const tiempo =
        reloj.getElapsedTime();


    // ==================================================
    // ESTRELLAS
    // ==================================================

    estrellas.rotation.y =
        tiempo * 0.00035;

    estrellasPequenas.rotation.y =
        -tiempo * 0.0002;

    estrellasCalidas.rotation.y =
        tiempo * 0.00025;

    estrellasAzules.rotation.y =
        -tiempo * 0.00018;


    // ==================================================
    // NEBULOSAS
    // ==================================================

    nebulosaMorada.material.rotation =
        0.35 +
        Math.sin(tiempo * 0.02) *
        0.03;

    nebulosaAzul.material.rotation =
        -0.25 +
        Math.sin(tiempo * 0.015) *
        0.03;


    // ==================================================
    // POLVO
    // ==================================================

    polvo.rotation.y =
        tiempo * 0.0008;


    // ==================================================
    // ASTEROIDES
    // ==================================================

    asteroides.rotation.y =
        tiempo * 0.0018;


    // ==================================================
    // ESTRELLA
    // ==================================================

    sol.rotation.y =
        tiempo * 0.12;


    coronaGrande.material.rotation =
        tiempo * 0.003;

    coronaPequena.material.rotation =
        -tiempo * 0.005;


    // ==================================================
    // PLANETAS
    // ==================================================

    const planetas = [

        planeta1,
        planeta2,
        planeta3,
        planeta4,
        planeta5,
        planeta6,
        planeta7,
        planeta8

    ];


    planetas.forEach(
        (planeta) => {

            planeta.userData.angulo +=
                planeta.userData.velocidad;


            const angulo =
                planeta.userData.angulo;


            const distancia =
                planeta.userData.distancia;


            const inclinacion =
                planeta.userData.inclinacion;


            planeta.position.x =
                Math.cos(angulo) *
                distancia;


            planeta.position.z =
                Math.sin(angulo) *
                distancia;


            planeta.position.y =
                Math.sin(angulo) *
                Math.sin(inclinacion) *
                distancia *
                0.20;


            planeta.rotation.y +=
                planeta.userData.rotacion;

        }
    );


    // ==================================================
    // LUNAS
    // ==================================================

    luna1.rotation.y =
        tiempo * 0.025;

    luna2.rotation.y =
        tiempo * 0.030;

    luna3.rotation.y =
        tiempo * 0.020;

    luna4.rotation.y =
        tiempo * 0.015;


    // ==================================================
    // ESTRELLAS FUGACES
    // ==================================================

    fugaces.forEach(
        (fugaz, indice) => {

            fugaz.position.x +=
                0.25;

            fugaz.position.y -=
                0.06;


            if (
                fugaz.position.x >
                250
            ) {

                fugaz.position.x =
                    -250 -
                    Math.random() * 100;

                fugaz.position.y =
                    -50 +
                    Math.random() * 180;

            }

        }
    );


    // ==================================================
    // CÁMARA CINEMATOGRÁFICA
    // ==================================================

    camera.position.x =
        Math.sin(
            tiempo * 0.012
        ) * 125;


    camera.position.y =
        30 +
        Math.sin(
            tiempo * 0.017
        ) * 13;


    camera.position.z =
        175 +
        Math.cos(
            tiempo * 0.012
        ) * 30;


    camera.lookAt(
        0,
        0,
        0
    );


    // ==================================================
    // RENDER
    // ==================================================

    renderer.render(
        scene,
        camera
    );
}


// ======================================================
// INICIAR
// ======================================================

animar();


// ======================================================
// REDIMENSIONAR
// ======================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
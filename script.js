
function inicializarSonidoLogo() {
    const logoElement = document.querySelector('.logo');
    const magicSound = new Audio('logosonido.mp3');
    let isPlaying = false; // Controla si el sonido se está reproduciendo

    if (logoElement) {
        // Esperar a la interacción del usuario para desbloquear el audio
        logoElement.addEventListener('click', () => {
            if (isPlaying) {
                magicSound.pause();
                magicSound.currentTime = 0; // Reiniciar desde el inicio
                isPlaying = false;
            } else {
                // Intentar reproducir el sonido al hacer clic
                magicSound.play()
                    .then(() => {
                        isPlaying = true;
                    })
                    .catch(error => {
                        console.error('Error al reproducir el sonido:', error);
                    });
            }
        });

        // Resetear el estado al finalizar el audio
        magicSound.addEventListener('ended', () => {
            isPlaying = false;
        });

        // Llamar a la función opcional para rotar el logo
        rotarLogoAutomaticamente(logoElement);
    } else {
        console.warn('Elemento logo no encontrado en el DOM.');
    }
}

// Esperar a que el DOM esté completamente cargado antes de inicializar
document.addEventListener('DOMContentLoaded', inicializarSonidoLogo);

// Selecciona los elementos necesarios
// Definición de variables y selección de elementos
const mapaHogwarts = document.getElementById('mapa-hogwarts');
const listaLugares = document.getElementById('lista-lugares');
const modal = document.getElementById('modal');
const modalIframe = document.getElementById('modal-iframe');
const closeModal = document.querySelector('.close');
const submenuHouses = document.querySelector('.submenu-houses');

// Establecer tamaño de la ventana modal igual al tamaño de la sección del mapa
function setModalSize() {
    const sectionMapHeight = mapaHogwarts.clientHeight; // Obtener la altura de la sección del mapa
    const sectionMapWidth = mapaHogwarts.clientWidth; // Obtener la anchura de la sección del mapa
    modal.style.height = sectionMapHeight + 'px'; // Establecer la altura de la modal
    modal.style.width = sectionMapWidth + 'px'; // Establecer la anchura de la modal
}

// Función para mostrar la lista de lugares
function toggleListaLugares() {
    if (listaLugares.style.display === 'none') {
        listaLugares.style.display = 'block';
    } else {
        listaLugares.style.display = 'none';
    }
}

// Evento para mostrar la lista de lugares al hacer clic en el mapa
mapaHogwarts.addEventListener('click', () => {
    toggleListaLugares();
    setModalSize(); // Ajustar el tamaño de la modal al mostrar la lista
});

// Función para cargar contenido en la modal
function loadContent(url) {
    modalIframe.src = url; // Cargar el contenido en el iframe
    modal.style.display = 'block';
    setModalSize(); // Ajustar el tamaño de la modal al cargar el contenido
}

// Función para manejar clics en los enlaces de la lista
function handleLinkClick(e) {
    e.preventDefault();
    submenuHouses.style.display = 'none'; // Ocultar el submenu de casas
    const lugar = e.target.textContent;

    switch (lugar) {
        case 'Hogsmeade':
            loadContent('hogsmeade.html'); // Ruta del contenido de Hogsmeade
            break;
        case 'Quidditch Pitch':
            loadContent('quidditchpitch.html'); // Cambia esto por la ruta del contenido de Quidditch Pitch
            break;
        case "Hagrid's Hut":
            loadContent('hagrid_hut.html'); // Cambia esto por la ruta del contenido de Hagrid's Hut
            break;
        case 'Black Lake':
            loadContent('black_lake.html'); // Cambia esto por la ruta del contenido del Black Lake
            break;
        case 'Hogsmeade Station':
            loadContent('hogsmeade_station.html'); // Cambia esto por la ruta del contenido de Hogsmeade Station
            break;
        case 'Hogwarts School':
            loadContent('hogwarts_school.html'); // Cambia esto por la ruta del contenido de Hogwarts School
            break;
        case 'Whomping Willow':
            loadContent('whomping_willow.html'); // Cambia esto por la ruta del contenido de Whomping Willow
            break;
        case 'Forbidden Forest':
            loadContent('forbidden_forest.html'); // Cambia esto por la ruta del contenido de Forbidden Forest
            break;
        case 'The Owlery':
            loadContent('owlery.html'); // Cambia esto por la ruta del contenido de The Owlery
            break;
        default:
            console.error('Lugar no reconocido:', lugar);
            break;
    }
}

// Agregar eventos a los enlaces de la lista
const links = listaLugares.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', handleLinkClick);
});

// Función para cerrar la modal y recargar la página
function closeModalWindow() {
    modal.style.display = 'none';
    modalIframe.src = ''; // Limpiar el src del iframe para evitar conflictos
    location.reload(); // Recarga la página al cerrar la modal
}

// Evento para cerrar la ventana modal
closeModal.addEventListener('click', closeModalWindow);

// Cierra la modal si se hace clic fuera de ella
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModalWindow();
    }
});

// Inicializa la aplicación
function initializeApp() {
    listaLugares.style.display = 'none'; // Asegura que la lista esté oculta al inicio
    modal.style.display = 'none'; // Asegura que la modal esté oculta al inicio
}

// Inicia la aplicación
initializeApp();
setModalSize(); // Ajustar el tamaño de la modal al inicio

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a");
    const navbar = document.querySelector(".navbar");
    let lastScrollTop = 0;
  
    // Desplazamiento suave al hacer clic en los enlaces
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - navbar.offsetHeight, // Ajusta por la altura de la barra
            behavior: "smooth"
          });
        }
      });
    });
  
    // Ocultar barra de navegación al hacer scroll hacia abajo
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
  
      if (currentScroll > lastScrollTop) {
        navbar.style.top = "-70px"; // Oculta la barra
      } else {
        navbar.style.top = "0"; // Muestra la barra
      }
      lastScrollTop = Math.max(0, currentScroll);
    });
  
    // Marcar el enlace activo según la sección visible
    window.addEventListener("scroll", () => {
      let currentSection = "";
  
      document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });
  
      links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === currentSection) {
          link.classList.add("active");
        }
      });
    });
});
// Selección de botones y formularios
    // Función para mostrar el formulario de inicio de sesión
// JavaScript para la funcionalidad de inicio de sesión y registro
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const loginForm = document.getElementById('loginFormElement');
const registerForm = document.getElementById('registerFormElement');
const backToAuth = document.getElementById('backToAuth');
const backToAuthRegister = document.getElementById('backToAuthRegister');
const logoutSection = document.getElementById('logoutSection');
const userNameSpan = document.getElementById('userName');
const logoutButton = document.getElementById('logoutButton');

let users = JSON.parse(localStorage.getItem('users')) || [];

// Validar contraseña fuerte
function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Mostrar formulario de inicio de sesión
loginButton.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});

// Mostrar formulario de registro
registerButton.addEventListener('click', () => {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
});

// Volver a botones de autenticación
backToAuth.addEventListener('click', () => {
    loginForm.style.display = 'none';
});

backToAuthRegister.addEventListener('click', () => {
    registerForm.style.display = 'none';
});

// Manejo de cierre de sesión
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    logoutSection.style.display = 'none';
    document.querySelector('.auth-buttons').style.display = 'block';
});

// Manejo del registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('registerformUsername').value;
    const email = document.getElementById('registerformEmail').value;
    const password = document.getElementById('registerformPassword').value;

    if (!isStrongPassword(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.');
        return;
    }

    const userExists = users.some(user => user.email === email || user.username === username);
    if (userExists) {
        alert('El usuario o correo ya está registrado.');
        return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');
    registerForm.style.display = 'none';
});

// Manejo del inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginformEmail').value;
    const password = document.getElementById('loginformPassword').value;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        alert('Correo o contraseña incorrectos.');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    userNameSpan.textContent = user.username;

    loginForm.style.display = 'none';
    document.querySelector('.auth-buttons').style.display = 'none';
    logoutSection.style.display = 'block';
});

// Comprobar si hay un usuario logueado al cargar la página
window.addEventListener('load', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        userNameSpan.textContent = loggedInUser.username;
        document.querySelector('.auth-buttons').style.display = 'none';
        logoutSection.style.display = 'block';
    }
});
// Objeto con las traducciones: clave en español, valor en inglés
const translations = {
    "Iniciar Sesión": "Log In",
    "Registrarse": "Sign Up",
    "Correo electrónico": "Email",
    "Contraseña": "Password",
    "Ingresar": "Enter",
    "Volver": "Back",
    "Nombre de usuario": "Username",
    "Registrar": "Register",
    "Bienvenido,": "Welcome,",
    "Cerrar Sesión": "Log Out",
    "Programas Académicos":"Academic Programs",
    "Eventos":"Events",
    "Casas":"Houses",
    "Contacto":"Contact",
    "Buscar...": "Search...",
    "Visitas actuales:": "Current visits:",
    "Bienvenido a la Universidad de Hogwarts":"Welcome to Hogwarts University",
    "Desde tiempos inmemoriales, Hogwarts ha formado magos y brujas de todo el mundo, brindando conocimiento mágico y una comunidad de excelencia. Nuestra misión es fomentar la magia responsable y el desarrollo personal, preparando a nuestros estudiantes para los desafíos del mundo mágico moderno.":"Since time immemorial, Hogwarts has trained witches and wizards from around the world, providing magical knowledge and a community of excellence. Our mission is to encourage responsible magic and personal development, preparing our students for the challenges of the modern magical world.",
    "Programas Académicos":"Academic Programs",
    "Hechicería Avanzada: Domina los hechizos más complejos y aprende a conjurar con precisión.":"Advanced Sorcery: Master the most complex spells and learn to cast with precision.",
    "Pociones: Aprende el arte de mezclar pociones para curar, transformar o mejorar habilidades.":"Potions: Learn the art of mixing potions to heal, transform, or enhance abilities.Potions: Learn the art of mixing potions to heal, transform, or enhance abilities.",
    "Astronomía: Estudia los cuerpos celestes y su influencia en la magia.":"Astronomy: Study the celestial bodies and their influence on magic.",
    "Defensa Contra las Artes Oscuras: Desarrolla habilidades para protegerte de las amenazas más peligrosas.":"Defense Against the Dark Arts: Develop skills to protect yourself from the most dangerous threats.",
    "Calendario Académico":"Academic Calendar",
    "Valor, coraje y determinación.":"Courage, courage and determination.",
    "Sabiduría, creatividad y aprendizaje.":"Wisdom, creativity and learning.",
    "Lealtad, paciencia y trabajo duro.":"Loyalty, patience and hard work.",
    "Ambición, astucia y liderazgo.":"Ambition, cunning and leadership.",
    "Evento":"EVENT",
    "FECHA":"DATE",
    "Inicio de Clases": "Start of Classes",
    "1 de Septiembre": "September 1st",
    "Exámenes Parciales": "Midterm Exams",
    "15 de Noviembre": "November 15th",
    "Vacaciones de Navidad": "Christmas Holidays",
    "20 de Diciembre - 5 de Enero": "December 20th - January 5th",
    "Horarios de Clases": "Class Schedules",
    "Ejemplo de horario para Hechicería Avanzada:": "Example schedule for Advanced Spellcasting:",
    "Lunes: Hechizos Elementales - 10:00 AM - 12:00 PM": "Monday: Elemental Spells - 10:00 AM - 12:00 PM",
    "Miércoles: Conjuración Avanzada - 2:00 PM - 4:00 PM": "Wednesday: Advanced Conjuration - 2:00 PM - 4:00 PM",
    "Viernes: Prácticas en Duelo - 3:00 PM - 5:00 PM": "Friday: Duelling Practices - 3:00 PM - 5:00 PM",
    "Más Información de los Programas": "More Information on Programs",
    "Hechicería Avanzada": "Advanced Spellcasting",
    "Pociones": "Potions",
    "Astronomía": "Astronomy",
    "Defensa Contra las Artes Oscuras": "Defense Against the Dark Arts",
    "Requisitos de Admisión": "Admission Requirements",
    "Formulario de solicitud completo.": "Completed application form.",
    "Ensayo personal explicando tu interés en la magia.": "Personal essay explaining your interest in magic.",
    "2 cartas de recomendación.": "2 letters of recommendation.",
    "Evaluación preliminar de habilidades mágicas.": "Preliminary assessment of magical skills.",
    "Instructores Destacados": "Featured Instructors",
    "Especialista en magia avanzada y transfiguración. Ex-director de Hogwarts.": "Specialist in advanced magic and transfiguration. Former headmaster of Hogwarts.",
    "Profesora de Transfiguración y actual directora de Hogwarts.": "Transfiguration professor and current headmistress of Hogwarts.",
    "Blog Académico": "Academic Blog",
    "Cómo Prepararte para los Exámenes Finales": "How to Prepare for Final Exams",
    "Consejos de nuestros expertos para tener éxito en tus evaluaciones mágicas.": "Tips from our experts for succeeding in your magical assessments.",
    "Entrevista con el Profesor Flitwick": "Interview with Professor Flitwick",
    "Conoce los secretos del arte del encantamiento de manos del maestro en la materia.": "Discover the secrets of the art of enchantment from the master of the subject.",
    "Biblioteca en Línea": "Online Library",
    "Hechizos Ancestrales": "Ancient Spells",
    "Pociones Curativas": "Healing Potions",
    "Mostrar Historial de Descargas": "Show Download History",
    "Ocultar Historial de Descargas": "Hide Download History",
    "Borrar Historial de Descargas": "Clear Download History",
    "Centros de Investigación Mágica": "Magical Research Centers",
    "Hogwarts alberga varios centros de investigación dedicados al avance de la magia. Estos incluyen:": "Hogwarts hosts several research centers dedicated to the advancement of magic. These include:",
    "Centro de Estudios sobre Magia Oscura": "Center for Dark Arts Studies",
    "Laboratorio de Pociones Experimentales": "Experimental Potions Laboratory",
    "Observatorio de Astronomía Mágica": "Magical Astronomy Observatory",
    "Las Casas de Hogwarts": "The Houses of Hogwarts",
    "Valentía, coraje y determinación son los rasgos principales de los estudiantes de Gryffindor.": "Bravery, courage, and determination are the main traits of Gryffindor students.",
    "Los estudiantes de Ravenclaw se caracterizan por su sabiduría, creatividad y amor por el aprendizaje.": "Ravenclaw students are characterized by their wisdom, creativity, and love for learning.",
    "Hufflepuff premia la lealtad, la paciencia y el trabajo duro de sus estudiantes.": "Hufflepuff rewards the loyalty, patience, and hard work of its students.",
    "Ambición y astucia son las características predominantes de los alumnos de Slytherin.": "Ambition and cunning are the predominant characteristics of Slytherin students.",
    "Tabla de Puntos por Casa": "House Points Table",
    "Casa": "House",
    "Puntos Acumulados": "Accumulated Points",
    "Test del Sombrero Seleccionador": "Sorting Hat Quiz",
    "Responde las preguntas para descubrir a qué casa perteneces:": "Answer the questions to discover which house you belong to:",
    "Comenzar Test": "Start Quiz",
    "Actividades Extracurriculares": "Extracurricular Activities",
    "Club de Duelo": "Dueling Club",
    "Equipo de Quidditch": "Quidditch Team",
    "Orquesta de Magos": "Wizards' Orchestra",
    "Teatro Mágico": "Magical Theatre",
    "Clubes y Asociaciones": "Clubs and Associations",
    "Club de Ajedrez Mágico": "Magical Chess Club",
    "Sociedad de Estudios Oscuros": "Society for Dark Studies",
    "Club de Pociones Experimentales": "Experimental Potions Club",
    "Galería de Eventos": "Event Gallery",
    "Noticias y Anuncios": "News and Announcements",
    "Nueva Competencia de Duelo": "New Dueling Competition",
    "Este semestre se organizará una competencia de duelo entre casas. ¡Prepárate!": "This semester, a duel competition between houses will be organized. Get ready!",
    "Quidditch: Inscripciones Abiertas": "Quidditch: Open Registrations",
    "El equipo de Quidditch busca nuevos jugadores. ¡Únete ahora!": "The Quidditch team is looking for new players. Join now!",
    "Tienda Oficial de Hogwarts": "Official Hogwarts Store",
    "Bufanda de Gryffindor - 15 G": "Gryffindor Scarf - 15 G",
    "Varita Oficial de Ravenclaw - 20 G": "Official Ravenclaw Wand - 20 G",
    "Sudadera de Slytherin - 30 G": "Slytherin Hoodie - 30 G",
    "Mapa del Campus": "Campus Map",
    "Explora el campus de Hogwarts:": "Explore the Hogwarts campus:",
    "¡Tu Opinión Importa!": "Your Opinion Matters!",
    "Comentarios:": "Comments:",
    "Inscripción al Torneo de los Tres Magos": "Registration for the Triwizard Tournament",
    "¿Crees que tienes lo necesario para participar en uno de los torneos más desafiantes del mundo mágico? ¡Inscríbete aquí!": "Do you think you have what it takes to participate in one of the most challenging tournaments in the magical world? Sign up here!",
    "Datos del Participante": "Participant Information",
    "Nombre Completo:": "Full Name:",
    "Edad:": "Age:",
    "Casa:": "House:",
    "Agenda del Torneo de los Tres Magos": "Schedule of the Triwizard Tournament",
    "Primera Prueba: 15 de Octubre - Bosque Prohibido": "First Task: October 15 - Forbidden Forest",
    "Segunda Prueba: 5 de Noviembre - Lago Negro": "Second Task: November 5 - Black Lake",
    "Tercera Prueba: 20 de Noviembre - Laberinto Encantado": "Third Task: November 20 - Enchanted Maze",
    "Galería del Gran Comedor": "Great Hall Gallery",
    "Encuesta de Retroalimentación": "Feedback Survey",
    "¿Cuál fue tu evento favorito?": "What was your favorite event?",
    "Torneo de los Tres Magos": "Triwizard Tournament",
    "Partidos de Quidditch": "Quidditch Matches",
    "Banquete en el Gran Comedor": "Feast in the Great Hall",
    "Comentarios:": "Comments:",
    "Contacto": "Contact",
    "¿Tienes alguna pregunta o sugerencia? Contáctanos a través del siguiente formulario:": "Do you have any questions or suggestions? Contact us through the following form:",
    "Nombre Completo:": "Full Name:",
    "Correo Electrónico:": "Email Address:",
    "Mensaje:": "Message:",
    "Preguntas Frecuentes": "Frequently Asked Questions",
    "¿Cuáles son los requisitos para asistir a Hogwarts?": "What are the requirements to attend Hogwarts?",
    "¿Qué casas hay en Hogwarts?": "What houses are there at Hogwarts?",
    "¿Qué tipo de clases se ofrecen en Hogwarts?": "What types of classes are offered at Hogwarts?",
    "¿Qué hago si no recibí mi carta de aceptación?": "What should I do if I didn't receive my acceptance letter?",
    "¿Cuáles son los horarios de las clases?": "What are the class schedules?",
    "¿Se permiten mascotas en Hogwarts?": "Are pets allowed at Hogwarts?",
    "Inscripción en Línea": "Online Registration",
    "Panel de Estudiantes": "Student Panel",
    "Términos y Condiciones": "Terms and Conditions",
    "Leer términos completos": "Read full terms",
    "Personal Administrativo": "Administrative Staff",
    "Director": "Headmaster",
    "Subdirectora": "Deputy Headmistress",
    "Jefe de Slytherin": "Head of Slytherin",
    "Horario de Atención": "Office Hours",
    "Día": "Day",
    "Horario": "Hours",
    "Lunes a Viernes": "Monday to Friday",
    "Sábado": "Saturday",
    "Domingo": "Sunday",
    "Cerrado": "Closed",
    "Servicios de Emergencia": "Emergency Services",
    "En caso de emergencia, comunícate inmediatamente con:": "In case of emergency, please contact immediately:",
    "Enfermería de Hogwarts - Ext. 101": "Hogwarts Infirmary - Ext. 101",
    "Ministerio de Magia - Línea de Emergencia Mágica": "Ministry of Magic - Magical Emergency Line",
    "Soporte Técnico": "Technical Support",
    "¿Tienes problemas con el portal? Reporta el problema aquí:": "Having trouble with the portal? Report the issue here:",
    "Descripción del Problema: ": "Problem Description: "
    
};

// Al cargar la página, aplica el idioma guardado o 'es' por defecto
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    applyLanguage(savedLanguage);
});


// Función para aplicar el idioma seleccionado
function applyLanguage(language) {
    document.querySelectorAll("[data-translate]").forEach(element => {
        const originalText = element.getAttribute('data-translate');

        // Mostrar el nombre del usuario si es el mensaje de bienvenida
        if (originalText === "Bienvenido,") {
            const userName = localStorage.getItem("userName") || "Usuario";
            element.textContent = `${translations[originalText] || originalText} ${userName}`;
        } else {
            element.textContent = (language === 'en') 
                ? translations[originalText] || originalText 
                : originalText;
        }
    });

    // Resaltar el botón del idioma activo
    document.querySelectorAll('.language-switch button').forEach(button => {
        button.classList.toggle('active', button.id === `lang-${language}`);
    });

    // Guardar el idioma en localStorage
    localStorage.setItem('language', language);
}

// Cambiar idioma al presionar un botón
function changeLanguage(language) {
    applyLanguage(language);
}

const titulos = document.querySelectorAll('.titulo');

    // Agrega un evento de clic a cada título
    titulos.forEach(titulo => {
        titulo.addEventListener('click', () => {
            // Alterna la visibilidad del contenido correspondiente
            const contenido = titulo.nextElementSibling;
            contenido.style.display = contenido.style.display === 'block' ? 'none' : 'block';

            // Opcional: Si deseas cerrar otros contenidos al abrir uno nuevo
            titulos.forEach(otherTitulo => {
                if (otherTitulo !== titulo) {
                    otherTitulo.nextElementSibling.style.display = 'none';
                }
            });
        });
    });




document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    // Alternar la clase 'active' para el botón y 'show' para el menú
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        mobileNav.classList.toggle("show");
    });

    // Cerrar el menú móvil al hacer clic en un enlace
    document.querySelectorAll(".mobile-nav a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            mobileNav.classList.remove("show");
        });
    });
});
// Inicialización de contadores de descargas y historial en localStorage si no existen
if (!localStorage.getItem('downloadData')) {
    const initialData = {
        downloadCount: {
            hechizos: 0,
            pociones: 0,
        },
        history: [],
    };
    localStorage.setItem('downloadData', JSON.stringify(initialData));
}

// Función para obtener datos de descargas desde localStorage
function getDownloadData() {
    return JSON.parse(localStorage.getItem('downloadData'));
}

// Función para manejar la descarga
function handleDownload(file) {
    const data = getDownloadData();

    // Incrementar el contador de descargas para el archivo correspondiente
    if (file === 'hechizos') {
        data.downloadCount.hechizos++;
        alert(`Has descargado "Hechizos Ancestrales". Total de descargas: ${data.downloadCount.hechizos}`);
    } else if (file === 'pociones') {
        data.downloadCount.pociones++;
        alert(`Has descargado "Pociones Curativas". Total de descargas: ${data.downloadCount.pociones}`);
    }

    // Agregar registro de descarga al historial
    const downloadRecord = {
        file: file === 'hechizos' ? 'Hechizos Ancestrales' : 'Pociones Curativas',
        date: new Date().toLocaleString(),
    };
    data.history.push(downloadRecord);

    // Actualizar datos en localStorage
    localStorage.setItem('downloadData', JSON.stringify(data));
}

// Función para mostrar el historial de descargas
function showDownloadHistory() {
    const historySection = document.getElementById('download-history');
    historySection.innerHTML = ''; // Limpiar el historial previo

    const data = getDownloadData();

    data.history.forEach(record => {
        const historyItem = document.createElement('li');
        historyItem.textContent = `${record.file} - Descargado el ${record.date}`;
        historySection.appendChild(historyItem);
    });

    // Mostrar el historial
    historySection.style.display = 'block';
}

// Función para ocultar el historial de descargas
function hideDownloadHistory() {
    const historySection = document.getElementById('download-history');
    historySection.style.display = 'none'; // Ocultar el historial
}

// Función para borrar el historial de descargas
function clearDownloadHistory() {
    const data = getDownloadData();
    data.history = []; // Borrar el historial
    localStorage.setItem('downloadData', JSON.stringify(data));
    alert('Historial de descargas borrado correctamente.');
    hideDownloadHistory(); // Ocultar el historial después de borrarlo
}

// Función para inicializar eventos
function init() {
    const hechizosLink = document.querySelector('a[href="hechizos.pdf"]');
    const pocionesLink = document.querySelector('a[href="pociones.pdf"]');

    // Agregar eventos de clic para cada enlace
    hechizosLink.addEventListener('click', function(event) {
        handleDownload('hechizos');
    });

    pocionesLink.addEventListener('click', function(event) {
        handleDownload('pociones');
    });

    // Botones para mostrar, ocultar y borrar el historial de descargas
    document.getElementById('show-history').addEventListener('click', showDownloadHistory);
    document.getElementById('hide-history').addEventListener('click', hideDownloadHistory);
    document.getElementById('clear-history').addEventListener('click', clearDownloadHistory);
}

// Inicializar el script una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);




// Elementos del DOM
const comenzarTestBtn = document.getElementById("comenzar-test");
const resultadoCasaDiv = document.getElementById("resultado-casa");
const casaAsignadaSpan = document.getElementById("casa-asignada");
const sombreroSeleccionadorSection = document.getElementById("sombrero-seleccionador");
const cuestionarioDiv = document.getElementById("cuestionario");
const tituloTest = document.getElementById("titulo-test");

// Preguntas del test
const preguntas = [
    {
        pregunta: "¿Cuál es tu materia favorita en Hogwarts?",
        opciones: ["Defensa contra las Artes Oscuras", "Pociones", "Transfiguración", "Encantamientos"]
    },
    {
        pregunta: "Si tuvieras una varita, ¿qué tipo de núcleo elegirías?",
        opciones: ["Pluma de Fénix", "Pelo de unicornio", "Corazón de dragón", "Madera de sauce"]
    },
    {
        pregunta: "¿Qué animal preferirías tener como mascota?",
        opciones: ["Gato", "Lechuza", "Rata", "Perro"]
    },
    {
        pregunta: "¿Cuál es tu lugar favorito en Hogwarts?",
        opciones: ["La sala común de Gryffindor", "La biblioteca", "El lago", "El campo de Quidditch"]
    },
    {
        pregunta: "¿Qué cualidad valoras más en un amigo?",
        opciones: ["Lealtad", "Inteligencia", "Valentía", "Ambición"]
    },
    {
        pregunta: "¿Cuál es tu forma de enfrentar un problema?",
        opciones: ["Pensar detenidamente", "Actuar de inmediato", "Consultar con amigos", "Buscar información"]
    },
    {
        pregunta: "Si estuvieras en una batalla, ¿qué harías primero?",
        opciones: ["Proteger a los demás", "Atacar al enemigo", "Buscar una salida", "Usar un hechizo potente"]
    },
    {
        pregunta: "¿Cómo te describirías a ti mismo?",
        opciones: ["Valiente", "Inteligente", "Leal", "Ambicioso"]
    }
];

// Asignar casas
const casas = {
    "Gryffindor": 0,
    "Hufflepuff": 0,
    "Ravenclaw": 0,
    "Slytherin": 0
};

// Clase para manejar el test del sombrero
class SombreroSeleccionador {
    constructor(preguntas) {
        this.preguntas = preguntas;
        this.preguntaActual = 0;
    }

    iniciarTest() {
        comenzarTestBtn.style.display = "none"; // Ocultar botón de inicio
        cuestionarioDiv.style.display = "block"; // Mostrar cuestionario
        this.mostrarPregunta(); // Iniciar el cuestionario
    }

    mostrarPregunta() {
        if (this.preguntaActual < this.preguntas.length) {
            const { pregunta, opciones } = this.preguntas[this.preguntaActual];
            tituloTest.textContent = pregunta;
            cuestionarioDiv.innerHTML = ""; // Limpiar respuestas anteriores
            opciones.forEach(opcion => this.crearBotonOpcion(opcion));
        } else {
            this.mostrarResultado();
        }
    }

    crearBotonOpcion(opcion) {
        const btn = document.createElement("button");
        btn.textContent = opcion;
        btn.classList.add("auth-buttons"); // Añadir clase para CSS
        btn.onclick = () => this.evaluarRespuesta(opcion);
        cuestionarioDiv.appendChild(btn);
    }

    evaluarRespuesta(respuesta) {
        this.calcularCasa(respuesta);
        this.preguntaActual++;
        this.mostrarPregunta();
    }

    calcularCasa(respuesta) {
        const asignaciones = {
            "Gryffindor": ["Defensa contra las Artes Oscuras", "Gato", "Lealtad", "Valentía", "Proteger a los demás"],
            "Ravenclaw": ["Pociones", "Lechuza", "Inteligencia", "Pensar detenidamente", "Buscar información", "Usar un hechizo potente"],
            "Hufflepuff": ["Transfiguración", "Rata", "Leal", "Consultar con amigos"],
            "Slytherin": ["Encantamientos", "Perro", "Ambición", "Actuar de inmediato", "Atacar al enemigo"]
        };

        for (const casa in asignaciones) {
            if (asignaciones[casa].includes(respuesta)) {
                casas[casa]++;
            }
        }
    }

    mostrarResultado() {
        const casaFinal = Object.keys(casas).reduce((a, b) => casas[a] > casas[b] ? a : b);
        localStorage.setItem("casaSeleccionada", casaFinal); // Guardar la casa en localStorage
        sombreroSeleccionadorSection.style.display = "block";
        resultadoCasaDiv.style.display = "block";
        casaAsignadaSpan.textContent = casaFinal;
        this.mostrarMensajeAdicional(casaFinal);
        
        // Ocultar los botones y el texto
        comenzarTestBtn.classList.add("hidden"); // Ocultar botón de iniciar test
        tituloTest.classList.add("hidden"); // Ocultar texto "Responde las preguntas para descubrir a qué casa perteneces"
    
        this.finalizarTest();
    }
    
    mostrarMensajeAdicional(casa) {
        const mensajes = {
            "Gryffindor": "¡Eres valiente y audaz! Un verdadero Gryffindor siempre enfrenta sus miedos.",
            "Hufflepuff": "¡Tu lealtad y trabajo duro son admirables! Un Hufflepuff siempre cuida de sus amigos.",
            "Ravenclaw": "¡Tu inteligencia y curiosidad son inspiradoras! Los Ravenclaws valoran el conocimiento.",
            "Slytherin": "¡Eres ambicioso y astuto! Un Slytherin sabe cómo alcanzar sus metas."
        };
        alert(mensajes[casa]);
    }

    cargarCasa() {
        const casaGuardada = localStorage.getItem("casaSeleccionada");
        if (casaGuardada) {
            sombreroSeleccionadorSection.style.display = "block";
            resultadoCasaDiv.style.display = "block";
            casaAsignadaSpan.textContent = casaGuardada;
            comenzarTestBtn.style.display = "none"; // Ocultar el botón de inicio
            cuestionarioDiv.style.display = "none"; // Ocultar el cuestionario
        }
    }

    reiniciarTest() {
        this.preguntaActual = 0;
        Object.keys(casas).forEach(casa => casas[casa] = 0); // Reiniciar valores
        comenzarTestBtn.style.display = "block";
        resultadoCasaDiv.style.display = "none";
        sombreroSeleccionadorSection.style.display = "block"; // Asegurar que la sección esté visible
        cuestionarioDiv.style.display = "none"; // Ocultar cuestionario
        tituloTest.textContent = "Test del Sombrero Seleccionador"; // Restablecer título
    }

    guardarResultadoEnLocalStorage() {
        const resultado = {
            casa: casaAsignadaSpan.textContent,
            fecha: new Date().toLocaleString()
        };
        localStorage.setItem("resultadoSombrero", JSON.stringify(resultado));
    }

    cargarResultadoGuardado() {
        const resultadoGuardado = JSON.parse(localStorage.getItem("resultadoSombrero"));
        if (resultadoGuardado) {
            casaAsignadaSpan.textContent = resultadoGuardado.casa;
            const mensajeFecha = `Tu casa fue asignada el: ${resultadoGuardado.fecha}`;
            alert(mensajeFecha);
        }
    }

    crearBotonReinicio() {
        const botonReinicio = document.createElement("button");
        botonReinicio.textContent = "Reiniciar Test";
        botonReinicio.classList.add("auth-buttons");
        botonReinicio.onclick = () => this.reiniciarTest();
        sombreroSeleccionadorSection.appendChild(botonReinicio);
    }

    finalizarTest() {
        this.mostrarMensajeAgradecimiento();
        this.guardarResultadoEnLocalStorage();
        this.animarResultado();
    }

    mostrarMensajeAgradecimiento() {
        const agradecimientoDiv = document.createElement("div");
        agradecimientoDiv.classList.add("agradecimiento");
        agradecimientoDiv.innerHTML = "<h4>¡Gracias por participar!</h4><p>Esperamos que hayas disfrutado del test.</p>";
        resultadoCasaDiv.appendChild(agradecimientoDiv);
    }

    animarResultado() {
        resultadoCasaDiv.style.transform = "scale(0)";
        setTimeout(() => {
            resultadoCasaDiv.style.transform = "scale(1)";
        }, 100);
    }
}

// Instancia de la clase SombreroSeleccionador
const sombrero = new SombreroSeleccionador(preguntas);

// Evento al hacer clic en "Comenzar Test"
comenzarTestBtn.addEventListener("click", () => {
    sombrero.iniciarTest();
    sombrero.crearBotonReinicio(); // Crear botón de reinicio
});

// Cargar la casa y el resultado guardado al cargar la página
window.onload = () => {
    sombrero.cargarCasa();
    sombrero.cargarResultadoGuardado();
};

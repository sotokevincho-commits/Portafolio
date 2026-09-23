const canvas = document.getElementById('nodes-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuración de la red
const particleCount = 75; // Cantidad de nodos
const maxDistance = 140;  // Distancia máxima para conectar líneas entre nodos
const mouseRadius = 170;  // Radio de atracción/conexión con el cursor

const mouse = { x: null, y: null };

// Ajustar tamaño del canvas a la pantalla
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Clase Partícula / Nodo
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8; // Velocidad X
        this.vy = (Math.random() - 0.5) * 0.8; // Velocidad Y
        this.radius = Math.random() * 2.5 + 2; // Tamaño del nodo
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebotar en los bordes
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#4CAF50'; // Verde de tu paleta
        ctx.fill();
    }
}

// Crear partículas iniciales
function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Bucle de animación
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Actualizar y dibujar partículas
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Conectar con otras partículas cercanas
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                // Opacidad según la cercanía
                ctx.strokeStyle = `rgba(76, 175, 80, ${1 - dist / maxDistance})`;
                ctx.lineWidth = 0.9;
                ctx.stroke();
            }
        }

        // Conectar partículas con el cursor si está cerca
        if (mouse.x !== null && mouse.y !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(76, 175, 80, ${0.8 - dist / mouseRadius})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

init();
animate();
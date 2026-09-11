// Atrapamos los elementos
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const redstoneText = document.querySelector('.redstone-text');

// Aseguramos que inicie en modo oscuro por defecto
htmlElement.setAttribute('data-bs-theme', 'dark');

// Evento al accionar la palanca
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        // Modo Oscuro (Predeterminado)
        htmlElement.setAttribute('data-bs-theme', 'dark');
        redstoneText.textContent = "Activar Circuito";
    } else {
        // Modo Claro
        htmlElement.setAttribute('data-bs-theme', 'light');
        redstoneText.textContent = "Desactivar Circuito";
    }
});
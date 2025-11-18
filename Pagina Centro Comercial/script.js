document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener elementos clave del DOM (IDs y Clases en español)
    const searchInput = document.getElementById('buscador-tienda');
    const storeList = document.getElementById('resultados-tiendas');
    const storeCards = storeList.querySelectorAll('.tarjeta-local');
    const mapPlaceholder = document.getElementById('mapa-marcador');

    // Función auxiliar para restablecer el mapa a su estado inicial
    const resetMap = () => {
        mapPlaceholder.style.backgroundColor = 'var(--color-fondo-claro)';
        mapPlaceholder.style.border = '1px solid #ccc';
        mapPlaceholder.classList.remove('highlight-map');
        mapPlaceholder.innerHTML = '[Mapa Interactivo del Centro Comercial]<p class="mapa-leyenda">El mapa interactivo indicará la ubicación exacta de los locales.</p>';
    };

    // 2. Función principal para realizar la búsqueda y filtrado
    const filterStores = () => {
        const searchTerm = searchInput.value.toLowerCase();
        let matchesFound = 0;
        let foundStoreName = '';
        let foundStoreNumber = ''; 

        // Recorre todas las tarjetas de locales
        storeCards.forEach(card => {
            const storeName = card.getAttribute('data-nombre').toLowerCase(); // Nombre del local
            const isMatch = storeName.includes(searchTerm);

            if (isMatch) {
                // Mostrar la tarjeta y aplicar resaltado
                card.style.display = 'flex'; 
                card.classList.add('highlight-match');
                matchesFound++;
                foundStoreName = storeName;
                // Captura el número asignado
                foundStoreNumber = card.getAttribute('data-numero'); 
            } else {
                // Ocultar la tarjeta
                card.style.display = 'none'; 
                card.classList.remove('highlight-match');
            }
        });
        
        // 3. Lógica de Simulación del Mapa Interactivo
        resetMap(); // Reiniciar el mapa en cada búsqueda

        if (searchTerm.length > 0 && matchesFound === 1) {
            // Caso A: Se encuentra un ÚNICO local -> Simular señalamiento por número
            mapPlaceholder.classList.add('highlight-map');
            mapPlaceholder.innerHTML = `<h3 style="color: var(--color-principal);">LOCAL N° ${foundStoreNumber} (${foundStoreName.toUpperCase()})</h3>
                                        <p class="mapa-leyenda">Ubicación destacada en el mapa: ¡Fácil de encontrar!</p>`;
        } else if (searchTerm.length > 0 && matchesFound > 1) {
            // Caso B: Múltiples resultados
             mapPlaceholder.innerHTML = `<h3 style="color: var(--color-acento);">MÚLTIPLES COINCIDENCIAS (${matchesFound})</h3>
                                        <p class="mapa-leyenda">Resultados encontrados. El mapa muestra la zona de búsqueda.</p>`;
        }
    };

    // 4. Asignar el evento 'input' al campo de búsqueda para búsqueda en tiempo real
    searchInput.addEventListener('input', filterStores);

    // Inicializar: Ejecutar la función al cargar la página
    filterStores();
});
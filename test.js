const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver'); // Si usas Chrome, para Firefox sería 'geckodriver'

async function runTest() {
    // Crea un nuevo driver de Selenium
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Abre la página web
        await driver.get('http://localhost:3000');  // Ajusta la URL si es necesario

        // Ejemplo: verifica que el título de la página sea correcto
        let title = await driver.getTitle();
        console.log(`Página cargada correctamente. Título: ${title}`);
        if (title !== 'La Vida del Carbonífero') {
            console.error('El título no es el esperado!');
        }

        // Ejemplo: verifica que un elemento esté presente
        let element = await driver.findElement(By.css('h1'));
        let text = await element.getText();
        console.log(`El texto del h1 es: ${text}`);
        if (text !== 'La Vida del Carbonífero') {
            console.error('El texto del h1 no es el esperado!');
        }

        // Ejemplo: hacer clic en un botón o enlace
        let link = await driver.findElement(By.linkText('Inicio'));
        await link.click();
        await driver.wait(until.titleIs('La Vida del Carbonífero'), 5000);

        console.log('Prueba completada con éxito');
    } catch (error) {
        console.error('Hubo un error en la prueba:', error);
    } finally {
        // Cierra el navegador
        await driver.quit();
    }
}

// Ejecuta las pruebas
runTest();

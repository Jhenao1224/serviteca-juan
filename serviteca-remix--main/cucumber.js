require('ts-node').register({
  project: './tsconfig.cucumber.json'
});

module.exports = {
  default: [
    '--require src/Pruebas/Cucumber/Features/Step_definitions/**/*.ts', // Ruta de los archivos de pasos
    '--publish-quiet',
    '--format progress-bar', // Mostrar barra de progreso
    './src/Pruebas/Cucumber/Features/**/*.feature' // Ruta de los archivos .feature
  ].join(' ')
};

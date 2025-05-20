describe('Formulario Crear Vehiculo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/vehiculo'); // Asegúrate de que esta sea la ruta correcta
  });

  it('Debe mostrar todos los campos del formulario', () => {
    cy.get('input#placa').should('exist');
    cy.get('select#cliente').should('exist');
    cy.get('input#modelo').should('exist');
    cy.get('select#tipo').should('exist');
    cy.get('button[type="submit"]').should('exist').and('contain', 'Crear vehiculo');
  });

  it('Debe llenar y enviar el formulario correctamente', () => {
    cy.get('input#placa').type('ABC123');
    cy.get('select#cliente').select(0); // Selecciona el primer cliente
    cy.get('input#modelo').type('2023');
    cy.get('select#tipo').select('Sedan');
    cy.get('button[type="submit"]').click();

    // Verifica si hubo redirección o mensaje de éxito (ajústalo según tu lógica)
    // cy.url().should('include', '/vehiculos');
  });

  it('Debe impedir el envío si faltan campos requeridos', () => {
    cy.get('input#placa').type('XYZ789');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/crear-vehiculo');
  });

  it('Debe rechazar placas con menos de 6 caracteres', () => {
    cy.get('input#placa').type('AB12');
    cy.get('select#cliente').select(0);
    cy.get('input#modelo').type('2022');
    cy.get('select#tipo').select('Campero');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/crear-vehiculo');
  });

  it('Debe rechazar modelos no numéricos', () => {
    cy.get('input#placa').type('DEF456');
    cy.get('select#cliente').select(0);
    cy.get('input#modelo').type('abcd'); // Esto no debería ser aceptado si hay validación
    cy.get('select#tipo').select('Sedan');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/crear-vehiculo');
  });

  it('Debe rechazar modelos fuera de rango', () => {
    cy.get('input#placa').type('GHI789');
    cy.get('select#cliente').select(0);
    cy.get('input#modelo').type('1800'); // Modelo inválido
    cy.get('select#tipo').select('Campero');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/crear-vehiculo');
  });

  it('Debe rechazar modelos fuera de rango', () => {
    cy.get('input#placa').type('GHI789');
    cy.get('select#cliente').select(0);
    cy.get('input#modelo').type('2027'); // Modelo inválido
    cy.get('select#tipo').select('Campero');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/crear-vehiculo');
  });

  it('Debe evitar crear un vehículo si no se selecciona tipo', () => {
    cy.get('input#placa').type('JKL000');
    cy.get('select#cliente').select(0);
    cy.get('input#modelo').type('2020');
    cy.get('select#tipo').invoke('val', ''); // Simula que no se seleccionó nada
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/crear-vehiculo');
  });
});

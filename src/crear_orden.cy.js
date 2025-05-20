describe('Formulario Crear Orden', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:4200/crearorden');
    });
  
    it('Debe mostrar los elementos esenciales del formulario', () => {
      cy.contains('Crear Orden');
      cy.get('select').should('exist');
      cy.get('button').contains('Crear Orden').should('exist');
    });
  
    it('Debe seleccionar un vehículo del listado', () => {
      cy.get('select').first().select(0); // Selecciona el primer vehículo
    });
  
    it('Debe agregar uno o más servicios a la orden', () => {
      // Seleccionar un vehículo primero
      cy.get('select').first().select(0);
  
      // Agregar servicios (uno o más)
      cy.get('button').contains('Agregar').first().click();
  
      // Validar que el servicio fue añadido a la tabla de orden
      cy.get('table tbody tr').should('have.length.at.least', 1);
    });
  
    it('Debe crear la orden después de agregar servicios', () => {
      // Seleccionar vehículo
      cy.get('select').first().select(0);
  
      // Agregar uno o más servicios
      cy.get('button').contains('Agregar').first().click();
  
      // Crear la orden
      cy.get('button').contains('Crear Orden').click();
  
      // Validar algún efecto esperado después (redirección, mensaje, etc.)
      // cy.url().should('include', '/ordenes');
    });
  
    it('No debe permitir crear una orden sin servicios', () => {
      cy.get('select').first().select(0);
      cy.get('button').contains('Crear Orden').click();
  
      // Verifica que aún siga en la misma ruta (orden no creada)
      cy.url().should('include', '/crear-orden');
  
      // Y que la tabla está vacía
      cy.get('table tbody tr').should('have.length', 0);
    });
  });
  
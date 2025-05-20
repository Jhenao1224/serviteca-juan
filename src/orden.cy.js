describe('Gestión de servicios por orden', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:4200/orden');
    });

    it('Debería cargar correctamente la página', () => {
      cy.contains('Crear Orden'); // verifica que el título esté presente
    });
  
    it('Debería mostrar los vehículos disponibles en el selector', () => {
      cy.get('select[aria-label=".form-select-lg example"]')
        .should('exist')
        .and('not.be.empty');
    });
  
    it('Debería mostrar tarjetas de servicios', () => {
      cy.get('.card').should('have.length.at.least', 1);
    });
  
    it('Debería permitir agregar un servicio a la orden', () => {
      cy.get('.card').first().within(() => {
        cy.contains('Agregar').click();
      });
  
      cy.get('table tbody tr').should('have.length.at.least', 1);
    });
  
    it('Debería permitir crear la orden', () => {
      cy.get('.card').first().within(() => {
        cy.contains('Agregar').click();
      });
  
      cy.contains('Crear Orden').click();
      // Aquí podrías verificar algún cambio, redirección o mensaje de éxito
    });
  
  });
  
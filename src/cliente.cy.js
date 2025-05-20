describe('Formulario Crear Cliente', () => {
    beforeEach(() => {
      
      cy.visit('http://localhost:4200/cliente');
    });
  
    it('Debe mostrar todos los campos del formulario', () => {
    cy.get('input#cedula').should('exist');
    cy.get('input#nombres').should('exist');
    cy.get('input#apellidos').should('exist');
    cy.get('input#fechaNacimiento').should('exist');
    cy.get('button[type="submit"]').should('exist').and('contain', 'Crear cliente');
  });

  it('Debe llenar y enviar el formulario correctamente', () => {
    cy.get('input#cedula').type('12345678');
    cy.get('input#nombres').type('Juan');
    cy.get('input#apellidos').type('Pérez');
    cy.get('input#fechaNacimiento').type('1990-01-01');

    cy.get('button[type="submit"]').click();

    // Validación opcional: si muestra un alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Cliente guardado');
    });

  });

  it('Debe mostrar errores si se omite algún campo requerido', () => {
    cy.get('input#cedula').type('12345678');
    // No llenamos los demás campos

    cy.get('button[type="submit"]').click();

    // El navegador no debería enviar el formulario, validación por estar en misma ruta
    cy.url().should('include', '/cliente');
  });

  it('Debe evitar nombres con caracteres inválidos', () => {
    cy.get('input#cedula').type('87654321');
    cy.get('input#nombres').type('Juan123'); 
    cy.get('input#apellidos').type('Pérez');
    cy.get('input#fechaNacimiento').type('1990-01-01');

    cy.get('button[type="submit"]').click();

  });
  it('Debe evitar apellidos con caracteres inválidos', () => {
    cy.get('input#cedula').type('87654321');
    cy.get('input#nombres').type('Juan'); 
    cy.get('input#apellidos').type('Pérez123');
    cy.get('input#fechaNacimiento').type('1990-01-01');

    cy.get('button[type="submit"]').click();

  });

  it('Debe evitar fechas futuras', () => {
    cy.get('input#cedula').type('11112222');
    cy.get('input#nombres').type('Ana');
    cy.get('input#apellidos').type('Gómez');

    const fechaFutura = new Date();
    fechaFutura.setDate(fechaFutura.getDate() + 1); 
    const futura = fechaFutura.toISOString().split('T')[0];

    cy.get('input#fechaNacimiento').type(futura);
    cy.get('button[type="submit"]').click();

    
    cy.url().should('include', '/cliente');
  });
});
  
Feature: Registro de Vehiculos

Scenario: Registrar un vehiculo correctamente
    Given el usuario abre la página "http://localhost:4200/vehiculo"
    When el usuario escribe "QRT257" en el campo "placa"
    When el usuario selecciona el cliente "19999 - Andres" en el campo "cliente"
    When el usuario escribe "2023" en el campo "modelo"
    When el usuario selecciona el Tipo de Vehiculo "Sedan" en el campo "tipo"
    And hace clic en el boton "Crear vehiculo"
    Then debe ver un mensaje que diga "✅ Vehículo registrado correctamente."

  Scenario: Ingresar una placa incorrecta
    Given el usuario abre la página "http://localhost:4200/vehiculo"
    When el usuario escribe "21TRHI" en el campo "placa"
    When el usuario selecciona el cliente "19999 - Andres" en el campo "cliente"
    When el usuario escribe "2023" en el campo "modelo"
    When el usuario selecciona el Tipo de Vehiculo "Sedan" en el campo "tipo"
    And hace clic en el boton "Crear vehiculo"
    Then debe ver un mensaje que diga "⚠ Ingrese una placa correcta"

 Scenario: Ingresar un modelo incorrecta
    Given el usuario abre la página "http://localhost:4200/vehiculo"
    When el usuario escribe "HRT510" en el campo "placa"
    When el usuario selecciona el cliente "19999 - Andres" en el campo "cliente"
    When el usuario escribe "1000" en el campo "modelo"
    When el usuario selecciona el Tipo de Vehiculo "Sedan" en el campo "tipo"
    And hace clic en el boton "Crear vehiculo"
    Then debe ver un mensaje que diga "⚠ El modelo es inválido."

Scenario: Registrar un vehiculo previamente registrado
    Given el usuario abre la página "http://localhost:4200/vehiculo"
    When el usuario escribe "RIP123" en el campo "placa"
    When el usuario selecciona el cliente "19999 - Andres" en el campo "cliente"
    When el usuario escribe "2020" en el campo "modelo"
    When el usuario selecciona el Tipo de Vehiculo "Sedan" en el campo "tipo"
    And hace clic en el boton "Crear vehiculo"
    Then debe ver un mensaje que diga "⚠ Ya existe un vehículo con esa placa."

Scenario: Registrar un cliente correctamente
    Given el usuario abre la página "http://localhost:4200/cliente"
    When el usuario escribe "67890" en el campo "cedula"
    When el usuario escribe el nombre "Sofia" en el campo "nombres"
    When el usuario escribe el apellido "Lopera" en el campo "apellidos"
    When el usuario selecciona la fecha de nacimiento "23/02/2006" en el campo "fechaNacimiento"
    And hace clic en el boton "Crear cliente"
    Then debe ver un mensaje que diga "✅ Cliente creado correctamente."

Scenario: Registrar un cliente con una cedula incorrecta
    Given el usuario abre la página "http://localhost:4200/cliente"
    When el usuario escribe "-111111" en el campo "cedula"
    When el usuario escribe el nombre "Sofia" en el campo "nombres"
    When el usuario escribe el apellido "Lopera" en el campo "apellidos"
    When el usuario selecciona la fecha de nacimiento "17/02/2004" en el campo "fechaNacimiento"
    And hace clic en el boton "Crear cliente"
    Then debe ver un mensaje que diga "✅ Cliente creado correctamente."

Scenario: Registrar un cliente con un nombre incorrecto
    Given el usuario abre la página "http://localhost:4200/cliente"
    When el usuario escribe "888888" en el campo "cedula"
    When el usuario escribe el nombre "Santiag*" en el campo "nombres"
    When el usuario escribe el apellido "Lopera" en el campo "apellidos"
    When el usuario selecciona la fecha de nacimiento "20/02/2001" en el campo "fechaNacimiento"
    And hace clic en el boton "Crear cliente"
    Then debe ver un mensaje que diga "✅ Cliente creado correctamente."

Scenario: Registrar un cliente con un apellido incorrecto
    Given el usuario abre la página "http://localhost:4200/cliente"
    When el usuario escribe "111111" en el campo "cedula"
    When el usuario escribe el nombre "Sofia" en el campo "nombres"
    When el usuario escribe el apellido "Rio2" en el campo "apellidos"
    When el usuario selecciona la fecha de nacimiento "23/02/2003" en el campo "fechaNacimiento"
    And hace clic en el boton "Crear cliente"
    Then debe ver un mensaje que diga "✅ Cliente creado correctamente."

Scenario: Registrar un cliente con una edad menor a 18 años
    Given el usuario abre la página "http://localhost:4200/cliente"
    When el usuario escribe "112211" en el campo "cedula"
    When el usuario escribe el nombre "Sofia" en el campo "nombres"
    When el usuario escribe el apellido "Rios" en el campo "apellidos"
    When el usuario selecciona la fecha de nacimiento "23/02/2023" en el campo "fechaNacimiento"
    And hace clic en el boton "Crear cliente"
    Then debe ver un mensaje que diga "✅ Cliente creado correctamente."

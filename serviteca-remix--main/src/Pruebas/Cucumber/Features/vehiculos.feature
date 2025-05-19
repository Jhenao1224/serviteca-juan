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
    Then debe ver un mensaje que diga "⚠️ Ya existe un vehículo con esa placa."

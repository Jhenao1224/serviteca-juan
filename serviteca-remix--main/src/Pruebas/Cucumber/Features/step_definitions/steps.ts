import { Given, When, Then, Before, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Page } from 'playwright';

interface CustomWorld {
  page: Page;
  dialogMessage?: string;
}

setDefaultTimeout(30000);

Before(async function (this: CustomWorld) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  this.page = await context.newPage();
});

Given('el usuario abre la página {string}', async function (this: CustomWorld, url: string) {
  await this.page.goto(url);
  await this.page.waitForSelector('app-vehiculo');
});

When('el usuario escribe {string} en el campo {string}', async function (this: CustomWorld, texto: string, campo: string) {
  const selector = `#${campo.toLowerCase()}`;
  await this.page.fill(selector, texto);
});

When('el usuario selecciona el cliente {string} en el campo {string}', async function (this: CustomWorld, clienteNombre: string, campo: string) {
  const selector = `#${campo.toLowerCase()}`;
  await this.page.selectOption(selector, { label: clienteNombre });
});

When('el usuario selecciona el Tipo de Vehiculo {string} en el campo {string}', async function (this: CustomWorld, tipo: string, campo: string) {
  const selector = `#${campo.toLowerCase()}`;
  await this.page.selectOption(selector, { label: tipo });
});

When('hace clic en el boton {string}', async function (this: CustomWorld, botonTexto: string) {
  await this.page.click(`button:has-text("${botonTexto}")`);
  // Esperamos a que el mensaje HTML se actualice
  await this.page.waitForSelector('#mensajeAlerta', { timeout: 5000 });
});

Then('debe ver un mensaje que diga {string}', async function (this: CustomWorld, mensajeEsperado: string) {
  const mensaje = await this.page.textContent('#mensajeAlerta');
  expect(mensaje?.trim()).toBe(mensajeEsperado);
});

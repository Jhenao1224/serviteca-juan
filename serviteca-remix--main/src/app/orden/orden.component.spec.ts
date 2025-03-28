import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { OrdenComponent } from './orden.component';
import { DataService } from '../service/data.service';
import { of } from 'rxjs';

class MockDataService {
  obtenerOrdenes() {
    return of([]);
  }
}

describe('OrdenComponent', () => {
  let component: OrdenComponent;
  let fixture: ComponentFixture<OrdenComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdenComponent],
      imports: [FormsModule],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables correctly', () => {
    expect(component.ordenes).toEqual([]);
    expect(component.lista).toEqual([]);
    expect(component.servicios).toEqual([]);
    expect(component.mostrar).toBeFalse();
  });

  it('should call listarOrdenes and populate lista', () => {
    component.ordenes = [[1, 2, 3], [4, 5, 6]];
    component.listarOrdenes();
    expect(component.lista).toEqual([3, 6]);
  });

  it('should call listarServicios and populate servicios', () => {
    spyOn(document, 'getElementById').and.returnValue({ value: '6' } as HTMLInputElement);
    component.ordenes = [[1, 2, 3], [4, 5, 6]];
    component.listarServicios();
    expect(component.servicios).toEqual([4, 5]);
    expect(component.mostrar).toBeTrue();
  });

  it('should render the title in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Orden');
  });
});
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Operator {
  name?: string
  symbol?: string
}

interface Calculator {
  name?: string
  type?: string
}

@Component({//Es un json
  selector: 'app-root', //le asigna un nombre al componente con el cual se va a importar dentro de otros componentes
  //Dentro de la estructura de index.html
  standalone: true, //el puede ser accedido desde cualquier parte de la app
  imports: [//para que se puedan utilizar dentro de la clase y templeate que es app.component.html -> es un array
    RouterOutlet, 
    CommonModule //permite convertir cosas en formato json
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'demo-angular-front'; //Variable de texto
  cant: number = 0; //Variable numerica
  operators: Operator[] = [ //Lista array con objetos de operadores
    {
      name: 'addition',
      symbol: '+'
    },
    {
      name: 'subtraction',
      symbol: '-'
    },
  ];
  cal: Calculator = { //Objeto 
    name: 'My caculator',
    type: 'simple'
  };
  date: Date = new Date(); 

  operation(name: string) {
    if (name == 'addition') {
      this.cant++;
    } else  if (name == 'subtraction') {
      this.cant--;
    }
  }

}

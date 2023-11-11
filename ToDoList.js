"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
// ToDoList.ts
var prompt = require("prompt-sync");
var verTareas_1 = require("./verTareas");
function esperaEnter() {
    prompt()('Presione Enter para continuar...');
}
function agregarTarea(tareas, titulo, descripcion, estado, vencimiento, dificultad) {
    tareas.push({
        titulo: titulo,
        descripcion: descripcion,
        estado: estado,
        creacion: new Date(),
        vencimiento: vencimiento,
        dificultad: dificultad,
        ultimaEdicion: new Date(),
    });
}
function buscarTareas(tareas, titulo) {
    for (var i = 0; i < tareas.length; i++) {
        if (titulo === tareas[i].titulo) {
            console.log('   Tarea encontrada!');
            console.log('Titulo : ' + tareas[i].titulo);
            console.log('Descripcion : ' + tareas[i].descripcion);
            console.log('Estado : ' + tareas[i].estado);
            console.log('Creacion : ' +
                tareas[i].creacion.getDate() +
                '/' +
                tareas[i].creacion.getMonth() +
                '/' +
                tareas[i].creacion.getFullYear());
            console.log('Vencimiento : ' + tareas[i].vencimiento);
            console.log('Dificultad : ' + tareas[i].dificultad);
            return;
        }
    }
    console.log('Tarea no encontrada...');
}
function menu() {
    console.log("\n    ==============================\n              TO-DO List\n    ==============================\n    \n    1. Ver tareas.\n    2. Buscar una tarea.\n    3. Agregar una tarea.\n    0. Salir.\n    ");
}
function main() {
    var tareas = [];
    var op, titulo, descripcion, estado;
    do {
        process.stdout.write('\x1B[2J\x1B[0f');
        menu();
        op = prompt()('Ingrese una opcion : ');
        process.stdout.write('\x1B[2J\x1B[0f');
        switch (op) {
            case '1':
                if (tareas.length > 0) {
                    (0, verTareas_1.verTarea)(tareas);
                }
                else {
                    console.log('Todavía no hay tareas cargadas...');
                }
                esperaEnter();
                break;
            case '2':
                if (tareas.length > 0) {
                    titulo = prompt()('Escriba el nombre de la tarea : ');
                    buscarTareas(tareas, titulo);
                }
                else {
                    console.log('Todavía no hay tareas cargadas...');
                }
                esperaEnter();
                break;
            case '3':
                titulo = prompt()('Ingrese el titulo : ');
                descripcion = prompt()('Ingrese la descripcion : ');
                estado = prompt()("Ingrese el estado : [P]endiente, [E]n curso, [T]erminada : ");
                while (estado.toLowerCase() !== 'p' &&
                    estado.toLowerCase() !== 'e' &&
                    estado.toLowerCase() !== 't') {
                    console.log('Valor incorrecto, ingrese nuevamente....');
                    estado = prompt()("Ingrese el estado : [P]endiente, [E]n curso, [T]erminada : ");
                }
                var vencimiento = prompt()('Ingrese el vencimiento YYYY/MM/DD : ');
                var dificultad = prompt()('Ingrese la dificultad {1,2,3} : ');
                agregarTarea(tareas, titulo, descripcion, estado, vencimiento, dificultad);
                break;
        }
    } while (op !== '0');
    console.log('Hasta la próxima!');
}
exports.main = main;

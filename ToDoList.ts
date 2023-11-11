// ToDoList.ts
import * as prompt from 'prompt-sync';
import { verTarea } from './verTareas';

function esperaEnter() {
    prompt()('Presione Enter para continuar...');
}

function agregarTarea(
    tareas: {
        titulo: string;
        descripcion: string;
        estado: string;
        creacion: Date;
        vencimiento: string;
        dificultad: string;
        ultimaEdicion: Date;
    }[],
    titulo: string,
    descripcion: string,
    estado: string,
    vencimiento: string,
    dificultad: string
) {
    tareas.push({
        titulo,
        descripcion,
        estado,
        creacion: new Date(),
        vencimiento,
        dificultad,
        ultimaEdicion: new Date(),
    });
}

function buscarTareas(tareas: any[], titulo: string) {
    for (let i = 0; i < tareas.length; i++) {
        if (titulo === tareas[i].titulo) {
            console.log('   Tarea encontrada!');
            console.log('Titulo : ' + tareas[i].titulo);
            console.log('Descripcion : ' + tareas[i].descripcion);
            console.log('Estado : ' + tareas[i].estado);
            console.log(
                'Creacion : ' +
                    tareas[i].creacion.getDate() +
                    '/' +
                    tareas[i].creacion.getMonth() +
                    '/' +
                    tareas[i].creacion.getFullYear()
            );
            console.log('Vencimiento : ' + tareas[i].vencimiento);
            console.log('Dificultad : ' + tareas[i].dificultad);
            return;
        }
    }
    console.log('Tarea no encontrada...');
}

function menu() {
    console.log(`
    ==============================
              TO-DO List
    ==============================
    
    1. Ver tareas.
    2. Buscar una tarea.
    3. Agregar una tarea.
    0. Salir.
    `);
}

function main() {
    const tareas: any[] = [];
    let op, titulo, descripcion, estado;
    do {
        process.stdout.write('\x1B[2J\x1B[0f');
        menu();
        op = prompt()('Ingrese una opcion : ');
        process.stdout.write('\x1B[2J\x1B[0f');
        switch (op) {
            case '1':
                if (tareas.length > 0) {
                    verTarea(tareas);
                } else {
                    console.log('Todavía no hay tareas cargadas...');
                }
                esperaEnter();
                break;

            case '2':
                if (tareas.length > 0) {
                    titulo = prompt()('Escriba el nombre de la tarea : ');
                    buscarTareas(tareas, titulo);
                } else {
                    console.log('Todavía no hay tareas cargadas...');
                }
                esperaEnter();
                break;

            case '3':
                titulo = prompt()('Ingrese el titulo : ');
                descripcion = prompt()('Ingrese la descripcion : ');
                estado = prompt()(
                    `Ingrese el estado : [P]endiente, [E]n curso, [T]erminada : `
                );
                while (
                    estado.toLowerCase() !== 'p' &&
                    estado.toLowerCase() !== 'e' &&
                    estado.toLowerCase() !== 't'
                ) {
                    console.log('Valor incorrecto, ingrese nuevamente....');
                    estado = prompt()(
                        `Ingrese el estado : [P]endiente, [E]n curso, [T]erminada : `
                    );
                }
                const vencimiento = prompt()('Ingrese el vencimiento YYYY/MM/DD : ');
                const dificultad = prompt()('Ingrese la dificultad {1,2,3} : ');
                agregarTarea(tareas, titulo, descripcion, estado, vencimiento, dificultad);
                break;
        }
    } while (op !== '0');
    console.log('Hasta la próxima!');
}

export { main };

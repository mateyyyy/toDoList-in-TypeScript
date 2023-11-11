// verTareas.ts
import * as prompt from 'prompt-sync';

function verTarea(tareas: any[]) {
    let op, cont = 0;

    console.log(`¿Qué tarea desea ver?
    [1] Todas
    [2] Pendientes
    [3] En curso
    [4] Terminadas
    [0] Volver`);

    op = prompt()('Opción: ');
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log("  ----------------\n  Lista de Tareas\n  ----------------");

    switch (op) {
        case '1':
            for (let i = 0; i < tareas.length; i++) {
                console.log("Tarea " + (i + 1) + " : " + tareas[i].titulo);
                cont++;
            }
            break;

        case '2':
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].estado.toLowerCase() == 'p') {
                    console.log("Tarea " + (i + 1) + " : " + tareas[i].titulo);
                    cont++;
                }
            }
            break;

        case '3':
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].estado.toLowerCase() == 'e') {
                    console.log("Tarea " + (i + 1) + " : " + tareas[i].titulo);
                    cont++;
                    console.log('');
                }
            }
            break;

        case '4':
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].estado.toLowerCase() == 't') {
                    console.log("Tarea " + (i + 1) + " : " + tareas[i].titulo);
                    cont++;
                }
            }
            break;
    }

    if (cont > 0) {
        console.log('');
        console.log('¿Desea ver los detalles de alguna?');
        op = prompt()('Introduce el número o 0 para volver: ');

        if (op > 0) {
            if (tareas[op - 1] != null) {
                detallesTarea(tareas, op);
                let editar = prompt()('\n ¿Desea editar la tarea? [S]i [N]o : ');

                if (editar == 's') {
                    editarTarea(tareas, op);
                } else {
                    console.log('Volviendo al menú principal...');
                }
            } else {
                console.log('No se encontró la tarea...');
            }
        }
    }
}

function detallesTarea(tareas: any[], op: number) {
    if (tareas[op - 1] != null) {
        process.stdout.write('\x1B[2J\x1B[0f');
        console.log("   Tarea : " + tareas[op - 1].titulo);
        console.log("   Descripcion : " + tareas[op - 1].descripcion);

        switch (tareas[op - 1].estado.toLowerCase()) {
            case 'p':
                console.log("   Estado : Pendiente");
                break;
            case 'e':
                console.log("   Estado : En curso");
                break;
            case 't':
                console.log("   Estado : Terminada");
                break;
            case 'c':
                console.log("   Estado : Cancelada");
                break;
        }

        console.log(
            "   Creacion : " +
                tareas[op - 1].creacion.getDate() +
                '/' +
                tareas[op - 1].creacion.getMonth() +
                '/' +
                tareas[op - 1].creacion.getFullYear()
        );
        console.log("   Vencimiento : " + tareas[op - 1].vencimiento);
        console.log("   Dificultad : " + tareas[op - 1].dificultad);
    }
}

function editarTarea(tareas: any[], op: number) {
    let temp;
    console.log('Si no desea cambiar el atributo presione Enter');

    temp = prompt()('Ingrese el titulo : ');
    if (temp !== '') {
        tareas[op - 1].titulo = temp;
    }

    temp = prompt()('Ingrese la descripcion : ');
    if (temp !== '') {
        tareas[op - 1].descripcion = temp;
    }

    temp = prompt()('Ingrese el estado [P]endiente, [E]n curso, [T]erminada, [C]ancelada: ');
    if (temp !== '') {
        while (
            temp.toLowerCase() !== 'p' &&
            temp.toLowerCase() !== 'e' &&
            temp.toLowerCase() !== 't' &&
            temp.toLowerCase() !== 'c'
        ) {
            console.log('Valor incorrecto, ingrese nuevamente....');
            temp = prompt()(`Ingrese el estado : [P]endiente, [E]n curso, [T]erminada, [C]ancelada : `);
        }
        tareas[op - 1].estado = temp;
    }

    temp = prompt()('Ingrese la fecha de vencimiento YYYY-MM-DD: ');
    if (temp !== '') {
        tareas[op - 1].vencimiento = temp;
    }

    temp = prompt()('Ingrese la dificultad [1,2,3]: ');
    if (temp !== '') {
        tareas[op - 1].dificultad = temp;
    }

    tareas[op - 1].ultimaEdicion = new Date();
}

export { verTarea };

# Juego-de-preguntas
Juego de selecciona la correcta basico con HTML,Js y CSS

El juego consta de funciones basicas y se pueden agregar preguntas facilmente editando el JSON siguiendo el mismo patron ya hecho

Funciones:
preguntasImportadas = Importa las preguntas desde el json llamado preguntas.json, contempla casos de json inexistente
mostrarPregunta = trae del JSON las preguntas y su respuesta, luego genera botones con las opciones, dentro de la misma se llama a revisarRespuesta
revisarRespuesta = comprueba que el indice del boton presionado sea igual/desigual que la opcion correcta, retornado el feedback del css si es correcta (verde) o incorrecta (rojo), en caso de ser correcta suma un punto al puntaje
reiniciarJuego = setea todo a 0

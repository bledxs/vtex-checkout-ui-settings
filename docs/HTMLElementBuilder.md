# Documentación de `HTMLElementBuilder`

La clase `HTMLElementBuilder` es una herramienta en TypeScript que facilita la creación de elementos HTML con atributos, escuchadores de eventos y contenido personalizado. Esta clase se puede utilizar para construir elementos HTML de manera programática y agregarlos a la página web.

## Tipos

### `Attributes`

`Attributes` es un tipo definido como `Record<string, string>`, lo que significa que es un objeto que contiene pares de clave-valor, donde las claves son cadenas y los valores son cadenas también. Estos pares representan los atributos que se asignarán a un elemento HTML.

### `EventHandler<T>`

`EventHandler` es un tipo de función que toma un argumento de tipo `T`, que es una subclase de `Event`. Representa una función que se ejecutará cuando ocurra un evento específico.

### `EventListeners<T>`

`EventListeners` es un tipo definido como `Record<string, EventHandler<T>>`, lo que indica que es un objeto que contiene pares de clave-valor, donde las claves son cadenas que representan los nombres de eventos y los valores son funciones `EventHandler` que se ejecutarán cuando ocurra el evento correspondiente.

### `Content`

`Content` es un tipo que puede ser una cadena, un array de instancias de `HTMLElementBuilder` o una instancia de `HTMLElementBuilder`. Esto representa el contenido que se agregará al elemento HTML.

## Clase `HTMLElementBuilder`

### Constructor

El constructor de la clase `HTMLElementBuilder` acepta tres argumentos opcionales:

- `tag`: El nombre de la etiqueta HTML que se creará.
- `attributes`: Un objeto de atributos que se asignarán al elemento.
- `eventListeners`: Un objeto de escuchadores de eventos que se asociarán al elemento.

### Método `addContent(content: Content): this`

Este método permite agregar contenido al elemento. Puede tomar una cadena, un array de instancias de `HTMLElementBuilder` o una instancia de `HTMLElementBuilder`. Devuelve la instancia actual de la clase para permitir el encadenamiento de métodos.

### Método `createElement(): HTMLElementTagNameMap[T]`

Crea y devuelve un elemento HTML basado en la etiqueta especificada en el constructor. Aplica los atributos y los escuchadores de eventos definidos en la instancia de `HTMLElementBuilder`. Además, agrega el contenido proporcionado a través de `addContent`.

### Método `appendTo(parent: HTMLElement): this`

Este método agrega el elemento HTML creado por `createElement` como un hijo al elemento `parent` proporcionado. Devuelve la instancia actual para encadenar métodos.

### Método `prependTo(parent: HTMLElement): this`

Similar a `appendTo`, pero agrega el elemento al principio de la lista de hijos del `parent`.

### Método estático `delegateEvents(parent: HTMLElement, eventType: string, selector: string, handler: EventHandler)`

Este método estático permite delegar el manejo de eventos a un elemento primario `parent`. Los eventos del tipo `eventType` que ocurran en elementos hijos que coincidan con el `selector` se manejarán utilizando la función `handler`.

## Ejemplo de Uso

```javascript
// Crear un elemento div con clase "container"
const container = new HTMLElementBuilder("div", { class: "container" });

// Agregar un párrafo y un botón al contenido del elemento div
container.addContent("¡Hola, mundo!");
container.addContent(new HTMLElementBuilder("button", { type: "button" }, { click: (event) => console.log("Botón clickeado") }));

// Crear el elemento y agregarlo al cuerpo del documento
container.appendTo(document.body);
```

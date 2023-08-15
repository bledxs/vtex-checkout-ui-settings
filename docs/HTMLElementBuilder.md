# HTMLElementBuilder

The `HTMLElementBuilder` class provides a convenient and fluent API to dynamically create, configure, and manipulate HTML elements using TypeScript.

## Type Definitions

### Attributes

A record of attribute names and their corresponding values.

```typescript
type Attributes = Record<string, string>
```

### EventHandler

A generic type for event handlers.

```typescript
type EventHandler<T extends Event = Event> = (event: T) => void
```

### EventListeners

A record of event types and their corresponding handlers.

```typescript
type EventListeners<T extends Event = Event> = Record<string, EventHandler<T>>
```

### Content

Represents the content that can be added to an HTML element. It can be a string, a single `HTMLElementBuilder`, or an array of `HTMLElementBuilder` instances.

```typescript
type Content =
  | string
  | Array<HTMLElementBuilder<keyof HTMLElementTagNameMap>>
  | HTMLElementBuilder<keyof HTMLElementTagNameMap>
```

## Class Structure

### Constructor

Creates an instance of `HTMLElementBuilder` with the specified tag name, attributes, event listeners, and content.

```typescript
constructor(tag: T, attributes?: Attributes, eventListeners?: EventListeners, content?: Content)
```

### Public Methods

- **addContent(content: Content): this**
  Adds the specified content to the internal content collection.

- **clearContent(): this**
  Clears all previously added content.

- **addContentIf(condition: boolean, content: Content): this**
  Conditionally adds the specified content if the condition is true.

- **setStyle(property: string, value: string): this**
  Sets a CSS style property to the specified value.

- **addAttributes(attributes: Attributes): this**
  Adds multiple attributes to the element.

- **addEventListeners(listeners: EventListeners): this**
  Adds multiple event listeners to the element.

- **removeEventListener(eventType: string): this**
  Removes a specific event listener from the element.

- **addClass(className: string): this**
  Adds a CSS class to the element.

- **appendTo(parent: HTMLElement): this**
  Appends the built HTML element to the specified parent element.

- **prependTo(parent: HTMLElement): this**
  Prepends the built HTML element to the specified parent element.
<!--  -->
### Static Methods

- **delegateEvents(parent: HTMLElement, eventType: string, selector: string, handler: EventHandler)**  
  Enables event delegation. It listens for the specified event type on the parent element and triggers the handler if the event target matches the provided selector.

## Usage

### 1. Basic Element Creation

Creating a simple `div` with text content:

```typescript
const divBuilder = new HTMLElementBuilder('div')
divBuilder.addContent('Hello, world!')
const divElement = divBuilder.createElement() // Returns an HTMLDivElement with the text "Hello, world!"
```

### 2. Adding Attributes and Content

Creating an anchor (`<a>`) element with attributes and text content:

```typescript
const anchorBuilder = new HTMLElementBuilder('a', { href: 'https://www.example.com' })
anchorBuilder.addContent('Visit Example.com')
const anchorElement = anchorBuilder.createElement() // Returns an HTMLAnchorElement with the specified href and text.
```

### 3. Chaining Methods for Fluent API

Creating a styled button element with event listeners:

```typescript
const button = new HTMLElementBuilder('button')
  .addContent('Click me!')
  .setStyle('backgroundColor', 'blue')
  .setStyle('color', 'white')
  .addEventListeners({
    click: () => alert('Button was clicked!'),
  })
  .createElement()
```

### 4. Nested Elements

Creating a `div` with nested paragraph and anchor elements:

```typescript
const nestedDivBuilder = new HTMLElementBuilder('div').addContent(
  new HTMLElementBuilder('p')
    .addContent('Check out this ')
    .addContent(new HTMLElementBuilder('a', { href: 'https://www.example.com' }).addContent('link')),
)

const nestedDivElement = nestedDivBuilder.createElement()
```

### 5. Appending to DOM

Appending a dynamically created element to the body:

```typescript
const div = new HTMLElementBuilder('div').addContent('Appended to the document body!').appendTo(document.body)
```

### 6. Using Event Delegation

Using the static method to delegate events:

```typescript
HTMLElementBuilder.delegateEvents(document.body, 'click', 'button.dynamic-button', (event) => {
  alert('Dynamically created button was clicked!')
})

new HTMLElementBuilder('button').addClass('dynamic-button').addContent('Dynamic Button').appendTo(document.body)
```

These examples showcase a few of the ways you can use the `HTMLElementBuilder` to simplify dynamic DOM manipulation in TypeScript. The class's fluent API makes it especially powerful for constructing complex DOM structures in a readable manner.

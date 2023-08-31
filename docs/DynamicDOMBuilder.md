# DynamicDOMBuilder - Documentation

`DynamicDOMBuilder` is a class designed to dynamically build and manage DOM elements. It allows users to add, structure, and subsequently insert these elements into the DOM.

## Auxiliary Types

1. **EventHandlers:** A set of types to handle different kinds of events.

    - `CommonEventHandler`: Handles common events.
    - `MouseEventHandler`: Manages mouse events.
    - ... (and other event handlers)

2. **ElementConfig:** Represents the basic structure of an element that will be added to the DOM.

## Main Methods

1. **addElement(tag, attributes, content):**
    - Adds an element to the builder.
    - **tag:** Tag name of the element (e.g., 'div', 'a', 'p').
    - **attributes:** Attributes of the element. Can include styles and events.
    - **content:** Content of the element. If unspecified, the element is treated as a container.

2. **setRoot(element):**
    - Sets the root element to which all built elements will be added.
    - **element:** DOM element where the constructed elements will be inserted.

3. **insertToDOM():** Inserts all constructed elements into the DOM under the root element.

---

## Usage Example

```javascript
// Create a new instance of the builder
const builder = new DynamicDOMBuilder();

// Add a div with id "myDiv" and a paragraph inside with text "Hello World"
builder.addElement('div', { id: 'myDiv' });
builder.addElement('p', {}, 'Hello World');

// Specify the root element and append the built elements
const rootElement = document.getElementById('root');
builder.setRoot(rootElement);
builder.insertToDOM();
```

---

### Note on builderProxy

`builderProxy` is a proxy around `DynamicDOMBuilder`. Its purpose is to provide a more flexible and convenient API to interact with the class. For instance, it allows calls like `builder.div({ id: 'myDiv' })` instead of `builder.addElement('div', { id: 'myDiv' })`.

#### Proxy Usage Example

```javascript
// Assuming we've imported builderProxy as builder:

// Add a div with id "myDiv" and a paragraph inside with text "Hello World"
builder.div({ id: 'myDiv' });
builder.p({}, 'Hello World');

// Specify the root element and append the built elements
const rootElement = document.getElementById('root');
builder.setRoot(rootElement);
builder.insertToDOM();
```

---

I hope this documentation serves as a helpful introduction on how `DynamicDOMBuilder` and `builderProxy` function and how to use them. Of course, for a deeper understanding, it's recommended to directly review the code and the auxiliary types.

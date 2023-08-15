export type Attributes = Record<string, string>

export type EventHandler<T extends Event = Event> = (event: T) => void
export type EventListeners<T extends Event = Event> = Record<string, EventHandler<T>>

type Content =
  | string
  | Array<HTMLElementBuilder<keyof HTMLElementTagNameMap>>
  | HTMLElementBuilder<keyof HTMLElementTagNameMap>

/* The `HTMLElementBuilder` class is a TypeScript class that allows for the creation of HTML elements
with specified attributes, event listeners, and content. */
class HTMLElementBuilder<T extends keyof HTMLElementTagNameMap> {
  private readonly _tag: T
  private _attributes: Attributes
  private _eventListeners: EventListeners
  private _styles: Record<string, string> = {}
  private _content: Content[] = []
  private _element?: HTMLElementTagNameMap[T]
  private _isModified: boolean = true

  constructor(tag: T, attributes?: Attributes, eventListeners?: EventListeners) {
    this._tag = tag
    this._attributes = attributes ?? {}
    this._eventListeners = eventListeners ?? {}
    this._content = []
  }

  /**
   * The function ensures that an element of type T exists and returns it, creating a new element if it
   * doesn't exist or if it has been modified.
   * @returns an element of type `T` from the `_element` property.
   */
  private _ensureElement(): HTMLElementTagNameMap[T] {
    if (!this._element || this._isModified) {
      this._element = this._createElement()
      this._isModified = false
    }

    return this._element
  }

  /**
   * The `_createElement` function creates an HTML element with the specified tag, attributes, event
   * listeners, styles, and content.
   * @returns an HTMLElement of type T, where T is a key of the HTMLElementTagNameMap.
   */
  private _createElement(): HTMLElementTagNameMap[T] {
    const element = document.createElement(this._tag)

    for (const key in this._attributes) {
      element.setAttribute(key, this._attributes[key])
    }

    for (const event in this._eventListeners) {
      element.addEventListener(event, this._eventListeners[event])
    }

    for (const property in this._styles) {
      element.style[property as any] = this._styles[property]
    }

    this._content.forEach((contentItem) => {
      if (typeof contentItem === 'string') {
        const textNode = document.createTextNode(contentItem)

        element.appendChild(textNode)
      } else if (Array.isArray(contentItem)) {
        contentItem.forEach((child: HTMLElementBuilder<keyof HTMLElementTagNameMap>) => {
          element.appendChild(child._ensureElement())
        })
      } else {
        element.appendChild(contentItem._ensureElement())
      }
    })

    return element
  }

  /**
   * The addContent function adds content to an array and sets a flag indicating that the object has
   * been modified.
   * @param {Content} content - The "content" parameter is of type "Content". It represents the content
   * that you want to add to the existing content list.
   * @returns The method is returning the instance of the class itself (this).
   */
  public addContent(content: Content): this {
    this._isModified = true
    this._content.push(content)

    return this
  }

  /**
   * The clearContent function clears the content of an object and marks it as modified.
   * @returns The method is returning the current instance of the class.
   */
  public clearContent(): this {
    this._isModified = true
    this._content = []

    return this
  }

  /**
   * The function adds content to a container if a condition is true.
   * @param {boolean} condition - A boolean value that determines whether the content should be added
   * or not. If the condition is true, the content will be added. If the condition is false, the
   * content will not be added.
   * @param {Content} content - The "content" parameter is of type "Content". It represents the content
   * that you want to add.
   * @returns The method is returning the instance of the class on which it is called.
   */
  public addContentIf(condition: boolean, content: Content): this {
    if (condition) this.addContent(content)

    return this
  }

  /**
   * The function sets a style property and value, and returns the object it was called on.
   * @param {string} property - The property parameter is a string that represents the CSS property you
   * want to set. Examples of CSS properties include "color", "font-size", "background-color", etc.
   * @param {string} value - The value parameter is a string that represents the value to be set for
   * the specified property.
   * @returns The method is returning the instance of the class itself (this).
   */
  public setStyle(property: string, value: string): this {
    this._isModified = true
    this._styles[property] = value

    return this
  }

  /**
   * The addAttributes function modifies the attributes of an object and returns the modified object.
   * @param {Attributes} attributes - The `attributes` parameter is an object that contains key-value
   * pairs representing the attributes to be added or updated.
   * @returns The method is returning the instance of the class on which it is called, represented by
   * the keyword "this".
   */
  public addAttributes(attributes: Attributes): this {
    this._isModified = true
    this._attributes = { ...this._attributes, ...attributes }

    return this
  }

  /**
   * The function adds event listeners to an object and returns the modified object.
   * @param {EventListeners} eventListeners - The `eventListeners` parameter is an object that
   * represents a collection of event listeners. It typically contains key-value pairs, where the keys
   * are event names and the values are the corresponding event listener functions.
   * @returns The method is returning the instance of the class itself (this).
   */
  public addEventListeners(eventListeners: EventListeners): this {
    this._isModified = true
    this._eventListeners = { ...this._eventListeners, ...eventListeners }

    return this
  }

  /**
   * The function removes an event listener for a specific event type and marks the object as modified.
   * @param {string} eventType - The `eventType` parameter is a string that represents the type of event
   * for which the event listener should be removed.
   * @returns The method is returning the instance of the class (`this`) after removing the event
   * listener.
   */
  public removeEventListener(eventType: string): this {
    this._isModified = true
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this._eventListeners[eventType]

    return this
  }

  /**
   * The function adds a class to an HTML element's class attribute.
   * @param {string} className - The `className` parameter is a string that represents the name of the
   * class to be added to the element's `class` attribute.
   * @returns The method is returning the instance of the class itself (i.e., `this`).
   */
  public addClass(className: string): this {
    this._isModified = true
    const existingClass = this._attributes.class || ''

    this._attributes.class = `${existingClass} ${className}`.trim()

    return this
  }

  /**
   * The function appends the element to a parent element and returns itself.
   * @param {HTMLElement} parent - The `parent` parameter is an `HTMLElement` that represents the
   * parent element to which the current element will be appended.
   * @returns The method is returning the instance of the class that the method is defined in.
   */
  public appendTo(parent: HTMLElement): this {
    parent.appendChild(this._ensureElement())

    return this
  }

  /**
   * The `prependTo` function appends the current element to the beginning of a specified parent
   * element.
   * @param {HTMLElement} parent - The `parent` parameter is an `HTMLElement` that represents the parent
   * element to which the current element will be prepended.
   * @returns The method `prependTo` returns the instance of the class that it is called on (`this`).
   */
  public prependTo(parent: HTMLElement): this {
    parent.prepend(this._ensureElement())

    return this
  }

  /**
   * The `delegateEvents` function attaches an event listener to a parent element and delegates the
   * event handling to a specific selector within the parent.
   * @param {HTMLElement} parent - The parent parameter is the HTMLElement that is the parent element
   * of the elements we want to delegate the event to.
   * @param {string} eventType - The `eventType` parameter is a string that represents the type of
   * event you want to listen for, such as "click", "keydown", "mouseover", etc.
   * @param {string} selector - The `selector` parameter is a string that represents a CSS selector. It
   * is used to select the elements within the `parent` element that will trigger the event.
   * @param {EventHandler} handler - The `handler` parameter is a function that will be called when the
   * specified event is triggered on an element that matches the given selector. It is of type
   * `EventHandler`, which means it should accept an `Event` object as its parameter.
   */
  public static delegateEvents(parent: HTMLElement, eventType: string, selector: string, handler: EventHandler) {
    parent.addEventListener(eventType, (event) => {
      const targetElement = event.target as HTMLElement

      if (targetElement.matches(selector)) {
        handler(event)
      }
    })
  }
}

export default HTMLElementBuilder

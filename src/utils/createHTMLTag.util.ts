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
  private readonly _attributes: Attributes
  private readonly _eventListeners: EventListeners
  private readonly _content: Content[]

  constructor(tag: T, attributes?: Attributes, eventListeners?: EventListeners) {
    this._tag = tag
    this._attributes = attributes ?? {}
    this._eventListeners = eventListeners ?? {}
    this._content = []
  }

  /**
   * The function adds content to an array and returns the object it belongs to.
   * @param {Content} content - Content is a parameter of type `Content` that represents the content to
   * be added to an array called `_content`. The `addContent` method takes this parameter and pushes it
   * to the `_content` array. The method then returns the instance of the object on which it was
   * called, allowing for method
   * @returns The `addContent` method is returning the current instance of the class (`this`) after
   * pushing the provided `content` object into the `_content` array property.
   */
  public addContent(content: Content): this {
    this._content.push(content)

    return this
  }

  /**
   * This function creates an HTML element with specified attributes, event listeners, and content.
   * @returns An HTML element of the type specified by the `_tag` property, with any attributes, event
   * listeners, and content specified in the `HTMLElementBuilder` instance.
   */
  public createElement(): HTMLElementTagNameMap[T] {
    const element = document.createElement(this._tag)

    for (const key in this._attributes) {
      element.setAttribute(key, this._attributes[key])
    }

    for (const event in this._eventListeners) {
      element.addEventListener(event, this._eventListeners[event])
    }

    this._content.forEach((contentItem) => {
      if (typeof contentItem === 'string') {
        element.textContent = contentItem
      } else if (Array.isArray(contentItem)) {
        contentItem.forEach((child: HTMLElementBuilder<keyof HTMLElementTagNameMap>) => {
          element.appendChild(child.createElement())
        })
      } else {
        element.appendChild(contentItem.createElement())
      }
    })

    return element
  }
}

export default HTMLElementBuilder

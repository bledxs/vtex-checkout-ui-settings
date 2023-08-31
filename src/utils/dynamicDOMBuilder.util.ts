type CommonEventHandler = (event: Event) => void
type MouseEventHandler = (event: MouseEvent) => void
type KeyboardEventHandler = (event: KeyboardEvent) => void
type TouchEventHandler = (event: TouchEvent) => void
type DragEventHandler = (event: DragEvent) => void
type FocusEventHandler = (event: FocusEvent) => void
type UIEventHandler = (event: UIEvent) => void
type WheelEventHandler = (event: WheelEvent) => void

type AllEventHandlers =
  | CommonEventHandler
  | MouseEventHandler
  | KeyboardEventHandler
  | TouchEventHandler
  | DragEventHandler
  | FocusEventHandler
  | UIEventHandler
  | WheelEventHandler

interface ElementConfig {
  tag: string
  attributes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
    children: ElementConfig[]
    events?: Record<string, AllEventHandlers>
    style?: Record<string, string>
  }
  content?: string
}

function sanitize(input: string): string {
  const tempDiv = document.createElement('div')

  tempDiv.textContent = input

  return tempDiv.innerHTML
}

class DynamicDOMBuilder {
  elements: ElementConfig[]
  currentParent: ElementConfig | null
  root: HTMLElement | null

  constructor() {
    this.elements = []
    this.currentParent = null
    this.root = null // Inicializamos el root en null
  }

  addElement(tag: string, attributes: Record<string, unknown>, content?: string): void {
    const newElement = {
      tag,
      attributes: { ...attributes, children: [] },
      content,
    }

    if (this.currentParent) {
      this.currentParent.attributes.children.push(newElement)
    } else {
      this.elements.push(newElement)
    }

    // Si no tiene contenido, es un elemento padre
    if (!content) {
      this.currentParent = newElement
    } else {
      this.closeElement()
    }
  }

  closeElement(): void {
    if (this.currentParent?.attributes.children.length) {
      this.currentParent = this.currentParent.attributes.children.slice(-1)[0]
    } else {
      this.currentParent = null
    }
  }

  _toHtml(element: ElementConfig): string {
    const { tag, attributes, content } = element
    let html = `<${tag} ${this._attrsToString(attributes)}>`

    if (content) {
      html += sanitize(content)
    } else {
      html += attributes.children.map((child) => this._toHtml(child)).join('')
    }

    html += `</${tag}>`

    return html
  }

  _attrsToString(attrs: Record<string, string>): string {
    let str = ''

    for (const key in attrs) {
      if (key !== 'children' && key !== 'events') {
        if (key === 'style') {
          const styleString = Object.entries(attrs.style)
            .map(([k, v]) => `${k}: ${v}`)
            .join('; ')

          str += ` style="${styleString}"`
        } else {
          str += ` ${key}="${sanitize(attrs[key])}"`
        }
      }
    }

    return str
  }

  setRoot(element: HTMLElement): void {
    this.root = element
  }

  insertToDOM() {
    if (!this.root) {
      console.error('Root element not defined')

      return
    }

    const htmlStr = this.elements.map((el) => this._toHtml(el)).join('')
    const fragment = document.createDocumentFragment()
    const tempDiv = document.createElement('div')

    tempDiv.innerHTML = htmlStr

    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild)
    }

    this.root.appendChild(fragment)
    this._assignEvents(this.elements)
  }

  _assignEvents(elements: ElementConfig[]): void {
    elements.forEach(({ tag, attributes }) => {
      if (attributes?.events) {
        const el = this.root?.querySelector(tag)

        if (!el) return

        for (const eventName in attributes.events) {
          const handler = attributes.events[eventName]

          if (typeof handler !== 'function') el.addEventListener(eventName, handler)
        }
      }

      // Recursivamente asigna eventos a elementos hijos
      if (attributes.children.length) {
        this._assignEvents(attributes.children)
      }
    })
  }
}

const builderProxy = new Proxy(new DynamicDOMBuilder(), {
  get: function (target, prop, receiver) {
    if (prop === 'insertToDOM') {
      return () => {
        target.insertToDOM()
      }
    }

    if (prop === 'setRoot') {
      return (element: HTMLElement) => {
        target.setRoot(element)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[]) => {
      let attributes = {}
      let content = ''

      args.forEach((arg) => {
        if (typeof arg === 'object') {
          attributes = arg
        } else if (typeof arg === 'string') {
          content = arg
        }
      })

      if (content) {
        target.addElement(prop as string, attributes, content)
      } else {
        target.addElement(prop as string, attributes)
      }
    }
  },
})

export default builderProxy

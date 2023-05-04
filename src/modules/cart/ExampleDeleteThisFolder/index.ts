import type { Attributes, EventListeners } from '@/utils/createHTMLTag.util'
import HTMLElementBuilder from '@/utils/createHTMLTag.util'

const createParagraph = () => {
  const paragraphAttributes: Attributes = { class: 'my-paragraph', id: 'my-paragraph' }
  const span = new HTMLElementBuilder<'span'>('span', {}, {}).addContent('Hello, world!')

  return new HTMLElementBuilder<'p'>('p', paragraphAttributes).addContent(span)
}

const createList = () => {
  return new HTMLElementBuilder<'ul'>('ul', { id: 'my-list' })
    .addContent(new HTMLElementBuilder<'li'>('li', {}, {}).addContent('Item 1'))
    .addContent(new HTMLElementBuilder<'li'>('li', {}, {}).addContent('Item 2'))
    .addContent(new HTMLElementBuilder<'li'>('li', {}, {}).addContent('Item 3'))
    .addContent(new HTMLElementBuilder<'li'>('li', {}, {}).addContent('Item 4'))
}
const createButton = () => {
  const handleClick = (event: Event) => {
    const target = event.currentTarget as HTMLElement

    target.classList.toggle('new-class')
    const p = document?.querySelector('#my-paragraph') as HTMLElement
    const currentColor = p.style.color

    if (currentColor === 'red') {
      p.style.color = 'black'
      p.style.fontSize = '1rem'
      p.style.transition = 'all 0.5s ease-in-out'
    } else {
      p.style.color = 'red'
      p.style.fontSize = '2rem'
    }
  }
  const buttonAttributes: Attributes = {
    class: 'my-button',
    id: 'my-button',
    type: 'button',
  }
  const buttonEvents: EventListeners = {
    click: handleClick,
  }
  const button = new HTMLElementBuilder<'button'>('button', buttonAttributes, buttonEvents).addContent('Click me!')

  return button
}

const createContent = () => {
  const contentAttributes: Attributes = {
    class: 'my-class-content',
    id: 'my-id-content',
  }
  const paragraph = createParagraph()
  const list = createList()
  const button = createButton()

  return new HTMLElementBuilder<'div'>('div', contentAttributes)
    .addContent(paragraph)
    .addContent(list)
    .addContent(button)
}

const renderExample = () => {
  try {
    const container = document?.querySelector('.cart-template') as HTMLElement
    const content = createContent()

    if (container.querySelector('#my-list') == null) {
      container.prepend(content.createElement())
    }
  } catch (e) {
    console.error('Error rendering ExampleDeleteThisFolder', e)
  }
}

export default renderExample

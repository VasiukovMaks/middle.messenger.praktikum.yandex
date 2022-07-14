export interface MyEventTarget extends EventTarget {
  value: string
  classList: DOMTokenList
  parentNode: Element
}

export interface MyEvent extends Event {
  target: MyEventTarget
}

import { nanoid } from 'nanoid';
import EventBus from './EventBus';

export default class Block<Props extends {}> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement;

  public id: string = nanoid(8);

  // @ts-ignore
  private readonly _meta: { props: object };

  protected props: Props;

  protected children: any;

  private eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} propsAndChildren
   *
   * @returns {void}
   */
  constructor(propsAndChildren?: any) {
    const eventBus = new EventBus();

    const { props, children } = this.getPropsAndChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props,
    };

    // @ts-ignore
    this.props = this._makePropsProxy(props);

    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus):void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init():void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount():void {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any):boolean {
    console.log(JSON.parse(JSON.stringify(oldProps)), JSON.parse(JSON.stringify(newProps)));
    return true;
  }

  public setProps = (nextProps: any):undefined => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private getPropsAndChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    if (propsAndChildren) {
      Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (value instanceof Block) {
          children[key] = value;
        } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      });
    }

    return { props, children };
  }

  protected initChildren():void {

  }

  protected get element(): HTMLElement {
    return this._element;
  }

  private _render(): void {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value: unknown = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  private _removeEvents(): undefined {
    const events: Record<string, () => void> = this.props.events as any;
    if (!events || !this.element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents(): undefined {
    const events: Record<string, () => void> = this.props.events as any;
    if (!events) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  protected compile(template: (context: any) => string, context: any) {
    const fragment = document.createElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`).join('');

        return;
      }

      context[key] = `<div data-id="id-${child.id}"></div>`;
    });

    fragment.innerHTML = template(context);

    Object.entries(this.children).forEach(([, child]) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id="id-${ch.id}"]`);

          if (!stub) {
            return;
          }

          stub.replaceWith(ch.getContent()!);
        });

        return;
      }
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }
}

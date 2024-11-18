import { ComponentFixture } from "@angular/core/testing";

export abstract class ComponentDriver {

    protected rootEl: HTMLElement;

    constructor(componentRoot: ComponentFixture<any> | HTMLElement) {
        const isFixture = "nativeElement" in componentRoot;
        this.rootEl = isFixture ? componentRoot.nativeElement : componentRoot;

        // When component is rendered in test mode then root element is just div 
        // without any component selector name or attributes. I belive when fixture is used then
        // root element is correct. In other use we should check is it valid.
        if (!isFixture && !this.isValid(this.rootEl)) {
            throw new Error(`The root element passed to constructor is not valid for this driver! RootEl: ${this.rootEl.outerHTML}`);
        }
    }

    protected abstract isValid(rootEl: HTMLElement): boolean;

    public typeTextIntoControl(control: HTMLInputElement | HTMLTextAreaElement, text: string) {
        control.value = text;
        control.dispatchEvent(new Event('input'));
    }

    protected getControlOrThrow<T>(selector: string, errorMessage?: string): T {
        const el = this.rootEl.querySelector(selector);
        if (!el) {
            throw new Error(errorMessage || `Could not find element with selector ${selector}`);
        }
        return el as T;
    }
}
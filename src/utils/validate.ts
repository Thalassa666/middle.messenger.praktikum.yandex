import type Block from "../helpers/block.ts";

export function InputValidation(
    this: Block,
    event: Event,
    input: Block,
    errorText: string = "Некорректное значение",
    ...conditions: RegExp[]
): void {
    const el = event.target as HTMLInputElement;
    const inputValue = el.value;
    const valid = validate(inputValue, ...conditions);
    valid
        ? input.setProps({ error: false, errorText: "" })
        : input.setProps({ error: true, errorText });
    this.setProps({ [input.props.name as string]: inputValue });
}

export function validate(str: string, ...conditions: RegExp[]): boolean {
    let valid = true;
    conditions.forEach((condition) => {
        if (condition.test(str) === false) {
            valid = false;
        }
    });
    return valid;
}

export const conditions = {
    login: [/[a-zA-Z]{3,}/],
    password: [/[A-Z]/, /[a-z]/, /[0-9]/, /[^.$]{8,40}/],
    email: [/^[\w-]+@[a-zA-Z]+\.[a-zA-Z]+$/],
    phone: [/^\+?\d{10,15}$/],
    names: [/^[A-ZА-Я][A-Za-zА-Яа-я-]+$/],
};

import { getFormData } from "./getFormData";

export default function handleSubmit(event: Event) {
    event.preventDefault();
    const form = (event.target as HTMLElement).closest("form");
    if (!form) return;

    const inputs = form.querySelectorAll("input");
    let isFormValid = true;

    inputs.forEach((input) => {
        const blurEvent = new FocusEvent("blur", { relatedTarget: input });
        input.dispatchEvent(blurEvent);

        if (input.classList.contains("input-error")) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        console.log(getFormData(event));
    }
}

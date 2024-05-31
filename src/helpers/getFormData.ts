export function getFormData(event: Event): Record<string, unknown> {
    const form = (event.target as HTMLElement).closest('form');
    if (form) {
        const formData = new FormData(form);
        const formDataObject = {} as Record<string, unknown>;
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        return formDataObject;
    }
    return {};
}

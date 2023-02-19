export const getElementCenter = (element: HTMLElement) => {
    const { x, y, width } = element.getBoundingClientRect();

    return {
        x: (x + width / 2) / window.innerWidth,
        y: (y) / window.innerHeight,
    };
};

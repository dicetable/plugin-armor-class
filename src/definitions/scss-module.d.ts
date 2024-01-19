declare module '*.scss' {
    const classes: Record<string, string>;
    const css: string;
    const content: Record<string, string>;
    export default content;
    export { classes, css };
}

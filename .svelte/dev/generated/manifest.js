import * as layout from "..\\components\\layout.svelte";

const components = [
	() => import("..\\..\\..\\src\\routes\\index.svelte")
];

const d = decodeURIComponent;
const empty = () => ({});

export const routes = [
	// src/routes/index.svelte
[/^\/$/, [components[0]]]
];

export { layout };
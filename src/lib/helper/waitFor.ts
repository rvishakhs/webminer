import { se } from "date-fns/locale";

export function waitFor(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
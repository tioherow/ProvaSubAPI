export interface Curso {
    course_id: number;
    name: string;
    description?: string; // O campo description é opcional
    duration: number;
    price: number;
}

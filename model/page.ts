export type Pagging = {
    size: number;
    total_page: number;
    current_page: number;
}


export type PageTable<T> = {
    data: Array<T>;
    pagging: Pagging;
}
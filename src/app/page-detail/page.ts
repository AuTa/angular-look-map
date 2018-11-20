export class Page {
    uuid: string;
    latitude: number;
    longitude: number;
    title: string;
    information: {
        alt: string;
        url: string,
        color: string,
        author: string,
        protag: string,
        content: string,
        category: string[],
        contag: string
    };
}

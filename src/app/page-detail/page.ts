export class Page {
    uuid: string;
    latitude: number;
    longitude: number;
    title: string;
    information: {
        image_alt: string;
        url: string,
        color: string,
        author: string,
        protag: string,
        image_url: string,
        category: string[],
        contag: string,
        content?: string
    };
}

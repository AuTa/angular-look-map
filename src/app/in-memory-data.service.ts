import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Page } from './page-detail/page';

export class InMemoryPageDbService implements InMemoryDbService {
    createDb() {
        const pages = [
            { uuid: '11', latitude: 110.110, longitude: 11.11, title: 'page-11' },
            { uuid: '12', latitude: 120.120, longitude: 12.12, title: 'page-12' },
            { uuid: '13', latitude: 130.130, longitude: 13.13, title: 'page-13' },
            { uuid: '14', latitude: 140.140, longitude: 14.14, title: 'page-14' },
            { uuid: '15', latitude: 150.150, longitude: 15.15, title: 'page-15' },
            { uuid: '16', latitude: 160.160, longitude: 16.16, title: 'page-16' },
            { uuid: '17', latitude: 170.170, longitude: 17.17, title: 'page-17' },
            { uuid: '18', latitude: 180.180, longitude: 18.18, title: 'page-18' },
            { uuid: '19', latitude: 190.190, longitude: 19.19, title: 'page-19' },
            { uuid: '20', latitude: 200.200, longitude: 20.20, title: 'page-20' },
        ];
        return {pages};
    }

}

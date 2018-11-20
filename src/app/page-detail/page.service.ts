import { Injectable } from '@angular/core';
import { Page } from './page';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { isArray } from 'util';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  pages: Observable<Page[]>;
  showPages: Observable<Page[]>;
  private _pages: BehaviorSubject<Page[]> = new BehaviorSubject([]);
  private _showPages: BehaviorSubject<Page[]> = new BehaviorSubject([]);
  private baseUrl = 'api/pages';
  private dataStore: {  // This is where we will store our data in memory
    pages: Page[]
  } = { pages: [] };
  private showQuery: {} = {};

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
    this.pages = this._pages.asObservable();
    this.showPages = this._showPages.asObservable();
  }

  getPages() {
    this.http.get<Page[]>(this.baseUrl)
      .subscribe(pages => {
        this.dataStore.pages = pages;
        this._pages.next(Object.assign({}, this.dataStore).pages);
        this.setShowPages();
        this.log('fetched pages');
      },
        catchError(this.handleError(`getPages`, [])));
  }

  setShowQuery(protery: string, matchs: any[]) {
    this.showQuery[protery] = matchs;
    this.setShowPages();
  }

  setShowPages() {
    let pages = Object.assign({}, this.dataStore).pages;
    if (this.showQuery) {
      for (const protery in this.showQuery) {
        if (this.showQuery.hasOwnProperty(protery)) {
          const matchs = this.showQuery[protery];
          if (!isArray(matchs) || matchs.length === 0) {
            continue;
          }
          const proterys = protery.split('.');
          pages = pages.filter(page => {
            let v: any = page;
            proterys.forEach(p => {
              try {
                v = v[p];
              } catch (e) {
                throw new Error(`protery error`);
              }
            });
            return matchs.indexOf(v) !== -1;
          });
        }
      }
    }
    this._showPages.next(pages);
  }

  updatePage(page: Page) {
    this.dataStore.pages.forEach((t, i) => {
      if (t.uuid === page.uuid && t !== page) {
        this.dataStore.pages[i] = page;
      }
    });

    this._pages.next(Object.assign({}, this.dataStore).pages);
  }

  getPage(uuid: string) {
    let notFound = true;

    this.dataStore.pages.forEach((item, index) => {
      if (item.uuid === uuid) {
        notFound = false;
      }
    });
    const url = `${this.baseUrl}/${uuid}`;
    this.messageService.add(`PageService: fetched page uuid=${uuid}`);
    return this.http.get<Page>(url).pipe(
      tap(_ => this.log(`fetched page uuid=${uuid}`)),
      catchError(this.handleError<Page>(`getPage uuid=${uuid}`))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PageService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PageService: ${message}`);
  }
}

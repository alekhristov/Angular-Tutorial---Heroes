import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private messageService: MessageService;
  private http: HttpClient;
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(messageService: MessageService, http: HttpClient) {
    this.messageService = messageService;
    this.http = http;
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching all heroes
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

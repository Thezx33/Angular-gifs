import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '5PgTUJMm50sNFD9yzkSbN9Wb0vlasKt5';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  // Obtener replica del arreglo del historial
  get historial() {
    return [ ...this._historial ];
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse( localStorage.getItem( 'historial' ) ) || [];
    this.resultados = JSON.parse( localStorage.getItem( 'resultado' ) ) || [];
  }

  // Añadir busqueda al historial
  buscarGifs( query: string = '' ) {
    
    query = query.trim().toLocaleLowerCase();

    if ( !this.historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.splice( 0, 10 );

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );

    }
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params }).subscribe( ( resp ) => {
      console.log( resp.data );

      this.resultados = resp.data;
      localStorage.setItem( 'resultado', JSON.stringify( this.resultados ) );
    });
    
    

  }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '5PgTUJMm50sNFD9yzkSbN9Wb0vlasKt5';
  private _historial: string[] = [];


  // Obtener replica del arreglo del historial
  get historial() {
    return [ ...this._historial ];
  }

  constructor( private http: HttpClient ) {}

  // Añadir busqueda al historial
  async buscarGifs( query: string ) {
    
    query = query.trim().toLocaleLowerCase();

    if ( !this.historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.splice( 0, 10 );
    }
    
    const resp = await fetch('api.giphy.com/v1/gifs/search?api_key=R0CafjnSIuiMF7cYj3f28fT0VSZCLW6W&q=dragon ball z&limit=10');
    console.log( resp );
    
    

  }

}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  session: any = {
    token: ""
  }

  PrimaryUrl: string = 'http://localhost:8082/api';

  constructor(public http: HttpClient,
    public router: Router,
  ) {

  }

  get(endPointg: string, params?: any, optn?: any) {

    try {

      let headers;
      if (this.session)
        headers = new HttpHeaders().set('Authorization', 'ABS ' + String(this.session.token));

      console.log("headers", headers)
      if (!optn) {
        optn = { params: new HttpParams() };
      }
      let p = [];
      let newParam;
      if (params) {
        for (let k in params) {
          let str = k + '=' + params[k];
          p.push(str);
        }
        newParam = p.join('&');
      }

      return this.http.get<any>(
        this.PrimaryUrl + '/' + endPointg + '?' + newParam, { headers: headers }
      ).pipe(
        catchError((err) => {
          console.error("status" + err.status);
          if (err.status == 401 || err.status == 440) {
            localStorage.clear()
            this.redirect("/login");
          }

          throw err;
        })
      );


    } catch (error) {

      console.error("Error http", error);
      throw error

    }
  }
  post(endPointg: string, params?: any, optn?: any) {

    let headers;

    if (this.session)
      headers = new HttpHeaders().set('Authorization', 'ABS ' + String(this.session.token));
    

    if (!optn) {
      optn = { params: new HttpParams() };
    }

    return this.http.post<any>(this.PrimaryUrl + '/' + endPointg, params,
      { headers: headers }).pipe(
        catchError((err) => {
          console.error("status" + err.status);

          if (err.status == 401 || err.status == 440) {
            localStorage.clear()
            this.redirect("/login");
          }

          throw err;

        })
      );
  }
  put(endPointg: string, params?: any, optn?: any) {

    let headers;

    if (this.session?.token)
      headers = new HttpHeaders().set('Authorization', 'ABS ' + String(this.session.token))

    if (!optn) {
      optn = { params: new HttpParams() };
    }


    return this.http.put<any>(this.PrimaryUrl + '/' + endPointg, params,
      { headers: headers }).pipe(
        catchError((err) => {
          console.error("status" + err.status);

          if (err.status == 401 || err.status == 440) {
            localStorage.clear()
            this.redirect("/login");
          }


          throw err;

        })
      );
  }

  delete(endPointg: string, params?: any, optn?: any) {

    let headers;
    if (this.session)
      headers = new HttpHeaders().set('Authorization', 'ABS ' + String(this.session.token));

    console.log("headers", headers)
    if (!optn) {
      optn = { params: new HttpParams() };
    }
    let p = [];
    let newParam;
    if (params) {
      for (let k in params) {
        let str = k + '=' + params[k];
        p.push(str);
      }
      newParam = p.join('&');
    }
    return this.http.delete<any>(
      this.PrimaryUrl + '/' + endPointg + '?' + newParam, { headers: headers }
    ).pipe(
      catchError((err) => {
        console.error("status" + err.status);

        if (err.status == 401 || err.status == 440) {
          localStorage.clear()
          this.redirect("/login");
        }


        return (err);
      })
    );
  }


  redirect(url: string, params = null) {
    if (params == null) {
      this.router.navigate([url]);
    } else {
      this.router.navigate([url, params]);
    }
  }

}
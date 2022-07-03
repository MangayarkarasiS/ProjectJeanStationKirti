import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import{environment} from '../../../environments/environment';
import { ResetPasswordModel } from '../Models/ResetPasswordModel';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  public token: string = '';
    constructor(private _http: HttpClient, private _Route: Router)
    {

    }
    private isUserExistUrl = environment.apiEndpoint+"/api/User/IsUserPhoneExists?phoneNumber=";
    private changePasswordUrl = environment.apiEndpoint+"/api/User/ResetPassword/";


    public IsUserPhoneExists(Id:any) {
        var editUrl = this.isUserExistUrl + Id;
        // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this._http.get<boolean>(editUrl).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public changePassword(resetPasswordModel:ResetPasswordModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.put<any>(this.changePasswordUrl, resetPasswordModel, { headers: headers })
            .pipe(tap(data =>
            {
                console.log(data);

                if (data.Token != null)
                {
                    if (data.Usertype != "0") {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        // localStorage.setItem('currentUser', JSON.stringify({ username: resetPasswordModel.Username, token: data.Token }));
                    }
                    else if (data.Usertype == "1") {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        // localStorage.setItem('AdminUser', JSON.stringify({ username: resetPasswordModel.Username, token: data.Token }));
                    }
                    // return true to indicate successful login
                    return data; 
                } else {
                    // return false to indicate failed login
                    return null;
                }
            }),
                catchError(this.handleError)
            );
    }

    

    LogoutUser() {
        localStorage.removeItem('currentUser');
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
}

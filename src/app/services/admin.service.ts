import { stringify } from 'querystring';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/Company';
import { Customer } from '../models/Customer';
import { Coupon } from '../Models/Coupon';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private BASE_URL = 'http://localhost:8080/admin';
  private GET_ALL_CUSTOMERS_URL = this.BASE_URL + '/get-customers';
  private LOGIN_URL = this.BASE_URL + '/login/';
  private DELETE_CUSTOMER_URL = this.BASE_URL + '/delete-customer/';
  private ADD_CUSTOMER_URL = this.BASE_URL + '/add-customer/';
  private UPDATE_CUSTOMER_URL = this.BASE_URL + '/update-customer/';
  private GET_ALL_COMPANIES_URL = this.BASE_URL + '/get-companies';
  private DELETE_COMPANY_URL = this.BASE_URL + '/delete-company/';
  private ADD_COMPANY_URL = this.BASE_URL + '/add-company';
  private UPDATE_COMPANY_URL = this.BASE_URL + '/update-company';
  private GET_ONE_COMPANY = this.BASE_URL + '/get-one-company/'
  private GET_ONE_CUSTOMER = this.BASE_URL + '/get-one-customer/'
  private LOGOUT_URL = this.BASE_URL + '/logout';
  // admin: any;
  token: string;


  constructor(private httpClient: HttpClient) {
    if(sessionStorage.token){
      this.token = sessionStorage.token;
    }
  }

  public setToken(token: string){
    this.token = token;
    sessionStorage.token = token;
  }

  public forgetToken(){
    this.token = undefined;
    sessionStorage.removeItem("token");
  }

  public loginAdmin(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.LOGIN_URL + email + '/' + password, null);
  }

  public getAllCustomers(): Observable<Customer[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Customer[]>(this.GET_ALL_CUSTOMERS_URL, options);
  }

  public logout(): Observable<any>{
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.delete(this.LOGOUT_URL, options);
  }

  public deleteCustomer(id: number): Observable<any> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.delete(this.DELETE_CUSTOMER_URL + id, options);
  }

  public addCustomer(customer: Customer): Observable<any> {
    const body = {
      lastName: customer.lastName, firstName: customer.firstName, email: customer.email, password: customer.password, coupons: customer.coupons
    }
    const options = {withCredentials: true, headers: new HttpHeaders().append('authorization', this.token) };
    return this.httpClient.post<any>(this.ADD_CUSTOMER_URL, body, options);
  }

  public updateCustomer(customer: Customer): Observable<any> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.put<any>(this.UPDATE_CUSTOMER_URL, customer, options);
  }

  public addCompany(company: Company): Observable<any> {
    const body = {
      name: company.name, email: company.email, password: company.password, coupons: company.coupons
    }
    const options = { withCredentials: true, headers: new HttpHeaders().append('authorization', this.token) };
    return this.httpClient.post<any>(this.ADD_COMPANY_URL, body, options);
  }

  public updateCompany(company: Company): Observable<any> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.put<any>(this.UPDATE_COMPANY_URL, company, options);
  }

  public getAllCompanies(): Observable<Company[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Company[]>(this.GET_ALL_COMPANIES_URL, options);
  }

  public deleteCompany(id: number): Observable<any> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.delete(this.DELETE_COMPANY_URL + id, options);
  }

  public getOneCompany(id: number): Observable<Company> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Company>(this.GET_ONE_COMPANY + id, options);
  }

  public getOneCustomer(id: number): Observable<Customer> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Customer>(this.GET_ONE_CUSTOMER + id, options);
  }

}

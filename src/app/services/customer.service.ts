import { Coupon } from './../models/Coupon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer';
import { Category } from '../models/Category';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private BASE_URL = 'http://localhost:8080/customer';
  private LOGIN_URL = this.BASE_URL + '/login/';
  private GET_ALL_CUSTOMERS_URL = this.BASE_URL + '/get-customers';
  private GET_CUSTOMER_COUPONS_URL = this.BASE_URL + '/get-customer-coupon';
  private GET_COUPONS_BY_CATEGORY_URL = this.BASE_URL+ '/findCouponsByCategory/'
  private GET_COUPONS_BY_PRICE_URL = this.BASE_URL+ '/findCouponsByPrice/'
  private UPDATE_CUSTOMER_URL = this.BASE_URL + '/update-customer';
  private GET_ALL_COUPONS_URL = this.BASE_URL + '/get-coupons';
  private PURCHASE_COUPON_URL= this.BASE_URL + '/add-purchase-coupon';
  private GET_CUSTOMER_DETAILS_URL = this.BASE_URL + '/get-details'
  private LOGOUT_URL = this.BASE_URL + '/logout';
  customer: Customer;
  token: string;


  constructor(private httpClient: HttpClient) {


    if(sessionStorage.token){
      this.token = sessionStorage.token;
    }
    if(sessionStorage.customer){
      this.customer = JSON.parse(sessionStorage.customer);
    }
  }

  public setCustomer(customer: Customer){
    this.customer = customer;
    sessionStorage.customer = JSON.stringify(customer);
  }

  public forgetCustomer(){
    this.customer = undefined;
    sessionStorage.removeItem("customer");
  }

  public setToken(token: string){
    this.token = token;
    sessionStorage.token = token;
  }

  public forgetToken(){
    this.token = undefined;
    sessionStorage.removeItem("token");
  }

  public loginCustomer(email: string, password: string): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.LOGIN_URL+email+'/'+ password, null);
  }

  public logout(): Observable<any>{
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.delete(this.LOGOUT_URL, options);
  }

  public getAllCustomers(): Observable<Customer[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Customer[]>(this.GET_ALL_CUSTOMERS_URL, options);
  }

  public getCustomerDetails(): Observable<Customer> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Customer>(this.GET_CUSTOMER_DETAILS_URL, options);
  }

  public getAllCustomersCoupons(): Observable<Coupon[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Coupon[]>(this.GET_CUSTOMER_COUPONS_URL, options);
  }

  public getCouponsByCategory(category: Category): Observable<Coupon[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Coupon[]>(this.GET_COUPONS_BY_CATEGORY_URL+ category, options);
  }

  public getCouponsByPrice(price: number): Observable<Coupon[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Coupon[]>(this.GET_COUPONS_BY_PRICE_URL+ price, options);
  }

  public updateCustomer(customer: Customer): Observable<any> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.put<any>(this.UPDATE_CUSTOMER_URL, customer, options);
  }

  public getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.GET_ALL_COUPONS_URL);
  }

  public purchaseCoupon(coupon: Coupon): Observable<Coupon> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.post<Coupon>(this.PURCHASE_COUPON_URL, coupon, options);
  }


}

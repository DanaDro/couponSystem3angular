
import { Coupon } from './../models/Coupon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './../models/Category';
import { Company } from '../models/Company';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private BASE_URL = 'http://localhost:8080/company';
  private LOGIN_URL = this.BASE_URL + '/login/';
  private GET_COUPONS_URL = this.BASE_URL+ '/get-company-coupon'
  private ADD_COUPON_URL = this.BASE_URL + '/add-coupon/';
  private UPDATE_COUPON_URL = this.BASE_URL + '/update-coupon/';
  private DELETE_COUPON_URL = this.BASE_URL + '/delete-coupon/';
  private GET_COUPONS_BY_CATEGORY_URL = this.BASE_URL+ '/findCouponsByCategory/'
  private GET_COUPONS_BY_PRICE_URL = this.BASE_URL+ '/findCouponsByPrice/'
  private GET_ONE_COUPON = this.BASE_URL + '/get-one/'
  private UPDATE_COMPANY_URL = this.BASE_URL + '/update-company';
  private GET_COMPANY_DETAILS_URL = this.BASE_URL + '/get-details'
  private LOGOUT_URL = this.BASE_URL + '/logout';

  token: string;
  company: any;

  constructor(private httpClient: HttpClient) {

    if(sessionStorage.token){
      this.token = sessionStorage.token;
    }
    if(sessionStorage.company){
      this.company = JSON.parse(sessionStorage.company);
    }
  }

  public setCompany(company: Company){
    this.company = company;
    sessionStorage.company = JSON.stringify(company);
  }

  public forgetCompany(){
    this.company = undefined;
    sessionStorage.removeItem("company");
  }

  public setToken(token: string){
    this.token = token;
    sessionStorage.token = token;
  }

  public forgetToken(){
    this.token = undefined;
    sessionStorage.removeItem("token");
  }

  public loginCompany(email: string, password: string): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.LOGIN_URL+email+'/'+ password, null);
  }

  public logout(): Observable<any>{
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.delete(this.LOGOUT_URL, options);
  }

  public getAllCoupons(): Observable<Coupon[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Coupon[]>(this.GET_COUPONS_URL, options);
  }

  public addCoupon(coupon: Coupon): Observable<Coupon> {
    const body = {
      companyId: coupon.companyId, category: coupon.category, title: coupon.title, description: coupon.description, startDate: coupon.startDate, endDate: coupon.endDate, amount: coupon.amount, price: coupon.price, image: coupon.image
    }
    const options = {withCredentials: true, headers: new HttpHeaders().append('authorization', this.token)};
    return this.httpClient.post<Coupon>(this.ADD_COUPON_URL, body, options);
  }

  public updateCoupon(coupon: Coupon): Observable<Coupon> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.put<Coupon>(this.UPDATE_COUPON_URL, coupon, options);
  }

  public deleteCoupon(id: number): Observable<any> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.delete(this.DELETE_COUPON_URL + id, options);
  }

  public getCouponsByCategory(category: Category): Observable<Coupon[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Coupon[]>(this.GET_COUPONS_BY_CATEGORY_URL+ category, options);
  }

  public getCouponsByPrice(price: number): Observable<Coupon[]> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Coupon[]>(this.GET_COUPONS_BY_PRICE_URL+ price, options);
  }

  public getOneCoupon(id: number): Observable<Coupon> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Coupon>(this.GET_ONE_COUPON + id, options);
  }

  public getCompanyDetails(): Observable<Company> {
    let options = {headers: new HttpHeaders().append('authorization', this.token)}
    return this.httpClient.get<Company>(this.GET_COMPANY_DETAILS_URL, options);
  }

}

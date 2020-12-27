import { Coupon } from './Coupon';

export class Customer {
  // category(category: any) {
  //   throw new Error('Method not implemented.');
  // }
  // getAllCustomers() {
  //   throw new Error('Method not implemented.');
  // }
  public constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public coupons?: Coupon[]) {
  }
}

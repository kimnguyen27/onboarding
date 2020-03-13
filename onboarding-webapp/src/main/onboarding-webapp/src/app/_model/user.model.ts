import {PhoneModel} from "./phone.model";

export class UserModel {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  phones: PhoneModel[];
}

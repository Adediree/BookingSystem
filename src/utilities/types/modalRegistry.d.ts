import { ModalEnum } from "../enums/modalEnum";
// import {BookingSummaryModalProps} from "../../BookingSummary"
declare module "qore-components" {
  interface ModalRegistry {
    [ModalEnum.BookingSummaryModal]: {
      data: void
      result: boolean;
    };
  }
}

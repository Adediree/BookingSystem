"use client";
import { ModalEnum } from "./utilities/enums/modalEnum";
import { useModalRegistrations } from "qore-components";
import "./globalModal.css";
import { BookingSummaryModal } from "./BookingSummary";

const GlobalModal = () => {
  useModalRegistrations([
    {
      key: ModalEnum.BookingSummaryModal,
      component: BookingSummaryModal,
      defaultConfig: {
        backdrop: "blur",
        containerClassName: "bookingSummaryModal",
        // closeOnEscape: false,
        // closeOnBackdropClick:false,
      },
    },
  ]);
  return <></>;
};
export default GlobalModal;

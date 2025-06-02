"use client";

import { modalAtom } from "@/atoms/modalAtomStore";
import { ModalType } from "@/types/modal";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const useModal = () => {
  const [modals, setModals] = useAtom(modalAtom);

  const openModal = useCallback((modalType: ModalType) => {
    setModals((prev) => [...prev, modalType]);
  }, []);

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1)); // 마지막 모달만 제거
  };

  const getCurrentModal = () => modals[modals.length - 1];

  return { openModal, closeModal, getCurrentModal };
};

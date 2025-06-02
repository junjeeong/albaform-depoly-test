"use client";

import { useEffect, useRef } from "react";
import { useModal } from "@/hooks/useModal";

const NoticeIsClosed = () => {
  const { openModal } = useModal();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const showModal = () => {
      if (!hasShownToast.current) {
        openModal("ClosedAlbaformModal");
        hasShownToast.current = true;
      }
    };

    showModal();
  }, [openModal]);

  return null;
};

export default NoticeIsClosed;

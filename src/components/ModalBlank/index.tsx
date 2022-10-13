import React, { useRef, useEffect } from "react";
import Transition from "../../utils/Transition";

interface ModalBlankProps {
  children: React.ReactNode;
  id: string;

  modalOpen: boolean;
  setModalOpen?: (open: boolean) => void;
}
function ModalBlank({
  children,
  id,
  modalOpen,
  setModalOpen,
}: ModalBlankProps) {
  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
        appear={true}
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
        appear={true}
      >
        <div className="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
          {children}
        </div>
      </Transition>
    </>
  );
}

export default ModalBlank;

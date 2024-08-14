import { Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from "@nextui-org/modal";
import CustomButton from "./button";

type ModalProps = {
  isOpen: boolean;
  size?: "xl" | "2xl" | "4xl";
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  action: () => void;
  actionTitle?: string;
};

export default function CustomModal({
  isOpen,
  size = "4xl",
  onClose,
  children,
  title,
  action,
  actionTitle = "Guardar",
}: ModalProps) {
  return (
    <>
      <Modal
        backdrop="blur"
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        className="bg-gradient-to-b from-slate-900 to-slate-700"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-white">{title}</ModalHeader>
              <ModalBody className="w-full h-full">{children}</ModalBody>
              <ModalFooter>
                <CustomButton text={actionTitle} onClick={action} buttonType="primary" />
                <CustomButton text="Cerrar" onClick={onClose} buttonType="secondary" />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import { Dialog, DialogContent } from "@shadcn/dialog";
import { ReactElement } from "react";

const CustomDialog = ({
  maxWidth = "max-w-3xl",
  children,
  isOpen,
  closeModal,
}: {
  maxWidth?: string;
  children: ReactElement;
  isOpen: boolean;
  closeModal: () => void;
}) => {
  return (
    <Dialog open={isOpen || false} onOpenChange={closeModal}>
      <DialogContent className={`max-w-[425px] ${maxWidth}`}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;

import { Modal as MuiModal } from "@mui/material"
import Button from "../Button/Button"

export interface ModalProps {
  handleClose: () => void
  handleSave: () => void
  title: string
  content: string
}
const Modal = ({ handleClose, title, content, handleSave }: ModalProps) => {
  return (
    <MuiModal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-fit flex flex-col gap-8 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl">
        <span className="text-4xl">{title}</span>
        <span className="text-xl">{content}</span>
        <div className="self-end flex flex-row gap-2">
          <Button label="Cancel" type="secondary" onClick={handleClose} />
          <Button label="Save" onClick={handleSave} />
        </div>
      </div>
    </MuiModal>
  )
}

export default Modal

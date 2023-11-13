import DetailPost from "./DetailPost";
import Modal from "../component/Modal/Modal";

type Props = {
  id: string;
  onClose: () => void;
};

export default function DetailPostPortal({ id, onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div className="top-0 left-0 h-full ">
        <DetailPost postId={id} />,
      </div>
    </Modal>
  );
}

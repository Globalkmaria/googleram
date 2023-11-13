import DetailPost from "./DetailPost";
import ModalPortal from "../component/Modal/ModalPortal";

type Props = {
  id: string;
  onClose: () => void;
};

export default function DetailPostPortal({ id, onClose }: Props) {
  return (
    <ModalPortal onClose={onClose}>
      <div className="top-0 left-0 h-full ">
        <DetailPost postId={id} />,
      </div>
    </ModalPortal>
  );
}

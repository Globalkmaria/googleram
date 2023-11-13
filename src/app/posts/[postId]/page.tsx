import DetailPost from "@/app/homeComponent/DetailPost";

type Props = {
  params: {
    postId: string;
  };
};

export default function page({ params }: Props) {
  return (
    <div className="flex items-center">
      <DetailPost postId={params.postId} />
    </div>
  );
}

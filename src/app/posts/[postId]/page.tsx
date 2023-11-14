import DetailPost from "@/app/homeComponent/DetailPost";

type Props = {
  params: {
    postId: string;
  };
};

export default function page({ params }: Props) {
  return (
    <div className="w-full h-full">
      <DetailPost postId={params.postId} />
    </div>
  );
}

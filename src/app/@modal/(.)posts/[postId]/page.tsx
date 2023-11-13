"use client";

import DetailPostPortal from "@/app/homeComponent/DetailPostPortal";

type Props = {
  params: {
    postId: string;
  };
};

export default function page({ params }: Props) {
  return <DetailPostPortal id={params.postId} />;
}

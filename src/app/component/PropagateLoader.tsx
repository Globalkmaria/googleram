import dynamic from "next/dynamic";

const PropagateLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.PropagateLoader),
  {
    ssr: false,
  }
);

export default function Loader({ color = "#d946ef" }) {
  return <PropagateLoader color={color} />;
}

import dynamic from "next/dynamic";

const PulseLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.PulseLoader),
  {
    ssr: false,
  }
);

export default function Loader({ color = "#d946ef" }) {
  return <PulseLoader size={6} color={color} />;
}

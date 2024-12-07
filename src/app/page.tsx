import dynamic from "next/dynamic";

const ResponsiveGridComponent = dynamic(
  () => import("@/components/ResponsiveGridComponent"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  return <ResponsiveGridComponent />;
}

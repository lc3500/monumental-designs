import ImageDetailClient from "./ImageDetailClient";

const images = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

export const dynamic = "force-static";

export function generateStaticParams() {
  return images.map((image) => ({ "image-id": image }));
}

export default async function ImageDetailPage({
  params,
}: {
  params: Promise<{ "image-id": string }>;
}) {
  const resolvedParams = await params;
  return (
    <ImageDetailClient
      imageId={resolvedParams["image-id"]}
      images={images}
    />
  );
}

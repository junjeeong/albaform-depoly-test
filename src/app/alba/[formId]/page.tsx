import Carousel from "@/components/Carousel/Carousel";
import Content from "../components/Content";
import Title from "../components/Title";
import StoreLocation from "../components/StoreLocation";
import SimpleRequirements from "../components/SimpleRequirements";
import EmployerInfo from "../components/EmployerInfo";
import DetailRequirements from "../components/DetailRequirements";
import NoticeApplicant from "./components/NoticeApplicant";
import NoticeIsClosed from "../components/NoticeIsClosed";
import ScrapAndShareButton from "../components/ScrapAndShareButton";
import OwnerActionButtons from "../components/OwnerActionButtons";
import fetchAlbarformDetailData from "./fetchAlbarformDetailData";
import ApllicantActionButtons from "./components/ApllicantActionButtons";
import { cookies } from "next/headers";
import { cls } from "@/utils/dynamicTailwinds";
import { AlbaformDetailData } from "@/types/alba";
import isPast from "@/utils/isPast";
import ContentsSection from "@/app/alba/[formId]/components/ContentsSection";

type PageProps = {
  params: Promise<{ formId: string }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { formId } = await params;
  const data: AlbaformDetailData = await fetchAlbarformDetailData(formId);

  return {
    title: "알바폼 상세페이지",
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.imageUrls[0],
          width: 400,
          height: 400,
        },
      ],
    },
  };
};

const AlbarformDetailPage = async ({ params }: PageProps) => {
  const cookie = await cookies();
  const role = cookie.get("role")?.value || "Guest";
  const userId = cookie.get("id")?.value;
  const { formId } = await params;

  const data: AlbaformDetailData = await fetchAlbarformDetailData(formId);
  const isMyAlbarform = Number(userId) === data.ownerId;
  const isClosed = isPast(data.recruitmentEndDate);

  return (
    <section className="max-w-[1400px] p-5">
      <Carousel imageUrls={data.imageUrls} />
      <ContentsSection
        role={role}
        formId={formId}
        isMyAlbarform={isMyAlbarform}
        data={data}
      />

      {isClosed && <NoticeIsClosed />}
      {!isClosed && data.applyCount > 0 && (
        <NoticeApplicant count={data.applyCount} />
      )}
      {role === "APPLICANT" && (
        <ScrapAndShareButton formId={formId} isScrapped={data.isScrapped} />
      )}
    </section>
  );
};

export default AlbarformDetailPage;

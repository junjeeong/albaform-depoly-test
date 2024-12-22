import Title from "@/app/addform/components/Title";
import Content from "@/app/alba/[formId]/components/Content";
import Carousel from "@/components/Carousel/Carousel";
import { AlbaformDetailData } from "@/types/alba";
import { cookies } from "next/headers";

export const metadata = {
  title: "지원자 상세 보기",
  description: "Albarform - 지원자 상세 보기 페이지입니다",
};

interface MyApplicantDetailPageProps {
  params: Promise<{ formId: string; applicationId: string }>;
}

const MyApplicantDetailPage = async ({
  params,
}: MyApplicantDetailPageProps) => {
  let albarformData: AlbaformDetailData;
  let myApplicationData: MyApplicationData;
  const cookie = await cookies();
  const role = cookie.get("role")?.value;
  const { formId } = await params;

  try {
    [albarformData, myApplicationData] = await Promise.all([
      fetchAlbarformDetailData(formId),
      fetchApplicationData(formId, role),
    ]);
  } catch (error) {
    console.error(error);

    return (
      <div>
        <h1>데이터를 불러올 수 없습니다.</h1>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <>
      {albarformData.imageUrls && (
        <Carousel imageUrls={albarformData.imageUrls} />
      )}
      <div className="flex flex-col gap-6 p-10 pc:grid pc:grid-cols-2 pc:gap-x-[160px] pc:gap-y-[120px] pc:px-[200px] tablet:px-[150px]">
        <section className="pc:col-start-1">
          <Title info={albarformData} />
        </section>
        <section className="pc:col-start-1">
          <Content description={albarformData.description} />
        </section>
        <section className="pc:col-start-2 pc:row-start-1">
          <ApplicationStatus
            recruitmentEndDate={albarformData.recruitmentEndDate}
            createdAt={myApplicationData.createdAt}
            status={myApplicationData.status}
            role={role as string}
          />
        </section>
        <section className="mt-8 pc:col-start-2 pc:row-start-2 pc:-mt-48">
          <MyApplication info={myApplicationData} />
        </section>
      </div>
    </>
  );
};

export default MyApplicantDetailPage;
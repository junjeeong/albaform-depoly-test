import ApllicantActionButtons from "@/app/alba/components/ApllicantActionButtons";
import Content from "@/app/alba/components/Content";
import DetailRequirements from "@/app/alba/components/DetailRequirements";
import EmployerInfo from "@/app/alba/components/EmployerInfo";
import OwnerActionButtons from "@/app/alba/components/OwnerActionButtons";
import SimpleRequirements from "@/app/alba/components/SimpleRequirements";
import StoreLocation from "@/app/alba/components/StoreLocation";
import Title from "@/app/alba/components/Title";
import { cls } from "@/utils/dynamicTailwinds";

interface ContentsSectionProps {
  role: string;
  formId: string;
  isMyAlbarform: boolean;
  data: any;
}
const ContentsSection = ({
  role,
  formId,
  isMyAlbarform,
  data,
}: ContentsSectionProps) => {
  const renderActionButtons = () => {
    if (role === "APPLICANT" || role === "Guest") {
      return (
        <ApllicantActionButtons
          formId={formId}
          recruitmentEndDate={data.recruitmentEndDate}
          isLogin={role !== "Guest"}
        />
      );
    } else if (isMyAlbarform) {
      return <OwnerActionButtons formId={formId} />;
    } else return null;
  };

  return (
    <div className="mt-8 grid pc:grid-cols-[700px_500px] pc:grid-rows-[432px_336px_230px_562px] pc:justify-items-center pc:gap-0 pc:gap-y-[40px] pc:grid-areas-layout tablet:w-[550px] tablet:grid-cols-1 tablet:grid-rows-[270px_220px_156px_396px_302px_340px_158px] mobile:w-[327px] mobile:grid-cols-1 mobile:grid-rows-[270px_116px_156px_396px_302px_340px_158px]">
      <section
        className="mr-[100px] w-full max-w-[600px] pc:grid-in-box1"
        aria-label="알바 공고 제목"
      >
        <Title info={data} />
      </section>
      <section
        className="justify-self-center pc:self-center pc:grid-in-box4 tablet:self-center"
        aria-label="시급,기간,요일,시간"
      >
        <SimpleRequirements info={data} />
      </section>
      <section
        className="pc:grid-in-box5"
        aria-label="모집 기간, 가게 전화번호, 사장님 전화번호"
      >
        <EmployerInfo info={data} />
      </section>
      <section
        className="pc:justify-self-start pc:grid-in-box2"
        aria-label="알바 구인 내용"
      >
        <Content description={data.description} />
      </section>
      <section
        className="pc:grid-in-box7"
        aria-label="모집 인원, 성별, 학력, 연령, 우대사항"
      >
        <DetailRequirements info={data} />
      </section>
      <section
        className="mr-[100px] w-full max-w-[600px] pc:grid-in-box3"
        aria-label="근무지 위치"
      >
        <StoreLocation location={data.location} />
      </section>
      <section
        aria-label="알바 지원/지원자 확인"
        className={cls(
          "flex w-full flex-col gap-[10px]",
          isMyAlbarform ? "pc:grid-in-box6" : ""
        )}
      >
        {renderActionButtons()}
      </section>
    </div>
  );
};

export default ContentsSection;

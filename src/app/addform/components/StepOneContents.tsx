import {
  currentImageListAtom,
  temporaryDataByStepAtom,
} from "@/atoms/addFormAtom";
import ErrorText from "@/components/errorText/ErrorText";
import FormInput from "@/components/input/FormInput";
import DatePickerCalendar from "@/components/picker/DatepickerCalendar";
import { addFormSchema } from "@/schema/addForm/addFormSchema";
import { cls } from "@/utils/dynamicTailwinds";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import ImageInput from "@/components/button/ImageInput";
import useViewPort from "@/hooks/useViewport";
import { handleDateRangeFormat } from "@/utils/formatAddFormDate";

const StepOneContents = () => {
  const viewPort = useViewPort();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<z.infer<typeof addFormSchema>>();
  const [currentImageList, setCurrentImageList] = useAtom(currentImageListAtom);
  const setTemporaryDataByStep = useSetAtom(temporaryDataByStepAtom);
  const [temporaryDateRange, setTemporaryDateRange] = useState<
    [string, string]
  >(["", ""]);

  // 모집 기간 날짜 포맷 변환 후 서버전달 데이터에 저장
  useEffect(() => {
    if (temporaryDateRange[0] && temporaryDateRange[1]) {
      const startDate = handleDateRangeFormat(temporaryDateRange[0]);
      const endDate = handleDateRangeFormat(temporaryDateRange[1]);
      setValue("recruitmentStartDate", startDate);
      setValue("recruitmentEndDate", endDate);
    }
  }, [temporaryDateRange, setValue]);

  // 임시 데이터 atom 업데이트
  useEffect(() => {
    const temporaryStepOneData = {
      title: getValues("title"),
      description: getValues("description"),
      recruitmentStartDate: temporaryDateRange[0],
      recruitmentEndDate: temporaryDateRange[1],
      imageUrls: currentImageList, // 임시저장을 위해 서버 업로드 전 이미지를 저장
    };

    setTemporaryDataByStep({
      stepOne: temporaryStepOneData,
    });
  }, [temporaryDateRange, getValues, setTemporaryDataByStep, currentImageList]);

  // 임시 데이터 있으면 로컬스토리지에서 불러오기
  useEffect(() => {
    const localStorageData = localStorage.getItem("stepOne");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setValue("title", parsedData.title);
      setValue("description", parsedData.description);
      setValue("recruitmentStartDate", parsedData.recruitmentStartDate);
      setValue("recruitmentEndDate", parsedData.recruitmentEndDate);
      setCurrentImageList(parsedData.imageUrls);
      setTemporaryDateRange([
        parsedData.recruitmentStartDate,
        parsedData.recruitmentEndDate,
      ]);
    }
  }, [setValue, setCurrentImageList]);

  return (
    <div className="flex flex-col space-y-8 pc:w-[640px]">
      <div className="relative flex flex-col space-y-4">
        <label
          htmlFor="title"
          className="text-md font-medium text-black-400 pc:text-xl"
        >
          알바폼 제목
          <span className="text-orange-300"> *</span>
        </label>
        <FormInput
          id="title"
          type="text"
          placeholder="제목을 입력해주세요."
          register={register}
          error={errors.title}
          name="title"
          className={cls(
            "addform-input-base",
            errors.title ? "ring-1 ring-red" : ""
          )}
        />
        <ErrorText error={errors.title}>{errors.title?.message}</ErrorText>
      </div>
      <div className="relative flex flex-col space-y-4">
        <label
          htmlFor="description"
          className="text-md font-medium text-black-400 pc:text-xl"
        >
          소개글
          <span className="text-orange-300"> *</span>
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={5}
          className={cls(
            "addform-input-base outline-none",
            errors.description ? "ring-1 ring-red" : ""
          )}
          placeholder="최대 200자까지 입력 가능합니다."
        />
        <ErrorText error={errors.description}>
          {errors.description?.message}
        </ErrorText>
      </div>
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="recruitmentDate"
          className="text-md font-medium text-black-400 pc:text-xl"
        >
          모집 기간
          <span className="text-orange-300"> *</span>
        </label>
        <DatePickerCalendar
          setDateRange={setTemporaryDateRange}
          initialDate={temporaryDateRange}
        />
        <ErrorText
          error={errors.recruitmentStartDate || errors.recruitmentEndDate}
        >
          {errors.recruitmentStartDate?.message ||
            errors.recruitmentEndDate?.message}
        </ErrorText>
      </div>
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="image"
          className="text-md font-medium text-black-400 pc:text-xl"
        >
          이미지 첨부
        </label>
        <ImageInput
          size={viewPort === "pc" ? "medium" : "small"}
          onImageChange={setCurrentImageList}
        />
      </div>
    </div>
  );
};

export default StepOneContents;

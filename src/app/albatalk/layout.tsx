import AlbatalkSmartSearch from "./components/AlbatalkSmartSearch";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "알바토크",
  openGraph: {
    title: "알바토크",
  },
};

const AlbaTalkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-6 max-w-[327px] pc:max-w-[1480px] tablet:max-w-[600px]">
      <Suspense>
        <AlbatalkSmartSearch />
      </Suspense>
      <div className="mt-[50px] pc:mt-10 tablet:mt-10">{children}</div>
    </div>
  );
};

export default AlbaTalkLayout;

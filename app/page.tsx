import { cookies } from "next/headers";
import Image from "next/image";

import { ExcelControllerPage } from "@/components/excel-controller-page";
import { accounts, mails } from "@/app/data";

export default function ExelPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <div className="flex-col md:flex">
      <ExcelControllerPage
        accounts={accounts}
        mails={mails}
        defaultLayout={[265, 440, 655]}
        defaultCollapsed={false}
        navCollapsedSize={4}
      />
    </div>
  );
}

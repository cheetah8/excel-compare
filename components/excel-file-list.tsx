import { ComponentProps, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileSpreadsheet } from "lucide-react";

interface ExcelFileProps {
  _id: string;
  title: string;
  author: string;
  fileId: string;
  is_mainFile: string;
  createdAt: string;
  __v: number;
}

interface props {
  excelFiles: ExcelFileProps[];
  setFirstSelect: any;
  setSecondSelect: any;
  firstSelect: string;
  secondSelect: string;
  setComparedResult: any;
}

let selectCounter = 0;

export function ExcelFileList({
  excelFiles,
  setFirstSelect,
  setSecondSelect,
  firstSelect,
  secondSelect,
  setComparedResult,
}: props) {
  useEffect(() => {
    if (excelFiles.length !== 0) {
      setFirstSelect(excelFiles[0].fileId);
      setSecondSelect(excelFiles[1].fileId);
    }
  }, [excelFiles, setFirstSelect, setSecondSelect]);

  const pickHandler = (value: string) => {
    selectCounter++;
    setComparedResult("idle");
    if (selectCounter === 1) {
      setFirstSelect(value);
    } else if (selectCounter === 2) {
      setSecondSelect(value);
      selectCounter = 0;
    }
  };

  return (
    <ScrollArea className="pt-4 calc-height" dir={"rtl"}>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {excelFiles.map((item) => (
          <button
            key={item._id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all bg-red hover:bg-accent",
              item.fileId === firstSelect &&
                "border-2 border-blue-600 bg-accent",
              item.fileId === secondSelect &&
                "border-2 border-dashed border-green-700 bg-green-700 bg-accent",
            )}
            onClick={() => pickHandler(item.fileId)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className={"flex justify-between w-full"}>
                  <div className="flex gap-2 items-center">
                    <div className="font-medium"> نام فایل: {item.title} </div>
                    <FileSpreadsheet className={"w-5 h-5 font-thin"} />
                    {item.fileId === firstSelect && (
                      <span
                        className="flex h-2 w-2 rounded-full bg-blue-600 text-right"
                        dir={"rtl"}
                      />
                    )}
                  </div>
                  <div className="line-clamp-2 text-xs text-muted-foreground">
                    امروز
                  </div>
                </div>
              </div>
              <div
                className={
                  "ml-auto text-xs text-muted-foreground py-2 text-right leading-relaxed pl-2"
                }
              >
                این فایل اکسل با حجم 1kb در تاریخ 1/8/1402 اضافه شده{" "}
                {item.fileId === firstSelect &&
                  "و به در حال حاضر به عنوان ساختار اصلی انتخاب شده است لطفا همچنین فایل مقایسه شونده رو هم انتخاب کنید تا با این فایل مقایسه شود"}
              </div>
            </div>

            {item.fileId === firstSelect ? (
              <div className="flex items-center gap-2">
                <Badge key={item._id} variant={"default"}>
                  ساختار اصلی
                </Badge>
              </div>
            ) : item.fileId === secondSelect ? (
              <div className="flex items-center gap-2">
                <Badge key={item._id} variant={"outline"}>
                  ساختار تغییر یافته
                </Badge>
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}

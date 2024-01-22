import {
  BetweenHorizonalStart,
  CircleSlash,
  EqualSquare,
  FilePlus,
  FileUp,
  GitCompareArrowsIcon,
  ListPlus,
  ListX,
  Sparkles,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast, useToast } from "@/components/ui/use-toast";

interface props {
  compareResult: "idle" | "filled" | "loading" | any;
  compareDetail: any;
}

export function ExcelDisplay({ compareResult, compareDetail }: props) {
  const { toast } = useToast();

  return (
    <>
      {compareResult === "idle" ? (
        <div
          className={
            "flex w-full min-h-screen items-center justify-center flex-col gap-5"
          }
        >
          <Sparkles className={"w-10 h-10"} />
          <div>
            برای شروع لطفا روی دکمه{"  "}
            <span className={"font-bold"}>مقایسه فایل ها کلیک کنید</span>
          </div>
        </div>
      ) : compareResult === "loading" ? (
        <div
          className={
            "flex w-full min-h-screen items-center justify-center flex-col gap-8"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="lucide lucide-file-code-2 w-10 h-10 animate-ping duration-[100ms]"
            viewBox="0 0 24 24"
          >
            <path d="M4 22h14a2 2 0 002-2V7l-5-5H6a2 2 0 00-2 2v4"></path>
            <path d="M14 2v4a2 2 0 002 2h4M5 12l-3 3 3 3M9 18l3-3-3-3"></path>
          </svg>{" "}
          <div>
            <span className={"font-bold"}>در حال مقایسه لطفا صبر کنید ...</span>
          </div>
        </div>
      ) : compareResult === "filled" ? (
        <div className={"pb-4"}>
          <div className="flex flex-row-reverse items-center px-4 py-1 justify-between">
            <div
              className={
                "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md w-9 h-9 flex items-center justify-center m-1"
              }
              onClick={() => {
                toast({
                  title: "به زودی...",
                  description:
                    "قابلیت خروجی اکسل از این قسمت به زودی اضافه میشه!",
                  variant: "default",
                });
              }}
            >
              <FileUp className={"w-5 h-5"} />
            </div>
          </div>
          <Separator />
          <div className={"pt-5 px-4"}>
            <div className="text-xl font-semibold flex items-center gap-2">
              <GitCompareArrowsIcon />
              نتیجه مقایسه
            </div>
            <Badge variant={"secondary"} className="mb-2">
              {!compareDetail.same_length
                ? "دو فایل هم اندازه نیستند پس دستخوش تغییر شدند"
                : "این دو فایل یکسان هستند"}
            </Badge>
            <ScrollArea className="calc-height2 " dir={"rtl"}>
              {!compareDetail.same_length ? (
                <div className="mt-7">
                  <div className="flex items-center gap-2">
                    <ListX className={"text-red-600"} />
                    <div className="font-semibold">ردیف های حذف شده</div>
                  </div>

                  {compareDetail.removed_items.length === 0 ? (
                    <div
                      className={"text-center flex flex-col items-center mt-5"}
                    >
                      <CircleSlash className={"w-5 h-5"} />
                      <div className="pt-2">ردیفی حذف نشده!</div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 p-3 py-5">
                      {compareDetail.removed_items.map(
                        (item: any, index: number) => (
                          <div
                            className="relative flex flex-col gap-2 bg-accent p-4 rounded-2xl"
                            key={index}
                          >
                            <div
                              className="absolute left-0 top-0 m-6"
                              key={index}
                            >
                              <div className={"flex flex-row-reverse gap-2"}>
                                <div className="text-xs text-muted-foreground">
                                  حذف شده از ردیف :{" "}
                                  {compareDetail.removed_indices[index]}
                                </div>
                                <BetweenHorizonalStart
                                  className={"w-4 h-4 text-muted-foreground"}
                                />
                              </div>
                            </div>

                            <div>
                              <span className={"font-medium"}> نام:</span>{" "}
                              {item["نام"]}
                            </div>
                            <div>
                              <span className={"font-medium"}>
                                {" "}
                                نام خانوادگی:
                              </span>{" "}
                              {item["نام خانوادگی"]}
                            </div>
                            <div>
                              <span className={"font-medium"}> كدپرسنلي:</span>{" "}
                              {item["كدپرسنلي"]}
                            </div>
                            <div>
                              <span className={"font-medium"}> کد پست:</span>{" "}
                              {item["کد پست"]}
                            </div>
                            <div>
                              <span className={"font-medium"}> وضعیت پست:</span>{" "}
                              {item["وضعیت پست"]}
                            </div>
                            <div>
                              <span className={"font-medium"}>
                                {" "}
                                مـــحل پست:
                              </span>{" "}
                              {item["مـــحل پست"]}
                            </div>
                            <div>
                              <span className={"font-medium"}>
                                {" "}
                                عنوان پست در واحد:
                              </span>{" "}
                              {item["عنوان پست در واحد"]}
                            </div>
                            <div>
                              <span className={"font-medium"}> عنوان پست:</span>{" "}
                              {item["عنوان پست"]}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <ListPlus className={"text-green-600"} />
                    <div className="font-semibold">ردیف های اضافه شده</div>
                  </div>

                  {compareDetail.added_items.length === 0 ? (
                    <div
                      className={"text-center flex flex-col items-center mt-5"}
                    >
                      <CircleSlash className={"w-5 h-5"} />
                      <div className="pt-2">ردیفی اضافه نشده!</div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 p-3 py-5">
                      {compareDetail.added_items.map(
                        (item: any, index: number) => (
                          <div
                            className="relative flex flex-col gap-2 bg-accent p-4 rounded-2xl"
                            key={index}
                          >
                            <div
                              className="absolute left-0 top-0 m-6"
                              key={index}
                            >
                              <div className={"flex flex-row-reverse gap-2"}>
                                <div className="text-xs text-muted-foreground">
                                  اضافه شده به ردیف :{" "}
                                  {compareDetail.added_indices[index]}
                                </div>
                                <BetweenHorizonalStart
                                  className={"w-4 h-4 text-muted-foreground"}
                                />
                              </div>
                            </div>

                            <div>
                              <span className={"font-medium"}> نام:</span>{" "}
                              {item["نام"]}
                            </div>
                            <div>
                              <span className={"font-medium"}>
                                {" "}
                                نام خانوادگی:
                              </span>{" "}
                              {item["نام خانوادگی"]}
                            </div>
                            <div>
                              <span className={"font-medium"}> كدپرسنلي:</span>{" "}
                              {item["كدپرسنلي"]}
                            </div>
                            <div>
                              <span className={"font-medium"}> کد پست:</span>{" "}
                              {item["کد پست"]}
                            </div>
                            <div>
                              <span className={"font-medium"}> وضعیت پست:</span>{" "}
                              {item["وضعیت پست"]}
                            </div>
                            <div>
                              <span className={"font-medium"}>
                                {" "}
                                مـــحل پست:
                              </span>{" "}
                              {item["مـــحل پست"]}
                            </div>
                            <div>
                              <span className={"font-medium"}>
                                {" "}
                                عنوان پست در واحد:
                              </span>{" "}
                              {item["عنوان پست در واحد"]}
                            </div>
                            <div>
                              <span className={"font-medium"}> عنوان پست:</span>{" "}
                              {item["عنوان پست"]}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={
                    "flex w-full min-h-screen items-center justify-center flex-col gap-8"
                  }
                >
                  <EqualSquare className="w-8 h-8" />{" "}
                  <div>
                    <span className={"font-bold"}>
                      فایل ها هم اندازه هستن پس چیزه نه اضافه شده و نه کم!
                    </span>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      ) : null}
    </>
  );
}

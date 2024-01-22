"use client";
import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Calculator,
  CornerDownRight,
  CornerUpRight,
  File,
  FilePlus,
  Inbox,
  Loader,
  Loader2,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import { AccountSwitcher } from "@/components/account-switcher";
import { ExcelDisplay } from "@/components/excel-display";
import { ExcelFileList } from "@/components/excel-file-list";
import { Nav } from "@/components/nav";
import { Mail } from "@/app/data";
import { useMail } from "@/app/use-mail";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ModeToggle } from "@/components/mode-toggle";
import useSWR from "swr";
import { fetcher, postFetcher } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { API_URL } from "@/vars";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { any } from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ExcelControllerPage({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const { toast } = useToast();

  const [firstSelect, setFirstSelect] = useState("");
  const [secondSelect, setSecondSelect] = useState("");

  const [comparedResult, setComparedResult] = useState("idle");
  const [compareDetail, setCompareDetail] = useState();

  const [showUploadButton, setShowUploadButton] = useState(false);
  const [fileDatas, setFileDatas] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const { data: excelFiles, isLoading } = useSWR(
    `${API_URL}/get_excel_list`,
    fetcher,
  );

  const compareHandler = async () => {
    if (firstSelect === "" || secondSelect === "") {
      toast({
        title: "درخواست غیرمجاز",
        description: "لطفا دو فایل را انتخاب کنید",
        variant: "destructive",
      });
    }

    try {
      setComparedResult("loading");
      const result = await postFetcher(`${API_URL}/compare_excel`, {
        main_file_id: firstSelect,
        second_file_id: secondSelect,
      });
      setComparedResult("filled");
      if (!result.error) {
        toast({
          title: "درخواست برسی شد",
          description: result.message,
          variant: "success",
        });
        setCompareDetail(result.data);
      }
      console.log(result);
    } catch (e: any) {
      console.log(e);
      toast({
        title: "درخواست موفق نبود",
        description: e.message,
        variant: "destructive",
      });
    }
  };

  const fileUploader = (files: any) => {
    setShowUploadButton(false);
    if (files.length !== 2) {
      toast({
        title: "انتخاب فایل درست نیست",
        description:
          "باید هردو فایل رو از توی کامپیوتر خود انتخاب کنید و بعد گزینه open رو بزنید",
      });
    } else {
      setShowUploadButton(true);
      setFileDatas(files);
    }
  };

  const uploadExcelFiles = async () => {
    setUploadLoading(true);

    const formdata = new FormData();

    // @ts-ignore
    formdata.append("excel_files", fileDatas[0], "/Z:/ExcelCompare/file1.xlsx");
    // @ts-ignore
    formdata.append("excel_files", fileDatas[1], "/Z:/ExcelCompare/file2.xlsx");
    try {
      let result = await postFetcher(`${API_URL}/upload_excel`, formdata);
      if (!result.error) {
        toast({
          title: "آپلود انجام شد!",
          description: result.message,
          variant: "success",
        });
        setCompareDetail(result.data);
      }
    } catch (e: any) {
      console.log(e);
      toast({
        title: "درخواست موفق نبود",
        description: e.message,
        variant: "destructive",
      });
    }

    setUploadLoading(false);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} dir={"rtl"}>
          <div className="flex items-center px-4 py-2 justify-between">
            <Button
              className={"flex items-center gap-2 px-5"}
              onClick={compareHandler}
              // disabled={comparedResult === "loading"}
            >
              {comparedResult === "loading" ? (
                <Loader2 className={"w-5 h-5 animate-spin"} />
              ) : (
                <CornerUpRight className={"w-5 h-5"} />
              )}
              <div>مقایسه فایل ها</div>
            </Button>

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger>
                  <div
                    className={
                      "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md w-9 h-9 flex items-center justify-center"
                    }
                  >
                    <FilePlus className={"w-5 h-5"} />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className={"text-right mt-7"}>
                      اضافه کردن فایل اکسل
                    </DialogTitle>
                    <DialogDescription className={"text-right pt-2"}>
                      برای ارسال هر دو فایل اکسل روی اینپوت زیر کلیک کنید و دو
                      فایل خود را ارسال کنید به یاد داشته باشید فرمت فایل باید
                      اکسل باشد
                    </DialogDescription>

                    <div className={"pt-4"} dir={"rtl"}>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                          id="picture"
                          type="file"
                          accept=".xls, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          className="cursor-pointer"
                          multiple
                          onChange={(e: any) => fileUploader(e.target.files)}
                        />
                      </div>
                    </div>
                  </DialogHeader>

                  <DialogFooter>
                    {showUploadButton && (
                      <Button
                        type="submit"
                        className="flex items-center gap-2"
                        onClick={uploadExcelFiles}
                        disabled={uploadLoading}
                      >
                        {uploadLoading && (
                          <Loader2 className={"w-5 h-5 animate-spin"} />
                        )}
                        آپلود فایل ها
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <ModeToggle />
            </div>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="در بین فایل ها جستجو کنید ..."
                  className="pl-8"
                />
              </div>
            </form>
          </div>

          {!isLoading ? (
            <ExcelFileList
              excelFiles={!isLoading ? excelFiles.data : []}
              secondSelect={secondSelect}
              firstSelect={firstSelect}
              setFirstSelect={setFirstSelect}
              setSecondSelect={setSecondSelect}
              setComparedResult={setComparedResult}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className={"w-8 h-8 animate-spin"} />
            </div>
          )}
        </ResizablePanel>

        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} dir={"rtl"}>
          <ExcelDisplay
            compareResult={comparedResult}
            compareDetail={compareDetail}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

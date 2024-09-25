"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { CheckoutWithQrCode } from "@/services/qrcodes";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import SuccessIcon from "@/public/icons/SuccessIcon.svg"
const FormSchema = z.object({
    code: z.coerce.number().min(1, "الرجاء ادخال قيمة صحيحة"),
});

type FormValues = z.infer<typeof FormSchema>;

const AddCode = ({ courseId , LecturePath }: { courseId: string, LecturePath:string }) => {
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Control dialog state
    const [isOpenSuccessOpen, setIsSuccessOpen] = useState(false); 
    const searchParams = useSearchParams(); // Get the query params

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: 0,
        },
    });

    // Function to submit the form data
    const onSubmit = async (values: FormValues, autoSubmit: boolean = false) => {
        setIsSubmitting(true);
        try {
            await CheckoutWithQrCode(courseId, values.code);
            form.reset();
            setIsSuccessOpen(true); // Open the dialog automatically
            toast({
                title: "تم شراء الدورة بنجاح",
            });
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        } catch (error) {
            if (isAxiosError(error)) {
                toast({
                    title: error.response?.data.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "حدث خطأ ما",
                    variant: "destructive",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Automatically open the dialog and submit the form when the code query parameter is present
    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            setIsSuccessOpen(true); // Open the dialog automatically
            form.setValue("code", Number(code)); // Set the form value with the code from the URL
            onSubmit({ code: Number(code) }, true); // Trigger the form submission
        }
    }, [searchParams]);

    return (
        <>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-white w-full sm:py-6 py-3 font-bold sm:text-xl">
                    شراء برمز
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[650px] max-w-[90%] rounded-[22.317px] p-5 lg:p-20">
                        <div className="flex items-center gap-x-2.5 sm:justify-start justify-between">
                            <h1 className="text-[#000] font-bold text-lg sm:text-[22px]">
                                قم بإضافة رمز الدورة
                            </h1>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    className="py-4"
                                                    type="text"
                                                    placeholder="الرمز"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center">
                                    <Button
                                        type="submit"
                                        className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white w-full sm:h-12"
                                        disabled={isSubmitting}
                                    >
                                        شراء الدورة
                                    </Button>
                                </div>
                            </form>
                        </Form>
            </DialogContent>
        </Dialog>
        <Dialog open={isOpenSuccessOpen} onOpenChange={setIsSuccessOpen}>
            <DialogContent className="w-[650px] max-w-[90%] rounded-[22.317px] p-5 lg:p-20">
            <div className="text-center flex flex-col items-center justify-center w-full ">
                        <Image src={SuccessIcon} alt="Sucess" width={88} height={88} />
                        <h1 className="text-[#000] font-bold text-lg sm:text-[22px] mb-2 mt-7">
                            تمت العملية بنجاح
                        </h1>
                        <p className="text-gray-500 mb-4">
                            شكراً لك! تم شراء الدورة بنجاح.
                        </p>
                        <Link className="w-full" href={LecturePath}>
                        <Button
                                        className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white w-full sm:h-12"
                                        >
                            الذهاب إلي الدورة
                        </Button>
                        </Link>
                    </div>
            </DialogContent>
        </Dialog>

</>
    );
};

export default AddCode;

"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Medication } from "@/services/medication-service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const medicineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  form: z.string().min(1, "Form is required (e.g. Tablet, Syrup)"),
  dosage: z.string().min(1, "Dosage is required (e.g. 500mg)"),
  manufacturer: z.string().optional(),
  description: z.string().optional(),
});

type MedicineFormValues = z.infer<typeof medicineSchema>;

interface MedicineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicine?: Medication | null;
  onSubmit: (values: Partial<Medication>) => Promise<{ ok: boolean }>;
}

const MEDICINE_FORMS = [
  "tablet",
  "capsule",
  "syrup",
  "injection",
  "cream",
  "ointment",
  "gel",
  "drops",
  "liquid",
  "powder",
  "inhaler",
  "other",
];

export function MedicineDialog({
  open,
  onOpenChange,
  medicine,
  onSubmit,
}: MedicineDialogProps) {
  const { t } = useTranslation(["medicine", "common"]);
  const isEditing = !!medicine;

  const form = useForm<MedicineFormValues>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: "",
      form: "",
      dosage: "",
      manufacturer: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (medicine) {
        form.reset({
          name: medicine.name || "",
          form: medicine.form || "",
          dosage: medicine.dosage || "",
          manufacturer: medicine.manufacturer || "",
          description: medicine.description || "",
        });
      } else {
        form.reset({
          name: "",
          form: "",
          dosage: "",
          manufacturer: "",
          description: "",
        });
      }
    }
  }, [open, medicine, form]);

  const handleSubmit = async (values: MedicineFormValues) => {
    try {
      const result = await onSubmit(values);
      if (result.ok) {
        toast.success(
          isEditing
            ? t("medicine:messages.successUpdate")
            : t("medicine:messages.successAdd"),
        );
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        isEditing
          ? t("medicine:messages.errorUpdate")
          : t("medicine:messages.errorAdd"),
      );
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-3xl border-none shadow-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            {isEditing ? t("medicine:editMedicine") : t("medicine:addMedicine")}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-base">
            {isEditing
              ? t("medicine:editMedicineDescription")
              : t("medicine:addMedicineDescription")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">
                    {t("medicine:name")} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("medicine:placeholders.name")}
                      className="rounded-xl bg-slate-50 border-slate-200 h-11 focus-visible:ring-[#007BFF] transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="form"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      {t("medicine:form")}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full rounded-xl bg-slate-50 border-slate-200 !h-11 focus:ring-[#007BFF] transition-all">
                          <SelectValue
                            placeholder={t("medicine:placeholders.form")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        {/* Ensure existing value is shown even if not in list */}
                        {field.value &&
                          !MEDICINE_FORMS.includes(field.value) && (
                            <SelectItem
                              key={field.value}
                              value={field.value}
                              className="rounded-lg focus:bg-blue-50 focus:text-blue-600 cursor-pointer"
                            >
                              {field.value}
                            </SelectItem>
                          )}
                        {MEDICINE_FORMS.map((form) => (
                          <SelectItem
                            key={form}
                            value={form}
                            className="rounded-lg focus:bg-blue-50 focus:text-blue-600 cursor-pointer"
                          >
                            {t(`medicine:forms.${form}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-semibold">
                      {t("medicine:dosage")}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("medicine:placeholders.dosage")}
                        className="rounded-xl bg-slate-50 border-slate-200 h-11 focus-visible:ring-[#007BFF] transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">
                    {t("medicine:manufacturer")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("medicine:placeholders.manufacturer")}
                      className="rounded-xl bg-slate-50 border-slate-200 h-11 focus-visible:ring-[#007BFF] transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">
                    {t("medicine:description")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("medicine:placeholders.description")}
                      className="rounded-xl bg-slate-50 border-slate-200 min-h-[100px] focus-visible:ring-[#007BFF] transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-6 gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl h-11 px-8 font-bold border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                {t("medicine:cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#007BFF] hover:bg-[#0056b3] text-white rounded-xl h-11 px-8 font-bold shadow-lg shadow-blue-100 transition-all min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("common:saving")}...
                  </>
                ) : isEditing ? (
                  t("medicine:saveChanges")
                ) : (
                  t("medicine:createMedicine")
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

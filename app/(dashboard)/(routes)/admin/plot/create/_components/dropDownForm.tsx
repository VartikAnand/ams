"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Textarea,
  Select,
  SelectItem,
  Selection,
  Button,
  Input,
} from "@nextui-org/react";
import Link from "next/link";
import { LandPlot } from "lucide-react";

const formSchema = z.object({
  payrollType: z.string().min(3, "Payroll Type must be selected").max(50),
});

const DropDownForm = ({ initialData }: string) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payrollType: "",
    },
  });
  const payroll = initialData.map((pay) => ({
    name: `${pay.khasraNumber} ${pay.landTitle}`,
    label: `${pay.khasraNumber} ${pay.landTitle}`,
    value: pay.id,
  }));
  const [filteredPayroll, setFilteredPayroll] = useState(payroll);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to control isOpen

  // Function to handle user input and filter results
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    const filtered = payroll.filter(
      (pay) =>
        pay.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        pay.value.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPayroll(filtered);
    // Set isOpen to true when there's any search value
    setIsOpen(searchValue !== "");
  };

  const { handleSubmit, formState, reset } = form;
  const { isSubmitting, isValid, dirtyFields, errors } = formState;

  const handleSelect = async (selectedValue) => {
    await toast.promise(
      async () => {
        try {
          const response = await axios.post("/api/plotSale", {
            farmerLandId: selectedValue.target.value,
          });
          router.push(`/admin/plot/create/${response.data.saleId}`);
          reset();

          return { name: "Plot", status: "success" };
        } catch (err) {
          toast.error("Error: Try Again !");
          throw new Error(err.message);
        }
      },
      {
        loading: "Creating Plot from Land...",
        success: (data) => `${data.name} Plot Created Successfully`,
        error: "Error in Creating Plot",
      }
    );
  };
  return (
    <div className="lg:max-w-3xl md:max-w-2xl mx-auto flex md:items-center md:justify-center p-6">
      <form className="flex flex-col gap-2 w-full h-full">
        <div className="flex items-center justify-center h-full w-full mb-32">
          {/* Farmer Land name && Kashar number*/}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Select Khasra Number</h1>
            <p className="text-default-400 text-xs">
              Select the Khasra number and Land Title from which you want to
              sell a plot.
            </p>
            <div>
              <Input
                color="primary"
                className="mt-2"
                size="sm"
                placeholder="Enter Kashar Number to make plot"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {/* Updated SelectItem based on filteredPayroll */}
              <Select
                isOpen={isOpen}
                className="mt-2"
                aria-label="SelectItem"
                size="sm"
                variant="underlined"
                color="primary"
                disableSelectorIconRotation
                selectorIcon={<LandPlot />}
                scrollShadowProps={{
                  isEnabled: false,
                }}
                onChange={(selectedValue) => handleSelect(selectedValue)}
              >
                {filteredPayroll.map((pay) => (
                  <SelectItem key={pay.value} value={pay.value}>
                    {pay.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        {/* Submit and Cancel Buttons */}
        <Link href="/admin/plot/">
          <Button
            className="cursor-pointer  w-full"
            color="primary"
            type="button"
            variant="ghost"
          >
            Cancel
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default DropDownForm;

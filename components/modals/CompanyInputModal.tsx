"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import useCompanyInputModal from "@/hooks/useCompanyInputModal";

import Modal from "./Modal";

import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "./Categories";

import { Input } from "../ui/input";
import { InputLarge } from "../InputLarge";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu } from "../ui/dropdown-menu";

//Structure of the listing form
enum STEPS {
  CATEGORY = 0, //industry
  LOCATION = 1, //location
  DESCRIPTION = 2, //description of the business
  TEAM = 3, //team
  INFO = 4, //financials
  PRICE = 5, //fundraising amount
  // IMAGES = 6, //logo/cover/pitchbook?
}

const CompanyInputModal = () => {
  const router = useRouter();
  const companyInputModal = useCompanyInputModal();

  const [isLoading, setIsLoading] = useState(false);
  const [isPreRevenue, setIsPreRevenue] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const productStatusOptions = [
    { label: "Just an Idea", value: "Just an Idea" },
    { label: "Minimum Viable Product", value: "Minimum Viable Product" },
    { label: "Fully Developed Product", value: "Fully Developed Product" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category1: "",
      category2: "",
      category3: "",
      location: null,
      startupRevenue: "",
      startupEBITDA: "",
      netIncome: "",
      imageSrc: "",
      price: "",
      title: "",
      description: "",
      startupWebsiteUrl: "",
      valuationExpectations: "",
      previousFundingRaised: 0,
      lastRoundFundingRaised: "",
      lastRoundValuation: "",
      founderOwnership: "",
      employeeCount: "",
      startupDetailedDescription: "",
      founderFirstName1: "",
      founderLastName1: "",
      founderRole1: "",
      founderLinkedIn1: "",
      founderFirstName2: "",
      founderLastName2: "",
      founderRole2: "",
      founderLinkedIn2: "",
      founderFirstName3: "",
      founderLastName3: "",
      founderRole3: "",
      founderLinkedIn3: "",
      founderFirstName4: "",
      founderLastName4: "",
      founderRole4: "",
      founderLinkedIn4: "",
      productStatus: "",
      preRevenue: false,
    },
  });

  const location = watch("location");
  const category = watch("category");
  // const startupRevenue = watch("startupRevenue");
  // const startupEBITDA = watch("startupEBITDA");
  // const netIncome = watch("netIncome");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    const [category1 = "", category2 = "", category3 = ""] = selectedCategories;
    setCustomValue("category1", category1);
    setCustomValue("category2", category2);
    setCustomValue("category3", category3);
  }, [selectedCategories]);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset(); //if successful reset the form, to category below
        setStep(STEPS.CATEGORY);
        companyInputModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={() => handleCategoryClick(item.label)}
              selected={selectedCategories.includes(item.label)}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Input
          id="title"
          label="Startup Name*"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="One-liner for your startup* (max. 100 characters)"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          maxLength={100} // Set the maximum length to 100 characters
        />

        <hr />
        <Input
          id="startupWebsiteUrl"
          label="Provide the URL to your startup's website"
          disabled={isLoading}
          register={register}
          errors={errors}
          validateUrl // Now Input knows it should validate this field as a URL
        />
        <hr />
        <InputLong
          id="startupDetailedDescription"
          label="Detailed description of your startup* (max. 500 characters)"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          maxLength={500} // Set the maximum length to 500 characters
        />
      </div>
    );
  }

  if (step === STEPS.TEAM) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <div className="max-h-[50vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="founderFirstName1"
                label="Founder 1 First Name*"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
              <Input
                id="founderLastName1"
                label="Founder 1 Last Name*"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
            <Input
              id="founderRole1"
              label="Founder 1 Role*"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />

            <Input // think about adding in email soon
              id="founderLinkedIn1"
              label="Founder 1 LinkedIn URL"
              disabled={isLoading}
              register={register}
              errors={errors}
              validateUrl
            />

            <hr />

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="founderFirstName2"
                label="Founder 2 First Name"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <Input
                id="founderLastName2"
                label="Founder 2 Last Name"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
            </div>

            <Input
              id="founderRole2"
              label="Founder 2 Role"
              disabled={isLoading}
              register={register}
              errors={errors}
            />

            <Input
              id="founderLinkedIn2"
              label="Founder 2 LinkedIn URL"
              disabled={isLoading}
              register={register}
              errors={errors}
              validateUrl
            />

            <hr />

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="founderFirstName3"
                label="Founder 3 First Name"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <Input
                id="founderLastName3"
                label="Founder 3 Last Name"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
            </div>

            <Input
              id="founderRole3"
              label="Founder 3 Role"
              disabled={isLoading}
              register={register}
              errors={errors}
            />

            <Input
              id="founderLinkedIn3"
              label="Founder 3 LinkedIn URL"
              disabled={isLoading}
              register={register}
              errors={errors}
              validateUrl
            />

            <hr />

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="founderFirstName4"
                label="Founder 4 First Name"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
              <Input
                id="founderLastName4"
                label="Founder 4 Last Name"
                disabled={isLoading}
                register={register}
                errors={errors}
              />
            </div>

            <Input
              id="founderRole4"
              label="Founder 4 Role"
              disabled={isLoading}
              register={register}
              errors={errors}
            />

            <Input
              id="founderLinkedIn4"
              label="Founder 4 LinkedIn URL"
              disabled={isLoading}
              register={register}
              errors={errors}
              validateUrl
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <div className="max-h-[50vh] overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center px-0.5 gap-2">
              <Checkbox
                id="preRevenue"
                label="We are Pre-Revenue"
                subLabel="Click if your startup is pre-revenue"
                checked={isPreRevenue}
                register={register}
                onChange={(checked) => {
                  setIsPreRevenue(checked);
                  setCustomValue("preRevenue", checked);
                }}
                errors={errors}
              />
            </div>
            <hr />
            <DropdownMenu
              id="productStatus"
              label="Product Status*"
              options={productStatusOptions}
              disabled={isLoading}
              required={true}
              onChange={(value) => setValue("productStatus", value)}
              register={register}
              errors={errors}
            />
            <hr />

            <Input
              id="startupRevenue"
              label={`Revenue (US$)${isPreRevenue ? "" : "*"}`}
              formatDollar
              type="number"
              disabled={isLoading || isPreRevenue}
              register={register}
              errors={errors}
              required={!isPreRevenue}
            />

            <hr />

            <Input
              id="startupEBITDA"
              label="EBITDA (US$)"
              formatDollar
              type="number"
              disabled={isLoading || isPreRevenue}
              register={register}
              errors={errors}
            />
            <hr />

            <Input
              id="netIncome"
              label="Net Income (US$)"
              formatDollar
              type="number"
              disabled={isLoading || isPreRevenue}
              register={register}
              errors={errors}
            />
            <hr />

            <Input
              id="employeeCount"
              label="Employee Count incl. Founders (#)"
              formatNumber
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />

            <hr />
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <div className=" max-h-[50vh] overflow-y-auto ">
          <div className="flex flex-col gap-6">
            <Input
              id="price"
              label="Fundraising Amount (US$)*"
              formatDollar
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />

            <Input
              id="valuationExpectations"
              label="Valuation Expectations (US$)"
              formatDollar
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
            />

            <Input
              id="founderOwnership"
              label="Founder Ownership (%)*"
              formatPercentage
              type="percentage"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />

            <Input
              id="previousFundingRaised"
              label="Any Previous Funding Raised (US$)* - type 0 if none
              "
              formatDollar
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <hr />

            <Input
              id="lastRoundFundingRaised"
              label="Last Round Funding Raised (US$)"
              formatDollar
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
            <hr />

            <Input
              id="lastRoundValuation"
              label="Last Round Valuation (US$)"
              formatDollar
              type="number"
              disabled={isLoading}
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={companyInputModal.isOpen}
      title="List Your Startup!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={companyInputModal.onClose}
      body={bodyContent}
    />
  );
};

export default CompanyInputModal;

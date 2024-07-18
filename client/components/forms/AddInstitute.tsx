"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  createInstitute,
  getInstitute,
  getUser,
  updateInstitute,
} from "@/lib/api";
import { CustomInputProps, Officer } from "@/global/types";

function CustomInput({
  title,
  id,
  className,
  type,
  value,
  onChange,
}: CustomInputProps) {
  return (
    <div className={cn("grid gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor={id}>{title}</Label>
        <Input
          id={id}
          type={type ? type : "text"}
          className={cn("w-full", className)}
          accept="image/*"
          multiple={false}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

const officerInit = {
  name: "",
  photograph: null,
  contact: "",
  email: "",
  workingAddress: {
    address: "",
    city: "",
    state: "",
    postalCode: "",
  },
};

export default function AddInstitute({
  institute,
  handleCancel,
}: {
  institute?: string | null;
  handleCancel?: () => void;
}) {
  const [instituteName, setInstituteName] = useState("");
  const [instituteLogo, setInstituteLogo] = useState<File | null>(null);
  const [nodalOfficerData, setNodalOfficerData] =
    useState<Officer>(officerInit);
  const [reportingOfficerData, setReportingOfficerData] =
    useState<Officer>(officerInit);

  useEffect(() => {
    if (institute) {
      // TODO: fetch data
      const fetch = async (instituteName: string) => {
        const institute = await getInstitute(instituteName);
        setInstituteLogo(institute.logo);
        setInstituteName(institute.name);
        const nodal = await getUser(institute.nodalOfficer);

        console.log(nodal)
        setNodalOfficerData({ ...officerInit, ...nodal });

        const reporting = await getUser(institute.reportingOfficer);
        setReportingOfficerData({ ...officerInit, ...reporting });
      };

      fetch(institute);
    }
  }, [institute]);

  const handleAction = async () => {
    // Handle adding institute with the collected data

    // console.log(instituteName, instituteLogo, reportingOfficerData, nodalOfficerData)

    if (instituteName === "" || instituteLogo === null) {
      return alert("Incomplete Institute");
    }

    if (
      reportingOfficerData.name === "" ||
      reportingOfficerData.contact == "" ||
      reportingOfficerData.email == ""
      // reportingOfficerData.workingAddress.address == "" ||
      // reportingOfficerData.workingAddress.city == "" ||
      // reportingOfficerData.workingAddress.state == "" ||
      // reportingOfficerData.workingAddress.postalCode == ""
    ) {
      return alert("Incomplete Reporting Officer Data");
    }

    if (
      nodalOfficerData.name === "" ||
      nodalOfficerData.photograph === null ||
      nodalOfficerData.contact == "" ||
      nodalOfficerData.email == ""
      // reportingOfficerData.workingAddress.address == "" ||
      // reportingOfficerData.workingAddress.city == "" ||
      // reportingOfficerData.workingAddress.state == "" ||
      // reportingOfficerData.workingAddress.postalCode == ""
    ) {
      return alert("Incomplete Nodal Officer Data");
    }

    // setUploading(true);
    try {
      let res;
      if (institute) {
        res = await updateInstitute(
          instituteName,
          instituteLogo,
          nodalOfficerData,
          reportingOfficerData
        );
      } else {
        res = await createInstitute(
          instituteName,
          instituteLogo,
          nodalOfficerData,
          reportingOfficerData
        );
      }

      alert(res);
      // router.push("/home");
    } catch (error: any) {
      alert(error.message);
    } finally {
      // setReportingOfficerData(officerInit);
      // setNodalOfficerData(officerInit);
      setInstituteLogo(null);
      setInstituteName("");

      if (handleCancel !== undefined) {
        handleCancel(); // TODO: trying to set => setUpdate(false)
      }

      // setUploading(false);
    }
  };

  return (
    <section className="space-y-2">
      <Card className="mt-2 pt-4">
        <CardHeader className="font-semibold">Institute Details</CardHeader>
        <CardContent className="space-y-4">
          <CustomInput
            title="Institute Name"
            id="institute-name"
            value={instituteName}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setInstituteName(e.target.value)}
          />
          <CustomInput
            title="Institute Logo"
            id="institute-logo"
            type="file"
            onChange={(e: { target: { files: any } }) =>
              setInstituteLogo(e.target.files?.[0] || null)
            }
          />
        </CardContent>
      </Card>

      <OfficerForm
        officer="Nodal"
        data={nodalOfficerData}
        setData={setNodalOfficerData}
      />
      <OfficerForm
        officer="Reporting"
        data={reportingOfficerData}
        setData={setReportingOfficerData}
      />
      <div className="flex justify-between gap-4 my-2">
        <Button className="w-40" variant="destructive" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="w-40" onClick={handleAction}>
          {institute ? "Update" : "Add"}
        </Button>
      </div>
    </section>
  );
}

const OfficerForm: React.FC<{
  officer: string;
  data: Officer;
  setData: React.Dispatch<React.SetStateAction<Officer>>;
}> = ({ officer, data, setData }) => (
  <Card className="pt-4">
    <CardHeader className="font-semibold">{officer} Officer Details</CardHeader>
    <CardContent className="space-y-4">
      <CustomInput
        title="Name"
        id="name"
        value={data.name}
        onChange={(e: { target: { value: any } }) =>
          setData({ ...data, name: e.target.value })
        }
      />
      {officer === "Nodal" && (
        <CustomInput
          title="Add Picture"
          id="nodal-officer-profile-pic"
          type="file"
          onChange={(e: { target: { files: any } }) =>
            setData({ ...data, photograph: e.target.files?.[0] || null })
          }
        />
      )}
      <div className="grid grid-cols-2 gap-2">
        <CustomInput
          title="Contact"
          id="contact"
          value={data.contact}
          onChange={(e: { target: { value: any } }) =>
            setData({ ...data, contact: e.target.value })
          }
        />
        <CustomInput
          title="Email"
          id="email"
          value={data.email}
          onChange={(e: { target: { value: any } }) =>
            setData({ ...data, email: e.target.value })
          }
        />
        <span className="col-span-2 h-8 mt-4 font-semibold">
          Work Address
        </span>
        <CustomInput
          title="Address"
          id="address"
          value={data?.workingAddress?.address}
          onChange={(e: { target: { value: any } }) =>
            setData({
              ...data,
              workingAddress: { ...data.workingAddress, address: e.target.value },
            })
          }
          className="col-span-2"
        />
        <CustomInput
          title="City"
          id="city"
          value={data?.workingAddress?.city}
          onChange={(e: { target: { value: any } }) =>
            setData({
              ...data,
              workingAddress: { ...data.workingAddress, city: e.target.value },
            })
          }
        />
        <CustomInput
          title="State"
          id="state"
          value={data?.workingAddress?.state}
          onChange={(e: { target: { value: any } }) =>
            setData({
              ...data,
              workingAddress: { ...data.workingAddress, state: e.target.value },
            })
          }
        />
      </div>
      <CustomInput
        title="Postal Code"
        id="postal-code"
        value={data?.workingAddress?.postalCode}
        onChange={(e: { target: { value: any } }) =>
          setData({
            ...data,
            workingAddress: {
              ...data.workingAddress,
              postalCode: e.target.value,
            },
          })
        }
      />
    </CardContent>
  </Card>
);

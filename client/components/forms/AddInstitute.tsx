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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

function StyledInput({ title, id, className, type }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor={id}>{title}</Label>
        <Input
          id={id}
          type={type ? type : "text"}
          className={cn("w-full", className)}
          accept="image/*"
          multiple={false}
        />
      </div>
    </div>
  );
}
export default function AddInstitute() {
  return (
    <>
      <Card className="mt-2 pt-4">
        <CardHeader className="font-semibold">Institute Details</CardHeader>
        <CardContent>
          <StyledInput title="Institute Name" id="institute-name" />
          <StyledInput title="Institute Logo" id="institute-logo" type="file" />
        </CardContent>
      </Card>
      <Tabs defaultValue="nodal-officer" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="nodal-officer">Nodal Officer</TabsTrigger>
          <TabsTrigger value="reporting-officer">Reporting Officer</TabsTrigger>
        </TabsList>
        <TabsContent value="nodal-officer">
          <OfficerForm officer="Nodal Officer Details" />
        </TabsContent>
        <TabsContent value="reporting-officer">
          <OfficerForm officer="Reporting Officer Details" />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between my-2">
        <Button className="w-24" variant="destructive">
          Cancel
        </Button>
        <Button className="w-24">Add</Button>
      </div>
    </>
  );
}

const OfficerForm = ({ officer }) => (
  <Card className="pt-4">
    <CardHeader className="font-semibold">{officer}</CardHeader>
    <CardContent className="space-y-4">
      <StyledInput title="Name" id="name" />
      <StyledInput
        title="Add Picture"
        id="nodal-officer-profile-pic"
        type="file"
      />
      <div className="grid grid-cols-2 gap-2">
        <StyledInput title="Contact" id="contact" />
        <StyledInput title="Email" id="email" />

        <span className="col-span-2 h-8 mt-4 font-semibold">
          Working Address
        </span>
        <StyledInput title="House No." id="house" />
        <StyledInput title="Street" id="street" />
        <StyledInput title="City" id="city" />
        <StyledInput title="State" id="state" />
      </div>
      <StyledInput title="Postal Code" id="postal-code" />
    </CardContent>
  </Card>
);

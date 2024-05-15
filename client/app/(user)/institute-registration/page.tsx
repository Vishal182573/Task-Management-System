import AddInstitute from "@/components/forms/AddInstitute";
import ShowInstitutes from "@/components/shared/ShowInstitutes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DELETE, UPDATE } from "@/global/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institute Registration",
};

export default function page() {
  return (
    <section className="h-screen w-full flex justify-center">
      <Tabs defaultValue="add" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="add">Add Institute</TabsTrigger>
          <TabsTrigger value="update">Update Institute</TabsTrigger>
          <TabsTrigger value="delete">Delete Institute</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <AddInstitute />
        </TabsContent>
        <TabsContent value="update">
          <ShowInstitutes functionality={UPDATE} />
        </TabsContent>
        <TabsContent value="delete">
          <ShowInstitutes functionality={DELETE} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

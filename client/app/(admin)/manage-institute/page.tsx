import AddInstitute from '@/components/forms/AddInstitute';
import CommandDemo from '@/components/shared/SelectInstitute';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DELETE, UPDATE } from '@/contants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Institute',
};
export default function TabsDemo() {
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
          <CommandDemo functionality={UPDATE} />
        </TabsContent>
        <TabsContent value="delete">
          <CommandDemo functionality={DELETE} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

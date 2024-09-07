import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Text from "@/components/ui/text";
import { Layout } from "@client-portal/layout";

const fields = [
  {
    title: "Full Name",
    id: "name",
    type: "text",
    placeholder: "",
  },
  {
    title: "Email Address",
    id: "email",
    type: "text",
  },
  {
    title: "Mobile Number",
    id: "mobile_number",
    type: "text",
  },
  {
    title: "Business Number",
    id: "business_number",
    type: "text",
  },
  {
    title: "Fax Number",
    id: "fax_number",
    type: "text",
  },
  {
    title: "Country",
    id: "country",
    type: "text",
  },
  {
    title: "Street Address Line 1",
    id: "address_1",
    type: "text",
  },
  {
    title: "Street Address Line 2",
    id: "address_2",
    type: "text",
  },
  {
    title: "City",
    id: "city",
    type: "text",
  },
  {
    title: "State",
    id: "state",
    type: "text",
  },
  {
    title: "ZIP Code",
    id: "zip",
    type: "text",
  },
];

export default function MyProfile() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>My Profile</Text.Heading>
        <div className="flex flex-row row-wrap gap-6">
          <Card className="w-[572px]">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-5">
              {fields.map((field, i) => (
                <div
                  key={i}
                  className="grid w-full max-w-xl items-center gap-1.5"
                >
                  <Label htmlFor={field.id}>{field.title}</Label>
                  <Input
                    type="email"
                    id={field.id}
                    placeholder={field.placeholder || undefined}
                  />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

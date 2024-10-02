import { LoginInfoForm } from "@/components/client-portal/login-info-form";
import { PaymentInfoForm } from "@/components/client-portal/payment-info-form";
import { ProfileForm } from "@/components/client-portal/profile-form";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import * as Text from "@/components/ui/text";
import { Layout } from "@client-portal/layout";
import { useQuery } from "@tanstack/react-query";

export default function MyProfile() {
  // get user from api
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("https://api.example.com/users/00123").then(res => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  console.log(user);
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>My Profile</Text.Heading>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-5">
              <ProfileForm user={user} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-5">
              <PaymentInfoForm
                userId={user.id}
                paymentInfo={user.payment_info}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-5">
              <LoginInfoForm
                userId={user.id}
                username={user.username}
                password={user.password}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

import * as Text from "@repo/ui/components/ui/text";
import { Layout } from "@/components/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

export default function ContactUs() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>Contact Us</Text.Heading>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3 border rounded-lg bg-background p-4 flex-1">
            <Text.Heading size="md">General Details</Text.Heading>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Address
                  </TableCell>
                  <TableCell>7818 Big Sky Dr #107, Madison, WI 53719</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Phone
                  </TableCell>
                  <TableCell>(212) 527-2948</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Email
                  </TableCell>
                  <TableCell>
                    <a href="mailto:info@madinsonhandyman.com" className="text">
                      info@madinsonhandyman.com
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 border rounded-lg bg-background p-4 flex-1 order-last md:order-none">
            <Text.Heading size="md">Social Media</Text.Heading>
            <div className="flex gap-1">
              <Button variant="ghost" size="md">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="md">
                <Instagram />
              </Button>
              <Button variant="ghost" size="md">
                <Linkedin />
              </Button>
              <Button variant="ghost" size="md">
                <Twitter />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 border rounded-lg bg-background p-4 flex-1 col-span-1 order-1 md:order-none">
            <Text.Heading size="md">Hours</Text.Heading>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Sunday
                  </TableCell>
                  <TableCell>Closed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Monday
                  </TableCell>
                  <TableCell>7:00 AM - 6:00 PM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Tuesday
                  </TableCell>
                  <TableCell>7:00 AM - 6:00 PM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Wednesday
                  </TableCell>
                  <TableCell>7:00 AM - 6:00 PM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Thursday
                  </TableCell>
                  <TableCell>7:00 AM - 6:00 PM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Friday
                  </TableCell>
                  <TableCell>7:00 AM - 6:00 PM</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="md:w-1/4 w-1/2 font-bold">
                    Saturday
                  </TableCell>
                  <TableCell>9:00 AM - 4:00 PM</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Body } from "@/components/ui/text";
import RequiredLabel from "./required-label";

// TODO - pull in all state and country data from a service? We will likely need a more sophisticated solution for internationalization here...
const STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

const COUNTRIES = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Mexico", label: "Mexico" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Japan", label: "Japan" },
  { value: "China", label: "China" },
  { value: "India", label: "India" },
  { value: "Brazil", label: "Brazil" },
  { value: "Australia", label: "Australia" },
  { value: "South Africa", label: "South Africa" },
];

const CardDetails = () => {
  // LEGS TODO: use zod / inline form validation
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChange = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // do something with credit card details here/
  };

  return (
    <form onChange={handleChange} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2" data-testid="card-details">
        <RequiredLabel>
          <Body size="md" className="font-semibold">
            Card Details
          </Body>
        </RequiredLabel>
        <div
          className="grid w-full items-center gap-2"
          data-testid="form-group-billing-details"
        >
          <Input
            placeholder="Name on Card"
            id="nameOnCard"
            name="nameOnCard"
            value={formData.nameOnCard}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-5 gap-2">
            <Input
              className="col-span-3"
              id="cardNumber"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleInputChange}
            />

            <Input
              className="col-span-1 col-start-4"
              placeholder="MM/YY"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
            />

            <Input
              className="col-span-1 col-start-5"
              placeholder="CVV"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col gap-2"
        data-testid="form-group-billing-details"
      >
        <RequiredLabel>
          <Body size="md" className="font-semibold">
            Billing Details
          </Body>
        </RequiredLabel>

        <Input
          placeholder="Street Address 1"
          id="streetAddress1"
          name="streetAddress1"
          value={formData.streetAddress1}
          onChange={handleInputChange}
        />

        <Input
          placeholder="Street Address 2"
          id="streetAddress2"
          name="streetAddress2"
          value={formData.streetAddress2}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-7 gap-2">
          <Input
            className="col-span-3"
            placeholder="City"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          {formData.country === "United States" ? (
            <div className="col-span-2">
              <Select onValueChange={handleSelectChange("state")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {STATES.map(state => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
          <Input
            className="col-span-2"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="ZIP Code"
          />
        </div>
        <Select
          onValueChange={handleSelectChange("country")}
          defaultValue={formData.country}
        >
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map(country => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
};

export default CardDetails;

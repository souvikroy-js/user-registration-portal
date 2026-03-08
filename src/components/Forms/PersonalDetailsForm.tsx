"use client";

import { personalDetailsSchema } from "@/lib/schema";
import { PersonalDetailsSchemaType } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcnui/select";

const WEST_BENGAL_DATA: Record<string, string[]> = {
  Bankura: ["Bankura", "Bishnupur", "Sonamukhi", "Khatra", "Raipur"],
  Birbhum: ["Suri", "Bolpur", "Rampurhat", "Nalhati", "Sainthia"],
  Burdwan: ["Burdwan", "Asansol", "Durgapur", "Kulti", "Kalna"],
  "Cooch Behar": [
    "Cooch Behar",
    "Mathabhanga",
    "Dinhata",
    "Tufanganj",
    "Mekhliganj",
  ],
  Darjeeling: ["Darjeeling", "Siliguri", "Kurseong", "Kalimpong", "Mirik"],
  Hooghly: ["Chinsurah", "Serampore", "Chandannagar", "Arambagh", "Tarakeswar"],
  Howrah: ["Howrah", "Uluberia", "Bally", "Domjur", "Amta"],
  Jalpaiguri: ["Jalpaiguri", "Alipurduar", "Mal", "Dhupguri", "Rajganj"],
  Kolkata: [
    "Kolkata",
    "Salt Lake",
    "Dum Dum",
    "Jadavpur",
    "Tollygunge",
    "Behala",
  ],
  Malda: ["Malda", "English Bazar", "Old Malda", "Gazole", "Habibpur"],
  Murshidabad: ["Berhampore", "Jangipur", "Lalbag", "Domkal", "Raghunathganj"],
  Nadia: ["Krishnanagar", "Ranaghat", "Kalyani", "Chakdaha", "Nabadwip"],
  "North 24 Parganas": [
    "Barasat",
    "Barrackpore",
    "Habra",
    "Basirhat",
    "Bangaon",
  ],
  "Paschim Medinipur": [
    "Midnapore",
    "Kharagpur",
    "Jhargram",
    "Ghatal",
    "Chandrakona",
  ],
  "Purba Medinipur": ["Tamluk", "Haldia", "Digha", "Contai", "Egra"],
  Purulia: ["Purulia", "Raghunathpur", "Jhalda", "Manbazar", "Para"],
  "South 24 Parganas": [
    "Alipore",
    "Diamond Harbour",
    "Baruipur",
    "Kakdwip",
    "Canning",
  ],
  "Uttar Dinajpur": ["Raiganj", "Islampur", "Dalkhola", "Itahar", "Hemtabad"],
  "Paschim Bardhaman": ["Asansol", "Durgapur", "Raniganj", "Kulti", "Jamuria"],
  "Purba Bardhaman": ["Burdwan", "Kalna", "Katwa", "Memari", "Ausgram"],
  Jhargram: ["Jhargram", "Binpur", "Nayagram", "Salboni"],
  Kalimpong: ["Kalimpong", "Gorubathan", "Lava", "Lolegaon"],
};

const DISTRICTS = Object.keys(WEST_BENGAL_DATA).sort();

const PersonalDetailsForm = () => {
  const { handleSubmit, control, watch, setValue } =
    useForm<PersonalDetailsSchemaType>({
      resolver: zodResolver(personalDetailsSchema),
      defaultValues: {
        fullName: "",
        email: "",
        phoneNumber: "",
        state: "West Bengal",
        district: "",
        city: "",
        pincode: "",
        place: "",
      },
    });

  const selectedDistrict = watch("district");
  const cities = WEST_BENGAL_DATA[selectedDistrict] ?? [];

  const PersonalDetailsHandler = async (data: PersonalDetailsSchemaType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(PersonalDetailsHandler)}
      noValidate
      className="space-y-4">
      {/* Full Name */}
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Full Name <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Email <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Phone Number <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="tel"
              placeholder="+91 9876543210"
              autoComplete="tel"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* State — fixed to West Bengal */}
      <Field>
        <FieldLabel>State</FieldLabel>
        <Input
          value="West Bengal"
          disabled
          className="cursor-not-allowed opacity-60"
        />
      </Field>

      {/* District */}
      <Controller
        name="district"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              District <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Select
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val);
                setValue("city", "");
              }}>
              <SelectTrigger
                id={field.name}
                aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((d) => (
                  <SelectItem
                    key={d}
                    value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* City */}
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              City <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!selectedDistrict}>
              <SelectTrigger
                id={field.name}
                aria-invalid={fieldState.invalid}>
                <SelectValue
                  placeholder={
                    selectedDistrict ? "Select city" : "Select a district first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem
                    key={c}
                    value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Pincode */}
      <Controller
        name="pincode"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Pincode <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Place */}
      <Controller
        name="place"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Place <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              placeholder="Enter your place / locality"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-700">
        Save & Continue →
      </button>
    </form>
  );
};

export default PersonalDetailsForm;

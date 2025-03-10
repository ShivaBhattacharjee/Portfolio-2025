import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaArrowRight } from "react-icons/fa6";
import { Press_Start_2P, Zen_Dots } from "next/font/google";
const zenDots = Zen_Dots({ subsets: ["latin"], weight: "400" });
const pressStartFont = Press_Start_2P({ subsets: ["latin"], weight: "400" });
// Convert your existing validation schema to zod
const formSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = ({ handleOnSubmit, isSubmitting }) => {
  // Define form
const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      subject: "",
      body: "",
    },
  });

  // Form submission handler
  const onSubmit = (values) => {
    handleOnSubmit(values);
  };

  return (
    <>
      <Form {...form} className={`${pressStartFont.className}`}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`mt-4 space-y-4 ${pressStartFont.className}`}
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage className="text-[0.8rem] font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[0.8rem] font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm">Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email Subject" {...field} />
                </FormControl>
                <FormMessage className="text-[0.8rem] font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm">Body</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter Email Body" {...field} />
                </FormControl>
                <FormMessage className="text-[0.8rem] font-medium" />
              </FormItem>
            )}
          />

          <div className="w-full">
            {isSubmitting ? (
              <Button disabled={true} className="w-full">
                Submitting....
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="w-full"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
      <div className="flex flex-col gap-4">
        <h1 className={`text-center ${pressStartFont.className} `}>
          --------OR--------
        </h1>
        <a
          href="https://cal.com/shivabhattacharjee"
          target="_blank"
          className={`${zenDots.className}`}
        >
          <Button size="lg" className="w-full">
            Schedule a meeting <FaArrowRight className="ml-2" size="14px" />
          </Button>
        </a>
      </div>
    </>
  );
};

export default ContactForm;

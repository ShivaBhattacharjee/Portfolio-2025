import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ContactForm from "./contact-form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { FaArrowRight } from "react-icons/fa6";
import { Press_Start_2P } from "next/font/google";
const pressStartFont = Press_Start_2P({ subsets: ["latin"], weight: "400" });

const ContactDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleOnSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      // Send the form data to your API endpoint that connects to Discord
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Show success toast
      toast({
        title: "Message has been sent successfully",
        description: "Your message has been sent to Discord",
      });

      console.log(values);
      setIsOpen(false);
    } catch (error) {
      // Show error toast
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="lg">
            Contact Me <FaArrowRight className="ml-2" size="14px" />
          </Button>
        </DialogTrigger>
        <DialogContent className={`${pressStartFont.className} text-sm`}>
          <DialogHeader>
            <DialogTitle>Contact Me</DialogTitle>
            <DialogDescription>
              Let&apos;s get in touch by sending me a message.
            </DialogDescription>
          </DialogHeader>
          <ContactForm
            handleOnSubmit={handleOnSubmit}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

  );
};

export default ContactDialog;

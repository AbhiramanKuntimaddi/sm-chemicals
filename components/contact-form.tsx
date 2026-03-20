"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send, CheckCircle, ArrowRight } from "lucide-react"

const industries = [
  "Water Treatment",
  "ETP/STP",
  "Construction",
  "Textile",
  "Pharmaceutical",
  "Paints & Coatings",
  "Food & Beverage",
  "Power Plants",
  "Oil & Gas",
  "Other",
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="mt-8 text-center py-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-card-foreground">
          Thank You!
        </h3>
        <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
          Your inquiry has been submitted successfully. Our team will contact you within 24 hours.
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Inquiry
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            className="h-12 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium">Company Name</Label>
          <Input
            id="company"
            name="company"
            placeholder="Your Company"
            required
            className="h-12 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="h-12 rounded-xl"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            required
            className="h-12 rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
        <Select name="industry" required>
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry.toLowerCase()}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="products" className="text-sm font-medium">Products of Interest</Label>
        <Input
          id="products"
          name="products"
          placeholder="e.g., PAC, Ferric Chloride, Softeners"
          className="h-12 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your requirements, quantities needed, and any specific questions..."
          rows={5}
          required
          className="rounded-xl resize-none"
        />
      </div>

      <Button 
        type="submit" 
        size="lg" 
        className="w-full h-14 rounded-xl text-base" 
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          <>
            Send Inquiry
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  )
}

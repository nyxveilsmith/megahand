import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn
} from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  // Initialize scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.slide-in');
    elements.forEach(element => observer.observe(element));
    
    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);
  
  // Define form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
  });
  
  function onSubmit(values: ContactFormValues) {
    // In a real app, this would send the form data to the server
    console.log(values);
    
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We will get back to you soon!",
    });
    
    form.reset();
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 slide-in">Contact Us</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-8 slide-in"></div>
          <p className="text-gray-600 max-w-3xl mx-auto slide-in">
            Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="slide-in">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Message subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message" 
                          className="resize-none" 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium btn-hover"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="slide-in">
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-amber-500 p-3 rounded-full text-white mr-4 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">123 Business Avenue, Baku, Azerbaijan</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-500 p-3 rounded-full text-white mr-4 flex items-center justify-center">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">info@megahand.az</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-amber-500 p-3 rounded-full text-white mr-4 flex items-center justify-center">
                    <FaPhone className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">+994 12 345 6789</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200">
                      <FaFacebookF />
                    </a>
                    <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors duration-200">
                      <FaTwitter />
                    </a>
                    <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors duration-200">
                      <FaInstagram />
                    </a>
                    <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors duration-200">
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 slide-in">
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* This would be an actual map in a real app */}
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Map will be displayed here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

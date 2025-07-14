import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertArticleSchema } from "@shared/schema";
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
import { Article } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const formSchema = insertArticleSchema.extend({
  id: z.number().optional(),
});

type ArticleFormValues = z.infer<typeof formSchema>;

interface AdminArticleFormProps {
  article?: Article | null;
  onSubmit: (values: ArticleFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const AdminArticleForm = ({ 
  article,
  onSubmit,
  onCancel,
  isSubmitting
}: AdminArticleFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Define form
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      summary: article?.summary || "",
      content: article?.content || "",
      imageUrl: article?.imageUrl || "",
      status: article?.status || "published",
    },
  });
  
  // Update form values when article changes
  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title || "",
        summary: article.summary || "",
        content: article.content || "",
        imageUrl: article.imageUrl || "",
        status: article.status || "published",
      });
      
      if (article.imageUrl) {
        setPreviewImage(article.imageUrl);
      }
    } else {
      form.reset({
        title: "",
        summary: "",
        content: "",
        imageUrl: "",
        status: "published",
      });
      setPreviewImage(null);
    }
  }, [article, form]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value;
    form.setValue("imageUrl", imageUrl);
    setPreviewImage(imageUrl);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief summary of the article" 
                  className="resize-none" 
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Full article content" 
                  className="resize-none" 
                  rows={10}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <FormControl>
                    <Input placeholder="Image URL" {...field} onChange={(e) => handleImageChange(e)} />
                  </FormControl>
                </div>
                <div 
                  className="w-24 h-24 rounded-md overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-sm">No image</span>
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {article ? 'Update' : 'Create'} Article
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminArticleForm;

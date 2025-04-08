import { useState, useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useArticles } from "@/hooks/useArticles";
import { AuthContext } from "../context/AuthContext";
import AdminArticleForm from "@/components/AdminArticleForm";
import { Article } from "@shared/schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

const AdminDashboard = () => {
  const { isAuthenticated, username, logout, loading } = useContext(AuthContext);
  const [_, setLocation] = useLocation();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  
  const { 
    articles, 
    isLoading: articlesLoading, 
    createArticle, 
    updateArticle, 
    deleteArticle, 
    isCreating, 
    isUpdating, 
    isDeleting 
  } = useArticles();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setLocation("/admin");
    }
  }, [isAuthenticated, loading, setLocation]);
  
  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };
  
  const handleAddArticle = (formData: any) => {
    createArticle(formData);
    setAddDialogOpen(false);
  };
  
  const handleUpdateArticle = (formData: any) => {
    if (selectedArticle) {
      updateArticle({ id: selectedArticle.id, article: formData });
      setEditDialogOpen(false);
      setSelectedArticle(null);
    }
  };
  
  const handleDeleteArticle = () => {
    if (articleToDelete !== null) {
      deleteArticle(articleToDelete);
      setDeleteDialogOpen(false);
    }
  };
  
  const openEditDialog = (article: Article) => {
    setSelectedArticle(article);
    setEditDialogOpen(true);
  };
  
  const openDeleteDialog = (articleId: number) => {
    setArticleToDelete(articleId);
    setDeleteDialogOpen(true);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6">You need to be logged in to view this page.</p>
          <Button onClick={() => setLocation("/admin")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">MegaHand.az Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {username}</span>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Manage Interesting Articles</h2>
            
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" /> Add New Article
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Add New Article</DialogTitle>
                </DialogHeader>
                <AdminArticleForm 
                  onSubmit={handleAddArticle} 
                  onCancel={() => setAddDialogOpen(false)}
                  isSubmitting={isCreating}
                />
              </DialogContent>
            </Dialog>
          </div>
          
          {articlesLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-700 mb-4">No articles found</h3>
              <p className="text-gray-500 mb-8">
                Start by adding your first article
              </p>
              <Button onClick={() => setAddDialogOpen(true)}>
                <PlusIcon className="mr-2 h-4 w-4" /> Add New Article
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{article.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(article.date), "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary hover:text-blue-700 mr-2"
                          onClick={() => openEditDialog(article)}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => openDeleteDialog(article.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      {/* Edit Article Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          <AdminArticleForm 
            article={selectedArticle}
            onSubmit={handleUpdateArticle} 
            onCancel={() => setEditDialogOpen(false)}
            isSubmitting={isUpdating}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteArticle}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;

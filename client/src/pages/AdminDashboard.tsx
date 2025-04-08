import { useState, useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useArticles } from "@/hooks/useArticles";
import { useLocations } from "@/hooks/useLocations";
import { AuthContext } from "../context/AuthContext";
import AdminArticleForm from "@/components/AdminArticleForm";
import AdminLocationForm from "@/components/AdminLocationForm";
import { Article, Location } from "@shared/schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon, Pencil, Trash2, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const { isAuthenticated, username, logout, loading } = useContext(AuthContext);
  const [_, setLocation] = useLocation();
  
  // Articles state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  
  // Locations state
  const [addLocationDialogOpen, setAddLocationDialogOpen] = useState(false);
  const [editLocationDialogOpen, setEditLocationDialogOpen] = useState(false);
  const [deleteLocationDialogOpen, setDeleteLocationDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);
  
  // Tab state
  const [activeTab, setActiveTab] = useState("articles");
  
  // Articles data and mutations
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
  
  // Locations data and mutations
  const {
    locations,
    isLoading: locationsLoading,
    createLocation,
    updateLocation,
    deleteLocation,
    isCreating: isCreatingLocation,
    isUpdating: isUpdatingLocation,
    isDeleting: isDeletingLocation
  } = useLocations();
  
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
  
  // Location handlers
  const handleAddLocation = (formData: any) => {
    // Transform form values to match backend schema
    const locationData: any = {
      name: formData.name,
      address: formData.address,
      description: formData.description,
      imageUrl: formData.imageUrl,
      phoneNumber: formData.phone || null,
      instagramAccount: formData.instagram || null,
      whatsappNumber: formData.whatsapp || null,
      latitude: null,
      longitude: null,
      status: "active"
    };
    
    createLocation(locationData);
    setAddLocationDialogOpen(false);
  };
  
  const handleUpdateLocation = (formData: any) => {
    if (selectedLocation) {
      // Transform form values to match backend schema
      const locationData: any = {
        name: formData.name,
        address: formData.address,
        description: formData.description,
        imageUrl: formData.imageUrl,
        phoneNumber: formData.phone || null,
        instagramAccount: formData.instagram || null,
        whatsappNumber: formData.whatsapp || null,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        status: selectedLocation.status
      };
      
      updateLocation({ id: selectedLocation.id, location: locationData });
      setEditLocationDialogOpen(false);
      setSelectedLocation(null);
    }
  };
  
  const handleDeleteLocation = () => {
    if (locationToDelete !== null) {
      deleteLocation(locationToDelete);
      setDeleteLocationDialogOpen(false);
    }
  };
  
  const openEditLocationDialog = (location: any) => {
    setSelectedLocation({
      ...location,
      phone: location.phoneNumber,
      instagram: location.instagramAccount,
      whatsapp: location.whatsappNumber
    });
    setEditLocationDialogOpen(true);
  };
  
  const openDeleteLocationDialog = (locationId: number) => {
    setLocationToDelete(locationId);
    setDeleteLocationDialogOpen(true);
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles" className="mt-6">
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
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
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
          </TabsContent>
          
          <TabsContent value="locations" className="mt-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Manage Store Locations</h2>
                
                <Dialog open={addLocationDialogOpen} onOpenChange={setAddLocationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusIcon className="mr-2 h-4 w-4" /> Add New Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px]">
                    <DialogHeader>
                      <DialogTitle>Add New Location</DialogTitle>
                    </DialogHeader>
                    <AdminLocationForm 
                      onSubmit={handleAddLocation} 
                      onCancel={() => setAddLocationDialogOpen(false)}
                      isSubmitting={isCreatingLocation}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              
              {locationsLoading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Loading locations...</p>
                </div>
              ) : locations.length === 0 ? (
                <div className="text-center py-16">
                  <MapPin className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-4">No locations found</h3>
                  <p className="text-gray-500 mb-8">
                    Start by adding your first store location
                  </p>
                  <Button onClick={() => setAddLocationDialogOpen(true)}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Add New Location
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {locations.map((location) => (
                        <tr key={location.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{location.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {location.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {location.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-primary hover:text-blue-700 mr-2"
                              onClick={() => openEditLocationDialog(location)}
                            >
                              <Pencil className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => openDeleteLocationDialog(location.id)}
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
          </TabsContent>
        </Tabs>
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
      
      {/* Delete Article Confirmation Dialog */}
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
      
      {/* Edit Location Dialog */}
      <Dialog open={editLocationDialogOpen} onOpenChange={setEditLocationDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
          </DialogHeader>
          <AdminLocationForm 
            location={selectedLocation}
            onSubmit={handleUpdateLocation} 
            onCancel={() => setEditLocationDialogOpen(false)}
            isSubmitting={isUpdatingLocation}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Location Confirmation Dialog */}
      <AlertDialog open={deleteLocationDialogOpen} onOpenChange={setDeleteLocationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the location.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteLocation}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeletingLocation ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;

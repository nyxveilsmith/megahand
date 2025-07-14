import { useQuery, useMutation } from "@tanstack/react-query";
import { InsertLocation, Location } from "@shared/schema";
import { queryClient, apiRequest } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useLocations() {
  const { toast } = useToast();
  const locationsQuery = useQuery<Location[]>({
    queryKey: ["/api/locations"],
    queryFn: async () => {
      const response = await fetch("/api/locations");
      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }
      const data = await response.json();
      console.log("API response data:", data);
      return data;
    }
  });
  
  const createLocationMutation = useMutation({
    mutationFn: async (newLocation: InsertLocation) => {
      const res = await apiRequest("POST", "/api/locations", newLocation);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      toast({
        title: "Success",
        description: "Location created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create location: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const updateLocationMutation = useMutation({
    mutationFn: async ({
      id,
      location,
    }: {
      id: number;
      location: Partial<InsertLocation>;
    }) => {
      const res = await apiRequest("PUT", `/api/locations/${id}`, location);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      toast({
        title: "Success",
        description: "Location updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update location: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const deleteLocationMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/locations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/locations"] });
      toast({
        title: "Success",
        description: "Location deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete location: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  return {
    locations: locationsQuery.data || [],
    isLoading: locationsQuery.isLoading,
    error: locationsQuery.error,
    createLocation: createLocationMutation.mutate,
    updateLocation: updateLocationMutation.mutate,
    deleteLocation: deleteLocationMutation.mutate,
    isCreating: createLocationMutation.isPending,
    isUpdating: updateLocationMutation.isPending,
    isDeleting: deleteLocationMutation.isPending,
  };
}

export function useLocation(id: number | null) {
  return useQuery<Location | undefined>({
    queryKey: ["/api/locations", id],
    enabled: id !== null,
    queryFn: async ({ queryKey }) => {
      const [, locationId] = queryKey;
      if (!locationId) return undefined;
      const res = await fetch(`/api/locations/${locationId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch location");
      }
      return res.json();
    },
  });
}
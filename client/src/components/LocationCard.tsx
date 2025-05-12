import { Location } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Instagram, MessageCircle } from "lucide-react";

// Extended location type with additional fields for UI convenience
// Map the database fields to UI friendly names
interface ExtendedLocation extends Omit<Location, 'zipCode'> {
  mapUrl?: string | null;
  phone?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  zipCode: string | null;
}

interface LocationCardProps {
  location: ExtendedLocation;
  isAdmin?: boolean;
  onEdit?: (location: ExtendedLocation) => void;
  onDelete?: (id: number) => void;
}

const LocationCard = ({ location, isAdmin = false, onEdit, onDelete }: LocationCardProps) => {
  console.log("LocationCard received location:", location);
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative h-[180px] sm:h-[200px] overflow-hidden">
        <img 
          src={location.imageUrl || "https://via.placeholder.com/400x200?text=Megahand+Location"} 
          alt={location.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-lg sm:text-xl font-bold text-primary">{location.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="text-sm sm:text-base">{location.address}{location.zipCode ? `, ${location.zipCode}` : ''}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-1 sm:pb-2 flex-grow">
        <p className="text-sm sm:text-base text-slate-600 mb-3">{location.description}</p>
        
        <div className="space-y-3 mt-4">
          {location.phone && (
            <a 
              href={`tel:${location.phone}`} 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <Phone size={20} className="text-primary" />
              <span className="text-sm sm:text-base hover:underline">{location.phone}</span>
            </a>
          )}
          
          {location.instagram && (
            <a 
              href={`https://instagram.com/${location.instagram.replace('@', '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <Instagram size={20} className="text-primary" />
              <span className="text-sm sm:text-base hover:underline">{location.instagram}</span>
            </a>
          )}
          
          {location.whatsapp && (
            <a 
              href={`https://wa.me/${location.whatsapp.replace(/\D/g, '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              <MessageCircle size={20} className="text-primary" />
              <span className="text-sm sm:text-base hover:underline">WhatsApp</span>
            </a>
          )}
        </div>
      </CardContent>
      
      {isAdmin && (
        <CardFooter className="pt-2 flex gap-2 px-3 sm:px-6 pb-4">
          <Button 
            variant="outline" 
            size="lg"
            className="flex-1 text-base"
            onClick={() => onEdit && onEdit(location)}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="lg"
            className="flex-1 text-base"
            onClick={() => onDelete && onDelete(location.id)}
          >
            Delete
          </Button>
        </CardFooter>
      )}
      
      {!isAdmin && location.mapUrl && (
        <CardFooter className="pt-2 px-3 sm:px-6 pb-4">
          <Button 
            variant="default" 
            size="lg"
            className="w-full text-base h-12"
            asChild
          >
            <a 
              href={location.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MapPin size={18} />
              Xəritədə Bax
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LocationCard;
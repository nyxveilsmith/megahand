import { Location } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Instagram, MessageCircle } from "lucide-react";

// Extended location type with additional fields for UI convenience
interface ExtendedLocation extends Location {
  mapUrl?: string | null;
  phone?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
}

interface LocationCardProps {
  location: ExtendedLocation;
  isAdmin?: boolean;
  onEdit?: (location: ExtendedLocation) => void;
  onDelete?: (id: number) => void;
}

const LocationCard = ({ location, isAdmin = false, onEdit, onDelete }: LocationCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative h-[200px] overflow-hidden">
        <img 
          src={location.imageUrl || "https://via.placeholder.com/400x200?text=Megahand+Location"} 
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-primary">{location.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin size={16} className="text-muted-foreground" />
          <span>{location.address}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-slate-600 mb-3">{location.description}</p>
        
        <div className="space-y-2">
          {location.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              <a href={`tel:${location.phone}`} className="text-sm hover:underline">{location.phone}</a>
            </div>
          )}
          
          {location.instagram && (
            <div className="flex items-center gap-2">
              <Instagram size={16} className="text-primary" />
              <a 
                href={`https://instagram.com/${location.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                {location.instagram}
              </a>
            </div>
          )}
          
          {location.whatsapp && (
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-primary" />
              <a 
                href={`https://wa.me/${location.whatsapp.replace(/\D/g, '')}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                WhatsApp
              </a>
            </div>
          )}
        </div>
      </CardContent>
      
      {isAdmin && (
        <CardFooter className="pt-2 flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={() => onEdit && onEdit(location)}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            className="flex-1"
            onClick={() => onDelete && onDelete(location.id)}
          >
            Delete
          </Button>
        </CardFooter>
      )}
      
      {!isAdmin && location.mapUrl && (
        <CardFooter className="pt-2">
          <Button 
            variant="default" 
            className="w-full"
            asChild
          >
            <a 
              href={location.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MapPin size={16} />
              View on Map
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LocationCard;
import { db } from "./db";
import { storage } from "./storage";
import { users, articles, locations } from "@shared/schema";
import { eq } from "drizzle-orm";

// Function to seed the database with initial data if empty
export async function seedDatabase() {
  try {
    console.log("Checking if database needs seeding...");
    
    // Check if users table is empty
    const userCount = await db.select({ count: users.id }).from(users);
    const hasUsers = userCount.length > 0 && userCount[0].count !== null;
    
    if (!hasUsers) {
      console.log("Seeding admin user...");
      await storage.createUser({
        username: "admin",
        password: "password123" // In a real app, this would be hashed
      });
    }
    
    // Check if articles table is empty
    const articleCount = await db.select({ count: articles.id }).from(articles);
    const hasArticles = articleCount.length > 0 && articleCount[0].count !== null;
    
    if (!hasArticles) {
      console.log("Seeding articles...");
      
      // Seed articles
      await storage.createArticle({
        title: "Yeni Mövsüm Kolleksiyası",
        summary: "2024-cü ilin yaz-yay kolleksiyasında ən son dəb tendensiyaları və rəng kombinasiyaları ilə tanış olun...",
        content: "Yeni mövsüm kolleksiyamızda təqdim olunan geyimlər müasir üslubla klassik elementləri özündə birləşdirir. Kolleksiyada parlaq rənglər, rahat parçalar və innovativ dizaynlar üstünlük təşkil edir.",
        imageUrl: "https://images.unsplash.com/photo-1581090700227-8e3b68af7c63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        status: "published"
      });
      
      await storage.createArticle({
        title: "Davamlı Moda Təşəbbüslərimiz",
        summary: "Ətraf mühitə qayğı ilə yanaşaraq hazırladığımız ekoloji təmiz kolleksiyalarımız haqqında məlumat əldə edin...",
        content: "Megahand olaraq davamlı moda sahəsində öncül olmağı hədəfləyirik. Təbii parçalardan istifadə, tullantıların azaldılması və ətraf mühitin qorunması bizim əsas prioritetlərimizdəndir.",
        imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        status: "published"
      });
      
      await storage.createArticle({
        title: "Uşaq Geyimləri Bələdçisi",
        summary: "Uşaqlarınız üçün ən rahat və keyfiyyətli geyimləri seçərkən diqqət etməli olduğunuz məqamlar...",
        content: "Uşaq geyimlərini seçərkən parçanın keyfiyyəti, rahatlığı və davamlılığı əsas faktorlardır. Bu məqalədə sizə uşaq geyimlərini seçərkən kömək edəcək məsləhətlər verəcəyik.",
        imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        status: "published"
      });
      
      await storage.createArticle({
        title: "İdman Geyimləri Seçimi",
        summary: "İdmanla məşğul olarkən düzgün geyim seçiminin performansınıza təsiri və əhəmiyyəti...",
        content: "İdman geyimləri seçərkən nəfəs alan parçalar, rahat kəsimlər və mövsümə uyğunluq əsas götürülməlidir. Məqalədə müxtəlif idman növləri üçün ən uyğun geyim seçimləri haqqında məlumat verəcəyik.",
        imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        status: "published"
      });
      
      await storage.createArticle({
        title: "Yay Trendləri 2024",
        summary: "Bu yay mövsümündə öndə olacaq rənglər, modellər və aksessuarlar haqqında hərtərəfli bələdçi...",
        content: "2024-cü ilin yay mövsümü canlı rənglər, rahat siluetlər və təbii materiallarla yadda qalacaq. Məqalədə mövsümün əsas trendləri və onları necə kombinə edə biləcəyiniz haqqında məlumatlar tapacaqsınız.",
        imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        status: "published"
      });
    }
    
    // Check if locations table is empty
    const locationCount = await db.select({ count: locations.id }).from(locations);
    const hasLocations = locationCount.length > 0 && locationCount[0].count !== null;
    
    if (!hasLocations) {
      console.log("Seeding locations...");
      
      // Seed locations
      await storage.createLocation({
        name: "Megahand Sumqayit #1",
        address: "Badalbayli Street, Sumqayit 5001",
        zipCode: "5001",
        description: "Our main office in Sumqayit. Visit us for the latest European clothing collections.",
        phoneNumber: "+99450 277 07 20",
        instagramAccount: "@megahandsumqayit",
        whatsappNumber: "+99450 277 07 20",
        imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        latitude: "40.5889",
        longitude: "49.6572",
        status: "active"
      });
      
      await storage.createLocation({
        name: "Megahand Bakı -Q.Qarayev-",
        address: "CW8R+255, Baku",
        description: "Our Baku branch located near Qara Qarayev metro station.",
        phoneNumber: "+99450 490 35 60",
        instagramAccount: "@megahandsumqayit",
        whatsappNumber: "+99450 490 35 60",
        imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        latitude: "40.4093",
        longitude: "49.9387",
        status: "active"
      });
      
      await storage.createLocation({
        name: "Megahand-Gəncə",
        address: "M9H9+X33, Ganja",
        description: "Our Ganja location offering quality European fashion.",
        phoneNumber: "+99450 453 20 45",
        instagramAccount: "@megahandsumqayit",
        whatsappNumber: "+99450 453 20 45",
        imageUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        latitude: "40.6830",
        longitude: "46.3606",
        status: "active"
      });
      
      await storage.createLocation({
        name: "Megahand Bakı-28May",
        address: "140 Shamil Azizbayov, Baku",
        description: "Our Baku branch located near 28 May metro station.",
        phoneNumber: "+99450 277 87 26",
        instagramAccount: "@megahandsumqayit",
        whatsappNumber: "+99450 277 87 26",
        imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        latitude: "40.3776",
        longitude: "49.8501",
        status: "active"
      });
    }
    
    console.log("Database seeding check complete.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
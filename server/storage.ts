import { articles, type Article, type InsertArticle, users, type User, type InsertUser, locations, type Location, type InsertLocation } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getAllArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<boolean>;
  
  // Location methods
  getAllLocations(): Promise<Location[]>;
  getLocationById(id: number): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;
  updateLocation(id: number, location: Partial<InsertLocation>): Promise<Location | undefined>;
  deleteLocation(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private articlesList: Map<number, Article>;
  private locationsList: Map<number, Location>;
  currentUserId: number;
  currentArticleId: number;
  currentLocationId: number;

  constructor() {
    this.users = new Map();
    this.articlesList = new Map();
    this.locationsList = new Map();
    this.currentUserId = 1;
    this.currentArticleId = 1;
    this.currentLocationId = 1;
    
    // Add admin user by default
    this.createUser({
      username: "admin",
      password: "password" // In a real app, this would be hashed
    });
    
    // Add default articles in Azerbaijani
    this.createArticle({
      title: "Yeni Mövsüm Kolleksiyası",
      summary: "2024-cü ilin yaz-yay kolleksiyasında ən son dəb tendensiyaları və rəng kombinasiyaları ilə tanış olun...",
      content: "Yeni mövsüm kolleksiyamızda təqdim olunan geyimlər müasir üslubla klassik elementləri özündə birləşdirir. Kolleksiyada parlaq rənglər, rahat parçalar və innovativ dizaynlar üstünlük təşkil edir.",
      imageUrl: "https://images.unsplash.com/photo-1581090700227-8e3b68af7c63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published"
    });
    
    this.createArticle({
      title: "Davamlı Moda Təşəbbüslərimiz",
      summary: "Ətraf mühitə qayğı ilə yanaşaraq hazırladığımız ekoloji təmiz kolleksiyalarımız haqqında məlumat əldə edin...",
      content: "Megahand olaraq davamlı moda sahəsində öncül olmağı hədəfləyirik. Təbii parçalardan istifadə, tullantıların azaldılması və ətraf mühitin qorunması bizim əsas prioritetlərimizdəndir.",
      imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published"
    });
    
    this.createArticle({
      title: "Uşaq Geyimləri Bələdçisi",
      summary: "Uşaqlarınız üçün ən rahat və keyfiyyətli geyimləri seçərkən diqqət etməli olduğunuz məqamlar...",
      content: "Uşaq geyimlərini seçərkən parçanın keyfiyyəti, rahatlığı və davamlılığı əsas faktorlardır. Bu məqalədə sizə uşaq geyimlərini seçərkən kömək edəcək məsləhətlər verəcəyik.",
      imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published"
    });
    
    this.createArticle({
      title: "İdman Geyimləri Seçimi",
      summary: "İdmanla məşğul olarkən düzgün geyim seçiminin performansınıza təsiri və əhəmiyyəti...",
      content: "İdman geyimləri seçərkən nəfəs alan parçalar, rahat kəsimlər və mövsümə uyğunluq əsas götürülməlidir. Məqalədə müxtəlif idman növləri üçün ən uyğun geyim seçimləri haqqında məlumat verəcəyik.",
      imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published"
    });
    
    this.createArticle({
      title: "Yay Trendləri 2024",
      summary: "Bu yay mövsümündə öndə olacaq rənglər, modellər və aksessuarlar haqqında hərtərəfli bələdçi...",
      content: "2024-cü ilin yay mövsümü canlı rənglər, rahat siluetlər və təbii materiallarla yadda qalacaq. Məqalədə mövsümün əsas trendləri və onları necə kombinə edə biləcəyiniz haqqında məlumatlar tapacaqsınız.",
      imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published"
    });
    
    // We'll add default locations after all methods are defined
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articlesList.values()).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }
  
  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articlesList.get(id);
  }
  
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentArticleId++;
    const now = new Date();
    const article: Article = { 
      id, 
      date: now,
      title: insertArticle.title,
      summary: insertArticle.summary,
      content: insertArticle.content,
      status: insertArticle.status || "published",
      imageUrl: insertArticle.imageUrl || null
    };
    this.articlesList.set(id, article);
    return article;
  }
  
  async updateArticle(id: number, articleUpdate: Partial<InsertArticle>): Promise<Article | undefined> {
    const article = this.articlesList.get(id);
    if (!article) return undefined;
    
    const updatedArticle: Article = {
      ...article,
      ...articleUpdate,
    };
    
    this.articlesList.set(id, updatedArticle);
    return updatedArticle;
  }
  
  async deleteArticle(id: number): Promise<boolean> {
    return this.articlesList.delete(id);
  }
  
  async getAllLocations(): Promise<Location[]> {
    return Array.from(this.locationsList.values());
  }
  
  async getLocationById(id: number): Promise<Location | undefined> {
    return this.locationsList.get(id);
  }
  
  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const id = this.currentLocationId++;
    const location: Location = { 
      id,
      name: insertLocation.name,
      address: insertLocation.address,
      zipCode: insertLocation.zipCode || null,
      description: insertLocation.description,
      status: insertLocation.status || "active",
      imageUrl: insertLocation.imageUrl || null,
      phoneNumber: insertLocation.phoneNumber || null,
      instagramAccount: insertLocation.instagramAccount || null,
      whatsappNumber: insertLocation.whatsappNumber || null,
      latitude: insertLocation.latitude || null,
      longitude: insertLocation.longitude || null
    };
    this.locationsList.set(id, location);
    return location;
  }
  
  async updateLocation(id: number, locationUpdate: Partial<InsertLocation>): Promise<Location | undefined> {
    const location = this.locationsList.get(id);
    if (!location) return undefined;
    
    const updatedLocation: Location = {
      ...location,
      ...locationUpdate,
    };
    
    this.locationsList.set(id, updatedLocation);
    return updatedLocation;
  }
  
  async deleteLocation(id: number): Promise<boolean> {
    return this.locationsList.delete(id);
  }
}

export const storage = new MemStorage();

// Add default locations
storage.createLocation({
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

storage.createLocation({
  name: "Megahand Bakı -Q.Qarayev-",
  address: "CW8R+255, Baku",
  zipCode: null,
  description: "Our Baku branch located near Qara Qarayev metro station.",
  phoneNumber: "+99450 490 35 60",
  instagramAccount: "@megahandsumqayit",
  whatsappNumber: "+99450 490 35 60",
  imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  latitude: "40.4093",
  longitude: "49.9387",
  status: "active"
});

storage.createLocation({
  name: "Megahand-Gəncə",
  address: "M9H9+X33, Ganja",
  zipCode: null,
  description: "Our Ganja location offering quality European fashion.",
  phoneNumber: "+99450 453 20 45",
  instagramAccount: "@megahandsumqayit",
  whatsappNumber: "+99450 453 20 45",
  imageUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  latitude: "40.6830",
  longitude: "46.3606",
  status: "active"
});

storage.createLocation({
  name: "Megahand Bakı-28May",
  address: "140 Shamil Azizbayov, Baku",
  zipCode: null,
  description: "Our Baku branch located near 28 May metro station.",
  phoneNumber: "+99450 277 87 26",
  instagramAccount: "@megahandsumqayit",
  whatsappNumber: "+99450 277 87 26",
  imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  latitude: "40.3776",
  longitude: "49.8501",
  status: "active"
});

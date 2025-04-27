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
  name: "MegaHand Moscow Office",
  address: "Bolshaya Dmitrovka, 32/1, Moscow, Russia",
  zipCode: "127051",
  description: "Our main office in the heart of Moscow. Visit us for consultations and services.",
  phoneNumber: "+7 495 123-45-67",
  instagramAccount: "@megahand_moscow",
  whatsappNumber: "+7 495 123-45-67",
  imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  latitude: "55.7646",
  longitude: "37.6117",
  status: "active"
});

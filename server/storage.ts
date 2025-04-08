import { articles, type Article, type InsertArticle, users, type User, type InsertUser } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private articlesList: Map<number, Article>;
  currentUserId: number;
  currentArticleId: number;

  constructor() {
    this.users = new Map();
    this.articlesList = new Map();
    this.currentUserId = 1;
    this.currentArticleId = 1;
    
    // Add admin user by default
    this.createUser({
      username: "admin",
      password: "password" // In a real app, this would be hashed
    });
    
    // Add some default articles
    this.createArticle({
      title: "Latest Tech Innovations",
      summary: "Discover the cutting-edge technologies that are shaping our future. From AI advancements to new sustainable energy solutions...",
      content: "This is a detailed content of the article about the latest tech innovations. It would include several paragraphs about AI, sustainable energy, quantum computing, and other emerging technologies.",
      imageUrl: "https://images.unsplash.com/photo-1581090700227-8e3b68af7c63?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published"
    });
    
    this.createArticle({
      title: "Health and Wellness Trends",
      summary: "Stay informed about the latest health and wellness practices that can improve your quality of life. From nutrition to fitness...",
      content: "This is a detailed content of the article about health and wellness trends. It would include information about nutrition, fitness routines, mental health practices, and preventive healthcare strategies.",
      imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published"
    });
    
    this.createArticle({
      title: "Hidden Travel Gems",
      summary: "Explore lesser-known but breathtaking destinations that should be on your travel bucket list. From secluded beaches to charming villages...",
      content: "This is a detailed content of the article about hidden travel gems. It would include descriptions of secluded beaches, charming villages, mountain retreats, and other less-known but amazing travel destinations.",
      imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      status: "published"
    });
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
      ...insertArticle, 
      id, 
      date: now
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
}

export const storage = new MemStorage();

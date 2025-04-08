import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import { insertArticleSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "megahand-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production" },
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );

  // Authentication middleware
  const requireAuth = (req: Request, res: Response, next: () => void) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  // Auth routes
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      req.session.username = user.username;
      
      res.json({ message: "Login successful", username: user.username });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/me", (req, res) => {
    if (req.session && req.session.userId) {
      res.json({ isAuthenticated: true, username: req.session.username });
    } else {
      res.json({ isAuthenticated: false });
    }
  });

  // Articles routes
  app.get("/api/articles", async (_req, res) => {
    try {
      const articles = await storage.getAllArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }
      
      const article = await storage.getArticleById(id);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", requireAuth, async (req, res) => {
    try {
      const articleData = insertArticleSchema.parse(req.body);
      const newArticle = await storage.createArticle(articleData);
      res.status(201).json(newArticle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to create article" });
    }
  });

  app.put("/api/articles/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }
      
      const articleData = insertArticleSchema.partial().parse(req.body);
      const updatedArticle = await storage.updateArticle(id, articleData);
      
      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(updatedArticle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to update article" });
    }
  });

  app.delete("/api/articles/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid article ID" });
      }
      
      const success = await storage.deleteArticle(id);
      
      if (!success) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json({ message: "Article deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete article" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

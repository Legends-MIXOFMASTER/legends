import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (for staff, bartenders, and clients)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  userType: text("user_type").notNull(), // "client", "bartender", "staff", "admin"
  experience: text("experience"), // For bartenders
  bio: text("bio"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Bookings table (for events, services, and training)
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  brand: text("brand").notNull(), // "hol", "loc", "nbm"
  type: text("type").notNull(), // "event", "service", "training"
  service: text("service").notNull(),
  date: date("date").notNull(),
  guestCount: integer("guest_count"),
  venue: text("venue"),
  details: text("details"),
  status: text("status").default("pending"), // "pending", "confirmed", "completed", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
});

// Freelancers table (for bartenders registration)
export const freelancers = pgTable("freelancers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  experience: text("experience").notNull(),
  specialties: text("specialties"),
  availability: text("availability"),
  status: text("status").default("pending"), // "pending", "approved", "rejected"
  createdAt: timestamp("created_at").defaultNow(),
});

// Training enrollments (for courses and programs)
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  program: text("program").notNull(), // "training", "monthly", "lodge", "database"
  startDate: date("start_date").notNull(),
  goals: text("goals"),
  status: text("status").default("pending"), // "pending", "confirmed", "completed", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact messages
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas and Types
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  status: true,
  createdAt: true,
});

export const insertFreelancerSchema = createInsertSchema(freelancers).omit({ 
  id: true, 
  status: true,
  createdAt: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({ 
  id: true, 
  status: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({ 
  id: true, 
  isRead: true,
  createdAt: true,
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ 
  id: true, 
  isActive: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Freelancer = typeof freelancers.$inferSelect;
export type InsertFreelancer = z.infer<typeof insertFreelancerSchema>;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
import { z } from "zod";

// Existing schemas...

export const courseProgressSchema = z.object({
  userId: z.number(),
  courseId: z.string(),
  completed: z.boolean(),
  completedAt: z.date().optional(),
  quizResults: z.array(z.object({
    moduleId: z.string(),
    score: z.number(),
  })).optional(),
});

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  level: z.enum(["basic", "pro"]),
  modules: z.array(z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    quiz: z.array(z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.number(),
    })),
  })),
});

export type CourseProgress = z.infer<typeof courseProgressSchema>;
export type Course = z.infer<typeof courseSchema>;

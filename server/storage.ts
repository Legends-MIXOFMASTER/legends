import { 
  User, InsertUser, 
  Booking, InsertBooking,
  Freelancer, InsertFreelancer,
  Enrollment, InsertEnrollment,
  Contact, InsertContact,
  Subscriber, InsertSubscriber
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Booking operations
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUserId(userId: number): Promise<Booking[]>;
  getBookingsByBrand(brand: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Freelancer operations
  getFreelancer(id: number): Promise<Freelancer | undefined>;
  getFreelancerByUserId(userId: number): Promise<Freelancer | undefined>;
  getFreelancers(): Promise<Freelancer[]>;
  createFreelancer(freelancer: InsertFreelancer): Promise<Freelancer>;
  updateFreelancerStatus(id: number, status: string): Promise<Freelancer | undefined>;
  
  // Enrollment operations
  getEnrollment(id: number): Promise<Enrollment | undefined>;
  getEnrollmentsByUserId(userId: number): Promise<Enrollment[]>;
  getEnrollmentsByProgram(program: string): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentStatus(id: number, status: string): Promise<Enrollment | undefined>;
  
  // Contact operations
  getContact(id: number): Promise<Contact | undefined>;
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  markContactAsRead(id: number): Promise<Contact | undefined>;
  
  // Subscriber operations
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  getSubscribers(): Promise<Subscriber[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  updateSubscriberStatus(id: number, isActive: boolean): Promise<Subscriber | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return Promise.resolve(db.getUser(id) as User | undefined);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(db.getUserByUsername(username) as User | undefined);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(db.getUserByEmail(email) as User | undefined);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return Promise.resolve(db.createUser(insertUser) as User);
  }

  // Booking operations
  async getBooking(id: number): Promise<Booking | undefined> {
    return Promise.resolve(db.getBooking(id) as Booking | undefined);
  }

  async getBookingsByUserId(userId: number): Promise<Booking[]> {
    const bookings = db.getBookingsByUserId(userId);
    return Promise.resolve(Array.isArray(bookings) ? bookings as Booking[] : []);
  }

  async getBookingsByBrand(brand: string): Promise<Booking[]> {
    const bookings = db.getBookingsByBrand(brand);
    return Promise.resolve(Array.isArray(bookings) ? bookings as Booking[] : []);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    return Promise.resolve(db.createBooking(insertBooking) as Booking);
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    return Promise.resolve(db.updateBookingStatus(id, status) as Booking | undefined);
  }

  // Freelancer operations
  async getFreelancer(id: number): Promise<Freelancer | undefined> {
    return Promise.resolve(db.getFreelancer(id) as Freelancer | undefined);
  }

  async getFreelancerByUserId(userId: number): Promise<Freelancer | undefined> {
    return Promise.resolve(db.getFreelancerByUserId(userId) as Freelancer | undefined);
  }

  async getFreelancers(): Promise<Freelancer[]> {
    const freelancers = db.getFreelancers();
    return Promise.resolve(Array.isArray(freelancers) ? freelancers as Freelancer[] : []);
  }

  async createFreelancer(insertFreelancer: InsertFreelancer): Promise<Freelancer> {
    return Promise.resolve(db.createFreelancer(insertFreelancer) as Freelancer);
  }

  async updateFreelancerStatus(id: number, status: string): Promise<Freelancer | undefined> {
    return Promise.resolve(db.updateFreelancerStatus(id, status) as Freelancer | undefined);
  }

  // Enrollment operations
  async getEnrollment(id: number): Promise<Enrollment | undefined> {
    return Promise.resolve(db.getEnrollment(id) as Enrollment | undefined);
  }

  async getEnrollmentsByUserId(userId: number): Promise<Enrollment[]> {
    const enrollments = db.getEnrollmentsByUserId(userId);
    return Promise.resolve(Array.isArray(enrollments) ? enrollments as Enrollment[] : []);
  }

  async getEnrollmentsByProgram(program: string): Promise<Enrollment[]> {
    const enrollments = db.getEnrollmentsByProgram(program);
    return Promise.resolve(Array.isArray(enrollments) ? enrollments as Enrollment[] : []);
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    return Promise.resolve(db.createEnrollment(insertEnrollment) as Enrollment);
  }

  async updateEnrollmentStatus(id: number, status: string): Promise<Enrollment | undefined> {
    return Promise.resolve(db.updateEnrollmentStatus(id, status) as Enrollment | undefined);
  }

  // Contact operations
  async getContact(id: number): Promise<Contact | undefined> {
    return Promise.resolve(db.getContact(id) as Contact | undefined);
  }

  async getContacts(): Promise<Contact[]> {
    const contacts = db.getContacts();
    return Promise.resolve(Array.isArray(contacts) ? contacts as Contact[] : []);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    return Promise.resolve(db.createContact(insertContact) as Contact);
  }

  async markContactAsRead(id: number): Promise<Contact | undefined> {
    return Promise.resolve(db.markContactAsRead(id) as Contact | undefined);
  }

  // Subscriber operations
  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return Promise.resolve(db.getSubscriber(id) as Subscriber | undefined);
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Promise.resolve(db.getSubscriberByEmail(email) as Subscriber | undefined);
  }

  async getSubscribers(): Promise<Subscriber[]> {
    const subscribers = db.getSubscribers();
    return Promise.resolve(Array.isArray(subscribers) ? subscribers as Subscriber[] : []);
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    return Promise.resolve(db.createSubscriber(insertSubscriber) as Subscriber);
  }

  async updateSubscriberStatus(id: number, isActive: boolean): Promise<Subscriber | undefined> {
    return Promise.resolve(db.updateSubscriberStatus(id, isActive) as Subscriber | undefined);
  }
}

export const storage = new DatabaseStorage();
export async function getAllUsers() {
  return await db.select().from(users);
}

export async function updateUserStatus(userId: number, isActive: boolean) {
  return await db
    .update(users)
    .set({ isActive })
    .where(eq(users.id, userId));
}

export async function updateUserType(userId: number, userType: string) {
  return await db
    .update(users)
    .set({ userType })
    .where(eq(users.id, userId));
}
